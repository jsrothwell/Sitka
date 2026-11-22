"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

type Screen = "list" | "poi";

const SPOTS = [
  { title: "Steuart St", sub: "Likely free · 4 min walk", detail: "2h max · Permit zone A after 6 PM", token: "--status-success" },
  { title: "Mission St", sub: "Possibly free · 6 min walk", detail: "Paid · 4h max", token: "--status-warning" },
  { title: "Embarcadero Center Garage", sub: "Car park · 3 min walk", detail: "Open 24h · ABM Parking", token: "--accent" },
];

const CODE = {
  react: {
    filename: "carplay.md",
    code: `// CarPlay has no web or React surface — apps provide data to system templates
// and Apple draws everything. Use the SwiftUI · iOS tab for the implementation.
//
// What carries over to other in-car or glanceable surfaces (Android Auto,
// watch, widget) is the information model:
//
//   Root list (≤ 12 items per section)
//   ├─ Near me             → map of ≤ 12 options
//   ├─ From your phone     → the destination already chosen on the phone
//   └─ Recent destinations → stand-in for search (no keyboard while driving)
//
//   Each option: title, one-line subtitle, 2–3 line detail,
//   one primary action ("Drive Here") and at most one secondary.`,
  },
  html: {
    filename: "android-auto.md",
    code: `<!-- Android Auto's equivalent is the Car App Library (androidx.car.app):
     PlaceListMapTemplate ≈ CPPointOfInterestTemplate, ListTemplate ≈ CPListTemplate.
     The same limits apply: few items, no free text while moving, actions as
     a primary + optional secondary, navigation handed to a navigation app. -->`,
  },
  swift: {
    filename: "CarPlayParkingCoordinator.swift",
    code: `import CarPlay
import MapKit

/// Get Parked (list)
/// ├─ Parking near me ─────────────┐
/// ├─ Parking near <phone's trip>  ├─▶ point-of-interest map (≤ 12 spots)
/// └─ Recent destinations ─────────┘     Drive Here ─▶ Apple Maps
///                                       Google Maps (if installed)
@MainActor
final class CarPlayParkingCoordinator: NSObject {
    private let scene: CPTemplateApplicationScene
    private let interfaceController: CPInterfaceController
    private let root = CPListTemplate(title: "Get Parked", sections: [])

    private func showParking(around center: Coordinate, title: String) {
        let template = CPPointOfInterestTemplate(title: title, pointsOfInterest: [], selectedIndex: NSNotFound)
        template.pointOfInterestDelegate = self
        interfaceController.pushTemplate(template, animated: true, completion: nil)
        Task {
            let options = await finder.options(around: center).prefix(12)   // Template limit
            template.setPointsOfInterest(options.map(pointOfInterest), selectedIndex: options.isEmpty ? NSNotFound : 0)
        }
    }

    private func pointOfInterest(_ spot: ParkingCandidate) -> CPPointOfInterest {
        let poi = CPPointOfInterest(
            location: MKMapItem(placemark: MKPlacemark(coordinate: spot.location)),
            title: spot.title,
            subtitle: "\\(spot.arrivalSummary) · \\(spot.walkMinutes) min walk",
            summary: spot.rulesSummary,
            detailTitle: spot.title, detailSubtitle: spot.arrivalSummary, detailSummary: spot.rulesDetail,
            pinImage: UIImage(systemName: "parkingsign.circle.fill")?
                .withTintColor(spot.status.uiColor, renderingMode: .alwaysOriginal)
        )
        poi.primaryButton = CPTextButton(title: "Drive Here", textStyle: .confirm) { [weak self] _ in
            // Turn-by-turn belongs to the maps app; open it on the car screen.
            self?.scene.open(NavigationHandoff.appleMapsURL(to: spot.location), options: nil, completionHandler: nil)
        }
        if UIApplication.shared.canOpenURL(NavigationHandoff.googleMapsScheme) {
            poi.secondaryButton = CPTextButton(title: "Google Maps", textStyle: .normal) { [weak self] _ in
                self?.scene.open(NavigationHandoff.googleMapsURL(to: spot.location), options: nil, completionHandler: nil)
            }
        }
        return poi
    }
}

extension CarPlayParkingCoordinator: CPPointOfInterestTemplateDelegate {
    /// Panning the "near me" map searches the new area — debounced, and only
    /// once the centre has moved more than half a walking radius.
    func pointOfInterestTemplate(_ template: CPPointOfInterestTemplate, didChangeMapRegion region: MKCoordinateRegion) {
        refreshTask?.cancel()
        refreshTask = Task {
            try? await Task.sleep(for: .milliseconds(600))
            guard !Task.isCancelled else { return }
            await load(template, around: Coordinate(region.center))
        }
    }
}`,
  },
};

export default function CarPlayPage() {
  const [screen, setScreen] = useState<Screen>("list");
  const [selected, setSelected] = useState(0);
  const spot = SPOTS[selected];

  return (
    <div>
      <PageHeader
        title="CarPlay Templates"
        badge="New"
        description="Designing for CarPlay means designing the information, not the pixels: apps fill a small set of system templates and the car draws them. This page covers the parking-app structure — a short root list, a point-of-interest map of up to 12 options, and a hand-off to a maps app for directions — and the constraints that shape it."
      />
      <SourceNote
        sources={[
          { app: "Get Parked", file: "CarPlay/CarPlayParkingCoordinator.swift" },
          { app: "Get Parked", file: "Services/ParkingPOIContent.swift" },
          { app: "Get Parked", file: "docs/carplay.md" },
        ]}
      />

      <PreviewSection>
        <div className="mx-auto flex h-[300px] w-full max-w-[560px] overflow-hidden rounded-xl bg-black text-white" style={{ fontFamily: "system-ui" }}>
          {/* Dock */}
          <div className="flex w-14 shrink-0 flex-col items-center gap-4 bg-[#1c1c1e] py-4 text-[11px] text-white/70" aria-hidden>
            <span>12:41</span>
            <span className="text-[20px]">🗺</span>
            <span className="text-[20px]">🎵</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgb(var(--accent))] text-[16px] font-bold text-[rgb(var(--on-accent))]">P</span>
          </div>

          {screen === "list" ? (
            <div className="flex-1 overflow-hidden p-3">
              <p className="mb-2 text-[17px] font-semibold">Get Parked</p>
              {[
                { icon: "➤", t: "Parking near me", d: "Free street parking and car parks" },
                { icon: "📱", t: "Ferry Building", d: "Destination from your phone", header: "Current trip" },
                { icon: "↺", t: "SFMOMA", d: "151 3rd St", header: "Recent destinations" },
              ].map((row) => (
                <div key={row.t}>
                  {row.header && <p className="mt-2 px-2 text-[11px] font-semibold uppercase text-white/50">{row.header}</p>}
                  <button
                    onClick={() => setScreen("poi")}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-white/10 focus-visible:bg-white/15"
                  >
                    <span className="w-6 text-center text-[16px] text-[rgb(var(--accent))]" aria-hidden>
                      {row.icon}
                    </span>
                    <span>
                      <span className="block text-[15px]">{row.t}</span>
                      <span className="block text-[12px] text-white/60">{row.d}</span>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative flex flex-1">
              <div className="w-[230px] shrink-0 overflow-hidden bg-[#1c1c1e] p-3">
                <button onClick={() => setScreen("list")} className="mb-2 text-[13px] text-[rgb(var(--accent))]">
                  ‹ Near me
                </button>
                <p className="text-[15px] font-semibold">{spot.title}</p>
                <p className="text-[12px] text-white/70">{spot.sub}</p>
                <p className="mt-1.5 text-[12px] text-white/50">{spot.detail}</p>
                <div className="mt-3 flex flex-col gap-1.5">
                  <button className="rounded-lg bg-[rgb(var(--accent))] py-2 text-[14px] font-semibold text-[rgb(var(--on-accent))]">Drive Here</button>
                  <button className="rounded-lg bg-white/15 py-2 text-[14px] font-semibold">Google Maps</button>
                </div>
              </div>
              <div className="relative flex-1 bg-[#2c2c2e]" aria-label="Map of parking options">
                {[60, 140, 220].map((y) => (
                  <div key={y} className="absolute inset-x-0 h-2 bg-[#3a3a3c]" style={{ top: y }} />
                ))}
                {[70, 170].map((x) => (
                  <div key={x} className="absolute inset-y-0 w-2 bg-[#3a3a3c]" style={{ left: x }} />
                ))}
                {SPOTS.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => setSelected(i)}
                    aria-label={`${s.title}, ${s.sub}`}
                    aria-pressed={selected === i}
                    className={`absolute flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold text-white ${selected === i ? "ring-2 ring-white" : ""}`}
                    style={{ background: `rgb(var(${s.token}))`, left: [40, 150, 230][i], top: [48, 128, 208][i] - 14 }}
                  >
                    P
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="mt-3 text-center text-[12px] text-[rgb(var(--text-tertiary))]">Simplified mock of the system templates — CarPlay draws the real ones.</p>
      </PreviewSection>

      <DocSection title="Template map">
        <DocTable
          headers={["Screen", "Template", "Content"]}
          rows={[
            ["Root", <code key="1">CPListTemplate</code>, "“Parking near me”, the destination already chosen on the phone (“Current trip”), and recent destinations. Rebuilt whenever the phone's trip or recents change."],
            ["Options", <code key="2">CPPointOfInterestTemplate</code>, "Up to 12 pins, colored by predicted availability. Each has a title, a one-line subtitle (availability · walk), a summary, and a detail card."],
            ["Actions", <code key="3">CPTextButton</code>, "Primary “Drive Here” (.confirm) opens Apple Maps on the car screen; secondary “Google Maps” only when installed. Never more than two."],
          ]}
        />
      </DocSection>

      <DocSection title="Constraints that shape the design">
        <ArrowList
          items={[
            "Category decides what you're allowed to build. A parking app gets list and point-of-interest templates — not turn-by-turn. So the app picks the spot and hands directions to a maps app, driving to the spot rather than the destination.",
            "No keyboard while driving: parking apps can't offer CarPlay search. Recent destinations from the phone stand in for it, and a destination chosen on the phone appears in the car automatically.",
            "Lists and maps are capped (CPListTemplate.maximumItemCount, 12 points of interest). Rank before you truncate — the first item is pre-selected.",
            "Panning the near-me map re-searches, debounced (600ms) and only after the centre moves more than half a walking radius, to avoid thrashing on small drags.",
            "Phone and car share one model. Choosing a spot in the car selects it on the phone, so “I parked here” is waiting when the driver picks the phone up.",
            "The entitlement (com.apple.developer.carplay-parking) must be granted by Apple. Until then, apply it to simulator builds only so device builds keep signing.",
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "An approved CarPlay category", body: "Parking, EV charging, fueling, navigation, audio, communication, quick food ordering, driving task. Check your category's allowed templates first.", good: true },
            { heading: "Hand off what you're not allowed to do", body: "If your category can't navigate, make the hand-off a first-class primary action rather than an afterthought.", good: true },
            { heading: "Recreating the phone UI", body: "Nothing from the phone's custom chrome carries over — no glass, no custom cards, no brand colors beyond pin tints and icons.", good: false },
            { heading: "Anything that needs reading", body: "Long text, settings, onboarding and sign-in stay on the phone. If setup is needed, say so in the list item (“Turn on Location in the Get Parked app”).", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "CarPlay templates handle focus, rotary/knob input, touch-pad input and Siri automatically — another reason not to fight them.",
            "Pin color is not enough: put availability in the subtitle text (“Likely free · 4 min walk”) so it's read aloud and visible on monochrome or low-contrast head units.",
            "Keep titles short and front-loaded; head units truncate aggressively and drivers glance for under two seconds.",
            "Test in the CarPlay Simulator (I/O → External Displays → CarPlay) at both standard and widescreen sizes.",
          ]}
        />
      </DocSection>
    </div>
  );
}
