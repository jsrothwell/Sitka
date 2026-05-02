"use client";

import { forwardRef, useRef, useEffect } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: CheckboxSize;
  indeterminate?: boolean;
}

const sizes: Record<CheckboxSize, { box: string; icon: string; label: string; helper: string }> = {
  sm: { box: "w-3.5 h-3.5 rounded-[4px]", icon: "w-2.5 h-2.5", label: "text-[12px]", helper: "text-[11px]" },
  md: { box: "w-4 h-4 rounded-[5px]",   icon: "w-3 h-3",     label: "text-[13px]", helper: "text-[12px]" },
  lg: { box: "w-5 h-5 rounded-[6px]",   icon: "w-3.5 h-3.5", label: "text-[14px]", helper: "text-[13px]" },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, error, size = "md", indeterminate, className, disabled, id, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

    useEffect(() => {
      if (resolvedRef && "current" in resolvedRef && resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate, resolvedRef]);

    const s = sizes[size];
    const inputId = id ?? (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <label
          className={cn(
            "flex items-start gap-2 cursor-pointer select-none",
            disabled && "cursor-not-allowed opacity-50"
          )}
          htmlFor={inputId}
        >
          <div className="relative flex-shrink-0 mt-[1px]">
            <input
              ref={resolvedRef}
              type="checkbox"
              id={inputId}
              disabled={disabled}
              className="sr-only peer"
              {...props}
            />
            <div
              className={cn(
                s.box,
                "border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
                "transition-all duration-150",
                "peer-checked:bg-[rgb(var(--accent))] peer-checked:border-[rgb(var(--accent))]",
                "peer-indeterminate:bg-[rgb(var(--accent))] peer-indeterminate:border-[rgb(var(--accent))]",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-[rgb(var(--accent))] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[rgb(var(--background))]",
                error && "border-red-500"
              )}
            />
            <span className={cn(
              "absolute inset-0 flex items-center justify-center text-white pointer-events-none",
              "opacity-0 peer-checked:opacity-100",
              indeterminate && "!opacity-0",
            )}>
              <Check className={s.icon} strokeWidth={3} />
            </span>
            {indeterminate && (
              <span className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
                <Minus className={s.icon} strokeWidth={3} />
              </span>
            )}
          </div>
          {label && (
            <span className={cn(s.label, "text-[rgb(var(--text-primary))] leading-snug")}>
              {label}
            </span>
          )}
        </label>
        {(helperText || error) && (
          <p className={cn("ml-6", s.helper, error ? "text-red-500" : "text-[rgb(var(--text-tertiary))]")}>
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
