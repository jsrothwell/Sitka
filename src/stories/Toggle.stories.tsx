import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle, ToggleGroup } from "@/components/ui/Toggle";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const meta: Meta<typeof Toggle> = {
  title: "Actions/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outline"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false);
    return (
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <Bold size={14} />
        Bold
      </Toggle>
    );
  },
};

export const Outline: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false);
    return (
      <Toggle variant="outline" pressed={pressed} onPressedChange={setPressed}>
        <Italic size={14} />
        Italic
      </Toggle>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Toggle key={size} size={size} defaultPressed={false}>
          {size.toUpperCase()}
        </Toggle>
      ))}
    </div>
  ),
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["left"]);
    return (
      <ToggleGroup value={value} onValueChange={setValue} type="single">
        <Toggle value="left"><AlignLeft size={14} /></Toggle>
        <Toggle value="center"><AlignCenter size={14} /></Toggle>
        <Toggle value="right"><AlignRight size={14} /></Toggle>
      </ToggleGroup>
    );
  },
};
