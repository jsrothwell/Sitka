import { cn } from "@/lib/cn";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  orientation?: DividerOrientation;
  label?: string;
  className?: string;
}

export function Divider({ orientation = "horizontal", label, className }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("self-stretch w-px bg-[rgb(var(--border))]", className)}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn("flex items-center gap-3", className)}
      >
        <div className="flex-1 h-px bg-[rgb(var(--border))]" />
        <span className="text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider whitespace-nowrap">
          {label}
        </span>
        <div className="flex-1 h-px bg-[rgb(var(--border))]" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={cn("border-none h-px bg-[rgb(var(--border))] w-full", className)}
    />
  );
}
