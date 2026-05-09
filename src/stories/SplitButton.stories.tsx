import type { Meta, StoryObj } from "@storybook/react";
import { SplitButton } from "@/components/ui/SplitButton";
import { Download, Share, Copy, Archive } from "lucide-react";

const meta: Meta<typeof SplitButton> = {
  title: "Actions/SplitButton",
  component: SplitButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SplitButton>;

const items = [
  { label: "Download as PDF", icon: <Download size={14} />, onClick: () => {} },
  { label: "Share link", icon: <Share size={14} />, onClick: () => {} },
  { label: "Copy to clipboard", icon: <Copy size={14} />, onClick: () => {} },
  { label: "Archive", icon: <Archive size={14} />, onClick: () => {}, danger: true },
];

export const Primary: Story = {
  args: {
    label: "Export",
    variant: "primary",
    onClick: () => {},
    items,
  },
};

export const Secondary: Story = {
  args: {
    label: "Export",
    variant: "secondary",
    onClick: () => {},
    items,
  },
};

export const Loading: Story = {
  args: {
    label: "Exporting…",
    variant: "primary",
    loading: true,
    onClick: () => {},
    items,
  },
};

export const Disabled: Story = {
  args: {
    label: "Export",
    variant: "primary",
    disabled: true,
    onClick: () => {},
    items,
  },
};
