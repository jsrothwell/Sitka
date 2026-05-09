import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PromptInput } from "@/components/ui/PromptInput";
import { PaperPlane, Paperclip } from "@phosphor-icons/react";

export const metadata: Metadata = { title: "PromptInput" };

const PROPS = [
  { name: "onSubmit", type: "(value: string, attachments?: Attachment[]) => void", description: "Callback with entered text and optional attachments." },
  { name: "placeholder", type: "string", default: '"Type a message..."', description: "Placeholder when input is empty." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables input and send button." },
  { name: "loading", type: "boolean", default: "false", description: "Shows loading spinner on send button." },
  { name: "maxLines", type: "number", default: "6", description: "Maximum height in lines before scrolling." },
  { name: "value", type: "string", description: "Controlled input value." },
  { name: "onChange", type: "(value: string) => void", description: "Change callback for controlled usage." },
  { name: "accept", type: "string", default: '"image/*,.pdf,.txt,.md,.json"', description: "Accepted file types for attachments." },
  { name: "maxAttachments", type: "number", default: "5", description: "Maximum number of attachments allowed." },
];

const CODE = {
  react: {
    filename: "PromptInput.tsx",
    code: `import { PromptInput } from "@/components/ui/PromptInput";
import { PaperclipIcon, SendIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function ChatInputDemo() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (text: string) => {
    setLoading(true);
    await sendMessage(text);
    setLoading(false);
    setMessage("");
  };

  return (
    <PromptInput
      value={message}
      onChange={setMessage}
      onSubmit={handleSubmit}
      placeholder="Ask anything..."
      loading={loading}
      maxLines={6}
    />
  );
}`,
  },
};

export default function PromptInputPage() {
  return (
    <div>
      <PageHeader
        title="PromptInput"
        description="Multi-line, auto-expanding text input for AI chat interfaces. Includes attachment support, keyboard shortcuts, and smooth height animation."
      />

      {/* Preview */}
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

      {/* States */}
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

      {/* Loading state */}
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

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Internally uses a textarea with JavaScript-driven height calculation. Enter submits; Shift+Enter inserts a newline.
        </p>
        <PropsTable props={PROPS} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Attachments have remove buttons with accessible labels.",
            "Send button disabled when empty; enter key is the primary action.",
            "No text contrast issues: input text uses --text-primary; placeholder uses --text-tertiary.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
