import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PromptInput } from "@/components/ui/PromptInput";

const meta: Meta<typeof PromptInput> = {
  title: "AI/PromptInput",
  component: PromptInput,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    maxLines: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof PromptInput>;

export const Default: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState<string[]>([]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <PromptInput
          placeholder="Ask anything..."
          onSubmit={(value) => setSubmitted((prev) => [...prev, value])}
        />
        {submitted.length > 0 && (
          <div style={{ fontSize: 13, color: "rgb(var(--text-secondary))" }}>
            <strong>Submitted:</strong>
            <ul style={{ margin: "4px 0 0", paddingLeft: 16 }}>
              {submitted.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <PromptInput
      placeholder="Generating response..."
      loading
      onSubmit={() => {}}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <PromptInput
      placeholder="Input is disabled"
      disabled
      onSubmit={() => {}}
    />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("Hello, how can you help me today?");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <PromptInput
          value={value}
          onChange={setValue}
          onSubmit={(v) => alert(`Submitted: ${v}`)}
          placeholder="Controlled input..."
        />
        <p style={{ fontSize: 12, color: "rgb(var(--text-tertiary))" }}>
          Characters: {value.length}
        </p>
      </div>
    );
  },
};
