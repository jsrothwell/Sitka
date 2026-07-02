import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { PropsTable } from "@/site/docs/PropsTable";
import { ChatPatternDemo } from "./ChatPatternDemo";

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

      <ChatPatternDemo />

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
