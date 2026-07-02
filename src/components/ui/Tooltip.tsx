"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  children: React.ReactElement;
  className?: string;
}

const OFFSET = 8;

function getPosition(
  trigger: DOMRect,
  tooltip: DOMRect,
  side: TooltipSide
): { top: number; left: number; actualSide: TooltipSide } {
  const { scrollX, scrollY, innerWidth, innerHeight } = window;

  const positions: Record<TooltipSide, { top: number; left: number }> = {
    top:    { top: trigger.top + scrollY - tooltip.height - OFFSET,            left: trigger.left + scrollX + trigger.width / 2 - tooltip.width / 2 },
    bottom: { top: trigger.bottom + scrollY + OFFSET,                          left: trigger.left + scrollX + trigger.width / 2 - tooltip.width / 2 },
    left:   { top: trigger.top + scrollY + trigger.height / 2 - tooltip.height / 2, left: trigger.left + scrollX - tooltip.width - OFFSET },
    right:  { top: trigger.top + scrollY + trigger.height / 2 - tooltip.height / 2, left: trigger.right + scrollX + OFFSET },
  };

  let { top, left } = positions[side];
  let actualSide = side;

  // Flip if out of viewport
  if (side === "top" && top < scrollY + 8) { top = positions.bottom.top; actualSide = "bottom"; }
  if (side === "bottom" && top + tooltip.height > scrollY + innerHeight - 8) { top = positions.top.top; actualSide = "top"; }
  if (side === "left" && left < scrollX + 8) { left = positions.right.left; actualSide = "right"; }
  if (side === "right" && left + tooltip.width > scrollX + innerWidth - 8) { left = positions.left.left; actualSide = "left"; }

  // Clamp horizontally
  left = Math.max(scrollX + 8, Math.min(left, scrollX + innerWidth - tooltip.width - 8));

  return { top, left, actualSide };
}

const arrowBase = "absolute w-2 h-2 bg-[rgb(var(--surface-raised))] rotate-45";
const arrowPos: Record<TooltipSide, string> = {
  top:    "bottom-[-4px] left-1/2 -translate-x-1/2",
  bottom: "top-[-4px] left-1/2 -translate-x-1/2",
  left:   "right-[-4px] top-1/2 -translate-y-1/2",
  right:  "left-[-4px] top-1/2 -translate-y-1/2",
};

export function Tooltip({
  content,
  side = "top",
  delay = 400,
  children,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [actualSide, setActualSide] = useState<TooltipSide>(side);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  useEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const { top, left, actualSide: as } = getPosition(triggerRect, tooltipRect, side);
    setCoords({ top, left });
    setActualSide(as);
  }, [visible, side]);

  // Clone child to attach ref + handlers
  const child = children as React.ReactElement<{
    ref?: React.Ref<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onFocus?: React.FocusEventHandler;
    onBlur?: React.FocusEventHandler;
  }>;

  const trigger = {
    ...child,
    props: {
      ...child.props,
      ref: triggerRef,
      onMouseEnter: (e: React.MouseEvent) => { show(); child.props.onMouseEnter?.(e); },
      onMouseLeave: (e: React.MouseEvent) => { hide(); child.props.onMouseLeave?.(e); },
      onFocus:      (e: React.FocusEvent) => { show(); child.props.onFocus?.(e); },
      onBlur:       (e: React.FocusEvent) => { hide(); child.props.onBlur?.(e); },
    },
  };

  return (
    <>
      {trigger}
      {visible && typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            className={cn(
              "fixed z-[9999] max-w-[220px] px-2.5 py-1.5 rounded-lg",
              "bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))]",
              "shadow-[0_4px_16px_rgba(0,0,0,0.2)]",
              "text-[11px] font-medium text-[rgb(var(--text-primary))]",
              "leading-snug pointer-events-none",
              className
            )}
            style={{ top: coords.top, left: coords.left }}
          >
            {content}
            <span className={cn(arrowBase, arrowPos[actualSide])} aria-hidden="true" />
          </div>,
          document.body
        )}
    </>
  );
}
