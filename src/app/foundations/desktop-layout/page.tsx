import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";

export const metadata: Metadata = { title: "Desktop Layout" };

const P = {
  surface:  "#0d0d11",
  raised:   "#14141a",
  border:   "#262630",
  text:     "#f2f2f6",
  subtle:   "#9b9baa",
  tertiary: "#646473",
  accent:   "#60a5fa",
  green:    "#34a865",
  amber:    "#f59e0b",
  purple:   "#c084fc",
  grid:     "rgba(255,255,255,0.05)",
};

// ── Side Navigation diagram ────────────────────────────────────────────────────

function SideNavDiagram() {
  const W = 560, H = 220;

  const icons = [0, 1, 2, 3, 4];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      <rect width={W} height={H} fill={P.surface} rx={12} />

      {/* ── COLLAPSED RAIL ─────────────── */}
      <text x={134} y={18} fontSize={9} fill={P.tertiary} textAnchor="middle" fontWeight={600} letterSpacing={0.5}>COLLAPSED RAIL</text>

      {/* Rail background */}
      <rect x={8} y={24} width={52} height={H - 32} fill={P.raised} rx={8} />

      {/* Logo mark */}
      <rect x={17} y={34} width={26} height={26} fill={P.accent} rx={6} opacity={0.75} />
      <rect x={22} y={40} width={16} height={3} rx={1} fill={P.surface} opacity={0.6} />
      <rect x={22} y={46} width={11} height={3} rx={1} fill={P.surface} opacity={0.4} />

      {/* Nav icons */}
      {icons.map((i) => (
        <g key={i}>
          <rect x={19} y={72 + i * 28} width={22} height={22} rx={5}
            fill={i === 1 ? P.accent : "transparent"}
            stroke={i === 1 ? P.accent : P.border}
            strokeWidth={1}
            opacity={i === 1 ? 0.2 : 0.6}
          />
          <rect x={24} y={77 + i * 28} width={12} height={3} rx={1}
            fill={i === 1 ? P.accent : P.subtle} opacity={i === 1 ? 0.8 : 0.4}
          />
          <rect x={24} y={82 + i * 28} width={8} height={3} rx={1}
            fill={i === 1 ? P.accent : P.subtle} opacity={i === 1 ? 0.5 : 0.25}
          />
          {/* Active indicator bar */}
          {i === 1 && <rect x={8} y={74} width={3} height={18} fill={P.accent} rx={1.5} />}
        </g>
      ))}

      {/* User avatar */}
      <circle cx={34} cy={H - 22} r={11} fill={P.green} opacity={0.6} />
      <rect x={27} y={H - 28} width={14} height={3} rx={1} fill={P.surface} opacity={0.5} />

      {/* Width label */}
      <line x1={8} y1={H - 8} x2={60} y2={H - 8} stroke={P.border} strokeWidth={0.75} markerEnd="url(#arrow)" />
      <text x={34} y={H - 2} fontSize={8} fill={P.tertiary} textAnchor="middle">52px</text>

      {/* Content stub */}
      <rect x={68} y={24} width={196} height={H - 32} fill={P.raised} rx={8} opacity={0.35} />
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={78} y={40 + i * 22} width={60 + (i % 3) * 30} height={8} rx={3} fill={P.border} opacity={0.8} />
      ))}

      {/* ── EXPANDED DRAWER ────────────── */}
      <text x={426} y={18} fontSize={9} fill={P.tertiary} textAnchor="middle" fontWeight={600} letterSpacing={0.5}>EXPANDED DRAWER</text>

      {/* Drawer background */}
      <rect x={272} y={24} width={168} height={H - 32} fill={P.raised} rx={8} />

      {/* Logo + name */}
      <rect x={282} y={34} width={22} height={22} fill={P.accent} rx={5} opacity={0.75} />
      <rect x={310} y={37} width={60} height={8} rx={3} fill={P.accent} opacity={0.4} />
      <rect x={310} y={48} width={40} height={6} rx={3} fill={P.border} />

      {/* Section label */}
      <text x={282} y={76} fontSize={8} fill={P.tertiary} fontWeight={600} letterSpacing={0.5}>MAIN</text>

      {/* Nav rows */}
      {[
        { label: "Dashboard", active: false, w: 60 },
        { label: "Pipeline",  active: true,  w: 48 },
        { label: "Analytics", active: false, w: 55 },
        { label: "Archive",   active: false, w: 44 },
      ].map(({ active, w }, i) => (
        <g key={i}>
          <rect x={276} y={82 + i * 28} width={160} height={22} rx={5}
            fill={active ? P.accent : "transparent"} opacity={active ? 0.1 : 0}
          />
          <rect x={284} y={87 + i * 28} width={16} height={16} rx={4}
            fill={active ? P.accent : P.border} opacity={active ? 0.65 : 0.5}
          />
          <rect x={306} y={91 + i * 28} width={w} height={8} rx={3}
            fill={active ? P.accent : P.subtle} opacity={active ? 0.7 : 0.4}
          />
          {active && <rect x={272} y={83} width={3} height={20} fill={P.accent} rx={1.5} />}
        </g>
      ))}

      {/* Divider */}
      <line x1={282} y1={200} x2={432} y2={200} stroke={P.border} strokeWidth={1} />

      {/* Settings row */}
      <rect x={284} y={207} width={16} height={16} rx={4} fill={P.border} opacity={0.5} />
      <rect x={306} y={211} width={44} height={8} rx={3} fill={P.subtle} opacity={0.4} />

      {/* Width label */}
      <line x1={272} y1={H - 8} x2={440} y2={H - 8} stroke={P.border} strokeWidth={0.75} />
      <text x={356} y={H - 2} fontSize={8} fill={P.tertiary} textAnchor="middle">168–240px</text>

      {/* Content stub */}
      <rect x={448} y={24} width={104} height={H - 32} fill={P.raised} rx={8} opacity={0.35} />
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={458} y={40 + i * 22} width={40 + (i % 3) * 20} height={8} rx={3} fill={P.border} opacity={0.8} />
      ))}
    </svg>
  );
}

// ── Global Header diagram ──────────────────────────────────────────────────────

function GlobalHeaderDiagram() {
  const W = 560, H = 72;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      <rect width={W} height={H} fill={P.raised} rx={12} />
      <rect x={0} y={0} width={W} height={H} fill={P.surface} rx={12} />
      <line x1={0} y1={H} x2={W} y2={H} stroke={P.border} strokeWidth={1} />

      {/* ⌘K search bar */}
      <rect x={16} y={20} width={200} height={32} fill={P.raised} rx={8} stroke={P.border} strokeWidth={1} />
      <rect x={30} y={31} width={80} height={8} rx={3} fill={P.border} />
      {/* ⌘K badge */}
      <rect x={188} y={27} width={20} height={16} fill={P.border} rx={4} />
      <text x={198} y={38} fontSize={8} fill={P.tertiary} textAnchor="middle">⌘K</text>

      {/* Search icon */}
      <circle cx={22} cy={36} r={5} fill="none" stroke={P.tertiary} strokeWidth={1.5} />
      <line x1={26} y1={40} x2={29} y2={43} stroke={P.tertiary} strokeWidth={1.5} strokeLinecap="round" />

      {/* Breadcrumb area (centre) */}
      <rect x={232} y={30} width={55} height={8} rx={3} fill={P.border} opacity={0.6} />
      <text x={294} y={37} fontSize={10} fill={P.border}>/</text>
      <rect x={302} y={30} width={70} height={8} rx={3} fill={P.accent} opacity={0.35} />

      {/* Right side actions */}
      {/* Notification bell */}
      <rect x={392} y={20} width={32} height={32} fill={P.raised} rx={8} />
      <text x={408} y={40} fontSize={14} textAnchor="middle" fill={P.subtle}>🔔</text>
      {/* Unread dot */}
      <circle cx={420} cy={22} r={4} fill={P.accent} />

      {/* Help */}
      <rect x={432} y={20} width={32} height={32} fill={P.raised} rx={8} />
      <text x={448} y={40} fontSize={13} textAnchor="middle" fill={P.subtle}>?</text>

      {/* User avatar */}
      <circle cx={524} cy={36} r={16} fill={P.green} opacity={0.7} />
      <rect x={504} y={32} width={40} height={6} rx={2} fill={P.surface} opacity={0.3} />

      {/* Separator */}
      <line x1={480} y1={24} x2={480} y2={48} stroke={P.border} strokeWidth={1} />

      {/* Label annotations */}
      <text x={116} y={H - 4} fontSize={8} fill={P.tertiary} textAnchor="middle">⌘K Search</text>
      <text x={337} y={H - 4} fontSize={8} fill={P.tertiary} textAnchor="middle">Breadcrumb / Context</text>
      <text x={408} y={H - 4} fontSize={8} fill={P.tertiary} textAnchor="middle">Notifications</text>
      <text x={524} y={H - 4} fontSize={8} fill={P.tertiary} textAnchor="middle">Profile</text>
    </svg>
  );
}

// ── 12-column grid diagram ─────────────────────────────────────────────────────

function GridDiagram() {
  const W = 560, H = 100;
  const cols = 12;
  const gutter = 6;
  const colW = (W - (cols + 1) * gutter) / cols;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      <rect width={W} height={H} fill={P.surface} rx={12} />

      {/* Grid columns */}
      {Array.from({ length: cols }).map((_, i) => {
        const x = gutter + i * (colW + gutter);
        return (
          <g key={i}>
            <rect x={x} y={12} width={colW} height={60} fill={P.accent} opacity={0.08} rx={2} />
            <text x={x + colW / 2} y={H - 8} fontSize={8} fill={P.tertiary} textAnchor="middle">{i + 1}</text>
          </g>
        );
      })}

      {/* Span examples */}
      {/* 12-span (full width) */}
      <rect x={gutter} y={16} width={W - 2 * gutter} height={14} fill={P.accent} opacity={0.18} rx={3} />
      <text x={W / 2} y={27} fontSize={9} fill={P.accent} textAnchor="middle" fontWeight={500}>12 col — full width</text>

      {/* 8+4 span */}
      <rect x={gutter} y={36} width={(colW + gutter) * 8 - gutter} height={14} fill={P.green} opacity={0.18} rx={3} />
      <text x={gutter + ((colW + gutter) * 8 - gutter) / 2} y={47} fontSize={9} fill={P.green} textAnchor="middle" fontWeight={500}>8 col</text>
      <rect x={gutter + (colW + gutter) * 8} y={36} width={(colW + gutter) * 4 - gutter} height={14} fill={P.amber} opacity={0.18} rx={3} />
      <text x={gutter + (colW + gutter) * 8 + ((colW + gutter) * 4 - gutter) / 2} y={47} fontSize={9} fill={P.amber} textAnchor="middle" fontWeight={500}>4 col</text>

      {/* 4+4+4 span */}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={gutter + (colW + gutter) * 4 * i} y={56} width={(colW + gutter) * 4 - gutter} height={14} fill={P.purple} opacity={0.18} rx={3} />
          <text x={gutter + (colW + gutter) * 4 * i + ((colW + gutter) * 4 - gutter) / 2} y={67} fontSize={9} fill={P.purple} textAnchor="middle" fontWeight={500}>4 col</text>
        </g>
      ))}
    </svg>
  );
}

// ── Density comparison diagram ─────────────────────────────────────────────────

function DensityDiagram() {
  const W = 560, H = 120;
  const colW = (W - 32) / 3;

  const modes = [
    { label: "Comfortable", py: 18, desc: "48px row height", color: P.green },
    { label: "Default",     py: 12, desc: "40px row height", color: P.accent },
    { label: "Compact",     py: 6,  desc: "32px row height", color: P.amber },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      <rect width={W} height={H} fill={P.surface} rx={12} />

      {modes.map(({ label, py, desc, color }, ci) => {
        const x = 8 + ci * (colW + 8);
        const rows = [60, 40, 28];
        const rowH = rows[ci];
        return (
          <g key={ci}>
            {/* Card */}
            <rect x={x} y={8} width={colW} height={H - 16} fill={P.raised} rx={8} stroke={P.border} strokeWidth={1} />

            {/* Header */}
            <text x={x + colW / 2} y={24} fontSize={9} fill={color} textAnchor="middle" fontWeight={600}>{label}</text>
            <text x={x + colW / 2} y={36} fontSize={8} fill={P.tertiary} textAnchor="middle">{desc}</text>

            {/* Row example */}
            <rect x={x + 8} y={44} width={colW - 16} height={rowH} fill={color} rx={5} opacity={0.1} stroke={color} strokeWidth={0.5} strokeOpacity={0.3} />
            <rect x={x + 16} y={44 + rowH / 2 - 4} width={colW * 0.45} height={8} rx={3} fill={color} opacity={0.35} />
            <rect x={x + 16} y={44 + rowH / 2 + 6} width={colW * 0.3} height={6} rx={3} fill={P.border} opacity={0.6} />

            {/* Height brace */}
            <line x1={x + colW - 8} y1={44} x2={x + colW - 8} y2={44 + rowH} stroke={color} strokeWidth={0.75} opacity={0.5} />
            <line x1={x + colW - 12} y1={44} x2={x + colW - 4} y2={44} stroke={color} strokeWidth={0.75} opacity={0.5} />
            <line x1={x + colW - 12} y1={44 + rowH} x2={x + colW - 4} y2={44 + rowH} stroke={color} strokeWidth={0.75} opacity={0.5} />
            <text x={x + colW - 10} y={44 + rowH / 2 + 3} fontSize={7} fill={color} textAnchor="end" opacity={0.8}>{rowH}px</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const GRID_BREAKPOINTS = [
  { bp: "< 640px",    cols: "4",  gutter: "16px", margin: "16px", note: "Mobile — single column cards, stacked layout" },
  { bp: "640–1023px", cols: "8",  gutter: "16px", margin: "24px", note: "Tablet — split views collapse to tabs" },
  { bp: "1024–1439px",cols: "12", gutter: "20px", margin: "32px", note: "Desktop — sidebar + content; primary breakpoint" },
  { bp: "1440px+",    cols: "12", gutter: "24px", margin: "48px", note: "Wide — constrain max-width at 1440px or 1536px" },
];

const NAV_COMPARISON = [
  { dimension: "Primary input",    rail: "Mouse / trackpad",       drawer: "Mouse / trackpad" },
  { dimension: "Width",            rail: "52–64px (icons only)",   drawer: "200–280px (icons + labels)" },
  { dimension: "Hover behaviour",  rail: "Tooltip on hover",       drawer: "Full label always visible" },
  { dimension: "Keyboard nav",     rail: "Tab to icon, tooltip announces label", drawer: "Tab to row, label in DOM" },
  { dimension: "Depth support",    rail: "1 level — flyout for sub-items", drawer: "2–3 levels with indentation" },
  { dimension: "When to use",      rail: "Space-constrained desktop (1024–1280px)", drawer: "Wide desktop (1280px+), complex IA" },
];

const RESPONSIVE_RULES = [
  "Auto-collapse the drawer to a rail at 1024px. Expose a hamburger toggle only below 640px (full overlay drawer).",
  "Never hide the sidebar entirely on desktop — persistent navigation is a core desktop advantage.",
  "Collapsed rail icons must be 44×44px touch targets minimum, even on desktop (mouse pointer can be imprecise).",
  "Use a CSS transition of 200ms ease-out for sidebar expand/collapse. Avoid layout shift on content area — slide the sidebar, reflow the content.",
  "Store the user's preference in localStorage. Respect it across sessions.",
  "On the Global Header, ⌘K should open a command palette modal, not a standard input. Map Ctrl+K on Windows.",
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DesktopLayoutPage() {
  return (
    <div>
      <PageHeader
        title="Desktop Layout"
        description="Layout patterns for desktop environments — side navigation, global header anatomy, the 12-column grid system, and density modes that scale from touch to mouse-first interfaces."
      />

      {/* ── Side Navigation ── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Side Navigation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Desktop top-level navigation moves to a persistent left-hand sidebar, freeing the content area and enabling hierarchical structures that a hamburger menu buries. Use a collapsed <strong>rail</strong> for space-constrained layouts and an expanded <strong>drawer</strong> when there is enough horizontal room.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-6 mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Rail vs Drawer — same information architecture, different density</p>
          <SideNavDiagram />
        </div>

        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-8">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Dimension", "Rail", "Drawer"].map((h, i) => (
                  <th key={h} className={`px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider ${i === 0 ? "text-[rgb(var(--text-tertiary))]" : "text-[rgb(var(--accent))]"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NAV_COMPARISON.map((row, i) => (
                <tr key={row.dimension} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))] whitespace-nowrap align-top pt-3.5">{row.dimension}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.rail}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.drawer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">Responsive strategy</h3>
        <ul className="space-y-3 text-[14px] text-[rgb(var(--text-secondary))] mb-8">
          {RESPONSIVE_RULES.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>{item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Global Header ── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Global Header</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          A persistent top bar anchors global actions that don't belong to any single section — search, notifications, and account. Keep it under 56px tall. Don't put navigation here on desktop; that belongs in the sidebar.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-6 mb-6">
          <GlobalHeaderDiagram />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { zone: "⌘K Command Search", rule: "Opens a full command palette (not just search). Supports slash commands, recent items, and keyboard-navigable results. Bind Ctrl+K on Windows." },
            { zone: "Contextual Breadcrumb", rule: "Shows the user's location within the information architecture. Update on every navigation. Truncate middle segments, never the last (current page)." },
            { zone: "Notification Bell", rule: "Show an unread count badge capped at 99+. Clicking opens a popover, not a new page. Mark read on open." },
            { zone: "User / Profile", rule: "Avatar + display name on wide screens. Avatar only on narrower desktops. Clicking opens an account popover with sign-out at the bottom." },
          ].map(({ zone, rule }) => (
            <div key={zone} className="rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <code className="text-[11px] font-mono text-[rgb(var(--accent))] block mb-1">{zone}</code>
              <p className="text-[11px] text-[rgb(var(--text-secondary))] leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 12-Column Grid ── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">12-Column Grid</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          A 12-column grid gives maximum compositional flexibility: it divides evenly into halves (6), thirds (4), quarters (3), and sixths (2). All desktop layouts are built from these column spans. Gutter and margin values scale with the viewport.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-6 mb-6">
          <GridDiagram />
        </div>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Breakpoint", "Columns", "Gutter", "Margin", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRID_BREAKPOINTS.map((row, i) => (
                <tr key={row.bp} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{row.bp}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-primary))] font-semibold">{row.cols}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.gutter}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.margin}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Density Modes ── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Density Modes</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Desktop users tolerate higher information density than touch users. Provide two CSS variable sets — <strong>default</strong> (mobile-inherited) and <strong>compact</strong> (desktop-optimised). A density toggle lets power users choose.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-6 mb-6">
          <DensityDiagram />
        </div>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden mb-3">
          <div className="flex items-center px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
            <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">globals.css — density token overrides</span>
          </div>
          <pre className="p-5 text-[12px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`:root {
  /* Touch / default */
  --spacing-row:    40px;
  --spacing-cell-y: 12px;
  --spacing-cell-x: 16px;
}

[data-density="compact"] {
  --spacing-row:    32px;
  --spacing-cell-y: 6px;
  --spacing-cell-x: 12px;
}

[data-density="comfortable"] {
  --spacing-row:    48px;
  --spacing-cell-y: 18px;
  --spacing-cell-x: 20px;
}`}</code></pre>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { mode: "Comfortable", when: "Onboarding flows, marketing pages, or when the primary audience is non-technical." },
            { mode: "Default",     when: "Standard app surfaces. Matches mobile muscle memory while gaining efficiency on desktop." },
            { mode: "Compact",     when: "Data-heavy dashboards, tables, and analytics views where users process many rows at once." },
          ].map(({ mode, when }) => (
            <div key={mode} className="rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <span className="text-[12px] font-semibold text-[rgb(var(--text-primary))] block mb-1">{mode}</span>
              <p className="text-[11px] text-[rgb(var(--text-secondary))] leading-relaxed">{when}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dashboard Layouts ── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Common Dashboard Layouts</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          These column-span compositions cover the majority of desktop dashboard needs. Build them from the 12-column grid using CSS Grid or a layout library.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Sidebar + Content",    grid: "3 + 9",  use: "Master-detail views, settings pages, document editors." },
            { name: "Content + Aside",      grid: "8 + 4",  use: "Article/post with metadata panel. Aside collapses to bottom on tablet." },
            { name: "Three-panel",          grid: "3+6+3",  use: "Complex tools: list → detail → inspector (e.g., email clients, IDEs)." },
            { name: "Dashboard grid",       grid: "4+4+4",  use: "Metric cards and chart widgets in equal columns." },
            { name: "Hero + two cards",     grid: "12/6+6", use: "Overview page: full-width chart above two metric panels." },
            { name: "Full bleed",           grid: "12",     use: "Maps, canvases, video, or tables that need every pixel." },
          ].map(({ name, grid, use }) => (
            <div key={name} className="rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 flex gap-4">
              <code className="text-[11px] font-mono text-[rgb(var(--accent))] shrink-0 mt-0.5">{grid}</code>
              <div>
                <span className="text-[12px] font-semibold text-[rgb(var(--text-primary))] block mb-1">{name}</span>
                <p className="text-[11px] text-[rgb(var(--text-secondary))] leading-relaxed">{use}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
