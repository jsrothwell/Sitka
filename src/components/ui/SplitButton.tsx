"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib";
import type { ButtonVariant, ButtonSize } from "@/components/ui/Button";

export interface SplitButtonItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export interface SplitButtonProps {
  label: string;
  onClick: () => void;
  items: SplitButtonItem[];
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  className?: string;
}

const variants: Record<ButtonVariant, { main: string; divider: string; chevron: string }> = {
  primary: {
    main:    "bg-[rgb(var(--accent))] text-white hover:opacity-90 shadow-[0_0_0_1px_rgba(139,109,255,0.3),0_2px_8px_rgba(139,109,255,0.25)]",
    divider: "bg-white/20",
    chevron: "bg-[rgb(var(--accent))] text-white hover:opacity-90",
  },
  secondary: {
    main:    "bg-[rgb(var(--surface))] text-[rgb(var(--text-primary))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]",
    divider: "bg-[rgb(var(--border))]",
    chevron: "bg-[rgb(var(--surface))] text-[rgb(var(--text-secondary))] border border-[rgb(var(--border))] border-l-0 hover:text-[rgb(var(--accent))] hover:border-[rgb(var(--accent))]",
  },
  ghost: {
    main:    "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface))] hover:text-[rgb(var(--text-primary))]",
    divider: "bg-[rgb(var(--border))]",
    chevron: "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface))] hover:text-[rgb(var(--text-primary))]",
  },
  danger: {
    main:    "bg-red-500 text-white hover:bg-red-600 shadow-[0_2px_8px_rgba(239,68,68,0.3)]",
    divider: "bg-white/20",
    chevron: "bg-red-500 text-white hover:bg-red-600",
  },
  glass: {
    main:    "glass text-[rgb(var(--text-primary))] hover:bg-[rgba(255,255,255,0.1)]",
    divider: "bg-white/20",
    chevron: "glass text-[rgb(var(--text-primary))] hover:bg-[rgba(255,255,255,0.1)]",
  },
};

const sizes: Record<ButtonSize, { main: string; chevron: string; divider: string; radius: string }> = {
  sm: { main: "h-8 px-3 text-[12px] gap-1.5",   chevron: "h-8 w-7",  divider: "h-4", radius: "rounded-lg" },
  md: { main: "h-10 px-4 text-[13px] gap-2",     chevron: "h-10 w-9", divider: "h-5", radius: "rounded-lg" },
  lg: { main: "h-12 px-5 text-[15px] gap-2.5",   chevron: "h-12 w-10",divider: "h-6", radius: "rounded-xl" },
  icon: { main: "h-10 px-4 text-[13px] gap-2",   chevron: "h-10 w-9", divider: "h-5", radius: "rounded-lg" },
};

export function SplitButton({
  label,
  onClick,
  items,
  variant = "primary",
  size = "md",
  disabled,
  loading,
  leftIcon,
  className,
}: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLButtonElement>(null);

  const v = variants[variant];
  const s = sizes[size];

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const toggleMenu = () => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
    setOpen((o) => !o);
  };

  const isDisabled = disabled || loading;

  return (
    <div ref={rootRef} className={cn("relative inline-flex", className)}>
      {/* Main action */}
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--background))]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          `${s.radius.split(" ")[0]} rounded-r-none`,
          v.main,
          s.main,
        )}
      >
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{label}</span>
      </button>

      {/* Divider */}
      <div className={cn("w-px flex-shrink-0 self-center", s.divider, v.divider)} />

      {/* Chevron trigger */}
      <button
        ref={chevronRef}
        onClick={toggleMenu}
        disabled={isDisabled}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center justify-center transition-all select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--background))]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          `${s.radius.split(" ")[0]} rounded-l-none`,
          v.chevron,
          s.chevron,
        )}
      >
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-150",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {open && typeof document !== "undefined" && createPortal(
        <div
          role="menu"
          style={{ top: coords.top, left: coords.left, minWidth: coords.width }}
          className={cn(
            "absolute z-[9999] py-1 rounded-xl",
            "bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))]",
            "shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
            "animate-in fade-in-0 zoom-in-95 duration-100"
          )}
        >
          {items.map((item) => (
            <button
              key={item.label}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => { item.onClick(); setOpen(false); }}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-left transition-colors",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                item.danger
                  ? "text-red-500 hover:bg-red-500/10"
                  : "text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface))]"
              )}
            >
              {item.icon && <span className="flex-shrink-0 w-4 h-4 flex items-center">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
