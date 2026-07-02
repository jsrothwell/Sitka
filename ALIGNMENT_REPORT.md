# Sitka `src/` Alignment Report

**Date:** 2026-07-02  
**Source repo:** `Sitka` (web design system)  
**Comparison repos:** `orgflo`, `JobFlo`, `Warren`, `invoiceflo`, `workflo`, `habitflo`, `Muse`  
**Scope:** Strictly `Sitka/src/` — CLAUDE/website/docs ignored.  

Reference convention used by every comparison repo: a single typed `Shared/Theme/SitkaTokens.swift` plus `Shared/Theme/SitkaComponents.swift` / `Shared/Design/SitkaModifiers.swift` or `Shared/Views/DesignSystem/Theme.swift`. These are the canonical sources of truth for the design system layer, with platform-specific branches (`#if os(iOS)` / `os(macOS)`) and concrete views in `iOS/Views/`, `macOS/Views/`.

---

## 1. No typed token layer inside `src/`

### Current state
- `src/tokens/` contains exactly one file: `tokens.json` (17 KB, untyped runtime payload).
- `packages/sitka-ui/src/tokens.ts` exists, but it is just `export default tokens` (re-exports the JSON via `import tokens from "../../src/tokens/tokens.json"`).
- There is **no** `src/tokens/index.ts`, `src/tokens/colors.ts`, `src/tokens/spacing.ts`, or any typed constant export anywhere in `src/`.

### Swift pattern
Every comparison repo maintains its own typed Swift token layer:
- `JobFlo/Shared/Theme/SitkaTokens.swift` — `enum SFColor` / `static let accent = Color(hex: "#34A865")`
- `workflo/Shared/Design/SitkaTokens.swift` — `extension Color { static let sitkaBackground = Color(hex: "09090C") }`
- `invoiceflo/Shared/Tokens/SitkaTokens.swift` — `public enum SitkaTokens.Color { public static let brandCyan = ... }`
- `orgflo/Shared/Theme/SFTokens.swift` — same shape
- `habitflo/HabitFlo/Tokens/SitkaTokens.swift`
- `Muse/Shared/Views/DesignSystem/Theme.swift` — centralised theme + Appearance enum

### Gap
`src/tokens/tokens.json` is the only real token source for the web side, and it is untyped at compile time. Any consumer inside Sitka (`src/components/ui/Button.tsx`, `Card.tsx`) has to know CSS variable names (`--accent`, `--surface`, `--border`) by magic string instead of importing typed constants like Swift apps do with `SFColor.accent`.

### Changes needed
1. Add `src/tokens/index.ts` that generates typed constant exports from `tokens.json`:
   ```
   src/tokens/
   ├── tokens.json              ← existing source of truth
   ├── index.ts                 ← re-export typed namespace (generated at build time or manually maintained)
   ├── colors.ts
   ├── spacing.ts
   ├── typography.ts
   ├── motion.ts
   └── radius.ts
   ```
2. Refactor `Button.tsx`, `Card.tsx`, `Avatar.tsx`, etc. to consume typed token constants instead of assuming CSS variables exist.
3. Mirror the Swift `SFColor` shape: `SitkaTokens.color.accent`, `SitkaTokens.spacing.s4`, `SitkaTokens.motion.press`.

---

## 2. No barrel `index.ts` files

### Current state
`src/components/ui/` (79 `.tsx` files), `src/components/layout/` (4 files), and `src/components/providers/` have **no** barrel file. There is no `src/components/ui/index.ts`, `src/components/index.ts`, etc.

### Swift pattern
Swift apps compile via Xcode/SwiftPM modules, so `import Shared` or `import SitkaTokens` works automatically. The equivalent import footprint in React:
```
import { Button, Card, Avatar } from "@/components/ui"
import { cn } from "@/lib"
```
This is the standard pattern used by shadcn/ui and is how every Flo consumer imports Swift components.

### Gap
Internal and external consumers must know individual filenames. Adding a barrel:
1. Simplifies imports everywhere.
2. Makes tree-shaking explicit (named exports).
3. Mirrors the Swift `Shared/` single-import pattern.

### Changes needed
1. Add `src/components/ui/index.ts` as a named re-export barrel.
2. Optionally add `src/components/index.ts` to re-export the subdirectories.

---

## 3. `.figma.tsx` sidecars pollute `src/components/ui/`

### Current state
37 `*.figma.tsx` files live side-by-side with the 79 runtime `.tsx` files in `src/components/ui/`.

### Swift pattern
No comparison repo carries design-tool connector files in any source tree. They either:
- Typed token files are manually maintained (`SitkaTokens.swift`), or
- Auto-generated from `tokens.json` via script, emitted inside the build step, not in the source tree.

### Gap
Git conflict risk (every Figma sync writes the `.figma.tsx` side of the same component), noise in component listings and IDE matching.

### Changes needed
1. Move all `*.figma.tsx` files to `.figma/src/` or `scripts/figma-connectors/` (off the main component path).
2. Document in `src/components/ui/CONTRIBUTING.md` that `.figma.tsx` is generated code, edit `.tsx` only.

---

## 4. Website / product code mixed into `src/components/`

### Current state
`src/components/` is treated as one bucket:
- `src/components/ui/` — **design system library** (Button, Card, Avatar, etc.)
- `src/components/layout/` — **website chrome** (`DocsShell.tsx`, `Header.tsx`, `Sidebar.tsx`, `TableOfContents.tsx`)
- `src/components/docs/` — **website only** (`TokensGrid.tsx`, `TokenExport.tsx`)
- `src/components/search/` — **website only**
- `src/components/providers/` — **library infrastructure** (`ThemeProvider.tsx`)

### Swift pattern
Every Flo app isolates layers without mixing them:
- `Shared/Theme/` or `Shared/Design/` — pure design system tokens + reusable modifiers. No views or site chrome.
- `Shared/Views/` or `iOS/Views/` — app views that consume the design system.
- `Shared/Views/DesignSystem/` (Muse) — explicitly the umbrella folder.
- `iOS/App/` — entry-point only.
- **Never**: docs-specific or search-specific components in the same folder as `SitkaComponents.swift`.

### Gap
The website shell and the design system library live under the same `src/components/` tree. A PR to add a real design-system component is visually scrolled past the 4 website-shell files, and a PR to rename the website header can accidentally touch the design-system folder.

### Changes needed
1. Create `src/design-system/` as the **only** home for the library layer (mirrors `Shared/Theme/` / `Shared/Design/`):
   ```
   src/design-system/
   ├── tokens/
   │   ├── colors.ts
   │   ├── spacing.ts
   │   └── ...
   ├── glass/                  ← glass-surface abstraction (see §5)
   ├── motion/                 ← SFMotion-equivalent constants (see §6)
   │   └── index.ts
   ├── hooks/                  ← useHaptic analog (web vibración), useReducedMotion
   │   └── index.ts
   ├── index.ts                ← barrel: tokens, motion, hooks
   └── modifiers/              ← className / style helper modifiers (SV-to-web)
   ```
2. Move website-specific folders out:
   - `src/components/layout/` → `src/app/` or `src/site/layout/`
   - `src/components/docs/` → `src/app/` or `src/site/`
   - `src/components/search/` → `src/app/` or `src/site/`
3. `src/components/ui/` stays as the canonical component library, but it is now a clean sub-tree of the design system, not co-mingled with website code.

---

## 5. No glass / surface modifier abstraction

### Current state
Glass, blur, and surface styling are inline Tailwind classes in component `variantStyles` maps:
- `Button.tsx` — `"glass text-[rgb(var(--text-primary))] hover:bg-[rgba(255,255,255,0.1)]"`
- `Card.tsx` — `"bg-[rgb(var(--surface))]"` and `"shadow-[0_4px_24px_rgba(0,0,0,0.12)]"`
- `Avatar.tsx` — raw ring/border values

There is no central abstraction, no `reduce-transparency` guard, and no single file that defines what "glass" means on the web side.

### Swift pattern
Every Flo consumer has a dedicated glass-theme file:
- `JobFlo/Shared/Theme/GlassTheme.swift` — `struct GlassTheme { static var effectiveIsDark: Bool { ... } }` with `effectiveAppearance`, `isMacTranslucencySupported`, and blur-material switching.
- `orgflo/Shared/Theme/SFComponents.swift` — shared `.sfGlassCard()` modifier.
- `workflo/Shared/Design/SitkaModifiers.swift` — view modifiers.
- `Muse/Shared/Views/DesignSystem/AppearanceModifier.swift` — central theme modifier.

### Gap
Inline styling means a single token change (e.g. "surface is now 8% opacity instead of 7%") requires editing every component file that uses the glass variant. Swift apps centralize this so one file changes and all views update.

### Changes needed
1. Add `src/design-system/glass/index.ts` with a `glassSurface` modifier / className factory:
   ```
   export function glassSurface(opts?: { intensity?: "low" | "medium" | "high" }): string {
     // maps to the Sitka tailwind glass utility, with reduce-transparency fallback
   }
   ```
2. Refactor Button, Card, and all glass-using components to import `glassSurface()` instead of inline class strings.

---

## 6. No centralized motion constants

### Current state
Motion is inline, per-component, in `framer-motion` usage:
- `Button.tsx` — `whileTap={{ scale: 0.97 }}`
- `Card.tsx` — `transition={{ type: "spring", stiffness: 500, damping: 30 }}` (example pattern noted in codebase)

There is no `src/design-system/motion/` and no mapping back to `SFMotion`.

### Swift pattern
Every Swift app defines a discrete motion namespace:
- `JobFlo` CHANGELOG references `SFMotion.press`, `SFMotion.cardAppear`
- `habitflo/CLAUDE.md` — `SitkaTokens.Animation.spring` `(response: 0.45, dampingFraction: 0.8)`

### Gap
Motion drift: a Swift consumer adjusting `SFMotion.press` from `response: 0.4` → `0.45` has no guaranteed equivalent in web components, because the web values are handwritten per component.

### Changes needed
1. Add `src/design-system/motion/index.ts` mirroring the Swift namespace:
   ```
   export const spring = { response: 0.45, dampingFraction: 0.82 };
   export const press = { scale: 0.97 };
   export const cardAppear = { type: "spring", stiffness: 500, damping: 30 };
   ```
2. Refactor `Button.tsx` and other motion-using components to import from this singleton.

---

## 7. `src/lib/` is 2 files; no utility layer parity

### Current state
```
src/lib/
├── cn.ts           (13 lines, clsx + tailwind-merge)
└── navigation.ts   (13 KB, website-only sidebar nav data)
```

### Swift pattern
Every Flo consumer has a rich shared utility layer:
- `JobFlo/Shared/Utilities/SalaryParser.swift`
- `invoiceflo/Shared/Services/AppSettings.swift`, `AppEnvironment.swift`
- `orgflo/Shared/Services/AppSettings.swift`, `AnalyticsManager.swift`
- `workflo/Shared/Managers/HabitProgressManager.swift`
- `Muse/Shared/Services/HapticsManager.swift`, `AnalyticsManager.swift`
- `invoiceflo/Shared/Tokens/PlatformExtensions.swift`

### Gap
`src/lib/` holds only a CSS class-merging helper and one navigation data file. No helpers for platform detection, reduced-motion detection, analytics, or the kind of cross-cutting hooks that Swift apps maintain in `Shared/Services/`.

### Changes needed
1. Add:
   ```
   src/design-system/hooks/
   ├── useReducedMotion.ts
   └── usePlatform.ts
   ```
2. Move website-only `navigation.ts` out of `src/lib/` into `src/site/` so `src/lib/` remains the library-only utilities bucket.

---

## 8. No tests in `src/`

### Current state
Zero `*.test.*`, `*.spec.*`, or `__tests__/` anywhere in `src/`.

### Swift pattern
Every Flo iOS/macOS app ships tests:
- `orgflo` — `Tests/`
- `JobFlo` — `JobFlow-iOS/JobFlow/ScreenshotTests/`
- `habitflo` — `HabitFloUITests/`
- `invoiceflo` — `InvoiceFloTests/`
- `workflo` — `macOS/UITests/`

### Gap
A design-system `src/` is the highest-value place for regression coverage (a bad token breaks all 7 consumer apps) yet ships none.

### Changes needed
1. Add `vitest` + `vitest.config.ts` and a `test` script in root `package.json`.
2. Seed coverage on the typed-token layer (`src/tokens/tokens.test.ts`) and at least two component assertion files (`src/components/ui/Button.test.tsx`, `src/components/ui/Card.test.tsx`).

---

## 9. No `src/design-system/` umbrella folder

### Current state
Sitka's design-system layer is spread across four physically separate roots:
- `src/tokens/tokens.json`
- `src/components/ui/`
- `src/lib/`
- `packages/sitka-ui/src/`

### Swift pattern
Every Flo app has one canonical folder per role. For the design-system layer specifically:
- `Shared/Theme/` — tokens + modifiers + reusable card/button wrappers
- `Shared/Design/` (workflo) — same idea
- `Shared/Views/DesignSystem/Theme.swift` (Muse) — same idea

### Gap
New contributors must traverse three separate roots to understand the design-system surface area. The Swift apps give a single unambiguous address: `Shared/Theme/` (or `Shared/Design/`).

### Changes needed
1. Create `src/design-system/` and migrate:
   - `src/tokens/` → `src/design-system/tokens/`
   - `src/lib/cn.ts` → `src/design-system/utils/cn.ts`
   - `packages/sitka-ui/src/tokens.ts` re-exports from `src/design-system/tokens/index.ts`
2. Keep `packages/sitka-ui/src/` / `platforms/react-native/src/` as **generated ports**, not hand-maintained mirrors.

---

## Summary Table

| # | Area | Current state | Swift app convention | Gap | Priority |
|---|------|--------------|---------------------|-----|----------|
| 1 | Typed tokens in `src/` | `tokens.json` only, no typed TS | `SitkaTokens.swift` with typed enum | No compile-time token safety in web components | P0 |
| 2 | Barrel `index.ts` | None | Single-import module bundle | Must know individual filenames | P1 |
| 3 | `.figma.tsx` sidecars | 37 files colocated | None — design-tool code never in source tree | Git conflicts, IDE noise | P1 |
| 4 | Website code in `src/components/` | `layout/`, `docs/`, `search/` mixed with `ui/` | Clean separation: `Shared/Theme/`, `Shared/Views/`, `iOS/Views/` | Library vs. product code indistinguishable | P0 |
| 5 | Glass / surface abstraction | Inline Tailwind classes per component | `GlassTheme.swift`, `SitkaModifiers.swift`, `AppearanceModifier.swift` | Token changes require component-by-component edits | P1 |
| 6 | Motion constants | Inline `framer-motion` values | `SFMotion` namespace (spring response / damping) | No parity contract between web and native | P2 |
| 7 | Utility layer | 2 files (`cn.ts`, `navigation.ts`) | `Shared/Services/`, `Shared/Utilities/`, PlatformExtensions | No hooks / platform helpers / env abstraction | P2 |
| 8 | Tests | Zero | Targeted test targets (`Tests/`, `*UITests/`) | No regression coverage for highest-impact layer | P1 |
| 9 | Library umbrella | 4 separate roots | Single `Shared/Theme/` or `Shared/Design/` | No obvious entry point for the design-system layer | P1 |

---

*Scope note: This report covers only `Sitka/src`. Excluded areas: `CLAUDE.md`, `AGENTS.md`, `.storybook/`, `packages/`, `platforms/`, `src/app/`, and any website/documentation tooling.*
