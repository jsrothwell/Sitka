import { forwardRef } from "react";
import { cn } from "@/lib";

export type LabelSize = "sm" | "md" | "lg";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  size?: LabelSize;
  children: React.ReactNode;
}

const sizeClasses: Record<LabelSize, string> = {
  sm: "text-[11px]",
  md: "text-[12px]",
  lg: "text-[13px]",
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, disabled, size = "md", className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "font-medium text-[rgb(var(--text-secondary))] leading-snug",
          sizeClasses[size],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span
            aria-hidden="true"
            className="ml-0.5 text-red-500"
          >
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";
