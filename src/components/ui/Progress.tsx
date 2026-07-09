"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib";

export type ProgressVariant = "default" | "success" | "warning" | "danger";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  indeterminate?: boolean;
  showValue?: boolean;
  label?: string;
}

const fillColors: Record<ProgressVariant, string> = {
  default: "rgb(var(--accent))",
  success: "rgb(var(--progress-success))",
  warning: "rgb(var(--progress-warning))",
  danger: "rgb(var(--progress-danger))",
};

const heights: Record<ProgressSize, number> = { sm: 4, md: 6, lg: 8 };

export const Progress = ({
  value = 0,
  max = 100,
  variant = "default",
  size = "md",
  indeterminate = false,
  showValue = false,
  label,
  className,
}: ProgressProps) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const h = heights[size];

  return (
    <div className={cn("w-full", className)}>
      {showValue && (
        <div className="flex justify-end mb-1">
          <span className="text-[11px] font-medium text-[rgb(var(--text-tertiary))]">
            {Math.round(pct)}%
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        aria-busy={indeterminate}
        className="relative overflow-hidden rounded-full"
        style={{
          height: h,
          background: "rgb(var(--progress-track))",
          boxShadow: "inset 0 1px 0 rgba(0,0,0,0.12)",
        }}
      >
        {/* Specular top-edge highlight */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          }}
        />
        {indeterminate ? (
          <motion.div
            className="absolute inset-y-0 w-1/3 rounded-full"
            style={{ background: fillColors[variant] }}
            initial={{ x: "-150%" }}
            animate={{ x: "150%" }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "easeInOut",
            }}
          />
        ) : (
          <motion.div
            className="h-full rounded-full"
            style={{ background: fillColors[variant] }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          />
        )}
      </div>
    </div>
  );
};

Progress.displayName = "Progress";