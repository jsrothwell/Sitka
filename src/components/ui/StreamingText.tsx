"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/cn";

export interface StreamingTextProps {
  /** Text content to stream */
  content: string;
  /** Speed in milliseconds per character (default from tokens: typewriter) */
  speed?: number;
  /** Show blinking cursor at the end */
  showCursor?: boolean;
  /** Cursor character */
  cursorChar?: string;
  /** Callback when streaming completes */
  onComplete?: () => void;
  /** Whether to start streaming immediately */
  autoStart?: boolean;
  /** Pause duration between words in ms (0 = no pause) */
  wordPause?: number;
  /** Custom class name */
  className?: string;
  /** Whether to enable streaming (for pause/resume control) */
  streaming?: boolean;
  /** Callback for each character rendered */
  onCharacter?: (index: number) => void;
}

export function StreamingText({
  content,
  speed = 30,
  showCursor = true,
  cursorChar = "|",
  onComplete,
  autoStart = true,
  wordPause = 0,
  className,
  streaming = true,
  onCharacter,
}: StreamingTextProps) {
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(!autoStart);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearPending = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const streamNext = useCallback(() => {
    if (!streaming) return;
    if (displayedIndex >= content.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const currentChar = content[displayedIndex];
    const isWordEnd = currentChar === " " && wordPause > 0;
    const delay = isWordEnd ? wordPause : speed;

    timeoutRef.current = setTimeout(() => {
      setDisplayedIndex((prev) => {
        const next = prev + 1;
        onCharacter?.(next);
        return next;
      });
    }, delay);
  }, [displayedIndex, content, speed, wordPause, streaming, onComplete, onCharacter]);

  useEffect(() => {
    if (!isPaused && displayedIndex < content.length) {
      streamNext();
    }
    return clearPending;
  }, [isPaused, displayedIndex, content.length, streamNext, clearPending]);

  useEffect(() => {
    return clearPending;
  }, [clearPending]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  const visibleText = content.slice(0, displayedIndex);
  const cursorVisible = !isComplete && showCursor;

  return (
    <span className={cn("relative inline", className)}>
      {visibleText}
      {cursorVisible && (
        <span
          className="inline-block w-[2px] h-[1em] ml-0.5 align-middle bg-[rgb(var(--accent))] animate-pulse"
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}

StreamingText.displayName = "StreamingText";
