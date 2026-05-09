import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "@/components/ui/Divider";

const meta: Meta<typeof Divider> = {
  title: "Display/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <div>
      <p style={{ fontSize: 14, marginBottom: 12 }}>Section A</p>
      <Divider />
      <p style={{ fontSize: 14, marginTop: 12 }}>Section B</p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div>
      <p style={{ fontSize: 14, marginBottom: 12 }}>Section A</p>
      <Divider label="or continue with" />
      <p style={{ fontSize: 14, marginTop: 12 }}>Section B</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16, height: 40 }}>
      <span style={{ fontSize: 14 }}>Files</span>
      <Divider orientation="vertical" />
      <span style={{ fontSize: 14 }}>Edit</span>
      <Divider orientation="vertical" />
      <span style={{ fontSize: 14 }}>View</span>
    </div>
  ),
};
