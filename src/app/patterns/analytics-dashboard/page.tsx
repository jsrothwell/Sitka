"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { TrendingUp, TrendingDown, Users, BarChart3, Clock, Target } from "lucide-react";

const CODE = {
  react: {
    filename: "AnalyticsDashboard.tsx",
    code: `"use client";

import { useState } from "react";

type TimeRange = "7d" | "30d" | "90d" | "all";

interface KPIData {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: React.ReactNode;
}

export function AnalyticsDashboard() {
  const [range, setRange] = useState<TimeRange>("30d");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Sticky header */}
      <div style={{
        position: "sticky",
        top: 0,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "rgb(var(--background))",
        borderBottom: "1px solid rgb(var(--border))",
        zIndex: 10,
      }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Analytics</h1>
        <TimeRangePicker value={range} onChange={setRange} />
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <KPITile label="Total Applications" value="1,284" delta="+12%" trend="up" />
          <KPITile label="Interview Rate" value="34%" delta="+3%" trend="up" />
          <KPITile label="Avg. Response Time" value="8.2d" delta="-1.4d" trend="up" />
          <KPITile label="Active Pipelines" value="6" delta="+2" trend="up" />
        </div>

        {/* Primary chart zone */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 12 }}>
          <ChartTile title="Applications Over Time">
            {/* Chart content */}
          </ChartTile>
          <ChartTile title="Stage Breakdown">
            {/* Donut / breakdown */}
          </ChartTile>
        </div>
      </div>
    </div>
  );
}

function TimeRangePicker({ value, onChange }: { value: TimeRange; onChange: (v: TimeRange) => void }) {
  const options: [TimeRange, string][] = [["7d","7 Days"],["30d","30 Days"],["90d","90 Days"],["all","All Time"]];
  return (
    <div style={{ display: "flex", gap: 2, padding: 3, borderRadius: 8, background: "rgb(var(--surface-raised))", border: "1px solid rgb(var(--border))" }}>
      {options.map(([key, label]) => (
        <button key={key} onClick={() => onChange(key)} style={{
          padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500,
          border: "none", cursor: "pointer",
          background: value === key ? "rgb(var(--accent))" : "transparent",
          color: value === key ? "#fff" : "rgb(var(--text-secondary))",
          transition: "background 0.15s",
        }}>{label}</button>
      ))}
    </div>
  );
}`,
  },
  html: {
    filename: "analytics-dashboard.html",
    code: `<div class="analytics-dashboard">
  <!-- Sticky header: 56px -->
  <header class="analytics-header">
    <h1 class="analytics-header__title">Analytics</h1>
    <!-- Time range picker (Segmented Button) -->
    <div class="segmented" role="group">
      <button class="segmented__btn">7 Days</button>
      <button class="segmented__btn segmented__btn--active">30 Days</button>
      <button class="segmented__btn">90 Days</button>
      <button class="segmented__btn">All Time</button>
    </div>
  </header>

  <div class="analytics-body">
    <!-- KPI row: 4 equal tiles -->
    <section class="kpi-row">
      <div class="kpi-tile"><!-- … --></div>
      <div class="kpi-tile"><!-- … --></div>
      <div class="kpi-tile"><!-- … --></div>
      <div class="kpi-tile"><!-- … --></div>
    </section>

    <!-- Primary chart zone: 1fr + 300px companion -->
    <section class="chart-zone">
      <div class="chart-tile chart-tile--primary"><!-- main chart --></div>
      <div class="chart-tile chart-tile--companion"><!-- donut or breakdown list --></div>
    </section>

    <!-- Full-width section -->
    <section class="full-width-section">
      <!-- utilization grid or table -->
    </section>
  </div>
</div>

<style>
.analytics-header {
  position: sticky;
  top: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: rgb(var(--background));
  border-bottom: 1px solid rgb(var(--border));
  z-index: 10;
}
.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
@media (max-width: 768px) {
  .kpi-row { grid-template-columns: repeat(2, 1fr); }
}
.chart-zone {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 12px;
}
</style>`,
  },
  swift: {
    filename: "AnalyticsDashboard.swift",
    code: `import SwiftUI

// Mirrors Warren's InsightsView and JobFlo's AnalyticsView

enum TimeRange: String, CaseIterable, Identifiable {
    case sevenDays = "7d"
    case thirtyDays = "30d"
    case ninetyDays = "90d"
    case allTime = "all"

    var id: String { rawValue }
    var label: String {
        switch self {
        case .sevenDays: "7 Days"
        case .thirtyDays: "30 Days"
        case .ninetyDays: "90 Days"
        case .allTime: "All Time"
        }
    }
}

struct AnalyticsDashboard: View {
    @State private var range: TimeRange = .thirtyDays

    var body: some View {
        ScrollView {
            LazyVStack(spacing: 20, pinnedViews: [.sectionHeaders]) {
                Section {
                    VStack(spacing: 20) {
                        kpiRow
                        chartZone
                        utilizationGrid
                    }
                    .padding(.horizontal, 20)
                    .padding(.bottom, 20)
                } header: {
                    stickyHeader
                }
            }
        }
        .background(Color.sfBackground)
    }

    private var stickyHeader: some View {
        HStack {
            Text("Analytics")
                .font(.system(size: 16, weight: .bold))
            Spacer()
            Picker("Range", selection: $range) {
                ForEach(TimeRange.allCases) { r in
                    Text(r.label).tag(r)
                }
            }
            .pickerStyle(.segmented)
            .fixedSize()
        }
        .padding(.horizontal, 20)
        .frame(height: 56)
        .background(.regularMaterial)
        .overlay(alignment: .bottom) { Divider() }
    }

    private var kpiRow: some View {
        // Responsive: HStack on iPad/Mac, 2-col grid on iPhone
        AdaptiveGrid(minWidth: 160) {
            KPITile(icon: Image(systemName: "doc.text"),
                    value: "1,284", label: "Applications",
                    delta: "+12%", trend: .up)
            KPITile(icon: Image(systemName: "calendar"),
                    value: "34%", label: "Interview Rate",
                    delta: "+3%", trend: .up)
            KPITile(icon: Image(systemName: "clock"),
                    value: "8.2d", label: "Avg Response",
                    delta: "-1.4d", trend: .up)
            KPITile(icon: Image(systemName: "chart.bar"),
                    value: "6", label: "Active Pipelines",
                    delta: "+2", trend: .up)
        }
    }

    private var chartZone: some View {
        HStack(alignment: .top, spacing: 12) {
            ApplicationsChart()
                .frame(maxWidth: .infinity)
            StageBreakdown()
                .frame(width: 300)
        }
    }
}`,
  },
  macos: {
    filename: "AnalyticsDashboard.swift",
    code: `// macOS — uses NavigationSplitView sidebar layout.
// Analytics view sits in the detail column with full-width charts.
// Warren's InsightsView is the primary reference.

struct AnalyticsDetailView: View {
    @State private var range: TimeRange = .thirtyDays

    var body: some View {
        VStack(spacing: 0) {
            toolbar
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Section labels: 11px semibold, tracking 0.8, tertiary colour
                    sectionLabel("Overview")
                    kpiRow
                    sectionLabel("Performance")
                    chartZone
                    sectionLabel("Utilization")
                    utilizationGrid
                }
                .padding(24)
            }
        }
    }

    private func sectionLabel(_ title: String) -> some View {
        Text(title)
            .font(.system(size: 11, weight: .semibold))
            .kerning(0.8)
            .foregroundStyle(.sfTextTertiary)
            .textCase(.uppercase)
    }
}`,
  },
};

function KPITile({ label, value, delta, trend, icon, color }: {
  label: string; value: string; delta?: string; trend?: "up" | "down"; icon: React.ReactNode; color: string;
}) {
  const trendColor = trend === "up" ? "rgb(var(--status-success))" : "rgb(var(--status-danger))";
  return (
    <div style={{
      padding: 16,
      borderRadius: 12,
      background: "rgb(var(--surface))",
      border: "1px solid rgb(var(--border))",
      boxShadow: "var(--shadow-card)",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: color + "20",
          display: "flex", alignItems: "center", justifyContent: "center",
          color,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}>{icon}</div>
        {delta && (
          <span style={{ fontSize: 11, fontWeight: 600, color: trendColor, background: trendColor.replace(")", " / 0.12)").replace("rgb(", "rgba("), padding: "2px 7px", borderRadius: 99 }}>
            {delta}
          </span>
        )}
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>{value}</div>
        <div style={{ fontSize: 12, color: "rgb(var(--text-tertiary))", marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgb(var(--text-tertiary))", margin: 0 }}>
      {children}
    </p>
  );
}

const STAGES = [
  { label: "Applied", count: 1284, color: "#6366F1" },
  { label: "Screening", count: 438, color: "#3B82F6" },
  { label: "Interview", count: 182, color: "#F59E0B" },
  { label: "Offer", count: 34, color: "#10B981" },
  { label: "Hired", count: 12, color: "#10B981" },
];

export default function AnalyticsDashboardPage() {
  const [range, setRange] = useState("30d" as const);

  const maxCount = Math.max(...STAGES.map((s) => s.count));

  return (
    <div>
      <PageHeader
        title="Analytics Dashboard"
        description="A pattern for composing KPI tiles, charts, and tables into a cohesive analytics screen with a sticky time-range header. Mirrors Warren's InsightsView and JobFlo's AnalyticsView."
        badge="New"
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Demo</h2>
        <ComponentPreview>
          <div style={{ fontFamily: "inherit", display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Sticky-style header */}
            <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: "1px solid rgb(var(--border))", marginBottom: 20 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Analytics</span>
              <div style={{ display: "flex", gap: 2, padding: 3, borderRadius: 8, background: "rgb(var(--surface-raised))", border: "1px solid rgb(var(--border))" }}>
                {["7 Days", "30 Days", "90 Days", "All Time"].map((label) => (
                  <span key={label} style={{
                    padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                    background: label === "30 Days" ? "rgb(var(--accent))" : "transparent",
                    color: label === "30 Days" ? "#fff" : "rgb(var(--text-secondary))",
                  }}>{label}</span>
                ))}
              </div>
            </div>

            <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
              <SectionLabel>Overview</SectionLabel>

              {/* KPI row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                <KPITile label="Applications" value="1,284" delta="+12%" trend="up" icon={<BarChart3 size={16} />} color="#6366F1" />
                <KPITile label="Interview Rate" value="34%" delta="+3%" trend="up" icon={<Users size={16} />} color="#3B82F6" />
                <KPITile label="Avg Response" value="8.2d" delta="-1.4d" trend="up" icon={<Clock size={16} />} color="#F59E0B" />
                <KPITile label="Active Pipelines" value="6" delta="+2" trend="up" icon={<Target size={16} />} color="#10B981" />
              </div>

              <SectionLabel>Stage Funnel</SectionLabel>

              {/* Stage funnel */}
              <div style={{ padding: 16, borderRadius: 12, background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", gap: 10 }}>
                {STAGES.map((stage) => (
                  <div key={stage.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 80, fontSize: 12, color: "rgb(var(--text-secondary))", textAlign: "right", flexShrink: 0 }}>{stage.label}</span>
                    <div style={{ flex: 1, height: 20, borderRadius: 4, background: "rgb(var(--surface-raised))", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(stage.count / maxCount) * 100}%`, background: stage.color, borderRadius: 4, transition: "width 0.4s" }} />
                    </div>
                    <span style={{ width: 50, fontSize: 12, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{stage.count.toLocaleString()}</span>
                  </div>
                ))}
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
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Zone</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Spec</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Sticky header</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">56 px, view title + time-range Segmented Button, <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--background</code> backing, bottom divider</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">KPI row</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Equal-width tiles in HStack, gap <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--spacing-lg</code>; collapses to 2-col on narrow</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Primary chart zone</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">1fr flexible chart + 300 px companion (donut or breakdown list)</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Section headers</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">11 px semibold, letter-spacing 0.8, <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--text-tertiary</code>, uppercase — matches <code className="font-mono text-[11px] text-[rgb(var(--accent))]">label-mono</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Empty states</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Inline <code className="font-mono text-[11px] text-[rgb(var(--accent))]">EmptyState</code> per chart tile; never full-page replacement</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Dashboard background</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--background</code>, not <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--surface</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Time range picker</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
          Use the <a href="/components/segmented-button" className="text-[rgb(var(--accent))] hover:underline">Segmented Button</a> locked to these options:
          <strong> 7 Days / 30 Days / 90 Days / All Time</strong>. Place it in the sticky header row,
          right-aligned. The picker drives all chart and KPI data on the same screen.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>
    </div>
  );
}

