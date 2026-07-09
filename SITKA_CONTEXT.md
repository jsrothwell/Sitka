# SITKA_CONTEXT.md
> This file is the authoritative reference for the Sitka Design System. When referenced in a prompt, treat it as the governing standard for all design and engineering decisions.

---

## System Overview

**Sitka** is a premium, multi-platform design system for building high-quality digital products across Web (React/Next.js) and iOS (SwiftUI). It is documentation-first: the docs site IS the product.

- **Version:** 1.8.0
- **Framework:** Next.js 15 (App Router), TypeScript
- **Styling:** Tailwind CSS v4 + CSS custom properties (design tokens)
- **Animation:** Framer Motion
- **Icons:** Lucide React (thin-stroke, consistent weight)
- **Token Source of Truth:** `src/tokens/tokens.json` (W3C DTCG format)

---

## Repository Structure

```
sitka/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx                # Homepage / Introduction
│   │   ├── principles/             # Design principles
│   │   ├── installation/           # Setup guide
│   │   ├── foundations/
│   │   │   ├── color/
│   │   │   ├── typography/
│   │   │   ├── spacing/
│   │   │   ├── motion/             # Easing curves + duration scale
│   │   │   ├── shadows/
│   │   │   └── border-radius/
│   │   ├── components/
│   │   │   ├── button/             # ← GOLD STANDARD template
│   │   │   ├── input/
│   │   │   ├── modal/
│   │   │   ├── navigation/
│   │   │   ├── card/
│   │   │   ├── badge/
│   │   │   ├── avatar/
│   │   │   └── tooltip/
│   │   └── tokens/
│   │       ├── page.tsx            # Token browser
│   │       └── export/             # JSON + Swift export
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DocsShell.tsx       # Root shell (sidebar + header + main)
│   │   │   ├── Sidebar.tsx         # Glass sidebar with animated active state
│   │   │   └── Header.tsx          # Fixed header with theme switcher
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx   # Light/Dark/System with localStorage
│   │   ├── search/
│   │   │   └── CommandPalette.tsx  # Cmd+K global search (cmdk-style)
│   │   ├── ui/
│   │   │   ├── Button.tsx          # Gold Standard component
│   │   │   ├── CodeBlock.tsx       # Syntax block + copy button
│   │   │   ├── PlatformTabs.tsx    # React / HTML / SwiftUI tab switcher
│   │   │   └── ComponentPreview.tsx # Live preview sandbox
│   │   └── docs/
│   │       ├── PageHeader.tsx      # Page title + description + badge
│   │       ├── PropsTable.tsx      # Component API reference table
│   │       ├── TokensGrid.tsx      # Token browser with export
│   │       ├── TokenExport.tsx     # Download JSON / Swift
│   │       ├── ColorPalette.tsx    # Color swatch grid
│   │       └── MotionShowcase.tsx  # Animated easing demos
│   ├── lib/
│   │   ├── cn.ts                   # clsx + tailwind-merge utility
│   │   └── navigation.ts           # NavSection[] — single source of nav truth
│   └── tokens/
│       └── tokens.json             # W3C DTCG token file
├── SITKA_CONTEXT.md                # ← You are here
└── tailwind.config.ts
```

---

## Naming Conventions

### CSS Custom Properties (Design Tokens)
All semantic tokens use the `--` prefix and RGB channel format for Tailwind compatibility:

```css
--background        /* Page background */
--surface           /* Card / panel surface */
--surface-raised    /* Header bars, tab bars */
--surface-overlay   /* Dropdowns, tooltips */
--border            /* Primary border */
--border-subtle     /* Separator lines */
--text-primary      /* Main body text */
--text-secondary    /* Descriptions, subtitles */
--text-tertiary     /* Placeholders, disabled */
--accent            /* Brand violet (#8b6dff) */
--accent-subtle     /* Tinted accent background */
--accent-foreground /* Text on accent surfaces */
```

Usage: `rgb(var(--accent))` or Tailwind: `text-[rgb(var(--accent))]`

### Component Variants
Components always export a typed union for variants:
```ts
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "glass"
```
- `primary` — Main CTA, one per view
- `secondary` — Supporting action
- `ghost` — Low-emphasis, inline
- `danger` — Destructive, requires confirmation
- `glass` — For hero sections and overlays

### File naming
- Components: `PascalCase.tsx`
- Pages: `page.tsx` (Next.js App Router convention)
- Utilities: `camelCase.ts`
- Tokens: `tokens.json`

---

## Component Page Template (Gold Standard)

Every component page in `src/app/components/[name]/page.tsx` follows this structure:

1. **PageHeader** — `<PageHeader title="" description="" badge="" />`
2. **Live Preview** — `<ComponentPreview>` with `<h2>Preview</h2>`
3. **Variants** — Labeled previews of each visual variant
4. **Sizes** — Demo of all size options
5. **With Icons** — Icon composition demos
6. **States** — loading, disabled, error
7. **Implementation** — `<PlatformTabs code={CODE} />` with React/HTML/Swift
8. **Props** — `<PropsTable props={PROPS} />`
9. **Motion Spec** — Table: Interaction | Property | Value | Easing
10. **Accessibility** — Bullet list of a11y considerations

The `CODE` object shape:
```ts
const CODE: PlatformCode = {
  react: { code: `...`, filename: "ComponentName.tsx" },
  html:  { code: `...`, filename: "component.html" },
  swift: { code: `...`, filename: "SitkaComponentName.swift" },
}
```

---

## Motion Standards

| Interaction | Curve | Duration |
|-------------|-------|----------|
| Press/tap feedback | spring(500, 40) | physics |
| Panel/sheet reveal | spring(300, 30) | physics |
| Page transition | easeOut | 300ms |
| Hover effects | easeOut | 150ms |
| Focus ring | instant | 80ms |
| Looping animation | linear | varies |

**Framer Motion API:**
```ts
// Spring (preferred for interactive)
transition={{ type: "spring", stiffness: 500, damping: 40 }}

// Timed (for page transitions)
transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
```

---

## Glass / Liquid Glass Effect

The `.glass` CSS class applies:
- `backdrop-filter: blur(20px) saturate(180%)`
- `background: var(--glass-bg)` — semi-transparent surface color
- `border: 1px solid var(--glass-border)` — subtle inner light
- `box-shadow: var(--glass-shadow)` — depth and lift

Used on: Sidebar, Header, Command Palette backdrop panel, any floating surface.

---

## Platform Code Requirements

### React / TypeScript
- Functional components with TypeScript interfaces
- `forwardRef` for all form-adjacent components (Button, Input)
- Props extend the native HTML element (`React.ButtonHTMLAttributes<HTMLButtonElement>`)
- Motion via Framer Motion (`motion.button`, `motion.div`)
- `cn()` utility for conditional classNames

### HTML / CSS
- Semantic elements (`<button>`, `<input>`, `<nav>`)
- BEM-influenced class naming: `.btn`, `.btn-primary`, `.btn-sm`
- CSS custom properties for theming
- `transition` using Sitka easing tokens
- WCAG AA contrast minimum

### SwiftUI
- Modern `struct View` pattern (no `UIKit`)
- `@State` for local interaction state
- `@Environment(\.colorScheme)` for dark mode
- `withAnimation(.spring(...))` for press feedback
- `Color(hex:)` extension for hex colors
- `#Preview` macro for Xcode previews

---

## Adding a New Component

1. Create `src/app/components/[slug]/page.tsx`
2. Follow the Gold Standard template above
3. Add the component to `src/lib/navigation.ts` under "Components"
4. Build the UI component in `src/components/ui/[Name].tsx`
5. Ensure all three platform code samples are complete and production-ready
6. Include motion spec and accessibility notes

---

## Design Aesthetic

**The "Sitka" aesthetic is:**
- Editorial, not functional
- High whitespace, not dense
- Depth through glass, not flat
- Motion through spring, not linear
- Typography-led hierarchy

**Avoid:**
- Rounded pill buttons (use `rounded-lg` / `rounded-xl`, not `rounded-full` for buttons)
- Overly saturated UI — the brand violet is the only strong color
- Decorative gradients on surfaces
- Multiple competing shadows on the same element

---

## LLM Usage Notes

When using this file as context in a prompt:
- Assume the file structure above is current
- Use the naming conventions as described — do not invent new ones
- All new components must implement React, HTML, and SwiftUI samples
- The token file at `src/tokens/tokens.json` is the source of truth for all values
- Do not hardcode hex colors or spacing values in component files
