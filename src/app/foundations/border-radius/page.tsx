import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

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
