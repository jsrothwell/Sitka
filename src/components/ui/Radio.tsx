"use client";

import { forwardRef, createContext, useContext } from "react";
import { cn } from "@/lib";

export type RadioSize = "sm" | "md" | "lg";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  size?: RadioSize;
  disabled?: boolean;
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  orientation = "vertical",
  size = "md",
  disabled,
  label,
  children,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, size, disabled }}>
      <fieldset className={cn("border-0 p-0 m-0", className)}>
        {label && (
          <legend className="text-[12px] font-medium text-[rgb(var(--text-secondary))] mb-2">
            {label}
          </legend>
        )}
        <div className={cn("flex gap-3", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap")}>
          {children}
        </div>
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

const sizes: Record<RadioSize, { dot: string; outer: string; label: string; helper: string }> = {
  sm: { dot: "w-1.5 h-1.5", outer: "w-3.5 h-3.5", label: "text-[12px]", helper: "text-[11px]" },
  md: { dot: "w-2 h-2",     outer: "w-4 h-4",     label: "text-[13px]", helper: "text-[12px]" },
  lg: { dot: "w-2.5 h-2.5", outer: "w-5 h-5",     label: "text-[14px]", helper: "text-[13px]" },
};

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  helperText?: string;
  size?: RadioSize;
  value: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, helperText, size, value, disabled, className, onChange: onChangeProp, ...props }, ref) => {
    const ctx = useContext(RadioGroupContext);
    const resolvedSize = size ?? ctx?.size ?? "md";
    const resolvedDisabled = disabled ?? ctx?.disabled;
    const isChecked = ctx?.value !== undefined ? ctx.value === value : props.checked;
    const s = sizes[resolvedSize];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeProp?.(e);
      ctx?.onChange?.(value);
    };

    const inputId = `radio-${ctx?.name ?? "group"}-${value}`;

    return (
      <div className={cn("flex flex-col gap-0.5", className)}>
        <label
          className={cn(
            "flex items-start gap-2 cursor-pointer select-none",
            resolvedDisabled && "cursor-not-allowed opacity-50"
          )}
          htmlFor={inputId}
        >
          <div className="relative flex-shrink-0 mt-[1px]">
            <input
              ref={ref}
              type="radio"
              id={inputId}
              name={ctx?.name}
              value={value}
              checked={isChecked}
              disabled={resolvedDisabled}
              onChange={handleChange}
              className="sr-only peer"
              {...props}
            />
            <div
              className={cn(
                s.outer,
                "rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
                "transition-all duration-150",
                "peer-checked:border-[rgb(var(--accent))]",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-[rgb(var(--accent))] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[rgb(var(--background))]",
              )}
            />
            <span className={cn(
              "absolute inset-0 flex items-center justify-center pointer-events-none",
              "opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
            )}>
              <span className={cn(s.dot, "rounded-full bg-[rgb(var(--accent))]")} />
            </span>
          </div>
          {label && (
            <span className={cn(s.label, "text-[rgb(var(--text-primary))] leading-snug")}>
              {label}
            </span>
          )}
        </label>
        {helperText && (
          <p className={cn("ml-6", s.helper, "text-[rgb(var(--text-tertiary))]")}>{helperText}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";
