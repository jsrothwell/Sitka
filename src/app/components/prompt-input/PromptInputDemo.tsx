"use client";

import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PromptInput } from "@/components/ui/PromptInput";

export function PromptInputDemo() {
  return (
    <>
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Preview</h2>
        <ComponentPreview className="p-6">
          <div className="w-full max-w-2xl mx-auto">
            <PromptInput
              placeholder="Ask AI anything..."
              onSubmit={(v) => console.log(v)}
            />
          </div>
        </ComponentPreview>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">With attachments</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Users can attach images, PDFs, or other files. Attachments appear as removable previews above the input.
        </p>
        <ComponentPreview className="p-6">
          <div className="w-full max-w-2xl mx-auto">
            <PromptInput
              placeholder="Share a file to analyze..."
              onSubmit={(v) => console.log(v)}
              accept="image/*,.pdf,.json"
            />
          </div>
        </ComponentPreview>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Loading</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Disable the input and show a spinner while the AI is generating a response.
        </p>
        <ComponentPreview className="p-6">
          <div className="w-full max-w-2xl mx-auto">
            <PromptInput
              placeholder="Processing..."
              loading={true}
              onSubmit={() => {}}
            />
          </div>
        </ComponentPreview>
      </section>
    </>
  );
}
