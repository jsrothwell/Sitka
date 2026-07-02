"use client";

import { forwardRef } from "react";
import { cn } from "@/lib";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  inputSize?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const sizes: Record<
  InputSize,
  {
    base: string;
    pl: string; pr: string;
    iconLeftPad: string; iconRightPad: string;
    iconSz: string; iconLeftPos: string; iconRightPos: string;
    label: string;
  }
> = {
  sm: {
    base: "h-8 text-[12px]",
    pl: "pl-2.5",     pr: "pr-2.5",
    iconLeftPad: "pl-[28px]", iconRightPad: "pr-[28px]",
    iconSz: "w-3.5 h-3.5", iconLeftPos: "left-2.5", iconRightPos: "right-2.5",
    label: "text-[11px]",
  },
  md: {
    base: "h-10 text-[13px]",
    pl: "pl-3",       pr: "pr-3",
    iconLeftPad: "pl-9", iconRightPad: "pr-9",
    iconSz: "w-4 h-4", iconLeftPos: "left-3", iconRightPos: "right-3",
    label: "text-[12px]",
  },
  lg: {
    base: "h-12 text-[15px]",
    pl: "pl-4",       pr: "pr-4",
    iconLeftPad: "pl-11", iconRightPad: "pr-11",
    iconSz: "w-[18px] h-[18px]", iconLeftPos: "left-4", iconRightPos: "right-4",
    label: "text-[13px]",
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      inputSize = "md",
      leftIcon,
      rightIcon,
      className,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const s = sizes[inputSize];
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn("font-medium text-[rgb(var(--text-primary))]", s.label)}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 pointer-events-none text-[rgb(var(--text-tertiary))]",
                s.iconSz, s.iconLeftPos
              )}
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "w-full rounded-[var(--radius-md)] border bg-[rgb(var(--surface))]",
              "text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-tertiary))]",
              "transition-all duration-150 outline-none",
              error
                ? [
                    "border-red-400/60",
                    "focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
                  ]
                : [
                    "border-[rgb(var(--border))]",
                    "focus:border-[rgb(var(--accent))] focus:shadow-[0_0_0_3px_rgb(var(--accent)/0.15)]",
                  ],
              disabled && "opacity-50 cursor-not-allowed bg-[rgb(var(--surface-raised))]",
              s.base,
              leftIcon ? s.iconLeftPad : s.pl,
              rightIcon ? s.iconRightPad : s.pr,
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 pointer-events-none text-[rgb(var(--text-tertiary))]",
                s.iconSz, s.iconRightPos
              )}
            >
              {rightIcon}
            </span>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={cn(
              "text-[11px] leading-snug",
              error ? "text-red-400" : "text-[rgb(var(--text-tertiary))]"
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
