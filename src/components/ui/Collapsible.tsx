"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib";

export interface CollapsibleProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
  contentClassName,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const id = useId();

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const toggle = () => {
    const next = !isOpen;
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={cn("border border-[rgb(var(--border))] rounded-xl overflow-hidden", className)}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={id}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-4 py-3",
          "text-[13px] font-medium text-[rgb(var(--text-primary))]",
          "bg-[rgb(var(--surface-raised))] hover:bg-[rgb(var(--surface-hover))]",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[rgb(var(--accent))]"
        )}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 shrink-0 text-[rgb(var(--text-tertiary))] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          strokeWidth={2}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className={cn(
                "px-4 py-3 text-[13px] text-[rgb(var(--text-secondary))] bg-[rgb(var(--surface))] border-t border-[rgb(var(--border))]",
                contentClassName
              )}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
