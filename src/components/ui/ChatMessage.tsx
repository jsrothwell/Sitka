"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib";
import { StreamingText } from "./StreamingText";

export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessageProps {
  /** Who sent the message */
  role: MessageRole;
  /** Message content (plain text or React nodes) */
  content: ReactNode;
  /** Whether the message is currently streaming */
  streaming?: boolean;
  /** Optional timestamp */
  timestamp?: Date;
  /** Optional avatar/icon */
  avatar?: ReactNode;
  /** Optional additional actions (copy, edit, etc.) */
  actions?: ReactNode;
  /** Custom class for the message bubble */
  className?: string;
}

const roleStyles: Record<MessageRole, { bubble: string; text: string; icon: string }> = {
  user: {
    bubble: "bg-[rgb(var(--accent))] text-white rounded-br-sm",
    text: "text-white",
    icon: "bg-[rgb(var(--accent-muted))] text-white",
  },
  assistant: {
    bubble: "bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] text-[rgb(var(--text-primary))] rounded-bl-sm",
    text: "text-[rgb(var(--text-primary))]",
    icon: "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]",
  },
  system: {
    bubble: "bg-[rgb(var(--surface))] border border-[rgb(var(--border-subtle))] text-[rgb(var(--text-secondary))] italic",
    text: "text-[rgb(var(--text-secondary))]",
    icon: "bg-neutral-200 text-neutral-600",
  },
};

export function ChatMessage({
  role,
  content,
  streaming = false,
  timestamp,
  avatar,
  actions,
  className,
}: ChatMessageProps) {
  const styles = roleStyles[role];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex gap-3 w-full group", role === "user" ? "justify-end" : "justify-start", className)}
    >
      {role !== "user" && (
        <div className={cn("flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center", styles.icon)}>
          {avatar || (
            role === "assistant" ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-8h2v3h-2V6zm0 5h2v2h-2v-2z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 3a5 5 0 100 10A5 5 0 008 3zm0 8a3 3 0 110-6 3 3 0 010 6z"/>
                <path d="M8 5a1 1 0 11-2 0 1 1 0 012 0z"/>
              </svg>
            )
          )}
        </div>
      )}

      <div className={cn("flex flex-col gap-1 max-w-[75%]", role === "user" ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl",
            role === "user" ? "rounded-br-sm" : "rounded-bl-sm",
            styles.bubble
          )}
        >
          {typeof content === "string" && streaming ? (
            <StreamingText content={content} speed={30} showCursor={true} />
          ) : typeof content === "string" ? (
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{content}</p>
          ) : (
            content
          )}
        </div>

        {timestamp && (
          <span className="text-[11px] text-[rgb(var(--text-tertiary))] px-1">
            {formatTime(timestamp)}
          </span>
        )}

        {actions && <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">{actions}</div>}
      </div>

      {role === "user" && (
        <div className={cn("flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-neutral-600 text-white", styles.icon)}>
          {avatar || (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 9a3 3 0 116 0v3h3a3 3 0 110 6h-3v3a3 3 0 11-6 0v-3H3a3 3 0 010-6h3V9z"/>
            </svg>
          )}
        </div>
      )}
    </motion.div>
  );
}

ChatMessage.displayName = "ChatMessage";
