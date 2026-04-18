/* Site-wide nav + footer. Single source of truth.
   Usage on each page:

     <script src="/assets/site-nav.js" defer></script>

     // inside App(), replace the inline nav + footer:
     SiteNav.renderNavLinks({ dark, isMobile, currentPage: "agency" })
     SiteNav.renderFooter({ dark, isMobile, t, currentPage: "agency" })

   Add a new tool → add one entry to TOOLS below. Nav + active state propagate everywhere.
*/
(function () {
  const mono = "'JetBrains Mono', monospace";

  const TOOLS = [
    { id: "agency",          title: "The Agency Spectrum", navLabel: "THE AGENCY SPECTRUM", href: "/agency",                     colorDark: "#2A9D8F", colorLight: "#00796B" },
    { id: "friction-scale",  title: "AI Friction Scale",   navLabel: "AI FRICTION SCALE",   href: "/pages/friction-scale.html",  colorDark: "#F4A261", colorLight: "#E65100" },
    { id: "assessment",      title: "Assessment Check",    navLabel: "ASSESSMENT CHECK",    href: "/pages/assessment.html",      colorDark: "#818cf8", colorLight: "#6366f1" },
    { id: "redesign-studio", title: "Redesign Studio",     navLabel: "REDESIGN STUDIO",     href: "/pages/redesign-studio.html", colorDark: "#F472B6", colorLight: "#BE185D" },
  ];

  const TOOLS_BY_ID = Object.fromEntries(TOOLS.map(t => [t.id, t]));

  function toolColor(tool, dark) {
    return dark ? tool.colorDark : tool.colorLight;
  }

  // Returns an array of <a> elements. Spread into a <nav> on the consuming page.
  function renderNavLinks({ dark, currentPage }) {
    return TOOLS.map(tool => {
      const color = toolColor(tool, dark);
      const isActive = tool.id === currentPage;
      return React.createElement("a", {
        key: tool.id,
        href: tool.href,
        style: {
          fontFamily: mono, fontSize: 10, fontWeight: 700, color,
          textDecoration: "none", letterSpacing: "0.06em",
          ...(isActive ? { borderBottom: `2px solid ${color}`, paddingBottom: 2 } : {}),
        },
      }, tool.navLabel);
    });
  }

  // Returns a <footer> element. Use t.divider and t.textLow from the page's theme.
  // Pass pageTitle to override the default label (used for pages not in TOOLS, e.g. subject demos).
  // Pass attribution (array of strings) to show credit lines above the main footer row.
  function renderFooter({ isMobile, t, currentPage, pageTitle, attribution }) {
    const tool = TOOLS_BY_ID[currentPage];
    const label = pageTitle || (tool ? tool.title : "AI Agency Toolkit");
    const spanStyle = {
      fontFamily: mono, fontSize: 10, color: t.textLow, letterSpacing: "0.04em",
    };

    const mainRow = React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr auto 1fr",
        alignItems: "center",
        gap: isMobile ? 6 : 12,
      },
    },
      React.createElement("span", {
        style: { ...spanStyle, textAlign: isMobile ? "center" : "left" },
      }, `Kevin Farrant — ${label}`),
      React.createElement("span", {
        style: { ...spanStyle, textAlign: "center" },
      }, "© 2026 Kevin Farrant. All rights reserved."),
      React.createElement("a", {
        href: "mailto:kevinfarrant@gmail.com",
        style: { ...spanStyle, textDecoration: "none", textAlign: isMobile ? "center" : "right" },
      }, "Contact"),
    );

    const children = [];
    if (attribution && attribution.length) {
      children.push(React.createElement("div", {
        style: { textAlign: "center", marginBottom: 16 },
      }, ...attribution.map((line, i) =>
        React.createElement("div", { key: i, style: { ...spanStyle, marginBottom: 4 } }, line)
      )));
    }
    children.push(mainRow);

    return React.createElement("footer", {
      style: {
        position: "relative", zIndex: 1,
        borderTop: `1px solid ${t.divider}`,
        padding: isMobile ? "20px" : "24px 40px",
      },
    }, ...children);
  }

  window.SiteNav = { TOOLS, TOOLS_BY_ID, renderNavLinks, renderFooter };
})();
