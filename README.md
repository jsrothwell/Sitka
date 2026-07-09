This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Components

Sitka ships ~70 documented components across six categories. Each has a live preview, React/HTML/SwiftUI implementation samples, a props reference, and an accessibility checklist at its route below (append the path to your local dev server, e.g. `http://localhost:3000/components/button`).

### Actions

| Component | Path | Description |
|---|---|---|
| Button | `/components/button` | The foundational interactive element — every variant, size, and state, used as the template for all other components. |
| Split Button | `/components/split-button` | Combines a primary action with a dropdown of secondary actions. |
| Segmented Button | `/components/segmented-button` | Connected group of toggle buttons for mutually exclusive or multi-select choices. |
| Toggle | `/components/toggle` | Two-state pressed/unpressed button; `ToggleGroup` manages single or multiple selection. |
| Chip | `/components/chip` | Compact interactive token for filtering, tagging, and quick actions — filter, input, and suggestion variants. |

### Inputs

| Component | Path | Description |
|---|---|---|
| Input | `/components/input` | Labeled text field with validation states, icons, and helper text. |
| Textarea | `/components/textarea` | Multi-line text input following the same conventions as Input. |
| Prompt Input | `/components/prompt-input` | Auto-expanding multi-line input for AI chat interfaces, with attachment support. |
| OTP / PIN | `/components/otp` | Six-digit passcode entry with auto-advance, backspace navigation, and paste support. |
| Select | `/components/select` | Native dropdown for choosing one option from a list. |
| Checkbox | `/components/checkbox` | Binary selection control with an indeterminate state. |
| Radio | `/components/radio` | Mutually exclusive selection within a `RadioGroup`. |
| Switch | `/components/switch` | Toggle control for boolean settings. |
| Slider | `/components/slider` | Select a value from a continuous range — single or dual-thumb. |
| Combobox | `/components/combobox` | Searchable, multi-select dropdown with async server-side filtering. |
| Date & Time Picker | `/components/date-time-pickers` | Calendar and time-list picker with min/max boundaries. |
| Date Range Picker | `/components/date-range-picker` | Calendar-based start/end date selection with presets. |
| File Upload | `/components/file-upload` | Drag-and-drop zone with file type/size validation and a removable file list. |
| Label | `/components/label` | Standalone form label with a required indicator, for use apart from an input's built-in label. |
| Form Controls | `/components/form-controls` | Checkbox, Radio, Switch, and Select as the core input building blocks. |

### Overlays

| Component | Path | Description |
|---|---|---|
| Modal | `/components/modal` | Portal-based dialog with keyboard dismissal and composable header/body/footer regions. |
| Tooltip | `/components/tooltip` | Hover/focus contextual label that auto-flips near viewport edges. |
| Popover | `/components/popover` | Click-triggered floating panel for interactive rich content — forms, settings, previews. |
| Dropdown Menu | `/components/dropdown-menu` | Button-anchored floating menu for actions and commands. |
| Snackbar | `/components/snackbar` | Transient bottom-of-screen feedback message with an optional action. |
| Bottom Sheet | `/components/bottom-sheet` | Mobile panel that slides up for contextual actions and secondary content. |
| Context Menu | `/components/context-menu` | Right-click (desktop) or long-press (mobile) contextual action panel. |
| Feature Gate | `/components/feature-gate` | Locks premium content behind a glass overlay with an upgrade path. |
| Command Palette | `/components/command-palette` | ⌘K full-screen search overlay surfacing all navigation destinations. |
| Drawer | `/components/drawer` | Desktop-first side panel that slides in from an edge, for settings or filters. |

### Navigation

| Component | Path | Description |
|---|---|---|
| Navigation | `/components/navigation` | Horizontal tabs for switching between views within the same context. |
| Navigation Menu | `/components/navigation-menu` | Horizontal nav bar with multi-column dropdown menus. |
| Menubar | `/components/menubar` | Desktop-style File / Edit / View menu strip, following the WAI-ARIA Menubar pattern. |
| Tabs | `/components/tabs` | Labelled panels showing one at a time. |
| Bottom Tab Bar | `/components/bottom-tab-bar` | Fixed row of tab buttons anchored to the bottom of the screen — the primary mobile nav pattern. |
| Breadcrumb | `/components/breadcrumb` | Hierarchical location indicator from the root to the current page. |
| Carousel | `/components/carousel` | Horizontally scrolling content container with autoplay, keyboard, and touch controls. |

### Display

| Component | Path | Description |
|---|---|---|
| Card | `/components/card` | Flexible container with four visual variants and an optional interactive mode. |
| Badge | `/components/badge` | Compact label for status, category, or metadata, with an optional live-status dot. |
| Avatar | `/components/avatar` | User representation with image, initials fallback, sizes, and status indicators. `AvatarGroup` stacks multiple avatars. |
| Brand Logo | `/components/brand-logo` | Image → icon → initials fallback chain for external entities — job sources, integrations, companies. |
| Table | `/components/table` | Structured data display with sortable headers, striping, and density settings. |
| Data Grid | `/components/data-grid` | Feature-rich table with column sorting/filtering, row selection, and client-side pagination. |
| Progress Bar | `/components/progress-bar` | Non-interactive progress indicator with four semantic variants and an indeterminate shimmer mode. |
| KPI Tile | `/components/kpi-tile` | Dashboard metric card — icon well, bold value, trend delta, optional progress bar. |
| Gauge | `/components/gauge` | 270° arc ring for utilization/capacity/completion metrics with automatic threshold colouring. |
| Color Picker | `/components/color-picker` | Selects a brand/theme colour from a palette or hex input, with guaranteed legible foreground text. |
| Skeleton | `/components/skeleton` | Placeholder blocks that mimic the shape of loading content. |
| Spinner | `/components/spinner` | Inline, CSS-animated loading indicator. |
| Divider | `/components/divider` | Visual separator, horizontal or vertical, with an optional centred label. |
| Code Block | `/components/code-block` | Preformatted code surface with a macOS-style header and one-click copy. |
| Streaming Text | `/components/streaming-text` | Typewriter animation for AI streaming responses, with pause/resume. |
| Chat Message | `/components/chat-message` | Conversational bubble for user/assistant/system roles; integrates with Streaming Text. |

### Layout

| Component | Path | Description |
|---|---|---|
| Layout Primitives | `/components/layout-primitives` | `Box`, `Stack`, and `Inline` — composable flexbox layout components. |
| Collapsible | `/components/collapsible` | Single expandable section with an animated height transition. |
| Pagination | `/components/pagination` | Page navigation with a compact ellipsis algorithm, fully controlled by the consumer. |
| Sidebar | `/components/sidebar` | Persistent, collapsible navigation panel — the one used in this docs shell. |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

To learn more about Sitka Design System, visit the [documentation](https://github.com/username/Sitka/wiki).

## License

Sitka Design System is licensed under the MIT License.
