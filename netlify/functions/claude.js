/* Netlify function: proxies browser calls to the Anthropic Messages API.
   The server holds ANTHROPIC_API_KEY; the browser never sees it.

   Defenses in this file (layered, no single one is a boundary):
     1. Origin/Referer allowlist  — rejects browser calls from other domains.
     2. Payload size caps         — bounds cost per request.
     3. max_tokens cap            — bounds output cost per request.
     4. In-memory per-IP limiter  — bounds burst abuse on warm containers.
     5. Generic error surfaces    — avoids leaking upstream internals.

   For real abuse protection, also set a monthly spend cap in the Anthropic
   console and (optional next step) add Cloudflare Turnstile to the client. */

const ALLOWED_ORIGINS = new Set([
  "https://aiagencytoolkit.com",
  "https://www.aiagencytoolkit.com",
  "http://localhost:8888", // netlify dev
  "http://localhost:3000",
  "http://127.0.0.1:8888",
  "http://127.0.0.1:3000",
]);

const MAX_SYSTEM_CHARS = 20000;
const MAX_USER_CHARS = 40000;
const MAX_TOKENS_CAP = 4096;

// Per-IP sliding window. In-memory: persists only within a warm container.
// Good enough to blunt bursts; not a durable limiter.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 15;
const ipHits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const entry = ipHits.get(ip) || [];
  const fresh = entry.filter(ts => now - ts < RATE_WINDOW_MS);
  if (fresh.length >= RATE_MAX_REQUESTS) {
    ipHits.set(ip, fresh);
    return true;
  }
  fresh.push(now);
  ipHits.set(ip, fresh);
  if (ipHits.size > 1000) {
    for (const [k, v] of ipHits) {
      if (!v.some(ts => now - ts < RATE_WINDOW_MS)) ipHits.delete(k);
    }
  }
  return false;
}

function pickAllowedOrigin(headers) {
  const origin = headers.origin || headers.Origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) return origin;
  return null;
}

function corsHeaders(allowedOrigin) {
  return allowedOrigin
    ? {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Vary": "Origin",
      }
    : {};
}

function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...extraHeaders },
    body: JSON.stringify(body),
  };
}

exports.handler = async function (event) {
  const headers = event.headers || {};
  const allowedOrigin = pickAllowedOrigin(headers);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(allowedOrigin), body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" }, corsHeaders(allowedOrigin));
  }

  if (!allowedOrigin) {
    return json(403, { error: "Origin not allowed." });
  }

  const ip =
    (headers["x-nf-client-connection-ip"] ||
      headers["x-forwarded-for"] ||
      "unknown")
      .split(",")[0]
      .trim();

  if (rateLimited(ip)) {
    return json(429, { error: "Rate limit exceeded. Try again in a minute." }, corsHeaders(allowedOrigin));
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json(500, { error: "Server is not configured." }, corsHeaders(allowedOrigin));
  }

  const rawBody = event.body || "";
  if (rawBody.length > MAX_SYSTEM_CHARS + MAX_USER_CHARS + 2000) {
    return json(413, { error: "Request body too large." }, corsHeaders(allowedOrigin));
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (e) {
    return json(400, { error: "Invalid JSON in request body." }, corsHeaders(allowedOrigin));
  }

  const { system, user, max_tokens } = payload || {};
  if (typeof system !== "string" || typeof user !== "string" || !system || !user) {
    return json(400, { error: "Missing or invalid fields: system, user." }, corsHeaders(allowedOrigin));
  }
  if (system.length > MAX_SYSTEM_CHARS) {
    return json(413, { error: "system prompt too long." }, corsHeaders(allowedOrigin));
  }
  if (user.length > MAX_USER_CHARS) {
    return json(413, { error: "user prompt too long." }, corsHeaders(allowedOrigin));
  }

  const mt = Number.isInteger(max_tokens) && max_tokens > 0
    ? Math.min(max_tokens, MAX_TOKENS_CAP)
    : MAX_TOKENS_CAP;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: mt,
        system: system,
        messages: [{ role: "user", content: user }],
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Don't echo upstream error details to the browser.
      console.error("Anthropic API error", response.status, data && data.error);
      const safeStatus = response.status === 401 || response.status === 403
        ? 500
        : response.status;
      const safeMsg = response.status === 429
        ? "Upstream rate limit. Try again shortly."
        : "Upstream API error.";
      return json(safeStatus, { error: safeMsg }, corsHeaders(allowedOrigin));
    }

    return json(200, data, corsHeaders(allowedOrigin));
  } catch (err) {
    console.error("Fetch to Anthropic failed", err && err.message);
    return json(502, { error: "Failed to reach the upstream API." }, corsHeaders(allowedOrigin));
  }
};
