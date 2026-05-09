"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { ChatMessage, MessageRole } from "./ChatMessage";

export interface ConversationContainerProps {
  /** Array of messages in the conversation */
  messages: Array<{
    id: string;
    role: MessageRole;
    content: ReactNode;
    timestamp?: Date;
    streaming?: boolean;
  }>;
  /** Callback when the conversation reaches bottom */
  onScrollBottom?: () => void;
  /** Whether to show auto-scroll to bottom button */
  showScrollButton?: boolean;
  /** Custom input component to render at bottom */
  inputComponent?: ReactNode;
  /** Custom class for container */
  className?: string;
  /** Whether to auto-scroll when new messages arrive */
  autoScroll?: boolean;
}

export function ConversationContainer({
  messages,
  onScrollBottom,
  showScrollButton = true,
  inputComponent,
  className,
  autoScroll = true,
}: ConversationContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      if (isAtBottom) {
        onScrollBottom?.();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [onScrollBottom]);

  return (
    <div className={cn("flex flex-col h-full relative", className)}>
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChatMessage
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                  streaming={msg.streaming}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>
      </div>

      {inputComponent && (
        <div className="sticky bottom-0 pt-4 pb-6 px-4 bg-gradient-to-t from-[rgb(var(--background))] via-[rgb(var(--background))] to-transparent">
          <div className="max-w-3xl mx-auto">{inputComponent}</div>
        </div>
      )}

      {showScrollButton && (
          <ScrollToBottomButton
            onClick={() => {
              containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
            }}
            containerRef={containerRef}
          />
      )}
    </div>
  );
}

function ScrollToBottomButton({
  onClick,
  containerRef,
}: {
  onClick: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkVisibility = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setVisible(scrollHeight - scrollTop - clientHeight > 200);
    };

    container.addEventListener("scroll", checkVisibility);
    checkVisibility();
    return () => container.removeEventListener("scroll", checkVisibility);
  }, [containerRef]);

  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onClick}
      className="absolute bottom-8 right-8 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] shadow-lg hover:bg-[rgb(var(--surface-hover))] transition-colors"
      aria-label="Scroll to bottom"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[rgb(var(--text-secondary))]">
        <path d="M8 10l4-4-4-4v8z" />
      </svg>
    </motion.button>
  );
}

ConversationContainer.displayName = "ConversationContainer";
