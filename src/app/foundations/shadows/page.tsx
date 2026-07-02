import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";

export const metadata: Metadata = { title: "Shadows" };

const SHADOWS = [
  {
    token: "shadow.sm",
    name: "Small",
    value: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
    use: "Subtle card lift, input fields",
  },
  {
    token: "shadow.md",
    name: "Medium",
    value: "0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)",
    use: "Dropdowns, popovers",
  },
  {
    token: "shadow.lg",
    name: "Large",
    value: "0 8px 32px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)",
    use: "Floating panels, sheets",
  },
  {
    token: "shadow.xl",
    name: "Extra Large",
    value: "0 16px 48px rgba(0,0,0,0.14), 0 8px 20px rgba(0,0,0,0.08)",
    use: "Modals, dialogs",
  },
  {
    token: "shadow.glass",
    name: "Glass",
    value: "0 0 0 1px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08)",
    use: "Frosted surfaces, sidebars, headers",
  },
  {
    token: "shadow.glow",
    name: "Glow",
    value: "0 0 0 1px rgba(52,168,101,0.3), 0 0 20px rgba(52,168,101,0.15)",
    use: "Focused inputs, active brand elements",
  },
];

const PRINCIPLES = [
  {
    label: "Elevation communicates depth",
    body: "Use larger shadows for elements that float further above the page. A tooltip sits higher than a card, and its shadow should say so.",
  },
  {
    label: "One shadow per surface",
    body: "Never stack multiple shadow tokens on the same element. If the built-in value isn't enough, reconsider whether the element needs to float at all.",
  },
  {
    label: "Glow is for interaction",
    body: "The glow shadow is brand-colored and reserved for focus states and active selections. It draws the eye — use it sparingly.",
  },
];

export default function ShadowsPage() {
  return (
    <div>
      <PageHeader
        title="Shadows"
        description="Six shadow tokens map to six elevation levels. Depth is not decoration — every shadow communicates that an element floats above the surface beneath it."
      />

      {/* ── Shadow cards ─────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Elevation Scale</h2>
        <div className="grid grid-cols-2 gap-5">
          {SHADOWS.map((s) => (
            <div
              key={s.token}
              className="flex flex-col gap-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5"
            >
              {/* Preview */}
              <div
                className="flex items-center justify-center rounded-xl bg-[rgb(var(--background))] border border-[rgb(var(--border-subtle))]"
                style={{ height: "6rem" }}
              >
                <div
                  className="w-16 h-10 rounded-lg bg-[rgb(var(--surface))]"
                  style={{ boxShadow: s.value }}
                />
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{s.name}</div>
                  <code className="text-[11px] font-mono text-[rgb(var(--accent))]">{s.token}</code>
                </div>
                <span className="text-[11px] text-[rgb(var(--text-tertiary))]">{s.use}</span>
              </div>

              {/* Value */}
              <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] rounded-lg px-3 py-2 leading-relaxed break-all">
                {s.value}
              </code>
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
                {["Token", "Name", "Use case"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SHADOWS.map((s, i) => (
                <tr
                  key={s.token}
                  className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${
                    i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"
                  }`}
                >
                  <td className="px-4 py-3">
                    <code className="font-mono text-[11px] text-[rgb(var(--accent))]">{s.token}</code>
                  </td>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{s.name}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))] text-[12px]">{s.use}</td>
                </tr>
              ))}
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
