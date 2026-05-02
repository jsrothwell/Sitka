"use client";

import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/cn";

interface ComponentPreviewProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
  dark?: boolean;
  grid?: boolean;
}

export function ComponentPreview({
  children,
  label,
  className,
  dark,
  grid,
}: ComponentPreviewProps) {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className={cn("rounded-xl overflow-hidden border border-[rgb(var(--border))]", className)}>
      <div className="px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]">
        {label ? (
          <span className="text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider">
            {label}
          </span>
        ) : (
          <span />
        )}

        {/* Viewport toggle */}
        <div className="flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
          {(
            [
              { value: "desktop", Icon: Monitor,    ariaLabel: "Desktop preview" },
              { value: "mobile",  Icon: Smartphone, ariaLabel: "Mobile preview"  },
            ] as const
          ).map(({ value, Icon, ariaLabel }) => (
            <button
              key={value}
              onClick={() => setViewport(value)}
              aria-label={ariaLabel}
              className={cn(
                "p-1 rounded-[var(--radius-sm)] transition-standard",
                viewport === value
                  ? "bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm"
                  : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "relative flex items-start justify-center transition-all duration-300",
          viewport === "mobile" ? "p-6" : "p-10",
          dark ? "bg-neutral-950" : "bg-[rgb(var(--background))]",
          grid &&
            "bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"
        )}
      >
        <div
          className={cn(
            "w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300",
            viewport === "mobile" && "max-w-[390px]"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
