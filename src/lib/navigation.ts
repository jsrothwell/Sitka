export const FEATURES = {
  figmaLibrary: false,
};

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  isNew?: boolean;
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
    items: [
      { title: "Color", href: "/foundations/color" },
      { title: "Contrast", href: "/foundations/contrast" },
      { title: "Typography", href: "/foundations/typography" },
      { title: "Spacing", href: "/foundations/spacing" },
      { title: "Motion", href: "/foundations/motion" },
      { title: "Interaction", href: "/foundations/interaction" },
      { title: "Writing", href: "/foundations/writing" },
      { title: "Data Visualisation", href: "/foundations/data-viz" },
      { title: "Charting", href: "/foundations/charting" },
      { title: "Glass", href: "/foundations/glass" },
      { title: "Shadows", href: "/foundations/shadows" },
      { title: "Border Radius", href: "/foundations/border-radius" },
      { title: "Empty States", href: "/foundations/empty-states" },
      { title: "Loading States", href: "/foundations/loading-states" },
      { title: "AI Agent Standards", href: "/foundations/ai-agents" },
      { title: "Desktop Layout", href: "/foundations/desktop-layout" },
      { title: "Keyboard Shortcuts", href: "/foundations/keyboard-shortcuts" },
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
          { title: "Chip", href: "/components/chip" },
        ],
      },
      {
        title: "Inputs",
        items: [
          { title: "Input", href: "/components/input" },
          { title: "Form Controls", href: "/components/form-controls" },
          { title: "Slider", href: "/components/slider" },
          { title: "Combobox", href: "/components/combobox" },
          { title: "Date & Time Picker", href: "/components/date-time-pickers" },
          { title: "Date Range Picker", href: "/components/date-range-picker" },
        ],
      },
      {
        title: "Overlays",
        items: [
          { title: "Modal", href: "/components/modal" },
          { title: "Tooltip", href: "/components/tooltip" },
          { title: "Snackbar", href: "/components/snackbar" },
          { title: "Bottom Sheet", href: "/components/bottom-sheet" },
        ],
      },
      {
        title: "Navigation",
        items: [
          { title: "Navigation", href: "/components/navigation" },
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
        ],
      },
    ],
  },
  {
    title: "Patterns",
    items: [
      { title: "Master Detail", href: "/patterns/master-detail" },
      { title: "Navbar", href: "/patterns/navbar" },
      { title: "Form", href: "/patterns/form" },
      { title: "Form Layout", href: "/forms/layout" },
      { title: "Form Validation", href: "/forms/validation" },
      { title: "Onboarding", href: "/patterns/onboarding" },
      { title: "Settings", href: "/patterns/settings" },
      { title: "Notifications · Mobile", href: "/notifications/mobile" },
      { title: "Notifications · Desktop", href: "/notifications/desktop" },
      { title: "Media Player", href: "/patterns/media-player" },
      { title: "Mobile Navigation", href: "/patterns/mobile-navigation" },
      { title: "Mobile Widgets", href: "/patterns/mobile-widgets" },
      { title: "Collaboration & Sharing", href: "/patterns/collaboration" },
      { title: "Drag and Drop", href: "/patterns/drag-drop" },
      { title: "Data Entry", href: "/patterns/data-entry" },
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
    title: "Tokens",
    items: [
      { title: "Design Tokens", href: "/tokens" },
      { title: "Token Export", href: "/tokens/export" },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "Theme Customizer", href: "/tools/theme-customizer" },
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
