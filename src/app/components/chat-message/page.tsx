import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { ChatMessage } from "@/components/ui/ChatMessage";
import { Bot, User, AlertTriangle } from "lucide-react";

export const metadata: Metadata = { title: "ChatMessage" };

const PROPS = [
  {
    name: "role",
    type: '"user" | "assistant" | "system"',
    default: '"assistant"',
    description: "Who sent the message. Determines alignment, bubble style, and default avatar.",
  },
  {
    name: "content",
    type: "ReactNode",
    description: "Message content. Plain strings render in a text paragraph; React nodes render as-is.",
  },
  {
    name: "streaming",
    type: "boolean",
    default: "false",
    description: "When true and content is a string, renders with StreamingText typewriter animation.",
  },
  {
    name: "timestamp",
    type: "Date",
    description: "Optional timestamp displayed below the bubble.",
  },
  {
    name: "avatar",
    type: "ReactNode",
    description: "Optional custom avatar. Overrides the default robot/user/system icons.",
  },
  {
    name: "actions",
    type: "ReactNode",
    description: "Optional action row (copy, edit, retry) shown on hover.",
  },
  {
    name: "className",
    type: "string",
    description: "Custom class for the outer motion.div wrapper.",
  },
];

export default function ChatMessagePage() {
  const now = new Date();

  return (
    <div>
      <PageHeader
        title="ChatMessage"
        description="Bubble component for conversational UIs. Supports user, assistant, and system roles with distinct styling. Integrates with StreamingText for AI response animation."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Preview</h2>
        <ComponentPreview className="p-6 bg-[rgb(var(--surface-raised))]">
          <div className="space-y-4 max-w-xl">
            <ChatMessage
              role="assistant"
              content="Hi! I'm Sitka's design assistant. How can I help you build something today?"
              timestamp={new Date(now.getTime() - 120000)}
              avatar={<Bot size={16} />}
            />
            <ChatMessage
              role="user"
              content="Can you show me the progress bar component?"
              timestamp={now}
              avatar={<User size={16} />}
            />
            <ChatMessage
              role="assistant"
              content="Of course! The Progress Bar is available under Components → Display. It supports determinate, indeterminate (shimmer), and segmented variants with Liquid Glass styling."
              timestamp={new Date(now.getTime() + 30000)}
              avatar={<Bot size={16} />}
            />
            <ChatMessage
              role="system"
              content={"• Session started at " + now.toLocaleTimeString()}
              timestamp={new Date(now.getTime() + 60000)}
              avatar={<AlertTriangle size={16} />}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Streaming demo */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Streaming response</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Set <code className="text-[11px] px-1.5 py-0.5 rounded bg-[rgb(var(--surface-raised))]">streaming: true</code> on an assistant message to animate the text with StreamingText.
        </p>
        <ComponentPreview className="p-6 bg-[rgb(var(--surface-raised))]">
          <div className="max-w-xl">
            <ChatMessage
              role="assistant"
              content="Sitka bridges engineering and design with a single source of truth — consistent, accessible, and built to scale across Web, iOS, macOS, Android, and visionOS."
              streaming={true}
              avatar={<Bot size={16} />}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Role variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ComponentPreview className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">user</p>
            <ChatMessage role="user" content="User messages align right with accent fill." />
          </ComponentPreview>
          <ComponentPreview className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">assistant</p>
            <ChatMessage role="assistant" content="Assistant aligns left with a subtle surface fill and border." avatar={<Bot size={14} />} />
          </ComponentPreview>
          <ComponentPreview className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">system</p>
            <ChatMessage role="system" content="System messages use muted italic styling." avatar={<AlertTriangle size={14} />} />
          </ComponentPreview>
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Each message bubble must carry an accessibilityLabel combining role and content preview: 'Assistant: Hi! I'm Sitka's design assistant.'",
            "The streaming animation must not announce each character — set accessibilityLiveRegion to 'polite' and only announce when streaming completes.",
            "Avatar icons are purely decorative — wrap them in aria-hidden='true' unless the avatar carries semantic meaning (e.g., agent identity).",
            "The timestamp must use a relative format for sighted users and an absolute format for screen readers: aria-label='Sent at 2:41 PM'.",
            "Action buttons (copy, edit) must have distinct labels and not rely on icon-only recognition.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
