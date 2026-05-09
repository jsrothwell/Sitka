import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessage } from "@/components/ui/ChatMessage";

const meta: Meta<typeof ChatMessage> = {
  title: "AI/ChatMessage",
  component: ChatMessage,
  tags: ["autodocs"],
  argTypes: {
    role: { control: "select", options: ["user", "assistant", "system"] },
    streaming: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

export const UserMessage: Story = {
  render: () => (
    <div style={{ padding: 16, maxWidth: 640 }}>
      <ChatMessage
        role="user"
        content="Can you explain how React hooks work?"
        timestamp={new Date()}
      />
    </div>
  ),
};

export const AssistantMessage: Story = {
  render: () => (
    <div style={{ padding: 16, maxWidth: 640 }}>
      <ChatMessage
        role="assistant"
        content="React hooks are functions that let you use state and other React features in function components. The most common hooks are useState for managing local state, useEffect for side effects, and useCallback/useMemo for performance optimizations."
        timestamp={new Date()}
      />
    </div>
  ),
};

export const SystemMessage: Story = {
  render: () => (
    <div style={{ padding: 16, maxWidth: 640 }}>
      <ChatMessage
        role="system"
        content="You are a helpful assistant specialized in React and TypeScript development."
      />
    </div>
  ),
};

export const Conversation: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16, maxWidth: 640 }}>
      <ChatMessage
        role="system"
        content="New conversation started"
      />
      <ChatMessage
        role="user"
        content="What's the difference between useMemo and useCallback?"
        timestamp={new Date(Date.now() - 60000)}
      />
      <ChatMessage
        role="assistant"
        content="Both useMemo and useCallback are for memoization, but they serve different purposes. useMemo memoizes a computed value, re-running only when dependencies change. useCallback memoizes a function reference itself, which is useful when passing callbacks to optimized child components that rely on reference equality."
        timestamp={new Date(Date.now() - 30000)}
      />
      <ChatMessage
        role="user"
        content="Can you show me an example?"
        timestamp={new Date()}
      />
    </div>
  ),
};

export const Streaming: Story = {
  render: () => (
    <div style={{ padding: 16, maxWidth: 640 }}>
      <ChatMessage
        role="assistant"
        content="I'm generating a response right now. This text streams in character by character to simulate a live AI response..."
        streaming
      />
    </div>
  ),
};
