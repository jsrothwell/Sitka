# Sitka Ecosystem Audit — 2026-07-29

**Scope:** `workflo`, `Warren`, `orgflo`, `Muse`, `matchflo`, `JobFlo`, `invoiceflo`, `habitflo` — every app repo that consumes (or is meant to consume) the Sitka design system.
**Also surfaced:** `Sitkaflo`, the central Swift package these apps are *supposed* to share. Not in the original scope list but directly relevant — see §1.

This is a decision document, not a changelog. Everything in §4 (new tokens) has already been applied to `tokens.json` and released as **1.9.0** — those are additive and carried no judgment call. Everything below in §1–3 needs a person to pick a direction before it becomes code.

---

## 1. The central finding: three motion vocabularies and two competing implementations

There is already a shared Swift package, **Sitkaflo** (`/Users/harlock/Documents/GitHub/Sitkaflo`), whose own `README.md` states its purpose is to be "a single, centrally maintained source" for exactly this design system. In practice:

- Only **matchflo** imports it (23 files).
- **orgflo, JobFlo** maintain a byte-for-byte-identical copy-pasted clone of the token/component layer (`SF*` enums — `SFColor`, `SFType`, `SFSpacing`, `SFRadius`, `SFShadow`, `SFMotion`) that does **not** import the package.
- **workflo, invoiceflo, habitflo** maintain a second, independent clone (`SitkaTokens`/`SitkaColors`/`SitkaComponents` naming).
- **Warren** has its own third naming (`SitkaColors.swift`, `SitkaType.swift`).
- **Muse** has no Sitka alignment at all — a fully independent `Theme` enum with its own palette and typography.

This was already diagnosed in depth by a prior session in `Sitkaflo/SITKA_ALIGNMENT_REPORT.md` (proposing `SitkaFlo`/`SitkaServices`/`SitkaPersistence`/`SitkaTesting` packages). That proposal has been **partially executed** — the package now has all four of those targets and ~13 components under `Sources/SitkaFlo/Components/` — but **adoption hasn't followed**: six of seven peer repos still run their own drifted fork instead of importing it. That migration is an engineering decision (whose sequencing, whose regression risk) that belongs to whoever owns those seven codebases, not something this pass can safely do from the Sitka docs repo.

**Worse: the "central" package's own defaults don't match Sitka's brand.** `Sitkaflo/Sources/SitkaFlo/Tokens/ColorTokens.swift`'s `SitkaColorTokens.default` uses raw system colors — `brandPrimary: .blue`, `feedbackSuccess: .green`, `feedbackInfo: .cyan` — not Sitka's brand cyan (`#00C0E8`) or brand green (`#34A865`) at all. The token *shape* is reasonable (each app is meant to override it with its own instance), but a fallback that silently diverges from the documented brand is a trap for the next integrator.

**And there are three non-interoperable motion vocabularies, not one:**

| Vocabulary | Where | Shape |
|---|---|---|
| `tokens.json` (this repo) | Sitka web | Named presets as strings, physical-spring style: `"stiffness 300, damping 30"` |
| `SFMotion` | orgflo, JobFlo, matchflo | `Animation.spring(response:dampingFraction:)` + named cubic-bezier curves (`standard`, `standardDecelerate`, `emphasizedDecelerate` — Material-3-flavored naming) |
| `SitkaAnimationTokens` | Sitkaflo package itself | A *third* naming scheme: `springSnappy`/`springBouncy`/`springGentle`, `modalPresent`/`modalDismiss` |

Only `tokens.json` and `SFMotion` share any preset names (`cardAppear`, `arcRing`, `dropSpring`, `progressFill`, `alluvial`, `sheetEntry`, `pageTransition`), and even where names match, values don't always agree — see §2.1. The package that exists specifically to unify motion invented a fourth vocabulary instead of adopting either.

**Decision needed:** pick one motion vocabulary and one component package as canonical, and treat the other five repos' local forks as migration debt rather than acceptable variance. Recommend: `tokens.json`'s naming (since it's the cross-platform doc-of-record) + `Sitkaflo` as the enforcement mechanism, with the `SF*` dialect and Muse's independent `Theme` retired over time.

---

## 2. Discrepancies needing a decision

### 2.1 `dropSpring` value mismatch (concrete, numeric)

Every other shared preset name between `tokens.json` and `SFMotion` converts cleanly via `stiffness = response × 1000, damping = dampingFraction × 100`:

- `progressFill`: web `stiffness 400, damping 75` ↔ iOS `response 0.40, dampingFraction 0.75` ✓ exact
- `alluvial`: web `stiffness 650, damping 82` ↔ iOS `response 0.65, dampingFraction 0.82` ✓ exact

`dropSpring` breaks the pattern: web says `stiffness 300, damping 30`, but iOS's `dropSpring` is `response 0.30, dampingFraction 0.70` — which converts to `stiffness 300, damping 70`, not 30. One of these two numbers is wrong; given every other preset agrees, `damping 30` in `tokens.json` is the more likely typo. **Not changed in this pass** — flagging rather than silently altering a shipped value apps may already depend on.

### 2.2 Every app picks its own brand accent — is that a bug or the pattern?

- `workflo` / Warren: cyan (`#00C0E8` / `#00C7D6` — themselves not identical, see 2.3)
- `JobFlo`: green (`#34A865`, i.e. Sitka's `brand.green.500`)
- `orgflo` **and** `matchflo`: violet (`#8b6dff` — not in Sitka's palette at all, in either app)
- Sitka's own `tokens.json` `themes.*.accent`: cyan (`#00c0e8`)

Given `Warren`'s `brandUser` token (user-selectable accent, already documented) and `workflo`'s `PersonalizationColor` enum (an 8-color closed palette for per-item accents — see §3), a per-product or per-user accent override is clearly an intentional, recurring pattern here — not five accidents. But `tokens.json` currently documents only one fixed brand accent with no formal "product override" or "personalization override" slot. **Decision needed:** either formalize a multi-brand/override token (a `brandOverride` slot with documented precedence over `accent`), or treat JobFlo/orgflo/matchflo's divergence as debt to fix. Given three of five apps deliberately deviate, the former seems more honest.

### 2.3 Warren's `sitkaCyan` is off by one hex step

`Warren/warren_mobile_design/Warren-iOS/Warren/DesignSystem/SitkaColors.swift:18` — `sitkaCyan = Color(hex: 0x00C7D6)`. Canonical brand cyan everywhere else (`tokens.json`, workflo, JobFlo-family) is `#00C0E8`. Small enough to be a typo, large enough to be visible side-by-side. Worth a one-line fix in Warren, not in Sitka.

### 2.4 Two border-radius scales, not one

`workflo`'s `SitkaRadius` and `invoiceflo`/`habitflo`'s `SitkaTokens.Radius` match `tokens.json`'s `borderRadius` exactly (`sm 6 / md 10 / lg 14 / xl 20 / 2xl 28`). But the `SF*`-dialect apps (`orgflo`, `JobFlo`, `matchflo`) use a different scale entirely: `xs 6 / sm 8 / md 12 / lg 16 / xl 20 / xl2 24`. `md` and `lg` differ by 2px each; `xl2` is 4px short of `2xl`. This is downstream of §1 (two forked implementations) rather than a new problem, but worth naming as its own line item since it's the kind of thing that shows up as visibly-inconsistent card corners if someone screenshots both apps side by side.

### 2.5 Light-mode semantic colors: `tokens.json`'s own values may fail the contrast check it ships

`workflo`'s `SitkaTokens.swift` deliberately *darkens* every status/brand color for light mode to independently clear WCAG AA (4.5:1) — e.g. success `#22C55E`(dark) → `#0A7A56`(light), with review comments citing exact ratios. `matchflo`'s equivalent file does the same with different numbers (`sitkaSuccess` light `#167E3C`). Both apps did this because using the same hex in both themes failed contrast on white.

Sitka's own `themes.light.statusSuccess` (`rgb(16,185,129)` = `#10B981`) was checked against Sitka's own `src/lib/contrast.ts` (added in the 2026-07-02 alignment pass) for this report:

```
contrastRatio("#10B981", "#ffffff") ≈ 2.54   →  fails 4.5:1 by a wide margin
```

workflo's independently-derived light-success (`#0A7A56`) scores **5.34:1** against white — a real, working fix that Sitka's own token doesn't have. This is the single most concrete, verifiable item in this audit. **Not changed in this pass** — `statusSuccess`/`statusWarning`/`statusDanger`/`statusCaution` in `themes.light` need a values pass using the same darkening methodology, and `themes.dark` is missing the parallel block entirely (falls back to flat `color.semantic.*`, unverified for the dark canvas). Recommend running every semantic/status color in both theme blocks through `contrastRatio()` before the next release.

### 2.6 `gap` vs `caution` naming collision

`matchflo`'s `SitkaStatusRole` has six roles: `success, accent, gap, warning, danger, caution`. Sitka's `themes.light.statusCaution` (`rgb(234, 88, 12)` = `#EA580C`, a red-orange) is numerically much closer to matchflo's **`gap`** color (`#F97316`, orange) than to matchflo's own **`caution`** (`#EAB308`, yellow-amber). If matchflo's naming were adopted as-is, Sitka's existing `statusCaution` token is arguably mislabeled — it's a "gap" color wearing a "caution" name. **Decision needed** before adding either as a formal token: pick the semantic split (are "gap"/inactive-match and "caution"/mid-severity two different roles, or one?) and reconcile against the name already shipped in `tokens.json`.

### 2.7 Color-vision-deficiency-aware status colors exist — nowhere in Sitka's docs

`matchflo/Matchflo/Views/Components/SitkaDesign.swift` (and `Sitkaflo/Sources/SitkaFlo/Accessibility/ColorBlindMode.swift`) implement a full Okabe-Ito-based remapping of every status role across four modes (deuteranopia, protanopia, tritanopia, monochromacy) × light/dark — 40+ hand-tuned, contrast-verified values. This is a genuinely strong accessibility feature that exists in code and nowhere in Sitka's documented token system or `/foundations` pages. **Recommend adding** as a documented pattern once §2.6's naming is settled (the CVD remap needs a stable role list to remap).

### 2.8 `MLNudgeBannerView` — same name, two incompatible APIs

`habitflo` and `invoiceflo` both ship a component literally named `MLNudgeBannerView`, independently built, with different props (habitflo: `insight: MLInsight`, `onDismiss`/`onAction`; invoiceflo: `message: String`, `onConfirm`/`onDismiss`) and different visual treatment (habitflo has a 4pt accent-color leading border; invoiceflo doesn't). Nobody coordinated — this is what happens without a shared package. **Decision needed** on a canonical "AI insight/nudge banner" API before either gets adopted more broadly.

---

## 3. New components / patterns found — not yet in Sitka, not yet added

Listed for prioritization, not shipped. None of these were added to `src/components/ui/` in this pass — that's real component-engineering work, not a token/doc update.

| Component | Source | What it is |
|---|---|---|
| **Command Palette** | Warren (`CommandPalette.swift`) | ⌘K-style action launcher. High-value, common pattern, currently app-specific. |
| **On-Device Model Download Status** | Warren (`ModelDownloadStatusView.swift`) | States for downloading/cancelling/retrying/deleting a local AI model (MLX), with progress + throughput. Relevant to any Flo app adding on-device AI (Muse already does sentiment on-device). |
| **Presence Avatar Strip** | Warren (`PresenceAvatarView.swift`) | Stacked avatars + pulsing "live" dot for real-time co-editing. Close cousin of the already-shipped Avatar Group (1.6.0) — likely a variant/prop addition (`showsPresence: Bool`) rather than a new component. |
| **Voice Input / Dictation Button** | JobFlo (`VoiceMicButton.swift`) | Mic button with pulse ring while listening/recording, long-press to record. |
| **Sync Status Icon** | JobFlo (`SyncStatusView.swift`), also in Sitkaflo (`FloSyncStatusIcon.swift`) | Minimal icon-only sync-state indicator with a pulse `symbolEffect` while syncing — smaller/simpler than the already-documented Davros connectivity pill. |
| **Kanban Accent Bar** | JobFlo (`SFKanbanAccentBar`), also in Sitkaflo | Colored leading bar for Kanban cards/columns. Small, but real and already in the central package. |
| **Calendar Heatmap** | habitflo (`HeatmapView.swift`) | GitHub-style 52×7 contribution grid for habit completions. Common, reusable pattern beyond habit tracking. |
| **Flow Layout** | matchflo (`KeywordBingoBoard.swift` → `FlowLayout`) | A `Layout`-protocol wrap/flow container for tag chips. Layout primitive, not a visual component — candidate for `Stack.tsx`'s SwiftUI counterpart guidance. |
| **Drop Zone (dashed, with sweep)** | matchflo (`MatchDropZone.swift`) | Dashed-border file drop target with hover-glow and a one-shot sweep animation on drop. Sitka already has `FileUpload.tsx`; this looks like an enhancement (drag-state visual language) rather than a wholly new component — worth diffing against `FileUpload`'s current spec. |
| **GTD Priority Picker** | orgflo (`SFPriorityPicker`), also in Sitkaflo | Domain-specific but reusable for any task app. |
| **Pill Tag** | orgflo/JobFlo (`SFPillTag`), also in Sitkaflo (`SitkaPillTag.swift`) | Was announced as shipped in the 1.6.0 changelog but never got a `src/components/ui/` React counterpart — currently SwiftUI-only. Worth closing that gap or correcting the changelog claim. |
| **Editorial/serif type track** | Muse (`Theme.Typography` — `design: .serif` for display/heading/bodyReading) | Sitka's typography is sans + mono only. Muse deliberately uses a serif track for long-form/journaling content. Candidate: a documented "reading" type track for content-heavy product surfaces, not a replacement for the UI-chrome sans track. |
| **Ambient "ready" halo** | Muse (`BreathingHaloView.swift`) | Slow-pulsing radial-gradient circle signaling an idle-but-ready input state (e.g. "ready to write"). Honors Reduce Motion. |
| **Mood/sentiment gradient** | Muse (`VibeView.swift`) | On-device-computed gradient reflecting an entry's emotional tone, with an accessible text label. |
| **"On this day" resurfacing banner** | Muse (`OnThisDayBanner.swift`) | Dismissible, shown-once-per-session banner surfacing a past entry from the same calendar date. Generalizes beyond journaling (e.g. "this time last sprint"). |
| **AI-assist button (sparkle + loading)** | Muse (`PromptButton.swift`) | Bordered button with sparkle icon → spinner + "Thinking…" label while an AI call is in flight. Common enough shape (icon button that becomes a labeled spinner) to be worth a documented pattern. |
| **Semantic-similarity related-content rail** | Muse (`RelatedEntriesView.swift`) | Horizontal scroll of related-item cards computed via on-device embedding similarity. |

---

## 4. Applied this pass — additive, non-breaking, shipped as 1.9.0

These required no judgment call (no existing value changed, no naming collision, sourced directly from working code with documented rationale):

- **Fixed:** `motion.presets.chipTap` was announced as added in the 1.6.0 changelog but is absent from `tokens.json` — restored as `stiffness 220, damping 65`, derived from the iOS `spring(response: 0.22, dampingFraction: 0.65)` used identically across JobFlo/orgflo/matchflo, via the same stiffness/damping conversion that already holds exactly for `progressFill` and `alluvial`.
- **Added:** `color.semantic.ghost` (`rgb(89, 128, 158)`) — a desaturated "stale/inactive" status color (JobFlo pattern: signals "this may have gone quiet," not "something is wrong"). Dark-mode value only; light-mode value intentionally left undefined pending a contrast pass (see §2.5 methodology).
- **Added:** `color.personalization.{purple,pink,teal}` — light/dark pairs, sourced verbatim from workflo's `PersonalizationColor` enum, which already documents its own AA contrast rationale. Closes the gap where three of workflo's eight personalization colors (purple/pink/teal) had no token representation at all.
- **Added:** `color.categorical.{1-4}` — a muted qualitative palette for tag/chip differentiation, sourced from Warren's "project chip" colors. Fixed (non-theme-adaptive) values, matching the source pattern.

---

## 5. Suggested next steps, in order

1. Resolve §2.6 (gap vs. caution naming) — it blocks §2.7 (CVD-safe status colors), which is otherwise ready to adopt wholesale from matchflo's implementation.
2. Run `contrastRatio()` (already in `src/lib/contrast.ts`) against every `themes.dark`/`themes.light` status color and fix failures per §2.5 — highest-leverage single fix in this report.
3. Decide §2.2 (per-app brand accent: sanctioned pattern or debt) — everything downstream of "what is *the* brand color" gets easier once this is settled.
4. Pick a canonical motion vocabulary (§1) and retire the other two.
5. Treat the SwiftUI component list in §3 as a backlog, roughly in the listed order (Command Palette and Calendar Heatmap are the most broadly reusable; the Muse-specific journaling patterns are the most novel but narrowest).
