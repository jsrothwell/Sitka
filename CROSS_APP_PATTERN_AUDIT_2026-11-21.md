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

## 2. Found in the first pass, built in 1.12.0

All eight candidates from the first pass are now documented:

| Candidate | Source | Now at |
|---|---|---|
| Map overlay chrome | Get Parked `ContentView`, `TripViews` | `/patterns/map-overlays` |
| Privacy-safe share card | JobFlo `SearchRecapCard.swift` | `/patterns/share-card` |
| Inline live check | JobFlo `ListingCheckCard.swift` | `/patterns/live-check` |
| CarPlay parking templates | Get Parked `CarPlayParkingCoordinator.swift`, `docs/carplay.md` | `/patterns/carplay` |
| Negotiation workspace | JobFlo `NegotiationCard.swift` | Section on `/patterns/compensation` |
| Review-prompt moments | JobFlo `ReviewMomentObserver`, `ReviewService` | `/patterns/rating-prompt` |
| Fixed-aspect crop | scanflo `ThumbnailCropView.swift` | `/components/image-crop` |
| Scoped ⌘K search | Fractionflo `QuickSearchView.swift` | "In production" section on `/components/command-palette` |

## 3. Token findings

### Resolved in 1.13.0

- **Status text tone vs. fill tone.** ✅ Added `status{Success,Warning,Danger,Caution}Text` to both themes (`--status-*-text` in CSS). Light-mode fills measured 1.9–3.8:1 as text on white; the new light text tones are the fills darkened in linear light just until they clear 4.5:1 on every light surface (surface, surfaceRaised, background, surfaceHover) *and* on their own 12% tint (status pills): `#047253`, `#a64c08`, `#bf1c1c`, `#b13b0a`. Dark-mode fills already clear 5.8:1 or better everywhere, so the dark text tones equal the fills. Also added the dark-theme status fills to `tokens.json`, which until now existed only in CSS, Android and React Native. Site text that used status fills now uses the text tones; fills are unchanged. This also closes the light-mode `statusSuccess`-as-text failure from the 2026-07-29 audit. JobFlo's computed black/white foreground stays the rule for text *on* a fill.
- **Categorical palette.** ✅ Exposed as `--categorical-1…8` and extended from 4 to 8 so Fractionflo's 8 client segments fit. New values `#4F4FA3`, `#8C3B5E`, `#2F6B66`, `#5E6472` follow scanflo's rule (≥ 4.5:1 under white; all eight are 5.8–14.1:1) and Fractionflo's (hues clear of the status colors). Cover Art and Capacity & Runway now use the tokens instead of hard-coded palettes. Added to Android (`Categorical1…8`), React Native (`categorical1…8`) and the ESLint plugin.
- Both decisions are enforced by `src/__tests__/color-decisions.test.ts`, which checks every ratio above and that `globals.css` matches `tokens.json`.

### Still open
- **Hard-coded hex values** in Get Parked (occupancy tiers, the `#1E63D6` lot blue, route blue `#2F7BF6`, brand navy `#13294B`) and in Fractionflo's `Theme.unallocated`. These are the same per-app accent question as July audit §2.2.
- **Game palettes stay local.** Blackbox 1981's neon `Palette` should *not* be tokenized (see the Game Overlays page).

## 4. Validated, not new

- `color.semantic.ghost` is still in use in JobFlo (Weekly Review and the moment card both rely on ghost state).
- JobFlo's `EmptyStateView`, flagged in September, is covered by `foundations/empty-states`.
