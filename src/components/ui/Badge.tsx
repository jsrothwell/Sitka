import { cn } from "@/lib";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "ghost";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[rgb(var(--surface-raised))] border-[rgb(var(--border))] text-[rgb(var(--text-secondary))]",
  primary:
    "bg-[rgb(var(--accent-subtle))] border-[rgb(var(--accent)/0.3)] text-[rgb(var(--accent-text))]",
  success:
    "bg-[var(--status-success-tint)] border-[var(--status-success-edge)] text-[rgb(var(--status-success-text))]",
  warning:
    "bg-[var(--status-warning-tint)] border-[var(--status-warning-edge)] text-[rgb(var(--status-warning-text))]",
  danger:
    "bg-[var(--status-danger-tint)] border-[var(--status-danger-edge)] text-[rgb(var(--status-danger-text))]",
  ghost:
    "bg-transparent border-[rgb(var(--border))] text-[rgb(var(--text-tertiary))]",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-[rgb(var(--text-tertiary))]",
  primary: "bg-[rgb(var(--accent))]",
  success: "bg-[rgb(var(--status-success))]",
  warning: "bg-[rgb(var(--status-warning))]",
  danger:  "bg-[rgb(var(--status-danger))]",
  ghost:   "bg-[rgb(var(--text-tertiary))]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-[10px] px-1.5 py-0.5 gap-1",
  md: "text-[11px] px-2 py-0.5 gap-1.5",
  lg: "text-[12px] px-2.5 py-1 gap-1.5",
};

const dotSizes: Record<BadgeSize, string> = {
  sm: "w-1 h-1",
  md: "w-1.5 h-1.5",
  lg: "w-1.5 h-1.5",
};

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-[var(--radius-sm)] border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn("rounded-full flex-shrink-0", dotColors[variant], dotSizes[size])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
