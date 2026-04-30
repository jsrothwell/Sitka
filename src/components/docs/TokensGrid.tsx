"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import tokens from "@/tokens/tokens.json";
import { cn } from "@/lib/cn";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-[rgb(var(--border))]"
    >
      {copied ? (
        <Check className="w-3 h-3 text-green-500" />
      ) : (
        <Copy className="w-3 h-3 text-[rgb(var(--text-tertiary))]" />
      )}
    </button>
  );
}

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="group flex items-center gap-3 p-2 rounded-lg hover:bg-[rgb(var(--surface))] transition-colors">
      <div
        className="w-8 h-8 rounded-lg flex-shrink-0 border border-black/10 dark:border-white/10"
        style={{ backgroundColor: value }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-medium text-[rgb(var(--text-primary))]">{name}</div>
        <div className="text-[11px] text-[rgb(var(--text-tertiary))] font-mono">{value}</div>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">{title}</h2>
      {children}
    </section>
  );
}

function TokenCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[rgb(var(--border))] overflow-hidden",
        className
      )}
    >
      <div className="px-4 py-2.5 bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
          {title}
        </span>
      </div>
      <div className="p-3 bg-[rgb(var(--surface))]">{children}</div>
    </div>
  );
}

function handleExport(format: "json" | "swift") {
  if (format === "json") {
    const blob = new Blob([JSON.stringify(tokens, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitka-tokens.json";
    a.click();
    URL.revokeObjectURL(url);
  } else {
    const colors = tokens.color;
    const lines: string[] = [
      "// Sitka Design Tokens — Auto-generated",
      "// Do not edit manually.",
      "",
      "import SwiftUI",
      "",
      "extension Color {",
      "    struct Sitka {",
    ];

    Object.entries(colors.brand).forEach(([k, v]) => {
      lines.push(`        static let brand${k} = Color(hex: "${(v as { $value: string }).$value}")`);
    });

    lines.push("");

    Object.entries(colors.semantic).forEach(([k, v]) => {
      const cap = k.charAt(0).toUpperCase() + k.slice(1);
      lines.push(`        static let ${k} = Color(hex: "${(v as { $value: string }).$value}")`);
    });

    lines.push("    }");
    lines.push("}");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SitkaTokens.swift";
    a.click();
    URL.revokeObjectURL(url);
  }
}

export function TokensGrid() {
  return (
    <div>
      {/* Export bar */}
      <div className="flex items-center gap-3 p-4 mb-8 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
        <div className="flex-1">
          <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">Export Tokens</p>
          <p className="text-[12px] text-[rgb(var(--text-secondary))]">
            Download the full token set as JSON or a Swift extension.
          </p>
        </div>
        <button
          onClick={() => handleExport("json")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          JSON
        </button>
        <button
          onClick={() => handleExport("swift")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium bg-[rgb(var(--accent))] text-white hover:opacity-90 transition-opacity"
        >
          <Download className="w-3.5 h-3.5" />
          Swift
        </button>
      </div>

      {/* Color tokens */}
      <Section title="Color">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TokenCard title="Brand">
            {Object.entries(tokens.color.brand).map(([k, v]) => (
              <ColorSwatch key={k} name={`brand.${k}`} value={(v as { $value: string }).$value} />
            ))}
          </TokenCard>
          <TokenCard title="Neutral">
            {Object.entries(tokens.color.neutral).map(([k, v]) => (
              <ColorSwatch key={k} name={`neutral.${k}`} value={(v as { $value: string }).$value} />
            ))}
          </TokenCard>
          <TokenCard title="Semantic">
            {Object.entries(tokens.color.semantic).map(([k, v]) => (
              <ColorSwatch key={k} name={k} value={(v as { $value: string }).$value} />
            ))}
          </TokenCard>
        </div>
      </Section>

      {/* Spacing */}
      <Section title="Spacing">
        <TokenCard title="Spacing Scale" className="max-w-lg">
          <div className="space-y-2 p-2">
            {Object.entries(tokens.spacing).map(([k, v]) => (
              <div key={k} className="group flex items-center gap-4">
                <div className="w-8 text-right text-[11px] font-mono text-[rgb(var(--text-tertiary))]">
                  {k}
                </div>
                <div
                  className="h-5 bg-[rgb(var(--accent))] rounded opacity-70 flex-shrink-0"
                  style={{ width: (v as { $value: string }).$value }}
                />
                <div className="text-[11px] font-mono text-[rgb(var(--text-secondary))]">
                  {(v as { $value: string }).$value}
                </div>
                <CopyButton value={(v as { $value: string }).$value} />
              </div>
            ))}
          </div>
        </TokenCard>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TokenCard title="Font Size">
            {Object.entries(tokens.typography.fontSize).map(([k, v]) => (
              <div key={k} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-[rgb(var(--background))]">
                <div className="w-8 text-right text-[11px] font-mono text-[rgb(var(--text-tertiary))]">{k}</div>
                <div
                  className="font-medium text-[rgb(var(--text-primary))] leading-none"
                  style={{ fontSize: (v as { $value: string }).$value }}
                >
                  Aa
                </div>
                <div className="ml-auto text-[11px] font-mono text-[rgb(var(--text-secondary))]">
                  {(v as { $value: string }).$value}
                </div>
                <CopyButton value={(v as { $value: string }).$value} />
              </div>
            ))}
          </TokenCard>
          <TokenCard title="Font Weight">
            {Object.entries(tokens.typography.fontWeight).map(([k, v]) => (
              <div key={k} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-[rgb(var(--background))]">
                <div className="flex-1 text-[15px] text-[rgb(var(--text-primary))]" style={{ fontWeight: (v as { $value: string }).$value }}>
                  {k.charAt(0).toUpperCase() + k.slice(1)}
                </div>
                <div className="text-[11px] font-mono text-[rgb(var(--text-secondary))]">
                  {(v as { $value: string }).$value}
                </div>
                <CopyButton value={(v as { $value: string }).$value} />
              </div>
            ))}
          </TokenCard>
        </div>
      </Section>

      {/* Motion */}
      <Section title="Motion">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TokenCard title="Duration">
            {Object.entries(tokens.motion.duration).map(([k, v]) => (
              <div key={k} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-[rgb(var(--background))]">
                <div className="flex-1 text-[13px] font-medium text-[rgb(var(--text-primary))] capitalize">{k}</div>
                <code className="text-[11px] font-mono text-[rgb(var(--text-secondary))]">{(v as { $value: string }).$value}</code>
                <CopyButton value={(v as { $value: string }).$value} />
              </div>
            ))}
          </TokenCard>
          <TokenCard title="Easing">
            {Object.entries(tokens.motion.easing).map(([k, v]) => (
              <div key={k} className="group flex items-start gap-3 p-2 rounded-lg hover:bg-[rgb(var(--background))]">
                <div className="flex-1 text-[13px] font-medium text-[rgb(var(--text-primary))] capitalize">{k}</div>
                <code className="text-[10px] font-mono text-[rgb(var(--text-secondary))] text-right max-w-[160px] break-all">
                  {(v as { $value: string }).$value}
                </code>
              </div>
            ))}
          </TokenCard>
        </div>
      </Section>
    </div>
  );
}
