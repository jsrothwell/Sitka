import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Gantt / Timeline" };

const CODE = {
  react: {
    filename: "GanttChart.tsx",
    code: `"use client";

import { useRef, useState } from "react";

// Zoom presets: pixels per day
const ZOOM = { year: 2.5, quarter: 5, month: 12 } as const;
type ZoomLevel = keyof typeof ZOOM;

interface GanttProject {
  id: string;
  name: string;
  start: Date;
  end: Date;
  colour: string;
  logged?: number;   // 0–1, logged hours fraction
  overdue?: boolean;
  assignments?: Array<{ name: string; start: Date; end: Date }>;
}

const LABEL_W = 228;

export function GanttChart({ projects }: { projects: GanttProject[] }) {
  const [zoom, setZoom] = useState<ZoomLevel>("quarter");
  const chartRef = useRef<HTMLDivElement>(null);

  const ppd = ZOOM[zoom];
  const today = new Date();
  const rangeStart = new Date(today.getFullYear(), 0, 1); // Jan 1 of current year
  const rangeEnd   = new Date(today.getFullYear(), 11, 31);
  const totalDays  = (rangeEnd.getTime() - rangeStart.getTime()) / 86_400_000;
  const chartWidth = totalDays * ppd;
  const todayX     = ((today.getTime() - rangeStart.getTime()) / 86_400_000) * ppd;

  function dateToX(date: Date) {
    return ((date.getTime() - rangeStart.getTime()) / 86_400_000) * ppd;
  }

  // Generate month headers
  const months: Array<{ label: string; x: number; width: number }> = [];
  for (let m = 0; m < 12; m++) {
    const ms = new Date(today.getFullYear(), m, 1);
    const me = new Date(today.getFullYear(), m + 1, 0);
    months.push({
      label: ms.toLocaleString("default", { month: "short" }),
      x: dateToX(ms),
      width: ((me.getTime() - ms.getTime()) / 86_400_000) * ppd,
    });
  }

  return (
    <div style={{ fontFamily: "inherit" }}>
      {/* Toolbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        padding: "0 4px",
      }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Timeline</span>
        <div style={{ display: "flex", gap: 2, padding: 3, borderRadius: 8, background: "rgb(var(--surface-raised))", border: "1px solid rgb(var(--border))" }}>
          {(["year", "quarter", "month"] as ZoomLevel[]).map((z) => (
            <button
              key={z}
              onClick={() => setZoom(z)}
              style={{
                padding: "4px 12px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                background: zoom === z ? "rgb(var(--accent))" : "transparent",
                color: zoom === z ? "#fff" : "rgb(var(--text-secondary))",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {z.charAt(0).toUpperCase() + z.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", overflow: "hidden", borderRadius: 12, border: "1px solid rgb(var(--border))" }}>
        {/* Label column */}
        <div style={{ width: LABEL_W, flexShrink: 0, borderRight: "1px solid rgb(var(--border))", background: "rgb(var(--surface))" }}>
          {/* Month header spacer */}
          <div style={{ height: 32, borderBottom: "1px solid rgb(var(--border))" }} />
          {/* Project labels */}
          {projects.map((proj) => (
            <div key={proj.id}>
              <div style={{
                height: 44,
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
                gap: 8,
                borderBottom: "1px solid rgb(var(--border-subtle))",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: proj.colour, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {proj.name}
                </span>
              </div>
              {proj.assignments?.map((a) => (
                <div key={a.name} style={{
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 14px 0 30px",
                  gap: 6,
                  borderBottom: "1px solid rgb(var(--border-subtle))",
                }}>
                  <span style={{ fontSize: 11, color: "rgb(var(--text-tertiary))" }}>{a.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Scrollable chart */}
        <div ref={chartRef} style={{ flex: 1, overflowX: "auto", position: "relative", background: "rgb(var(--canvas, var(--surface)))" }}>
          <div style={{ width: chartWidth, position: "relative" }}>
            {/* Month header row */}
            <div style={{ display: "flex", height: 32, borderBottom: "1px solid rgb(var(--border))", position: "sticky", top: 0, zIndex: 1, background: "rgb(var(--surface))" }}>
              {months.map((m, i) => (
                <div key={i} style={{
                  width: m.width,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: "rgb(var(--text-tertiary))",
                  borderRight: "1px solid rgb(var(--border-subtle))",
                }}>
                  {m.label}
                </div>
              ))}
            </div>

            {/* Alternating month fills */}
            <div style={{ position: "absolute", top: 32, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
              {months.map((m, i) => (
                i % 2 === 1 && (
                  <div key={i} style={{
                    position: "absolute",
                    left: m.x,
                    top: 0,
                    width: m.width,
                    bottom: 0,
                    background: "rgb(var(--surface-raised) / 0.5)",
                  }} />
                )
              ))}
            </div>

            {/* Today line */}
            <div style={{
              position: "absolute",
              left: todayX,
              top: 32,
              bottom: 0,
              width: 2,
              background: "rgb(var(--accent))",
              borderRadius: 1,
              pointerEvents: "none",
            }} />

            {/* Project rows */}
            {projects.map((proj) => {
              const x = dateToX(proj.start);
              const w = Math.max(dateToX(proj.end) - x, 4);
              return (
                <div key={proj.id}>
                  <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid rgb(var(--border-subtle))", position: "relative" }}>
                    {/* Project bar */}
                    <div style={{
                      position: "absolute",
                      left: x,
                      width: w,
                      height: 20,
                      borderRadius: 4,
                      background: proj.colour + "30",
                      border: proj.overdue ? \`1.5px solid \${proj.colour}\` : "none",
                      overflow: "hidden",
                    }}>
                      {/* Logged fill */}
                      <div style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: \`\${(proj.logged ?? 0.65) * 100}%\`,
                        background: proj.colour + "80",
                        borderRadius: "4px 0 0 4px",
                      }} />
                    </div>
                  </div>
                  {proj.assignments?.map((a) => {
                    const ax = dateToX(a.start);
                    const aw = Math.max(dateToX(a.end) - ax, 4);
                    return (
                      <div key={a.name} style={{ height: 36, display: "flex", alignItems: "center", borderBottom: "1px solid rgb(var(--border-subtle))", position: "relative" }}>
                        <div style={{
                          position: "absolute",
                          left: ax,
                          width: aw,
                          height: 14,
                          borderRadius: 3,
                          background: proj.colour + "45",
                        }} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}`,
  },
  html: {
    filename: "gantt.html",
    code: `<!-- Gantt chart is canvas/SVG-based for performance with large datasets.
     Use the React or Swift implementation for production use.
     HTML/CSS example shows only the structural shell. -->

<div class="gantt">
  <div class="gantt__toolbar">
    <span class="gantt__title">Timeline</span>
    <div class="gantt__zoom" role="group">
      <button class="gantt__zoom-btn">Year</button>
      <button class="gantt__zoom-btn gantt__zoom-btn--active">Quarter</button>
      <button class="gantt__zoom-btn">Month</button>
    </div>
  </div>

  <div class="gantt__body">
    <!-- Fixed label column (228px) -->
    <div class="gantt__labels">
      <div class="gantt__month-spacer"></div>
      <div class="gantt__label-row">
        <span class="gantt__dot" style="background:#3B82F6"></span>
        Project Alpha
      </div>
    </div>

    <!-- Scrollable chart area -->
    <div class="gantt__chart">
      <div class="gantt__month-header">
        <span style="width:250px">Jan</span>
        <span style="width:230px">Feb</span><!-- … -->
      </div>
      <!-- Today line -->
      <div class="gantt__today-line"></div>
      <!-- Project bars rendered absolutely -->
    </div>
  </div>
</div>

<style>
.gantt { font-size: 13px; }
.gantt__body { display: flex; border: 1px solid rgb(var(--border)); border-radius: 12px; overflow: hidden; }
.gantt__labels { width: 228px; flex-shrink: 0; border-right: 1px solid rgb(var(--border)); background: rgb(var(--surface)); }
.gantt__chart { flex: 1; overflow-x: auto; position: relative; }
.gantt__label-row { height: 44px; display: flex; align-items: center; padding: 0 14px; gap: 8px; border-bottom: 1px solid rgb(var(--border-subtle)); }
.gantt__today-line { position: absolute; top: 0; bottom: 0; width: 2px; background: rgb(var(--accent)); }
</style>`,
  },
  swift: {
    filename: "GanttView.swift",
    code: `import SwiftUI

// Mirrors Warren's GanttView
// Uses Canvas for high-performance rendering of 100s of bars

struct GanttView: View {
    @State private var zoom: ZoomLevel = .quarter
    let projects: [GanttProject]

    let labelWidth: CGFloat = 228

    var body: some View {
        VStack(spacing: 0) {
            toolbar
            content
        }
    }

    private var toolbar: some View {
        HStack {
            Text("Timeline").font(.system(size: 13, weight: .semibold))
            Spacer()
            Picker("Zoom", selection: $zoom) {
                ForEach(ZoomLevel.allCases) { level in
                    Text(level.label).tag(level)
                }
            }
            .pickerStyle(.segmented)
            .fixedSize()
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
    }

    private var content: some View {
        HStack(spacing: 0) {
            // Label column — scrolls vertically, sticky on horizontal scroll
            ScrollView(.vertical) {
                VStack(spacing: 0) {
                    Color.clear.frame(height: 32) // month header spacer
                    ForEach(projects) { proj in
                        labelRow(proj)
                    }
                }
            }
            .frame(width: labelWidth)
            .background(Color.sfSurface)
            .overlay(alignment: .trailing) {
                Divider()
            }

            // Chart area — scrolls horizontally
            ScrollView(.horizontal) {
                Canvas { ctx, size in
                    drawGrid(ctx: ctx, size: size)
                    drawTodayLine(ctx: ctx, size: size)
                    drawProjectBars(ctx: ctx, size: size)
                }
                .frame(width: chartWidth, height: chartHeight)
            }
        }
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay {
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.sfBorder, lineWidth: 1)
        }
    }

    private func drawProjectBars(ctx: GraphicsContext, size: CGSize) {
        for (i, proj) in projects.enumerated() {
            let x = dateToX(proj.start)
            let w = max(dateToX(proj.end) - x, 4)
            let y = CGFloat(32 + i * 44) + 12

            // Track
            let bar = CGRect(x: x, y: y, width: w, height: 20)
            ctx.fill(
                Path(roundedRect: bar, cornerRadius: 4),
                with: .color(proj.colour.opacity(0.18))
            )

            // Logged fill
            let filled = CGRect(x: x, y: y, width: w * (proj.logged ?? 0.65), height: 20)
            ctx.fill(
                Path(roundedRect: filled, cornerRadius: 4),
                with: .color(proj.colour.opacity(0.65))
            )

            // Overdue stroke
            if proj.overdue {
                ctx.stroke(
                    Path(roundedRect: bar, cornerRadius: 4),
                    with: .color(proj.colour),
                    lineWidth: 1.5
                )
            }
        }
    }
}

enum ZoomLevel: String, CaseIterable, Identifiable {
    case year, quarter, month
    var id: String { rawValue }
    var label: String { rawValue.capitalized }
    var pixelsPerDay: CGFloat {
        switch self { case .year: return 2.5; case .quarter: return 5; case .month: return 12 }
    }
}`,
  },
  macos: {
    filename: "GanttView.swift",
    code: `// macOS — same GanttView, add NSScrollView sync for label+chart
// vertical scrolling so both columns move together.

// Warren implements this by wrapping both in a shared NSScrollView
// with one scroll view tracking the other via NotificationCenter.

extension GanttView {
    // Milestone diamond overlay
    func milestoneShape(at date: Date, colour: Color) -> some View {
        let x = dateToX(date)
        return Rectangle()
            .fill(colour)
            .frame(width: 10, height: 10)
            .rotationEffect(.degrees(45))
            .position(x: x, y: milestoneY)
    }

    // Dependency arrow (orthogonal elbow)
    func dependencyArrow(from: CGPoint, to: CGPoint, isAtRisk: Bool) -> Path {
        var p = Path()
        p.move(to: from)
        p.addLine(to: CGPoint(x: to.x, y: from.y))
        p.addLine(to: to)
        return p
        // Stroke with dash [5,3] if isAtRisk, red colour
    }
}`,
  },
};

export default function GanttPage() {
  const today = new Date();
  const year = today.getFullYear();

  const PROJECTS = [
    { id: "alpha", name: "Design System Audit", colour: "#3B82F6", start: new Date(year, 0, 15), end: new Date(year, 3, 30), logged: 0.72, assignments: [{ name: "J. Rothwell", start: new Date(year, 0, 15), end: new Date(year, 2, 15) }] },
    { id: "beta",  name: "Component Library v2", colour: "#10B981", start: new Date(year, 1, 1),  end: new Date(year, 6, 31), logged: 0.45 },
    { id: "gamma", name: "iOS App Redesign", colour: "#F59E0B", start: new Date(year, 3, 1), end: new Date(year, 8, 30), logged: 0.3, overdue: false },
    { id: "delta", name: "Warren Integration", colour: "#8B5CF6", start: new Date(year, 5, 1), end: new Date(year, 10, 15), logged: 0.1 },
  ];

  const ppd = 5; // quarter zoom
  const rangeStart = new Date(year, 0, 1);
  const MONTHS = Array.from({ length: 12 }, (_, m) => {
    const ms = new Date(year, m, 1);
    const me = new Date(year, m + 1, 0);
    const daysDiff = (ms.getTime() - rangeStart.getTime()) / 86_400_000;
    const daysWidth = (me.getTime() - ms.getTime()) / 86_400_000;
    return {
      label: ms.toLocaleString("default", { month: "short" }),
      x: daysDiff * ppd,
      width: daysWidth * ppd,
    };
  });

  const totalDays = (new Date(year, 11, 31).getTime() - rangeStart.getTime()) / 86_400_000;
  const chartWidth = totalDays * ppd;
  const todayX = ((today.getTime() - rangeStart.getTime()) / 86_400_000) * ppd;
  const LABEL_W = 200;

  function dateToX(d: Date) {
    return ((d.getTime() - rangeStart.getTime()) / 86_400_000) * ppd;
  }

  const rowHeight = 44;
  const headerH = 32;

  return (
    <div>
      <PageHeader
        title="Gantt / Timeline"
        description="A horizontal timeline chart for visualising project schedules, milestones, and resource assignments across time. Reference implementation from Warren."
        badge="New"
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Demo</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed">Quarter zoom (5 px/day). Scroll horizontally to explore the full year.</p>
        <ComponentPreview>
          <div style={{ fontSize: 13 }}>
            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: "0 4px" }}>
              <span style={{ fontWeight: 600 }}>Timeline — {year}</span>
              <div style={{ display: "flex", gap: 2, padding: 3, borderRadius: 8, background: "rgb(var(--surface-raised))", border: "1px solid rgb(var(--border))" }}>
                {["Year", "Quarter", "Month"].map((z) => (
                  <span key={z} style={{
                    padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                    background: z === "Quarter" ? "rgb(var(--accent))" : "transparent",
                    color: z === "Quarter" ? "#fff" : "rgb(var(--text-secondary))",
                  }}>{z}</span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", borderRadius: 12, border: "1px solid rgb(var(--border))", overflow: "hidden" }}>
              {/* Label column */}
              <div style={{ width: LABEL_W, flexShrink: 0, borderRight: "1px solid rgb(var(--border))", background: "rgb(var(--surface))" }}>
                <div style={{ height: headerH, borderBottom: "1px solid rgb(var(--border))" }} />
                {PROJECTS.map((p) => (
                  <div key={p.id} style={{ height: rowHeight, display: "flex", alignItems: "center", padding: "0 14px", gap: 8, borderBottom: "1px solid rgb(var(--border-subtle))" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.colour, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div style={{ flex: 1, overflowX: "auto" }}>
                <div style={{ width: chartWidth, position: "relative" }}>
                  {/* Month header */}
                  <div style={{ display: "flex", height: headerH, borderBottom: "1px solid rgb(var(--border))", background: "rgb(var(--surface))", position: "sticky", top: 0 }}>
                    {MONTHS.map((m, i) => (
                      <div key={i} style={{ width: m.width, flexShrink: 0, display: "flex", alignItems: "center", paddingLeft: 6, fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", color: "rgb(var(--text-tertiary))", borderRight: "1px solid rgb(var(--border-subtle))", textTransform: "uppercase" }}>
                        {m.label}
                      </div>
                    ))}
                  </div>

                  {/* Alternating fills */}
                  {MONTHS.map((m, i) => i % 2 === 1 && (
                    <div key={i} style={{ position: "absolute", left: m.x, top: headerH, width: m.width, bottom: 0, background: "rgb(var(--surface-raised) / 0.4)", pointerEvents: "none" }} />
                  ))}

                  {/* Today line */}
                  <div style={{ position: "absolute", left: todayX, top: headerH, bottom: 0, width: 2, background: "rgb(var(--accent))", borderRadius: 1, pointerEvents: "none" }} />

                  {/* Project rows */}
                  {PROJECTS.map((p, i) => {
                    const x = dateToX(p.start);
                    const w = Math.max(dateToX(p.end) - x, 8);
                    const y = headerH + i * rowHeight;
                    return (
                      <div key={p.id} style={{ position: "absolute", top: y, left: 0, right: 0, height: rowHeight, borderBottom: "1px solid rgb(var(--border-subtle))" }}>
                        {/* Track */}
                        <div style={{ position: "absolute", left: x, top: 12, width: w, height: 20, borderRadius: 4, background: p.colour + "28", overflow: "hidden" }}>
                          {/* Fill */}
                          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${p.logged * 100}%`, background: p.colour + "80", borderRadius: "4px 0 0 4px" }} />
                        </div>
                      </div>
                    );
                  })}

                  {/* Spacer to set height */}
                  <div style={{ height: headerH + PROJECTS.length * rowHeight }} />
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="mb-10 mt-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Layout spec</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Element</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Spec</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Label column</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">228 px fixed, sticky on horizontal scroll, <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--surface</code> background</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Month header</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">32 px, sticky top, 10–11 px semibold uppercase, <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--text-tertiary</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Zoom levels</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Year = 2.5 px/day, Quarter = 5 px/day, Month = 12 px/day</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Grid fills</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Alternating <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--surface</code> / <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--surface-raised/0.4</code> month strips</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Month dividers</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">0.5 px <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--border-subtle</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Project bar</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">20 px tall, 4 px radius; track at 18% opacity, logged fill at 65%</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Assignment sub-row</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">36 px row, 14 px tall pill at 45% opacity, 16 px left indent</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Today line</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">2 px solid <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--accent</code> capsule</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Milestone</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">10×10 diamond (45° rotated rect), colour-coded, tappable</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Dependency arrow</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Orthogonal elbow path, dashed [5,3], red at <code className="font-mono text-[11px] text-[rgb(var(--accent))]">isAtRisk: true</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>
    </div>
  );
}
