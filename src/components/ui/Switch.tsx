"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  helperText?: string;
  size?: SwitchSize;
}

const sizes: Record<SwitchSize, {
  track: string; thumb: string; translateOff: string; translateOn: string;
  label: string; helper: string;
}> = {
  sm: {
    track: "w-7 h-4",
    thumb: "w-3 h-3",
    translateOff: "translate-x-0.5",
    translateOn: "translate-x-[14px]",
    label: "text-[12px]",
    helper: "text-[11px]",
  },
  md: {
    track: "w-9 h-5",
    thumb: "w-[14px] h-[14px]",
    translateOff: "translate-x-[3px]",
    translateOn: "translate-x-[19px]",
    label: "text-[13px]",
    helper: "text-[12px]",
  },
  lg: {
    track: "w-11 h-6",
    thumb: "w-[18px] h-[18px]",
    translateOff: "translate-x-[3px]",
    translateOn: "translate-x-[23px]",
    label: "text-[14px]",
    helper: "text-[13px]",
  },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, helperText, size = "md", className, disabled, id, checked, defaultChecked, onChange, ...props }, ref) => {
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    const isOn = isControlled ? checked : internalChecked;

    const s = sizes[size];
    const inputId = id ?? (label ? `switch-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked);
      onChange?.(e);
    };

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <label
          className={cn(
            "flex items-center gap-2.5 cursor-pointer select-none",
            disabled && "cursor-not-allowed opacity-50"
          )}
          htmlFor={inputId}
        >
          <div className="relative flex-shrink-0">
            <input
              ref={ref}
              type="checkbox"
              role="switch"
              id={inputId}
              disabled={disabled}
              checked={isControlled ? (checked as boolean) : internalChecked}
              onChange={handleChange}
              className="sr-only peer"
              {...props}
            />
            {/* Track */}
            <div
              className={cn(
                s.track,
                "rounded-full border transition-all duration-200",
                isOn
                  ? "bg-[rgb(var(--accent))] border-[rgb(var(--accent))]"
                  : "bg-[rgb(var(--surface-raised))] border-[rgb(var(--border))]",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-[rgb(var(--accent))] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[rgb(var(--background))]",
              )}
            />
            {/* Thumb */}
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none",
                "transition-all duration-200",
                s.thumb,
                isOn ? [s.translateOn, "bg-white"] : [s.translateOff, "bg-[rgb(var(--text-tertiary))]"],
              )}
            />
          </div>
          {label && (
            <span className={cn(s.label, "text-[rgb(var(--text-primary))]")}>{label}</span>
          )}
        </label>
        {helperText && (
          <p className={cn("ml-[46px]", s.helper, "text-[rgb(var(--text-tertiary))]")}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
