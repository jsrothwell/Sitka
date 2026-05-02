"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

// ── Stacked layout (labels above, full-width) ─────────────

export function StackedLayoutDemo() {
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">First name</label>
        <Input placeholder="Jordan" />
      </div>
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">Last name</label>
        <Input placeholder="Smith" />
      </div>
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">Email</label>
        <Input type="email" placeholder="jordan@example.com" />
      </div>
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">Role</label>
        <Select placeholder="Select a role">
          <option value="designer">Designer</option>
          <option value="engineer">Engineer</option>
          <option value="pm">Product manager</option>
        </Select>
      </div>
      <Button type="submit" className="w-full" variant={saved ? "secondary" : "primary"}>
        {saved ? "Saved!" : "Save changes"}
      </Button>
    </form>
  );
}

// ── Two-column grid layout ────────────────────────────────

export function TwoColumnLayoutDemo() {
  return (
    <form className="w-full max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">First name</label>
          <Input placeholder="Jordan" />
        </div>
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">Last name</label>
          <Input placeholder="Smith" />
        </div>
        <div className="col-span-2 space-y-1">
          <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">Email address</label>
          <Input type="email" placeholder="jordan@example.com" />
        </div>
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">City</label>
          <Input placeholder="San Francisco" />
        </div>
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">Country</label>
          <Select placeholder="Select country">
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
          </Select>
        </div>
        <div className="col-span-2 flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}

// ── Inline layout (horizontal label + input) ──────────────

export function InlineLayoutDemo() {
  return (
    <form className="w-full max-w-lg mx-auto space-y-3" onSubmit={(e) => e.preventDefault()}>
      {[
        { label: "Display name", placeholder: "Jordan Smith", type: "text" },
        { label: "Email",        placeholder: "jordan@example.com", type: "email" },
        { label: "Website",      placeholder: "https://example.com", type: "url" },
      ].map(({ label, placeholder, type }) => (
        <div key={label} className="flex items-center gap-4">
          <label className={cn(
            "w-28 flex-shrink-0 text-[12px] font-medium text-[rgb(var(--text-secondary))] text-right"
          )}>
            {label}
          </label>
          <div className="flex-1">
            <Input type={type} placeholder={placeholder} />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <label className="w-28 flex-shrink-0 text-[12px] font-medium text-[rgb(var(--text-secondary))] text-right">
          Timezone
        </label>
        <div className="flex-1">
          <Select placeholder="Select timezone">
            <option value="pst">Pacific Time (PT)</option>
            <option value="est">Eastern Time (ET)</option>
            <option value="utc">UTC</option>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-4 pt-1">
        <div className="w-28 flex-shrink-0" />
        <Button type="submit">Update profile</Button>
      </div>
    </form>
  );
}
