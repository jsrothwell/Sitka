import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@/components/ui/Box";

const meta: Meta<typeof Box> = {
  title: "Layout/Box",
  component: Box,
  tags: ["autodocs"],
  args: {
    as: "section",
    className: "rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 text-[13px] text-[rgb(var(--text-secondary))]",
    children: "A Box renders any element (here a <section>) with Sitka styling applied through className.",
  },
};
export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {};
