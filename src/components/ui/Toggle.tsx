"use client";

import { forwardRef, createContext, useContext, useId } from "react";
import { cn } from "@/lib/cn";

export type ToggleSize = "sm" | "md" | "lg";
export type ToggleVariant = "default" | "outline";

/* ── Single Toggle ────────────────────────────────────────────── */

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  size?: ToggleSize;
  variant?: ToggleVariant;
  children: React.ReactNode;
}

const sizeClasses: Record<ToggleSize, string> = {
  sm: "h-8 px-3 text-[12px] gap-1.5 rounded-lg",
  md: "h-9 px-3.5 text-[13px] gap-2 rounded-lg",
  lg: "h-10 px-4 text-[14px] gap-2 rounded-xl",
};

const variantClasses: Record<ToggleVariant, string> = {
  default:
    "bg-transparent text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))] data-[pressed=true]:bg-[rgb(var(--accent-subtle))] data-[pressed=true]:text-[rgb(var(--accent))]",
  outline:
    "border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent-muted))] hover:text-[rgb(var(--text-primary))] data-[pressed=true]:border-[rgb(var(--accent))] data-[pressed=true]:bg-[rgb(var(--accent-subtle))] data-[pressed=true]:text-[rgb(var(--accent))]",
};

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      size = "md",
      variant = "default",
      className,
      disabled,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const groupCtx = useContext(ToggleGroupContext);
    const id = useId();

    const isPressed = groupCtx
      ? groupCtx.type === "single"
        ? groupCtx.value === (props["aria-label"] ?? id)
        : Array.isArray(groupCtx.value) && groupCtx.value.includes(props["aria-label"] ?? id)
      : controlledPressed ?? defaultPressed;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!groupCtx && onPressedChange) {
        onPressedChange(!isPressed);
      }
      if (groupCtx?.onToggle) {
        groupCtx.onToggle(props["aria-label"] ?? id);
      }
      onClick?.(e);
    };

    const resolvedSize = groupCtx?.size ?? size;
    const resolvedVariant = groupCtx?.variant ?? variant;

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isPressed}
        data-pressed={isPressed}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 shrink-0 select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--background))]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClasses[resolvedSize],
          variantClasses[resolvedVariant],
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Toggle.displayName = "Toggle";

/* ── ToggleGroup ──────────────────────────────────────────────── */

interface ToggleGroupContextValue {
  type: "single" | "multiple";
  value: string | string[];
  onToggle: (val: string) => void;
  size?: ToggleSize;
  variant?: ToggleVariant;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

export interface ToggleGroupSingleProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: ToggleSize;
  variant?: ToggleVariant;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface ToggleGroupMultipleProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  size?: ToggleSize;
  variant?: ToggleVariant;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

export function ToggleGroup({
  type,
  value,
  onValueChange,
  size = "md",
  variant = "outline",
  disabled,
  className,
  children,
}: ToggleGroupProps) {
  const handleToggle = (val: string) => {
    if (!onValueChange) return;
    if (type === "single") {
      (onValueChange as (v: string) => void)(val);
    } else {
      const current = (value as string[]) ?? [];
      const next = current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val];
      (onValueChange as (v: string[]) => void)(next);
    }
  };

  return (
    <ToggleGroupContext.Provider
      value={{
        type,
        value: value ?? (type === "multiple" ? [] : ""),
        onToggle: handleToggle,
        size,
        variant,
      }}
    >
      <div
        role="group"
        className={cn(
          "inline-flex items-center gap-1",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}
