# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Removed
- The pair of Figma download buttons under the homepage introduction. They repeated the download card directly below it, which keeps both downloads.
- The page, component-set, variable and colour-mode counts from the download card.

## [1.13.0] - 2026-11-21

Resolves the two token decisions from `CROSS_APP_PATTERN_AUDIT_2026-11-21.md` §3.

### Added

#### Tokens
- `color.themes.{light,dark}.status{Success,Warning,Danger,Caution}Text` (`--status-*-text`) — status colors for text and icons. Light-mode fills fail as text on white (1.9–3.8:1); the light text tones (`#047253`, `#a64c08`, `#bf1c1c`, `#b13b0a`) clear 4.5:1 on every light surface and on their own 12% tint. Dark text tones equal the dark fills, which already pass.
- `color.themes.dark.status{Success,Warning,Danger,Caution}` — the dark fills, previously only in CSS, Android and React Native.
- `color.categorical.5–8` (`#4F4FA3`, `#8C3B5E`, `#2F6B66`, `#5E6472`), and `--categorical-1…8` CSS variables. All eight clear 4.5:1 under white text; hues stay clear of the status colors.
- Mirrored in the typed TS tokens, React Native, Android Compose and the ESLint plugin.
- `src/__tests__/color-decisions.test.ts` — enforces every ratio above and that `globals.css` matches `tokens.json`.

#### Docs
- Color: new Status text and Categorical sections, with ratios computed from `tokens.json`.
- Contrast: status text tones and a categorical fill added to Approved Token Pairings.
- Homepage hero: download cards for the Figma library (`.fig`) and Figcraft source (`.figcraft`) with format, size, which app opens each, and whether the file matches the code. Files are served from `public/downloads/`.
- Libraries → Figma: replaces the "coming soon" placeholder with the downloads and setup steps.

### Figma library

- New export of the Figma library (`.fig`) and Figcraft source (`.figcraft`). It now has all 142 variables, adding the 1.13.0 tokens the previous export lacked: status text tones, categorical 5–8, `dangerSolid`, `onDanger`, `accentText` and the `prefers-contrast: more` values. It also fixes `onAccent`, which was white in the old file. `npm run figma:drift` reports 0 missing and 0 mismatched variables, and the documentation pages in the file match this site.
- The download card's export date, page, component-set, variable and version counts, and cover image are read from the `.figcraft` by `scripts/figma/drift.mjs` on every build. To ship a new export, replace the two files in `public/downloads/` and run `npm run generate`.

### 2027 readiness: fix-first items

#### Added
- CI: `.github/workflows/ci.yml` runs on every PR and gates the Pages deploy: type-check, lint, unit tests, Code Connect parse, a stale-generated-files check, and `swift test` on macOS.
- Tokens `onAccent`, `dangerSolid`, `onDanger` (`--on-accent`, `--danger-solid`, `--on-danger`) in both themes and all mirrors, with contrast tests. Primary buttons now use near-black text on the cyan accent (~9.6:1, was ~2.2:1); destructive buttons use `--danger-solid` (6.2:1 light, 4.8:1 dark under white, was 3.8:1).
- `SitkaTokens` Swift package (`Package.swift`, `platforms/swift/`), generated from `tokens.json` by `npm run tokens:build`, with `Color.sitka(\.token)` that follows light/dark. Tested in CI and type-checked for iOS and macOS under Swift 6.
- `platforms/figma/variables.json` (Figma variable collections generated from `tokens.json`) and `scripts/figma/drift.mjs`, which compares them with the downloadable `.figcraft`. The homepage card now lists exactly what the file is missing.
- Code Connect: 11 most-imported components (Button, Input, Badge, Checkbox, Radio, Select, Avatar, CodeBlock, Card, Tabs, Switch) mapped for React (`sitka-ui` imports) and SwiftUI (native SwiftUI + SitkaTokens), checked against the live Figma file. The 26 older mappings had node IDs or property names that don't exist in the file and moved to `.figma/unverified/`.
- `public/llms.txt` and `public/components.json` for coding agents, generated from navigation, page descriptions and component prop types.

### 2027 readiness: Area 2, distribution and versioning

- One version source: `npm version <patch|minor|major>` now syncs `sitka-ui`, React Native and `tokens.json` (`scripts/release/sync-versions.mjs`) and regenerates platform files. `src/__tests__/versions.test.ts` fails if any of them, the lockfile or the Swift tokens disagree. `sitka-ui` moves from 1.3.0 to 1.13.0; the lockfile root from 1.6.0.
- `.github/workflows/release.yml` tags `v<version>` after a merge to main and publishes a GitHub release with notes from `CHANGELOG.md` and the token, Swift and Figma files attached. The tag is what Swift Package Manager resolves.
- The changelog page renders from `CHANGELOG.md` instead of a hand-copied array. 1.7.0, which only existed on the site, is now in `CHANGELOG.md`, and every release has a summary. `src/__tests__/changelog.test.ts` checks order, dates and that the current version has an entry.
- The homepage footer version reads `package.json`.
- `platforms/react-native/package.json` was a JavaScript module, not JSON, so npm couldn't read it; it's now valid JSON.

### 2027 readiness: Area 3, quality gates

- **The site now uses its own tokens.** `ThemeProvider` and the inline script in `layout.tsx` wrote a second, hand-maintained set of colour values inline, which overrode `globals.css`. As a result, the light-theme block (including the 1.13.0 status-text tones) never applied, `prefers-contrast` couldn't work, and tertiary text failed AA in both themes. Theming now sets `data-theme`, and `tokens.json` drives every colour. The docs site's green accent stays as a labelled brand layer at the end of `globals.css`.
- Token `accentText` (`--accent-text`) for accent-coloured text and links, at 4.5:1+ on every surface and on `accentSubtle`. All 753 `text-[rgb(var(--accent))]` uses moved to it. Light `textTertiary` darkened to `rgb(108, 108, 113)` (4.59:1 on the hover surface, was 4.15). Tests now require every text token to clear 4.5:1 on every surface.
- `prefers-contrast: more` support (`color.contrastMore`): secondary and tertiary text rise to 7:1 and borders to 3:1, with tests.
- WCAG 2.2 AA is the stated baseline across the docs. The Accessibility page gains a "New in WCAG 2.2" section mapping each new criterion to Sitka. `scroll-padding-top` keeps focused targets clear of the sticky header (2.4.11).
- Playwright checks in CI, run in the `mcr.microsoft.com/playwright:v1.65.1-noble` image: axe on all 171 pages in light and dark, ratcheted against `e2e/a11y-baseline.json` so new violations fail, plus visual regression on all 60 component pages in both themes (120 baselines). Fixing the shared shell shrank the baseline from 308 to 134 page/scheme entries: preview toggles are now 24 px targets, and code blocks and scrollable tables are focusable regions.
- Stories for Box, Stack, Context Menu, Gauge, KPI Tile and Progress. CI type-checks stories (`tsconfig.stories.json`) and builds Storybook. Fixed a type error in the Toggle group story.

### 2027 readiness: Area 4, token architecture

- `tokens.json` now validates as DTCG: numbers and font weights are JSON numbers, cubic-bézier curves are arrays, shadows are shadow objects, timed motion presets are `transition` tokens that reference the easing curves, and spring presets are groups of `stiffness`/`damping` numbers. Values with no DTCG type (haptics, text transforms) moved to `$extensions`. `src/__tests__/tokens-dtcg.test.ts` checks every token's type, value shape and references.
- Component tier: `src/tokens/components.json` maps Button, Badge, Input, Card and Link parts to theme tokens. `npm run generate` emits `--button-primary-background`-style CSS variables (`src/app/tokens.components.css`) and `SitkaTokens.Component.*` key paths in Swift, and fails on unknown theme tokens.
- Icons: Lucide is the web standard, alongside SF Symbols for native apps. The last two Phosphor uses (Pricing Table, Prompt Input page) moved to Lucide; the Icons page marks Phosphor and Font Awesome as alternatives.
- The Tokens page's export buttons generated a Swift file in the browser from stale values; they now download the generated files.
- OKLCH: every colour in `tokens.json` (including shadow colours) is now a DTCG 2025.10 colour object in OKLCH with an sRGB `hex` fallback, stored at the shortest precision that converts back to the exact same 8-bit colour, so Swift, Figma and contrast results are unchanged. `src/tokens/oklch.mjs` does the conversion for the generators, site and tests. `npm run generate` writes `src/app/tokens.oklch.css`: every theme colour as `--color-*` using `light-dark()`, plus `--status-*-tint` / `--status-*-edge` and `--accent-tint` / `--accent-edge` computed with `color-mix(in oklch, …)`. Tests check the round-trip, the DTCG shape and the generated CSS.
- Badge's success, warning and danger variants used raw Tailwind colours (`emerald-500` text on light surfaces was about 2.5:1). They now use the computed tints with `--status-*-text`.

### 2027 readiness: Area 5, agent readiness

- `packages/mcp`: a dependency-free MCP server with `list_components`, `get_component`, `get_tokens`, `search_docs` and `check_contrast`. It reads the local checkout or the published site. `.mcp.json` registers it for Claude Code in this repo, and `src/__tests__/mcp-server.test.ts` runs the handshake and every tool.
- Raw-colour lint rules for native apps: SwiftLint (`platforms/swift/lint/sitka.swiftlint.yml`) and detekt (`platforms/android-compose/lint/sitka-detekt.yml`), the native counterparts of the ESLint token plugin. `src/__tests__/lint-rules.test.ts` checks the Swift patterns and that the Code Connect SwiftUI templates pass them.
- `llms.txt` points agents at both.

### 2027 readiness: Area 6, governance and adoption

- `CONTRIBUTING.md`: where each kind of change goes, which files are generated, what CI enforces and how to propose a component.
- `docs/DEPRECATION.md`: what counts as breaking, deprecate-in-minor / remove-in-major, a 90-day minimum, and never changing a token's meaning in place. DTCG `$deprecated` on a token now generates a Swift `@available(*, deprecated)`.
- `.github/pull_request_template.md` with the token, contrast, accessibility and changelog checklist.
- `npm run adoption -- <app>`: scans an app's web, Swift and Kotlin source for token references vs raw colours, lists the `sitka-ui` components it imports and the worst files, and can fail CI below a threshold (`--min`). The docs site itself scores 85.9%.
- Repo cleanup: 12 audit reports moved to `docs/audits/` (with an index), 16 one-off Figma scripts and payloads to `scripts/figma/legacy/`. Removed the unused `run-deepseek-cli` dependency.

#### Fixed
- `packages/sitka-ui` imported `../../src/…`, which resolves to a folder that doesn't exist; it now type-checks. `CardHeader`, `CardBody` and `CardFooter` are exported.
- ESLint never loaded the Sitka token plugin (`require` in an ES module); `npm run lint` failed because eslint wasn't installed. Lint now runs with 0 errors.
- Burn Trajectory used `Math.random()` during render (hydration mismatch).
- Token Export's Swift download was a hard-coded snippet with colours that aren't Sitka's; it now serves the generated file. The iOS library page documented an API that didn't exist.

### Changed
- Status-colored text and icons across the site now use `--status-*-text` (KPI Tile, Context Menu and others); fills are unchanged.
- Cover Art and Capacity & Runway use the categorical tokens instead of hard-coded palettes.
- `tokens.json` `meta.version` corrected from 1.9.0 to 1.13.0.
- Sidebar version badge reads `package.json` (via `NEXT_PUBLIC_SITKA_VERSION`) instead of a hard-coded "v1.8".

### Fixed
- Light-mode status text contrast (first flagged for `statusSuccess` in the 2026-07-29 audit).

## [1.12.0] - 2026-11-21

Completes the candidate list from `CROSS_APP_PATTERN_AUDIT_2026-11-21.md` §2. No token changes.

### Added

#### New Components
- **Image Crop** (`/components/image-crop`) — fixed-ratio crop step: drag, pinch, one "Use Photo"; keyboard and VoiceOver alternatives for the gestures (scanflo).

#### New Patterns
- **Map Overlays** — two phase-driven chrome slots over a full-bleed map, one material for all floating surfaces, sheets that keep the map pannable (Get Parked).
- **CarPlay Templates** — list → point-of-interest map → hand-off to a maps app, and the category constraints behind it (Get Parked).
- **Share Card** — fixed 1080×1350 celebration image built only from aggregates, safe to post publicly (JobFlo).
- **Inline Live Check** — advisory, non-blocking feedback beside a form once there's enough input to judge (JobFlo).
- **Rating Prompt Moments** — ask for a rating only after an in-session success moment, once per version (JobFlo).

#### Updated
- **Compensation** — new Negotiation workspace section: counter-offer slider, offered → countered totals, posting-range anchor and an updating script (JobFlo).
- **Command Palette** — "In production" notes from Fractionflo's scoped ⌘K client search.

### Fixed
- `/changelog` page: 1.7.0 was still tagged "Latest" alongside the current release.

## [1.11.0] - 2026-11-21

Cross-app pattern pass over Get Parked, JobFlo, scanflo, Fractionflo and Blackbox 1981: one new component, eight new patterns and a new paywall variant, all built from existing tokens. Closes the open items from the 2026-09-22 JobFlo audit. No token changes; token findings are in CROSS_APP_PATTERN_AUDIT_2026-11-21.md.

### Added

Cross-app pattern pass over Get Parked, JobFlo (since 2026-09-22), scanflo, Fractionflo and Blackbox 1981. Full findings in `CROSS_APP_PATTERN_AUDIT_2026-11-21.md`.

#### New Components
- **Cover Art** (`/components/cover-art`) — natural-aspect artwork with a generated typographic cover when no image exists; tiles share a common baseline (scanflo).

#### New Patterns
- **Decaying Status** — time-decaying confidence for crowdsourced signals, four tiers mapped to status tokens (Get Parked).
- **Community Report & Confirm** — one-tap report picker plus "still there?" confirmation card (Get Parked).
- **Score Explainer** — letter-grade pill with computed black/white foreground and an itemized "why this score" breakdown (JobFlo). Closes the three open items from the 2026-09-22 JobFlo audit (letter-grade badge, accessible foreground, explain drawer).
- **Review Sweep** — guided weekly triage where every row resolves in one tap (JobFlo).
- **Sync Status** — compact/labeled sync indicator with an explicit "stalled" state and a previewable diagnostic report (scanflo + JobFlo).
- **Batch Capture Review** — one capture, many detections, numbered checklist confirmed before saving (scanflo Shelf Scan + JobFlo email import).
- **Capacity & Runway** — bandwidth gauge with an overflow ring, allocation bar with target marker, 30/60/90-day runway tiles (Fractionflo).
- **Game Overlays** — rules for fully themed game UI: no system-alert imitation, photosensitivity-safe pulses, 44pt text actions, purchase clarity (Blackbox 1981).

#### Updated
- **Paywall** — new "soft-limit meter & moment card" variant: a usage meter shown from 50% of a free cap, and a dismissible upsell card triggered by a meaningful in-app event (JobFlo `ConversionViews`).

#### Tooling
- `src/site/docs/PatternDoc.tsx` — shared section primitives (preview, tables, usage grid, source credit) for pattern pages.

## [1.10.0] - 2026-09-22

Kitchen-sink internal QA page, a blur-behind-lock paywall variant, and two new patterns (Journey Timeline, Live Activities) from a JobFlo delta audit — a follow-up pass on ~91 commits since the 1.9.0 ecosystem audit. No token changes this pass; two new ad-hoc accent colors were deliberately left out pending the still-open per-app-accent decision from 1.9.0.

### Added

- `/kitchen-sink` — internal-only live component preview page (Button, Input, Card, Badge, Typography, Layout, Glassmorphism) for visual QA and token verification. Not linked from the sidebar.
- Paywall pattern: "blur-behind-lock" variant — blurs real content behind an unlock CTA instead of a cold interstitial, generalized from JobFlo's `LockedFeaturePreview`. Uses the existing accent token, not a new color.
- New pattern: Journey Timeline — a vertical stepper for linear, ordered processes (application journeys, onboarding steps, order tracking), generalized from JobFlo's `JourneyTimelineRow`.
- New pattern: Live Activities — documents the ActivityKit surface as structurally distinct from WidgetKit's `mobile-widgets` pattern (solid-tint-only chrome, no glass/System Materials, white-on-tint text, the five Dynamic Island/lock-screen regions).

### JobFlo delta audit

Reviewed JobFlo's ~91 commits since the 1.9.0 ecosystem audit for new design-system-relevant patterns. Full findings in `JOBFLO_DELTA_AUDIT_2026-09-22.md`. No token changes applied this pass (nothing safe/judgment-free to add). Headlines:

- Six new reusable patterns found, none yet in Sitka or Sitkaflo: an empty-state template, a paywall "blur behind lock" overlay variant, a letter-grade risk badge, a contrast-aware foreground-color picker utility (complementary to Sitkaflo's existing CVD color substitution), an "explain this score" breakdown drawer, and a timeline/stepper row.
- `color.semantic.ghost` (added in 1.9.0) is now confirmed in production use in JobFlo.
- Live Activities / Dynamic Island are genuinely new territory (unlike home-screen widgets, already documented in `patterns/mobile-widgets`) — recommend documenting them around the constraint that ActivityKit surfaces can't use Sitka's normal glass/card chrome, rather than trying to tokenize them.
- Two new ad-hoc violet accents surfaced (paywall lock CTA, letter-grade badge) — both are the same unresolved per-app accent question from 1.9.0's audit (§2.2), not new problems.

## [1.9.0] - 2026-07-29

Ecosystem audit across all 8 consuming app repos (workflo, Warren, orgflo, Muse, matchflo, JobFlo, invoiceflo, habitflo) and the central SitkaFlo Swift package. New ghost/personalization/categorical color tokens and a restored chipTap motion preset; every finding requiring a design decision — three incompatible motion vocabularies, a light-mode contrast failure, five diverging brand accents, a gap/caution naming collision, and 17 candidate new components — is catalogued in ECOSYSTEM_AUDIT_2026-07-29.md rather than auto-applied.

### Ecosystem audit

Reviewed all eight consuming app repos (`workflo`, `Warren`, `orgflo`, `Muse`, `matchflo`, `JobFlo`, `invoiceflo`, `habitflo`) plus the central `Sitkaflo` Swift package for drift against this design system. Full findings, including items intentionally **not** auto-applied because they need a human decision, are in `ECOSYSTEM_AUDIT_2026-07-29.md`. Headlines:

- Three non-interoperable motion-token vocabularies exist across `tokens.json`, the `SFMotion` dialect (orgflo/JobFlo/matchflo), and the `Sitkaflo` package's own `SitkaAnimationTokens` — needs consolidation.
- `themes.light.statusSuccess` fails WCAG AA against white (≈2.5:1, verified with `src/lib/contrast.ts`); at least two downstream apps (workflo, matchflo) already carry independently-derived, passing light-mode values that Sitka doesn't. Needs a full contrast pass across both theme blocks.
- Five apps pick five different brand accents (cyan, green, violet ×2, spruce) — likely an intentional per-product/personalization pattern rather than drift, but `tokens.json` has no formal override slot for it.
- `matchflo`'s `gap` and Sitka's existing `statusCaution` token likely name the same color differently — needs reconciling before the color-blind-safe status system (matchflo/Sitkaflo) can be adopted.
- `habitflo` and `invoiceflo` each independently built an `MLNudgeBannerView` with incompatible APIs.
- 17 new component/pattern candidates catalogued (Command Palette, Calendar Heatmap, on-device Model Download Status, Flow Layout, Voice Dictation Button, and others) — not yet built, prioritized in the audit doc.

### Added

#### New Token Items
- `--ghost` — muted/stale status color for "gone quiet" signals, distinct from warning/danger (JobFlo pattern). Dark value only; light value pending a contrast pass.
- `color.personalization.{purple,pink,teal}` — light/dark accent pairs for per-item personalization pickers (workflo pattern), completing the set alongside existing brand/semantic colors.
- `color.categorical.{1-4}` — muted, non-semantic qualitative palette for tag/chip differentiation (Warren pattern).

### Fixed
- `motion.presets.chipTap` — announced as added in 1.6.0 but absent from `tokens.json` since; restored as `stiffness 220, damping 65`.

## [1.8.0] - 2026-07-09

Progress Bar, KPI Tile, Gauge, and Context Menu components with new design tokens for progress tracking and typography.

### Added

#### New Components
- **Progress Bar** — Non-interactive progress indicator with 4 variants (default/success/warning/danger), 3 sizes, indeterminate shimmer mode, and specular top-edge highlight
- **KPI Tile** — Dashboard metric card with icon well, bold value, trend delta, and optional progress bar; 5 semantic variants (default/accent/success/warning/danger)
- **Gauge** — 270° arc ring for utilization metrics with automatic color thresholds based on percentage
- **Context Menu** — Glass-backed right-click/long-press menu with actions, separators, keyboard shortcuts, and destructive styling

#### New Token P0-P1 Items
- `--progress-track` — Track background color (rgb(40, 42, 48) dark / rgb(209, 213, 219) light)
- `--progress-success` — Reference to semantic success colour
- `--progress-warning` — Reference to semantic warning colour
- `--progress-danger` — Reference to semantic error colour
- `--brand-user` — Dynamic user-chosen accent override (Warren pattern)
- `--text-micro` — 10px font size for badges and chart labels
- `--text-nano` — 9px font size for axis labels and Gantt annotations
- `--text-display` — 48px large display text (replaces 5xl)

#### Motion Presets
- `sheetEntry` — easeOut 250ms for sheet presentation
- `cardAppear` — easeOut 300ms for card entry
- `dropSpring` — stiffness 300, damping 30 for drop animations
- `progressFill` — stiffness 400, damping 75 for progress animation
- `alluvial` — stiffness 650, damping 82 for chart animations
- `arcRing` — easeOut 400ms for gauge transitions

### Changed
- Typography scale: renamed `3xl` to 28px, `4xl` to 34px, removed `5xl` in favor of `display` at 48px
- Progress tokens now defined in both dark and light theme sections

## [1.7.0] - 2026-07-02

Source alignment: typed TypeScript token layer, design-system umbrella, site/library separation, and a vitest test suite — bringing the web codebase into structural parity with the Swift SitkaTokens convention.

### Added
- Typed token layer — src/design-system/tokens/ with typed TS constants (colors, spacing, typography, motion, radius) mirroring the Swift SitkaTokens namespace
- Glass abstraction — glassSurface() className factory centralising blur/opacity values; Button and Card now consume it instead of inline Tailwind strings
- Motion presets — src/design-system/motion/ with spring(), fadeIn(), scaleIn() constants mirroring SFMotion.press / SFMotion.cardAppear
- Platform hooks — useReducedMotion and usePlatform in src/design-system/hooks/
- Design-system umbrella — src/design-system/index.ts barrel re-exporting tokens, glass, motion, and hooks
- Component barrel — src/components/ui/index.ts named-export barrel for all 43 UI components
- Vitest test suite — 11 tests covering token values, Button rendering, and Card variants; vitest.config.ts with @/ path alias

### Changed
- Website chrome isolated to src/site/ (layout, docs, search, navigation) — no longer co-mingled with the component library under src/components/
- 37 *.figma.tsx Figma Code Connect sidecars relocated from src/components/ui/ to .figma/src/ — eliminating IDE noise and Git conflict risk on every Figma sync
- src/lib/ scoped to library utilities only; navigation.ts moved to src/site/navigation.ts

## [1.6.0] - 2026-06-12

watchOS habit-tracking patterns, Quick Log, Barcode Scanner, GTD Task Inbox, new components (KPI Tile, Arc Gauge, Streak Ring, Payment Progress, Snackbar, Segmented Button Simple) — sourced from habitflo, workflo, scanflo, orgflo, invoiceflo, and JobFlo.

### Added

#### New Components
- **WatchOS Components** — GlowProgressBar, PhaseStripHeader, PhaseBadge for watchOS interfaces (workflo patterns)
- **KPI Tile / StatTile** — SFStatTile component for dashboard metrics with icon, value, label, and trend indicator (JobFlo/Warren pattern)
- **Arc Gauge** — SFArcGauge 270° arc ring for progress indicators with automatic color thresholds (JobFlo pattern)
- **Avatar Group** — SFAvatarGroup for displaying multiple user avatars with overflow indicator
- **Pill Tag** — SFPillTag for compact status/chip displays with optional icon
- **Snackbar** — SitkaSnackbar notification component with icon and error state support (invoiceflo pattern)
- **Segmented Button (Simple)** — SitkaSegmentedButtonSimple for horizontal segmented controls with accessibility traits (invoiceflo pattern)
- **Payment Progress** — PaymentProgressView milestone-based progress indicator with status dots (invoiceflo pattern)
- **Streak Ring** — StreakRingView circular progress with streak count for habit tracking (habitflo pattern)

#### New Patterns
- **WatchOS Habit Tracking** — Complete watchOS patterns for habit tracking including WatchHabitRow, WatchHabitDetailView, WatchComplicationView with WCSession integration (habitflo)
- **Quick Log Pattern** — Sentiment-based quick logging with radial gradient accent, haptic feedback, and markdown-enabled TextEditor (workflo)
- **Davros Connectivity Monitor** — Network health monitoring pill with diagnostic sheet (JobFlo)
- **Glass Card Improvements** — Enhanced glass card modifier for macOS with reduce-transparency guards (Warren)
- **Barcode Scanner** — ScanReticleOverlay with animated sweep line, corner-bracket UI, and cutout backdrop; CaptureCardView bottom-sheet with loading/resolved/failed lookup states and inline metadata editing (scanflo)
- **GTD Task Inbox** — InboxView / TodayView / UpcomingView trio with OFTask / OFProject / OFArea hierarchy, sidebar navigation, and SyncService optimistic-update model (orgflo)

#### Token Updates
- Added watchOS platform to supported platforms list
- Added macOS platform to supported platforms list
- Added phase colors (phase30, phase60, phase90) for 30/60/90 day narrative system
- Added subtle status color variants (successSubtle, warningSubtle, dangerSubtle, infoSubtle)
- Added new motion presets: cardAppear, chipTap, arcRing
- Added progress track color token

#### Navigation
- Added Barcode Scanner and GTD Task Inbox to the "Mobile" patterns group with "New" badges

## [1.5.0] - 2026-06-03

Interview Prep Hub, Ghost Employer Tracking, multi-provider Timesheet Sync, and QR local-network pairing — all sourced from JobFlo v1.5 and Warren's May sprint.

### Added

#### New Pattern Pages
- **Interview Prep Hub** — `InterviewPrepView` with Foundation Models on-device AI streaming (`JobAIService.shared.streamResponse`). Five round types (Technical, Behavioural, System Design, Case, Culture Fit). Three UI states: Loading placeholder, streaming content card with blinking cursor and live ProgressView, and error fallback. Includes iOS 26 entitlement requirements and `isAvailable` availability gate.
- **Ghost Employer Tracking** — Skaro ghost employer system (`SkaroGhostBadge`, `SkaroGhostBanner`, `SkaroContributionToggle`, `SkaroGhostWarningModifier`). Two classification levels: `suspected` (amber/warning) and `confirmedGhost` (red/danger). Privacy section covering App Store Guideline 5.1.1 compliance — only domain name transmitted, never PII.

#### Pattern Enhancements
- **Integration Settings** — added Multi-provider Timesheet Sync section documenting Warren's `TimesheetProvider` protocol, `TimesheetSyncEngine`, and three concrete providers: Clockify (API key), Toggl Track (HTTP Basic), Timely (OAuth Bearer). Covers delete-window sync algorithm, `TimesheetMappingStore` project/member mapping, and `TimesheetSettingsView` segmented-picker UI.
- **Mobile Time Logging** — added Local-network Pairing section documenting Warren's `PairingView` + `QRScannerSheet` (VisionKit `DataScannerViewController`) + `MobilePairingStore`. Dual entry-path design (QR primary, paste-code secondary), camera unavailability fallback, and single-fire scan guard.

#### Navigation
- Added Interview Prep Hub and Ghost Employer Tracking to the "Mobile" patterns group with "New" badges.

## [1.4.0] - 2026-06-02

Voice Memo & Dictation, Interview Email Parser, Document Assembler, and Compensation Take-Home Calculator.

### Added

#### New Pattern Pages
- **Voice Memo & Dictation** — `VoiceMicButton` dual-gesture component (tap for live dictation, hold for audio memo), `AudioMemoListView`, `VoiceDictationService` (on-device SFSpeechRecognizer), and `AudioRecorderService` (AVAudioRecorder → Documents/AudioMemos/). Full SwiftUI implementation with animated recording ring, waveform indicator, and swipe-to-delete playback list.
- **Interview Email Parser** — `InterviewParser` regex + NSDataDetector engine, `InterviewConfirmationSheet` with EKEventStore calendar integration, job-picker with fuzzy match, Share Extension plaintext branch, and `ParseInterviewTextIntent` Siri shortcut. Zero network calls — all parsing on-device.
- **Document Assembler & PDF Export** — `DocumentAssemblerView` block checklist (toggle, reorder, edit), `ResumeExporter` cross-platform PDFKit renderer using CTFramesetter, Sitka accent color headings, A4 layout. iOS uses `ShareLink`; macOS uses `NSSavePanel`.

#### Pattern Enhancements
- **Compensation Breakdown** — added Take-Home Calculator section documenting `TaxBreakdownView` + `TaxCalculatorService` (Crucible engine): on-device 2026 progressive tax brackets for CA (federal + all provinces), AU, GB, SG, and EU (10 countries); live exchange-rate conversion to CAD; breakdown rows for each deduction type.

#### Navigation
- Added Voice Memo, Interview Parser, and Document Assembler to the "Mobile" patterns group with "New" badges.

## [1.3.0] - 2026-05-08

New components, expanded CLI registry, sitka-ui npm package, and Figma library documentation.

### Added

#### New UI Components
- **Layout Primitives** (`Box`, `Stack`, `Inline`) — polymorphic, composable flexbox wrappers with a gap scale.
- **Navigation Menu** — horizontal nav with multi-column hover dropdowns, keyboard navigation, and ARIA `menubar` semantics.
- **Menubar** — desktop-style File/Edit/View menu strip with action items, checkbox toggles, submenus, and separator support.
- **Data Grid** — sortable, filterable table with row selection (indeterminate header checkbox), custom cell renderers, and client-side pagination.

#### New Foundation Pages
- **Density System** — compact / default / comfortable modes via CSS custom property overrides on `[data-density]`.
- **Responsive Grid** — 12-column grid spec across 6 breakpoints (xs–2xl) with column/gutter/margin tables.
- **RTL & Internationalisation** — logical property mapping, physical→logical migration guide, Tailwind v4 cheatsheet.
- **Forced Colors & High Contrast** — Windows High Contrast Mode support, system color keyword reference, per-component rules.
- **Component Lifecycle** — Alpha/Beta/Stable/Deprecated taxonomy, promotion criteria, changelog convention, semver policy.

#### New Pattern Pages
- **Activity Feed** — chronological timeline with type filter chips, connector-line layout, and unread indicators.
- **Multi-select & Bulk Actions** — checkbox grid with indeterminate header, tinted selection rows, and contextual bulk toolbar.

#### Infrastructure
- **CI/CD** — `.github/workflows/deploy.yml` builds the static export and deploys on every push to `main`.
- **Static export** — `next.config.ts` configured with `output: 'export'`, conditional `basePath`, `trailingSlash`, and `images: { unoptimized: true }`.
- **Storybook** — `.storybook/main.ts` + `preview.tsx` configured for Next.js; initial stories for Button, Input, Badge, Switch, Avatar.
- **CLI scaffold** — `packages/cli` with `npx sitka@latest add <component>` command and a 20-component registry.

#### Navigation
- All new foundation, component, and pattern pages added to the sidebar with "New" badges.

## [1.2.0] - 2026-05-08

Eight new components and full documentation for eight previously undocumented components.

### Added
- **New Components (8)**: Collapsible, Pagination, Spinner, Divider, Label, Toggle / Toggle Group, File Upload / Drop Zone, Drawer — each with full doc pages (Preview, States/Sizes, Motion, Implementation, Props, ARIA roles, Keyboard, Accessibility).
- **New Component Pages (8)**: Checkbox, Radio, Select, Switch, Tabs, Textarea, Command Palette, Sidebar — previously undocumented components now have complete reference pages.
- **New Pattern**: Multi-step Wizard — step indicator, validation gating, linear/non-linear navigation with full React and HTML code examples.
- **ARIA roles tables**: Added per-component ARIA role specification tables (Element → Role → Key attributes) to all 13 interactive component pages.
- **Keyboard navigation tables**: Added keyboard interaction model tables to all 13 interactive component pages, covering focus management, activation keys, and dismiss gestures.

## [1.1.0] - 2026-05-08

New components, patterns, and accessibility improvements.

### Added
- **New Components**: Slider (single/range), Date-Time Pickers (calendar/time), Carousel (auto-advancing), and Snackbar (notifications).
- **New Patterns**: Collaboration (presence/sharing), Drag and Drop (kanban/reordering), and Data Entry (validation/wizards).
- **Accessibility**: New Accessibility foundation page documenting WCAG 2.1 Level AA compliance.

### Improved
- **Contrast**: Enhanced text contrast ratios for secondary and tertiary text tokens across both light and dark modes.
- **Accessibility**: Replaced hardcoded grey hex values with semantic tokens for consistent accessibility.

## [1.0.0] - 2026-05-05

Initial public release of Sitka Design System.

### Added
- **17 Component Pages**: Button, Input, Modal, Navigation, Card, Badge, Avatar, Tooltip, Form Controls, Table, Split Button, Segmented Button, Breadcrumb, Combobox, Date Range Picker, Bottom Tab Bar, Bottom Sheet, Chip, Slider, Snackbar, Carousel.
- **17 Foundation Pages**: Color, Contrast, Typography, Spacing, Motion, Interaction, Writing, Data Visualisation, Charting, Glass, Shadows, Border Radius, Empty States, Loading States, AI Agent Standards, Desktop Layout, Keyboard Shortcuts.
- **Multi-platform**: SwiftUI · macOS as a 4th platform tab across all component pages.
- **Token Pipeline**: Design token export pipeline (Style Dictionary) — generates CSS variables, Swift constants, and JSON.
- **Guides**: Library guides for React · Next.js, React · Vite, Tokens Only, iOS · SwiftUI, and macOS · SwiftUI.
- **Figma Integration**: Figma token integration via the Figma Variables API.
- **Styling**: Dark-first color system with CSS custom properties and semantic token naming.
