import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { ChatMessage } from "@/components/ui/ChatMessage";
import { ConversationContainer } from "@/components/ui/Convo";
import { PromptInput } from "@/components/ui/PromptInput";

export const metadata: Metadata = { title: "Chat / Conversation" };

const MESSAGE_PROPS = [
  { name: "role", type: '"user" | "assistant" | "system"', description: "Who sent the message." },
  { name: "content", type: "ReactNode", description: "Message text or React elements. Strings can stream with the StreamingText component." },
  { name: "streaming", type: "boolean", default: "false", description: "If true, renders the content with a typewriter cursor." },
  { name: "timestamp", type: "Date", description: "Optional timestamp displayed below the bubble." },
  { name: "avatar", type: "ReactNode", description: "Custom avatar/icon; defaults to system/user glyph." },
  { name: "actions", type: "ReactNode", description: "Action buttons shown on hover (copy, edit, delete)." },
];

const CONVO_PROPS = [
  { name: "messages", type: "Message[]", description: "Array of { id, role, content, timestamp, streaming }." },
  { name: "onScrollBottom", type: "() => void", description: "Fires when user scrolls to bottom." },
  { name: "showScrollButton", type: "boolean", default: "true", description: "Shows floating button." },
  { name: "inputComponent", type: "ReactNode", description: "Optional fixed input pinned to bottom." },
  { name: "autoScroll", type: "boolean", default: "true", description: "Scrolls to newest message automatically." },
];

export default function ChatPage() {
  return (
    <div>
      <PageHeader title="Chat & Conversation" description="Pattern for AI assistant and human conversation interfaces." />

      {/* Message styles */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Message types</h2>
        <ComponentPreview className="p-6">
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
            <ChatMessage role="user" content="What's the weather like in Tokyo right now?" timestamp={new Date()} />
            <ChatMessage role="assistant" content="Let me check that for you..." streaming={true} timestamp={new Date()} />
            <ChatMessage role="system" content="Connected to weather service." timestamp={new Date()} />
          </div>
        </ComponentPreview>
      </section>

      {/* Streaming */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Streaming</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Show a blinking cursor while text streams in.
        </p>
        <ComponentPreview className="p-6">
          <div className="w-full max-w-2xl mx-auto">
            <ChatMessage
              role="assistant"
              content="The weather in Tokyo is currently 18°C with clear skies. Perfect weather for a stroll!"
              streaming={true}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Full conversation with input */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">With input</h2>
        <ComponentPreview className="p-0 overflow-hidden">
          <div className="h-[500px] w-full max-w-2xl mx-auto">
            <ConversationContainer
              messages={[
                { id: "1", role: "user", content: "Help me debug this React component." },
                { id: "2", role: "assistant", content: "I'd be happy to help! Can you share the code?" },
                { id: "3", role: "user", content: "Sure, here's the stack trace..." },
              ]}
              inputComponent={<PromptInput placeholder="Reply..." onSubmit={(v) => console.log(v)} />}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">ChatMessage props</h2>
        <PropsTable props={MESSAGE_PROPS} />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">ConversationContainer props</h2>
        <PropsTable props={CONVO_PROPS} />
      </section>

      {/* Usage guidelines */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage guidelines</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "User messages align right with accent; assistant aligns left.",
            "System messages are centered, italicized, and lower opacity.",
            "Show copy action on all assistant messages.",
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
