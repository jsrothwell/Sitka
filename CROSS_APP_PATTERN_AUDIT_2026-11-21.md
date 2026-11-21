# Cross-App Pattern Audit — 2026-11-21

**Scope:** Get Parked, JobFlo (68 commits since `JOBFLO_DELTA_AUDIT_2026-09-22.md`), scanflo (Gather), Fractionflo, Blackbox 1981. Looked for reusable UI patterns that Sitka doesn't document yet, built the strongest ones as doc pages, and listed the rest below.

Same rule as earlier audits: **no changes to `tokens.json`.** Every new page uses existing tokens. Token-level findings are in §3 and need a decision first.

---

## 1. Built in this pass

| Page | Source | Notes |
|---|---|---|
| `/patterns/decaying-status` | Get Parked `DecayEngine.swift`, `SegmentDetailView.swift` | Get Parked's raw hex tiers (`#D32F2F/#F57C00/#FBC02D/#388E3C`) mapped onto `status-danger/caution/warning/success`. Server and client must share one decay function, kept in sync by a fixture test. |
| `/patterns/community-reports` | Get Parked `TrafficViews.swift` | Report picker + "still there?" confirm card + detail sheet. |
| `/patterns/score-explainer` | JobFlo `GhostRiskBadge`, `GhostRiskPill`, `ListingCheckCard` | Closes the three remaining items from the 2026-09-22 JobFlo audit. Also documents Fractionflo's separate `color`/`textColor` per status, which solves the same contrast problem. |
| `/patterns/review-sweep` | JobFlo `WeeklyReviewSheet.swift` | |
| `/patterns/sync-status` | scanflo `SyncStatusView`/`LLMStatusView`, JobFlo `DiagnosticReportSheet`, `SyncRepairCoverView` | The "stalled" state comes from a real JobFlo bug: sync status stuck on "Syncing". |
| `/patterns/batch-capture-review` | scanflo `ShelfScanView.swift`, JobFlo `EmailStatusImportSheet.swift` | |
| `/patterns/capacity-runway` | Fractionflo `CapacityOverviewCard.swift`, `CapacityEngine.swift` | Complements Team Capacity Grid (many people) and Gauge. The thresholds deliberately differ from Gauge's: low utilization is a prompt to sell, not a success. |
| `/patterns/game-overlays` | Blackbox 1981 `GameOverView`, `PaywallView`, `MainMenuView` | Treated like Live Activities: a surface where Sitka's own colors and chrome don't belong, so the page documents the rules that still apply. |
| `/components/cover-art` | scanflo `CoverArt.swift`, `ThumbnailCropView.swift` | |
| Paywall: soft-limit meter & moment card | JobFlo `ConversionViews.swift` (`FreeJobsMeter`, `GhostMomentCard`) | New variant section on the existing page. |

## 2. Found but not built (candidates, by priority)

1. **Map overlay chrome** (Get Parked `ContentView`, `TripViews`): a floating "Where to?" search bar, top and bottom overlay areas built with `safeAreaInset`, a trip card, a maneuver banner, a "better spot" heads-up banner, and a status legend. Worth a `patterns/map-overlays` page.
2. **Privacy-safe share card** (JobFlo `SearchRecapCard.swift`): a fixed-size branded image rendered off-screen. It deliberately leaves out company names so it's safe to post publicly. Could live in Collaboration & Sharing.
3. **Inline live check** (JobFlo `ListingCheckCard.swift`): plain-language warnings shown while someone types, staying silent below a minimum amount of text. Partly covered in Score Explainer; could become its own Form Validation variant.
4. **CarPlay parking templates** (Get Parked `docs/carplay.md`, `CarPlayParkingCoordinator.swift`): `CPPointOfInterestTemplate` (up to 12 POIs) plus a hand-off to Maps for directions. Platform-integration doc, low priority.
5. **Negotiation workspace** (JobFlo `NegotiationCard.swift`): a counter-offer slider showing year-one and annual totals, plus a script to adapt. Could extend `patterns/compensation`.
6. **Review-prompt moments** (JobFlo `ReviewMomentObserver`): ask for an App Store rating only at happy moments that happen while the app is open, at most once per version. Belongs in a growth/lifecycle doc.
7. **Fixed-aspect crop** (scanflo `ThumbnailCropView`): mentioned under Cover Art; not a standalone page yet.
8. **Fractionflo `⌘K` QuickSearchView**: already covered by `components/command-palette`. Only worth adding as a real-world example.

## 3. Token findings (not applied, need a decision)

- **Status text tone vs. fill tone.** Fractionflo keeps a separate `textColor` per status because yellow and light-blue *text* fail WCAG on white. JobFlo solved the same problem the other way: it computes black or white text for whatever sits on a status fill. Sitka has no `status-*-text` tokens. Recommend adding light-theme text variants of each status color, in the same contrast pass the 2026-07-29 audit already requested for `statusSuccess`.
- **Categorical palette.** The new Cover Art page reads `--categorical-1…4`, with fallbacks. `color.categorical.*` exists in `tokens.json` (added in 1.9.0), but `globals.css` doesn't expose it as CSS variables. Fractionflo's `segmentColors` and scanflo's per-media-type badge tints are both further ad-hoc categorical palettes. Exposing the tokens in CSS would let all three converge.
- **Hard-coded hex values** in Get Parked (occupancy tiers, the `#1E63D6` lot blue, route blue `#2F7BF6`, brand navy `#13294B`) and in Fractionflo's `Theme.unallocated`. These are the same per-app accent question as July audit §2.2.
- **Game palettes stay local.** Blackbox 1981's neon `Palette` should *not* be tokenized (see the Game Overlays page).

## 4. Validated, not new

- `color.semantic.ghost` is still in use in JobFlo (Weekly Review and the moment card both rely on ghost state).
- JobFlo's `EmptyStateView`, flagged in September, is covered by `foundations/empty-states`.
