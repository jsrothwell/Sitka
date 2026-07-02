"use client";

import { cn } from "@/lib";

export type SegmentedButtonSize = "sm" | "md" | "lg";

export interface SegmentedButtonOption<T extends string = string> {
  value: T;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedButtonProps<T extends string = string> {
  options: SegmentedButtonOption<T>[];
  value: T | T[];
  onChange: (value: T | T[]) => void;
  multiple?: boolean;
  size?: SegmentedButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const sizes: Record<SegmentedButtonSize, { segment: string; icon: string }> = {
  sm: { segment: "h-8 px-3 text-[12px] gap-1.5",  icon: "w-3.5 h-3.5" },
  md: { segment: "h-10 px-4 text-[13px] gap-2",    icon: "w-4 h-4" },
  lg: { segment: "h-11 px-5 text-[15px] gap-2.5",  icon: "w-[18px] h-[18px]" },
};

export function SegmentedButton<T extends string = string>({
  options,
  value,
  onChange,
  multiple = false,
  size = "md",
  fullWidth = false,
  className,
}: SegmentedButtonProps<T>) {
  const s = sizes[size];

  const isSelected = (opt: T) =>
    Array.isArray(value) ? value.includes(opt) : value === opt;

  const handleClick = (opt: T) => {
    if (multiple) {
      const arr = Array.isArray(value) ? value : [value];
      const next = arr.includes(opt)
        ? arr.filter((v) => v !== opt)
        : [...arr, opt];
      onChange(next as T | T[]);
    } else {
      onChange(opt);
    }
  };

  return (
    <div
      role={multiple ? "group" : "radiogroup"}
      className={cn(
        "inline-flex items-center",
        "rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
        "p-1 gap-0.5",
        fullWidth && "w-full",
        className
      )}
    >
      {options.map((opt) => {
        const selected = isSelected(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            role={multiple ? "checkbox" : "radio"}
            aria-checked={selected}
            disabled={opt.disabled}
            onClick={() => handleClick(opt.value)}
            className={cn(
              "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg select-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-1 focus-visible:ring-offset-[rgb(var(--surface))]",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
              s.segment,
              fullWidth && "flex-1",
              selected
                ? "bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-[0_1px_4px_rgba(0,0,0,0.12)] border border-[rgb(var(--border))]"
                : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))]/50"
            )}
          >
            {opt.icon && (
              <span className={cn("flex-shrink-0 flex items-center", s.icon)}>
                {opt.icon}
              </span>
            )}
            {opt.label && <span>{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
