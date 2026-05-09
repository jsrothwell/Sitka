import type { Meta, StoryObj } from "@storybook/react";
import { NavigationMenu } from "@/components/ui/NavigationMenu";
import type { NavMenuItem } from "@/components/ui/NavigationMenu";

const meta: Meta<typeof NavigationMenu> = {
  title: "Navigation/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

const items: NavMenuItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    groups: [
      {
        links: [
          { label: "Overview", href: "/products", description: "All our products in one place" },
          { label: "Pricing", href: "/pricing", description: "Simple, transparent pricing" },
          { label: "Changelog", href: "/changelog", description: "What's new in each release" },
        ],
      },
    ],
  },
  {
    label: "Developers",
    groups: [
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/docs", description: "Guides and API reference" },
          { label: "Components", href: "/components", description: "UI component library" },
          { label: "Tokens", href: "/tokens", description: "Design token system" },
        ],
      },
      {
        title: "Tools",
        links: [
          { label: "Figma Library", href: "/libraries/figma", description: "Design components for Figma" },
          { label: "GitHub", href: "#", description: "Source code and issues" },
          { label: "Storybook", href: "#", description: "Interactive component explorer" },
        ],
      },
    ],
  },
  { label: "Blog", href: "/blog" },
];

export const Default: Story = {
  render: () => (
    <div style={{ padding: "16px", background: "rgb(var(--surface))" }}>
      <NavigationMenu items={items} />
    </div>
  ),
};

export const SimpleLinks: Story = {
  render: () => (
    <div style={{ padding: "16px", background: "rgb(var(--surface))" }}>
      <NavigationMenu
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Team", href: "/team" },
          { label: "Contact", href: "/contact" },
        ]}
      />
    </div>
  ),
};

export const WithDropdowns: Story = {
  render: () => (
    <div style={{ padding: "16px", minHeight: 200, background: "rgb(var(--surface))" }}>
      <NavigationMenu
        items={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Analytics",
            groups: [
              {
                links: [
                  { label: "Overview", href: "/analytics", description: "Key metrics at a glance" },
                  { label: "Reports", href: "/analytics/reports", description: "Detailed breakdowns" },
                  { label: "Funnels", href: "/analytics/funnels", description: "Conversion tracking" },
                ],
              },
            ],
          },
          {
            label: "Settings",
            groups: [
              {
                links: [
                  { label: "General", href: "/settings", description: "Account preferences" },
                  { label: "Team", href: "/settings/team", description: "Members and permissions" },
                  { label: "Billing", href: "/settings/billing", description: "Plans and invoices" },
                ],
              },
            ],
          },
        ]}
      />
    </div>
  ),
};
