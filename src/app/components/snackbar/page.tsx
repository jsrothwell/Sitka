"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib";
import { PageHeader } from "@/site/docs/PageHeader";
import { PropsTable } from "@/site/docs/PropsTable";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";


const SNACKBAR_PROPS = [
  { name: "open", type: "boolean", required: true, description: "Controls snackbar visibility." },
  { name: "onClose", type: "() => void", required: true, description: "Called when snackbar closes." },
  { name: "message", type: "string", required: true, description: "Main message text to display." },
  { name: "description", type: "string", description: "Optional secondary text below the message." },
  { name: "variant", type: '"default" | "success" | "error" | "warning"', default: '"default"', description: "Visual style variant." },
  { name: "duration", type: "number", default: "4000", description: "Auto-dismiss delay in milliseconds. 0 = never." },
  { name: "action", type: "{ label: string; onClick: () => void }", description: "Optional action button on the right." },
  { name: "position", type: '"bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-right"', description: "Screen position." },
];

const SNACKBAR_YIELD_PROPS = [
  { name: "dismissible", type: "boolean", default: "false", description: "Show a dismiss (×) button." },
  { name: "icon", type: "ReactNode", description: "Optional icon before message." },
];

const CODE = {
  react: {
    filename: "Snackbar.tsx",
    code: `"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, AlertCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib";

type SnackbarVariant = "default" | "success" | "error" | "warning";
type SnackbarPosition = "bottom-left" | "bottom-center" | "bottom-right";

export interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  description?: string;
  variant?: SnackbarVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  position?: SnackbarPosition;
  dismissible?: boolean;
  icon?: React.ReactNode;
}

const ICONS: Record<SnackbarVariant, React.ReactNode> = {
  default: null,
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
};

const COLORS: Record<SnackbarVariant, string> = {
  default: "rgb(var(--text-primary))",
  success: "var(--nav-active-color)",
  error: "#ef4444",
  warning: "#f59e0b",
};

const POSITIONS: Record<SnackbarPosition, string> = {
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

export function Snackbar({
  open,
  onClose,
  message,
  description,
  variant = "default",
  duration = 4000,
  action,
  position = "bottom-right",
  dismissible = false,
  icon,
}: SnackbarProps) {
  useEffect(() => {
    if (!open || duration === 0) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const customIcon = icon ?? ICONS[variant];

  return createPortal(
    <div
      className={cn(
        "fixed z-[70] px-4",
        POSITIONS[position]
      )}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={cn(
          "flex items-start gap-3 px-4 py-3 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.15)]",
          "border backdrop-blur-sm",
          "bg-[rgb(var(--surface-raised))] border-[rgb(var(--border))]"
        )}
        style={{
          borderLeftColor: customIcon ? COLORS[variant] : undefined,
          borderLeftWidth: customIcon ? "4px" : undefined,
        }}
      >
        {customIcon && (
          <div className="flex-shrink-0 mt-0.5" style={{ color: COLORS[variant] }}>
            {customIcon}
          </div>
        )}
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-[13px] font-medium text-[rgb(var(--text-primary))] leading-snug">
            {message}
          </p>
          {description && (
            <p className="text-[12px] text-[rgb(var(--text-secondary))] mt-0.5 leading-snug">
              {description}
            </p>
          )}
        </div>
        {action && (
          <button
            onClick={() => {
              action.onClick();
              onClose();
            }}
            className="text-[12px] font-medium text-[rgb(var(--accent))] hover:underline whitespace-nowrap ml-2"
          >
            {action.label}
          </button>
        )}
        {dismissible && (
          <button
            onClick={onClose}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}
`,
  },
  html: {
    filename: "snackbar.html",
    code: `<div class="snackbar-container">
  <div class="snackbar" role="status" aria-live="polite">
    <div class="snackbar-icon">
      <svg><!-- icon --></svg>
    </div>
    <div class="snackbar-content">
      <p class="snackbar-message">Changes saved successfully</p>
      <p class="snackbar-description">Your profile has been updated</p>
    </div>
    <button class="snackbar-action">Undo</button>
    <button class="snackbar-dismiss" aria-label="Dismiss">×</button>
  </div>
</div>

<style>
.snackbar-container {
  position: fixed; z-index: 70;
  bottom: 16px; right: 16px;
}
.snackbar {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 12px 16px; border-radius: 8px;
  background: rgba(24, 24, 27, 0.95); color: white;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  border-left: 4px solid #22c55e;
}
.snackbar-icon { width: 20px; height: 20px; margin-top: 2px; }
.snackbar-content { flex: 1; min-width: 0; }
.snackbar-message {
  font-size: 13px; font-weight: 500;
  line-height: 1.4; margin: 0;
}
.snackbar-description {
  font-size: 12px; color: rgba(255,255,255,0.7);
  margin: 2px 0 0; line-height: 1.4;
}
.snackbar-action {
  font-size: 12px; font-weight: 500;
  color: #3b82f6; background: none;
  border: none; padding: 0; cursor: pointer;
  margin-left: 8px; white-space: nowrap;
}
.snackbar-dismiss {
  width: 20px; height: 20px;
  display: flex; align-items: center; justify-content: center;
  background: none; border: none; color: rgba(255,255,255,0.5);
  font-size: 16px; cursor: pointer; padding: 0;
}
.snackbar-dismiss:hover { color: white; }
</style>`,
  },
  swift: {
    filename: "SnackbarView.swift",
    code: `import SwiftUI

struct Snackbar: View {
    let message: String
    let description: String?
    let variant: Variant
    let action: Action?
    
    enum Variant {
        case 'default', success, error, warning
        
        var color: Color {
            switch self {
            case .default: return .primary
            case .success: return .green
            case .error: return .red
            case .warning: return .orange
            }
        }
        
        var icon: String {
            switch self {
            case .default: return ""
            case .success: return "checkmark.circle.fill"
            case .error: return "xmark.octagon.fill"
            case .warning: return "exclamationmark.triangle.fill"
            }
        }
    }
    
    struct Action {
        let label: String
        let handler: () -> Void
    }
    
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            if variant != .default {
                Image(systemName: variant.icon)
                    .font(.system(size: 20))
                    .foregroundStyle(variant.color)
                    .frame(width: 20, height: 20)
            }
            
            VStack(alignment: .leading, spacing: 2) {
                Text(message)
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundStyle(.primary)
                
                if let description = description {
                    Text(description)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            
            if let action = action {
                Button(action.label) {
                    action.handler()
                }
                .font(.caption)
                .fontWeight(.semibold)
                .foregroundStyle(.accent)
                .padding(.leading, 4)
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(.systemBackground).opacity(0.95))
                .shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(variant.color.opacity(0.5), lineWidth: 3)
                .offset(x: -8)
        )
    }
}

// Snackbar manager for hosting in SwiftUI
class SnackbarManager: ObservableObject {
    @Published var snackbar: SnackbarItem?
    
    struct SnackbarItem {
        let message: String
        let description: String?
        let variant: Snackbar.Variant
        let action: Snackbar.Action?
        let duration: TimeInterval
    }
    
    func show(
        message: String,
        description: String? = nil,
        variant: Snackbar.Variant = .default,
        action: Snackbar.Action? = nil,
        duration: TimeInterval = 4
    ) {
        snackbar = SnackbarItem(
            message: message,
            description: description,
            variant: variant,
            action: action,
            duration: duration
        )
        
        DispatchQueue.main.asyncAfter(deadline: .now() + duration) {
            self.snackbar = nil
        }
    }
}

// Usage preview
struct SnackbarPreview: View {
    @StateObject private var manager = SnackbarManager()
    
    var body: some View {
        VStack {
            Button("Show Snackbar") {
                manager.show(
                    message: "Changes saved",
                    description: "Your profile has been updated",
                    variant: .success,
                    action: .init(label: "Undo") {
                        print("Undo tapped")
                    }
                )
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
        .overlay(alignment: .bottom) {
            if let snackbar = manager.snackbar {
                Snackbar(
                    message: snackbar.message,
                    description: snackbar.description,
                    variant: snackbar.variant,
                    action: snackbar.action
                )
                .padding(.horizontal, 16)
                .padding(.bottom, 20)
                .transition(.move(edge: .bottom).combined(with: .opacity))
                .animation(.easeInOut(duration: 0.3), value: snackbar)
            }
        }
    }
}`,
  },
};

const VARIANT_EXAMPLES = [
  { variant: "default", label: "Default", message: "New message received", description: "You have 1 unread notification", icon: "i" },
  { variant: "success", label: "Success", message: "Changes saved", description: "Your profile has been updated", icon: "check" },
  { variant: "error", label: "Error", message: "Upload failed", description: "File exceeds 10 MB limit", icon: "!" },
  { variant: "warning", label: "Warning", message: "Session expiring", description: "You'll be logged out in 5 minutes", icon: "!" },
];

export default function SnackbarPage() {
  return (
    <div>
      <PageHeader
        title="Snackbar"
        description="Brief, transient messages that appear at the bottom of the screen to provide feedback about an operation. Automatically dismisses after a short duration and supports optional actions."
      />

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Variants</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Different visual styles for different types of feedback. Color helps convey meaning, but always include clear text messages.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {VARIANT_EXAMPLES.map((ex) => (
            <div key={ex.variant} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-5 h-5 rounded flex items-center justify-center text-sm font-bold"
                  style={{
                    background: ex.variant === 'success' ? 'var(--nav-active-color)' :
                               ex.variant === 'error' ? '#ef4444' :
                               ex.variant === 'warning' ? '#f59e0b' : 'rgb(var(--border))',
                    color: ex.variant === 'default' ? 'rgb(var(--text-tertiary))' : 'white'
                  }}
                >
                  {ex.icon}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{ex.label}</span>
              </div>
              <p className="text-[13px] font-medium text-[rgb(var(--text-primary))] mb-1">{ex.message}</p>
              <p className="text-[12px] text-[rgb(var(--text-secondary))]">{ex.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Demo</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Snackbars appear temporarily to acknowledge an action. They can include an optional action button.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]">
            <SnackbarDemo />
          </div>
        </ComponentPreview>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex items-center justify-center">
          <svg viewBox="0 0 380 100" width="380" height="100" className="max-w-full">
            {/* Snackbar */}
            <rect x="10" y="10" width="360" height="80" rx="12" fill="rgb(var(--surface-raised))" stroke="rgb(var(--border))" strokeWidth="1" />
            {/* Accent border */}
            <line x1="10" y1="10" x2="10" y2="90" stroke="var(--nav-active-color)" strokeWidth="4" strokeLinecap="round" rx="4" />
            {/* Icon */}
            <circle cx="35" cy="50" r="12" fill="var(--nav-active-color)" opacity="0.15" />
            <text x="35" y="55" textAnchor="middle" fontSize="12" fill="var(--nav-active-color)">✓</text>
            {/* Message */}
            <text x="60" y="38" fontSize="13" fontWeight="500" fill="rgb(var(--text-primary))">Changes saved successfully</text>
            {/* Description */}
            <text x="60" y="56" fontSize="11" fill="rgb(var(--text-secondary))">Your profile has been updated</text>
            {/* Action button */}
            <rect x="270" y="42" width="50" height="16" rx="4" fill="transparent" />
            <text x="295" y="54" fontSize="11" fontWeight="500" fill="var(--accent)" textAnchor="middle">Undo</text>
            {/* Dismiss */}
            <text x="345" y="52" fontSize="14" fill="rgb(var(--text-tertiary))" cursor="pointer">×</text>
            
            {/* Labels */}
            <text x="60" y="80" fontSize="8" fill="rgb(var(--text-tertiary))">ICON</text>
            <text x="270" y="80" fontSize="8" fill="rgb(var(--text-tertiary))">ACTION</text>
            <text x="345" y="80" fontSize="8" fill="rgb(var(--text-tertiary))">DISMISS</text>
          </svg>
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Behavior</h2>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Aspect", "Behavior", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { aspect: "Auto-dismiss", behavior: "After duration (default 4s)", notes: "Set duration=0 to disable" },
                { aspect: "Hover", behavior: "Pauses timer", notes: "Resumes on mouse leave" },
                { aspect: "Focus", behavior: "Pauses timer", notes: "Accessibility friendly" },
                { aspect: "Multiple", behavior: "Stack vertically", notes: "Most recent on top" },
                { aspect: "Action click", behavior: "Dismisses after", notes: "Then executes callback" },
                { aspect: "Dismiss", behavior: "Immediate close", notes: "No further animation" },
              ].map((s, i) => (
                <tr key={s.aspect} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{s.aspect}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{s.behavior}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage guidelines</h2>
        <div className="grid grid-cols-2 gap-4">
           {[{ type: "do", items: ["Use for non-critical, transient feedback", "Keep messages concise (1-2 lines max)", "Provide action for undoable operations", "Pause timer on hover/focus for accessibility"] },
            { type: "dont", items: ["Don't use for critical errors (use banner/modal)", "Avoid stacking more than 2-3 at once", "Don't require reading for critical info", "Avoid long messages that wrap"] },
          ].map(({ type, items }) => (
            <div key={type} className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
              <div className={`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${
                type === "do" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" : "text-red-500 bg-red-50 dark:bg-red-950/20"
              }`}>
                {type === "do" ? "✓ Do" : "✗ Don't"}
              </div>
              <ul className="p-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-[12px] text-[rgb(var(--text-secondary))] flex gap-2">
                    <span className={type === "do" ? "text-emerald-500" : "text-red-400"}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={SNACKBAR_PROPS} />
      </section>

      {/* Snackbar yield props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Additional props</h2>
        <PropsTable props={SNACKBAR_YIELD_PROPS} />
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
           {["Use role='status' with aria-live='polite' for informational messages.",
            "Use role='alert' only for critical errors requiring immediate attention.",
            "Provide aria-label on dismiss button for screen readers.",
            "Don't rely on color alone — include text and icons.",
            "Timer should pause on hover and focus for keyboard users.",
            "Avoid snackbars for critical errors or required confirmations.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SnackbarDemo() {
  const [visible, setVisible] = useState(true);
  const [variant, setVariant] = useState<'default' | 'success' | 'error' | 'warning'>('success');
  
  const variants: Array<'default' | 'success' | 'error' | 'warning'> = ['default', 'success', 'error', 'warning'];
  const messages = {
    default: { message: 'New message received', desc: 'You have 1 unread notification' },
    success: { message: 'Changes saved', desc: 'Your profile has been updated' },
    error: { message: 'Upload failed', desc: 'File exceeds 10 MB limit' },
    warning: { message: 'Session expiring', desc: 'You will be logged out in 5 minutes' },
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v}
            onClick={() => { setVariant(v); setVisible(true); }}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors",
              variant === v
                ? "bg-[rgb(var(--accent))] text-white border-[rgb(var(--accent))]"
                : "bg-[rgb(var(--surface))] border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))]"
            )}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="relative h-20">
        {visible && (
          <div
            className="absolute bottom-0 left-0 right-0 flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-2"
            style={{
              background: 'rgb(var(--surface-raised))',
              border: '1px solid rgb(var(--border))',
              borderLeft: `4px solid ${variant === 'success' ? 'var(--nav-active-color)' : variant === 'error' ? '#ef4444' : variant === 'warning' ? '#f59e0b' : 'rgb(var(--border))'}`
            }}
          >
            {variant !== 'default' && (
              <div className="flex-shrink-0 mt-0.5">
                {variant === 'success' && <CheckCircle className="w-5 h-5 text-[var(--nav-active-color)]" />}
                {variant === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
                {variant === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">{messages[variant].message}</p>
              <p className="text-[12px] text-[rgb(var(--text-secondary))]">{messages[variant].desc}</p>
            </div>
            {variant === 'success' && (
              <button className="text-[12px] font-medium text-[rgb(var(--accent))] hover:underline ml-2">
                Undo
              </button>
            )}
            <button
              onClick={() => setVisible(false)}
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"
              aria-label="Dismiss"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
        {!visible && (
          <div className="absolute inset-0 flex items-center justify-center text-[12px] text-[rgb(var(--text-tertiary))]">
            Select a variant to show snackbar
          </div>
        )}
      </div>
    </div>
  );
}
