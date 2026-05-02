"use client";

import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: SelectSize;
  placeholder?: string;
}

const sizes: Record<SelectSize, { wrap: string; select: string; icon: string; label: string; helper: string }> = {
  sm: { wrap: "h-8",  select: "text-[12px] pl-2.5 pr-8 rounded-lg",  icon: "w-3.5 h-3.5 right-2",   label: "text-[11px]", helper: "text-[11px]" },
  md: { wrap: "h-10", select: "text-[13px] pl-3 pr-9 rounded-lg",    icon: "w-4 h-4 right-2.5",      label: "text-[12px]", helper: "text-[12px]" },
  lg: { wrap: "h-12", select: "text-[15px] pl-4 pr-10 rounded-xl",   icon: "w-[18px] h-[18px] right-3", label: "text-[13px]", helper: "text-[13px]" },
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helperText, error, size = "md", placeholder, className, disabled, id, children, ...props }, ref) => {
    const s = sizes[size];
    const inputId = id ?? (label ? `select-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label htmlFor={inputId} className={cn(s.label, "font-medium text-[rgb(var(--text-secondary))]")}>
            {label}
          </label>
        )}
        <div className={cn("relative flex items-center", s.wrap)}>
          <select
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "w-full h-full appearance-none",
              "bg-[rgb(var(--surface))] border",
              "text-[rgb(var(--text-primary))]",
              "transition-all duration-150 outline-none",
              "focus:ring-2 focus:ring-[rgb(var(--accent))] focus:ring-offset-1 focus:ring-offset-[rgb(var(--background))]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error
                ? "border-red-500 focus:border-red-500"
                : "border-[rgb(var(--border))] focus:border-[rgb(var(--accent))]",
              s.select,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <ChevronDown
            className={cn(
              "absolute top-1/2 -translate-y-1/2 pointer-events-none text-[rgb(var(--text-tertiary))]",
              s.icon
            )}
          />
        </div>
        {(helperText || error) && (
          <p className={cn(s.helper, error ? "text-red-500" : "text-[rgb(var(--text-tertiary))]")}>
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
