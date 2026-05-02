"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: ModalSize;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const widths: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  footer,
  children,
  className,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
        className={cn(
          "relative w-full rounded-[14px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
          "shadow-[0_24px_64px_rgba(0,0,0,0.35)]",
          "flex flex-col",
          widths[size],
          className
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start gap-4 px-6 pt-6 pb-4">
            <div className="flex-1 min-w-0">
              {title && (
                <h2
                  id="modal-title"
                  className="text-[16px] font-semibold text-[rgb(var(--text-primary))] leading-snug"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed"
                >
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className={cn(
                "flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg",
                "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]",
                "hover:bg-[rgb(var(--surface-raised))] transition-colors duration-100"
              )}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Body */}
        {children && (
          <div className="px-6 py-4 text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgb(var(--border-subtle))]">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
