/**
 * AI Agency Toolkit — Custom SVG Icon Set
 *
 * All icons are 24×24 viewBox, stroke-based, designed to replace
 * the placeholder emoji used across the site. Each value is the
 * inner SVG markup (children of the <svg> element).
 *
 * Usage in babel scripts:
 *   const SiteIcon = ({ name, size = 24, color = "currentColor" }) =>
 *     React.createElement("svg", {
 *       xmlns: "http://www.w3.org/2000/svg",
 *       width: size, height: size, viewBox: "0 0 24 24",
 *       fill: "none", stroke: color,
 *       strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round",
 *       "aria-hidden": "true",
 *       style: { display: "inline-block", flexShrink: 0, verticalAlign: "middle" },
 *       dangerouslySetInnerHTML: { __html: window.SITE_ICONS[name] || "" }
 *     });
 */
window.SITE_ICONS = {

  // ─── Main tool card icons ─────────────────────────────────────────────────

  // Agency Spectrum: three circles on a line, solid→hollow left-to-right
  // Represents the spectrum from full human authorship to full AI conduction
  spectrum: `
    <line x1="2" y1="12" x2="22" y2="12" stroke-opacity="0.25"/>
    <circle cx="5" cy="12" r="3" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="3"/>
    <circle cx="19" cy="12" r="3" stroke-opacity="0.5"/>
    <circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none" opacity="0.4"/>
  `,

  // AI Friction Scale: semicircular gauge with needle at high-friction position
  // The needle points left-of-center (high productive friction zone)
  gauge: `
    <path d="M 3 17 A 9 9 0 0 1 21 17"/>
    <line x1="3" y1="17" x2="5.2" y2="14.4"/>
    <line x1="12" y1="8" x2="12" y2="10.2"/>
    <line x1="21" y1="17" x2="18.8" y2="14.4"/>
    <line x1="12" y1="17" x2="7.2" y2="11.4" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="12" cy="17" r="2" fill="currentColor" stroke="none"/>
  `,

  // Assessment Check: confident checkmark inside a clean circle
  check: `
    <circle cx="12" cy="12" r="9.5"/>
    <path d="M 7.5 12.2 L 10.5 15.2 L 16.5 9.2"/>
  `,

  // ─── Friction level icons (NO AI → FULL AI) ───────────────────────────────

  // Level 1 — NO AI: a human figure, maximum cognitive presence
  human: `
    <circle cx="12" cy="6.5" r="3"/>
    <path d="M 5.5 21 C 5.5 16.2 8.5 13 12 13 C 15.5 13 18.5 16.2 18.5 21"/>
  `,

  // Level 2 — AI FOR IDEATION: a minimal light bulb, the spark of an idea
  bulb: `
    <path d="M 9 16.5 C 7 14.9 5.5 12.1 5.5 9 C 5.5 5.4 8.4 2.5 12 2.5 C 15.6 2.5 18.5 5.4 18.5 9 C 18.5 12.1 17 14.9 15 16.5 L 15 18 L 9 18 Z"/>
    <line x1="9" y1="20.5" x2="15" y2="20.5"/>
    <line x1="9.5" y1="22.5" x2="14.5" y2="22.5"/>
  `,

  // Level 3 — AI FOR STRUCTURE: 3×3 dot grid, scaffolding and order
  grid: `
    <circle cx="6"  cy="6"  r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="6"  r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="18" cy="6"  r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="6"  cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="6"  cy="18" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="18" cy="18" r="1.5" fill="currentColor" stroke="none"/>
  `,

  // Level 4 — AI FOR FEEDBACK: circular refresh arrow, the revision cycle
  loop: `
    <path d="M 20.5 12 A 8.5 8.5 0 1 0 16.5 19.5"/>
    <polyline points="16.5,19.5 20.5,20.5 21.5,16.5"/>
  `,

  // Level 5 — FULL AI: a chip/processor, computation at the center
  chip: `
    <rect x="8" y="8" width="8" height="8" rx="1.5"/>
    <line x1="8"  y1="10"   x2="5"  y2="10"/>
    <line x1="8"  y1="12"   x2="5"  y2="12"/>
    <line x1="8"  y1="14"   x2="5"  y2="14"/>
    <line x1="16" y1="10"   x2="19" y2="10"/>
    <line x1="16" y1="12"   x2="19" y2="12"/>
    <line x1="16" y1="14"   x2="19" y2="14"/>
    <line x1="10" y1="8"    x2="10" y2="5"/>
    <line x1="12" y1="8"    x2="12" y2="5"/>
    <line x1="14" y1="8"    x2="14" y2="5"/>
    <line x1="10" y1="16"   x2="10" y2="19"/>
    <line x1="12" y1="16"   x2="12" y2="19"/>
    <line x1="14" y1="16"   x2="14" y2="19"/>
  `,

  // ─── Scenario / subject icons ─────────────────────────────────────────────

  // Analytical Essay: four paragraph-width text lines
  lines: `
    <line x1="3" y1="7"  x2="21" y2="7"/>
    <line x1="3" y1="11" x2="21" y2="11"/>
    <line x1="3" y1="15" x2="21" y2="15"/>
    <line x1="3" y1="19" x2="14" y2="19"/>
  `,

  // Lab Report / Science: atom with three orbital ellipses
  atom: `
    <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/>
    <ellipse cx="12" cy="12" rx="10" ry="3.8"/>
    <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(-60 12 12)"/>
  `,

  // Coding Project: terminal window with prompt chevron and cursor
  terminal: `
    <rect x="3" y="4" width="18" height="16" rx="2"/>
    <path d="M 7 9.5 L 11.5 12 L 7 14.5"/>
    <line x1="13" y1="14.5" x2="17" y2="14.5"/>
  `,

  // Design Project: Bézier curve with anchor points and faint handles
  // The classic "pen tool" metaphor from every design application
  design: `
    <path d="M 4 20 C 4 13 11 17 12 12 C 13 7 20 11 20 20"/>
    <circle cx="4"  cy="20" r="1.8" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/>
    <circle cx="20" cy="20" r="1.8" fill="currentColor" stroke="none"/>
    <line x1="4"  y1="20" x2="4"  y2="13" stroke-opacity="0.3"/>
    <line x1="20" y1="20" x2="20" y2="11" stroke-opacity="0.3"/>
  `,

  // Research Paper: three stacked rhombus-layers, like a document stack in 3D
  layers: `
    <path d="M 2 17 L 12 22 L 22 17"/>
    <path d="M 2 12 L 12 17 L 22 12"/>
    <path d="M 12 2 L 22 7 L 12 12 L 2 7 Z"/>
  `,

  // Math Problem Set: a diagonal line with tick marks (number line / ruler)
  math: `
    <path d="M 4 20 L 20 4"/>
    <line x1="7"  y1="17" x2="9.5" y2="14.5"/>
    <line x1="11" y1="13" x2="13.5" y2="10.5"/>
    <line x1="15" y1="9"  x2="17.5" y2="6.5"/>
  `,

  // ─── Learning journey timeline icons ──────────────────────────────────────

  // Encounter: a door left ajar with a doorknob — first contact, stepping in
  encounter: `
    <path d="M 10 3 L 4 3 Q 3 3 3 4 L 3 20 Q 3 21 4 21 L 10 21"/>
    <path d="M 10 3 L 16 5 L 16 19 L 10 21 Z"/>
    <circle cx="13.5" cy="12" r="1.2" fill="currentColor" stroke="none"/>
  `,

  // Confusion: a tightening inward spiral — the knot of not-knowing
  confusion: `
    <path d="M 12 20 C 5 20 3.5 13 7 9.5 C 10.5 6 16 7.5 15.5 12 C 15 15.5 11.5 16.5 9.5 14.5 C 8 13 8.5 10.5 10.5 10.5"/>
  `,

  // Struggle: two opposing arrowheads pressing toward each other — compression
  struggle: `
    <line x1="12" y1="2"  x2="12" y2="22"/>
    <path d="M 2 7  L 12 2  L 22 7"/>
    <path d="M 2 17 L 12 22 L 22 17"/>
  `,

  // Breakthrough: a lightning bolt — sudden clarity, the crack of understanding
  lightning: `
    <path d="M 13.5 2 L 6.5 13.5 L 12 13.5 L 10.5 22 L 17.5 10.5 L 12 10.5 Z"/>
  `,

  // Understanding: three concentric rings with a solid center dot — clarity and focus
  focus: `
    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="5.5"/>
    <circle cx="12" cy="12" r="9.5"/>
  `,

  // Skipped timeline step: double chevron / skip-forward
  skip: `
    <path d="M 5  5 L 13 12 L 5  19"/>
    <path d="M 12 5 L 20 12 L 12 19"/>
  `,

  // ─── Agency Spectrum role icons ───────────────────────────────────────────

  // Author: a classic pen — the student holds the instrument, does the work
  pen: `
    <path d="M 18 2 L 22 6 L 8 20 L 2 22 L 4 16 Z"/>
    <line x1="15" y1="5" x2="19" y2="9"/>
  `,

  // Designer: a drafting compass — precise problem-framing, the designer's instrument
  blueprint: `
    <circle cx="12" cy="3.5" r="1.5" fill="currentColor" stroke="none"/>
    <line x1="9.5" y1="5"  x2="6"  y2="20.5"/>
    <line x1="14.5" y1="5" x2="18" y2="20.5"/>
    <path d="M 7.8 14.5 A 6 6 0 0 0 16.2 14.5"/>
  `,

  // Conductor: three mixer faders at different heights — orchestrating many things at once
  conductor: `
    <line x1="6"  y1="4" x2="6"  y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
    <line x1="18" y1="4" x2="18" y2="20"/>
    <circle cx="6"  cy="14" r="2.8" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="9"  r="2.8" fill="currentColor" stroke="none"/>
    <circle cx="18" cy="16" r="2.8" fill="currentColor" stroke="none"/>
  `,

  // ─── Agency scenario icons ────────────────────────────────────────────────

  // History / Research essay scroll
  scroll: `
    <path d="M 5 3 Q 2 3 2 6 Q 2 9 5 9 L 20 9 L 20 21 Q 20 22 19 22 L 5 22 Q 3 22 3 20 L 3 9"/>
    <line x1="7" y1="13" x2="17" y2="13"/>
    <line x1="7" y1="16" x2="17" y2="16"/>
    <line x1="7" y1="19" x2="13" y2="19"/>
  `,

  // Chemistry lab flask (Erlenmeyer)
  flask: `
    <path d="M 10 3 L 10 10 L 4.5 19 A 2.2 2.2 0 0 0 6.3 22 L 17.7 22 A 2.2 2.2 0 0 0 19.5 19 L 14 10 L 14 3 Z"/>
    <line x1="9" y1="3" x2="15" y2="3"/>
    <path d="M 7 18 C 9 16.5 11 18 12 18 C 13 18 15 16.5 17 18" stroke-opacity="0.5"/>
  `,

  // ─── Chat / message avatars ───────────────────────────────────────────────

  // Student / person silhouette
  person: `
    <circle cx="12" cy="7.5" r="3.5"/>
    <path d="M 4.5 21 C 4.5 16.3 7.8 13 12 13 C 16.2 13 19.5 16.3 19.5 21"/>
  `,

  // Conversational AI (chatbot): speech bubble with text lines
  robot: `
    <path d="M 21 14.5 Q 21 17 18.5 17 L 7 17 L 3 21 L 3 5 Q 3 3 5.5 3 L 18.5 3 Q 21 3 21 5.5 Z"/>
    <line x1="8"  y1="8.5"  x2="16" y2="8.5"/>
    <line x1="8"  y1="12" x2="13" y2="12"/>
  `,

  // Agentic AI: same bubble but with pulsing-outward rings, suggesting autonomy
  agent: `
    <path d="M 19 14 Q 19 16 17 16 L 7 16 L 3 20 L 3 5 Q 3 3 5 3 L 17 3 Q 19 3 19 5 Z"/>
    <circle cx="8"  cy="9.5" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="9.5" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="9.5" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="22" cy="4" r="1" fill="currentColor" stroke="none" opacity="0.6"/>
    <circle cx="22" cy="4" r="3" opacity="0.3"/>
  `,

  // ─── Analysis hint icons ──────────────────────────────────────────────────

  // Teacher tip: a classic chalkboard/presentation easel
  teacher: `
    <rect x="3" y="3" width="18" height="13" rx="2"/>
    <line x1="12" y1="16" x2="8"  y2="21"/>
    <line x1="12" y1="16" x2="16" y2="21"/>
    <line x1="7"  y1="8"  x2="17" y2="8"/>
    <line x1="7"  y1="11" x2="13" y2="11"/>
  `,

  // Student reflection: a thought bubble rising from a small circle
  reflect: `
    <circle cx="12" cy="9" r="5.5"/>
    <circle cx="9"  cy="16.5" r="2.5"/>
    <circle cx="7"  cy="21"   r="1.2"/>
  `,

  // ─── Navigation / phase icons ─────────────────────────────────────────────

  // Traditional approach: a classic document with folded corner and text lines
  doc: `
    <path d="M 5 2 L 15 2 L 19 6 L 19 22 L 5 22 Z"/>
    <path d="M 15 2 L 15 6 L 19 6"/>
    <line x1="8" y1="10" x2="16" y2="10"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="16" x2="13" y2="16"/>
  `,

  // Friction Points / disruption: a line that breaks and zigzags
  bolt: `
    <line x1="2"  y1="12" x2="8"  y2="12"/>
    <path d="M 8 12 L 11 6 L 14 18 L 17 12"/>
    <line x1="17" y1="12" x2="22" y2="12"/>
  `,

  // Alternative approach: diagonal arrow pointing up-right — launch / new direction
  launch: `
    <line x1="5" y1="19" x2="19" y2="5"/>
    <path d="M 19 5 L 19 13"/>
    <path d="M 19 5 L 11 5"/>
  `,

  // Checkmark alone (Why This Works / success states)
  checkmark: `
    <path d="M 3.5 13.5 L 8.5 18.5 L 20.5 6.5"/>
  `,

  // Balance scale (navigation: AI Friction Scale link)
  scale: `
    <line x1="12" y1="3"  x2="12" y2="21"/>
    <path d="M 5 7 L 12 3 L 19 7"/>
    <path d="M 5 7 L 2 15 Q 2 18 5.5 18 Q 9 18 9 15 L 5 7"/>
    <path d="M 19 7 L 22 15 Q 22 18 18.5 18 Q 15 18 15 15 L 19 7"/>
  `,

  // Open book (Literary Analysis)
  book: `
    <path d="M 2 5 Q 2 3 4 3 L 11 3 Q 12 3 12 5 L 12 20 Q 10 19 8 19 L 4 19 Q 2 19 2 17 Z"/>
    <path d="M 22 5 Q 22 3 20 3 L 13 3 Q 12 3 12 5 L 12 20 Q 14 19 16 19 L 20 19 Q 22 19 22 17 Z"/>
  `,

  // History scroll (sidebar menu)
  history: `
    <path d="M 6 3 L 18 3 Q 20 3 20 5 L 20 21 Q 20 22 18 22 L 6 22 Q 4 22 4 20 L 4 5 Q 4 3 6 3"/>
    <path d="M 4 7 Q 2 7 2 9 Q 2 11 4 11"/>
    <line x1="8" y1="10" x2="16" y2="10"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="16" x2="12" y2="16"/>
  `,

  // Microscope / science (sidebar menu)
  microscope: `
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="8"  y1="22" x2="16" y2="22"/>
    <path d="M 12 18 C 7.5 18 4 14.5 4 10 C 4 5.5 7.5 2 12 2"/>
    <path d="M 12 2 L 12 18"/>
    <path d="M 16 4 L 20 8"/>
    <path d="M 12 2 L 16 4"/>
    <path d="M 12 10 L 20 8"/>
  `,

  // ─── Theme toggle ─────────────────────────────────────────────────────────

  // Sun (light mode)
  sun: `
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2"   x2="12" y2="5"/>
    <line x1="12" y1="19"  x2="12" y2="22"/>
    <line x1="2"  y1="12"  x2="5"  y2="12"/>
    <line x1="19" y1="12"  x2="22" y2="12"/>
    <line x1="4.9"  y1="4.9"  x2="7.1"  y2="7.1"/>
    <line x1="16.9" y1="16.9" x2="19.1" y2="19.1"/>
    <line x1="19.1" y1="4.9"  x2="16.9" y2="7.1"/>
    <line x1="7.1"  y1="16.9" x2="4.9"  y2="19.1"/>
  `,

  // Moon (dark mode) — a crisp crescent
  moon: `
    <path d="M 21 12.79 A 9 9 0 1 1 11.21 3 A 7 7 0 0 0 21 12.79 Z"/>
  `,

};
