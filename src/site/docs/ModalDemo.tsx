"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <Button
            key={s}
            variant={size === s ? "primary" : "secondary"}
            size="sm"
            onClick={() => { setSize(s); setOpen(true); }}
          >
            Open {s.toUpperCase()}
          </Button>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        title="Confirm deletion"
        description="This action cannot be undone. The item and all its data will be permanently removed from the system."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        <div className="rounded-[10px] border border-red-400/20 bg-red-400/5 px-4 py-3 text-[13px] text-red-400">
          Deleting <strong>Project Alpha</strong> will also remove 14 files, 3 collaborators, and all associated history.
        </div>
      </Modal>
    </div>
  );
}

export function ModalFormDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Edit profile</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit profile"
        description="Update your display name and bio. Changes are saved immediately."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Save changes</Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-[rgb(var(--text-primary))]">Display name</label>
            <input
              defaultValue="Jamieson Rothwell"
              className="h-9 px-3 rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[13px] text-[rgb(var(--text-primary))] outline-none focus:border-[rgb(var(--accent))] focus:shadow-[0_0_0_3px_rgb(var(--accent)/0.15)] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-[rgb(var(--text-primary))]">Bio</label>
            <textarea
              rows={3}
              defaultValue="Design systems engineer."
              className="px-3 py-2 rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[13px] text-[rgb(var(--text-primary))] outline-none focus:border-[rgb(var(--accent))] focus:shadow-[0_0_0_3px_rgb(var(--accent)/0.15)] transition-all resize-none"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
