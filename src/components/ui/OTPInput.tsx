"use client";

import { useState, useRef, useEffect, KeyboardEvent, FormEvent, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface OTPInputProps {
  /** Number of digits/boxes */
  length?: number;
  /** Callback when all digits are entered */
  onComplete: (value: string) => void;
  /** Callback on each digit change */
  onChange?: (value: string) => void;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Input type: numeric or alphanumeric */
  type?: "numeric" | "alphanumeric";
  /** Placeholder character for empty boxes */
  placeholder?: string;
  /** Whether to mask the input (for PIN) */
  mask?: boolean;
  /** Custom class for container */
  className?: string;
  /** Auto-focus on mount */
  autoFocus?: boolean;
  /** Error state */
  error?: string;
}

export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      length = 6,
      onComplete,
      onChange,
      disabled = false,
      type = "numeric",
      placeholder = "•",
      mask = false,
      className,
      autoFocus = false,
      error,
    },
    ref
  ) => {
    const [values, setValues] = useState<string[]>(new Array(length).fill(""));
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    useEffect(() => {
      const allFilled = values.every((v) => v !== "");
      if (allFilled) {
        onComplete(values.join(""));
      }
    }, [values, onComplete]);

    const handleChange = (index: number, newValue: string) => {
      let char = newValue.slice(-1);
      if (type === "numeric" && !/^\d$/.test(char)) {
        char = "";
      }
      if (type === "alphanumeric" && !/^[a-zA-Z0-9]$/.test(char)) {
        char = "";
      }

      const newValues = [...values];
      newValues[index] = char;
      setValues(newValues);
      onChange?.(newValues.join(""));

      // Move to next input
      if (char && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !values[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent, index: number) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").slice(0, length - index);
      const newValues = [...values];
      let pasteIndex = index;

      for (const char of pastedData) {
        if (type === "numeric" && !/^\d$/.test(char)) continue;
        if (type === "alphanumeric" && !/^[a-zA-Z0-9]$/.test(char)) continue;
        newValues[pasteIndex] = char;
        pasteIndex++;
        if (pasteIndex >= length) break;
      }

      setValues(newValues);
      onChange?.(newValues.join(""));
      inputRefs.current[Math.min(pasteIndex, length - 1)]?.focus();
    };

    const handleFocus = (index: number) => {
      setFocusedIndex(index);
    };

    const handleBlur = () => {
      setFocusedIndex(-1);
    };

    const clearAll = () => {
      setValues(new Array(length).fill(""));
      onChange?.("");
      inputRefs.current[0]?.focus();
    };

    return (
      <div ref={ref} className={cn("flex flex-col gap-3", className)}>
        <div
          className={cn(
            "flex items-center justify-center gap-2 sm:gap-3",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {Array.from({ length }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: focusedIndex === i ? 1.05 : 1,
                boxShadow: focusedIndex === i ? "0 0 0 3px rgba(0, 192, 232, 0.3)" : "0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
              transition={{ duration: 0.15 }}
            >
              <input
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode={type === "numeric" ? "numeric" : "text"}
                maxLength={1}
                value={mask && values[i] ? "•" : values[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={(e) => handlePaste(e, i)}
                onFocus={() => handleFocus(i)}
                onBlur={handleBlur}
                disabled={disabled}
                autoComplete="one-time-code"
                aria-label={`Digit ${i + 1} of ${length}`}
                className={cn(
                  "w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-semibold",
                  "rounded-xl bg-[rgb(var(--surface-raised))]",
                  "border border-[rgb(var(--border))]",
                  "text-[rgb(var(--text-primary))]",
                  "placeholder:text-[rgb(var(--text-tertiary))]",
                  "transition-all duration-150",
                  "outline-none",
                  "hover:border-[rgb(var(--accent-muted))]",
                  "focus:bg-[rgb(var(--surface-hover))]",
                  "disabled:bg-[rgb(var(--surface))] disabled:cursor-not-allowed"
                )}
              />
            </motion.div>
          ))}
        </div>

        {error && <p className="text-sm text-red-400 text-center mt-1">{error}</p>}

        {!error && (
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] transition-colors"
            >
              Clear
            </button>
            <span className="text-xs text-[rgb(var(--text-tertiary))]">
              {values.filter((v) => v !== "").length}/{length}
            </span>
          </div>
        )}
      </div>
    );
  }
);

OTPInput.displayName = "OTPInput";

// Convenience component for PIN (masked 4-6 digit)
export interface PINInputProps extends Omit<OTPInputProps, "mask"> {
  length?: 4 | 6;
}

export const PINInput = forwardRef<HTMLDivElement, PINInputProps>(
  ({ length = 6, ...props }, ref) => {
    return <OTPInput ref={ref} length={length} mask={true} {...props} />;
  }
);

PINInput.displayName = "PINInput";
