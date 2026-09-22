import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";

export const metadata: Metadata = { title: "Changelog" };

const RELEASES = [
  {
    version: "1.10.0",
    date: "2026-09-22",
    tag: "Latest",
    summary: "Kitchen-sink internal QA page, a blur-behind-lock paywall variant, and two new patterns (Journey Timeline, Live Activities) from a JobFlo delta audit — a follow-up pass on ~91 commits since the 1.9.0 ecosystem audit. No token changes this pass; two new ad-hoc accent colors were deliberately left out pending the still-open per-app-accent decision from 1.9.0.",
    sections: [
      {
        label: "Added",
        items: [
          "/kitchen-sink — internal-only live component preview page (Button, Input, Card, Badge, Typography, Layout, Glassmorphism); not linked from the sidebar",
          "Paywall pattern: blur-behind-lock variant, generalized from JobFlo's LockedFeaturePreview, using the existing accent token",
          "New pattern: Journey Timeline — vertical stepper for linear, ordered processes",
          "New pattern: Live Activities — documents the ActivityKit surface as structurally distinct from mobile-widgets (solid-tint-only chrome, no glass/System Materials)",
        ],
      },
      {
        label: "Documented (not yet applied)",
        items: [
          "Six new reusable patterns found in JobFlo, catalogued in JOBFLO_DELTA_AUDIT_2026-09-22.md",
          "Two new ad-hoc violet accents (paywall lock CTA, letter-grade risk badge) — same unresolved per-app accent question as 1.9.0's audit, not new problems",
        ],
      },
    ],
  },
  {
    version: "1.9.0",
    date: "2026-07-29",
    tag: "",
    summary: "Ecosystem audit across all 8 consuming app repos (workflo, Warren, orgflo, Muse, matchflo, JobFlo, invoiceflo, habitflo) and the central SitkaFlo Swift package. New ghost/personalization/categorical color tokens and a restored chipTap motion preset; every finding requiring a design decision — three incompatible motion vocabularies, a light-mode contrast failure, five diverging brand accents, a gap/caution naming collision, and 17 candidate new components — is catalogued in ECOSYSTEM_AUDIT_2026-07-29.md rather than auto-applied.",
    sections: [
      {
        label: "Added",
        items: [
          "Token: --ghost — muted/stale status color for \"gone quiet\" signals, distinct from warning/danger (JobFlo pattern)",
          "Token: color.personalization.{purple,pink,teal} — light/dark accent pairs for per-item personalization pickers (workflo pattern)",
          "Token: color.categorical.{1-4} — muted, non-semantic qualitative palette for tag/chip differentiation (Warren pattern)",
        ],
      },
      {
        label: "Fixed",
        items: [
          "motion.presets.chipTap — announced as added in 1.6.0 but absent from tokens.json since; restored as stiffness 220, damping 65",
        ],
      },
      {
        label: "Documented (not yet applied)",
        items: [
          "Three non-interoperable motion-token vocabularies across tokens.json, the SFMotion dialect, and the SitkaFlo package's own SitkaAnimationTokens",
          "themes.light.statusSuccess fails WCAG AA (~2.5:1 against white) — workflo and matchflo already carry independently-derived, passing values",
          "Five apps use five different brand accents with no formal override token to codify the pattern",
          "matchflo's \"gap\" color and Sitka's existing statusCaution token likely name the same color differently",
          "habitflo and invoiceflo each independently built an MLNudgeBannerView with incompatible APIs",
          "17 candidate components catalogued: Command Palette, Calendar Heatmap, on-device Model Download Status, Flow Layout, Voice Dictation Button, and more",
        ],
      },
    ],
  },
  {
    version: "1.8.0",
    date: "2026-07-09",
    tag: "",
    summary: "Progress Bar, KPI Tile, Gauge, and Context Menu components with new design tokens for progress tracking and typography.",
    sections: [
      {
        label: "Added",
        items: [
          "Progress Bar component — non-interactive progress indicator with 4 variants, 3 sizes, indeterminate shimmer mode, and specular top-edge highlight",
          "KPI Tile component — dashboard metric card with icon well, bold value, trend delta, and optional progress bar; 5 semantic variants",
          "Gauge component — 270° arc ring for utilization metrics with automatic color thresholds based on percentage",
          "Context Menu component — glass-backed right-click/long-press menu with actions, separators, keyboard shortcuts, and destructive styling",
          "New tokens: --progress-track, --progress-success, --progress-warning, --progress-danger, --brand-user",
          "New typography tokens: --text-micro (10px), --text-nano (9px), --text-display (48px)",
          "New motion presets: sheetEntry, cardAppear, dropSpring, progressFill, alluvial, arcRing",
        ],
      },
    ],
  },
  {
    version: "1.7.0",
    date: "2026-07-02",
    tag: "Latest",
    summary: "Source alignment: typed TypeScript token layer, design-system umbrella, site/library separation, and a vitest test suite — bringing the web codebase into structural parity with the Swift SitkaTokens convention.",
    sections: [
      {
        label: "Added",
        items: [
          "Typed token layer — src/design-system/tokens/ with typed TS constants (colors, spacing, typography, motion, radius) mirroring the Swift SitkaTokens namespace",
          "Glass abstraction — glassSurface() className factory centralising blur/opacity values; Button and Card now consume it instead of inline Tailwind strings",
          "Motion presets — src/design-system/motion/ with spring(), fadeIn(), scaleIn() constants mirroring SFMotion.press / SFMotion.cardAppear",
          "Platform hooks — useReducedMotion and usePlatform in src/design-system/hooks/",
          "Design-system umbrella — src/design-system/index.ts barrel re-exporting tokens, glass, motion, and hooks",
          "Component barrel — src/components/ui/index.ts named-export barrel for all 43 UI components",
          "Vitest test suite — 11 tests covering token values, Button rendering, and Card variants; vitest.config.ts with @/ path alias",
        ],
      },
      {
        label: "Changed",
        items: [
          "Website chrome isolated to src/site/ (layout, docs, search, navigation) — no longer co-mingled with the component library under src/components/",
          "37 *.figma.tsx Figma Code Connect sidecars relocated from src/components/ui/ to .figma/src/ — eliminating IDE noise and Git conflict risk on every Figma sync",
          "src/lib/ scoped to library utilities only; navigation.ts moved to src/site/navigation.ts",
        ],
      },
    ],
  },
  {
    version: "1.6.0",
    date: "2026-06-12",
    tag: "",
    summary: "watchOS habit-tracking patterns, Quick Log, Barcode Scanner, GTD Task Inbox, new components (KPI Tile, Arc Gauge, Streak Ring, Payment Progress, Snackbar, Segmented Button Simple) — sourced from habitflo, workflo, scanflo, orgflo, invoiceflo, and JobFlo.",
    sections: [
      {
        label: "Added",
        items: [
          "New Component: WatchOS Components — GlowProgressBar, PhaseStripHeader, PhaseBadge for watchOS interfaces (workflo)",
          "New Component: KPI Tile / StatTile — SFStatTile with icon, value, label, and trend indicator (JobFlo/Warren)",
          "New Component: Arc Gauge — SFArcGauge 270° arc ring with automatic color thresholds (JobFlo)",
          "New Component: Snackbar — SitkaSnackbar with icon and error state support (invoiceflo)",
          "New Component: Segmented Button (Simple) — SitkaSegmentedButtonSimple for horizontal segmented controls (invoiceflo)",
          "New Component: Payment Progress — PaymentProgressView milestone-based indicator with status dots (invoiceflo)",
          "New Component: Streak Ring — StreakRingView circular progress with streak count (habitflo)",
          "New Pattern: WatchOS Habit Tracking — WatchHabitRow, WatchComplicationView with WCSession integration (habitflo)",
          "New Pattern: Quick Log — Sentiment-based quick logging with radial gradient accent and haptic feedback (workflo)",
          "New Pattern: Davros Connectivity Monitor — Network health monitoring pill with diagnostic sheet (JobFlo)",
          "New Pattern: Barcode Scanner — ScanReticleOverlay (animated sweep line, corner brackets, cutout backdrop) + CaptureCardView bottom-sheet with loading/resolved/failed states (scanflo)",
          "New Pattern: GTD Task Inbox — InboxView / TodayView / UpcomingView with OFTask / OFProject / OFArea hierarchy and SyncService (orgflo)",
          "Token: phase colors (phase30, phase60, phase90), subtle status variants, new motion presets, progress track token",
        ],
      },
    ],
  },
  {
    version: "1.5.0",
    date: "2026-06-03",
    tag: "",
    summary: "Interview Prep Hub, Ghost Employer Tracking, multi-provider Timesheet Sync, and QR local-network pairing — all sourced from JobFlo v1.5 and Warren's May sprint.",
    sections: [
      {
        label: "Added",
        items: [
          "New Pattern: Interview Prep Hub — on-device AI streaming via Foundation Models (iOS 26+), five round types, streaming content card with live cursor",
          "New Pattern: Ghost Employer Tracking — Skaro suspected/confirmed ghost classifications with badge, expandable banner, 14-day follow-up CTA, and contribution toggle",
          "Integration Settings: Multi-provider Timesheet Sync section — TimesheetProvider protocol, TimesheetSyncEngine, Clockify / Toggl Track / Timely providers with delete-window sync algorithm",
          "Mobile Time Logging: Local-network Pairing section — PairingView, QRScannerSheet (VisionKit DataScannerViewController), MobilePairingStore with Bonjour handshake",
          "Navigation: Interview Prep Hub and Ghost Employer Tracking added to the Mobile patterns group",
        ],
      },
    ],
  },
  {
    version: "1.4.0",
    date: "2026-06-02",
    summary: "Voice Memo & Dictation, Interview Email Parser, Document Assembler, and Compensation Take-Home Calculator.",
    sections: [
      {
        label: "Added",
        items: [
          "New Pattern: Voice Memo & Dictation — VoiceMicButton dual-gesture (tap for live dictation, hold for audio memo), AudioMemoListView, VoiceDictationService (SFSpeechRecognizer), AudioRecorderService (AVAudioRecorder)",
          "New Pattern: Interview Email Parser — InterviewParser regex + NSDataDetector engine, InterviewConfirmationSheet with EKEventStore, Share Extension, and ParseInterviewTextIntent Siri shortcut",
          "New Pattern: Document Assembler & PDF Export — block checklist, ResumeExporter cross-platform PDFKit renderer, A4 layout, ShareLink / NSSavePanel",
          "Compensation Breakdown: Take-Home Calculator — TaxBreakdownView + TaxCalculatorService with 2026 progressive brackets for CA, AU, GB, SG, and 10 EU countries",
        ],
      },
    ],
  },
  {
    version: "1.3.0",
    date: "2026-05-09",
    tag: "",
    summary: "New components, expanded CLI registry, sitka-ui npm package, and Figma library documentation.",
    sections: [
      {
        label: "Added",
        items: [
          "New Components: Box, Stack (layout primitives), Navigation Menu, Menubar, Data Grid",
          "New Foundation Pages: Density System, Responsive Grid, RTL & i18n, Forced Colors, Component Lifecycle, Gestures, Haptics, Spatial Computing",
          "New Patterns: Activity Feed, Multi-select & Bulk Actions, Kanban Board, Gantt / Timeline, Analytics Dashboard, Chat & Conversation",
          "Figma library documentation — variables, Code Connect mappings, component reference, and workflow guide",
          "sitka-ui npm package — dual CJS/ESM build with full TypeScript types and a separate tokens entry point",
          "CLI registry expanded to 35 components with aliases (npx @sitka/cli add <component>)",
          "iOS SwiftUI ThemeManager how-to guide",
          "macOS SwiftUI library guide",
          "React Native and Android Compose library guides",
        ],
      },
    ],
  },
  {
    version: "1.2.0",
    date: "2026-05-08",
    summary: "Eight new components and full documentation for eight previously undocumented components.",
    sections: [
      {
        label: "Added",
        items: [
          "New Components: Collapsible, Pagination, Spinner, Divider, Label, Toggle / Toggle Group, File Upload / Drop Zone, Drawer",
          "New Component Pages: Checkbox, Radio, Select, Switch, Tabs, Textarea, Command Palette, Sidebar",
          "New Pattern: Multi-step Wizard with step indicator and validation gating",
          "ARIA roles tables and keyboard interaction model tables across all interactive component pages",
          "New Foundation Pages: Accessibility (WCAG 2.1 AA), Contrast, Icons, Gestures, Haptics, Keyboard Shortcuts",
        ],
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2026-05-08",
    summary: "New components, patterns, and accessibility improvements.",
    sections: [
      {
        label: "Added",
        items: [
          "New Components: Slider (single/range), Date-Time Pickers, Date Range Picker, Carousel, Snackbar",
          "New Patterns: Collaboration & Sharing, Drag and Drop, Data Entry",
          "New Foundation: Accessibility page documenting WCAG 2.1 Level AA compliance",
        ],
      },
      {
        label: "Improved",
        items: [
          "Enhanced text contrast ratios for secondary and tertiary text tokens across light and dark modes",
          "Replaced hardcoded colour values with semantic tokens for consistent accessibility",
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-05-05",
    summary: "Initial public release of Sitka Design System.",
    sections: [
      {
        label: "Added",
        items: [
          "21 component pages: Button, Input, Modal, Navigation, Card, Badge, Avatar, Tooltip, Table, Split Button, Segmented Button, Breadcrumb, Combobox, Bottom Tab Bar, Bottom Sheet, Chip, OTP / PIN, Prompt Input, Code Block, Chat Message, Streaming Text",
          "17 foundation pages: Color, Typography, Spacing, Motion, Interaction, Writing, Data Visualisation, Charting, Glass, Shadows, Border Radius, Empty States, Loading States, AI Agent Standards, Desktop Layout, Keyboard Shortcuts, Spatial Computing",
          "Multi-platform: SwiftUI · iOS and SwiftUI · macOS code samples across all component pages",
          "Design token pipeline — CSS variables, Swift constants, and JSON export (W3C DTCG format)",
          "Library guides: React · Next.js, React · Vite, Tokens Only, iOS · SwiftUI, macOS · SwiftUI",
          "Figma token integration via the Figma Variables API",
          "Dark-first colour system with CSS custom properties and semantic token naming",
        ],
      },
    ],
  },
];

const TAG_STYLES: Record<string, string> = {
  Latest:      "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]",
  Breaking:    "bg-red-500/10 text-red-400",
  Security:    "bg-amber-500/10 text-amber-400",
};

export default function ChangelogPage() {
  return (
    <div>
      <PageHeader
        title="Changelog"
        description="Every release, summarised. Breaking changes are marked explicitly."
      />

      <div className="space-y-14">
        {RELEASES.map((release) => (
          <div key={release.version} className="grid grid-cols-[160px_1fr] gap-8 max-sm:grid-cols-1 max-sm:gap-4">
            {/* Left — version meta */}
            <div className="pt-0.5">
              <p className="font-mono text-[22px] font-bold text-[rgb(var(--text-primary))] leading-none mb-1">
                v{release.version}
              </p>
              <p className="text-[12px] text-[rgb(var(--text-tertiary))] font-mono mb-2">{release.date}</p>
              {release.tag && (
                <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${TAG_STYLES[release.tag] ?? TAG_STYLES.Latest}`}>
                  {release.tag}
                </span>
              )}
            </div>

            {/* Right — content */}
            <div className="space-y-6">
              <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed">{release.summary}</p>

              {release.sections.map((section) => (
                <div key={section.label}>
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
                    {section.label}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2 text-[14px] text-[rgb(var(--text-secondary))]">
                        <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
