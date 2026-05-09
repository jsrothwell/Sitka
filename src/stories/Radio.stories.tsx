import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroup, Radio } from "@/components/ui/Radio";

const meta: Meta = {
  title: "Inputs/Radio",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("editor");
    return (
      <RadioGroup name="role" value={value} onChange={setValue} label="Role">
        <Radio value="admin" label="Admin" helperText="Full access to all resources" />
        <Radio value="editor" label="Editor" helperText="Can create and edit content" />
        <Radio value="viewer" label="Viewer" helperText="Read-only access" />
      </RadioGroup>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState("light");
    return (
      <RadioGroup name="theme" value={value} onChange={setValue} orientation="horizontal" label="Theme">
        <Radio value="light" label="Light" />
        <Radio value="dark" label="Dark" />
        <Radio value="system" label="System" />
      </RadioGroup>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <RadioGroup name="plan" value="" onChange={() => {}} label="Plan">
      <Radio value="starter" label="Starter" />
      <Radio value="pro" label="Pro" />
      <Radio value="enterprise" label="Enterprise" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup name="region" value="us" onChange={() => {}} label="Region" disabled>
      <Radio value="us" label="United States" />
      <Radio value="eu" label="Europe" />
    </RadioGroup>
  ),
};
