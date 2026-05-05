import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Typography" };

const SCALE = [
  { name: "Display", size: "48px", weight: "600", tracking: "-0.02em", use: "Hero headings only" },
  { name: "H1", size: "36px", weight: "600", tracking: "-0.02em", use: "Page titles" },
  { name: "H2", size: "24px", weight: "600", tracking: "-0.01em", use: "Section headings" },
  { name: "H3", size: "20px", weight: "600", tracking: "0", use: "Card titles, subsections" },
  { name: "H4", size: "17px", weight: "600", tracking: "0", use: "Group labels" },
  { name: "Body LG", size: "17px", weight: "400", tracking: "0", use: "Introductory text" },
  { name: "Body", size: "15px", weight: "400", tracking: "0", use: "Default body copy" },
  { name: "Body SM", size: "13px", weight: "400", tracking: "0", use: "Secondary descriptions" },
  { name: "Caption", size: "11px", weight: "500", tracking: "0.04em", use: "Labels, metadata, timestamps" },
  { name: "Overline", size: "16px", weight: "600", tracking: "1px", use: "Section labels (UPPERCASE)" },
  { name: "Code", size: "13px", weight: "400", tracking: "0", use: "Inline code, token values" },
];

export default function TypographyPage() {
  return (
    <div>
      <PageHeader
        title="Typography"
        description="Inter is the primary typeface — engineered for screen legibility at every size. JetBrains Mono handles all code contexts."
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Type Scale</h2>
        <div className="space-y-1 rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          {SCALE.map((item, i) => (
            <div
              key={item.name}
              className={`flex items-center gap-6 px-5 py-4 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}
            >
              <div className="w-24 flex-shrink-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{item.name}</div>
              </div>
              <div
                className="flex-1 text-[rgb(var(--text-primary))] truncate"
                style={{
                  fontSize: item.size,
                  fontWeight: item.weight,
                  letterSpacing: item.tracking,
                  fontFamily: item.name === "Code" ? "var(--font-mono)" : undefined,
                }}
              >
                {item.name === "Overline" ? "SECTION LABEL" : "The quick brown fox"}
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[12px] font-mono text-[rgb(var(--text-secondary))]">{item.size} / {item.weight}</div>
                <div className="text-[11px] text-[rgb(var(--text-tertiary))]">{item.use}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">In context</h2>
        <p className="text-[13px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          The type scale works through contrast — large and small, heavy and light. These examples show how styles combine in real UI surfaces.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Article card */}
          <div className="rounded-[14px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 flex flex-col gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Foundations · Color</span>
            <h3 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: 0, lineHeight: 1.3 }} className="text-[rgb(var(--text-primary))]">
              How the palette adapts to dark mode
            </h3>
            <p style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.65 }} className="text-[rgb(var(--text-secondary))]">
              Every color in Sitka is stored as an RGB triplet so it composes with CSS opacity. When the theme switches, the token values swap — no component changes required.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="w-6 h-6 rounded-full bg-[rgb(var(--surface-raised))]" />
              <span style={{ fontSize: "13px", fontWeight: 500 }} className="text-[rgb(var(--text-secondary))]">Jamie Rothwell</span>
              <span style={{ fontSize: "11px" }} className="text-[rgb(var(--text-tertiary))]">·  5 min read</span>
            </div>
          </div>

          {/* Settings list */}
          <div className="rounded-[14px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-5 pt-5 pb-3 border-b border-[rgb(var(--border))]">
              <h3 style={{ fontSize: "17px", fontWeight: 600 }} className="text-[rgb(var(--text-primary))]">Appearance</h3>
            </div>
            {[
              { label: "Theme", value: "System", sub: "Follows your OS setting" },
              { label: "Font size", value: "Medium", sub: "15px base" },
              { label: "Reduce motion", value: "Off", sub: "Disables all transitions" },
            ].map(({ label, value, sub }, i, arr) => (
              <div key={label} className={`flex items-center justify-between px-5 py-3.5 ${i < arr.length - 1 ? "border-b border-[rgb(var(--border-subtle))]" : ""}`}>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 500 }} className="text-[rgb(var(--text-primary))]">{label}</p>
                  <p style={{ fontSize: "11px", fontWeight: 500 }} className="text-[rgb(var(--text-tertiary))]">{sub}</p>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 500 }} className="text-[rgb(var(--text-secondary))]">{value}</span>
              </div>
            ))}
          </div>

          {/* Notification row */}
          <div className="md:col-span-2 rounded-[14px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] divide-y divide-[rgb(var(--border-subtle))]">
            <div className="px-5 py-3 flex items-center justify-between">
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em" }} className="uppercase text-[rgb(var(--text-tertiary))]">Today</span>
              <span style={{ fontSize: "11px" }} className="text-[rgb(var(--text-tertiary))]">Mark all read</span>
            </div>
            {[
              { title: "Pull request approved", body: "main ← feature/token-refresh was approved by 2 reviewers.", time: "2m ago" },
              { title: "Deploy succeeded", body: "Production deployment v2.4.1 completed in 47s.", time: "18m ago" },
            ].map(({ title, body, time }) => (
              <div key={title} className="flex items-start gap-3.5 px-5 py-4">
                <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: "var(--nav-active-color)" }} />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "13px", fontWeight: 600 }} className="text-[rgb(var(--text-primary))] mb-0.5">{title}</p>
                  <p style={{ fontSize: "13px", lineHeight: 1.5 }} className="text-[rgb(var(--text-secondary))]">{body}</p>
                </div>
                <span style={{ fontSize: "11px" }} className="text-[rgb(var(--text-tertiary))] shrink-0">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Fonts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "Inter",
              role: "Primary",
              token: "--font-sans",
              swift: "Font.custom(\"Inter\", size: 15)",
              preview: "Aa Bb Cc 0123 !@#",
            },
            {
              name: "JetBrains Mono",
              role: "Code",
              token: "--font-mono",
              swift: "Font.custom(\"JetBrainsMono\", size: 13)",
              preview: "const x = fn(42);",
            },
          ].map((f) => (
            <div key={f.name} className="p-5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{f.role}</span>
                <code className="text-[11px] font-mono text-[rgb(var(--accent))]">{f.token}</code>
              </div>
              <div
                className="text-[32px] font-medium text-[rgb(var(--text-primary))] mb-3"
                style={{ fontFamily: f.name === "JetBrains Mono" ? "var(--font-mono)" : undefined }}
              >
                {f.preview}
              </div>
              <div className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{f.name}</div>
              <code className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">{f.swift}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
