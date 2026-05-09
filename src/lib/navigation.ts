export const FEATURES = {
  figmaLibrary: true,
};

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  isNew?: boolean;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavSection {
  title: string;
  items?: NavItem[];
  groups?: NavGroup[];
}

export const navigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Design Principles", href: "/principles" },
      { title: "Installation", href: "/installation" },
    ],
  },
  {
    title: "Foundations",
    groups: [
      {
        title: "Visual",
        items: [
          { title: "Accessibility", href: "/foundations/accessibility", badge: "New" },
          { title: "Color", href: "/foundations/color" },
          { title: "Contrast", href: "/foundations/contrast" },
          { title: "Typography", href: "/foundations/typography" },
          { title: "Icons", href: "/foundations/icons" },
          { title: "Spacing", href: "/foundations/spacing" },
          { title: "Border Radius", href: "/foundations/border-radius" },
          { title: "Shadows", href: "/foundations/shadows" },
          { title: "Glass", href: "/foundations/glass" },
        ],
      },
      {
        title: "Motion & Interaction",
        items: [
          { title: "Motion", href: "/foundations/motion" },
          { title: "Interaction", href: "/foundations/interaction" },
          { title: "Keyboard Shortcuts", href: "/foundations/keyboard-shortcuts" },
        ],
      },
      {
        title: "Content",
        items: [
          { title: "Writing", href: "/foundations/writing" },
          { title: "Data Visualisation", href: "/foundations/data-viz" },
          { title: "Charting", href: "/foundations/charting" },
        ],
      },
      {
        title: "Layout & States",
        items: [
          { title: "Desktop Layout", href: "/foundations/desktop-layout" },
          { title: "Empty States", href: "/foundations/empty-states" },
          { title: "Loading States", href: "/foundations/loading-states" },
          { title: "AI Agent Standards", href: "/foundations/ai-agents" },
        ],
      },
    ],
  },
  {
    title: "Components",
    groups: [
      {
        title: "Actions",
        items: [
          { title: "Button", href: "/components/button", badge: "Gold Standard" },
          { title: "Split Button", href: "/components/split-button" },
          { title: "Segmented Button", href: "/components/segmented-button" },
          { title: "Toggle", href: "/components/toggle", badge: "New" },
          { title: "Chip", href: "/components/chip" },
        ],
      },
      {
        title: "Inputs",
        items: [
          { title: "Input", href: "/components/input" },
          { title: "Textarea", href: "/components/textarea", badge: "New" },
          { title: "Select", href: "/components/select" },
          { title: "Checkbox", href: "/components/checkbox" },
          { title: "Radio", href: "/components/radio" },
          { title: "Switch", href: "/components/switch" },
          { title: "Slider", href: "/components/slider" },
          { title: "Combobox", href: "/components/combobox" },
          { title: "Date & Time Picker", href: "/components/date-time-pickers" },
          { title: "Date Range Picker", href: "/components/date-range-picker" },
          { title: "File Upload", href: "/components/file-upload", badge: "New" },
          { title: "Label", href: "/components/label", badge: "New" },
        ],
      },
      {
        title: "Overlays",
        items: [
          { title: "Modal", href: "/components/modal" },
          { title: "Tooltip", href: "/components/tooltip" },
          { title: "Popover", href: "/components/popover", badge: "New" },
          { title: "Dropdown Menu", href: "/components/dropdown-menu", badge: "New" },
          { title: "Snackbar", href: "/components/snackbar" },
          { title: "Bottom Sheet", href: "/components/bottom-sheet" },
          { title: "Context Menu", href: "/components/context-menu", badge: "New" },
          { title: "Feature Gate", href: "/components/feature-gate", badge: "New" },
          { title: "Command Palette", href: "/components/command-palette", badge: "New" },
          { title: "Drawer", href: "/components/drawer", badge: "New" },
        ],
      },
      {
        title: "Navigation",
        items: [
          { title: "Navigation", href: "/components/navigation" },
          { title: "Tabs", href: "/components/tabs" },
          { title: "Bottom Tab Bar", href: "/components/bottom-tab-bar" },
          { title: "Breadcrumb", href: "/components/breadcrumb" },
          { title: "Carousel", href: "/components/carousel" },
        ],
      },
      {
        title: "Display",
        items: [
          { title: "Card", href: "/components/card" },
          { title: "Badge", href: "/components/badge" },
          { title: "Avatar", href: "/components/avatar" },
          { title: "Table", href: "/components/table" },
          { title: "Progress Bar", href: "/components/progress-bar", badge: "New" },
          { title: "KPI Tile", href: "/components/kpi-tile", badge: "New" },
          { title: "Gauge", href: "/components/gauge", badge: "New" },
          { title: "Color Picker", href: "/components/color-picker", badge: "New" },
          { title: "Skeleton", href: "/components/skeleton", badge: "New" },
          { title: "Spinner", href: "/components/spinner", badge: "New" },
          { title: "Divider", href: "/components/divider", badge: "New" },
        ],
      },
      {
        title: "Layout",
        items: [
          { title: "Collapsible", href: "/components/collapsible", badge: "New" },
          { title: "Pagination", href: "/components/pagination", badge: "New" },
          { title: "Sidebar", href: "/components/sidebar", badge: "New" },
        ],
      },
    ],
  },
  {
    title: "Patterns",
    groups: [
      {
        title: "Composition",
        items: [
          { title: "Master Detail", href: "/patterns/master-detail" },
          { title: "Navbar", href: "/patterns/navbar" },
          { title: "Form", href: "/patterns/form" },
          { title: "Form Layout", href: "/forms/layout" },
          { title: "Form Validation", href: "/forms/validation" },
          { title: "Settings", href: "/patterns/settings" },
          { title: "Wizard", href: "/patterns/wizard", badge: "New" },
        ],
      },
      {
        title: "Mobile",
        items: [
          { title: "Onboarding", href: "/patterns/onboarding" },
          { title: "Mobile Navigation", href: "/patterns/mobile-navigation" },
          { title: "Mobile Widgets", href: "/patterns/mobile-widgets" },
        ],
      },
      {
        title: "Data & Analytics",
        items: [
          { title: "Kanban Board", href: "/patterns/kanban", badge: "New" },
          { title: "Gantt / Timeline", href: "/patterns/gantt", badge: "New" },
          { title: "Analytics Dashboard", href: "/patterns/analytics-dashboard", badge: "New" },
          { title: "Burn Trajectory", href: "/patterns/burn-trajectory", badge: "New" },
          { title: "Goal & Streak", href: "/patterns/goal-streak", badge: "New" },
          { title: "Team Capacity Grid", href: "/patterns/team-capacity", badge: "New" },
        ],
      },
      {
        title: "Workflow",
        items: [
          { title: "Data Entry", href: "/patterns/data-entry" },
          { title: "Drag and Drop", href: "/patterns/drag-drop" },
          { title: "Import / Export", href: "/patterns/import-export", badge: "New" },
          { title: "Integration Settings", href: "/patterns/integration-settings", badge: "New" },
        ],
      },
      {
        title: "Communication",
        items: [
          { title: "Notifications · Mobile", href: "/notifications/mobile" },
          { title: "Notifications · Desktop", href: "/notifications/desktop" },
          { title: "Collaboration & Sharing", href: "/patterns/collaboration" },
          { title: "Media Player", href: "/patterns/media-player" },
        ],
      },
    ],
  },
  {
    title: "How-tos",
    items: [
      { title: "All how-tos", href: "/how-tos" },
      { title: "Design for dark mode", href: "/how-tos/dark-mode" },
      { title: "Ensure colour is accessible", href: "/how-tos/colour-contrast" },
      { title: "Write clear interface copy", href: "/how-tos/write-for-interfaces" },
      { title: "Visualise data accessibly", href: "/how-tos/data-visualisation" },
      { title: "Design an onboarding flow", href: "/how-tos/onboarding-flow" },
    ],
  },
  {
    title: "Resources",
    groups: [
      {
        title: "Libraries",
        items: [
          { title: "Overview", href: "/libraries" },
          { title: "React · Next.js", href: "/libraries/react" },
          { title: "React · Vite", href: "/libraries/vite" },
          { title: "Tokens Only", href: "/libraries/tokens" },
          { title: "iOS · SwiftUI", href: "/libraries/ios" },
          { title: "macOS · SwiftUI", href: "/libraries/macos" },
          ...(FEATURES.figmaLibrary ? [{ title: "Figma", href: "/libraries/figma" }] : []),
        ],
      },
      {
        title: "Tokens & Tools",
        items: [
          { title: "Design Tokens", href: "/tokens" },
          { title: "Token Export", href: "/tokens/export" },
          { title: "Theme Customizer", href: "/tools/theme-customizer" },
        ],
      },
    ],
  },
  {
    title: "About",
    items: [
      { title: "Changelog", href: "/changelog" },
      { title: "License", href: "/license" },
      { title: "Status", href: "/status" },
    ],
  },
];

export const allSearchableItems = navigation.flatMap((section) => {
  if (section.groups) {
    return section.groups.flatMap((group) =>
      group.items.map((item) => ({
        ...item,
        section: section.title,
        group: group.title,
      }))
    );
  }
  return (section.items ?? []).map((item) => ({
    ...item,
    section: section.title,
  }));
});
