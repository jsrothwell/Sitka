"use client";

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
  return (
    <div className={cn("rounded-xl overflow-hidden border border-[rgb(var(--border))]", className)}>
      {label && (
        <div className="px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
          <span className="text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider">
            {label}
          </span>
        </div>
      )}
      <div
        className={cn(
          "relative flex flex-wrap items-center justify-center gap-4 p-10",
          dark ? "bg-neutral-950" : "bg-[rgb(var(--background))]",
          grid &&
            "bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
