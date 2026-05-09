"use client";

import { useState, useRef, useEffect, useCallback, forwardRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Paperclip, Send, X, Image, FileText } from "lucide-react";

export interface Attachment {
  id: string;
  file: File;
  preview?: string;
  type: "image" | "file";
}

export interface PromptInputProps {
  /** Callback when submit is triggered */
  onSubmit: (value: string, attachments?: Attachment[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether currently loading/submitting */
  loading?: boolean;
  /** Maximum number of lines before scrolling */
  maxLines?: number;
  /** Custom class name */
  className?: string;
  /** Initial value (controlled) */
  value?: string;
  /** onChange for controlled usage */
  onChange?: (value: string) => void;
  /** Allowed attachment types */
  accept?: string;
  /** Maximum attachment count */
  maxAttachments?: number;
}

export const PromptInput = forwardRef<HTMLTextAreaElement, PromptInputProps>(
  (
    {
      onSubmit,
      placeholder = "Type a message...",
      disabled = false,
      loading = false,
      maxLines = 6,
      className,
      value: controlledValue,
      onChange,
      accept = "image/*,.pdf,.txt,.md,.json",
      maxAttachments = 5,
    },
    ref
  ) => {
    const [value, setValue] = useState("");
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const actualValue = controlledValue !== undefined ? controlledValue : value;
    const actualRef = (ref as React.RefObject<HTMLTextAreaElement>) || textareaRef;

    const adjustTextareaHeight = useCallback(() => {
      const el = actualRef.current;
      if (!el) return;
      el.style.height = "auto";
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const maxHeight = lineHeight * maxLines;
      const scrollHeight = el.scrollHeight;
      el.style.height = Math.min(scrollHeight, maxHeight) + "px";
    }, [actualRef, maxLines]);

    useEffect(() => {
      adjustTextareaHeight();
    }, [actualValue, adjustTextareaHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (controlledValue === undefined) {
        setValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    const handleSubmit = () => {
      if (!actualValue.trim() || disabled || loading || attachments.length > maxAttachments) return;
      onSubmit(actualValue.trim(), attachments.length > 0 ? attachments : undefined);
      setValue("");
      setAttachments([]);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const newAttachments: Attachment[] = [];
      Array.from(files).forEach((file) => {
        if (attachments.length + newAttachments.length >= maxAttachments) return;

        const type: Attachment["type"] = file.type.startsWith("image/") ? "image" : "file";
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        if (type === "image") {
          const reader = new FileReader();
          reader.onload = (evt) => {
            setAttachments((prev) => [
              ...prev,
              { id, file, preview: evt.target?.result as string, type },
            ]);
          };
          reader.readAsDataURL(file);
        } else {
          newAttachments.push({ id, file, type });
          setAttachments((prev) => [...prev, ...newAttachments]);
        }
      });
    };

    const removeAttachment = (id: string) => {
      setAttachments((prev) => prev.filter((a) => a.id !== id));
    };

    return (
      <div
        className={cn(
          "flex flex-col gap-3 p-3 rounded-2xl",
          "bg-[rgb(var(--surface))] border",
          isFocused
            ? "border-[rgb(var(--accent))] ring-2 ring-[rgb(var(--accent-subtle))]"
            : "border-[rgb(var(--border))]",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {/* Attachments preview */}
        <AnimatePresence>
          {attachments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="relative group flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border-subtle))]"
                >
                  {attachment.type === "image" && attachment.preview ? (
                    <img
                      src={attachment.preview}
                      alt="Attachment"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-neutral-200 dark:bg-neutral-700">
                       <FileText className="w-5 h-5 text-[rgb(var(--text-secondary))]" />
                    </div>
                  )}
                  <span className="text-[13px] text-[rgb(var(--text-primary))] max-w-[120px] truncate">
                    {attachment.file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(attachment.id)}
                    className="p-0.5 rounded hover:bg-[rgb(var(--border))] text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                  >
                     <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-2">
          {/* Attachment button */}
          <div className="flex-shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={accept}
              onChange={handleFileSelect}
              className="hidden"
              disabled={disabled || loading}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || loading || attachments.length >= maxAttachments}
              className={cn(
                "p-2.5 rounded-xl transition-colors",
                "text-[rgb(var(--text-tertiary))]",
                isFocused && !disabled && !loading
                  ? "bg-[rgb(var(--accent-subtle))] hover:bg-[rgb(var(--surface-hover))] text-[rgb(var(--accent))]"
                  : "hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-secondary))]"
              )}
              aria-label="Add attachment"
            >
              <Paperclip className="w-5 h-5" />
            </button>
          </div>

          {/* Text input */}
          <div className="flex-1 relative">
            <textarea
              ref={actualRef}
              value={actualValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              disabled={disabled || loading}
              rows={1}
              className={cn(
                "w-full resize-none bg-transparent",
                "text-[15px] leading-relaxed text-[rgb(var(--text-primary))]",
                "placeholder:text-[rgb(var(--text-tertiary))]",
                "outline-none",
                "max-h-[calc(1.375em*var(--max-lines,6))]",
                className
              )}
              style={{ maxHeight: `calc(1.375em * ${maxLines})` } as React.CSSProperties}
            />
          </div>

          {/* Send button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!actualValue.trim() || disabled || loading}
            className={cn(
              "flex-shrink-0 p-2.5 rounded-xl transition-all",
              actualValue.trim() && !disabled && !loading
                ? "bg-[rgb(var(--accent))] text-white hover:opacity-90 shadow-[0_0_0_1px_rgba(0,192,232,0.3)]"
                : "bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-tertiary))] cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
               <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Character count / limit indicator */}
        {maxLines > 1 && actualValue.length > 0 && (
          <div className="flex justify-end">
            <span className="text-[11px] text-[rgb(var(--text-tertiary))]">
              {actualValue.length} characters
            </span>
          </div>
        )}
      </div>
    );
  }
);

PromptInput.displayName = "PromptInput";
