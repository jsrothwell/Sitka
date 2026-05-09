import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { StreamingText } from "@/components/ui/StreamingText";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof StreamingText> = {
  title: "AI/StreamingText",
  component: StreamingText,
  tags: ["autodocs"],
  argTypes: {
    speed: { control: "number" },
    showCursor: { control: "boolean" },
    streaming: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof StreamingText>;

export const Default: Story = {
  render: () => (
    <p style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 480 }}>
      <StreamingText
        content="The quick brown fox jumps over the lazy dog. This sentence streams in character by character to simulate a typewriter effect."
        speed={30}
        showCursor
      />
    </p>
  ),
};

export const Fast: Story = {
  render: () => (
    <p style={{ fontSize: 16, lineHeight: 1.6 }}>
      <StreamingText
        content="Lightning-fast streaming at 5ms per character."
        speed={5}
        showCursor
      />
    </p>
  ),
};

export const Slow: Story = {
  render: () => (
    <p style={{ fontSize: 16, lineHeight: 1.6 }}>
      <StreamingText
        content="Slow and deliberate — 80ms per character."
        speed={80}
        showCursor
      />
    </p>
  ),
};

export const NoCursor: Story = {
  render: () => (
    <p style={{ fontSize: 16, lineHeight: 1.6 }}>
      <StreamingText
        content="No cursor at the end of streaming text."
        speed={30}
        showCursor={false}
      />
    </p>
  ),
};

export const Replay: Story = {
  render: () => {
    const [key, setKey] = useState(0);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 480 }} key={key}>
          <StreamingText
            content="Click the button below to replay this streaming animation from the beginning."
            speed={25}
            showCursor
          />
        </p>
        <Button variant="secondary" onClick={() => setKey((k) => k + 1)}>
          Replay
        </Button>
      </div>
    );
  },
};
