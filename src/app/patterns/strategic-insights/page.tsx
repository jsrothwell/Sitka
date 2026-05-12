"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

// Arc gauge helper — same approach as the Gauge component
function ArcGauge({
  value,
  max = 100,
  size = 100,
  strokeWidth = 10,
  color = "rgb(var(--accent))",
  label,
  sublabel,
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}) {
  const pct = Math.min(1, Math.max(0, value / max));
  const SWEEP = 270;
  const START = 135;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  function polar(deg: number) {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  }
  function arcPath(startDeg: number, sweepDeg: number) {
    if (sweepDeg <= 0) return "";
    const [sx, sy] = polar(startDeg);
    const [ex, ey] = polar(startDeg + sweepDeg);
    const large = sweepDeg > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  }

  const track = arcPath(START, SWEEP);
  const fill = arcPath(START, pct * SWEEP);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <path d={track} fill="none" stroke="rgb(var(--progress-track))" strokeWidth={strokeWidth} strokeLinecap="round" />
        {pct > 0 && (
          <path d={fill} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-[rgb(var(--text-primary))]" style={{ fontSize: size * 0.16 }}>
          {label ?? `${Math.round(pct * 100)}%`}
        </span>
        {sublabel && (
          <span className="text-[rgb(var(--text-tertiary))]" style={{ fontSize: size * 0.11 }}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

interface Recommendation {
  icon: string;
  title: string;
  detail: string;
  priority: "high" | "medium" | "low";
}

const PRIORITY_STYLES = {
  high:   { dot: "bg-red-400",    label: "High",   text: "text-red-400" },
  medium: { dot: "bg-amber-400",  label: "Medium", text: "text-amber-400" },
  low:    { dot: "bg-emerald-400",label: "Low",    text: "text-emerald-400" },
};

const DEMO_METRICS: { label: string; value: string; delta: string; trend: "up" | "down" | "flat" }[] = [
  { label: "Applications sent",    value: "24",   delta: "+8 this week",  trend: "up" },
  { label: "Response rate",        value: "29%",  delta: "+4% vs avg",    trend: "up" },
  { label: "Interview conversion", value: "42%",  delta: "↔ avg 40%",     trend: "flat" },
  { label: "Days since last apply",value: "2",    delta: "On pace",       trend: "up" },
];

const DEMO_ACTIONS: Recommendation[] = [
  { icon: "✉️", title: "Follow up with Stripe",        detail: "No response in 9 days. Send a brief note referencing your submission.", priority: "high" },
  { icon: "🔗", title: "Strengthen your portfolio",    detail: "3 of your top targets list case studies as a screening factor.", priority: "medium" },
  { icon: "📅", title: "Apply to 2 more this week",    detail: "Your response rate peaks at 8–12 applications per week.", priority: "medium" },
  { icon: "🤝", title: "Reach out to Linear alumni",   detail: "2 people in your network previously worked there.", priority: "low" },
];

const CODE = {
  react: {
    filename: "StrategicInsights.tsx",
    code: `interface Metric {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
}

interface Recommendation {
  icon: string;
  title: string;
  detail: string;
  priority: "high" | "medium" | "low";
}

interface StrategicInsightsProps {
  score: number;
  scoreLabel?: string;
  metrics: Metric[];
  recommendations: Recommendation[];
}

const PRIORITY_COLORS = {
  high:   "text-red-400",
  medium: "text-amber-400",
  low:    "text-emerald-400",
};

export function StrategicInsights({
  score,
  scoreLabel,
  metrics,
  recommendations,
}: StrategicInsightsProps) {
  return (
    <section aria-label="Strategic insights">
      {/* Score gauge + top metrics */}
      <div className="flex gap-6 items-start flex-wrap mb-6">
        <div className="flex flex-col items-center gap-1">
          <ArcGauge value={score} label={scoreLabel ?? \`\${score}\`} sublabel="/ 100" />
          <p className="text-[12px] font-medium text-[rgb(var(--text-secondary))]">Market Fit</p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-3 min-w-[200px]">
          {metrics.map((m) => (
            <div key={m.label}
                 className="rounded-lg border border-[rgb(var(--border))]
                            bg-[rgb(var(--surface-raised))] p-3">
              <p className="text-[11px] text-[rgb(var(--text-tertiary))] mb-1">{m.label}</p>
              <p className="text-[18px] font-bold text-[rgb(var(--text-primary))] leading-none mb-0.5">
                {m.value}
              </p>
              <p className={\`text-[11px] \${
                m.trend === "up"   ? "text-emerald-500" :
                m.trend === "down" ? "text-red-400" :
                "text-[rgb(var(--text-tertiary))]"
              }\`}>{m.delta}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended actions */}
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
          Recommended actions
        </p>
        {recommendations.map((rec) => (
          <div key={rec.title}
               className="flex items-start gap-3 rounded-xl border border-[rgb(var(--border))]
                          bg-[rgb(var(--surface))] p-4 hover:bg-[rgb(var(--surface-raised))]
                          transition-colors">
            <span className="text-xl shrink-0" aria-hidden="true">{rec.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-0.5">
                {rec.title}
              </p>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">
                {rec.detail}
              </p>
            </div>
            <span className={\`text-[10px] font-bold uppercase \${PRIORITY_COLORS[rec.priority]}\`}>
              {rec.priority}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}`,
  },
  html: {
    filename: "strategic-insights.html",
    code: `<section class="insights" aria-label="Strategic insights">

  <!-- Score + metrics row -->
  <div class="insights__header">

    <!-- Arc gauge (SVG) -->
    <div class="insights__gauge" aria-label="Market fit score: 72 out of 100">
      <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
        <!-- Track (270° arc, starts at 135°) -->
        <path d="M 12.93 87.07 A 40 40 0 1 1 87.07 87.07"
              fill="none" stroke="rgb(var(--progress-track))"
              stroke-width="10" stroke-linecap="round"/>
        <!-- Fill (72% of 270°) -->
        <path d="M 12.93 87.07 A 40 40 0 1 1 77.64 77.64"
              fill="none" stroke="rgb(var(--accent))"
              stroke-width="10" stroke-linecap="round"/>
      </svg>
      <div class="insights__gauge-label">
        <span class="insights__gauge-value">72</span>
        <span class="insights__gauge-sub">/ 100</span>
      </div>
      <p class="insights__gauge-title">Market Fit</p>
    </div>

    <!-- Metric tiles -->
    <div class="insights__metrics">
      <div class="metric-tile">
        <p class="metric-tile__label">Applications sent</p>
        <p class="metric-tile__value">24</p>
        <p class="metric-tile__delta metric-tile__delta--up">+8 this week</p>
      </div>
      <div class="metric-tile">
        <p class="metric-tile__label">Response rate</p>
        <p class="metric-tile__value">29%</p>
        <p class="metric-tile__delta metric-tile__delta--up">+4% vs avg</p>
      </div>
      <!-- Repeat for additional metrics -->
    </div>
  </div>

  <!-- Recommended actions -->
  <p class="insights__section-label">Recommended actions</p>
  <ul class="insights__actions">
    <li class="action-card">
      <span class="action-card__icon" aria-hidden="true">✉️</span>
      <div class="action-card__body">
        <p class="action-card__title">Follow up with Stripe</p>
        <p class="action-card__detail">No response in 9 days. Send a brief note.</p>
      </div>
      <span class="action-card__priority action-card__priority--high">High</span>
    </li>
    <!-- Repeat for additional actions -->
  </ul>

</section>

<style>
.insights { max-width: 560px; }
.insights__header { display: flex; gap: 24px; align-items: flex-start; margin-bottom: 24px; }
.insights__gauge { display: flex; flex-direction: column; align-items: center; gap: 4px; position: relative; }
.insights__gauge-label { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); text-align: center; }
.insights__gauge-value { font-size: 16px; font-weight: 700; display: block; }
.insights__gauge-sub { font-size: 11px; color: rgb(var(--text-tertiary)); }
.insights__gauge-title { font-size: 12px; font-weight: 500; color: rgb(var(--text-secondary)); }
.insights__metrics { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.metric-tile { border: 1px solid rgb(var(--border)); border-radius: 8px;
               background: rgb(var(--surface-raised)); padding: 10px; }
.metric-tile__label { font-size: 11px; color: rgb(var(--text-tertiary)); margin-bottom: 2px; }
.metric-tile__value { font-size: 18px; font-weight: 700; line-height: 1; margin-bottom: 2px; }
.metric-tile__delta { font-size: 11px; }
.metric-tile__delta--up   { color: #10b981; }
.metric-tile__delta--down { color: #f87171; }
.insights__section-label { font-size: 11px; font-weight: 600; text-transform: uppercase;
                            letter-spacing: 0.08em; color: rgb(var(--text-tertiary)); margin-bottom: 8px; }
.insights__actions { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.action-card { display: flex; align-items: flex-start; gap: 12px; border: 1px solid rgb(var(--border));
               border-radius: 12px; background: rgb(var(--surface)); padding: 14px; }
.action-card__icon { font-size: 20px; flex-shrink: 0; }
.action-card__body { flex: 1; }
.action-card__title  { font-size: 13px; font-weight: 600; margin-bottom: 2px; }
.action-card__detail { font-size: 12px; color: rgb(var(--text-secondary)); }
.action-card__priority { font-size: 10px; font-weight: 700; text-transform: uppercase; flex-shrink: 0; }
.action-card__priority--high   { color: #f87171; }
.action-card__priority--medium { color: #fbbf24; }
.action-card__priority--low    { color: #34d399; }
</style>`,
  },
  swift: {
    filename: "StrategicInsightsView.swift",
    code: `import SwiftUI

struct InsightMetric: Identifiable {
    var id: String { label }
    let label: String
    let value: String
    let delta: String
    let trend: Trend
    enum Trend { case up, down, flat }
}

struct RecommendationItem: Identifiable {
    var id: String { title }
    let icon: String
    let title: String
    let detail: String
    let priority: Priority
    enum Priority { case high, medium, low
        var color: Color {
            switch self {
            case .high:   return .red
            case .medium: return .yellow
            case .low:    return .green
            }
        }
        var label: String {
            switch self { case .high: return "High"; case .medium: return "Medium"; case .low: return "Low" }
        }
    }
}

struct StrategicInsightsView: View {
    let score: Double
    let metrics: [InsightMetric]
    let recommendations: [RecommendationItem]

    private var gaugeColor: Color {
        score >= 70 ? .green : score >= 40 ? .yellow : .red
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {

            // Score gauge + metrics
            HStack(alignment: .top, spacing: 20) {
                VStack(spacing: 4) {
                    ZStack {
                        // Track
                        Circle()
                            .trim(from: 0, to: 0.75)
                            .stroke(Color(.systemFill),
                                    style: StrokeStyle(lineWidth: 10, lineCap: .round))
                            .rotationEffect(.degrees(135))
                            .frame(width: 80, height: 80)
                        // Fill
                        Circle()
                            .trim(from: 0, to: 0.75 * (score / 100))
                            .stroke(gaugeColor,
                                    style: StrokeStyle(lineWidth: 10, lineCap: .round))
                            .rotationEffect(.degrees(135))
                            .frame(width: 80, height: 80)
                            .animation(.easeOut(duration: 0.5), value: score)
                        VStack(spacing: 1) {
                            Text("\\(Int(score))")
                                .font(.system(size: 16, weight: .bold))
                            Text("/ 100")
                                .font(.system(size: 11))
                                .foregroundStyle(.tertiary)
                        }
                    }
                    Text("Market Fit")
                        .font(.system(size: 12, weight: .medium))
                        .foregroundStyle(.secondary)
                }
                .accessibilityElement(children: .ignore)
                .accessibilityLabel("Market fit score: \\(Int(score)) out of 100")

                LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 8), count: 2), spacing: 8) {
                    ForEach(metrics) { m in
                        VStack(alignment: .leading, spacing: 2) {
                            Text(m.label).font(.system(size: 11)).foregroundStyle(.tertiary)
                            Text(m.value).font(.system(size: 18, weight: .bold)).lineLimit(1)
                            Text(m.delta).font(.system(size: 11))
                                .foregroundStyle(m.trend == .up ? .green : m.trend == .down ? .red : .secondary)
                        }
                        .padding(10)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color(.secondarySystemBackground))
                        .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                    }
                }
            }

            // Recommendations
            VStack(alignment: .leading, spacing: 8) {
                Text("Recommended Actions")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundStyle(.tertiary)
                    .textCase(.uppercase)

                ForEach(recommendations) { rec in
                    HStack(alignment: .top, spacing: 12) {
                        Text(rec.icon).font(.title3)
                        VStack(alignment: .leading, spacing: 2) {
                            Text(rec.title).font(.system(size: 13, weight: .semibold))
                            Text(rec.detail).font(.caption).foregroundStyle(.secondary)
                        }
                        Spacer()
                        Text(rec.priority.label)
                            .font(.system(size: 10, weight: .bold))
                            .textCase(.uppercase)
                            .foregroundStyle(rec.priority.color)
                    }
                    .padding(14)
                    .background(Color(.systemBackground))
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .stroke(Color(.separator), lineWidth: 1))
                }
            }
        }
    }
}

#Preview {
    StrategicInsightsView(
        score: 72,
        metrics: [
            InsightMetric(label: "Applications", value: "24", delta: "+8 this week", trend: .up),
            InsightMetric(label: "Response rate", value: "29%", delta: "+4% vs avg", trend: .up),
        ],
        recommendations: [
            RecommendationItem(icon: "✉️", title: "Follow up with Stripe",
                               detail: "No response in 9 days.", priority: .high),
            RecommendationItem(icon: "🔗", title: "Strengthen your portfolio",
                               detail: "Targets value case studies.", priority: .medium),
        ]
    )
    .padding()
    .frame(width: 360)
}`,
  },
  macos: {
    filename: "StrategicInsightsView+macOS.swift",
    code: `import SwiftUI

// macOS — wider layout with metrics in a horizontal strip and
// recommendations in a two-column grid.
struct MacStrategicInsightsView: View {
    let score: Double
    let metrics: [InsightMetric]
    let recommendations: [RecommendationItem]

    var body: some View {
        VStack(alignment: .leading, spacing: 24) {

            // Top band: gauge + metrics in one row
            HStack(alignment: .center, spacing: 32) {
                ScoreGauge(score: score)

                Divider().frame(height: 60)

                HStack(spacing: 24) {
                    ForEach(metrics) { m in
                        VStack(alignment: .leading, spacing: 2) {
                            Text(m.label).font(.system(size: 11)).foregroundStyle(.tertiary)
                            Text(m.value).font(.system(size: 22, weight: .bold))
                            Text(m.delta).font(.system(size: 11))
                                .foregroundStyle(m.trend == .up ? .green : m.trend == .down ? .red : .secondary)
                        }
                    }
                }
                Spacer()
            }
            .padding()
            .background(Color(.controlBackgroundColor))
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).stroke(Color(.separatorColor)))

            // Recommendations grid
            Text("Recommended Actions")
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(.tertiary)
                .textCase(.uppercase)

            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 12), count: 2), spacing: 12) {
                ForEach(recommendations) { rec in
                    HStack(alignment: .top, spacing: 10) {
                        Text(rec.icon).font(.title3)
                        VStack(alignment: .leading, spacing: 2) {
                            Text(rec.title).font(.system(size: 13, weight: .semibold))
                            Text(rec.detail).font(.caption).foregroundStyle(.secondary)
                        }
                        Spacer()
                        Text(rec.priority.label)
                            .font(.system(size: 9, weight: .bold))
                            .textCase(.uppercase)
                            .foregroundStyle(rec.priority.color)
                    }
                    .padding(12)
                    .background(Color(.controlBackgroundColor))
                    .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 10, style: .continuous)
                        .stroke(Color(.separatorColor)))
                }
            }
        }
        .padding()
    }
}

struct ScoreGauge: View {
    let score: Double
    var color: Color { score >= 70 ? .green : score >= 40 ? .yellow : .red }

    var body: some View {
        ZStack {
            Circle()
                .trim(from: 0, to: 0.75)
                .stroke(Color(.systemFill), style: StrokeStyle(lineWidth: 9, lineCap: .round))
                .rotationEffect(.degrees(135))
                .frame(width: 72, height: 72)
            Circle()
                .trim(from: 0, to: 0.75 * (score / 100))
                .stroke(color, style: StrokeStyle(lineWidth: 9, lineCap: .round))
                .rotationEffect(.degrees(135))
                .frame(width: 72, height: 72)
                .animation(.easeOut(duration: 0.5), value: score)
            Text("\\(Int(score))")
                .font(.system(size: 18, weight: .bold, design: .rounded))
        }
        .accessibilityLabel("Score: \\(Int(score)) out of 100")
    }
}`,
  },
};

export default function StrategicInsightsPage() {
  const [score] = useState(72);

  return (
    <div>
      <PageHeader
        title="Strategic Insights"
        description="Data-driven recommendations panel combining a score gauge, key metrics strip, and prioritised action cards. Used in dashboards where the product needs to surface 'what to do next' from aggregate data."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6">
          {/* Score + metrics */}
          <div className="flex gap-6 items-start flex-wrap mb-6">
            <div className="flex flex-col items-center gap-1.5">
              <ArcGauge
                value={score}
                size={100}
                strokeWidth={10}
                color="#6366f1"
                label="72"
                sublabel="/ 100"
              />
              <p className="text-[12px] font-medium text-[rgb(var(--text-secondary))]">Market Fit</p>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-2.5 min-w-[200px]">
              {DEMO_METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-3"
                >
                  <p className="text-[11px] text-[rgb(var(--text-tertiary))] mb-1">{m.label}</p>
                  <p className="text-[18px] font-bold text-[rgb(var(--text-primary))] leading-none mb-0.5">
                    {m.value}
                  </p>
                  <p
                    className={`text-[11px] ${
                      m.trend === "up"
                        ? "text-emerald-500"
                        : m.trend === "down"
                        ? "text-red-400"
                        : "text-[rgb(var(--text-tertiary))]"
                    }`}
                  >
                    {m.delta}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
            Recommended actions
          </p>
          <div className="space-y-2">
            {DEMO_ACTIONS.map((rec) => {
              const ps = PRIORITY_STYLES[rec.priority];
              return (
                <div
                  key={rec.title}
                  className="flex items-start gap-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-4"
                >
                  <span className="text-lg shrink-0" aria-hidden="true">{rec.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-0.5">
                      {rec.title}
                    </p>
                    <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">
                      {rec.detail}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`w-1.5 h-1.5 rounded-full ${ps.dot}`} />
                    <span className={`text-[10px] font-bold uppercase ${ps.text}`}>{ps.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Structure</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The panel has three layers. Each layer answers a different question for the user.
        </p>
        <div className="space-y-3">
          {[
            {
              layer: "1 — Score gauge",
              question: "How am I doing overall?",
              body: "A single number (0–100) derived from aggregate activity. The arc gauge communicates direction at a glance. Use a colour that reflects relative standing — green above threshold, amber in range, red below.",
            },
            {
              layer: "2 — Metric strip",
              question: "What are the key signals?",
              body: "4–6 KPI tiles showing the most meaningful sub-metrics. Each tile shows value, delta, and trend direction. Limit to metrics the user can act on — vanity metrics add noise.",
            },
            {
              layer: "3 — Recommendation cards",
              question: "What should I do next?",
              body: "Prioritised list of concrete, actionable suggestions derived from the metrics. Each card carries an icon, a one-line action, a brief rationale, and a priority badge (High / Medium / Low). Order by priority, limit to 4–6 items.",
            },
          ].map(({ layer, question, body }) => (
            <div key={layer} className="rounded-xl border border-[rgb(var(--border))] p-4 flex gap-4">
              <div className="shrink-0 w-32 text-[12px] font-semibold text-[rgb(var(--text-primary))]">
                {layer}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[rgb(var(--accent))] mb-1">{question}</p>
                <p className="text-[13px] text-[rgb(var(--text-secondary))]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scoring guidelines */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Scoring guidelines</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The score gauge is only meaningful if the scoring logic is consistent and explainable. Follow these principles:
        </p>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "The score must be derivable from the displayed metrics. A user who reads the metric tiles should be able to understand why they received their score.",
            "Define the thresholds before shipping: what score is 'good', 'average', 'at risk'? Use colours consistently with those thresholds — don't show green for a 38/100.",
            "Show how the score is calculated, either as a tooltip on the gauge or a 'How is this calculated?' link. Opaque scores reduce trust.",
            "Smooth transitions when the score changes — abrupt jumps feel like bugs. Use a 400–600ms ease-out animation.",
            "Never show a score of 0 to a new user. Seed a reasonable baseline or show an 'insufficient data' state instead.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "The arc gauge is visual — expose the score via an accessible label on its wrapper: aria-label='Market fit score: 72 out of 100'. The SVG itself is aria-hidden.",
            "Metric tiles must have distinct accessible labels. 'Response rate: 29%, up 4% vs average' is better than just '29%'.",
            "Recommendation cards must be navigable by keyboard. If they carry actions (Dismiss, Act), ensure each action has a clear label including the card subject.",
            "Priority badges use colour only (red/amber/green) — always include the text label ('High', 'Medium', 'Low') alongside the colour dot.",
            "If the score or metrics update live, wrap the insight panel in role='region' aria-live='polite' so screen reader users are informed of changes without being interrupted.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
