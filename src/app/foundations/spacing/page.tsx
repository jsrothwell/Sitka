import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Spacing" };

const SCALE = [
  { token: "spacing.0",  value: "0px",  px: 0,  use: "Reset, borderless flush" },
  { token: "spacing.1",  value: "4px",  px: 4,  use: "Icon gaps, tight insets" },
  { token: "spacing.2",  value: "8px",  px: 8,  use: "Inline element gaps" },
  { token: "spacing.3",  value: "12px", px: 12, use: "Small padding, badge insets" },
  { token: "spacing.4",  value: "16px", px: 16, use: "Base component padding" },
  { token: "spacing.5",  value: "20px", px: 20, use: "Input height padding, row gaps" },
  { token: "spacing.6",  value: "24px", px: 24, use: "Card padding, section gutter" },
  { token: "spacing.8",  value: "32px", px: 32, use: "Content block separation" },
  { token: "spacing.10", value: "40px", px: 40, use: "Between major sections" },
  { token: "spacing.12", value: "48px", px: 48, use: "Page-level vertical rhythm" },
  { token: "spacing.16", value: "64px", px: 64, use: "Hero padding, modal spacing" },
  { token: "spacing.20", value: "80px", px: 80, use: "Large layout breathing room" },
  { token: "spacing.24", value: "96px", px: 96, use: "Max vertical section gap" },
];

const MAX_PX = 96;

const PRINCIPLES = [
  {
    label: "Base unit",
    body: "All spacing values are multiples of 4px. This keeps layouts aligned to a consistent grid and makes density decisions predictable.",
  },
  {
    label: "Semantic use",
    body: "Choose spacing by intent, not by feel. Use spacing.4 for component padding, spacing.6 for card insets, spacing.10+ for section separation.",
  },
  {
    label: "Never hardcode",
    body: "Reference a token — never a raw pixel value. When the base unit changes, every layout updates automatically.",
  },
];

export default function SpacingPage() {
  return (
    <div>
      <PageHeader
        title="Spacing"
        description="A 4px base unit scales into 13 steps. Every layout gap, padding, and margin maps to one of these tokens."
      />

      {/* ── Visual scale ─────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Scale</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          {SCALE.map((step, i) => (
            <div
              key={step.token}
              className={`flex items-center gap-5 px-5 py-3.5 ${
                i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"
              }`}
            >
              {/* Token name */}
              <code className="w-28 flex-shrink-0 text-[12px] font-mono text-[rgb(var(--accent))]">
                {step.token}
              </code>

              {/* Bar */}
              <div className="flex-1 flex items-center gap-3 min-w-0">
                {step.px > 0 ? (
                  <div
                    className="h-5 rounded-[3px] flex-shrink-0"
                    style={{
                      width: `${(step.px / MAX_PX) * 100}%`,
                      backgroundColor: "rgb(var(--accent) / 0.25)",
                      borderLeft: "2px solid rgb(var(--accent) / 0.7)",
                    }}
                  />
                ) : (
                  <div className="h-5 w-px bg-[rgb(var(--border))] flex-shrink-0" />
                )}
              </div>

              {/* Value */}
              <div className="w-12 flex-shrink-0 text-right">
                <span className="text-[12px] font-mono font-semibold text-[rgb(var(--text-primary))]">
                  {step.value}
                </span>
              </div>

              {/* Use case */}
              <div className="w-52 flex-shrink-0 text-right">
                <span className="text-[12px] text-[rgb(var(--text-tertiary))]">{step.use}</span>
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
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCALE.map((step, i) => {
                const twStep = step.token.replace("spacing.", "");
                return (
                  <tr
                    key={step.token}
                    className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${
                      i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <code className="font-mono text-[11px] text-[rgb(var(--accent))]">{step.token}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-[12px] text-[rgb(var(--text-primary))]">{step.value}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-[11px] text-[rgb(var(--text-secondary))]">
                        p-{twStep} / gap-{twStep}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))] text-[12px]">{step.use}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Principles ───────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage Principles</h2>
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
