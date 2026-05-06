import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Charting" };

// ── Layout helpers ────────────────────────────────────────────────────────────

/**
 * Cubic-bezier ribbon connecting two vertical spans.
 * Used for both Sankey links and Alluvial bands.
 */
function ribbon(
  lx: number, ly0: number, ly1: number,
  rx: number, ry0: number, ry1: number,
): string {
  const cx = (lx + rx) / 2;
  return [
    `M ${lx} ${ly0}`,
    `C ${cx} ${ly0} ${cx} ${ry0} ${rx} ${ry0}`,
    `L ${rx} ${ry1}`,
    `C ${cx} ${ry1} ${cx} ${ly1} ${lx} ${ly1}`,
    `Z`,
  ].join(" ");
}

// ── Palette ───────────────────────────────────────────────────────────────────

const P = {
  green:  "#34a865",
  blue:   "#60a5fa",
  amber:  "#f59e0b",
  purple: "#c084fc",
  orange: "#fb923c",
  slate:  "#94a3b8",
  surface: "#0d0d11",
  border:  "#262630",
  text:    "#f2f2f6",
  subtle:  "#9b9baa",
  tertiary:"#646473",
  grid:   "rgba(255,255,255,0.05)",
};

// ── Chart anatomy diagram ─────────────────────────────────────────────────────

function AnatomyDiagram() {
  const W = 560, H = 260;
  const bars = [
    { x: 90,  h: 120, label: "Asia",     color: P.green },
    { x: 180, h: 88,  label: "EMEA",     color: P.blue },
    { x: 270, h: 148, label: "Americas", color: P.amber },
    { x: 360, h: 64,  label: "ANZ",      color: P.purple },
  ];
  const bw = 52, baseY = 210;

  const labels = [
    { x: 30,  y: 28,  text: "Chart title",    tx: 95,  ty: 22  },
    { x: 20,  y: 120, text: "Y-axis",          tx: 15,  ty: 120 },
    { x: 470, y: 80,  text: "Grid lines",      tx: 450, ty: 60  },
    { x: 470, y: 155, text: "Data series",     tx: 312, ty: 140 },
    { x: 470, y: 220, text: "X-axis labels",   tx: 390, ty: 215 },
    { x: 30,  y: 245, text: "Legend",          tx: 120, ty: 245 },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      {/* Background */}
      <rect x={0} y={0} width={W} height={H} fill={P.surface} rx={12} />

      {/* Chart area border */}
      <rect x={60} y={12} width={380} height={210} fill="none" stroke={P.border} strokeWidth={1} rx={4} />

      {/* Title */}
      <text x={70} y={30} fontSize={11} fontWeight={600} fill={P.text}>Q1 Revenue by Region (£M)</text>

      {/* Grid lines */}
      {[0, 0.33, 0.67, 1].map((t, i) => {
        const y = baseY - t * 160;
        return (
          <g key={i}>
            <line x1={65} y1={y} x2={435} y2={y} stroke={P.grid} strokeWidth={1} />
            <text x={56} y={y + 4} fontSize={9} fill={P.tertiary} textAnchor="end">
              {Math.round(t * 120)}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {bars.map(({ x, h, label, color }) => (
        <g key={label}>
          <rect x={x + 5} y={baseY - h} width={bw} height={h} fill={color} opacity={0.85} rx={3} />
          <text x={x + bw / 2 + 5} y={baseY + 14} fontSize={9} fill={P.tertiary} textAnchor="middle">{label}</text>
        </g>
      ))}

      {/* Y-axis line */}
      <line x1={65} y1={15} x2={65} y2={baseY} stroke={P.border} strokeWidth={1} />
      {/* X-axis line */}
      <line x1={65} y1={baseY} x2={435} y2={baseY} stroke={P.border} strokeWidth={1} />

      {/* Legend */}
      {[
        { color: P.green,  label: "Series 1" },
        { color: P.blue,   label: "Series 2" },
        { color: P.amber,  label: "Series 3" },
        { color: P.purple, label: "Series 4" },
      ].map(({ color, label }, i) => (
        <g key={label} transform={`translate(${90 + i * 80} 248)`}>
          <rect x={0} y={-6} width={10} height={10} fill={color} rx={2} />
          <text x={14} y={4} fontSize={9} fill={P.subtle}>{label}</text>
        </g>
      ))}

      {/* Annotation lines and labels */}
      {/* Title annotation */}
      <line x1={200} y1={25} x2={210} y2={25} stroke={P.border} strokeWidth={1} strokeDasharray="2 2" />
      <text x={440} y={20} fontSize={9} fill={P.subtle} textAnchor="end">Title</text>
      <line x1={210} y1={25} x2={430} y2={18} stroke={P.border} strokeWidth={0.75} strokeDasharray="2 2" />

      {/* Grid annotation */}
      <text x={450} y={60} fontSize={9} fill={P.subtle}>Grid lines</text>
      <line x1={437} y1={57} x2={430} y2={57} stroke={P.border} strokeWidth={0.75} strokeDasharray="2 2" />

      {/* Series annotation */}
      <text x={450} y={148} fontSize={9} fill={P.subtle}>Data series</text>
      <line x1={362} y1={141} x2={449} y2={146} stroke={P.border} strokeWidth={0.75} strokeDasharray="2 2" />

      {/* X-axis annotation */}
      <text x={450} y={215} fontSize={9} fill={P.subtle}>X-axis</text>
      <line x1={409} y1={215} x2={448} y2={213} stroke={P.border} strokeWidth={0.75} strokeDasharray="2 2" />

      {/* Y-axis annotation */}
      <text x={56} y={110} fontSize={9} fill={P.subtle} textAnchor="end" transform="rotate(-90 56 110)">Y-axis</text>

      {/* Legend annotation */}
      <text x={68} y={243} fontSize={9} fill={P.subtle}>Legend</text>
      <line x1={87} y1={244} x2={91} y2={244} stroke={P.border} strokeWidth={0.75} strokeDasharray="2 2" />
    </svg>
  );
}

// ── Sankey diagram ────────────────────────────────────────────────────────────
//
// Traffic sources → Landing pages
// Sources:  Organic 600 · Paid 250 · Referral 150  (total 1000)
// Targets:  Homepage 450 · Blog 320 · Pricing 230   (total 1000)
//
// Scale:    (250 – 2×gap) / 1000  where gap=8  →  234/1000 = 0.234 px/unit
// Node positions are pre-computed below.

function SankeyDiagram() {
  const W = 560, H = 250;
  const NW = 16; // node width
  const RX = W - NW; // right column left edge = 544

  // Node y positions and heights (scale=0.234, gap=8)
  const L = {
    organic:  { y: 0,     h: 140, color: P.green,  label: "Organic Search", value: "600" },
    paid:     { y: 148,   h: 59,  color: P.blue,   label: "Paid Ads",       value: "250" },
    referral: { y: 215,   h: 35,  color: P.amber,  label: "Referral",       value: "150" },
  };
  const R = {
    homepage: { y: 0,     h: 105, color: P.green,  label: "Homepage",  value: "450" },
    blog:     { y: 113,   h: 75,  color: P.blue,   label: "Blog",      value: "320" },
    pricing:  { y: 196,   h: 54,  color: P.purple, label: "Pricing",   value: "230" },
  };

  // Links: [source node y-offset, target node y-offset, value × 0.234]
  // Each link tracks cumulative y within both source and target nodes.
  // (src_y0, src_y1, tgt_y0, tgt_y1) — all pre-computed
  const links: Array<{ path: string; color: string; opacity: number }> = [
    // Organic (src starts y=0) → Homepage (tgt starts y=0)
    { path: ribbon(NW,   0,     74.9,  RX, 0,    74.9),  color: P.green,  opacity: 0.35 },
    // Organic → Blog
    { path: ribbon(NW,   74.9,  117.1, RX, 113,  155.2), color: P.green,  opacity: 0.25 },
    // Organic → Pricing
    { path: ribbon(NW,   117.1, 140.4, RX, 196,  219.4), color: P.green,  opacity: 0.20 },
    // Paid (src starts y=148) → Homepage (tgt continues after Organic's 74.9)
    { path: ribbon(NW,   148,   166.7, RX, 74.9, 93.6),  color: P.blue,   opacity: 0.35 },
    // Paid → Blog
    { path: ribbon(NW,   166.7, 197.2, RX, 155.2,185.7), color: P.blue,   opacity: 0.25 },
    // Paid → Pricing
    { path: ribbon(NW,   197.2, 206.6, RX, 219.4,228.8), color: P.blue,   opacity: 0.20 },
    // Referral (src starts y=215) → Homepage
    { path: ribbon(NW,   215,   226.7, RX, 93.6, 105.3), color: P.amber,  opacity: 0.35 },
    // Referral → Blog
    { path: ribbon(NW,   226.7, 229.0, RX, 185.7,188.0), color: P.amber,  opacity: 0.25 },
    // Referral → Pricing
    { path: ribbon(NW,   229.0, 250.0, RX, 228.8,249.9), color: P.amber,  opacity: 0.30 },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      <rect width={W} height={H} fill={P.surface} rx={12} />

      {/* Links */}
      {links.map((link, i) => (
        <path key={i} d={link.path} fill={link.color} opacity={link.opacity} />
      ))}

      {/* Left nodes */}
      {Object.values(L).map(({ y, h, color, label, value }) => (
        <g key={label}>
          <rect x={0} y={y} width={NW} height={h} fill={color} rx={3} />
          <text x={NW + 6} y={y + h / 2 + 4} fontSize={10} fill={P.text} fontWeight={500}>{label}</text>
          <text x={NW + 6} y={y + h / 2 + 15} fontSize={9} fill={P.tertiary}>{value} sessions</text>
        </g>
      ))}

      {/* Right nodes */}
      {Object.values(R).map(({ y, h, color, label, value }) => (
        <g key={label}>
          <rect x={RX} y={y} width={NW} height={h} fill={color} rx={3} />
          <text x={RX - 6} y={y + h / 2 + 4} fontSize={10} fill={P.text} fontWeight={500} textAnchor="end">{label}</text>
          <text x={RX - 6} y={y + h / 2 + 15} fontSize={9} fill={P.tertiary} textAnchor="end">{value} sessions</text>
        </g>
      ))}
    </svg>
  );
}

// ── Alluvial diagram ──────────────────────────────────────────────────────────
//
// JobFlo application pipeline stage distribution over three months.
// Each column shows the percentage of all tracked applications in each stage.
// Ribbons show how the same stage persists and shifts across months.
//
// Data (totals normalised to 100%):
//   Jan 2025: Wishlist=45, Applied=35, Screening=15, Interview=5
//   Feb 2025: Wishlist=30, Applied=38, Screening=22, Interview=10
//   Mar 2025: Wishlist=20, Applied=35, Screening=28, Interview=17
//
// Scale: (260 – 3×8) / 100 = 2.36 px/unit

function AlluvialDiagram() {
  const W = 560, H = 260;
  const NW = 18; // column node width

  type StageKey = "wishlist" | "applied" | "screening" | "interview";
  const STAGES: Record<StageKey, { color: string; label: string }> = {
    wishlist:  { color: P.green,  label: "Wishlist" },
    applied:   { color: P.blue,   label: "Applied" },
    screening: { color: P.amber,  label: "Screening" },
    interview: { color: P.purple, label: "Interview" },
  };

  type ColData = { h: number; y: number };
  type Column = Record<StageKey, ColData>;

  // Pre-computed node heights and y positions (scale=2.36, gap=8)
  const cols: { label: string; x: number; nodes: Column }[] = [
    {
      label: "Jan 2025",
      x: 0,
      nodes: {
        wishlist:  { h: 106, y: 0   },
        applied:   { h: 83,  y: 114 },
        screening: { h: 35,  y: 205 },
        interview: { h: 12,  y: 248 },
      },
    },
    {
      label: "Feb 2025",
      x: 271,
      nodes: {
        wishlist:  { h: 71,  y: 0   },
        applied:   { h: 89,  y: 79  },
        screening: { h: 52,  y: 176 },
        interview: { h: 23,  y: 236 },
      },
    },
    {
      label: "Mar 2025",
      x: 542,
      nodes: {
        wishlist:  { h: 47,  y: 0   },
        applied:   { h: 83,  y: 55  },
        screening: { h: 66,  y: 146 },
        interview: { h: 40,  y: 220 },
      },
    },
  ];

  // Generate ribbons between consecutive column pairs
  const bands: Array<{ path: string; color: string }> = [];
  for (let ci = 0; ci < cols.length - 1; ci++) {
    const lCol = cols[ci];
    const rCol = cols[ci + 1];
    const lx = lCol.x + NW;
    const rx = rCol.x;
    for (const key of Object.keys(STAGES) as StageKey[]) {
      const l = lCol.nodes[key];
      const r = rCol.nodes[key];
      bands.push({
        path: ribbon(lx, l.y, l.y + l.h, rx, r.y, r.y + r.h),
        color: STAGES[key].color,
      });
    }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      <rect width={W} height={H} fill={P.surface} rx={12} />

      {/* Ribbon bands */}
      {bands.map((b, i) => (
        <path key={i} d={b.path} fill={b.color} opacity={0.28} />
      ))}

      {/* Column nodes + labels */}
      {cols.map((col) => {
        const isLast = col.x === 542;
        return (
          <g key={col.label}>
            {/* Column header */}
            <text
              x={col.x + NW / 2}
              y={H - 4}
              fontSize={9}
              fill={P.tertiary}
              fontWeight={600}
              letterSpacing={0.5}
              textAnchor="middle"
            >
              {col.label}
            </text>

            {(Object.keys(STAGES) as StageKey[]).map((key) => {
              const { h, y } = col.nodes[key];
              const { color, label } = STAGES[key];
              if (h < 4) return null;
              return (
                <g key={key}>
                  <rect x={col.x} y={y} width={NW} height={h} fill={color} rx={3} />
                  {/* Labels only on first and last columns */}
                  {!isLast && col.x === 0 && h >= 16 && (
                    <text x={-6} y={y + h / 2 + 4} fontSize={10} fill={P.text} fontWeight={500} textAnchor="end">
                      {label}
                    </text>
                  )}
                  {isLast && h >= 16 && (
                    <text x={col.x + NW + 6} y={y + h / 2 + 4} fontSize={10} fill={P.text} fontWeight={500}>
                      {label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Change annotations */}
      {/* Wishlist: shrinking — pipeline maturing */}
      <text x={130} y={44} fontSize={9} fill={P.tertiary} textAnchor="middle">Wishlist ↓ 45→20%</text>
      {/* Interview: growing — applications advancing */}
      <text x={130} y={252} fontSize={9} fill={P.tertiary} textAnchor="middle">Interview ↑ 5→17%</text>
    </svg>
  );
}

// ── Tooltip anatomy diagram ───────────────────────────────────────────────────

function TooltipDiagram() {
  return (
    <svg viewBox="0 0 400 180" className="w-full" style={{ maxHeight: 180 }}>
      <rect width={400} height={180} fill={P.surface} rx={12} />

      {/* Chart area hint */}
      <rect x={20} y={20} width={360} height={120} fill={P.border} opacity={0.3} rx={6} />

      {/* Vertical cursor line */}
      <line x1={195} y1={20} x2={195} y2={140} stroke={P.subtle} strokeWidth={1} strokeDasharray="3 2" />

      {/* Data point dot */}
      <circle cx={195} cy={72} r={5} fill={P.green} />
      <circle cx={195} cy={72} r={3} fill={P.surface} />

      {/* Tooltip bubble */}
      <rect x={210} y={45} width={130} height={72} fill="#1c1c24" rx={8} stroke={P.border} strokeWidth={1} />
      {/* Tooltip caret */}
      <polygon points="210,72 200,68 200,76" fill="#1c1c24" />

      {/* Tooltip content */}
      <text x={222} y={63} fontSize={9} fontWeight={600} fill={P.tertiary} letterSpacing={0.5}>MAY 2024</text>
      <rect x={222} y={69} width={8} height={8} fill={P.green} rx={2} />
      <text x={234} y={77} fontSize={10} fill={P.text}>Web</text>
      <text x={330} y={77} fontSize={10} fill={P.text} textAnchor="end" fontWeight={600}>62,400</text>
      <rect x={222} y={82} width={8} height={8} fill={P.blue} rx={2} />
      <text x={234} y={90} fontSize={10} fill={P.text}>iOS</text>
      <text x={330} y={90} fontSize={10} fill={P.text} textAnchor="end" fontWeight={600}>41,200</text>
      <line x1={222} y1={96} x2={330} y2={96} stroke={P.border} strokeWidth={1} />
      <text x={222} y={107} fontSize={10} fill={P.subtle}>Total</text>
      <text x={330} y={107} fontSize={10} fill={P.text} textAnchor="end" fontWeight={700}>103,600</text>

      {/* Annotation: date header */}
      <line x1={265} y1={63} x2={265} y2={42} stroke={P.border} strokeWidth={0.75} strokeDasharray="2 2" />
      <text x={265} y={38} fontSize={8} fill={P.tertiary} textAnchor="middle">Timestamp header</text>

      {/* Annotation: series rows */}
      <text x={24} y={90} fontSize={8} fill={P.tertiary}>Series rows</text>
      <line x1={55} y1={87} x2={65} y2={83} stroke={P.border} strokeWidth={0.75} strokeDasharray="2 2" />

      {/* Annotation: total */}
      <text x={24} y={113} fontSize={8} fill={P.tertiary}>Total row</text>
      <line x1={50} y1={110} x2={65} y2={105} stroke={P.border} strokeWidth={0.75} strokeDasharray="2 2" />
    </svg>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const CHART_TYPES = [
  { type: "Bar / Column",   when: "Comparing discrete categories",              avoid: "Continuous time series"                     },
  { type: "Line",           when: "Trends over time, continuous data",          avoid: "Fewer than 3 data points"                   },
  { type: "Area",           when: "Volume over time, stacked part-to-whole",    avoid: "More than 3 series"                         },
  { type: "Donut",          when: "Part-to-whole with 2–4 segments",            avoid: "5+ segments or subtle differences"          },
  { type: "Scatter",        when: "Correlations between two continuous variables", avoid: "Ordinal or categorical axes"             },
  { type: "Heatmap",        when: "Two-dimensional density",                    avoid: "Precise value comparison"                   },
  { type: "Sankey",         when: "Quantified flow through a network of stages", avoid: "Categorical change over time (use Alluvial)" },
  { type: "Alluvial",       when: "How a population shifts across categories over time", avoid: "Non-temporal flows between named nodes" },
  { type: "Treemap",        when: "Hierarchical part-to-whole at two levels",   avoid: "Comparing values without hierarchy"         },
  { type: "Funnel",         when: "Sequential drop-off through a defined process", avoid: "Non-linear processes or parallel paths"  },
];

const SANKEY_VS_ALLUVIAL = [
  { dimension: "Primary question", sankey: "Where does the flow go?", alluvial: "How does the distribution shift?" },
  { dimension: "Time dimension",   sankey: "Not implied — stages are logical, not temporal", alluvial: "Columns represent time periods" },
  { dimension: "Node meaning",     sankey: "Named entities (sources and targets)",           alluvial: "Categories within the same classification" },
  { dimension: "Link meaning",     sankey: "Quantity of flow between two specific nodes",    alluvial: "Continuity of a category across periods" },
  { dimension: "Total per column", sankey: "Can vary — sources ≠ targets is valid",          alluvial: "Should be equal — the same population over time" },
  { dimension: "Typical use",      sankey: "Website funnels, budget allocation, energy flows", alluvial: "Cohort analysis, segment migration, election results" },
];

export default function ChartingPage() {
  return (
    <div>
      <PageHeader
        title="Charting"
        description="Guidelines for building readable, accessible, and themeable charts in Sitka — covering chart anatomy, type selection, and in-depth documentation for Sankey and Alluvial flow diagrams."
      />

      {/* ── Chart type selection ─────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Chart type selection</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Start from the question the chart must answer, not from the data shape. The same dataset can be visualised in multiple ways — only one will answer the actual question directly.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Chart type", "Use when", "Avoid when"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHART_TYPES.map((row, i) => (
                <tr key={row.type} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className={`px-4 py-3 font-semibold whitespace-nowrap ${row.type === "Sankey" || row.type === "Alluvial" ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-primary))]"}`}>{row.type}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.when}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Chart anatomy ────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Chart anatomy</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Every Cartesian chart is built from the same set of elements. Keep them consistent — users should not have to re-learn where to look for the title, scale, or legend across different charts in your product.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-6 mb-6">
          <AnatomyDiagram />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { part: "Title",       rule: "1–8 words. State what the chart shows, not what to conclude. Keep it inside the chart boundary, not above it." },
            { part: "Y-axis",      rule: "Include units in the axis label (£M, ms, %). Start at zero for bar charts; truncating the axis exaggerates differences." },
            { part: "X-axis",      rule: "Date labels: abbreviate to 3 chars (Jan, Feb). Rotate only as a last resort — prefer shortening labels instead." },
            { part: "Grid lines",  rule: "Horizontal only. 5% white opacity in dark mode, 6% black in light mode. Never more than 5 grid lines on a chart." },
            { part: "Data series", rule: "Use the Sitka series palette. Direct-label bars when there are ≤5 data points; use a legend for more." },
            { part: "Legend",      rule: "Position at the top-right or bottom-center. Never on the right — it creates excessive horizontal scanning." },
          ].map(({ part, rule }) => (
            <div key={part} className="rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <span className="text-[12px] font-semibold text-[rgb(var(--text-primary))] block mb-1">{part}</span>
              <p className="text-[11px] text-[rgb(var(--text-secondary))] leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sankey diagrams ──────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sankey diagrams</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          A Sankey diagram shows the quantity of flow between named nodes arranged in columns. Link widths are proportional to the flow value — the wider the band, the larger the quantity moving from source to target. The total volume entering any node equals the total volume leaving it.
        </p>

        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-6 mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Traffic sources → Landing pages (1,000 sessions)</p>
          <SankeyDiagram />
        </div>

        <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">Anatomy</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            {
              term: "Node",
              def: "A named entity in the flow — a source, stage, or destination. Node height is proportional to total throughput. Rendered as a vertical rectangle.",
            },
            {
              term: "Link (band)",
              def: "The curved path between two nodes. Width = flow quantity × scale. Links stack within a node without overlap — order them largest-to-smallest for readability.",
            },
            {
              term: "Columns",
              def: "Left-to-right progression of stages. Nodes in the same column are independent — they don't share flow with each other, only with nodes in adjacent columns.",
            },
            {
              term: "Conservation",
              def: "Total flow in = total flow out at every node. If a Sankey doesn't balance, either the data is wrong or the diagram needs an explicit 'loss' or 'other' node.",
            },
          ].map(({ term, def }) => (
            <div key={term} className="rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <code className="text-[11px] font-mono text-[rgb(var(--accent))] block mb-1">{term}</code>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{def}</p>
            </div>
          ))}
        </div>

        <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">When to use</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="rounded-[10px] p-4" style={{ backgroundColor: "rgba(52,168,101,0.08)", border: "1px solid rgba(52,168,101,0.2)" }}>
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: P.green }}>Use Sankey</span>
            <ul className="mt-2 space-y-1.5">
              {[
                "Website traffic funnels (source → page → conversion)",
                "Budget allocation (revenue streams → departments → projects)",
                "Energy or material flow (input → process → waste / output)",
                "User journey mapping across feature areas",
                "Supply chain from origin to destination",
              ].map((item) => (
                <li key={item} className="text-[12px] text-[rgb(var(--text-secondary))] flex gap-2">
                  <span style={{ color: P.green }} className="shrink-0">→</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[10px] p-4" style={{ backgroundColor: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)" }}>
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: P.orange }}>Avoid Sankey when</span>
            <ul className="mt-2 space-y-1.5">
              {[
                "You want to show change over time — use an Alluvial instead",
                "Nodes are not conserved (data in ≠ data out without explanation)",
                "You have more than ~6 source nodes — links become illegible",
                "Precise values matter — use a table or stacked bar for comparison",
                "All flows are roughly equal — widths provide no information",
              ].map((item) => (
                <li key={item} className="text-[12px] text-[rgb(var(--text-secondary))] flex gap-2">
                  <span style={{ color: P.orange }} className="shrink-0">→</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">Implementation</h3>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden mb-3">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
            <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">SankeyChart.tsx — using d3-sankey</span>
          </div>
          <pre className="p-5 text-[12px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`import { sankey, sankeyLinkHorizontal, SankeyNode, SankeyLink } from "d3-sankey";

interface RawNode { id: string; label: string; }
interface RawLink { source: string; target: string; value: number; }

export function SankeyChart({ nodes, links, width, height }: {
  nodes: RawNode[];
  links: RawLink[];
  width: number;
  height: number;
}) {
  const { nodes: laidOut, links: laidOutLinks } = sankey<RawNode, RawLink>()
    .nodeId((d) => d.id)
    .nodeWidth(16)
    .nodePadding(8)
    .extent([[0, 0], [width, height]])({ nodes, links });

  return (
    <svg width={width} height={height}>
      {laidOutLinks.map((link, i) => (
        <path
          key={i}
          d={sankeyLinkHorizontal()(link) ?? ""}
          fill="none"
          stroke={colorForSource(link.source)}
          strokeWidth={Math.max(1, link.width ?? 0)}
          strokeOpacity={0.35}
        />
      ))}
      {laidOut.map((node) => (
        <rect
          key={node.id}
          x={node.x0} y={node.y0}
          width={(node.x1 ?? 0) - (node.x0 ?? 0)}
          height={(node.y1 ?? 0) - (node.y0 ?? 0)}
          fill={colorForNode(node.id)}
        />
      ))}
    </svg>
  );
}`}</code></pre>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { lib: "d3-sankey",    note: "Official D3 plugin. Full control over layout and rendering. Recommended when you need custom interaction or animation." },
            { lib: "Nivo · Sankey", note: "React wrapper with built-in tooltips, theming, and responsive container. Good for dashboards where speed matters more than customisation." },
            { lib: "Swift Charts", note: "No native Sankey support. Use a custom Shape implementation with Path and cubic bezier curves. Performance is excellent — keep to <50 links." },
          ].map(({ lib, note }) => (
            <div key={lib} className="rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <code className="text-[11px] font-mono text-[rgb(var(--accent))] block mb-1">{lib}</code>
              <p className="text-[11px] text-[rgb(var(--text-secondary))] leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Alluvial diagrams ────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Alluvial diagrams</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          An Alluvial diagram is a specialisation of Sankey where each column represents a point in time and each row of bands represents the same category persisting across periods. The vertical position and height of a band shows the category's share; the drift between columns reveals movement — in JobFlo, applications advancing through the pipeline, stalling in a stage, or reaching terminal outcomes like Rejected or Accepted.
        </p>

        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-6 mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">JobFlo application pipeline stage distribution — Jan to Mar 2025</p>
          <AlluvialDiagram />
          <div className="flex items-center gap-5 mt-4 justify-center">
            {[
              { color: P.green,  label: "Wishlist" },
              { color: P.blue,   label: "Applied" },
              { color: P.amber,  label: "Screening" },
              { color: P.purple, label: "Interview" },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-2 text-[11px] text-[rgb(var(--text-tertiary))]">
                <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">Reading an Alluvial</h3>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            {
              signal: "Band height increases",
              meaning: "That stage's share of the total grew between periods. The band expands upward or downward depending on position.",
            },
            {
              signal: "Band height decreases",
              meaning: "That stage's share shrank. The most diagnostic case: Wishlist shrinking while Interview grows signals a healthy, advancing pipeline.",
            },
            {
              signal: "Band crosses another",
              meaning: "Two tiers swapped relative size. Crossing bands are visually prominent — they signal a major shift worth annotating.",
            },
          ].map(({ signal, meaning }) => (
            <div key={signal} className="rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <span className="text-[12px] font-semibold text-[rgb(var(--text-primary))] block mb-1">{signal}</span>
              <p className="text-[11px] text-[rgb(var(--text-secondary))] leading-relaxed">{meaning}</p>
            </div>
          ))}
        </div>

        <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">Design rules</h3>
        <ul className="space-y-3 text-[14px] text-[rgb(var(--text-secondary))] mb-8">
          {[
            "Sort categories by size at the first column, largest to smallest. Maintain that order across all columns — do not re-sort between periods. Users track bands by position, not colour alone.",
            "Normalise totals to 100% unless the absolute population size is the point. Percentage alluvials are easier to read because all columns have the same height.",
            "Use 4 categories or fewer. Beyond that, thin bands become illegible and the diagram loses its glanceability advantage over a stacked bar chart.",
            "Annotate bands that cross. A crossing is the most significant event in an alluvial — it deserves a callout note explaining what drove the change.",
            "Show at most 5 time periods (columns). More columns compress the bands and make individual change unreadable. Use a stacked area chart for long time series.",
            "Band opacity at 25–35% allows the overlap zone to be read as a blend. Lower opacity loses the band; higher opacity obscures the space between columns.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">Implementation</h3>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
          <div className="flex items-center px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
            <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">AlluvialChart.tsx — SVG with d3-shape</span>
          </div>
          <pre className="p-5 text-[12px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`import { linkHorizontal } from "d3-shape";

// Each band connects the same category across two adjacent columns.
// left / right describe the vertical span in the column.
interface Band {
  category: string;
  color: string;
  left:  { y0: number; y1: number };  // top and bottom y in left column
  right: { y0: number; y1: number };  // top and bottom y in right column
}

function ribbonPath(
  lx: number, ly0: number, ly1: number,
  rx: number, ry0: number, ry1: number,
): string {
  const cx = (lx + rx) / 2;
  return [
    \`M \${lx} \${ly0}\`,
    \`C \${cx} \${ly0} \${cx} \${ry0} \${rx} \${ry0}\`,
    \`L \${rx} \${ry1}\`,
    \`C \${cx} \${ry1} \${cx} \${ly1} \${lx} \${ly1}\`,
    "Z",
  ].join(" ");
}

export function AlluvialChart({ bands, lx, rx }: {
  bands: Band[];
  lx: number;  // right edge of left column
  rx: number;  // left edge of right column
}) {
  return (
    <>
      {bands.map((band) => (
        <path
          key={band.category}
          d={ribbonPath(lx, band.left.y0, band.left.y1, rx, band.right.y0, band.right.y1)}
          fill={band.color}
          fillOpacity={0.3}
        />
      ))}
    </>
  );
}`}</code></pre>
        </div>
      </section>

      {/* ── Sankey vs Alluvial ───────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sankey vs Alluvial</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          They look similar — both use curved bands between vertical bars — but they answer fundamentally different questions.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Dimension", "Sankey", "Alluvial"].map((h, i) => (
                  <th key={h} className={`px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider ${i === 0 ? "text-[rgb(var(--text-tertiary))]" : i === 1 ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-tertiary))]"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SANKEY_VS_ALLUVIAL.map((row, i) => (
                <tr key={row.dimension} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))] whitespace-nowrap align-top pt-3.5">{row.dimension}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.sankey}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.alluvial}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Tooltip patterns ─────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Tooltip patterns</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Tooltips are the primary interaction surface for charts. They surface precise values that would clutter the chart if always visible.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-6 mb-5">
          <TooltipDiagram />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { rule: "Trigger on the nearest data point", body: "Use a vertical cursor line that snaps to the nearest x-value as the pointer moves. Don't require hovering directly over a dot." },
            { rule: "Show all series at that x", body: "List every series at the hovered x-value with its colour swatch, name, and formatted value. Add a total row at the bottom when summing is meaningful." },
            { rule: "Position intelligently", body: "Default right of cursor. Flip left when within 140px of the right viewport edge. Never cover the data the tooltip is describing." },
            { rule: "Format values consistently", body: "Match the axis format: if the y-axis shows £M, the tooltip shows £42.3M — not 42300000. Use the same number of decimal places for all series." },
            { rule: "Sankey tooltips", body: "Show the link's flow value and percentage of source total on hover. Highlight the hovered link by increasing its opacity; dim all others to 15%." },
            { rule: "Alluvial tooltips", body: "Show the stage name, current period percentage, and delta from the previous period (▲ 5pp or ▼ 8pp). Highlight the full band across all columns." },
          ].map(({ rule, body }) => (
            <div key={rule} className="rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <span className="text-[12px] font-semibold text-[rgb(var(--text-primary))] block mb-1">{rule}</span>
              <p className="text-[11px] text-[rgb(var(--text-secondary))] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Responsive ───────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Responsive behaviour</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Breakpoint", "Bar / Line / Area", "Sankey / Alluvial"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  bp: "< 480px",
                  standard: "Show last 7 data points only. Switch to a single-series sparkline if multiple series become unreadable.",
                  flow: "Collapse to a summary table or a stacked bar with percentage labels. Flow diagrams are rarely legible below 480px.",
                },
                {
                  bp: "480–768px",
                  standard: "Reduce x-axis label density by 50%. Hide the legend and use direct labels on the last data point.",
                  flow: "Reduce node label font to 10px. Hide secondary labels (sub-values beneath node names). Shorten to 2 columns if 3+ columns are used.",
                },
                {
                  bp: "> 768px",
                  standard: "Full chart with all labels, legend, and interaction. Enable zoom if the time range exceeds 90 data points.",
                  flow: "Full diagram with all labels, values, and hover interactions. Use a minimum width of 560px for Sankey and 540px for Alluvial.",
                },
              ].map((row, i) => (
                <tr key={row.bp} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap align-top pt-3.5">{row.bp}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.standard}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.flow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Accessibility ─────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-3 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'Wrap every SVG chart in <figure>. Add role="img" and aria-label to the <svg> element. The label should describe the key insight, not just the chart title: "Line chart showing 40% growth in weekly active users between January and June 2024."',
            "Provide a data table alternative for all charts. Render it visually hidden with the sr-only utility and make it focusable from a visible 'View as table' link adjacent to the chart.",
            "Never use colour as the only encoding. Sankey links and Alluvial bands must also differ by opacity, pattern, or direct label so colour-blind users can distinguish them.",
            "Sankey and Alluvial diagrams are complex. Supplement them with a written summary paragraph explaining the main finding. For screen reader users, the summary is the chart.",
            "Interactive charts must be keyboard navigable. Focus each data point with Tab, announce value + context with aria-live, and allow Escape to dismiss any open tooltip.",
            "Touch targets on mobile chart interactions (data point dots, node rectangles in Sankey) must be at least 44×44dp. Invisible hit areas are fine — expand the touchable area beyond the visual element.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
