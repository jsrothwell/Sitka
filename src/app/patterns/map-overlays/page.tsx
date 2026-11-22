"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

type Phase = "idle" | "searching" | "preview" | "navigating" | "arrived";

const PHASES: { id: Phase; label: string }[] = [
  { id: "idle", label: "Idle" },
  { id: "searching", label: "Searching" },
  { id: "preview", label: "Preview" },
  { id: "navigating", label: "Navigating" },
  { id: "arrived", label: "Arrived" },
];

const LEGEND = [
  { label: "Taken", token: "--status-danger" },
  { label: "Probably", token: "--status-caution" },
  { label: "Possibly free", token: "--status-warning" },
  { label: "Free", token: "--status-success" },
];

/** Glass chrome shared by every floating element over the map. */
const GLASS =
  "bg-[rgb(var(--surface)/0.85)] backdrop-blur-xl border border-[rgb(var(--border))] shadow-[var(--shadow-card)]";

const CODE = {
  react: {
    filename: "MapScreen.tsx",
    code: `type Phase = "idle" | "searching" | "preview" | "navigating" | "arrived";

// The map is always full-bleed. Chrome lives in exactly two slots — top and bottom —
// and each phase decides what fills them. Nothing floats anywhere else.
export function MapScreen({ phase }: { phase: Phase }) {
  return (
    <div className="relative h-dvh overflow-hidden">
      <MapCanvas className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col gap-2 p-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="pointer-events-auto">
          {phase === "searching"  ? <SearchPanel /> :
           phase === "navigating" ? <><ManeuverBanner /><HazardBanner /></> :
                                    <><SearchPill /><TopBar /></>}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="pointer-events-auto flex flex-col gap-2">
          {phase === "idle"       && <><ReportFab /><Legend /></>}
          {phase === "preview"    && <TripCard />}
          {phase === "navigating" && <><ReportFab /><GuidanceFooter /></>}
          {phase === "arrived"    && <ArrivalCard />}
        </div>
      </div>
    </div>
  );
}

// pointer-events: none on the slot containers keeps the map pannable in the gaps
// between floating elements; each element opts back in with pointer-events: auto.`,
  },
  html: {
    filename: "map-overlays.html",
    code: `<div class="map-screen" data-phase="idle">
  <div class="map" aria-label="Parking map" role="application"></div>

  <div class="slot slot--top">
    <button class="glass search-pill" aria-label="Search for a destination">
      <span>Where to?</span>
    </button>
    <div class="top-bar">
      <button class="glass chip">📍 Mission</button>
      <span class="glass chip chip--status" aria-label="Showing live reports">Live</span>
    </div>
  </div>

  <div class="slot slot--bottom">
    <button class="fab" aria-label="Report something on the road">!</button>
    <div class="glass legend" role="img" aria-label="Legend: red taken, orange probably taken, amber possibly free, green free">
      …
    </div>
  </div>
</div>

<style>
.map-screen { position: relative; height: 100dvh; overflow: hidden; }
.map { position: absolute; inset: 0; }
.slot { position: absolute; inset-inline: 0; display: flex; flex-direction: column; gap: 8px; padding: 16px;
        pointer-events: none; }
.slot > * { pointer-events: auto; }
.slot--top    { top: 0;    padding-top: max(16px, env(safe-area-inset-top)); }
.slot--bottom { bottom: 0; padding-bottom: max(16px, env(safe-area-inset-bottom)); }
.glass { background: rgb(var(--surface) / .85); backdrop-filter: blur(24px) saturate(180%);
         border: 1px solid rgb(var(--border)); border-radius: 16px; }
.chip { border-radius: 999px; padding: 6px 12px; font-size: 13px; font-weight: 600; }
.fab  { align-self: flex-end; width: 54px; height: 54px; border-radius: 50%;
        background: rgb(var(--status-caution)); color: #fff; box-shadow: 0 3px 6px rgb(0 0 0 / .25); }
@media (prefers-reduced-transparency: reduce) { .glass { background: rgb(var(--surface)); backdrop-filter: none; } }
</style>`,
  },
  swift: {
    filename: "MapScreen.swift",
    code: `import SwiftUI

struct MapScreen: View {
    @Bindable var trip: TripModel

    var body: some View {
        ParkingMapView(/* … */)
            .ignoresSafeArea()
            // Insets, not overlays: the map's own controls, attribution and
            // camera padding move out of the way of whatever the slots contain.
            .safeAreaInset(edge: .top) { topArea }
            .safeAreaInset(edge: .bottom) { bottomArea }
            .animation(.snappy, value: trip.phase)
            .sheet(item: $trip.selectedSegment) { segment in
                SegmentDetailView(segment: segment)
                    .presentationDetents([.medium, .large])
                    // Keep the map pannable behind a half-height sheet.
                    .presentationBackgroundInteraction(.enabled(upThrough: .medium))
            }
    }

    @ViewBuilder private var topArea: some View {
        Group {
            switch trip.phase {
            case .searching:  SearchPanel(trip: trip)
            case .navigating:
                VStack(spacing: 8) {
                    ManeuverBanner(step: trip.upcomingStep, distance: trip.progress?.distanceToManeuver)
                    if let alert = trip.traffic.upcoming {
                        HazardAlertBanner(alert: alert)
                            .transition(.move(edge: .top).combined(with: .opacity))
                    }
                }
            default:
                VStack(spacing: 8) {
                    SearchBarButton { trip.beginSearch() }
                    TopBar()
                }
            }
        }
        .padding(.horizontal)
        .transition(.move(edge: .top).combined(with: .opacity))
    }

    @ViewBuilder private var bottomArea: some View {
        VStack(spacing: 8) {
            switch trip.phase {
            case .idle:
                HStack { Spacer(); ReportButton { trip.showReportPicker() } }
                LegendView()
            case .preview:
                if let plan = trip.plan { TripCard(plan: plan) }
            case .navigating:
                if let spot = trip.betterSpot { BetterSpotBanner(spot: spot) }
                GuidanceFooter(progress: trip.progress) { trip.endTrip() }
            case .arrived:
                if let plan = trip.plan { ArrivalCard(plan: plan) }
            default:
                EmptyView()
            }
        }
        .padding(.horizontal)
        .padding(.bottom, 8)
        .transition(.move(edge: .bottom).combined(with: .opacity))
    }
}

/// Every floating surface uses the same material and continuous corners.
extension View {
    func mapChrome(cornerRadius: CGFloat = 22) -> some View {
        background(.regularMaterial, in: RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
    }
}`,
  },
};

function FakeMap({ phase }: { phase: Phase }) {
  const route = phase === "preview" || phase === "navigating";
  return (
    <svg viewBox="0 0 360 640" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="360" height="640" fill="rgb(var(--surface-raised))" />
      {[80, 200, 320, 440, 560].map((y) => (
        <rect key={`h${y}`} x="0" y={y} width="360" height="14" fill="rgb(var(--surface))" />
      ))}
      {[60, 180, 300].map((x) => (
        <rect key={`v${x}`} x={x} y="0" width="14" height="640" fill="rgb(var(--surface))" />
      ))}
      {/* Occupancy strokes on street segments */}
      <rect x="74" y="83" width="106" height="8" rx="4" fill="rgb(var(--status-danger))" />
      <rect x="194" y="203" width="106" height="8" rx="4" fill="rgb(var(--status-success))" />
      <rect x="74" y="323" width="106" height="8" rx="4" fill="rgb(var(--status-caution))" />
      <rect x="194" y="443" width="106" height="8" rx="4" fill="rgb(var(--status-warning))" />
      <rect x="183" y="94" width="8" height="106" rx="4" fill="rgb(var(--status-success))" />
      {route && (
        <path
          d="M67 600 L67 447 L187 447 L187 207 L250 207"
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {(route || phase === "arrived") && <circle cx="250" cy="207" r="9" fill="rgb(var(--status-success))" stroke="white" strokeWidth="3" />}
      {phase === "navigating" && <circle cx="67" cy="540" r="8" fill="rgb(var(--accent))" stroke="white" strokeWidth="3" />}
    </svg>
  );
}

export default function MapOverlaysPage() {
  const [phase, setPhase] = useState<Phase>("idle");

  return (
    <div>
      <PageHeader
        title="Map Overlays"
        badge="New"
        description="How to layer controls over a full-bleed map: two fixed slots (top and bottom) whose contents change with the task phase, one glass material for every floating surface, and sheets that leave the map usable behind them. For wayfinding, parking, delivery tracking, store finders — any screen where the map is the content."
      />
      <SourceNote
        sources={[
          { app: "Get Parked", file: "Views/ContentView.swift" },
          { app: "Get Parked", file: "Views/TripViews.swift" },
          { app: "Get Parked", file: "Views/TrafficViews.swift" },
        ]}
      />

      <PreviewSection>
        <div className="mb-4 flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Task phase">
          {PHASES.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={phase === p.id}
              onClick={() => setPhase(p.id)}
              className={`rounded-full px-3 py-1 text-[12px] font-medium ${
                phase === p.id
                  ? "bg-[rgb(var(--accent))] text-[rgb(var(--on-accent))]"
                  : "border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text-secondary))]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="relative mx-auto h-[560px] w-full max-w-[320px] overflow-hidden rounded-[36px] border-[6px] border-[rgb(var(--text-primary)/0.85)]">
          <FakeMap phase={phase} />

          {/* Top slot */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col gap-2 p-3 pt-6">
            <div className="pointer-events-auto flex flex-col gap-2">
              {phase === "searching" ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className={`flex flex-1 items-center gap-2 rounded-2xl px-3 py-2.5 text-[14px] ${GLASS}`}>
                      <span aria-hidden>🔍</span>
                      <span className="text-[rgb(var(--text-primary))]">Ferry Bui|</span>
                    </div>
                    <button onClick={() => setPhase("idle")} className="text-[14px] font-medium text-[rgb(var(--accent))]">
                      Cancel
                    </button>
                  </div>
                  <div className={`rounded-2xl py-1 ${GLASS}`}>
                    <p className="px-3.5 pb-1 pt-2 text-[11px] font-semibold text-[rgb(var(--text-secondary))]">Recent</p>
                    {["Ferry Building", "Ferry Plaza Farmers Market"].map((t) => (
                      <button key={t} onClick={() => setPhase("preview")} className="flex w-full items-center gap-3 px-3.5 py-2 text-left">
                        <span className="text-[18px] text-[rgb(var(--accent))]" aria-hidden>📍</span>
                        <span>
                          <span className="block text-[14px] text-[rgb(var(--text-primary))]">{t}</span>
                          <span className="block text-[11px] text-[rgb(var(--text-secondary))]">Embarcadero, San Francisco</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : phase === "navigating" ? (
                <>
                  <div className="flex items-center gap-3.5 rounded-[20px] bg-[rgb(19_41_75)] p-4 text-white" role="status">
                    <span className="w-10 text-center text-[30px] font-bold" aria-hidden>↱</span>
                    <span>
                      <span className="block text-[20px] font-bold tabular-nums">350 m</span>
                      <span className="block text-[15px] font-semibold">Turn right onto Market St</span>
                    </span>
                  </div>
                  <div className={`flex items-center gap-2.5 rounded-2xl p-2.5 ${GLASS}`}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(var(--status-danger))] text-[14px]" aria-hidden>
                      💥
                    </span>
                    <span>
                      <span className="block text-[13px] font-semibold text-[rgb(var(--text-primary))]">Accident ahead</span>
                      <span className="block text-[11px] tabular-nums text-[rgb(var(--text-secondary))]">600 m · reported 4 min ago</span>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <button onClick={() => setPhase("searching")} className={`flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-left ${GLASS}`}>
                    <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-[rgb(var(--accent))] text-[13px] font-bold text-[rgb(var(--on-accent))]" aria-hidden>
                      P
                    </span>
                    <span className="flex-1 text-[15px] font-medium text-[rgb(var(--text-secondary))]">Where to?</span>
                    <span aria-hidden>🔍</span>
                  </button>
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-3 py-1.5 text-[12px] font-semibold text-[rgb(var(--text-primary))] ${GLASS}`}>📍 Mission</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold text-[rgb(var(--text-primary))] ${GLASS}`}>Live</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom slot */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3 pb-5">
            <div className="pointer-events-auto flex flex-col gap-2">
              {(phase === "idle" || phase === "navigating") && (
                <button
                  aria-label="Report something on the road"
                  className="self-end flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[rgb(var(--status-caution))] text-[22px] text-white shadow-[0_3px_6px_rgb(0_0_0/0.25)]"
                >
                  💬
                </button>
              )}
              {phase === "idle" && (
                <div className={`flex justify-center gap-2.5 rounded-xl px-3 py-2 ${GLASS}`}>
                  {LEGEND.map((l) => (
                    <span key={l.label} className="flex items-center gap-1 text-[10px] text-[rgb(var(--text-primary))]">
                      <span className="h-[5px] w-3.5 rounded-full" style={{ background: `rgb(var(${l.token}))` }} />
                      {l.label}
                    </span>
                  ))}
                </div>
              )}
              {phase === "preview" && (
                <div className={`rounded-[22px] p-4 ${GLASS}`}>
                  <div className="flex items-start justify-between">
                    <span>
                      <span className="block text-[17px] font-bold text-[rgb(var(--text-primary))]">Ferry Building</span>
                      <span className="block text-[11px] text-[rgb(var(--text-secondary))]">From Current Location · arrive 6:42 PM</span>
                    </span>
                    <button onClick={() => setPhase("idle")} aria-label="Close trip" className="text-[18px] text-[rgb(var(--text-tertiary))]">
                      ⊗
                    </button>
                  </div>
                  <div className="mt-3 rounded-[14px] bg-[rgb(var(--surface-raised))] p-3">
                    <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">Park on Steuart St</p>
                    <p className="text-[11px] font-semibold text-[rgb(var(--status-success-text))]">Likely free on arrival · 4 min walk</p>
                    <p className="mt-1.5 text-[11px] text-[rgb(var(--text-secondary))]">🚗 14 min · 5.2 km &nbsp; 🚶 4 min walk</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setPhase("navigating")} className="flex-1 rounded-xl bg-[rgb(var(--accent))] py-2 text-[15px] font-semibold text-[rgb(var(--on-accent))]">
                      Go
                    </button>
                    <button aria-label="Open in another navigation app" className="rounded-xl bg-[rgb(var(--surface-raised))] px-3.5 text-[15px]">
                      ↗
                    </button>
                  </div>
                </div>
              )}
              {phase === "navigating" && (
                <div className={`flex items-center justify-between rounded-[22px] p-4 ${GLASS}`}>
                  <span>
                    <span className="block text-[19px] font-bold tabular-nums text-[rgb(var(--text-primary))]">6:42 PM</span>
                    <span className="block text-[11px] tabular-nums text-[rgb(var(--text-secondary))]">11 min · 4.1 km</span>
                  </span>
                  <button onClick={() => setPhase("arrived")} className="rounded-xl bg-[rgb(var(--danger-solid))] px-4 py-2 text-[14px] font-semibold text-[rgb(var(--on-danger))]">
                    End
                  </button>
                </div>
              )}
              {phase === "arrived" && (
                <div className={`rounded-[22px] p-4 ${GLASS}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[28px] text-[rgb(var(--status-success-text))]" aria-hidden>🅿︎</span>
                    <span>
                      <span className="block text-[15px] font-semibold text-[rgb(var(--text-primary))]">You&apos;re at Steuart St</span>
                      <span className="block text-[11px] text-[rgb(var(--text-secondary))]">4 min walk to Ferry Building</span>
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 rounded-xl bg-[rgb(var(--status-success))] py-2 text-[13px] font-semibold text-white">I parked here</button>
                    <button className="flex-1 rounded-xl bg-[rgb(var(--surface-raised))] py-2 text-[13px] font-semibold text-[rgb(var(--text-primary))]">
                      No space
                    </button>
                  </div>
                  <button onClick={() => setPhase("idle")} className="mt-2 w-full rounded-xl bg-[rgb(var(--surface-raised))] py-2 text-[13px] text-[rgb(var(--text-primary))]">
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </PreviewSection>

      <DocSection
        title="Slots by phase"
        intro="The screen is a small state machine. Each phase fills the top and bottom slots with at most two or three elements; anything else the user needs comes in a sheet."
      >
        <DocTable
          headers={["Phase", "Top slot", "Bottom slot", "Map taps"]}
          rows={[
            ["Idle", "Search pill · area chip · Live/Demo badge", "Report button · legend", "Open a detail sheet for the street, lot or report"],
            ["Searching", "Search field + Cancel · results panel (recents first)", "Empty — the keyboard owns it", "—"],
            ["Choosing / Preview", "Search pill (disabled area chip)", "Spot chooser, then trip card with Go + hand-off menu", "Pick that spot instead of opening details"],
            ["Navigating", "Maneuver banner · hazard alert", "“Better spot” banner or confirm card · report button · guidance footer with End", "Ignored except reports"],
            ["Arrived", "Search pill", "Arrival card: “I parked here” / “No space” / walking directions / Done", "Open details"],
          ]}
        />
      </DocSection>

      <DocSection title="Chrome inventory">
        <DocTable
          headers={["Element", "Spec"]}
          rows={[
            ["Search pill", "A button, not a field: app mark + “Where to?” + magnifier. Tapping it enters the Searching phase, which swaps in the real field with focus already set."],
            ["Status chips", "Capsules for context the user should never be confused about — current area, and whether data is live or sample (“Demo data”)."],
            ["Floating action", "One 54pt circle for the single most frequent action (Report). Never a cluster of FABs."],
            ["Legend", "Always visible while idle, whenever the map encodes meaning in color."],
            ["Bottom card", "22pt continuous corners, regular material, 16pt padding. One primary action at full width, secondary actions bordered."],
            ["Banners", "Navigation banners use a solid brand fill (white text) for instant legibility at a glance; alerts and hand-offs use glass. Both slide in from their own edge."],
            ["Sheets", "Detents sized to content (200–320pt for simple details; medium/large for rich ones). Medium sheets enable background interaction so the map stays pannable."],
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "The map is the content", body: "Wayfinding, parking, delivery tracking, field service, store finders — tasks where people look at the map more than at any list.", good: true },
            { heading: "Hand off what you don't own", body: "If you don't provide turn-by-turn, say so and hand off: a menu to Apple Maps, Google Maps (when installed) and Waze, driving to the parking spot rather than the front door.", good: true },
            { heading: "Maps as decoration", body: "A small static map in a detail screen doesn't need this system — use an image or a card with a map thumbnail.", good: false },
            { heading: "Free-floating controls", body: "Don't pin buttons to arbitrary corners. Everything lives in the two slots so the map's own controls, attribution and camera padding can avoid it.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "Everything on the map must also be reachable from chrome or a list — the spot chooser lists every option the map shows, sortable by best, closest, street or car park.",
            "Use safe-area insets (SwiftUI .safeAreaInset, CSS env(safe-area-inset-*)) rather than overlays, so chrome never sits under the Dynamic Island or home indicator.",
            "Don't use --surface-glass for map chrome: it's tuned for glass over Sitka's own surfaces (6% white in dark mode) and is far too thin over busy map tiles. Use --surface at ~85% opacity with a blur.",
            "Under Reduce Transparency, swap the glass material for an opaque surface; text on blurred map tiles can fall below 4.5:1.",
            "The maneuver banner is one combined element with role=\"status\"; announce a new maneuver, not every distance tick.",
            "Phase transitions slide chrome from its own edge; under Reduce Motion, crossfade instead.",
            "Keep every control at 44pt or more — this screen is used one-handed, often while walking or stopped at a light.",
          ]}
        />
      </DocSection>
    </div>
  );
}
