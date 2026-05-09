import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof Tooltip> = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    side: { control: "select", options: ["top", "bottom", "left", "right"] },
    delay: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <Tooltip content="This is a tooltip">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 48 }}>
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <div key={side} style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip content={`Tooltip on ${side}`} side={side}>
            <Button variant="secondary" size="sm">{side}</Button>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <Tooltip content={<span><strong>Pro tip:</strong> Press ⌘K to open command palette</span>}>
        <Button variant="ghost">Keyboard shortcut</Button>
      </Tooltip>
    </div>
  ),
};

export const NoDelay: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <Tooltip content="Instant tooltip" delay={0}>
        <Button variant="secondary">No delay</Button>
      </Tooltip>
    </div>
  ),
};
