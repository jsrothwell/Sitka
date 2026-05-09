import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof Modal> = {
  title: "Overlays/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm action"
          description="Are you sure you want to proceed? This cannot be undone."
          footer={
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
            </div>
          }
        >
          <p style={{ fontSize: 14, color: "rgb(var(--text-secondary))" }}>
            Additional modal body content can go here.
          </p>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open small modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Delete item" size="sm"
          footer={
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" size="sm" onClick={() => setOpen(false)}>Delete</Button>
            </div>
          }
        >
          <p style={{ fontSize: 14 }}>This item will be permanently deleted.</p>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open large modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Settings" size="lg">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {["Name", "Email", "Role"].map((field) => (
              <div key={field}>
                <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>{field}</label>
                <input
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid rgb(var(--border))", background: "rgb(var(--surface))", color: "rgb(var(--text-primary))", fontSize: 13 }}
                  placeholder={`Enter ${field.toLowerCase()}…`}
                />
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};
