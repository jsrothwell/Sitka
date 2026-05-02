export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  isNew?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
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
      { title: "Typography", href: "/foundations/typography" },
      { title: "Spacing", href: "/foundations/spacing" },
      { title: "Motion", href: "/foundations/motion" },
      { title: "Glass", href: "/foundations/glass" },
      { title: "Shadows", href: "/foundations/shadows" },
      { title: "Border Radius", href: "/foundations/border-radius" },
      { title: "Empty States", href: "/foundations/empty-states" },
      { title: "Loading States", href: "/foundations/loading-states" },
      { title: "AI Agent Standards", href: "/foundations/ai-agents" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: "/components/button", badge: "Gold Standard" },
      { title: "Input", href: "/components/input" },
      { title: "Modal", href: "/components/modal" },
      { title: "Navigation", href: "/components/navigation" },
      { title: "Card", href: "/components/card" },
      { title: "Badge", href: "/components/badge" },
      { title: "Avatar", href: "/components/avatar" },
      { title: "Tooltip", href: "/components/tooltip" },
      { title: "Form Controls", href: "/components/form-controls" },
      { title: "Table", href: "/components/table" },
      { title: "Split Button", href: "/components/split-button" },
      { title: "Segmented Button", href: "/components/segmented-button" },
      { title: "Bottom Tab Bar", href: "/components/bottom-tab-bar" },
      { title: "Bottom Sheet",   href: "/components/bottom-sheet" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { title: "Master Detail",      href: "/patterns/master-detail" },
      { title: "Navbar",             href: "/patterns/navbar" },
      { title: "Form",               href: "/patterns/form" },
      { title: "Media Player",       href: "/patterns/media-player" },
      { title: "Mobile Navigation",  href: "/patterns/mobile-navigation" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { title: "Mobile",  href: "/notifications/mobile" },
      { title: "Desktop", href: "/notifications/desktop" },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Layout",     href: "/forms/layout" },
      { title: "Validation", href: "/forms/validation" },
    ],
  },
  {
    title: "Tokens",
    items: [
      { title: "Design Tokens", href: "/tokens" },
      { title: "Token Export", href: "/tokens/export" },
    ],
  },
];

export const allSearchableItems = navigation.flatMap((section) =>
  section.items.map((item) => ({
    ...item,
    section: section.title,
  }))
);
