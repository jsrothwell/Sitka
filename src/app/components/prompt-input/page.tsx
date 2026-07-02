import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { PropsTable } from "@/site/docs/PropsTable";
import { PromptInputDemo } from "./PromptInputDemo";

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

      <PromptInputDemo />

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
