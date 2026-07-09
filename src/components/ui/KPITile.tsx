import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib";

export type KPIVariant = "default" | "accent" | "success" | "warning" | "danger";

interface KPITrend {
  value: number;
  label?: string;
  direction: "up" | "down" | "neutral";
}

export interface KPITileProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: KPITrend;
  variant?: KPIVariant;
  progress?: number;
  subtitle?: string;
  className?: string;
}

const variantConfig: Record<KPIVariant, { well: string; icon: string }> = {
  default: { well: "bg-[rgb(var(--accent-subtle))]", icon: "text-[rgb(var(--accent))]" },
  accent: { well: "bg-[rgb(var(--accent-subtle))]", icon: "text-[rgb(var(--accent))]" },
  success: { well: "bg-[rgb(var(--status-success)/0.12)]", icon: "text-[rgb(var(--status-success))]" },
  warning: { well: "bg-[rgb(var(--status-warning)/0.12)]", icon: "text-[rgb(var(--status-warning))]" },
  danger: { well: "bg-[rgb(var(--status-danger)/0.12)]", icon: "text-[rgb(var(--status-danger))]" },
};

const progressColors: Record<KPIVariant, string> = {
  default: "rgb(var(--accent))",
  accent: "rgb(var(--accent))",
  success: "rgb(var(--status-success))",
  warning: "rgb(var(--status-warning))",
  danger: "rgb(var(--status-danger))",
};

export function KPITile({
  title,
  value,
  icon,
  trend,
  variant = "default",
  progress,
  subtitle,
  className,
}: KPITileProps) {
  const cfg = variantConfig[variant];

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
        "p-4 flex flex-col gap-3",
        "shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {icon && (
          <div
            className={cn(
              "w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 relative overflow-hidden",
              cfg.well
            )}
          >
            {/* Specular top-edge highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <span className={cn("w-5 h-5", cfg.icon)}>{icon}</span>
          </div>
        )}
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-[11px] font-medium rounded-full px-2 py-0.5 ml-auto shrink-0",
              trend.direction === "up"
                ? "bg-[rgb(var(--status-success)/0.12)] text-[rgb(var(--status-success))]"
                : trend.direction === "down"
                  ? "bg-[rgb(var(--status-danger)/0.12)] text-[rgb(var(--status-danger))]"
                  : "bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-tertiary))]"
            )}
          >
            {trend.direction === "up" && <TrendingUp className="w-3 h-3" />}
            {trend.direction === "down" && <TrendingDown className="w-3 h-3" />}
            {trend.direction === "neutral" && <Minus className="w-3 h-3" />}
            {Math.abs(trend.value)}%{trend.label && <span className="ml-0.5 opacity-70">{trend.label}</span>}
          </div>
        )}
      </div>

      <div>
        <p className="text-[22px] font-bold leading-none tracking-tight text-[rgb(var(--text-primary))] font-[var(--font-mono)]">
          {value}
        </p>
        {subtitle && (
          <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-1">{subtitle}</p>
        )}
      </div>

      <p className="text-[12px] font-medium text-[rgb(var(--text-secondary))]">{title}</p>

      {progress !== undefined && (
        <div className="relative h-1 rounded-full overflow-hidden" style={{ background: "rgb(var(--progress-track))" }}>
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.min(100, progress)}%`, background: progressColors[variant] }} />
        </div>
      )}
    </div>
  );
}