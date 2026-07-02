"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib";

export type ToastVariant  = "info" | "success" | "warning" | "error";
export type ToastPosition = "top-right" | "bottom-right" | "bottom-center" | "top-center";

export interface ToastProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. 0 = never. */
  duration?: number;
  position?: ToastPosition;
  action?: { label: string; onClick: () => void };
}

const ICONS: Record<ToastVariant, typeof Info> = {
  info:    Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error:   AlertCircle,
};

const ICON_COLORS: Record<ToastVariant, string> = {
  info:    "text-blue-400",
  success: "text-green-400",
  warning: "text-amber-400",
  error:   "text-red-400",
};

const POSITIONS: Record<ToastPosition, string> = {
  "top-right":     "top-4 right-4",
  "bottom-right":  "bottom-4 right-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "top-center":    "top-4 left-1/2 -translate-x-1/2",
};

export function Toast({
  open,
  onClose,
  title,
  description,
  variant = "info",
  duration = 4000,
  position = "bottom-right",
  action,
}: ToastProps) {
  useEffect(() => {
    if (!open || duration === 0) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  const Icon = ICONS[variant];

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "fixed z-[60] w-[320px] max-w-[calc(100vw-32px)]",
        POSITIONS[position]
      )}
    >
      <div
        className={cn(
          "flex items-start gap-3 p-4 rounded-xl",
          "bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))]",
          "shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
        )}
      >
        <Icon className={cn("w-4 h-4 flex-shrink-0 mt-0.5", ICON_COLORS[variant])} />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-[rgb(var(--text-primary))] leading-snug">
            {title}
          </p>
          {description && (
            <p className="text-[12px] text-[rgb(var(--text-secondary))] mt-0.5 leading-snug">
              {description}
            </p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-[12px] font-medium text-[rgb(var(--accent))] hover:underline"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Dismiss notification"
          className="w-5 h-5 flex items-center justify-center rounded text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] flex-shrink-0 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>,
    document.body
  );
}
