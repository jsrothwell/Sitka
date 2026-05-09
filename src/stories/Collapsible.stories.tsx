import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "@/components/ui/Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Layout/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {
    title: "Advanced settings",
    children: (
      <div style={{ padding: "12px 16px 16px", fontSize: 14, color: "rgb(var(--text-secondary))" }}>
        <p>Configure advanced options for this integration.</p>
      </div>
    ),
  },
};

export const DefaultOpen: Story = {
  args: {
    title: "Expanded by default",
    defaultOpen: true,
    children: (
      <div style={{ padding: "12px 16px 16px", fontSize: 14 }}>
        <p>This section starts open.</p>
      </div>
    ),
  },
};

export const Stacked: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {["General", "Notifications", "Security", "Billing"].map((section) => (
        <Collapsible key={section} title={section}>
          <div style={{ padding: "12px 16px 16px", fontSize: 14, color: "rgb(var(--text-secondary))" }}>
            {section} settings content
          </div>
        </Collapsible>
      ))}
    </div>
  ),
};
