# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.8.0] - 2026-07-09

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

## [1.6.0] - 2026-06-12

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

### Added
- **New Components (8)**: Collapsible, Pagination, Spinner, Divider, Label, Toggle / Toggle Group, File Upload / Drop Zone, Drawer — each with full doc pages (Preview, States/Sizes, Motion, Implementation, Props, ARIA roles, Keyboard, Accessibility).
- **New Component Pages (8)**: Checkbox, Radio, Select, Switch, Tabs, Textarea, Command Palette, Sidebar — previously undocumented components now have complete reference pages.
- **New Pattern**: Multi-step Wizard — step indicator, validation gating, linear/non-linear navigation with full React and HTML code examples.
- **ARIA roles tables**: Added per-component ARIA role specification tables (Element → Role → Key attributes) to all 13 interactive component pages.
- **Keyboard navigation tables**: Added keyboard interaction model tables to all 13 interactive component pages, covering focus management, activation keys, and dismiss gestures.

## [1.1.0] - 2026-05-08

### Added
- **New Components**: Slider (single/range), Date-Time Pickers (calendar/time), Carousel (auto-advancing), and Snackbar (notifications).
- **New Patterns**: Collaboration (presence/sharing), Drag and Drop (kanban/reordering), and Data Entry (validation/wizards).
- **Accessibility**: New Accessibility foundation page documenting WCAG 2.1 Level AA compliance.

### Improved
- **Contrast**: Enhanced text contrast ratios for secondary and tertiary text tokens across both light and dark modes.
- **Accessibility**: Replaced hardcoded grey hex values with semantic tokens for consistent accessibility.

## [1.0.0] - 2026-05-05

### Added
- **17 Component Pages**: Button, Input, Modal, Navigation, Card, Badge, Avatar, Tooltip, Form Controls, Table, Split Button, Segmented Button, Breadcrumb, Combobox, Date Range Picker, Bottom Tab Bar, Bottom Sheet, Chip, Slider, Snackbar, Carousel.
- **17 Foundation Pages**: Color, Contrast, Typography, Spacing, Motion, Interaction, Writing, Data Visualisation, Charting, Glass, Shadows, Border Radius, Empty States, Loading States, AI Agent Standards, Desktop Layout, Keyboard Shortcuts.
- **Multi-platform**: SwiftUI · macOS as a 4th platform tab across all component pages.
- **Token Pipeline**: Design token export pipeline (Style Dictionary) — generates CSS variables, Swift constants, and JSON.
- **Guides**: Library guides for React · Next.js, React · Vite, Tokens Only, iOS · SwiftUI, and macOS · SwiftUI.
- **Figma Integration**: Figma token integration via the Figma Variables API.
- **Styling**: Dark-first color system with CSS custom properties and semantic token naming.
