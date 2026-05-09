import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@/components/ui/Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: "https://api.dicebear.com/9.x/thumbs/svg?seed=sitka",
    alt: "Jamie Rothwell",
    size: "md",
  },
};

export const WithInitials: Story = {
  args: { initials: "JR", size: "md" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} initials="JR" size={size} />
      ))}
    </div>
  ),
};
