import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Burn / Budget Trajectory" };

const CODE = {
  react: {
    filename: "BurnTrajectoryChart.tsx",
    code: `"use client";

import { useRef, useEffect } from "react";

interface BurnDataPoint {
  date: Date;
  actual?: number;    // undefined for future dates
  forecast?: number;  // undefined for past dates
  planned: number;
}

interface BurnChartProps {
  data: BurnDataPoint[];
  budget: number;
  currency?: string;
  status?: "success" | "warning" | "danger";
}

export function BurnTrajectoryChart({
  data,
  budget,
  currency = "$",
  status = "success",
}: BurnChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const statusColor = {
    success: "rgb(var(--status-success))",
    warning: "rgb(var(--status-warning))",
    danger:  "rgb(var(--status-danger))",
  }[status];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const { width, height } = canvas;

    // DPR scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const pad = { top: 20, right: 20, bottom: 40, left: 60 };
    const w = width - pad.left - pad.right;
    const h = height - pad.top - pad.bottom;

    const maxVal = budget * 1.15;
    const today = new Date();
    const minDate = data[0].date.getTime();
    const maxDate = data[data.length - 1].date.getTime();
    const dateRange = maxDate - minDate;

    function toX(date: Date) { return pad.left + ((date.getTime() - minDate) / dateRange) * w; }
    function toY(val: number) { return pad.top + h - (val / maxVal) * h; }

    ctx.clearRect(0, 0, width, height);

    // Grid lines (horizontal)
    ctx.strokeStyle = "rgba(128,128,128,0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (h / 4) * i;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + w, y); ctx.stroke();
    }

    // Budget ceiling line
    const budgetY = toY(budget);
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "rgba(248,113,113,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.left, budgetY); ctx.lineTo(pad.left + w, budgetY); ctx.stroke();
    ctx.setLineDash([]);

    // Planned pace line
    ctx.setLineDash([2, 3]);
    ctx.strokeStyle = "rgba(128,128,128,0.35)";
    ctx.lineWidth = 1;
    const plannedPoints = data.filter((d) => d.planned !== undefined);
    if (plannedPoints.length > 1) {
      ctx.beginPath();
      plannedPoints.forEach((d, i) => {
        const x = toX(d.date); const y = toY(d.planned);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Forecast area
    const futurePoints = data.filter((d) => d.forecast !== undefined);
    if (futurePoints.length > 1) {
      ctx.beginPath();
      futurePoints.forEach((d, i) => {
        const x = toX(d.date); const y = toY(d.forecast!);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.lineTo(toX(futurePoints[futurePoints.length - 1].date), pad.top + h);
      ctx.lineTo(toX(futurePoints[0].date), pad.top + h);
      ctx.closePath();
      ctx.fillStyle = statusColor.replace("rgb(", "rgba(").replace(")", " / 0.04)").replace(" / 0.04)", ", 0.04)");
      ctx.fill();

      // Forecast line (dashed)
      ctx.setLineDash([5, 3]);
      ctx.strokeStyle = statusColor.replace("rgb(", "rgba(").replace(")", " / 0.55)").replace(" / 0.55)", ", 0.55)");
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      futurePoints.forEach((d, i) => {
        const x = toX(d.date); const y = toY(d.forecast!);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Historical area
    const pastPoints = data.filter((d) => d.actual !== undefined);
    if (pastPoints.length > 1) {
      ctx.beginPath();
      pastPoints.forEach((d, i) => {
        const x = toX(d.date); const y = toY(d.actual!);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.lineTo(toX(pastPoints[pastPoints.length - 1].date), pad.top + h);
      ctx.lineTo(toX(pastPoints[0].date), pad.top + h);
      ctx.closePath();
      ctx.fillStyle = statusColor.replace("rgb(", "rgba(").replace(")", " / 0.07)").replace(" / 0.07)", ", 0.07)");
      ctx.fill();

      // Historical line (solid)
      ctx.strokeStyle = statusColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      pastPoints.forEach((d, i) => {
        const x = toX(d.date); const y = toY(d.actual!);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // Today line
    const todayX = toX(today);
    ctx.setLineDash([2, 2]);
    ctx.strokeStyle = "rgba(128,128,128,0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(todayX, pad.top); ctx.lineTo(todayX, pad.top + h); ctx.stroke();
    ctx.setLineDash([]);

    // Today dot
    const todayData = data.find((d) => d.actual !== undefined && Math.abs(d.date.getTime() - today.getTime()) < 4 * 86_400_000);
    if (todayData) {
      const ty = toY(todayData.actual!);
      ctx.beginPath(); ctx.arc(todayX, ty, 5, 0, Math.PI * 2);
      ctx.fillStyle = statusColor; ctx.fill();
    }

    // Y-axis labels
    ctx.fillStyle = "rgba(128,128,128,0.8)";
    ctx.font = "11px -apple-system, sans-serif";
    ctx.textAlign = "right";
    for (let i = 0; i <= 4; i++) {
      const val = (maxVal / 4) * (4 - i);
      const y = pad.top + (h / 4) * i;
      ctx.fillText(\`\${currency}\${Math.round(val / 1000)}k\`, pad.left - 6, y + 4);
    }
  }, [data, budget, statusColor, currency]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: 200, display: "block" }} />;
}`,
  },
  html: {
    filename: "burn-trajectory.html",
    code: `<!-- Burn Trajectory is Canvas-based for performance.
     Use the React or Swift implementation.
     This snippet shows the KPI panel and metric tiles below the chart. -->

<div class="burn-chart-tile">
  <canvas id="burnChart" width="600" height="200"></canvas>
</div>

<!-- KPI panel -->
<div class="burn-kpi-panel">
  <div class="kpi-card">
    <div class="kpi-card__icon">📅</div>
    <div class="kpi-card__value">Oct 12</div>
    <div class="kpi-card__label">Exhaustion Date</div>
  </div>
  <div class="kpi-card">
    <div class="kpi-card__icon">💰</div>
    <div class="kpi-card__value">$142k</div>
    <div class="kpi-card__label">Projected at End</div>
  </div>
</div>

<!-- Burn rate metrics row -->
<div class="burn-metrics">
  <div class="burn-metric burn-metric--highlighted">
    <span class="burn-metric__value">$4,200</span>
    <span class="burn-metric__label">Weekly Burn</span>
  </div>
  <div class="burn-metric">
    <span class="burn-metric__value">$600</span>
    <span class="burn-metric__label">Recent Daily</span>
  </div>
  <div class="burn-metric">
    <span class="burn-metric__value">$540</span>
    <span class="burn-metric__label">Avg Daily</span>
  </div>
  <div class="burn-metric">
    <span class="burn-metric__value">$480</span>
    <span class="burn-metric__label">Planned Daily</span>
  </div>
</div>

<style>
.burn-kpi-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; }
.burn-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 12px; }
.burn-metric { padding: 12px; border-radius: 10px; border: 1px solid rgb(var(--border)); background: rgb(var(--surface)); text-align: center; }
.burn-metric--highlighted { border-color: rgb(var(--status-warning)); }
</style>`,
  },
  swift: {
    filename: "BurnTrajectoryChart.swift",
    code: `import SwiftUI

// Warren's BurnTrajectoryChart — Canvas-based implementation

struct BurnTrajectoryChart: View {
    let data: [BurnDataPoint]
    let budget: Double
    let status: BurnStatus

    var statusColor: Color {
        switch status {
        case .onTrack:  .sfStatusSuccess
        case .atRisk:   .sfStatusWarning
        case .overBudget: .sfStatusDanger
        }
    }

    var body: some View {
        Canvas { ctx, size in
            let frame = CGRect(origin: .init(x: 60, y: 20),
                               size: .init(width: size.width - 80, height: size.height - 60))

            drawGrid(ctx, frame: frame)
            drawPlannedPace(ctx, frame: frame)
            drawBudgetCeiling(ctx, frame: frame)
            drawForecastArea(ctx, frame: frame)
            drawHistoricalArea(ctx, frame: frame)
            drawTodayLine(ctx, frame: frame)
            drawTodayDot(ctx, frame: frame)
            drawYAxisLabels(ctx, frame: frame, size: size)
        }
        .frame(height: 200)
    }

    // Historical: 2px solid, statusColor
    private func drawHistoricalArea(_ ctx: GraphicsContext, frame: CGRect) {
        let pastPoints = data.filter { $0.actual != nil }
        guard pastPoints.count > 1 else { return }

        var areaPath = Path()
        // Build area fill path
        areaPath.move(to: toPoint(pastPoints[0].date, pastPoints[0].actual!, frame: frame))
        pastPoints.dropFirst().forEach { d in
            areaPath.addLine(to: toPoint(d.date, d.actual!, frame: frame))
        }
        areaPath.addLine(to: CGPoint(x: toX(pastPoints.last!.date, frame: frame), y: frame.maxY))
        areaPath.addLine(to: CGPoint(x: frame.minX, y: frame.maxY))
        areaPath.closeSubpath()

        ctx.fill(areaPath, with: .color(statusColor.opacity(0.07)))

        var linePath = Path()
        linePath.move(to: toPoint(pastPoints[0].date, pastPoints[0].actual!, frame: frame))
        pastPoints.dropFirst().forEach { d in
            linePath.addLine(to: toPoint(d.date, d.actual!, frame: frame))
        }
        ctx.stroke(linePath, with: .color(statusColor), style: StrokeStyle(lineWidth: 2))
    }

    // Forecast: 1.5px dashed [5,3], statusColor 55%
    private func drawForecastArea(_ ctx: GraphicsContext, frame: CGRect) {
        let futurePoints = data.filter { $0.forecast != nil }
        guard futurePoints.count > 1 else { return }

        var path = Path()
        path.move(to: toPoint(futurePoints[0].date, futurePoints[0].forecast!, frame: frame))
        futurePoints.dropFirst().forEach { d in
            path.addLine(to: toPoint(d.date, d.forecast!, frame: frame))
        }
        ctx.stroke(path, with: .color(statusColor.opacity(0.55)),
                   style: StrokeStyle(lineWidth: 1.5, dash: [5, 3]))
    }

    // Budget ceiling: 1px dashed [3,3], sfRed 35%
    private func drawBudgetCeiling(_ ctx: GraphicsContext, frame: CGRect) {
        let y = toY(budget, frame: frame)
        var path = Path()
        path.move(to: CGPoint(x: frame.minX, y: y))
        path.addLine(to: CGPoint(x: frame.maxX, y: y))
        ctx.stroke(path, with: .color(.sfStatusDanger.opacity(0.35)),
                   style: StrokeStyle(lineWidth: 1, dash: [3, 3]))
    }
}

struct BurnDataPoint {
    let date: Date
    var actual: Double?    // nil for future
    var forecast: Double?  // nil for past
    let planned: Double
}

enum BurnStatus { case onTrack, atRisk, overBudget }`,
  },
  macos: {
    filename: "BurnTrajectoryChart.swift",
    code: `// macOS — same Canvas-based chart, adds scenario cards below

struct BurnDashboard: View {
    let chart: BurnChartData

    var body: some View {
        VStack(spacing: 20) {
            // Chart tile
            BurnTrajectoryChart(data: chart.data, budget: chart.budget, status: chart.status)
                .padding(16)
                .background(Color.sfCanvasBackground)
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .overlay { RoundedRectangle(cornerRadius: 12).stroke(Color.sfBorder) }

            // KPI row
            HStack(spacing: 12) {
                StatTile(icon: "calendar", value: chart.exhaustionDate, label: "Exhaustion Date")
                StatTile(icon: "dollarsign.circle", value: chart.projectedAtEnd, label: "Projected at End")
            }

            // Metric tiles
            HStack(spacing: 10) {
                ForEach(chart.metrics) { metric in
                    MetricTile(metric: metric, isHighlighted: metric.id == chart.highlightedMetricId)
                }
            }

            // Scenario cards
            HStack(spacing: 12) {
                ScenarioCard(label: "Optimistic", multiplier: 0.80, budget: chart.budget)
                ScenarioCard(label: "Current Pace", multiplier: 1.00, budget: chart.budget, isCurrent: true)
                ScenarioCard(label: "Pessimistic", multiplier: 1.20, budget: chart.budget)
            }
        }
    }
}`,
  },
};

function MiniChart() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const budget = 120000;
  const points = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(year, month - 5 + i, 1);
    const isPast = d <= today;
    const planned = (budget / 12) * (i + 1);
    const actual = isPast ? planned * (0.9 + Math.sin(i * 0.8) * 0.12 + Math.random() * 0.05) : undefined;
    const forecast = !isPast ? planned * 1.08 : undefined;
    return { date: d, actual, forecast, planned };
  });

  const maxVal = budget * 1.15;
  const minDate = points[0].date.getTime();
  const dateRange = points[points.length - 1].date.getTime() - minDate;
  const W = 640, H = 200, pad = { t: 16, r: 16, b: 36, l: 56 };
  const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b;

  function toX(d: Date) { return pad.l + ((d.getTime() - minDate) / dateRange) * cW; }
  function toY(v: number) { return pad.t + cH - (v / maxVal) * cH; }

  const pastPts = points.filter((p) => p.actual !== undefined);
  const futurePts = points.filter((p) => p.forecast !== undefined);
  const todayX = toX(today);
  const statusColor = "#F59E0B";

  function pointsToPath(pts: typeof points, key: "actual" | "forecast" | "planned") {
    return pts.filter((p) => p[key] !== undefined)
      .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.date).toFixed(1)} ${toY(p[key] as number).toFixed(1)}`)
      .join(" ");
  }

  const budgetY = toY(budget);

  return (
    <div style={{ padding: 16, borderRadius: 12, background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))", boxShadow: "var(--shadow-card)" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block", overflow: "visible" }}>
        {/* Budget ceiling */}
        <line x1={pad.l} y1={budgetY} x2={pad.l + cW} y2={budgetY} stroke="rgba(248,113,113,0.5)" strokeWidth="1" strokeDasharray="3,3" />

        {/* Planned pace */}
        <path d={pointsToPath(points, "planned")} fill="none" stroke="rgba(128,128,128,0.35)" strokeWidth="1" strokeDasharray="2,3" />

        {/* Forecast area + line */}
        {futurePts.length > 1 && (
          <>
            <path
              d={`${pointsToPath(futurePts, "forecast")} L${toX(futurePts[futurePts.length - 1].date).toFixed(1)},${pad.t + cH} L${toX(futurePts[0].date).toFixed(1)},${pad.t + cH} Z`}
              fill={statusColor} fillOpacity={0.04}
            />
            <path d={pointsToPath(futurePts, "forecast")} fill="none" stroke={statusColor} strokeWidth="1.5" strokeOpacity={0.55} strokeDasharray="5,3" />
          </>
        )}

        {/* Historical area + line */}
        {pastPts.length > 1 && (
          <>
            <path
              d={`${pointsToPath(pastPts, "actual")} L${toX(pastPts[pastPts.length - 1].date).toFixed(1)},${pad.t + cH} L${toX(pastPts[0].date).toFixed(1)},${pad.t + cH} Z`}
              fill={statusColor} fillOpacity={0.08}
            />
            <path d={pointsToPath(pastPts, "actual")} fill="none" stroke={statusColor} strokeWidth="2" />
          </>
        )}

        {/* Today line */}
        <line x1={todayX} y1={pad.t} x2={todayX} y2={pad.t + cH} stroke="rgba(128,128,128,0.35)" strokeWidth="1" strokeDasharray="2,2" />

        {/* Today dot */}
        {pastPts[pastPts.length - 1] && (
          <circle cx={toX(pastPts[pastPts.length - 1].date)} cy={toY(pastPts[pastPts.length - 1].actual!)} r="5" fill={statusColor} />
        )}

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const val = maxVal * (1 - frac);
          const y = pad.t + cH * frac;
          return (
            <text key={frac} x={pad.l - 6} y={y + 4} textAnchor="end" fontSize={10} fill="rgba(128,128,128,0.8)">
              ${Math.round(val / 1000)}k
            </text>
          );
        })}

        {/* X-axis month labels */}
        {points.filter((_, i) => i % 2 === 0).map((p) => (
          <text key={p.date.toISOString()} x={toX(p.date)} y={pad.t + cH + 20} textAnchor="middle" fontSize={10} fill="rgba(128,128,128,0.8)">
            {p.date.toLocaleString("default", { month: "short" })}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 11, color: "rgb(var(--text-tertiary))" }}>
        {[
          { label: "Actual", style: { borderTop: `2px solid ${statusColor}`, width: 20 } },
          { label: "Forecast", style: { borderTop: `1.5px dashed ${statusColor}`, width: 20, opacity: 0.6 } },
          { label: "Planned", style: { borderTop: "1px dashed rgba(128,128,128,0.5)", width: 20 } },
          { label: "Budget ceiling", style: { borderTop: "1px dashed rgba(248,113,113,0.6)", width: 20 } },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={item.style as React.CSSProperties} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BurnTrajectoryPage() {
  return (
    <div>
      <PageHeader
        title="Burn / Budget Trajectory"
        description="A financial forecasting chart showing historical spend, projected burn rate, and budget ceiling. Reference implementation from Warren's BurnTrajectoryChart."
        badge="New"
      />

      <section>
        <h2>Demo</h2>
        <p>
          Historical spend (solid line), forecast (dashed), planned pace (dotted), and budget
          ceiling (red dashed). The today marker is the vertical dashed line.
        </p>
        <ComponentPreview>
          <div style={{ padding: 16 }}>
            <MiniChart />

            {/* Metric tiles */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 14 }}>
              {[
                { label: "Weekly Burn", value: "$4,200", highlight: true },
                { label: "Recent Daily", value: "$600" },
                { label: "Avg Daily", value: "$540" },
                { label: "Planned Daily", value: "$480" },
              ].map((m) => (
                <div key={m.label} style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  background: "rgb(var(--surface))",
                  border: `1px solid ${m.highlight ? "rgb(var(--status-warning))" : "rgb(var(--border))"}`,
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 3 }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Scenario cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 12 }}>
              {[
                { label: "Optimistic", sub: "−20% burn rate", exhaustion: "Mar 2027" },
                { label: "Current Pace", sub: "Steady burn rate", exhaustion: "Oct 2026", current: true },
                { label: "Pessimistic", sub: "+20% burn rate", exhaustion: "Jul 2026" },
              ].map((s) => (
                <div key={s.label} style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgb(var(--surface))",
                  border: `1px solid ${s.current ? "rgb(var(--accent))" : "rgb(var(--border))"}`,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginBottom: 8 }}>{s.sub}</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{s.exhaustion}</div>
                  <div style={{ fontSize: 10, color: "rgb(var(--text-tertiary))" }}>Est. exhaustion</div>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section>
        <h2>Line styles</h2>
        <table>
          <thead>
            <tr><th>Line</th><th>Weight</th><th>Dash</th><th>Colour</th></tr>
          </thead>
          <tbody>
            <tr><td>Historical</td><td>2 px</td><td>Solid</td><td>Status colour</td></tr>
            <tr><td>Forecast</td><td>1.5 px</td><td>[5, 3]</td><td>Status colour 55%</td></tr>
            <tr><td>Planned pace</td><td>1 px</td><td>[2, 3]</td><td>Gray 30%</td></tr>
            <tr><td>Budget ceiling</td><td>1 px</td><td>[3, 3]</td><td><code>--status-danger</code> 35%</td></tr>
            <tr><td>Today line</td><td>1 px</td><td>[2, 2]</td><td>Secondary 35%</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Markers and fills</h2>
        <table>
          <thead>
            <tr><th>Element</th><th>Spec</th></tr>
          </thead>
          <tbody>
            <tr><td>Today dot</td><td>6 px filled circle, status colour</td></tr>
            <tr><td>Exhaustion dot</td><td>6 px filled circle, <code>--status-danger</code></td></tr>
            <tr><td>Historical area</td><td>Status colour 7% fill</td></tr>
            <tr><td>Forecast area</td><td>Status colour 3% fill</td></tr>
            <tr><td>Highlighted metric tile</td><td>Status colour border</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Supporting panels</h2>
        <p>
          Below the chart, render two rows of supporting data:
        </p>
        <ol>
          <li><strong>KPI panel:</strong> two paired stat tiles — Exhaustion Date and Projected-at-End.</li>
          <li><strong>Burn rate metrics:</strong> 4-column row — Weekly burn, Recent daily, Avg daily, Planned daily. Highlight the most relevant tile with a status-colour border.</li>
          <li><strong>Scenario cards:</strong> 3-column layout — Optimistic (−20%), Current Pace, Pessimistic (+20%). Current pace tile has an accent border. Each shows estimated exhaustion date.</li>
        </ol>
      </section>

      <section>
        <h2>Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>
    </div>
  );
}
