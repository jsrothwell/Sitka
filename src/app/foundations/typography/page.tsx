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
