"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/cn";

export type Platform = "react" | "html" | "swift" | "macos";

export interface PlatformCode {
  react: { code: string; filename?: string };
  html: { code: string; filename?: string };
  swift: { code: string; filename?: string };
  macos?: { code: string; filename?: string };
}

const TAB_LABELS: Record<Platform, string> = {
  react: "React / TSX",
  html:  "HTML / CSS",
  swift: "SwiftUI · iOS",
  macos: "SwiftUI · macOS",
};

const TAB_LANG: Record<Platform, string> = {
  react: "tsx",
  html:  "html",
  swift: "swift",
  macos: "swift",
};

interface PlatformTabsProps {
  code: PlatformCode;
  className?: string;
}

export function PlatformTabs({ code, className }: PlatformTabsProps) {
  const [active, setActive] = useState<Platform>("react");

  const platforms: Platform[] = ["react", "html", "swift", ...(code.macos ? (["macos"] as Platform[]) : [])];

  const currentCode = code[active] ?? code.swift;

  return (
    <div className={cn("rounded-xl overflow-hidden border border-[rgb(var(--border))]", className)}>
      {/* Tab bar */}
      <div className="flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setActive(platform)}
            className={cn(
              "relative px-4 py-2.5 text-[12px] font-medium transition-colors",
              active === platform
                ? "text-[rgb(var(--text-primary))]"
                : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"
            )}
          >
            {active === platform && (
              <motion.div
                layoutId="platform-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            {TAB_LABELS[platform]}
          </button>
        ))}
      </div>

      {/* Code panel */}
      <CodeBlock
        code={currentCode.code}
        language={TAB_LANG[active]}
        filename={currentCode.filename}
        className="rounded-none border-0"
      />
    </div>
  );
}
