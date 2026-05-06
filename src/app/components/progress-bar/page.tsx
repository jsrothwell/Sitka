import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Progress Bar" };

const PROPS = [
  {
    name: "value",
    type: "number",
    description: "Current progress value between 0 and max.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Maximum value. Percentage is computed as value / max.",
  },
  {
    name: "variant",
    type: '"default" | "success" | "warning" | "danger"',
    default: '"default"',
    description: "Semantic fill colour — maps to the corresponding status token.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Track height: sm = 4 px, md = 6 px, lg = 8 px.",
  },
  {
    name: "indeterminate",
    type: "boolean",
    default: "false",
    description: "Shows a shimmer sweep animation when the end value is unknown.",
  },
  {
    name: "showValue",
    type: "boolean",
    default: "false",
    description: "Renders a percentage label above the right edge of the track.",
  },
  {
    name: "label",
    type: "string",
    description: "Accessible label attached via aria-label. Required for screen readers.",
  },
];

const CODE = {
  react: {
    filename: "ProgressBar.tsx",
    code: `import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value?: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  indeterminate?: boolean;
  showValue?: boolean;
  label?: string;
  className?: string;
}

const fillColors = {
  default: "rgb(var(--accent))",
  success: "rgb(var(--progress-fill-success))",
  warning: "rgb(var(--progress-fill-warning))",
  danger:  "rgb(var(--progress-fill-danger))",
};

const heights = { sm: 4, md: 6, lg: 8 };

export function ProgressBar({
  value = 0,
  max = 100,
  variant = "default",
  size = "md",
  indeterminate = false,
  showValue = false,
  label,
  className,
}: ProgressBarProps) {
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
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          }}
        />
        {indeterminate ? (
          <div
            className="absolute inset-y-0 w-1/3 rounded-full animate-[shimmer_1.4s_ease-in-out_infinite]"
            style={{ background: fillColors[variant] }}
          />
        ) : (
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{ width: \`\${pct}%\`, background: fillColors[variant] }}
          />
        )}
      </div>
    </div>
  );
}`,
  },
  html: {
    filename: "progress-bar.html",
    code: `<!-- Determinate -->
<div class="progress" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" aria-label="Upload progress">
  <div class="progress-fill" style="width: 65%"></div>
</div>

<!-- Success variant -->
<div class="progress" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-fill progress-success" style="width: 100%"></div>
</div>

<!-- Warning variant -->
<div class="progress" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-fill progress-warning" style="width: 80%"></div>
</div>

<!-- Danger variant -->
<div class="progress" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-fill progress-danger" style="width: 95%"></div>
</div>

<!-- Indeterminate -->
<div class="progress" role="progressbar" aria-busy="true" aria-label="Loading">
  <div class="progress-fill progress-indeterminate"></div>
</div>

<!-- Sizes -->
<div class="progress progress-sm"><div class="progress-fill" style="width: 40%"></div></div>
<div class="progress progress-md"><div class="progress-fill" style="width: 40%"></div></div>
<div class="progress progress-lg"><div class="progress-fill" style="width: 40%"></div></div>

<style>
  .progress {
    position: relative;
    width: 100%;
    height: 6px;
    background: rgb(var(--progress-track));
    border-radius: 9999px;
    overflow: hidden;
    box-shadow: inset 0 1px 0 rgba(0,0,0,0.12);
  }
  .progress::after {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    pointer-events: none;
  }
  .progress-fill {
    height: 100%;
    background: rgb(var(--accent));
    border-radius: 9999px;
    transition: width 500ms ease;
  }
  .progress-success { background: rgb(var(--progress-fill-success)); }
  .progress-warning { background: rgb(var(--progress-fill-warning)); }
  .progress-danger  { background: rgb(var(--progress-fill-danger)); }

  .progress-sm { height: 4px; }
  .progress-md { height: 6px; }
  .progress-lg { height: 8px; }

  @keyframes sweep {
    0%   { transform: translateX(-200%); }
    100% { transform: translateX(500%); }
  }
  .progress-indeterminate {
    width: 33%;
    animation: sweep 1.4s ease-in-out infinite;
  }
</style>`,
  },
  swift: {
    filename: "SitkaProgressBar.swift",
    code: `import SwiftUI

enum SitkaProgressVariant { case \`default\`, success, warning, danger }
enum SitkaProgressSize    { case sm, md, lg }

struct SitkaProgressBar: View {
    var value: Double = 0
    var max: Double = 100
    var variant: SitkaProgressVariant = .default
    var size: SitkaProgressSize = .md
    var indeterminate: Bool = false
    var showValue: Bool = false
    var label: String? = nil

    @State private var shimmerOffset: CGFloat = -1

    private var pct: Double { min(1, max(0, value / max)) }

    private var fillColor: Color {
        switch variant {
        case .default: return Color.accentColor
        case .success: return Color(hex: "#10b981")
        case .warning: return Color(hex: "#f59e0b")
        case .danger:  return Color(hex: "#f87171")
        }
    }

    private var trackHeight: CGFloat {
        switch size { case .sm: return 4; case .md: return 6; case .lg: return 8 }
    }

    var body: some View {
        VStack(alignment: .trailing, spacing: 4) {
            if showValue {
                Text("\\(Int(pct * 100))%")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundStyle(.secondary)
            }
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule()
                        .fill(Color(.systemFill))
                        .frame(height: trackHeight)
                    if indeterminate {
                        Capsule()
                            .fill(fillColor)
                            .frame(width: geo.size.width * 0.33, height: trackHeight)
                            .offset(x: shimmerOffset * geo.size.width)
                            .onAppear {
                                withAnimation(.linear(duration: 1.4).repeatForever(autoreverses: false)) {
                                    shimmerOffset = 1.5
                                }
                            }
                    } else {
                        Capsule()
                            .fill(fillColor)
                            .frame(width: geo.size.width * pct, height: trackHeight)
                            .animation(.easeOut(duration: 0.5), value: pct)
                    }
                    // Specular top-edge highlight
                    Capsule()
                        .fill(LinearGradient(
                            colors: [.white.opacity(0.18), .clear],
                            startPoint: .top, endPoint: .bottom
                        ))
                        .frame(height: trackHeight / 2)
                        .frame(maxHeight: .infinity, alignment: .top)
                }
            }
            .frame(height: trackHeight)
            .accessibilityValue(indeterminate ? "In progress" : "\\(Int(pct * 100)) percent")
            .accessibilityLabel(label ?? "Progress")
        }
    }
}

#Preview {
    VStack(spacing: 20) {
        SitkaProgressBar(value: 65, showValue: true)
        SitkaProgressBar(value: 100, variant: .success, showValue: true)
        SitkaProgressBar(value: 80, variant: .warning, showValue: true)
        SitkaProgressBar(value: 95, variant: .danger, showValue: true)
        SitkaProgressBar(indeterminate: true, label: "Loading")
        SitkaProgressBar(value: 45, size: .sm)
        SitkaProgressBar(value: 45, size: .lg)
    }
    .padding()
}`,
  },
  macos: {
    filename: "SitkaProgressBar+macOS.swift",
    code: `import SwiftUI

// macOS — identical API, AppKit color roles
struct SitkaProgressBar: View {
    var value: Double = 0
    var max: Double = 100
    var variant: SitkaProgressVariant = .default
    var size: SitkaProgressSize = .md
    var indeterminate: Bool = false
    var showValue: Bool = false

    private var pct: Double { Swift.min(1, Swift.max(0, value / max)) }

    private var fillColor: Color {
        switch variant {
        case .default: return .accentColor
        case .success: return Color(hex: "#10b981")
        case .warning: return Color(hex: "#f59e0b")
        case .danger:  return Color(red: 0.97, green: 0.44, blue: 0.44)
        }
    }

    private var trackHeight: CGFloat {
        switch size { case .sm: return 4; case .md: return 6; case .lg: return 8 }
    }

    var body: some View {
        HStack(spacing: 8) {
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(Color(.separatorColor).opacity(0.3))
                        .frame(height: trackHeight)
                    if indeterminate {
                        ProgressView().scaleEffect(0.5)
                    } else {
                        Capsule().fill(fillColor)
                            .frame(width: geo.size.width * pct, height: trackHeight)
                            .animation(.easeOut(duration: 0.45), value: pct)
                    }
                }
            }
            .frame(height: trackHeight)
            if showValue {
                Text("\\(Int(pct * 100))%")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundStyle(.secondary)
                    .frame(width: 32, alignment: .trailing)
            }
        }
    }
}`,
  },
};

export default function ProgressBarPage() {
  const variants = [
    { label: "Default (65%)", pct: 65, color: "rgb(var(--accent))" },
    { label: "Success (100%)", pct: 100, color: "rgb(var(--progress-fill-success))" },
    { label: "Warning (80%)", pct: 80, color: "rgb(var(--progress-fill-warning))" },
    { label: "Danger (95%)", pct: 95, color: "rgb(var(--progress-fill-danger))" },
  ];

  return (
    <div>
      <PageHeader
        title="Progress Bar"
        description="Non-interactive progress indicator. Communicates completion, health, or utilization through a filled track. Four semantic variants, three sizes, and an indeterminate shimmer mode."
      />

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 flex flex-col gap-5">
          {variants.map(({ label, pct, color }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-[rgb(var(--text-secondary))]">{label}</span>
                <span className="text-[11px] font-medium text-[rgb(var(--text-tertiary))]">{pct}%</span>
              </div>
              <div
                className="relative w-full rounded-full overflow-hidden"
                style={{ height: 6, background: "rgb(var(--progress-track))", boxShadow: "inset 0 1px 0 rgba(0,0,0,0.12)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: color }}
                />
                <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sizes</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Three track heights for different information densities. Use <code className="font-mono text-[13px] text-[rgb(var(--accent))]">sm</code> inside
          dense table rows and list items; <code className="font-mono text-[13px] text-[rgb(var(--accent))]">lg</code> for prominent hero metrics.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 flex flex-col gap-5">
          {([["sm", 4], ["md", 6], ["lg", 8]] as const).map(([size, h]) => (
            <div key={size} className="flex items-center gap-4">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))] w-6 shrink-0">{size}</span>
              <div className="flex-1 relative rounded-full overflow-hidden" style={{ height: h, background: "rgb(var(--progress-track))" }}>
                <div className="h-full rounded-full" style={{ width: "55%", background: "rgb(var(--accent))" }} />
              </div>
              <span className="text-[11px] text-[rgb(var(--text-tertiary))] w-7 shrink-0">{h}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Indeterminate */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Indeterminate</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          When end value is unknown — file upload, background job, AI generation — show a shimmer sweep instead of a static fill.
          Set <code className="font-mono text-[13px] text-[rgb(var(--accent))]">aria-busy="true"</code> and omit <code className="font-mono text-[13px] text-[rgb(var(--accent))]">aria-valuenow</code>.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6">
          <div className="relative w-full rounded-full overflow-hidden" style={{ height: 6, background: "rgb(var(--progress-track))" }}>
            <div className="absolute inset-y-0 w-1/3 rounded-full animate-[shimmer_1.4s_ease-in-out_infinite]" style={{ background: "rgb(var(--accent))" }} />
          </div>
        </div>
      </section>

      {/* Tokens */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Tokens</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Token", "Dark", "Light", "Use"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { token: "--progress-track", dark: "#26261e", light: "#e0e0e7", use: "Track background" },
                { token: "--progress-fill-success", dark: "#10b981", light: "#10b981", use: "Success fill" },
                { token: "--progress-fill-warning", dark: "#f59e0b", light: "#f59e0b", use: "Warning fill" },
                { token: "--progress-fill-danger", dark: "#f87171", light: "#ef4444", use: "Danger fill" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{row.token}</code></td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.dark}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.light}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
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
            'Use role="progressbar" with aria-valuenow, aria-valuemin, and aria-valuemax on determinate bars.',
            'For indeterminate bars, set aria-busy="true" and omit aria-valuenow — do not set it to 0.',
            "Always provide an aria-label or a visible text label linked with aria-labelledby.",
            "Colour alone does not convey variant meaning — pair the variant with a label (e.g., \"Budget: 95% — Critical\").",
            "Progress bars are non-interactive and never receive keyboard focus.",
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
