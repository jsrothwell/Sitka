# Sitka Integration Roadmap: Jobflo & Warren

**Author:** Senior Design Systems Engineer review  
**Date:** 2026-05-06  
**Scope:** Transition both JobFlo (iOS/macOS SwiftUI job-tracking app) and Warren (macOS SwiftUI agency project-management app) to use the Sitka Design System as the single source of truth for tokens, components, and patterns.  
**Method:** Direct analysis of Swift source across 156 JobFlo files and 90 Warren files, cross-referenced against Sitka's documented component library.

---

## 0. Executive Summary

Both apps already share Sitka-compatible design values — warm neutrals, orange brand accent (`#FF6B35`), frosted-glass surfaces, and semantic status colours. Warren even ships its own `DesignSystem.swift` that mirrors Sitka tokens closely. The gap is not in philosophy but in **documentation, reusability, and composability**: a set of data-dense components and complex patterns that each app has implemented independently and which Sitka does not yet codify.

The Liquid Glass aesthetic is already alive in Warren's specular overlays (`sfSpecularTopEdge`, `sfColorStripSheen`, `sfPillSpecular`, `SFBlurView`). Every proposed addition below should be built on these primitives: blur-backed surfaces, specular edge highlights, dimensional shadow tokens, and the 0.97→1.0 scale-fade sheet entry animation.

---

## 1. Core Component Gaps

Components that do not exist in Sitka at all, yet appear in both apps or are required by a critical pattern.

### 1.1 Progress Bar

**Gap:** Sitka documents the Slider component but has no standalone, non-interactive progress indicator.

**Evidence in apps:**
- Warren `BurnForecastView` — budget health per project, `Capsule().fill(sfGreen/sfAmber/sfRed)` over a `sfProgressTrack` track
- Warren `TeamUtilizationSection` — per-member utilization bar
- JobFlo `MacGoalStreakCard` — weekly application goal bar, spring-animated

**Sitka specification:**
- **Track:** `rgb(var(--progress-track))` capsule, 6–8 px height
- **Fill:** semantic colour (success/warning/danger/accent) with `border-radius: pill`
- **Variants:** determinate, indeterminate (shimmer), segmented (milestone markers)
- **Liquid Glass touch:** specular top-edge hairline on the track surface; `transition: width 400ms spring`
- **Tokens needed:** `--progress-track`, `--progress-fill-success`, `--progress-fill-warning`, `--progress-fill-danger`

---

### 1.2 Stat / KPI Tile

**Gap:** No standardised big-number dashboard tile exists in Sitka. Both apps implement their own.

**Evidence in apps:**
- Warren `KPITile` — icon badge (coloured rounded rect) + 22 px bold value + 11 px label, full-width in an HStack grid
- JobFlo `MetricCard` — percentage value with inline mini progress bar, or integer with rounded-digit font

**Sitka specification:**
- **Anatomy:** icon well (44×44, accent-tinted) | value (display/large, monospaced digit) | label | optional trend delta
- **Variants:** numeric, percentage (with mini progress bar), currency
- **Surface:** Card-radius, `sfSurface` background, `sfBorder` hairline, `SFShadow.card`
- **Liquid Glass touch:** `sfSpecularTopEdge` on the icon well; `sfBrandLitSurface` when accent-coloured variant is active

---

### 1.3 Gauge / Arc Ring

**Gap:** Sitka has no gauge or radial progress indicator. Warren uses a 270° arc sweep for team utilization.

**Evidence in apps:**
- Warren `MemberUtilizationCard` — `Circle().trim(from: 0, to: 0.75)` track + filled arc, rotated 135°, coloured by utilization status, animated with `.easeOut(0.4)`

**Sitka specification:**
- **Track:** 270° arc (135° offset), `--progress-track` colour, `lineWidth: 10`, `lineCap: .round`
- **Fill:** status-semantic colour, animated trim
- **Centre label:** percentage value (bold, 13 px) or custom slot
- **Status colours:** `<70%` green, `<90%` amber, `<101%` orange/accent, `>100%` red
- **Liquid Glass touch:** subtle `SFShadow.card` on containing tile; arc track has a `sfSpecularTopEdge`-equivalent inner highlight

---

### 1.4 Avatar Group & Presence Avatar

**Gap:** Sitka documents a single Avatar but has no stacked group or real-time presence variant.

**Evidence in apps:**
- Warren `MemberAvatarView` — initials fallback, coloured background circle, base64 photo support
- Warren `PresenceAvatarView` — dedicated component implying online/offline/away indicator

**Sitka specification:**
- **Avatar Group:** overlapping stack with `-8 px` offset per avatar, `+N` overflow chip, max configurable
- **Presence ring:** 3 px ring in `--status-green/amber/red`, white gap ring behind it
- **Sizes:** 20, 24, 32, 40 px (sm, md, lg, xl); group always uses sm or md
- **Liquid Glass touch:** `sfPillSpecular` equivalent on the avatar circle for photo variants

---

### 1.5 Context Menu

**Gap:** Sitka documents Modal, Tooltip, Snackbar, and Bottom Sheet but has no right-click / long-press context menu.

**Evidence in apps:**
- Warren `TaskBoardView` — `.contextMenu` with "Move to …" actions per status + destructive Delete
- JobFlo — implicit via SwiftUI drag interactions and tap targets

**Sitka specification:**
- **Trigger:** right-click (desktop), long-press (mobile)
- **Anatomy:** floating surface (`sfSurface`, `SFShadow.sheet`), 8 px radius, dividers between groups, destructive item in `sfRed`
- **Keyboard:** arrow navigation, Enter to confirm, Escape to dismiss
- **Liquid Glass touch:** `SFBlurView` equivalent backing surface, `sfSpecularTopEdge` on panel top edge

---

### 1.6 Feature Gate / Paywall

**Gap:** No paywall, upgrade prompt, or pro-locked overlay pattern exists in Sitka.

**Evidence in apps:**
- Warren — `.proLocked(featureLabel:)` view modifier that overlays a blur + upgrade CTA on feature areas
- JobFlo `PaywallView` — full-screen paywall sheet

**Sitka specification:**
- **Inline gate:** semi-transparent blur over the locked content + icon + label + "Upgrade" button
- **Sheet paywall:** full modal with feature highlights, pricing tiers, CTA
- **Tokens:** reuses existing surface/accent tokens; no new tokens needed
- **Liquid Glass touch:** the blur overlay is the glass surface — `SFBlurView(material: .sheet)` with a specular top edge; the upgrade button uses `sfBrandLitSurface`

---

### 1.7 Color Picker (Brand/Theme)

**Gap:** Sitka's Theme Customizer tool exists but the Color Picker as a reusable component is not documented.

**Evidence in apps:**
- Warren — `dataStore.brandColor` hex string, user-selectable via settings; `Color.sfBrand(_:)` tokens resolve at render time

**Sitka specification:**
- **Swatch grid:** predefined palette swatches + hex input field
- **Preview:** live-updates accent-coloured elements in the picker UI
- **Accessibility:** `accessibleForeground(on:)` logic baked in — always shows legible text on the selected colour
- **Liquid Glass touch:** selected swatch gets `sfPillSpecular` specular highlight

---

## 2. Atomic / Pattern Gaps

Higher-order patterns that require multiple components working together and merit dedicated documentation pages.

### 2.1 Kanban Board

**Gap:** Sitka documents a Drag and Drop pattern but has no Kanban-specific pattern. Both apps independently implement identical board layouts with columns, cards, and drop targets.

**Evidence in apps:**
- JobFlo `KanbanView` — `HStack` of `KanbanColumn` views in a horizontal `ScrollView`, `dropDestination` targets, animated column highlight on hover (`isTargeted`), spring animation on drop
- Warren `TaskBoardView` — same structure, adds `.contextMenu` for keyboard-driven status changes, 4 fixed columns (todo/inProgress/inReview/done)

**Pattern specification:**
- **Column header:** icon + uppercase label (tracking 0.8) + count badge (Capsule) + add button
- **Column accent bar:** 1.5 px gradient strip below header (status colour → transparent, left to right)
- **Drop target state:** `columnBorderColor` from `--border-subtle` → `status-color * 0.6`; `columnFill` from `--surface-raised * 0.06` → `status-color * 0.1`
- **Card anatomy:** company logo/avatar | title | metadata row (date, salary/tags) | tag chips (max 2 + overflow)
- **Empty column:** ghost icon + "Drop here" at 32 px vertical padding
- **Animations:** `.spring(response: 0.3, dampingFraction: 0.7)` on drop; `.easeInOut(0.15)` on target state
- **Liquid Glass touch:** column backgrounds use `--surface` with glass blur on macOS; cards use `sfSpecularTopEdge` and `SFShadow.card` → `SFShadow.cardLifted` on hover

---

### 2.2 Gantt / Timeline Chart

**Gap:** Sitka's Charting foundation does not address timeline/Gantt patterns. Warren's `GanttView` is a production-ready implementation.

**Evidence in apps:**
- Warren `GanttView` — sticky label column (228 px), horizontal bar chart scroll area, zoom toolbar (year/quarter/month as segmented control), milestone diamonds, dependency arrows (orthogonal path with arrowhead), today line, alternating month fill grid

**Pattern specification:**
- **Layout:** fixed label column (`labelW: 228`) | scrollable chart area; vertical scroll synced; sticky month header
- **Zoom levels:** Year (2.5 pt/day), Quarter (5 pt/day), Month (12 pt/day) — segmented control in toolbar
- **Grid:** alternating `sfSurface / sfCanvasBackground` month fills; month dividers at 0.5 px `sfBorder * 0.4`
- **Project bar:** rounded rect, track opacity 18%, logged-hours fill at 65%, overdue state adds red stroke
- **Assignment sub-row:** smaller pill bar (45% opacity), indented under parent with expand/collapse chevron
- **Today line:** 2 px brand-coloured capsule
- **Milestone:** rotated 45° square (diamond), colour-coded, tappable
- **Dependency arrows:** orthogonal elbow path, dashed + red when `isAtRisk`, arrowhead at terminus
- **Liquid Glass touch:** label column has `sfSurface` glass backing with blur; toolbar uses `sfCanvasBackground` pill container

---

### 2.3 Alluvial / Sankey Flow Chart

**Gap:** Not documented anywhere in Sitka. JobFlo's "The JobFlo" chart is the primary data visualisation on the iOS analytics screen.

**Evidence in apps:**
- JobFlo `AlluvialChart` — multi-source ribbon chart, custom `Canvas` drawing, bezier curve ribbons with gradient fills, animated entry via `progress: 0 → 1` spring, node separator bars (white 88%)

**Pattern specification:**
- **Data model:** `[source] × [stage]` matrix; sources sorted by total volume descending
- **Node:** 3 px wide capsule, white 88% opacity, centred on stage column
- **Ribbon:** bezier curve from source band at stage N to source band at stage N+1; fill is a vertical linear gradient `sourceColor * 0.78 → 0.52`; top edge stroked at `sourceColor * 0.95`, 0.9 px
- **Stage labels:** status name in status colour (top), count in primary bold (below), tappable 52×topPad hit area
- **Animation:** `progress` scalar scales all band heights from 0; `.spring(response: 0.65, dampingFraction: 0.82).delay(0.05)` on appear
- **Legend:** horizontal scroll of `10×10` colour swatches + source name
- **Liquid Glass touch:** enclosing `.glassCard()` surface; node bars simulate a glass bead with `sfPillSpecular` treatment

---

### 2.4 Burn / Budget Trajectory Chart

**Gap:** Sitka's Charting foundation does not address financial forecasting charts. Warren's `BurnForecastView` is a sophisticated pattern.

**Evidence in apps:**
- Warren `BurnTrajectoryChart` — `Canvas` drawing; historical solid line + area fill; forecast dashed line + faint area; planned pace dotted line; budget ceiling dashed red; today vertical marker; exhaustion dot; X-axis date labels; Y-axis currency labels

**Pattern specification:**
- **Lines:** historical = 2 px solid, status colour; forecast = 1.5 px dashed [5,3], status colour 55%; planned = 1 px dotted [2,3], gray 30%; budget ceiling = 1 px dashed [3,3], red 35%
- **Area fills:** historical = status colour 7%; forecast = status colour 3%
- **Markers:** today dot (6 px, filled, status colour); exhaustion dot (6 px, red); today vertical line (1 px, secondary 35%, dashed [2,2])
- **KPI panel:** exhaustion date + projected-at-end in paired `kpiCard` tiles (icon well + value + sub-label)
- **Burn rate metrics:** 4-column metric tile row (weekly, recent daily, avg daily, planned daily); highlighted tile gets status-colour border
- **Scenario cards:** Optimistic (−20% burn), Current Pace, Pessimistic (+20% burn) — 3-column layout, current pace highlighted
- **Confidence badge:** capsule pill in forecast confidence colour (`Low/Medium/High`)
- **Liquid Glass touch:** chart area has `sfCanvasBackground` + `sfBorder` overlay; metric tiles use the same surface treatment as Stat Tiles

---

### 2.5 Analytics Dashboard Layout

**Gap:** Sitka has no documented pattern for arranging multiple charts, KPI tiles, and tables into a cohesive analytics screen.

**Evidence in apps:**
- Warren `InsightsView` — sticky header with time-range picker, scrollable body, KPI row (4 tiles), 2-column chart+donut row, full-width utilization grid, full-width budget health table
- JobFlo `AnalyticsView` — sticky title, goal streak card, 4-metric row, 2-column chart+breakdown, 2-column time-in-stage+funnel

**Pattern specification:**
- **Sticky header:** 56 px height, view title + time-range `BrandSegmentedControl`, `sfBackground` backing, bottom divider
- **KPI row:** `HStack` of equal-width `KPITile`, gap `SFSpacing.lg`, responsive (collapses to 2-col on narrow)
- **Primary chart zone:** `HStack` with 1 flexible chart + 1 fixed-width companion (300 px for donut, 280 px for breakdown list)
- **Section headers:** 11 px semibold, letter-spacing 0.8, `sfTextTertiary` — consistent with `label-mono` in Sitka
- **Empty states:** `SFEmptyState` inline within each chart tile, not full-page replacement
- **Time range picker:** Segmented Button variant locked to time-granularity options (7 Days / 30 Days / 90 Days / All Time)
- **Liquid Glass touch:** chart tiles use Card surface with `sfSpecularTopEdge`; dashboard container background is `sfBackground` (not surface)

---

### 2.6 Goal / Streak Tracker

**Gap:** No gamification or habit-tracking pattern in Sitka.

**Evidence in apps:**
- JobFlo `MacGoalStreakCard` — weekly progress bar (count / goal, spring animated), current streak counter with flame emoji, longest-streak trophy counter, 3-column layout with dividers

**Pattern specification:**
- **Progress column:** label + `count / goal applications` + animated progress bar (spring 0.5s, dampingFraction 0.75) + goal-met checkmark
- **Streak columns:** emoji (🔥/💤) + large rounded-digit number + unit label; paired with best-streak column
- **Goal-met state:** fill colour transitions from accent → success green
- **Liquid Glass touch:** Card surface with `sfBrandLitSurface` overlay when goal is met

---

### 2.7 Resource Leveling / Team Capacity Grid

**Gap:** No team-capacity or workload visualisation pattern in Sitka.

**Evidence in apps:**
- Warren `TeamUtilizationSection` — `LazyVGrid` of `MemberUtilizationCard` (arc gauge + name + hours logged/capacity + status badge)
- Warren `ResourceLevelingView` — referenced but not read; manages assignments across team members on a timeline

**Pattern specification:**
- **Grid:** `LazyVGrid` responsive (min 5 columns, wraps), `SFSpacing.md` gaps
- **Member card:** Gauge component centred | name (12 semibold) | `Xh / Yh` (10, tertiary) | status badge (Available/Moderate/Near Full/Overloaded)
- **Status thresholds:** `<70%` → success; `<90%` → warning; `<101%` → caution/orange; `>100%` → danger
- **Liquid Glass touch:** each member card uses `sfSurface` + `sfBorder` + `SFShadow.card`; overloaded state adds a `sfRed * 0.1` fill tint

---

### 2.8 Import / Export Pattern

**Gap:** Sitka has no import or export flow. Both apps expose CSV import and data export.

**Evidence in apps:**
- Warren settings reference `ImportExportSettingsView`
- JobFlo has `ImportJobsView`

**Pattern specification:**
- **Import:** file drop zone (dashed border, upload icon, supported formats listed) → progress indicator → results summary (rows imported, skipped, errored)
- **Export:** format picker (CSV / JSON) → field selection checkboxes → download/share trigger
- **Error states:** row-level error list in a scrollable table with line number + reason
- **Liquid Glass touch:** drop zone uses glass surface with `sfSpecularTopEdge`; active drag-over state brightens the surface like `sfBrandLitSurface`

---

### 2.9 Third-Party Integration Settings

**Gap:** Sitka's Settings pattern does not address third-party service connection flows.

**Evidence in apps:**
- Warren — dedicated settings views for Slack, Teams, Harvest, and Sync with `dataStore`

**Pattern specification:**
- **Integration card:** service logo + name + connection status badge (Connected/Disconnected) + action button (Connect/Disconnect/Configure)
- **Auth flow:** "Connect" opens a sheet with OAuth instructions or API key input + test connection button
- **Sync status:** last-synced timestamp + manual sync trigger + sync error inline alert
- **Liquid Glass touch:** integration cards use the standard Card surface; connected state adds a `sfGreen * 0.08` surface tint

---

## 3. App-Specific Requirements

Requirements unique to one app that should still be generalised into Sitka where reusable.

### 3.1 JobFlo-Specific

| Requirement | Current Implementation | Sitka Generalisation |
|---|---|---|
| Glass card system | `.glassCard()` modifier on `GlassTheme` | Formalise as `--surface-glass` token + `.glass-card` utility documented on the Glass foundations page |
| ATS source colour map | `JobSource.color` — 19 platform-specific colours | Document as "External Service Brand Colours" token set (non-semantic, opt-in) |
| Emoji / vibe indicator | `job.vibe` string in Kanban card | Document as "Mood/Vibe Indicator" chip variant using emoji + capsule background |
| Company logo fetch | `CompanyLogoView` with favicon fallback → initials | Generalise as "Brand Logo" component: URL image → placeholder icon → initials fallback chain |
| Goal streak widget | `MacGoalStreakCard` | Covered in §2.6 above |
| Conversion funnel bars | `funnelSteps` horizontal bar list | Covered under Charting foundations as "Horizontal Bar / Funnel" variant |

### 3.2 Warren-Specific

| Requirement | Current Implementation | Sitka Generalisation |
|---|---|---|
| Brand colour customisation | `dataStore.brandColor` hex, `Color.sfBrand(_:)` | Document as "Dynamic Brand Token" pattern in Theme Customizer; add `--brand-user` CSS variable |
| Liquid Glass specular overlays | `sfSpecularTopEdge`, `sfColorStripSheen`, `sfBrandLitSurface`, `sfPillSpecular` | Formalise all four in the Glass foundations page with web equivalents (pseudo-element gradients) |
| Sheet entry animation | `SFSheetEntryModifier` (0.97 → 1.0, 0.25 s ease-out) | Add to Motion foundations as "Panel Rise" token: `--motion-sheet-entry` |
| Presence avatars | `PresenceAvatarView` | Covered in §1.4 above |
| Harvest / Slack / Teams integration | Individual settings views | Covered in §2.9 above |
| `sfReduceTransparency()` guard | `NSWorkspace` accessibility check | Document as accessibility requirement on Glass foundations page; web equivalent: `@media (prefers-reduced-transparency)` |
| WCAG contrast helper | `accessibleForeground(on:)` | Formalise in Contrast foundations as the canonical algorithm; provide a JS/TS utility in the React library |

---

## 4. Implementation Priority

### P0 — Migration Blockers (implement before any Sitka cutover)

These are used on primary screens in both apps. Without them, migrating to Sitka requires maintaining parallel component trees.

| # | Item | Complexity | Notes | Status |
|---|---|---|---|---|
| 1 | **Progress Bar** | Low | Tokens added (v1.8.0); React component created; extends existing Slider docs | ✅ Complete |
| 2 | **Stat / KPI Tile** | Low | Composes Card + Avatar-well + Typography | ✅ Complete |
| 3 | **Avatar Group + Presence** | Medium | Extends existing Avatar docs | ✅ Complete |
| 4 | **Context Menu** | Medium | Needed for task management in Warren | ✅ Complete |
| 5 | **Kanban Board pattern** | Medium | Both apps need this documented | ⏳ |
| 6 | **Glass foundations — specular overlays** | Low | Documentation updated; Warren's sfSpecularTopEdge, sfBrandLitSurface, sfPillSpecular, sfColorStripSheen patterns added | ✅ Complete |

### P1 — High Value (complete within first sprint post-cutover)

These unlock the most distinctive features of each app.

| # | Item | Complexity | Notes | Status |
|---|---|---|---|---|
| 7 | **Gantt / Timeline pattern** | High | Complex layout; Warren's implementation is reference-complete | ⏳ |
| 8 | **Analytics Dashboard pattern** | Medium | Composition of already-defined components | ⏳ |
| 9 | **Burn Trajectory Chart** | High | Canvas-based; Warren's `BurnTrajectoryChart` is reference | ⏳ |
| 10 | **Gauge / Arc Ring** | Medium | Extends Progress Bar; needed for utilization cards | ✅ Complete |
| 11 | **Feature Gate / Paywall** | Low | View modifier pattern; reuses surface tokens | ⏳ |
| 12 | **`--dynamic-brand` token + Theme Customizer** | Medium | Warren's user-selectable accent | ✅ Complete |

### P2 — Differentiating (complete in second sprint)

| # | Item | Complexity | Notes |
|---|---|---|---|
| 13 | **Alluvial / Sankey Flow** | High | Canvas-only; JobFlo is reference |
| 14 | **Goal / Streak Tracker** | Low | Composition of Progress Bar + Avatar + Badge |
| 15 | **Resource / Team Capacity Grid** | Medium | Composition of Gauge + Card |
| 16 | **Import / Export pattern** | Medium | Extends Form + Loading States |
| 17 | **WCAG contrast utility** | Low | JS/TS port of Warren's `accessibleForeground(on:)` |

### P3 — Polish & Completeness (backlog)

| # | Item | Complexity | Notes |
|---|---|---|---|
| 18 | **Third-party Integration Settings** | Medium | Mostly documentation + Card composition |
| 19 | **Color Picker** | Medium | Needed for brand customisation flow |
| 20 | **Company / Brand Logo component** | Low | JobFlo-specific but generalises to any app with external entities |
| 21 | **Emoji / Vibe Indicator** | Low | Chip variant; document as a recipe |
| 22 | **`sfReduceTransparency` web equivalent** | Low | One media query; add to Glass page |

---

## 5. Token Delta (v1.8.0)

New or modified design tokens required to support the above work. All new tokens follow Sitka's existing naming convention.

### Implemented Tokens (v1.8.0)

```
--progress-track          /* Added to themes.dark/light: rgb(40, 42, 48) / rgb(209, 213, 219) */
--progress-success        /* Reference to --semantic-success (#22c55e) */
--progress-warning        /* Reference to --semantic-warning (#f59e0b) */
--progress-danger         /* Reference to --semantic-error (#ef4444) */
--brand-user              /* Dynamic user-chosen accent (Warren pattern) */
--text-micro            /* 10px - badge and chart labels */
--text-nano             /* 9px - axis labels, Gantt annotations */
--typography-display      /* 48px - large display text */
--shadow-card           /* 0 2px 12px rgba(0,0,0,0.10) */
--shadow-card-lifted    /* 0 4px 18px rgba(0,0,0,0.14) */
--shadow-sheet          /* 0 8px 28px rgba(0,0,0,0.20) */
```

### Glass Specular Overlays (CSS)

```
--glass-specular-top-edge    /* 1px white hairline, 28% opacity — Warren sfSpecularTopEdge */
--glass-brand-lit-surface    /* White gradient sheen, 15% opacity — Warren sfBrandLitSurface */
--glass-pill-specular        /* Radial highlight on pill/badge surfaces */
--glass-color-strip-sheen    /* Linear gradient sheen on colored strips */
```

Motion presets added:
```
sheetEntry: easeOut 250ms
cardAppear: easeOut 300ms
dropSpring: stiffness 300, damping 30
progressFill: stiffness 400, damping 75
alluvial: stiffness 650, damping 82
arcRing: easeOut 400ms
```

### Modified Tokens

```
--accent        /* should accept --brand-user override when set */
--accent-subtle /* tinted surface for active states; verify against user brand colour for contrast */
```

### Font Scale Alignment

Warren's `SFFont` scale maps to Sitka's existing type scale but introduces two sizes Sitka doesn't document:

| Warren token | Size | Sitka equivalent |
|---|---|---|
| `largeTitle` | 24 bold | Add as `--text-display` |
| `micro` | 10 semibold | Add as `--text-micro` (used for badges, chart labels) |
| `nano` | 9 medium | Add as `--text-nano` (used for axis labels, Gantt annotations) |

---

*This document should be treated as a living spec. Update §4 priorities after each sprint retrospective as components ship.*
