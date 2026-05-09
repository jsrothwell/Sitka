import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof BottomSheet> = {
  title: "Overlays/BottomSheet",
  component: BottomSheet,
  tags: ["autodocs"],
  argTypes: {
    snapHeight: { control: "select", options: ["auto", "half", "full"] },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open bottom sheet</Button>
        <BottomSheet open={open} onClose={() => setOpen(false)} title="Options">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["Share", "Edit", "Duplicate", "Archive", "Delete"].map((item) => (
              <button
                key={item}
                style={{
                  textAlign: "left",
                  padding: "12px 0",
                  fontSize: 15,
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgb(var(--border-subtle))",
                  color: item === "Delete" ? "#ef4444" : "rgb(var(--text-primary))",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const HalfHeight: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open half-height sheet</Button>
        <BottomSheet open={open} onClose={() => setOpen(false)} title="Filters" snapHeight="half">
          <div style={{ fontSize: 14, color: "rgb(var(--text-secondary))" }}>
            Filter content here — sheet is fixed at 50vh.
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const FullHeight: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open full-height sheet</Button>
        <BottomSheet open={open} onClose={() => setOpen(false)} title="Full details" snapHeight="full">
          <div style={{ fontSize: 14, color: "rgb(var(--text-secondary))" }}>
            Full-height sheet occupies 90vh — great for detail views.
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open sheet without title</Button>
        <BottomSheet open={open} onClose={() => setOpen(false)}>
          <div style={{ fontSize: 14, paddingTop: 8, color: "rgb(var(--text-secondary))" }}>
            Sheet with no title header — just the drag handle and content.
          </div>
        </BottomSheet>
      </>
    );
  },
};
