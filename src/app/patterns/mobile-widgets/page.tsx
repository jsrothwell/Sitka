import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Mobile Widgets" };

// ── Inline widget mockup helpers ─────────────────────────────────────────────

function WidgetShell({
  size,
  children,
  label,
}: {
  size: "small" | "medium" | "large";
  children: React.ReactNode;
  label: string;
}) {
  const dims: Record<string, { w: number; h: number }> = {
    small:  { w: 158, h: 158 },
    medium: { w: 338, h: 158 },
    large:  { w: 338, h: 338 },
  };
  const { w, h } = dims[size];
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        style={{
          width: w,
          height: h,
          borderRadius: 22,
          background: "#1c1c1e",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
      <span className="text-[11px] text-[rgb(var(--text-tertiary))] font-mono">{label}</span>
    </div>
  );
}

function MetricWidget() {
  return (
    <WidgetShell size="small" label="systemSmall · 158×158pt">
      <div style={{ padding: 16, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#34a865", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="white" strokeWidth="1.75" strokeLinecap="round"/></svg>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgb(var(--text-tertiary))", letterSpacing: "0.02em" }}>ACTIVITY</span>
        </div>
        <div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1 }}>8,432</div>
          <div style={{ fontSize: 13, color: "rgb(var(--text-tertiary))", marginTop: 4 }}>steps today</div>
          <div style={{ marginTop: 10, height: 3, borderRadius: 2, background: "#3a3a3c" }}>
            <div style={{ width: "68%", height: "100%", borderRadius: 2, background: "#34a865" }} />
          </div>
          <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 4 }}>68% of goal</div>
        </div>
      </div>
    </WidgetShell>
  );
}

function StatusWidget() {
  return (
    <WidgetShell size="medium" label="systemMedium · 338×158pt">
      <div style={{ padding: 16, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#ffffff" }}>Project Status</span>
          <span style={{ fontSize: 11, color: "rgb(var(--text-tertiary))" }}>Updated now</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { label: "Open", value: "12", color: "#60a5fa" },
            { label: "In Review", value: "5",  color: "#f59e0b" },
            { label: "Done",  value: "34", color: "#34a865" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "#2c2c2e", borderRadius: 12, padding: "10px 12px" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color, letterSpacing: "-0.02em" }}>{value}</div>
              <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 6, borderRadius: 3, background: "#3a3a3c", display: "flex", gap: 2, overflow: "hidden" }}>
          <div style={{ width: "23.5%", background: "#60a5fa" }} />
          <div style={{ width: "9.8%",  background: "#f59e0b" }} />
          <div style={{ width: "66.7%", background: "#34a865" }} />
        </div>
      </div>
    </WidgetShell>
  );
}

function CalendarWidget() {
  const days = ["M","T","W","T","F","S","S"];
  const dates = [28,29,30,1,2,3,4];
  const today = 3;
  const events = [
    { time: "09:00", title: "Design review", color: "#60a5fa" },
    { time: "14:30", title: "Sprint planning", color: "#34a865" },
    { time: "16:00", title: "1:1 with Jamie",  color: "#f59e0b" },
  ];
  return (
    <WidgetShell size="large" label="systemLarge · 338×338pt">
      <div style={{ padding: 16, height: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#ffffff" }}>Today</span>
          <span style={{ fontSize: 11, color: "rgb(var(--text-tertiary))" }}>Tuesday, 1 Apr</span>
        </div>

        {/* Mini calendar strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {days.map((d, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 10, color: "#636366", fontWeight: 500 }}>{d}</span>
              <div style={{
                width: 26, height: 26, borderRadius: 13,
                background: dates[i] === today ? "#34a865" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontSize: 13, fontWeight: dates[i] === today ? 700 : 400,
                  color: dates[i] === today ? "#ffffff" : dates[i] < today ? "#636366" : "#ffffff",
                }}>{dates[i]}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: "#3a3a3c" }} />

        {/* Events */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          {events.map(({ time, title, color }) => (
            <div key={title} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 3, height: 36, borderRadius: 2, background: color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#ffffff" }}>{title}</div>
                <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 1 }}>{time}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: "8px 10px", background: "#2c2c2e", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "rgb(var(--text-tertiary))" }}>Next: Stand-up</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#34a865" }}>in 47m</span>
        </div>
      </div>
    </WidgetShell>
  );
}

function ProgressWidget() {
  return (
    <WidgetShell size="small" label="Circular progress">
      <div style={{ padding: 14, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "rgb(var(--text-tertiary))", letterSpacing: "0.02em" }}>FOCUS</span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="30" fill="none" stroke="#3a3a3c" strokeWidth="6" />
            <circle
              cx="36" cy="36" r="30"
              fill="none" stroke="#34a865" strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 30}`}
              strokeDashoffset={`${2 * Math.PI * 30 * (1 - 0.72)}`}
              strokeLinecap="round"
              transform="rotate(-90 36 36)"
            />
            <text x="36" y="40" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700">72%</text>
          </svg>
        </div>
        <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))" }}>22m remaining</div>
      </div>
    </WidgetShell>
  );
}

function QuickActionWidget() {
  return (
    <WidgetShell size="medium" label="Quick actions">
      <div style={{ padding: 16, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#ffffff" }}>Quick Actions</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { label: "New Task",  icon: "＋", color: "#34a865" },
            { label: "Log Time",  icon: "◷", color: "#60a5fa" },
            { label: "Check In",  icon: "✓",  color: "#f59e0b" },
            { label: "Report",    icon: "↗",  color: "#c084fc" },
          ].map(({ label, icon, color }) => (
            <div key={label} style={{
              background: "#2c2c2e", borderRadius: 10,
              padding: "10px 12px", display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: 16, color }}>{icon}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#ffffff" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const SIZES = [
  {
    name: "Small",
    api: "systemSmall",
    pts: "158 × 158pt",
    pixels: "~320 × 320px @2x",
    use: "Single metric, countdown, status indicator, progress ring",
    avoid: "Tables, lists, dense information — space is too tight",
  },
  {
    name: "Medium",
    api: "systemMedium",
    pts: "338 × 158pt",
    pixels: "~676 × 316px @2x",
    use: "2–3 metrics side-by-side, a short list (3–4 rows), quick action grid",
    avoid: "Long text, scrolling content (not supported), more than 4 actions",
  },
  {
    name: "Large",
    api: "systemLarge",
    pts: "338 × 338pt",
    pixels: "~676 × 676px @2x",
    use: "Calendar view, detailed list (5–6 rows), multi-section layout",
    avoid: "Scrollable lists, deeply nested information, complex forms",
  },
  {
    name: "Extra Large",
    api: "systemExtraLarge",
    pts: "715 × 338pt",
    pixels: "~1430 × 676px @2x",
    use: "iPad only: two-column layouts, rich data dashboards",
    avoid: "Phone apps — this size is iPad-exclusive",
  },
];

const PRINCIPLES = [
  {
    label: "Glanceable in 2 seconds",
    body: "A widget competes with the clock and notification badges for attention. If your most important value takes more than two seconds to read, the widget is too dense.",
  },
  {
    label: "One job per widget",
    body: "Pick the single piece of information your user checks most often. If you find yourself needing to show three unrelated things, ship three separate widgets and let the user pick.",
  },
  {
    label: "Design for stale data",
    body: "Widgets are not live — they reflect a snapshot. Always show a timestamp or relative label (\"Updated 4m ago\") so the user knows how fresh the data is.",
  },
];

const LAYOUT_RULES = [
  { zone: "Header", guidance: "App icon (28×28pt, cornerRadius 8) + short app name or widget title. Keep to one line, 15px semibold max." },
  { zone: "Primary value", guidance: "The number or status the user came to see. Use the largest legible font size (24–36px for a Small, larger for Medium/Large)." },
  { zone: "Supporting context", guidance: "A single line of secondary text — unit, trend indicator, or timestamp. 11–13px, text-tertiary color." },
  { zone: "Safe inset", guidance: "Maintain 16pt padding from all edges. WidgetKit enforces this automatically via containerBackground — avoid custom padding overrides." },
  { zone: "Background", guidance: "Use .containerBackground(for: .widget) in SwiftUI — it handles vibrancy, dark/light, and StandBy mode automatically." },
];

const REFRESH_RULES = [
  { scenario: "User opens the app", guidance: "Call WidgetCenter.shared.reloadTimelines(ofKind:). Always refresh after any data mutation." },
  { scenario: "Background fetch", guidance: "Return a TimelineEntry array from getTimeline(). The system decides when to execute; request a nextReloadDate no more often than every 15 minutes." },
  { scenario: "Time-sensitive data", guidance: "Use TimelinEntry.relevance to signal urgency. High-relevance entries are shown on the Smart Stack's top position." },
  { scenario: "Network failure", guidance: "Always return at least one placeholder entry with the last-known data. Never show an empty or broken state — it erodes trust." },
  { scenario: "Background app refresh off", guidance: "The widget will not update. Show a subtle \"Tap to refresh\" deep link so the user can still get current data by tapping through." },
];

export default function MobileWidgetsPage() {
  return (
    <div>
      <PageHeader
        title="Mobile Widgets"
        description="Home screen and lock screen widgets surface a single, glanceable piece of information without opening the app. Four sizes, strict layout constraints, and a timeline-based data model distinguish them from every other UI surface."
      />

      {/* ── Size system ──────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sizes</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          WidgetKit defines four canonical sizes. Offer all sizes that make sense for your content — users choose based on how much home screen space they want to trade. Every widget must support at least systemSmall.
        </p>

        {/* Visual gallery */}
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 mb-6 flex flex-wrap gap-6 items-end justify-center">
          <MetricWidget />
          <StatusWidget />
        </div>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 mb-6 flex justify-center">
          <CalendarWidget />
        </div>

        {/* Reference table */}
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Size", "API constant", "Points", "Best for", "Avoid"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZES.map((s, i) => (
                <tr key={s.name} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{s.name}</td>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{s.api}</code></td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))] whitespace-nowrap">{s.pts}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{s.use}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{s.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Content types ────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Content types</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Most widgets fall into one of four patterns. Match the pattern to your data before designing the layout.
        </p>

        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex flex-wrap gap-6 items-center justify-center mb-6">
          <ProgressWidget />
          <QuickActionWidget />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              type: "Metric",
              size: "Small",
              desc: "One primary number with unit and a simple progress bar or delta indicator. The number should read instantly — don't make the user calculate.",
              example: "8,432 steps · 68% of goal",
            },
            {
              type: "Status grid",
              size: "Medium",
              desc: "2–4 named values arranged in a grid. Useful for dashboards where multiple counts need comparison at a glance.",
              example: "Open / In Review / Done issue counts",
            },
            {
              type: "Progress ring",
              size: "Small",
              desc: "A circular arc represents completion percentage. More expressive than a bar for goal-based data — the circular shape immediately signals a bounded task.",
              example: "72% Focus session complete",
            },
            {
              type: "Quick actions",
              size: "Medium",
              desc: "A grid of tappable deep links into specific app actions. Each cell is a Link targeting a specific URL scheme. Limit to 4 actions — more creates choice paralysis.",
              example: "New Task / Log Time / Check In / Report",
            },
            {
              type: "Chronological list",
              size: "Large",
              desc: "3–6 time-ordered items (events, tasks, notifications). Show time, title, and a single-color accent. Truncate long titles to one line.",
              example: "Today's calendar events",
            },
            {
              type: "Summary + countdown",
              size: "Small / Medium",
              desc: "A primary value plus relative time string (\"in 47m\", \"2 days left\"). Best when the user's key question is 'when'. Update the timeline entry at each transition.",
              example: "Next meeting in 47 minutes",
            },
          ].map(({ type, size, desc, example }) => (
            <div key={type} className="rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{type}</span>
                <span className="text-[10px] font-mono font-semibold text-[rgb(var(--accent))] bg-[rgb(var(--accent)/0.1)] px-2 py-0.5 rounded-full">{size}</span>
              </div>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed mb-2">{desc}</p>
              <p className="text-[11px] text-[rgb(var(--text-tertiary))] italic">{example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Layout rules ─────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Layout zones</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Every widget size shares the same four-zone anatomy. Arrange content top-to-bottom in this order so users build a consistent mental model across all your widgets.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Zone", "Content guidance"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LAYOUT_RULES.map((r, i) => (
                <tr key={r.zone} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap align-top pt-3.5">{r.zone}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{r.guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Timeline and refresh ─────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Timeline and refresh</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Widgets are not real-time views. They render a snapshot from a <code className="font-mono text-[13px] text-[rgb(var(--accent))]">TimelineEntry</code> the system provided, possibly minutes ago. Design for this model — never assume the widget reflects the current moment.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-6">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Trigger", "How to handle"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REFRESH_RULES.map((r, i) => (
                <tr key={r.scenario} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap align-top pt-3.5">{r.scenario}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{r.guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Code snippet */}
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
            <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">TimelineProvider.swift</span>
          </div>
          <pre className="p-5 text-[12px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`struct ProjectStatusProvider: TimelineProvider {

    func getTimeline(
        in context: Context,
        completion: @escaping (Timeline<ProjectEntry>) -> Void
    ) {
        Task {
            // Fetch fresh data from your service
            let status = try? await ProjectService.fetchStatus()

            let entry = ProjectEntry(
                date: .now,
                status: status ?? .placeholder
            )

            // Reload no more than every 15 minutes
            let nextUpdate = Calendar.current.date(
                byAdding: .minute, value: 15, to: .now
            )!

            let timeline = Timeline(
                entries: [entry],
                policy: .after(nextUpdate)
            )
            completion(timeline)
        }
    }
}`}</code></pre>
        </div>
      </section>

      {/* ── SwiftUI implementation ───────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">SwiftUI implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          A minimal WidgetKit widget requires three types: a <code className="font-mono text-[13px] text-[rgb(var(--accent))]">TimelineEntry</code>, a <code className="font-mono text-[13px] text-[rgb(var(--accent))]">TimelineProvider</code>, and a SwiftUI view. The widget struct wires them together.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
            <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">ActivityWidget.swift</span>
          </div>
          <pre className="p-5 text-[12px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`import WidgetKit
import SwiftUI

// 1. Entry — the data snapshot
struct ActivityEntry: TimelineEntry {
    let date: Date
    let steps: Int
    let goal: Int

    var progress: Double { min(Double(steps) / Double(goal), 1) }
    var isPlaceholder: Bool { steps == 0 }
}

// 2. View — renders the snapshot
struct ActivityWidgetView: View {
    var entry: ActivityEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 6) {
                Image(systemName: "figure.walk")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(.accent)
                Text("ACTIVITY")
                    .font(.system(size: 10, weight: .semibold))
                    .foregroundStyle(.secondary)
                    .tracking(0.04)
            }

            Spacer()

            Text(entry.steps, format: .number)
                .font(.system(size: 34, weight: .bold, design: .rounded))
                .foregroundStyle(.primary)

            Text("steps today")
                .font(.system(size: 12))
                .foregroundStyle(.secondary)

            ProgressView(value: entry.progress)
                .tint(.accent)
                .padding(.top, 8)

            Text("\\(Int(entry.progress * 100))% of goal")
                .font(.system(size: 10))
                .foregroundStyle(.secondary)
                .padding(.top, 4)
        }
        .padding(16)
        .containerBackground(for: .widget) { Color(.systemBackground) }
    }
}

// 3. Widget definition
struct ActivityWidget: Widget {
    let kind = "ActivityWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: ActivityProvider()) { entry in
            ActivityWidgetView(entry: entry)
        }
        .configurationDisplayName("Activity")
        .description("Today's step count and goal progress.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}`}</code></pre>
        </div>
      </section>

      {/* ── Lock screen widgets ──────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Lock screen widgets</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          iOS 16+ supports lock screen widgets in three families. They render in monochrome by default and must read clearly with no color. Use SF Symbols for icons — they adapt to vibrancy automatically.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            {
              family: "accessoryCircular",
              shape: "Circle · ~44pt",
              use: "Progress ring, icon + number, single glyph",
              note: "Sits beside the clock face",
            },
            {
              family: "accessoryRectangular",
              shape: "Rect · ~160×48pt",
              use: "Title + 2–3 lines of secondary text, or title + progress",
              note: "Below the clock — most legible",
            },
            {
              family: "accessoryInline",
              shape: "Inline · single line",
              use: "Icon + short string only (e.g. '↑ 8,432 steps')",
              note: "Top of lock screen, very limited space",
            },
          ].map(({ family, shape, use, note }) => (
            <div key={family} className="rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <code className="text-[11px] font-mono text-[rgb(var(--accent))] block mb-1">{family}</code>
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))] block mb-2">{shape}</span>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed mb-2">{use}</p>
              <p className="text-[11px] text-[rgb(var(--text-tertiary))] italic">{note}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] p-4" style={{ backgroundColor: "var(--card-tint-bg)" }}>
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--nav-active-color)" }}>Design note</span>
          <p className="text-[13px] text-[rgb(var(--text-secondary))] mt-1 leading-relaxed">
            Lock screen widgets render with system vibrancy — the OS composites your content over the wallpaper using luminosity blending. Never use color to convey meaning; use shape, size, and text. Test your widget on multiple wallpapers in both dark and light conditions.
          </p>
        </div>
      </section>

      {/* ── Principles ───────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Design principles</h2>
        <div className="grid grid-cols-3 gap-4">
          {PRINCIPLES.map((p) => (
            <div
              key={p.label}
              className="flex flex-col gap-2 rounded-[10px] p-5"
              style={{ backgroundColor: "var(--card-tint-bg)" }}
            >
              <span
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--nav-active-color)" }}
              >
                {p.label}
              </span>
              <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Accessibility ─────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-3 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "VoiceOver reads widgets as a whole unit by default. Use .accessibilityLabel on the top-level view to provide a concise summary: \"8,432 steps, 68 percent of daily goal.\" Don't make VoiceOver navigate through individual labels and values.",
            "Dynamic Type does not apply to widget text directly — widgets use fixed point sizes. Ensure your minimum text size (typically 11pt) remains readable at the default display size.",
            "Avoid conveying information through color alone on lock screen widgets — they render in monochrome. On home screen widgets, pair color with a label or icon.",
            "All tappable regions must have a Link wrapping a meaningful URL. The entire widget can be a single tap target, or sub-regions can be independent Links (Medium and larger only).",
            "Use .widgetURL for a single tap target on any size. Use Link views for multiple tap targets — only available on systemMedium and larger.",
            "Test with Reduce Transparency and Increase Contrast enabled. The .containerBackground modifier handles most cases automatically when using system materials.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 flex-shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
