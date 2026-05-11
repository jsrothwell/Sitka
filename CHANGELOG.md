# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **Figma library** — marked as "Coming Soon" on the Libraries overview and detail page; the Figma file is not yet published.

### Fixed
- **Sitka logo** — icon was broken on GitHub Pages because the public asset path was not prefixed with the `basePath` (`/Sitka`). Now resolved via `NEXT_PUBLIC_BASE_PATH` env variable set in `next.config.ts`.

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
