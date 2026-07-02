"use client";

import { SplitButton } from "@/components/ui/SplitButton";
import { Download, FileText, Archive, Trash2, Share2, Copy, Plus, GitBranch } from "lucide-react";

export function SplitButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4 justify-center">
      <SplitButton
        label="Deploy"
        onClick={() => {}}
        items={[
          { label: "Deploy to staging",    icon: <GitBranch className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: "Deploy to production", icon: <GitBranch className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: "Rollback",             icon: <Archive className="w-3.5 h-3.5" />,   onClick: () => {}, danger: true },
        ]}
      />
      <SplitButton
        label="Export"
        variant="secondary"
        leftIcon={<Download className="w-4 h-4" />}
        onClick={() => {}}
        items={[
          { label: "Export as CSV",  icon: <FileText className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: "Export as JSON", icon: <FileText className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: "Copy link",      icon: <Copy className="w-3.5 h-3.5" />,     onClick: () => {} },
          { label: "Share…",         icon: <Share2 className="w-3.5 h-3.5" />,   onClick: () => {} },
        ]}
      />
      <SplitButton
        label="Delete"
        variant="danger"
        leftIcon={<Trash2 className="w-4 h-4" />}
        onClick={() => {}}
        items={[
          { label: "Delete selected", onClick: () => {} },
          { label: "Delete all",      onClick: () => {}, danger: true },
        ]}
      />
    </div>
  );
}

export function SplitButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4 justify-center">
      {(["sm", "md", "lg"] as const).map((sz) => (
        <SplitButton
          key={sz}
          size={sz}
          label="New"
          variant="secondary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => {}}
          items={[
            { label: "New file",   onClick: () => {} },
            { label: "New folder", onClick: () => {} },
          ]}
        />
      ))}
    </div>
  );
}
