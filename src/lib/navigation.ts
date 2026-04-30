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
      { title: "Shadows", href: "/foundations/shadows" },
      { title: "Border Radius", href: "/foundations/border-radius" },
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
