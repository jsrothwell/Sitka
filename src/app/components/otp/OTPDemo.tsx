"use client";

import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { OTPInput, PINInput } from "@/components/ui/OTPInput";

export function OTPDemo() {
  return (
    <>
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Preview</h2>
        <ComponentPreview className="gap-8 p-6">
          <div className="flex flex-col items-center gap-3">
            <OTPInput length={6} onComplete={(v) => console.log(v)} />
            <span className="text-xs text-[rgb(var(--text-tertiary))]">6-digit OTP</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <PINInput length={6} onComplete={(v) => console.log(v)} />
            <span className="text-xs text-[rgb(var(--text-tertiary))]">6-digit PIN (masked)</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <PINInput length={4} onComplete={(v) => console.log(v)} />
            <span className="text-xs text-[rgb(var(--text-tertiary))]">4-digit PIN</span>
          </div>
        </ComponentPreview>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Error state</h2>
        <ComponentPreview className="p-6">
          <div className="w-full max-w-sm">
            <OTPInput length={6} onComplete={(v) => console.log(v)} error="Code expired. Request a new one." />
          </div>
        </ComponentPreview>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Disabled</h2>
        <ComponentPreview className="p-6">
          <OTPInput length={6} onComplete={() => {}} disabled />
        </ComponentPreview>
      </section>
    </>
  );
}
