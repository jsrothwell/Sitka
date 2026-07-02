import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";

export const metadata: Metadata = { title: "Border Radius" };

const RADII = [
  {
    token: "borderRadius.sm",
    name: "Small",
    value: "6px",
    px: 6,
    use: "Badges, tags, kbd elements",
  },
  {
    token: "borderRadius.md",
    name: "Medium",
    value: "10px",
    px: 10,
    use: "Buttons, inputs, small cards",
  },
  {
    token: "borderRadius.lg",
    name: "Large",
    value: "14px",
    px: 14,
    use: "Cards, panels, modals",
  },
  {
    token: "borderRadius.xl",
    name: "Extra Large",
    value: "20px",
    px: 20,
    use: "Feature cards, image containers",
  },
  {
    token: "borderRadius.2xl",
    name: "2x Large",
    value: "28px",
    px: 28,
    use: "Hero sections, large surfaces",
  },
  {
    token: "borderRadius.full",
    name: "Full",
    value: "9999px",
    px: 9999,
    use: "Pills, avatars, circular buttons",
  },
];

const PRINCIPLES = [
  {
    label: "Match scale to size",
    body: "Larger elements use larger radii. A modal at 14px feels right; that same radius on a badge feels too round. Let the element's footprint guide the choice.",
  },
  {
    label: "Consistency within context",
    body: "All interactive controls in a form — inputs, selects, buttons — should share the same radius. Inconsistency within a group signals a mistake, not variation.",
  },
  {
    label: "Full is for circles",
    body: "borderRadius.full is for elements where height equals width, or for pill-shaped labels. Applying it to a wide button creates an awkward stadium shape.",
  },
];

export default function BorderRadiusPage() {
  return (
    <div>
      <PageHeader
        title="Border Radius"
        description="Six steps from subtle to full. Radius is a density signal — tighter corners feel more utilitarian, rounder corners feel more approachable."
      />

      {/* ── Visual scale ─────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Scale</h2>
        <div className="grid grid-cols-3 gap-4">
          {RADII.map((r) => (
            <div
              key={r.token}
              className="flex flex-col gap-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5"
            >
              {/* Preview */}
              <div
                className="flex items-center justify-center bg-[rgb(var(--background))] border border-[rgb(var(--border-subtle))]"
                style={{ height: "7rem", borderRadius: "10px" }}
              >
                <div
                  className="w-20 h-12 bg-[rgb(var(--accent))]"
                  style={{
                    borderRadius: r.px >= 9999 ? "9999px" : `${r.px}px`,
                    opacity: 0.85,
                  }}
                />
              </div>

              {/* Meta */}
              <div>
                <div className="flex items-baseline justify-between mb-0.5">
                  <span className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{r.name}</span>
                  <code className="text-[12px] font-mono font-semibold text-[rgb(var(--text-primary))]">{r.value}</code>
                </div>
                <code className="text-[11px] font-mono text-[rgb(var(--accent))]">{r.token}</code>
                <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-1">{r.use}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reference table ──────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Token Reference</h2>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Token", "Value", "Tailwind", "Use case"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RADII.map((r, i) => {
                const twMap: Record<string, string> = {
                  "borderRadius.sm":  "rounded-md",
                  "borderRadius.md":  "rounded-[10px]",
                  "borderRadius.lg":  "rounded-[14px]",
                  "borderRadius.xl":  "rounded-[20px]",
                  "borderRadius.2xl": "rounded-[28px]",
                  "borderRadius.full":"rounded-full",
                };
                return (
                  <tr
                    key={r.token}
                    className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${
                      i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <code className="font-mono text-[11px] text-[rgb(var(--accent))]">{r.token}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-[12px] text-[rgb(var(--text-primary))]">{r.value}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-[11px] text-[rgb(var(--text-secondary))]">{twMap[r.token]}</code>
                    </td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))] text-[12px]">{r.use}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Elements in use ─────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Elements in use</h2>
        <p className="text-[13px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Each radius maps to a specific family of elements. Mixing radii inside a component signals inconsistency — use the same step for all controls in a group.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              label: "Badge · sm · 6px",
              demo: (
                <div className="flex flex-wrap gap-2 items-center justify-center">
                  {["Active","Beta","New"].map((t) => (
                    <span key={t} className="text-[11px] font-semibold px-2 py-0.5 border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))]" style={{ borderRadius: "6px" }}>{t}</span>
                  ))}
                </div>
              ),
            },
            {
              label: "Button · md · 10px",
              demo: (
                <div className="flex gap-2 items-center justify-center flex-wrap">
                  <button className="text-[13px] font-semibold px-4 py-2 text-white" style={{ borderRadius: "10px", background: "var(--nav-active-color)" }}>Save</button>
                  <button className="text-[13px] font-semibold px-4 py-2 border border-[rgb(var(--border))] text-[rgb(var(--text-primary))] bg-[rgb(var(--surface))]" style={{ borderRadius: "10px" }}>Cancel</button>
                </div>
              ),
            },
            {
              label: "Input · md · 10px",
              demo: (
                <div className="px-3 py-2 border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[13px] text-[rgb(var(--text-tertiary))]" style={{ borderRadius: "10px" }}>
                  name@company.com
                </div>
              ),
            },
            {
              label: "Card · lg · 14px",
              demo: (
                <div className="p-4 border border-[rgb(var(--border))] bg-[rgb(var(--surface))] flex flex-col gap-2" style={{ borderRadius: "14px" }}>
                  <div className="h-2 w-20 rounded-full bg-[rgb(var(--surface-raised))]" />
                  <div className="h-2 w-28 rounded-full bg-[rgb(var(--surface-raised))]" />
                  <div className="h-2 w-16 rounded-full bg-[rgb(var(--surface-raised))]" />
                </div>
              ),
            },
            {
              label: "Feature card · xl · 20px",
              demo: (
                <div className="p-4 border border-[rgb(var(--border))] bg-[rgb(var(--surface))] flex flex-col gap-3" style={{ borderRadius: "20px" }}>
                  <div className="h-10 rounded-[10px] bg-[rgb(var(--surface-raised))]" />
                  <div className="h-2 w-24 rounded-full bg-[rgb(var(--surface-raised))]" />
                </div>
              ),
            },
            {
              label: "Avatar · full · pill",
              demo: (
                <div className="flex items-center gap-3 justify-center">
                  {["#34a865","#60a5fa","#f59e0b"].map((c, i) => (
                    <span key={i} className="w-9 h-9 flex items-center justify-center text-[13px] font-bold text-white shrink-0" style={{ borderRadius: "9999px", background: c }}>
                      {["JR","AS","MK"][i]}
                    </span>
                  ))}
                </div>
              ),
            },
          ].map(({ label, demo }) => (
            <div key={label} className="rounded-[14px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
              <div className="flex items-center justify-center bg-[rgb(var(--background))] px-4 py-6">
                {demo}
              </div>
              <div className="px-4 py-2.5 border-t border-[rgb(var(--border))]">
                <p className="text-[11px] text-[rgb(var(--text-tertiary))]">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Principles ───────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Principles</h2>
        <div className="grid grid-cols-3 gap-4">
          {PRINCIPLES.map((p) => (
            <div
              key={p.label}
              className="flex flex-col gap-2 rounded-[10px] p-5"
              style={{ backgroundColor: "var(--card-tint-bg)" }}
            >
              <span
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--nav-active-color)" }}
              >
                {p.label}
              </span>
              <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
