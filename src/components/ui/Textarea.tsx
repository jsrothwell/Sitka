"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type TextareaSize = "sm" | "md" | "lg";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  inputSize?: TextareaSize;
}

const SIZE_CLASSES: Record<TextareaSize, string> = {
  sm: "text-[12px] py-1.5 px-2.5",
  md: "text-[13px] py-2 px-3",
  lg: "text-[15px] py-2.5 px-4",
};

const LABEL_SIZE_CLASSES: Record<TextareaSize, string> = {
  sm: "text-[11px]",
  md: "text-[12px]",
  lg: "text-[13px]",
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      inputSize = "md",
      className,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className={cn(
              "font-medium text-[rgb(var(--text-secondary))]",
              LABEL_SIZE_CLASSES[inputSize]
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            "w-full rounded-[var(--radius-md)] border bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-tertiary))] resize-y transition-standard",
            "focus:outline-none focus:ring-0",
            hasError
              ? "border-red-400/60 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)] focus:border-red-400"
              : "border-[rgb(var(--border))] focus:shadow-[0_0_0_3px_rgb(var(--accent)/0.15)] focus:border-[rgb(var(--accent)/0.6)]",
            SIZE_CLASSES[inputSize],
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <p
            className={cn(
              "text-[11px]",
              hasError ? "text-red-400" : "text-[rgb(var(--text-tertiary))]"
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
