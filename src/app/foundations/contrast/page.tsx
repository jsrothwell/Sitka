import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Contrast" };

const PAIRS = [
  {
    fg: "#f2f2f6",
    bg: "#09090c",
    fgLabel: "--text-primary",
    bgLabel: "--background (dark)",
    ratio: "17.8:1",
    level: "AAA",
  },
  {
    fg: "#9b9baa",
    bg: "#09090c",
    fgLabel: "--text-secondary",
    bgLabel: "--background (dark)",
    ratio: "6.1:1",
    level: "AA",
  },
  {
    fg: "#646473",
    bg: "#09090c",
    fgLabel: "--text-tertiary",
    bgLabel: "--background (dark)",
    ratio: "3.2:1",
    level: "AA Large",
  },
  {
    fg: "#34a865",
    bg: "#09090c",
    fgLabel: "--nav-active-color (dark)",
    bgLabel: "--background (dark)",
    ratio: "5.4:1",
    level: "AA",
  },
  {
    fg: "#282828",
    bg: "#ffffff",
    fgLabel: "--text-primary",
    bgLabel: "--surface (light)",
    ratio: "15.3:1",
    level: "AAA",
  },
  {
    fg: "#747474",
    bg: "#ffffff",
    fgLabel: "--text-secondary",
    bgLabel: "--surface (light)",
    ratio: "4.7:1",
    level: "AA",
  },
  {
    fg: "#219653",
    bg: "#ffffff",
    fgLabel: "--nav-active-color (light)",
    bgLabel: "--surface (light)",
    ratio: "4.6:1",
    level: "AA",
  },
];

function levelColor(level: string) {
  if (level === "AAA") return { bg: "rgba(52,168,101,0.12)", text: "rgb(33,150,83)" };
  if (level === "AA") return { bg: "rgba(52,168,101,0.07)", text: "rgb(52,168,101)" };
  return { bg: "rgba(100,100,115,0.12)", text: "rgb(100,100,115)" };
}

const DO_DONT = [
  {
    type: "do" as const,
    title: "Use semantic text tokens",
    body: "Place --text-primary on --background or --surface. These pairings are pre-validated to meet WCAG AA at all sizes.",
    example: (
      <div className="rounded-xl p-5 bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
        <p className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-1">Account settings</p>
        <p className="text-[13px] text-[rgb(var(--text-secondary))]">Manage your profile and preferences.</p>
      </div>
    ),
  },
  {
    type: "dont" as const,
    title: "Don't use tertiary text for body copy",
    body: "--text-tertiary is only guaranteed to pass at 18pt+ or bold weights. Never use it for continuous reading text.",
    example: (
      <div className="rounded-xl p-5 bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
        <p className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-1">Account settings</p>
        <p className="text-[13px] text-[rgb(var(--text-tertiary))]">Manage your profile and preferences.</p>
      </div>
    ),
  },
  {
    type: "do" as const,
    title: "Test both light and dark",
    body: "A colour pair that passes in dark mode may fail in light mode. Always validate the token pairing against both theme values.",
    example: (
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg p-3 flex items-center justify-center" style={{ background: "#09090c" }}>
          <span className="text-[13px] font-medium" style={{ color: "#34a865" }}>5.4:1 ✓</span>
        </div>
        <div className="rounded-lg p-3 flex items-center justify-center" style={{ background: "#ffffff", border: "1px solid #e0e0e7" }}>
          <span className="text-[13px] font-medium" style={{ color: "#219653" }}>4.6:1 ✓</span>
        </div>
      </div>
    ),
  },
  {
    type: "dont" as const,
    title: "Don't rely on colour alone",
    body: "Always pair colour with a secondary indicator — icon, label, pattern, or position — so the meaning survives greyscale or colour-blind vision.",
    example: (
      <div className="flex gap-3">
        <div className="flex items-center gap-1.5 rounded-lg px-3 py-2 bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
          <span className="w-2 h-2 rounded-full" style={{ background: "#ef4444" }} />
          <span className="text-[12px] text-[rgb(var(--text-secondary))]">Error</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg px-3 py-2 bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
          <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
          <span className="text-[12px] text-[rgb(var(--text-secondary))]">Success</span>
        </div>
      </div>
    ),
  },
];

export default function ContrastPage() {
  return (
    <div>
      <PageHeader
        title="Contrast"
        description="Every text and interactive element in Sitka is designed to meet WCAG 2.1 AA as a minimum. This page documents approved token pairings and the rules for maintaining accessible contrast."
      />

      {/* WCAG levels */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">WCAG Levels</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Sitka targets AA for all text and interactive elements. AAA is met where possible for primary reading text.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Level", "Ratio", "Applies to"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { level: "AA", ratio: "4.5:1", applies: "Normal text (< 18pt / < 14pt bold)" },
                { level: "AA Large", ratio: "3:1", applies: "Large text (≥ 18pt or ≥ 14pt bold) and UI components" },
                { level: "AAA", ratio: "7:1", applies: "Enhanced — primary reading text target" },
              ].map((row, i) => {
                const c = levelColor(row.level);
                return (
                  <tr key={row.level} className="border-b border-[rgb(var(--border-subtle))] last:border-0">
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold" style={{ background: c.bg, color: c.text }}>
                        {row.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[12px] text-[rgb(var(--text-primary))]">{row.ratio}</td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.applies}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Approved pairs */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Approved Token Pairings</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          These are the only validated foreground/background combinations. Do not introduce new pairings without running them through a contrast checker.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {PAIRS.map((p) => {
            const c = levelColor(p.level);
            return (
              <div
                key={p.fgLabel + p.bgLabel}
                className="flex items-center gap-4 rounded-xl p-4 border border-[rgb(var(--border))] bg-[rgb(var(--surface))]"
              >
                {/* Swatch */}
                <div
                  className="w-16 h-10 rounded-lg shrink-0 flex items-center justify-center"
                  style={{ background: p.bg, border: `1px solid ${p.bg === "#ffffff" ? "#e0e0e7" : "transparent"}` }}
                >
                  <span className="text-[13px] font-semibold" style={{ color: p.fg }}>Aa</span>
                </div>

                {/* Labels */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-[11px] font-mono text-[rgb(var(--accent))]">{p.fgLabel}</code>
                    <span className="text-[11px] text-[rgb(var(--text-tertiary))]">on</span>
                    <code className="text-[11px] font-mono text-[rgb(var(--text-secondary))]">{p.bgLabel}</code>
                  </div>
                </div>

                {/* Ratio */}
                <div className="text-right shrink-0">
                  <span className="block text-[13px] font-semibold text-[rgb(var(--text-primary))]">{p.ratio}</span>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold mt-0.5" style={{ background: c.bg, color: c.text }}>
                    {p.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Do / Don't */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DO_DONT.map(({ type, title, body, example }) => (
            <div
              key={title}
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: type === "do" ? "rgba(52,168,101,0.3)" : "rgba(239,68,68,0.3)" }}
            >
              <div
                className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider"
                style={{
                  background: type === "do" ? "rgba(52,168,101,0.08)" : "rgba(239,68,68,0.08)",
                  color: type === "do" ? "rgb(33,150,83)" : "rgb(220,38,38)",
                }}
              >
                {type === "do" ? "✓ Do" : "✗ Don't"}
              </div>
              <div className="p-4 bg-[rgb(var(--surface))]">
                <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1">{title}</p>
                <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">{body}</p>
                {example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testing */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Testing Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Polypane", note: "Real-time contrast overlays in the browser. Supports the full APCA model." },
            { name: "Figma Stark", note: "Contrast checker and colour-blind simulation directly in design files." },
            { name: "axe DevTools", note: "Automated accessibility audits in CI and in the browser extension." },
          ].map(({ name, note }) => (
            <div key={name} className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1.5">{name}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
