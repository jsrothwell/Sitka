# JobFlo Delta Audit — 2026-09-22

**Scope:** JobFlo only (`/Users/harlock/Documents/GitHub/JobFlo`), ~91 commits since `ECOSYSTEM_AUDIT_2026-07-29.md`. This is a follow-up pass on one app, not a full ecosystem re-audit — the other seven repos and the open decisions in the July audit (§1–3 there) are untouched and still outstanding.

Same ground rules as the July audit: this is a decision document. Nothing here was auto-applied to `tokens.json` — there were no safe, judgment-free additions to apply this time (see §2). Component engineering (building any of §1 into `src/components/ui/`) is deliberately out of scope for this pass, per the project's established split between design-token audits and component-engineering work.

---

## 1. New reusable patterns found — not yet in Sitka or Sitkaflo

Cross-checked against `src/components/ui/` (web) and `Sitkaflo/Sources/SitkaFlo/Components/` (SwiftUI) — none of the following exist in either place today.

| Pattern | Source | What it is | Tokens |
|---|---|---|---|
| **Empty state** | `Shared/Views/EmptyStateView.swift` | Canonical icon + title + subtitle + CTA empty state, built explicitly to stop per-screen hand-rolled empty states from drifting apart. General-purpose, high reuse value. | Existing tokens only (`GlassTheme.accent`) — no gap. |
| **Paywall lock-overlay (blur-behind-lock)** | `Shared/Views/LockedFeaturePreview.swift` | Blurs real content behind an "Unlock" card instead of a cold interstitial. `src/app/patterns/paywall/page.tsx` (817 lines) already documents the paywall pattern family but has no blur-behind-lock variant — this is a genuine gap in that page, not a wholly new pattern. Ships with a load-bearing `.accessibilityHidden(true)` fix (VoiceOver was reading the blurred content) worth carrying into the doc as an a11y callout. | **Gap:** hardcoded `~#B266FF` violet for the lock icon/CTA — the same unresolved per-app violet accent flagged in §2.2 of the July audit (orgflo/matchflo's `#8b6dff`). Don't add as a token until that decision is made. |
| **Letter-grade risk badge** | `Shared/Views/GhostRiskBadge.swift` | Community-sourced employer "Grade A–F" capsule (k-anonymity gated). New badge *shape* — `Badge.tsx` today only does status/count badges, not a grade scale. | **Gap:** raw `.green`/`.orange`/`.red`, not mapped to `statusSuccess/Caution/Danger`. |
| **Score pill + accessible-foreground utility** | `Shared/Views/GhostRiskPill.swift` (`SFColor.accessibleForeground(on:)`) | The pill itself is a minor variant, but the utility is the real find: given an arbitrary status-color background, it picks black/white foreground text to clear WCAG contrast — replacing a colored-text-on-tint pairing that measured as low as 1.75:1 in JobFlo before this fix. Sitkaflo's `Accessibility/SitkaAccessibleColor.swift` does CVD color *substitution* but has nothing that solves this (different problem: contrast on an already-chosen color, not choosing a CVD-safe color). Complementary, worth porting verbatim. | Uses existing `GlassTheme.success/warning/danger` — no new color needed. |
| **"Explain this score" drawer** | `Shared/Views/GhostRiskPill.swift` (`GhostRiskDrawer`) | Popover breakdown listing itemized signals with point contributions (e.g. "Posting window under 5 days (+30)"), a recommended-action row, and an optional on-device-AI badge. Reusable wherever a computed score needs a rationale, not JobFlo-specific. | Existing `SFColor`/`SFType`/`SFSpacing` only — no gap. |
| **Timeline row** | `Shared/Views/JourneyTimelineRow.swift` | Vertical stepper/timeline row: icon circle, stage name, current-state/hint text, trailing checkmark-or-status. No `Timeline` primitive exists on either platform today. | `status.color` + system colors — no gap. |

**Validated, not new:** `iOS/Views/JobCardComponents.swift`'s `ActivityAlertBadge` uses `SFColor.ghost`/`ghostSubtle` — the `color.semantic.ghost` token added in the July audit (1.9.0) is now confirmed in real production use.

**Explicitly not counted as new patterns** (already covered by existing primitives, or too app-specific to generalize): `JobCard` composite, `VibeBadge`, `DashboardMetricsHeader` (an application of the existing `KPITile.tsx`, not a new shape), `RecruiterModeToggle` / `PreAppRiskTelemetryToggle` (standard toggle-row-with-description — `Switch.tsx`/`Toggle.tsx` already cover it), `CustomizableDashboardView` / `WidgetLibrarySheet` (app-specific dashboard-editing UI), `MainNavigationSplitView` / `PrimarySidebarView` / `CompactJobNavigationView` (app shell/nav, not a portable design-system component), `TierBadgeIcon` (clean but minor — a parameterized tinted-circle-icon, low priority to formalize on its own).

---

## 2. Token gaps found (not applied — need a decision first)

Both gaps below are the *same* unresolved question from the July audit re-appearing in new code, not two new problems:

- The paywall lock-overlay's `~#B266FF` and the letter-grade badge's raw RGB literals are exactly the kind of ad-hoc color a formal per-app/personalization accent override slot (July audit §2.2) or a `statusSuccess/Caution/Danger` mapping would have prevented. Recommend resolving §2.2 before either gets tokenized — tokenizing them individually now would add a fourth ad-hoc violet value to the pile documented there.

No other new colors, spacing, radius, or motion values were found in this pass — everything else in §1 composes from tokens `tokens.json` already ships.

---

## 3. New platform surface: Live Activities / Dynamic Island

Home-and-lock-screen **widgets are already documented** — `src/app/patterns/mobile-widgets/page.tsx` (641 lines: sizes, content types, layout zones, timeline/refresh, SwiftUI implementation, lock-screen vibrancy, accessibility). JobFlo's widgets (`Shared/Widgets/AnalyticsWidgets.swift`, `ExpansionWidgets.swift`, `JobFloDashboardWidget.swift`, `WidgetRegistry.swift`) aren't cited there as real examples, but that's polish, not a gap.

**Live Activities are genuinely net-new territory** — no mention in Sitka or Sitkaflo. `Extensions/JobFlowWidgets/LiveActivityWidgets.swift` implements two (`InterviewModeLiveActivity`, `DeadlineCountdownLiveActivity`), and both sit **entirely outside the token system**: hardcoded `Color(red:...)` background tints, white/white-opacity text only, no System Materials, no card/glass chrome. This isn't an oversight to fix — ActivityKit's Dynamic Island and lock-screen presentations genuinely can't render the app's normal glass/card chrome, and white-on-tint is the conventional legible pairing over an arbitrary background there. The recommendation is to document the *constraint*, not to force Sitka's normal tokens onto a surface that structurally can't use them.

**App Intents** (`Shared/AppIntents/JobEntity.swift` — a Siri/Shortcuts `AppEntity` + `EntityQuery`) is also net-new but is pure data/architecture, no view code — worth a one-line mention in a platform-integrations doc, not a design-system pattern.

---

## 4. Suggested next steps, in order

1. Add a "blur-behind-lock" variant section to the existing `paywall` pattern page — the pattern (and its VoiceOver fix) is proven in production; no token decision blocks it.
2. Add a `Timeline`/stepper row as a new pattern doc — reusable beyond JobFlo (application journeys, onboarding steps, order tracking).
3. Port `SFColor.accessibleForeground(on:)` into `Sitkaflo/Sources/SitkaFlo/Accessibility/` alongside `SitkaAccessibleColor.swift` — small, self-contained, immediately useful to every app rendering text on a status-color background.
4. Resolve July audit §2.2 (per-app/personalization accent override) before tokenizing either of this pass's violet-accent gaps.
5. New pattern doc for Live Activities, framed around the "can't use normal chrome here" constraint rather than as a token-driven component.
6. Everything from the July 29 audit (§1–3) is still open and unaffected by this pass.
