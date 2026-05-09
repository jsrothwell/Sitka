import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Responsive Grid" };

const BREAKPOINTS = [
  { name: "xs",  token: "--screen-xs",  value: "360px",  tailwind: "—",     desc: "Small mobile" },
  { name: "sm",  token: "--screen-sm",  value: "640px",  tailwind: "sm:",   desc: "Large mobile / small tablet" },
  { name: "md",  token: "--screen-md",  value: "768px",  tailwind: "md:",   desc: "Tablet portrait" },
  { name: "lg",  token: "--screen-lg",  value: "1024px", tailwind: "lg:",   desc: "Tablet landscape / small desktop" },
  { name: "xl",  token: "--screen-xl",  value: "1280px", tailwind: "xl:",   desc: "Desktop" },
  { name: "2xl", token: "--screen-2xl", value: "1536px", tailwind: "2xl:",  desc: "Wide desktop" },
];

const GRID_USAGE = [
  { breakpoint: "xs  (360–639px)",   cols: "4",  gutter: "16px", margin: "16px", use: "Single-column mobile layouts" },
  { breakpoint: "sm  (640–767px)",   cols: "4",  gutter: "16px", margin: "24px", use: "Wide mobile, compact grid" },
  { breakpoint: "md  (768–1023px)",  cols: "8",  gutter: "20px", margin: "24px", use: "Tablet — 2–3 column patterns" },
  { breakpoint: "lg  (1024–1279px)", cols: "12", gutter: "24px", margin: "32px", use: "Desktop — full 12-col available" },
  { breakpoint: "xl  (1280–1535px)", cols: "12", gutter: "24px", margin: "48px", use: "Wide desktop" },
  { breakpoint: "2xl (1536px+)",     cols: "12", gutter: "24px", margin: "auto (max-width: 1440px)", use: "Capped layout" },
];

const SPAN_PATTERNS = [
  { pattern: "Full width",      span: "col-span-12",   desc: "Page-level containers, heroes" },
  { pattern: "Two thirds",      span: "col-span-8",    desc: "Main content + narrow sidebar" },
  { pattern: "Half",            span: "col-span-6",    desc: "Paired cards, split layouts" },
  { pattern: "Third",           span: "col-span-4",    desc: "Three-column card grids" },
  { pattern: "Quarter",         span: "col-span-3",    desc: "Four-column stat tiles" },
  { pattern: "Sidebar",         span: "col-span-3 / col-span-9", desc: "Classic sidebar + content" },
];

export default function GridPage() {
  return (
    <div>
      <PageHeader
        title="Responsive Grid"
        description="A 12-column grid with six breakpoints. Columns, gutters, and margins scale by viewport width. The grid is Tailwind-native — no additional configuration is needed."
      />

      {/* ── Breakpoints ──────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Breakpoints</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Name", "Value", "Tailwind prefix", "Context"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BREAKPOINTS.map((row) => (
                <tr key={row.name} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.name}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-primary))]">{row.value}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.tailwind}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Grid spec ────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Grid specification</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Breakpoint", "Columns", "Gutter", "Margin", "Use case"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRID_USAGE.map((row) => (
                <tr key={row.breakpoint} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.breakpoint}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-primary))] font-semibold">{row.cols}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.gutter}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.margin}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Column span patterns ─────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Common span patterns</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Pattern", "Tailwind", "Description"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPAN_PATTERNS.map((row) => (
                <tr key={row.pattern} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.pattern}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.span}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Usage ───────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Code examples</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">Responsive card grid</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] leading-relaxed overflow-x-auto"><code>{`<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-4 lg:gap-6
  px-4 lg:px-8
">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>`}</code></pre>
          </div>
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">Sidebar + content layout</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] leading-relaxed overflow-x-auto"><code>{`<div className="
  grid
  grid-cols-1 lg:grid-cols-12
  gap-6
  max-w-[1440px] mx-auto
  px-4 lg:px-8
">
  <aside className="lg:col-span-3">
    <Nav />
  </aside>

  <main className="lg:col-span-9">
    {children}
  </main>
</div>`}</code></pre>
          </div>
        </div>
      </section>

      {/* ── Guidelines ──────────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Guidelines</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Always start with the mobile layout first (grid-cols-1) and layer up with breakpoint prefixes.",
            "Use gap-4 (16px) as the baseline gutter. Increase to gap-6 on lg+ for breathing room.",
            "Cap page-level containers at max-w-[1440px] to prevent over-wide content lines on ultra-wide monitors.",
            "Never mix fixed-pixel widths with grid-based columns — let the grid control horizontal sizing.",
            "12 columns gives even splits for 2 (6), 3 (4), 4 (3), and 6 (2) items without remainder columns.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
