import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";

export const metadata: Metadata = { title: "Live Activities" };

// ── Inline mockup helpers ────────────────────────────────────────────────────

function DynamicIslandCompact() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        style={{
          width: 220, height: 36, borderRadius: 18, background: "#000",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 14px", flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 14 }}>🚚</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", fontVariantNumeric: "tabular-nums" }}>12:48</span>
      </div>
      <span className="text-[11px] text-[rgb(var(--text-tertiary))] font-mono">compact leading + trailing</span>
    </div>
  );
}

function DynamicIslandMinimal() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        style={{
          width: 36, height: 36, borderRadius: 18, background: "#000",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 15 }}>🚚</span>
      </div>
      <span className="text-[11px] text-[rgb(var(--text-tertiary))] font-mono">minimal</span>
    </div>
  );
}

function DynamicIslandExpanded() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        style={{
          width: 340, borderRadius: 42, background: "#000", overflow: "hidden",
          padding: "18px 20px", flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>🚚</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Out for delivery</span>
          </div>
          <span style={{ fontSize: 15, color: "#fff", fontVariantNumeric: "tabular-nums", opacity: 0.9 }}>12:48</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
          Arriving at 428 Elm Street
        </div>
      </div>
      <span className="text-[11px] text-[rgb(var(--text-tertiary))] font-mono">expanded · leading / trailing / bottom regions</span>
    </div>
  );
}

function LockScreenBanner() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        style={{
          width: 340, borderRadius: 20, background: "linear-gradient(135deg, #7a2e0e, #4a1808)",
          padding: "16px 18px", flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Out for delivery</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>Arriving at 428 Elm Street</div>
          </div>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>12:48</span>
        </div>
      </div>
      <span className="text-[11px] text-[rgb(var(--text-tertiary))] font-mono">lock screen banner</span>
    </div>
  );
}

// ── Reference data ───────────────────────────────────────────────────────────

const REGIONS = [
  { region: "Minimal", where: "Shown when a second Live Activity is also active and competing for Dynamic Island space.", content: "A single glyph only — no text fits." },
  { region: "Compact leading", where: "Left side of the pill, always visible while the activity is running.", content: "One small icon or glyph identifying the activity." },
  { region: "Compact trailing", where: "Right side of the pill.", content: "The single most important live value — usually a countdown or short status." },
  { region: "Expanded leading", where: "Top-left when the user long-presses the island.", content: "Icon + short title." },
  { region: "Expanded trailing", where: "Top-right when expanded.", content: "The same live value as compact trailing, at a larger size." },
  { region: "Expanded bottom", where: "Full-width row beneath the top regions when expanded.", content: "One line of supporting detail — a destination, a subtitle, a next action." },
  { region: "Lock screen banner", where: "Full-width card on the lock screen and in Notification Center.", content: "The complete activity: title, one line of detail, and the live value. This is the only region with real horizontal space — expanded and lock screen typically share the same view." },
];

const CONSTRAINTS = [
  {
    label: "Solid tint, not glass",
    body: "Dynamic Island and lock screen surfaces render outside your app's normal view hierarchy and can't use System Materials, vibrancy, or Sitka's card/glass chrome. Set a single solid background color with .activityBackgroundTint(_:) — that color is the entire visual language available to you.",
  },
  {
    label: "White-on-tint text",
    body: "With no material to lean on, legibility over an arbitrary background comes from contrast, not chrome. Pick a tint dark enough that white text at ~90–100% opacity for primary content and ~55–70% for secondary clears WCAG AA — don't try to reuse light-mode/dark-mode text tokens here.",
  },
  {
    label: "Design for the smallest region first",
    body: "Compact and minimal have almost no space — a glyph and a handful of characters. Design those first, then expand outward to the lock screen banner, not the other way around; content that only fits the banner has nowhere to go in the compact states.",
  },
];

export default function LiveActivitiesPage() {
  return (
    <div>
      <PageHeader
        title="Live Activities"
        description="A Live Activity surfaces one in-progress event — a delivery, a timer, a live score — on the Lock Screen and in the Dynamic Island, updating in place without the user opening the app. Built on ActivityKit, not WidgetKit, and governed by a different set of visual constraints than home screen widgets."
      />

      {/* Why separate from widgets */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Not the same surface as widgets</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          <Link href="/patterns/mobile-widgets" className="text-[rgb(var(--accent))] underline underline-offset-2">Mobile Widgets</Link> are static, timeline-refreshed snapshots built on WidgetKit, and can use <code className="font-mono text-[13px] text-[rgb(var(--accent))]">.containerBackground(for: .widget)</code> — the system material that handles light/dark and vibrancy automatically. Live Activities are built on ActivityKit for a single, currently-running event, are pushed or locally updated in near-real time, and end when the event does. Because the Dynamic Island and lock screen present outside the normal app chrome, they structurally cannot use System Materials at all — the constraint below isn&apos;t a stylistic choice, it&apos;s the only option ActivityKit gives you.
        </p>
        <div className="rounded-[10px] p-4" style={{ backgroundColor: "var(--card-tint-bg)" }}>
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--nav-active-color)" }}>Design note</span>
          <p className="text-[13px] text-[rgb(var(--text-secondary))] mt-1 leading-relaxed">
            Don&apos;t try to port Sitka&apos;s card/glass tokens onto a Live Activity. Treat it as its own small design system with exactly two ingredients — one solid tint color and white text at two opacities — and put your effort into choosing a tint that reads clearly on both the Dynamic Island&apos;s black surface and the Lock Screen&apos;s wallpaper.
          </p>
        </div>
      </section>

      {/* Visual mockup */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Regions</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          A single Live Activity configuration renders in up to five places. Design them together — the same underlying state (a title, a detail line, a live value) is what populates all five, just at different sizes.
        </p>

        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 mb-4 flex flex-wrap gap-8 items-center justify-center">
          <DynamicIslandMinimal />
          <DynamicIslandCompact />
        </div>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 mb-4 flex flex-wrap gap-8 items-center justify-center">
          <DynamicIslandExpanded />
        </div>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 mb-6 flex justify-center">
          <LockScreenBanner />
        </div>

        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Region", "Where it appears", "What to put there"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REGIONS.map((r, i) => (
                <tr key={r.region} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap align-top pt-3.5">{r.region}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))] align-top">{r.where}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))] align-top">{r.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Constraints */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Design constraints</h2>
        <div className="grid grid-cols-3 gap-4">
          {CONSTRAINTS.map((c) => (
            <div
              key={c.label}
              className="flex flex-col gap-2 rounded-[10px] p-5"
              style={{ backgroundColor: "var(--card-tint-bg)" }}
            >
              <span
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--nav-active-color)" }}
              >
                {c.label}
              </span>
              <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">SwiftUI implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          ActivityKit is iOS/watchOS-only — there is no React or HTML equivalent, unlike most patterns in this library. A minimal Live Activity needs an <code className="font-mono text-[13px] text-[rgb(var(--accent))]">ActivityAttributes</code> type (the fixed data, set once) plus a <code className="font-mono text-[13px] text-[rgb(var(--accent))]">ContentState</code> (the part that updates), and a <code className="font-mono text-[13px] text-[rgb(var(--accent))]">Widget</code> conformance that lays out the lock screen view and every Dynamic Island region.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
            <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">DeliveryLiveActivity.swift</span>
          </div>
          <pre className="p-5 text-[12px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`import ActivityKit
import WidgetKit
import SwiftUI

// 1. Attributes — fixed for the activity's lifetime
struct DeliveryAttributes: ActivityAttributes {
    struct ContentState: Codable, Hashable {
        var eta: Date
        var address: String
    }
    var orderId: String
}

// 2. Widget — lays out lock screen + every Dynamic Island region
struct DeliveryLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: DeliveryAttributes.self) { context in
            // Lock screen / banner
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Out for delivery").font(.headline).foregroundStyle(.white)
                    Text(context.state.address)
                        .font(.caption)
                        .foregroundStyle(.white.opacity(0.65))
                }
                Spacer()
                Text(timerInterval: Date.now...context.state.eta, countsDown: true)
                    .font(.title2.monospacedDigit())
                    .foregroundStyle(.white)
            }
            .padding()
            // The ONLY chrome available — a flat tint, no material.
            .activityBackgroundTint(Color(red: 0.30, green: 0.12, blue: 0.03))
            .activitySystemActionForegroundColor(.white)

        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Label("Out for delivery", systemImage: "shippingbox.fill")
                        .lineLimit(1)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text(timerInterval: Date.now...context.state.eta, countsDown: true)
                        .font(.caption.monospacedDigit())
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text(context.state.address).font(.caption2).foregroundStyle(.secondary)
                }
            } compactLeading: {
                Image(systemName: "shippingbox.fill")
            } compactTrailing: {
                Text(timerInterval: Date.now...context.state.eta, countsDown: true)
                    .font(.caption2.monospacedDigit())
                    .frame(width: 44)
            } minimal: {
                Image(systemName: "shippingbox.fill")
            }
        }
    }
}`}</code></pre>
        </div>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3 italic">
          Real-world reference: JobFlo ships two Live Activities on this same shape — an interview countdown and an application-deadline countdown — each with its own tint color and SF Symbol, structured identically to the example above.
        </p>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "VoiceOver reads the Dynamic Island and lock screen banner as a unit — provide an .accessibilityLabel summarizing the full state ('Out for delivery, arriving in 12 minutes') rather than letting it read each Text view separately.",
            "The countdown timer text (Text(timerInterval:countsDown:)) updates its accessible value automatically — don't wrap it in a custom label that goes stale relative to the visible time.",
            "Never rely on the tint color alone to convey status (e.g. red = urgent) — pair any status change with a text or icon change, since the tint is a single fixed value for the activity's lifetime in most implementations.",
            "Keep the compact and minimal region content meaningful on its own — some users only ever see the collapsed Dynamic Island, never the expanded view.",
            "Always set a sensible staleness date and end the activity promptly when the event concludes — a Live Activity that outlives its event (a delivery marked 'arriving' long after it arrived) erodes trust in every future one your app shows.",
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
