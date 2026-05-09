# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
