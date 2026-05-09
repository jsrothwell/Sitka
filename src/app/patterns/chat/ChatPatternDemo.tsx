"use client";

import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { ChatMessage } from "@/components/ui/ChatMessage";
import { ConversationContainer } from "@/components/ui/Convo";
import { PromptInput } from "@/components/ui/PromptInput";

export function ChatPatternDemo() {
  return (
    <>
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
    </>
  );
}
