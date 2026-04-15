# Codex Briefing — AI Agency Toolkit
**Last updated:** April 2026 | **Author:** Kevin Farrant (with Claude)

---

## Who Kevin Is

Kevin Farrant is Makerspace Director and Upper School Technology Coordinator at Rye Country Day School (RCDS), Rye, NY. He teaches Engineering & Design and a STEAM Apprentice course for grades 9-12. He co-leads an AI Research Team using the MSA RAIL framework. This toolkit is part of his action research on AI's role in student agency, creativity, and equity.

---

## What This Project Is

The **AI Agency Toolkit** (aiagencytoolkit.com) is a growing suite of interactive, standalone web tools for educators. It is grounded in Kevin Farrant's Agency Spectrum framework (Author, Designer, Conductor) and Jane Beckwith's AI Friction Scale (1-5 levels of AI involvement in student work).

The toolkit currently has four tools:

1. **The Agency Spectrum** (`pages/agency.html`, served at `/agency`) — An interactive presentation of Kevin's framework paper: three roles (Author, Designer, Conductor) and five constants (Direct, Question, Own, Consider, Grow).
2. **AI Friction Scale Simulator** (`pages/friction-scale.html`) — Interactive sim of Beckwith's 1-5 scale. Three tabs: Scale, Simulate, Compare. Dark/light mode. Fully built and stable.
3. **Assessment Check** (`pages/assessment.html`) — Student self-check tool. Five reflection questions about ownership and understanding.
4. **Redesign Studio** (`pages/redesign-studio.html`) — Teacher-facing tool. Paste an assignment, get a diagnosis against the Agency Spectrum, then a role-aware redesign with transfer checkpoint and reflection prompts. Uses Claude API via Netlify function (or BYOK mode locally).

The homepage (`index.html`) is a hub showing all four tools as cards. Each tool page is a standalone HTML file in `pages/`.

Legacy files: `pages/english.html` is a subject-specific module from an earlier version of the toolkit.

---

## Project Location

```
/Users/kevinfarrant/Desktop/Claude Code/ai-agency-toolkit/
```

GitHub: `https://github.com/kevikevi666/ai-friction-scale-sim.git` (branch: `main`)

---

## Architecture — The Golden Rule

**This project uses zero build tools.** Every file is a self-contained HTML page using:
- React 18 via CDN
- ReactDOM via CDN
- Babel Standalone via CDN (for JSX/modern JS in the browser)

This means every page opens by **double-clicking in Finder**. No `npm run dev`, no server, no dependencies.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.9/babel.min.js"></script>
```

All React code goes inside `<script type="text/babel">` tags. You can use JSX or `React.createElement` — Babel handles both.

---

## File Structure

```
ai-agency-toolkit/
  index.html                         ← Homepage hub (four tool cards)
  pages/
    agency.html                      ← The Agency Spectrum (framework presentation)
    friction-scale.html              ← AI Friction Scale Simulator
    assessment.html                  ← Assessment Check (student self-check)
    redesign-studio.html             ← Redesign Studio (assignment diagnosis + redesign)
    english.html                     ← High School English (legacy subject module)
  netlify/
    functions/
      claude.js                      ← Netlify serverless function (Claude API proxy)
  netlify.toml                       ← Netlify build config
  _redirects                         ← Netlify URL rewrites (/agency -> /pages/agency.html)
  sitemap.xml                        ← Sitemap for all pages
  agency-spectrum-framework.md       ← Kevin's Agency Spectrum paper (source of truth)
  CODEX_BRIEFING.md                  ← This file
  favicon.ico / favicon.png / favicon.svg
  og-image.png
```

**Never touch `index.html` lightly.** Build and fully test new pages in `pages/` first. Only integrate into `index.html` when a page is proven and complete.

---

## Design System — Match This Exactly

The visual language is defined by `index.html`. Every page in the toolkit must feel like it belongs to the same family. Here are the exact tokens:

### Fonts
```
Body:       'Crimson Pro', Georgia, serif
Mono/UI:    'JetBrains Mono', monospace  (all labels, tabs, badges, stats)
Secondary:  'Space Mono', monospace      (card titles, scenario names)
```

Load via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;0,700;1,400;1,700&family=JetBrains+Mono:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

### Colors — Light Mode
```
Background:     #f5f5f0
Text:           #1a1a2e
textHigh:       rgba(0,0,0,0.6)
textMid:        rgba(0,0,0,0.55)
textLow:        rgba(0,0,0,0.4)
textFaint:      rgba(0,0,0,0.35)
cardBg:         rgba(255,255,255,0.7)
cardBorder:     1px solid rgba(0,0,0,0.08)
cardShadow:     0 1px 3px rgba(0,0,0,0.04)
```

### Colors — Dark Mode
```
Background:     #0a0a0f
Text:           #fff
textHigh:       rgba(255,255,255,0.65)
textMid:        rgba(255,255,255,0.55)
textLow:        rgba(255,255,255,0.4)
textFaint:      rgba(255,255,255,0.3)
cardBg:         rgba(255,255,255,0.02)
cardBorder:     1px solid rgba(255,255,255,0.06)
cardShadow:     none
```

### Friction Level Colors (used in the main sim)
```
Level 1 — No AI (dark):          #E63946
Level 2 — Ideation (dark):       #E76F51
Level 3 — Structure (dark):      #F4A261
Level 4 — Feedback (dark):       #2A9D8F
Level 5 — Full AI (dark):        #264653

Level 1 — No AI (light):         #C62828
Level 2 — Ideation (light):      #D84315
Level 3 — Structure (light):     #E65100
Level 4 — Feedback (light):      #00796B
Level 5 — Full AI (light):       #37474F
```

### Subject Page Accent Colors (one per subject page)
```
English:        #4f46e5  (indigo)
Math:           TBD — suggest #0284c7 (blue)
Science:        TBD — suggest #059669 (green)
History:        TBD — suggest #b45309 (amber)
```

### Background Layers (apply to every page)
Every page needs these two fixed overlays for visual consistency:

```javascript
// Radial glow — color should reflect the page accent
{ position:"fixed", inset:0, pointerEvents:"none",
  backgroundImage:`radial-gradient(circle at 20% 50%, ${ACCENT}06 0%, transparent 50%),
                   radial-gradient(circle at 80% 20%, ${ACCENT}04 0%, transparent 40%)` }

// Noise texture
{ position:"fixed", inset:0, pointerEvents:"none", opacity: dark ? 0.03 : 0.015,
  backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }
```

### Typography Patterns
```
Page label (above title):
  fontSize:10, textTransform:"uppercase", letterSpacing:"0.3em", fontFamily:mono

Main title:
  fontSize: desktop 48-52 / mobile 26-28
  fontWeight: 300 (light)
  One key word is: fontWeight:700, fontStyle:"italic", color:ACCENT

Section labels:
  fontSize:10, textTransform:"uppercase", letterSpacing:"0.15-0.2em", fontFamily:mono, color:textLow

Body text:
  fontSize:16-17, lineHeight:1.7, fontFamily:Crimson Pro
```

### Tab / Pill Buttons
```javascript
// Inactive
{ padding:"10px 24px", border:"none", borderRadius:100,
  background:"transparent", color:textLow,
  fontSize:12, fontFamily:mono, textTransform:"uppercase", letterSpacing:"0.08em",
  fontWeight:400 }

// Active
{ background:`${ACCENT}15`, color:ACCENT, fontWeight:700 }
```

### Cards
```javascript
{ background:t.cardBg, border:t.cardBorder, borderRadius:16,
  boxShadow:t.cardShadow, transition:"all 0.5s" }
```

### Scenario Selector Cards (like the Simulate tab grid)
```javascript
// Active
{ background:t.scenarioBg, border:t.scenarioBorderOn, borderRadius:12 }
// Has a 3px accent color bar at top via position:absolute

// Inactive
{ background:t.scenarioBgOff, border:t.scenarioBorderOff }
```

---

## Hamburger Menu (index.html)

A floating 3-bar hamburger sits at `position:fixed, top:20, left:20, zIndex:600`. It has no background bar behind it — just the three bars floating over the page content.

Animation when open (adapted from uiverse.io):
- The whole toggle wrapper rotates -90deg
- Bar 1: translateY(21px) rotate(-60deg), transformOrigin left
- Bar 2: translateY(10px) rotate(60deg), transformOrigin right
- Bar 3: no transform (rotates with wrapper)

Opens a slide-out drawer (width:272, zIndex:500) from the left with:
- Toolkit branding header
- Nav items: AI Friction Scale (current), High School English (links to `pages/english.html`)
- Coming soon: Mathematics, Science, History (dimmed, opacity:0.35)
- Footer: Kevin Farrant credit

Bar color adapts to dark/light mode:
- Dark: `rgba(253,255,243,0.9)`
- Light: `rgba(26,26,46,0.75)`

---

## How to Add a New Subject Page

1. Copy `pages/english.html` as your starting point
2. Change the `ACCENT` color constant at the top
3. Update the `<title>` and header text
4. Replace the `scenarios` data array with subject-specific content
5. Test by double-clicking in Finder
6. Add it to the hamburger nav drawer in `index.html`:
   - Add a new `React.createElement("a", ...)` nav item pointing to `pages/yourpage.html`
   - Remove it from the "Coming Soon" list

---

## Subject Page Structure (english.html pattern)

Each subject page has:

```
scenarios[] array — 3-5 assignment types, each with:
  id, name, icon, subject (label), subtitle (italic tagline)
  traditional: { label, description, steps[] }
  frictionPoints: [{ level, color, label, detail }]
  alternative: { label, tagline, description, steps[], benefits[], aiRole }

phases[] — fixed: traditional / friction / alternative

UI flow:
  Header → Scenario selector grid → Subtitle → Phase tabs → PhaseContent
```

Friction point levels and their colors (consistent across all pages):
```
High:    #C62828  (light) / #E63946 (dark)
Medium:  #E65100  (light) / #F4A261 (dark)
Low:     #00796B  (light) / #2A9D8F (dark)
```

---

## Development Workflow

1. **Build new pages in `pages/` only** — never start in `index.html`
2. **Preview by double-clicking** the HTML file in Finder — no server needed
3. **Test dark mode** by clicking the toggle — check all text and card colors
4. **Test mobile** by resizing the browser window below 768px
5. **Only touch `index.html`** when adding a nav link to a finished page
6. **Commit small and often** — one meaningful change per commit
7. **Before any commit** describe exactly what files are changing

### Git workflow
```bash
cd "/Users/kevinfarrant/Desktop/Claude code/AI Friction Scale Sim"
git add index.html pages/newpage.html
git commit -m "Description of what changed"
git push origin main
```

**Never force push to main without Kevin's explicit approval.**

---

## Responsive Breakpoint

Mobile: `window.innerWidth < 768`

Use the `useIsMobile()` hook (already defined in both files):
```javascript
function useIsMobile(bp = 768) {
  const [m, setM] = useState(window.innerWidth < bp);
  useEffect(() => {
    const h = () => setM(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return m;
}
```

---

## Kevin's Language Preferences (apply to all content)

- "Varied proof of learning" — not "different assessments"
- No em dashes — use commas or periods instead
- No bullet points in prose explanations
- Clear, concise, no unnecessary framing or qualifiers
- Upper school focus: grades 9-12

---

## What's Next (planned)

- Subject-specific modules: Math, Science, History (each in `pages/`)
- Polish cross-tool navigation and active state indicators
- Potential: saved/shared redesigns across sessions
