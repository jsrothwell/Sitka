import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { TrendingUp, TrendingDown, Users, DollarSign, Clock, Target } from "lucide-react";

export const metadata: Metadata = { title: "KPI Tile" };

const PROPS = [
  {
    name: "title",
    type: "string",
    description: "Metric label displayed below the value.",
  },
  {
    name: "value",
    type: "string | number",
    description: "Primary metric value. Pass formatted strings for currency or large numbers.",
  },
  {
    name: "icon",
    type: "ReactNode",
    description: "Icon rendered in the 44×44 accent-tinted icon well.",
  },
  {
    name: "trend",
    type: '{ value: number; label?: string; direction: "up" | "down" | "neutral" }',
    description: "Optional delta indicator. Positive direction = green arrow, negative = red.",
  },
  {
    name: "variant",
    type: '"default" | "accent" | "success" | "warning" | "danger"',
    default: '"default"',
    description: "Tints the icon well and activates the brand-lit surface on accent variant.",
  },
  {
    name: "progress",
    type: "number",
    description: "0–100. When set, renders a mini progress bar beneath the value.",
  },
  {
    name: "subtitle",
    type: "string",
    description: "Secondary line below value — useful for goal context (e.g. 'of 50 target').",
  },
];

const CODE = {
  react: {
    filename: "KPITile.tsx",
    code: `import { cn } from "@/lib/cn";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPITileTrend {
  value: number;
  label?: string;
  direction: "up" | "down" | "neutral";
}

interface KPITileProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: KPITileTrend;
  variant?: "default" | "accent" | "success" | "warning" | "danger";
  progress?: number;
  subtitle?: string;
  className?: string;
}

const variantConfig = {
  default:  { well: "bg-[rgb(var(--accent-subtle))]",        icon: "text-[rgb(var(--accent))]" },
  accent:   { well: "bg-[rgb(var(--accent-subtle))]",        icon: "text-[rgb(var(--accent))]" },
  success:  { well: "bg-[rgb(var(--status-success)/0.12)]",  icon: "text-[rgb(var(--status-success))]" },
  warning:  { well: "bg-[rgb(var(--status-warning)/0.12)]",  icon: "text-[rgb(var(--status-warning))]" },
  danger:   { well: "bg-[rgb(var(--status-danger)/0.12)]",   icon: "text-[rgb(var(--status-danger))]" },
};

const progressColors = {
  default: "rgb(var(--accent))",
  accent:  "rgb(var(--accent))",
  success: "rgb(var(--status-success))",
  warning: "rgb(var(--status-warning))",
  danger:  "rgb(var(--status-danger))",
};

export function KPITile({
  title, value, icon, trend, variant = "default",
  progress, subtitle, className,
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
          <div className={cn("w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 relative overflow-hidden", cfg.well)}>
            {/* Specular top-edge highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <span className={cn("w-5 h-5", cfg.icon)}>{icon}</span>
          </div>
        )}
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-medium rounded-full px-2 py-0.5 ml-auto shrink-0",
            trend.direction === "up"      && "bg-[rgb(var(--status-success)/0.12)] text-[rgb(var(--status-success))]",
            trend.direction === "down"    && "bg-[rgb(var(--status-danger)/0.12)]  text-[rgb(var(--status-danger))]",
            trend.direction === "neutral" && "bg-[rgb(var(--surface-raised))]      text-[rgb(var(--text-tertiary))]",
          )}>
            {trend.direction === "up"      && <TrendingUp className="w-3 h-3" />}
            {trend.direction === "down"    && <TrendingDown className="w-3 h-3" />}
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
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: \`\${Math.min(100, progress)}%\`, background: progressColors[variant] }} />
        </div>
      )}
    </div>
  );
}`,
  },
  html: {
    filename: "kpi-tile.html",
    code: `<div class="kpi-tile">
  <div class="kpi-header">
    <div class="kpi-icon-well">
      <svg class="kpi-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    </div>
    <span class="kpi-trend kpi-trend-up">
      ↑ 12%
    </span>
  </div>

  <div class="kpi-value">2,847</div>
  <div class="kpi-subtitle">of 3,000 target</div>
  <div class="kpi-label">Active Users</div>

  <div class="kpi-progress">
    <div class="kpi-progress-fill" style="width: 85%"></div>
  </div>
</div>

<style>
  .kpi-tile {
    background: rgb(var(--surface));
    border: 1px solid rgb(var(--border));
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: var(--shadow-card);
    min-width: 200px;
  }

  .kpi-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .kpi-icon-well {
    width: 44px; height: 44px;
    border-radius: 10px;
    background: rgb(var(--accent-subtle));
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .kpi-icon-well::after {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }
  .kpi-icon { width: 20px; height: 20px; color: rgb(var(--accent)); }

  .kpi-trend {
    font-size: 11px; font-weight: 500;
    padding: 2px 8px;
    border-radius: 9999px;
  }
  .kpi-trend-up   { background: rgba(16,185,129,0.12); color: #10b981; }
  .kpi-trend-down { background: rgba(248,113,113,0.12); color: #f87171; }

  .kpi-value    { font-size: 22px; font-weight: 700; letter-spacing: -0.03em; color: rgb(var(--text-primary)); font-variant-numeric: tabular-nums; }
  .kpi-subtitle { font-size: 11px; color: rgb(var(--text-tertiary)); margin-top: -6px; }
  .kpi-label    { font-size: 12px; font-weight: 500; color: rgb(var(--text-secondary)); }

  .kpi-progress {
    height: 4px; background: rgb(var(--progress-track));
    border-radius: 9999px; overflow: hidden;
  }
  .kpi-progress-fill {
    height: 100%; background: rgb(var(--accent));
    border-radius: 9999px;
    transition: width 0.5s ease;
  }
</style>`,
  },
  swift: {
    filename: "KPITile.swift",
    code: `import SwiftUI

struct KPITrend {
    var value: Double
    var label: String?
    enum Direction { case up, down, neutral }
    var direction: Direction
}

enum KPIVariant { case \`default\`, accent, success, warning, danger }

struct KPITile: View {
    let title: String
    let value: String
    var icon: String? = nil          // SF Symbol name
    var trend: KPITrend? = nil
    var variant: KPIVariant = .default
    var progress: Double? = nil      // 0–100
    var subtitle: String? = nil

    private var accentColor: Color {
        switch variant {
        case .default, .accent: return .accentColor
        case .success: return Color(hex: "#10b981")
        case .warning: return Color(hex: "#f59e0b")
        case .danger:  return Color(hex: "#f87171")
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                if let symbol = icon {
                    ZStack {
                        RoundedRectangle(cornerRadius: 10, style: .continuous)
                            .fill(accentColor.opacity(0.12))
                            .frame(width: 44, height: 44)
                        // Specular top edge
                        VStack {
                            LinearGradient(colors: [.white.opacity(0.2), .clear], startPoint: .top, endPoint: .bottom)
                                .frame(height: 8)
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            Spacer()
                        }
                        .frame(width: 44, height: 44)
                        Image(systemName: symbol)
                            .font(.system(size: 20, weight: .medium))
                            .foregroundStyle(accentColor)
                    }
                }
                Spacer()
                if let t = trend {
                    trendBadge(t)
                }
            }

            VStack(alignment: .leading, spacing: 2) {
                Text(value)
                    .font(.system(size: 22, weight: .bold, design: .monospaced))
                    .foregroundStyle(.primary)
                if let sub = subtitle {
                    Text(sub)
                        .font(.system(size: 11))
                        .foregroundStyle(.tertiary)
                }
            }

            Text(title)
                .font(.system(size: 12, weight: .medium))
                .foregroundStyle(.secondary)

            if let p = progress {
                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        Capsule().fill(Color(.systemFill)).frame(height: 4)
                        Capsule().fill(accentColor)
                            .frame(width: geo.size.width * min(1, p / 100), height: 4)
                    }
                }.frame(height: 4)
            }
        }
        .padding(16)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous).stroke(Color(.separator), lineWidth: 1))
        .shadow(color: .black.opacity(0.07), radius: 12, y: 2)
    }

    @ViewBuilder
    private func trendBadge(_ t: KPITrend) -> some View {
        let color: Color = t.direction == .up ? Color(hex: "#10b981") : t.direction == .down ? Color(hex: "#f87171") : .secondary
        HStack(spacing: 3) {
            Image(systemName: t.direction == .up ? "arrow.up.right" : t.direction == .down ? "arrow.down.right" : "minus")
                .font(.system(size: 10, weight: .semibold))
            Text("\\(Int(abs(t.value)))%\\(t.label.map { " " + $0 } ?? "")")
                .font(.system(size: 11, weight: .medium))
        }
        .foregroundStyle(color)
        .padding(.horizontal, 8).padding(.vertical, 3)
        .background(color.opacity(0.12))
        .clipShape(Capsule())
    }
}

#Preview {
    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
        KPITile(title: "Active Users", value: "2,847", icon: "person.3.fill",
                trend: .init(value: 12, direction: .up), progress: 85, subtitle: "of 3,000 goal")
        KPITile(title: "Revenue", value: "$48.2K", icon: "banknote.fill",
                trend: .init(value: 3, label: "vs last month", direction: .down), variant: .success)
        KPITile(title: "Open Tasks", value: "142", icon: "checkmark.circle.fill", variant: .warning, progress: 62)
        KPITile(title: "Incidents", value: "3", icon: "exclamationmark.triangle.fill", variant: .danger)
    }
    .padding()
}`,
  },
  macos: {
    filename: "KPITile+macOS.swift",
    code: `import SwiftUI

// macOS — same component, AppKit color roles, no system fill
struct KPITile: View {
    let title: String
    let value: String
    var icon: String? = nil
    var trend: KPITrend? = nil
    var variant: KPIVariant = .default
    var progress: Double? = nil
    var subtitle: String? = nil

    private var accentColor: Color {
        switch variant {
        case .default, .accent: return .accentColor
        case .success: return Color(hex: "#10b981")
        case .warning: return Color(hex: "#f59e0b")
        case .danger:  return Color(red: 0.97, green: 0.44, blue: 0.44)
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .top) {
                if let sym = icon {
                    ZStack {
                        RoundedRectangle(cornerRadius: 10, style: .continuous)
                            .fill(accentColor.opacity(0.10))
                            .frame(width: 40, height: 40)
                        Image(systemName: sym)
                            .font(.system(size: 18, weight: .medium))
                            .foregroundStyle(accentColor)
                    }
                }
                Spacer()
                if let t = trend {
                    let c: Color = t.direction == .up ? Color(hex: "#10b981") : t.direction == .down ? Color(hex: "#f87171") : .secondary
                    HStack(spacing: 2) {
                        Image(systemName: t.direction == .up ? "arrow.up.right" : "arrow.down.right")
                            .font(.system(size: 9, weight: .bold))
                        Text("\\(Int(abs(t.value)))%")
                            .font(.system(size: 11, weight: .medium))
                    }
                    .foregroundStyle(c)
                    .padding(.horizontal, 6).padding(.vertical, 2)
                    .background(c.opacity(0.10))
                    .clipShape(Capsule())
                }
            }

            Text(value)
                .font(.system(size: 20, weight: .bold, design: .monospaced))

            if let sub = subtitle {
                Text(sub).font(.system(size: 10)).foregroundStyle(.tertiary)
            }

            Text(title).font(.system(size: 11, weight: .medium)).foregroundStyle(.secondary)

            if let p = progress {
                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        Capsule().fill(Color(.separatorColor).opacity(0.25)).frame(height: 3)
                        Capsule().fill(accentColor).frame(width: geo.size.width * min(1, p/100), height: 3)
                    }
                }.frame(height: 3)
            }
        }
        .padding(14)
        .background(Color(NSColor.controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 14, style: .continuous).stroke(Color(.separatorColor), lineWidth: 1))
    }
}`,
  },
};

export default function KPITilePage() {
  const tiles = [
    { title: "Active Users", value: "2,847", subtitle: "of 3,000 target", pct: 85, trendDir: "up" as const, trendVal: 12, color: "rgb(var(--accent))" },
    { title: "Revenue", value: "$48.2K", subtitle: "this month", pct: 72, trendDir: "up" as const, trendVal: 8, color: "rgb(var(--status-success))" },
    { title: "Open Issues", value: "23", subtitle: "4 critical", pct: 46, trendDir: "down" as const, trendVal: 5, color: "rgb(var(--status-warning))" },
    { title: "Error Rate", value: "0.4%", subtitle: "last 24h", pct: 8, trendDir: "up" as const, trendVal: 2, color: "rgb(var(--status-danger))" },
  ];

  return (
    <div>
      <PageHeader
        title="KPI Tile"
        description="Dashboard metric card. Surfaces a single number with context — icon well, trend delta, optional progress bar, and semantic variant colouring. Composes Card, Badge, and Progress Bar primitives."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Preview</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tiles.map(({ title, value, subtitle, pct, trendDir, trendVal, color }) => (
            <div
              key={title}
              className="rounded-[var(--radius-lg)] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 flex flex-col gap-3"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 relative overflow-hidden" style={{ background: `color-mix(in srgb, ${color} 15%, transparent)` }}>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <span
                  className="flex items-center gap-1 text-[10px] font-semibold rounded-full px-2 py-0.5"
                  style={{
                    background: trendDir === "up" ? "rgba(16,185,129,0.12)" : "rgba(248,113,113,0.12)",
                    color: trendDir === "up" ? "rgb(var(--status-success))" : "rgb(var(--status-danger))",
                  }}
                >
                  {trendDir === "up" ? "↑" : "↓"} {trendVal}%
                </span>
              </div>
              <div>
                <p className="text-[22px] font-bold leading-none tracking-tight text-[rgb(var(--text-primary))]" style={{ fontVariantNumeric: "tabular-nums" }}>{value}</p>
                <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-1">{subtitle}</p>
              </div>
              <p className="text-[12px] font-medium text-[rgb(var(--text-secondary))]">{title}</p>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgb(var(--progress-track))" }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Slot", "Element", "Required"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { slot: "Icon well", el: "44×44 rounded rect, accent-tinted background, specular top edge", req: "No" },
                { slot: "Trend badge", el: "Capsule with directional arrow + delta %, semantic colour", req: "No" },
                { slot: "Value", el: "22 px bold monospaced digit, tabular-nums variant", req: "Yes" },
                { slot: "Subtitle", el: "11 px tertiary — goal context, secondary metric", req: "No" },
                { slot: "Label", el: "12 px medium secondary — metric name", req: "Yes" },
                { slot: "Progress bar", el: "4 px mini progress bar anchored to card bottom", req: "No" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.slot}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.el}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{row.req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "KPI tiles are non-interactive — they are not focusable and do not receive keyboard events.",
            "Trend direction is communicated visually and via the label text; do not rely solely on the arrow icon.",
            "For live-updating metrics, wrap the tile in an aria-live='polite' region so screen readers announce changes.",
            "Icon wells use aria-hidden='true' — the metric value and label carry the accessible meaning.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
