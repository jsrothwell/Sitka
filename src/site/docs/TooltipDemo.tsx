"use client";

import { Tooltip } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";
import { Copy, Download, Trash2, Settings } from "lucide-react";

export function TooltipDemo({ placement }: { placement?: boolean }) {
  if (placement) {
    return (
      <div className="flex items-center gap-6 flex-wrap justify-center">
        {(["top", "bottom", "left", "right"] as const).map((side) => (
          <Tooltip key={side} content={`${side.charAt(0).toUpperCase() + side.slice(1)} tooltip`} side={side} delay={0}>
            <Button variant="secondary" size="sm">
              {side.charAt(0).toUpperCase() + side.slice(1)}
            </Button>
          </Tooltip>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap justify-center">
      <Tooltip content="Copy to clipboard" delay={0}>
        <Button variant="ghost" size="sm" aria-label="Copy">
          <Copy className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Download file" delay={0}>
        <Button variant="ghost" size="sm" aria-label="Download">
          <Download className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Open settings" delay={0}>
        <Button variant="ghost" size="sm" aria-label="Settings">
          <Settings className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Delete permanently — this cannot be undone" side="bottom" delay={0}>
        <Button variant="danger" size="sm" aria-label="Delete">
          <Trash2 className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip
        content={
          <span>
            Press{" "}
            <kbd className="font-mono text-[10px] bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded px-1 py-0.5">
              ⌘K
            </kbd>{" "}
            to search
          </span>
        }
        delay={0}
      >
        <Button variant="secondary" size="sm">Rich content</Button>
      </Tooltip>
    </div>
  );
}
