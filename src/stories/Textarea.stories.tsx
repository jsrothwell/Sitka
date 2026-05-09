import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/ui/Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Inputs/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    inputSize: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    rows: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Enter a description…",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Bio",
    helperText: "Up to 280 characters.",
    rows: 3,
    placeholder: "Tell us about yourself…",
  },
};

export const WithError: Story = {
  args: {
    label: "Notes",
    error: "This field is required.",
    rows: 3,
  },
};

export const Disabled: Story = {
  args: {
    label: "Reason",
    disabled: true,
    defaultValue: "Pre-filled content that cannot be edited.",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <Textarea key={s} label={`Size: ${s}`} inputSize={s} rows={2} placeholder="Type here…" />
      ))}
    </div>
  ),
};
