import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Gauge" };

const PROPS = [
  {
    name: "value",
    type: "number",
    description: "Current value between 0 and max.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Maximum value.",
  },
  {
    name: "size",
    type: "number",
    default: "80",
    description: "Diameter in pixels.",
  },
  {
    name: "strokeWidth",
    type: "number",
    default: "8",
    description: "Track stroke thickness.",
  },
  {
    name: "variant",
    type: '"auto" | "success" | "warning" | "caution" | "danger"',
    default: '"auto"',
    description: "Colour override. 'auto' derives from status thresholds (<70% success, <90% warning, <101% caution, >100% danger).",
  },
  {
    name: "label",
    type: "string",
    description: "Short text rendered in the centre of the arc. Defaults to percentage.",
  },
  {
    name: "sublabel",
    type: "string",
    description: "Secondary line beneath the label — useful for units (e.g. 'h / 40h').",
  },
];

const CODE = {
  react: {
    filename: "Gauge.tsx",
    code: `interface GaugeProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "auto" | "success" | "warning" | "caution" | "danger";
  label?: string;
  sublabel?: string;
}

const STATUS_COLORS = {
  success: "rgb(var(--status-success))",
  warning: "rgb(var(--status-warning))",
  caution: "rgb(var(--status-caution))",
  danger:  "rgb(var(--status-danger))",
};

function resolveVariant(pct: number, override: GaugeProps["variant"]) {
  if (override !== "auto") return override!;
  if (pct < 70)  return "success";
  if (pct < 90)  return "warning";
  if (pct < 101) return "caution";
  return "danger";
}

export function Gauge({
  value, max = 100, size = 80, strokeWidth = 8,
  variant = "auto", label, sublabel,
}: GaugeProps) {
  const pct   = Math.min(100, Math.max(0, (value / max) * 100));
  const color = STATUS_COLORS[resolveVariant(pct, variant)];

  // 270° sweep starting at 135° (bottom-left), ending at 45° (bottom-right)
  const SWEEP   = 270;
  const START   = 135;
  const r       = (size - strokeWidth) / 2;
  const cx      = size / 2;
  const cy      = size / 2;

  function polarToXY(deg: number) {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function arcPath(startDeg: number, sweepDeg: number) {
    const s   = polarToXY(startDeg);
    const e   = polarToXY(startDeg + sweepDeg);
    const large = sweepDeg > 180 ? 1 : 0;
    return \`M \${s.x} \${s.y} A \${r} \${r} 0 \${large} 1 \${e.x} \${e.y}\`;
  }

  const trackPath = arcPath(START, SWEEP);
  const fillPath  = arcPath(START, (pct / 100) * SWEEP);

  return (
    <div className="flex flex-col items-center gap-1" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={\`0 0 \${size} \${size}\`}>
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
          <span className="font-bold text-[rgb(var(--text-primary))]" style={{ fontSize: size * 0.17 }}>
            {label ?? \`\${Math.round(pct)}%\`}
          </span>
          {sublabel && (
            <span className="text-[rgb(var(--text-tertiary))]" style={{ fontSize: size * 0.11 }}>
              {sublabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}`,
  },
  html: {
    filename: "gauge.html",
    code: `<!-- Gauge is SVG-based. See the React implementation for a reusable component. -->
<!-- Below is a standalone HTML + JS example: -->

<div class="gauge-wrapper" id="gauge-root"></div>

<script>
function renderGauge({ value, max = 100, size = 80, strokeWidth = 8, variant = "auto", label, sublabel }) {
  const pct   = Math.min(100, Math.max(0, (value / max) * 100));
  const SWEEP = 270, START = 135;
  const r  = (size - strokeWidth) / 2;
  const cx = size / 2, cy = size / 2;

  const colors = {
    success: "#10b981", warning: "#f59e0b",
    caution: "#f97316", danger: "#f87171",
  };

  const resolvedVariant = variant !== "auto" ? variant
    : pct < 70 ? "success" : pct < 90 ? "warning" : pct < 101 ? "caution" : "danger";
  const color = colors[resolvedVariant];

  function polar(deg) {
    const rad = deg * Math.PI / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  }

  function arc(startDeg, sweepDeg) {
    const [sx, sy] = polar(startDeg);
    const [ex, ey] = polar(startDeg + sweepDeg);
    const large = sweepDeg > 180 ? 1 : 0;
    return \`M \${sx} \${sy} A \${r} \${r} 0 \${large} 1 \${ex} \${ey}\`;
  }

  const trackPath = arc(START, SWEEP);
  const fillPath  = arc(START, (pct / 100) * SWEEP);
  const fontSize  = size * 0.17;

  document.getElementById("gauge-root").innerHTML = \`
    <div style="position:relative;width:\${size}px;height:\${size}px">
      <svg width="\${size}" height="\${size}" viewBox="0 0 \${size} \${size}">
        <path d="\${trackPath}" fill="none" stroke="rgb(var(--progress-track))"
              stroke-width="\${strokeWidth}" stroke-linecap="round"/>
        \${pct > 0 ? \`<path d="\${fillPath}" fill="none" stroke="\${color}"
              stroke-width="\${strokeWidth}" stroke-linecap="round"/>\` : ""}
      </svg>
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <span style="font-size:\${fontSize}px;font-weight:700">\${label ?? Math.round(pct) + "%"}</span>
        \${sublabel ? \`<span style="font-size:\${size * 0.11}px;color:rgb(var(--text-tertiary))">\${sublabel}</span>\` : ""}
      </div>
    </div>
  \`;
}

renderGauge({ value: 68, sublabel: "34h / 40h" });
</script>`,
  },
  swift: {
    filename: "SitkaGauge.swift",
    code: `import SwiftUI

enum GaugeVariant { case auto, success, warning, caution, danger }

struct SitkaGauge: View {
    let value: Double
    var max: Double = 100
    var size: CGFloat = 80
    var strokeWidth: CGFloat = 8
    var variant: GaugeVariant = .auto
    var label: String? = nil
    var sublabel: String? = nil

    private var pct: Double { Swift.min(1, Swift.max(0, value / max)) }

    private var resolvedVariant: GaugeVariant {
        guard variant == .auto else { return variant }
        if pct < 0.70 { return .success }
        if pct < 0.90 { return .warning }
        if pct < 1.01 { return .caution }
        return .danger
    }

    private var fillColor: Color {
        switch resolvedVariant {
        case .auto:    return .accentColor
        case .success: return Color(hex: "#10b981")
        case .warning: return Color(hex: "#f59e0b")
        case .caution: return Color(hex: "#f97316")
        case .danger:  return Color(hex: "#f87171")
        }
    }

    // 270° sweep, starting at 135°
    private var startAngle: Angle { .degrees(135) }
    private var endAngle:   Angle { .degrees(135 + 270 * pct) }

    var body: some View {
        ZStack {
            // Track
            Circle()
                .trim(from: 0, to: 0.75)
                .stroke(Color(.systemFill), style: StrokeStyle(lineWidth: strokeWidth, lineCap: .round))
                .frame(width: size - strokeWidth, height: size - strokeWidth)
                .rotationEffect(.degrees(135))

            // Fill
            Circle()
                .trim(from: 0, to: 0.75 * pct)
                .stroke(fillColor, style: StrokeStyle(lineWidth: strokeWidth, lineCap: .round))
                .frame(width: size - strokeWidth, height: size - strokeWidth)
                .rotationEffect(.degrees(135))
                .animation(.easeOut(duration: 0.4), value: pct)

            // Centre label
            VStack(spacing: 1) {
                Text(label ?? "\\(Int(pct * 100))%")
                    .font(.system(size: size * 0.17, weight: .bold, design: .rounded))
                if let sub = sublabel {
                    Text(sub)
                        .font(.system(size: size * 0.11))
                        .foregroundStyle(.tertiary)
                }
            }
        }
        .frame(width: size, height: size)
    }
}

#Preview {
    LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 4), spacing: 20) {
        SitkaGauge(value: 45, sublabel: "Available")
        SitkaGauge(value: 78, sublabel: "Moderate")
        SitkaGauge(value: 94, sublabel: "Near Full")
        SitkaGauge(value: 108, sublabel: "Overloaded")
    }
    .padding()
}`,
  },
  macos: {
    filename: "SitkaGauge+macOS.swift",
    code: `import SwiftUI

// macOS — same component, no changes needed.
// The gauge SVG arc approach works identically on macOS.
// Use SitkaGauge from the iOS implementation directly.

// Example placement in a LazyVGrid for team capacity cards:
#Preview("Team Capacity") {
    let members = [
        ("Alex", 36.0, 40.0),
        ("Sam",  38.0, 40.0),
        ("Dana", 42.0, 40.0),
        ("Lee",   28.0, 40.0),
    ]
    LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 12), count: 4), spacing: 12) {
        ForEach(members, id: \\.0) { name, hours, capacity in
            VStack(spacing: 6) {
                SitkaGauge(value: hours, max: capacity, size: 72, sublabel: "\\(Int(hours))h")
                Text(name)
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(.primary)
                Text("\\(Int(hours))h / \\(Int(capacity))h")
                    .font(.system(size: 10))
                    .foregroundStyle(.tertiary)
            }
            .padding(12)
            .background(Color(.controlBackgroundColor))
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).stroke(Color(.separatorColor), lineWidth: 1))
        }
    }
    .padding()
    .frame(width: 500)
}`,
  },
};

export default function GaugePage() {
  // SVG arc helper
  function arcPath(size: number, sw: number, startDeg: number, sweepDeg: number) {
    const r = (size - sw) / 2;
    const cx = size / 2, cy = size / 2;
    function polar(deg: number) {
      const rad = (deg * Math.PI) / 180;
      return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
    }
    const [sx, sy] = polar(startDeg);
    const [ex, ey] = polar(startDeg + sweepDeg);
    const large = sweepDeg > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  }

  const members = [
    { name: "Alex C.", value: 45, label: "45%", color: "#10b981", sub: "Available" },
    { name: "Sam P.", value: 78, label: "78%", color: "#f59e0b", sub: "Moderate" },
    { name: "Dana K.", value: 95, label: "95%", color: "#f97316", sub: "Near Full" },
    { name: "Lee R.", value: 108, label: "108%", color: "#f87171", sub: "Overloaded" },
  ];

  return (
    <div>
      <PageHeader
        title="Gauge"
        description="270° arc ring for utilization, capacity, and completion metrics. Auto-colours by threshold — green below 70%, amber below 90%, orange to 100%, red when over. Pairs with the KPI Tile and Team Capacity grid."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Preview</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 flex gap-8 justify-center flex-wrap">
          {members.map(({ name, value, label, color, sub }) => {
            const size = 80, sw = 8;
            const track = arcPath(size, sw, 135, 270);
            const fill = arcPath(size, sw, 135, 270 * Math.min(1, value / 100));
            return (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className="relative" style={{ width: size, height: size }}>
                  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <path d={track} fill="none" stroke="rgb(var(--progress-track))" strokeWidth={sw} strokeLinecap="round" />
                    <path d={fill} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[14px] font-bold text-[rgb(var(--text-primary))]">{label}</span>
                    <span className="text-[9px] text-[rgb(var(--text-tertiary))]">{sub}</span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[rgb(var(--text-secondary))]">{name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Status thresholds */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Status thresholds</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The <code className="font-mono text-[13px] text-[rgb(var(--accent))]">auto</code> variant derives colour from utilization percentage. These thresholds match Warren&apos;s team-capacity model and are the Sitka convention for all capacity indicators.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Range", "Variant", "Colour", "Meaning"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { range: "0–69%", variant: "success", color: "#10b981", meaning: "Available — capacity to spare" },
                { range: "70–89%", variant: "warning", color: "#f59e0b", meaning: "Moderate — approaching full" },
                { range: "90–100%", variant: "caution", color: "#f97316", meaning: "Near Full — limited availability" },
                { range: "> 100%", variant: "danger", color: "#f87171", meaning: "Overloaded — exceeded capacity" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[12px] text-[rgb(var(--text-secondary))]">{row.range}</td>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{row.variant}</code></td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ background: row.color }} />
                      <span className="font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.color}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.meaning}</td>
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
            "Wrap the SVG in a div with role='img' and aria-label conveying both value and meaning (e.g. 'Sam Park: 78% utilization, Moderate').",
            "Colour alone does not convey status — always pair the gauge with a visible text label showing the variant name.",
            "The arc is decorative; use aria-hidden='true' on the SVG and expose the accessible value via the wrapper label.",
            "At very small sizes (< 48px), the centre percentage may be illegible — use the sublabel to show absolute values (e.g. '34h') instead.",
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
