import { cn } from "@/lib";

export type GaugeVariant = "auto" | "success" | "warning" | "caution" | "danger";

export interface GaugeProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: GaugeVariant;
  label?: string;
  sublabel?: string;
  className?: string;
}

const STATUS_COLORS: Record<Exclude<GaugeVariant, "auto">, string> = {
  success: "rgb(var(--status-success))",
  warning: "rgb(var(--status-warning))",
  caution: "rgb(var(--status-caution))",
  danger: "rgb(var(--status-danger))",
};

function resolveVariant(pct: number, override: GaugeVariant): Exclude<GaugeVariant, "auto"> {
  if (override !== "auto") return override;
  if (pct < 70) return "success";
  if (pct < 90) return "warning";
  if (pct < 101) return "caution";
  return "danger";
}

export function Gauge({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  variant = "auto",
  label,
  sublabel,
  className,
}: GaugeProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const color = STATUS_COLORS[resolveVariant(pct, variant)];

  // 270 degree sweep starting at 135 degrees (bottom-left)
  const SWEEP = 270;
  const START = 135;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  function polarToXY(deg: number): [number, number] {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  }

  function arcPath(startDeg: number, sweepDeg: number): string {
    const [sx, sy] = polarToXY(startDeg);
    const [ex, ey] = polarToXY(startDeg + sweepDeg);
    const large = sweepDeg > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  }

  const trackPath = arcPath(START, SWEEP);
  const fillPath = arcPath(START, (pct / 100) * SWEEP);

  return (
    <div className={cn("flex flex-col items-center gap-1", className)} style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Track */}
          <path
            d={trackPath}
            fill="none"
            stroke="rgb(var(--progress-track))"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Fill */}
          {pct > 0 && (
            <path
              d={fillPath}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.4s ease-out" }}
            />
          )}
        </svg>
        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-bold text-[rgb(var(--text-primary))]"
            style={{ fontSize: size * 0.17 }}
          >
            {label ?? `${Math.round(pct)}%`}
          </span>
          {sublabel && (
            <span
              className="text-[rgb(var(--text-tertiary))]"
              style={{ fontSize: size * 0.11 }}
            >
              {sublabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}