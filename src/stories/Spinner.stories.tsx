import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@/components/ui/Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Display/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: "md" },
};

export const ExtraSmall: Story = { args: { size: "xs" } };
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <Spinner key={size} size={size} />
      ))}
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
      <Spinner size="sm" />
      <span>Loading data…</span>
    </div>
  ),
};
