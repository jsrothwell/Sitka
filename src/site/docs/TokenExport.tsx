"use client";

import { useState } from "react";
import { Download, FileJson, FileCode } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { cn } from "@/lib";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Format = "json" | "swift";

export interface TokenExportProps {
  /** First lines of each generated file, read at build time by the page. */
  previews: Record<Format, string>;
  sizes: Record<Format, string>;
}

const FORMATS = [
  {
    format: "json" as const,
    icon: FileJson,
    title: "JSON (W3C DTCG)",
    description: "The source of truth. Works with Style Dictionary, Tokens Studio and other DTCG tooling.",
    filename: "sitka-tokens.json",
  },
  {
    format: "swift" as const,
    icon: FileCode,
    title: "Swift",
    description:
      "Every colour (both themes), spacing, radius, type and duration token, plus Color.sitka(\\.token) for SwiftUI. Prefer the Swift package so updates arrive through Xcode.",
    filename: "SitkaTokens.swift",
  },
];

export function TokenExport({ previews, sizes }: TokenExportProps) {
  const [active, setActive] = useState<Format>("json");
  const current = FORMATS.find((f) => f.format === active)!;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {FORMATS.map(({ format, icon: Icon, title, description, filename }) => (
          <div
            key={format}
            className={cn(
              "flex flex-col gap-3 p-5 rounded-xl border transition-all",
              active === format
                ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))]"
                : "border-[rgb(var(--border))] bg-[rgb(var(--surface))]"
            )}
          >
            <div className="flex items-start gap-3">
              <Icon className="mt-0.5 w-5 h-5 shrink-0 text-[rgb(var(--text-secondary))]" aria-hidden />
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">{title}</h3>
                <p id={`export-${format}-meta`} className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">
                  <span className="font-mono">{filename}</span> · {sizes[format]} · {description}
                </p>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap gap-2">
              <a
                href={`${BASE}/downloads/${filename}`}
                download={filename}
                aria-describedby={`export-${format}-meta`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[rgb(var(--accent))] px-3 py-1.5 text-[12px] font-semibold text-[rgb(var(--on-accent))] hover:opacity-90"
              >
                <Download className="w-3.5 h-3.5" aria-hidden />
                Download {filename}
              </a>
              <button
                type="button"
                onClick={() => setActive(format)}
                aria-pressed={active === format}
                className="rounded-lg border border-[rgb(var(--border))] px-3 py-1.5 text-[12px] font-medium text-[rgb(var(--text-primary))] hover:border-[rgb(var(--accent))]"
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">Preview: {current.filename}</h2>
      <CodeBlock code={previews[active]} language={active} filename={current.filename} />
    </div>
  );
}
