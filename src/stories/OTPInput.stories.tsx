import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { OTPInput, PINInput } from "@/components/ui/OTPInput";

const meta: Meta<typeof OTPInput> = {
  title: "Forms/OTPInput",
  component: OTPInput,
  tags: ["autodocs"],
  argTypes: {
    length: { control: "number" },
    type: { control: "select", options: ["numeric", "alphanumeric"] },
    mask: { control: "boolean" },
    disabled: { control: "boolean" },
    autoFocus: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  render: () => {
    const [completed, setCompleted] = useState<string | null>(null);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <OTPInput length={6} onComplete={setCompleted} />
        {completed && (
          <p style={{ fontSize: 13, color: "rgb(var(--text-secondary))" }}>
            Completed: <strong>{completed}</strong>
          </p>
        )}
      </div>
    );
  },
};

export const FourDigit: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <OTPInput length={4} onComplete={() => {}} />
    </div>
  ),
};

export const Alphanumeric: Story = {
  render: () => {
    const [completed, setCompleted] = useState<string | null>(null);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <OTPInput length={6} type="alphanumeric" onComplete={setCompleted} />
        {completed && (
          <p style={{ fontSize: 13, color: "rgb(var(--text-secondary))" }}>
            Code: <strong>{completed}</strong>
          </p>
        )}
      </div>
    );
  },
};

export const Masked: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PINInput length={6} onComplete={() => {}} />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <OTPInput length={6} onComplete={() => {}} error="Incorrect code. Please try again." />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <OTPInput length={6} onComplete={() => {}} disabled />
    </div>
  ),
};
