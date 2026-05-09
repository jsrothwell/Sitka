import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof Drawer> = {
  title: "Overlays/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    side: { control: "select", options: ["left", "right"] },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Navigation">
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {["Dashboard", "Projects", "Team", "Settings", "Help"].map((item) => (
              <button key={item} style={{
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 8,
                fontSize: 14,
                cursor: "pointer",
                background: "none",
                border: "none",
                color: "rgb(var(--text-primary))",
              }}>
                {item}
              </button>
            ))}
          </div>
        </Drawer>
      </>
    );
  },
};

export const LeftSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open left drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Filters" side="left">
          <div style={{ fontSize: 14, color: "rgb(var(--text-secondary))" }}>
            Filter options go here
          </div>
        </Drawer>
      </>
    );
  },
};

export const WideDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open wide drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Details panel" width={540}>
          <div style={{ fontSize: 14 }}>Wide content panel (540px)</div>
        </Drawer>
      </>
    );
  },
};
