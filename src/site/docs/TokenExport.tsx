"use client";

import { useState } from "react";
import { Download, Check, FileJson, FileCode } from "lucide-react";
import tokens from "@/tokens/tokens.json";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { cn } from "@/lib";

const jsonPreview = JSON.stringify(tokens, null, 2).slice(0, 800) + "\n  // ...";

const swiftPreview = `// Sitka Design Tokens — Auto-generated v${tokens.meta.version}
// Do not edit manually. Re-generate with: sitka export --swift

import SwiftUI

extension Color {
    struct Sitka {
        // Brand palette
        static let brand50  = Color(hex: "#f8f7ff")
        static let brand100 = Color(hex: "#f0eeff")
        static let brand500 = Color(hex: "#8b6dff") // Primary accent
        static let brand900 = Color(hex: "#4223a3")

        // Semantic
        static let success = Color(hex: "#22c55e")
        static let warning = Color(hex: "#f59e0b")
        static let error   = Color(hex: "#ef4444")
        static let info    = Color(hex: "#3b82f6")
    }
}

extension CGFloat {
    struct SitkaSpacing {
        static let s1: CGFloat  = 4
        static let s2: CGFloat  = 8
        static let s3: CGFloat  = 12
        static let s4: CGFloat  = 16
        static let s6: CGFloat  = 24
        static let s8: CGFloat  = 32
        static let s12: CGFloat = 48
    }
}`;

type Format = "json" | "swift";

export function TokenExport() {
  const [activePreview, setActivePreview] = useState<Format>("json");
  const [downloaded, setDownloaded] = useState<Format | null>(null);

  const handleDownload = (format: Format) => {
    let content = "";
    let filename = "";
    let mime = "";

    if (format === "json") {
      content = JSON.stringify(tokens, null, 2);
      filename = "sitka-tokens.json";
      mime = "application/json";
    } else {
      content = swiftPreview.replace("// ...", "");
      filename = "SitkaTokens.swift";
      mime = "text/plain";
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    setDownloaded(format);
    setTimeout(() => setDownloaded(null), 2000);
  };

  return (
    <div>
      {/* Format cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {(
          [
            {
              format: "json" as const,
              icon: FileJson,
              title: "JSON (W3C DTCG)",
              description:
                "Standard Design Token Community Group format. Compatible with Style Dictionary, Theo, and most token tooling.",
              filename: "sitka-tokens.json",
            },
            {
              format: "swift" as const,
              icon: FileCode,
              title: "Swift Extension",
              description:
                "Color and spacing extensions for SwiftUI. Drop into your iOS project and import immediately.",
              filename: "SitkaTokens.swift",
            },
          ] as const
        ).map(({ format, icon: Icon, title, description, filename }) => (
          <div
            key={format}
            className={cn(
              "p-5 rounded-xl border transition-all cursor-pointer",
              activePreview === format
                ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))] shadow-[0_0_0_1px_rgba(139,109,255,0.15)]"
                : "border-[rgb(var(--border))] bg-[rgb(var(--surface))] hover:border-[rgb(var(--accent))]"
            )}
            onClick={() => setActivePreview(format)}
          >
            <div className="flex items-start justify-between mb-3">
              <Icon className={cn("w-5 h-5", activePreview === format ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-secondary))]")} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(format);
                }}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all",
                  downloaded === format
                    ? "bg-green-500/10 text-green-500 border border-green-500/20"
                    : "bg-[rgb(var(--accent))] text-white hover:opacity-90"
                )}
              >
                {downloaded === format ? (
                  <>
                    <Check className="w-3 h-3" />
                    Saved
                  </>
                ) : (
                  <>
                    <Download className="w-3 h-3" />
                    Download
                  </>
                )}
              </button>
            </div>
            <h3 className="text-[14px] font-semibold text-[rgb(var(--text-primary))] mb-1">{title}</h3>
            <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed mb-2">{description}</p>
            <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">{filename}</code>
          </div>
        ))}
      </div>

      {/* Preview */}
      <h2 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">
        Preview: {activePreview === "json" ? "sitka-tokens.json" : "SitkaTokens.swift"}
      </h2>
      <CodeBlock
        code={activePreview === "json" ? jsonPreview : swiftPreview}
        language={activePreview === "json" ? "json" : "swift"}
        filename={activePreview === "json" ? "sitka-tokens.json" : "SitkaTokens.swift"}
      />
    </div>
  );
}
