"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "glass";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[rgb(var(--accent))] text-white hover:opacity-90 shadow-[0_0_0_1px_rgba(139,109,255,0.3),0_2px_8px_rgba(139,109,255,0.25)] active:shadow-none",
  secondary:
    "bg-[rgb(var(--surface))] text-[rgb(var(--text-primary))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] active:bg-[rgb(var(--accent-subtle))]",
  ghost:
    "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface))] hover:text-[rgb(var(--text-primary))] active:bg-[rgb(var(--border))]",
  danger:
    "bg-red-500 text-white hover:bg-red-600 shadow-[0_2px_8px_rgba(239,68,68,0.3)] active:shadow-none",
  glass:
    "glass text-[rgb(var(--text-primary))] hover:bg-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.05)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[12px] gap-1.5 rounded-lg",
  md: "h-10 px-4 text-[13px] gap-2 rounded-lg",
  lg: "h-12 px-5 text-[15px] gap-2.5 rounded-xl",
  icon: "h-10 w-10 rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--background))]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={isDisabled}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
