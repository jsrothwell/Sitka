"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export type CardVariant = "default" | "elevated" | "ghost" | "accent";

export interface CardProps {
  variant?: CardVariant;
  interactive?: boolean;
  as?: "div" | "button" | "a";
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  href?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
  elevated:
    "border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-[0_4px_24px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.08)]",
  ghost:
    "border-transparent bg-[rgb(var(--surface-raised))]",
  accent:
    "border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent-subtle)/1)]",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", interactive = false, as: Tag = "div", className, children, ...props }, ref) => {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Tag
        ref={ref as never}
        className={cn(
          "rounded-[14px] border overflow-hidden",
          variantStyles[variant],
          interactive && [
            "cursor-pointer transition-all duration-150",
            "hover:border-[rgb(var(--accent)/0.5)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)]",
            "active:scale-[0.99]",
          ],
          className
        )}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Tag>
    );
  }
);
Card.displayName = "Card";

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-5 py-4 border-b border-[rgb(var(--border-subtle))]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 py-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-5 py-4 border-t border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
