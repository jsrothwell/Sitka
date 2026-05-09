import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof Toast> = {
  title: "Overlays/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "error"] },
    position: {
      control: "select",
      options: ["top-right", "bottom-right", "bottom-center", "top-center"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <Toast
          open={open}
          onClose={() => setOpen(false)}
          title="Changes saved"
          description="Your profile has been updated successfully."
          variant="success"
        />
      </>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [active, setActive] = useState<string | null>(null);
    const variants = [
      { key: "info", title: "New update available", description: "Version 2.1 is ready to install." },
      { key: "success", title: "Payment successful", description: "Your subscription has been activated." },
      { key: "warning", title: "Storage almost full", description: "You're using 90% of your quota." },
      { key: "error", title: "Upload failed", description: "File size exceeds the 5 MB limit." },
    ] as const;

    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {variants.map((v) => (
          <Button key={v.key} onClick={() => setActive(v.key)}>
            {v.key}
          </Button>
        ))}
        {variants.map((v) => (
          <Toast
            key={v.key}
            open={active === v.key}
            onClose={() => setActive(null)}
            title={v.title}
            description={v.description}
            variant={v.key}
            position="bottom-center"
          />
        ))}
      </div>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show toast with action</Button>
        <Toast
          open={open}
          onClose={() => setOpen(false)}
          title="Message deleted"
          variant="info"
          action={{ label: "Undo", onClick: () => setOpen(false) }}
          duration={8000}
          position="bottom-right"
        />
      </>
    );
  },
};

export const Persistent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show persistent toast</Button>
        <Toast
          open={open}
          onClose={() => setOpen(false)}
          title="Server error"
          description="Unable to reach the API. Check your network connection."
          variant="error"
          duration={0}
          position="top-center"
        />
      </>
    );
  },
};
