import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { DesktopToastDemo } from "@/components/docs/NotificationDemo";

export const metadata: Metadata = { title: "Desktop Notifications" };

const PROPS = [
  { name: "open",        type: "boolean",       required: true,  description: "Controls visibility. Toast unmounts when false." },
  { name: "onClose",     type: "() => void",    required: true,  description: "Called when the timer expires or the user dismisses." },
  { name: "title",       type: "string",        required: true,  description: "Primary message. Keep under 60 chars." },
  { name: "description", type: "string",                         description: "Supporting detail. Optional; 1–2 lines." },
  { name: "variant",     type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "Controls icon and icon color." },
  { name: "duration",    type: "number",        default: "4000", description: "Auto-dismiss delay in ms. Pass 0 to disable auto-dismiss." },
  { name: "position",    type: '"top-right" | "bottom-right" | "bottom-center" | "top-center"', default: '"bottom-right"', description: "Screen corner where the toast appears." },
  { name: "action",      type: "{ label: string; onClick: () => void }", description: "Optional inline action button." },
];

const CODE = {
  react: {
    filename: "Toast.tsx",
    code: `import { useState } from "react";
import { Toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Save changes</Button>

      <Toast
        open={open}
        onClose={() => setOpen(false)}
        variant="success"
        title="Changes saved"
        description="Your profile has been updated."
        position="bottom-right"
        action={{ label: "Undo", onClick: () => console.log("undo") }}
      />
    </>
  );
}`,
  },
  html: {
    filename: "toast.html",
    code: `<div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true" hidden>
  <span class="toast-icon"><!-- icon svg --></span>
  <div class="toast-body">
    <p class="toast-title">Changes saved</p>
    <p class="toast-desc">Your profile has been updated.</p>
  </div>
  <button class="toast-close" id="toastClose" aria-label="Dismiss">×</button>
</div>

<style>
  .toast {
    position: fixed; bottom: 16px; right: 16px; z-index: 9999;
    display: flex; align-items: flex-start; gap: 12px;
    width: 320px; max-width: calc(100vw - 32px);
    padding: 14px 16px; border-radius: 12px;
    background: rgb(var(--surface-raised));
    border: 1px solid rgb(var(--border));
    box-shadow: 0 8px 32px rgba(0,0,0,.25);
    animation: slideIn 200ms ease-out;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0);   }
  }
  .toast-body { flex: 1; min-width: 0; }
  .toast-title { font-size: 13px; font-weight: 500; color: rgb(var(--text-primary)); }
  .toast-desc  { font-size: 12px; color: rgb(var(--text-secondary)); margin-top: 2px; }
  .toast-close {
    width: 20px; height: 20px; border-radius: 4px; border: none;
    background: none; cursor: pointer; font-size: 16px;
    color: rgb(var(--text-tertiary)); display: flex; align-items: center; justify-content: center;
  }
</style>

<script>
  let timer;
  function showToast(duration = 4000) {
    const el = document.getElementById("toast");
    el.hidden = false;
    clearTimeout(timer);
    if (duration > 0) timer = setTimeout(hideToast, duration);
  }
  function hideToast() {
    document.getElementById("toast").hidden = true;
  }
  document.getElementById("toastClose").addEventListener("click", hideToast);
</script>`,
  },
  swift: {
    filename: "ToastView.swift",
    code: `import SwiftUI

// macOS: use NSUserNotification (deprecated) or UNUserNotificationCenter
// For in-app toasts, use a custom overlay

struct ToastView: View {
    let title: String
    let message: String?
    let variant: ToastVariant
    @Binding var isVisible: Bool

    enum ToastVariant { case info, success, warning, error }

    var iconName: String {
        switch variant {
        case .info:    return "info.circle"
        case .success: return "checkmark.circle"
        case .warning: return "exclamationmark.triangle"
        case .error:   return "xmark.circle"
        }
    }

    var iconColor: Color {
        switch variant {
        case .info:    return .blue
        case .success: return .green
        case .warning: return .orange
        case .error:   return .red
        }
    }

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: iconName)
                .foregroundStyle(iconColor)
                .font(.system(size: 15, weight: .medium))
            VStack(alignment: .leading, spacing: 2) {
                Text(title).font(.system(size: 13, weight: .medium))
                if let message {
                    Text(message).font(.system(size: 12)).foregroundStyle(.secondary)
                }
            }
            Spacer()
            Button { isVisible = false } label: {
                Image(systemName: "xmark")
                    .font(.system(size: 10, weight: .medium))
                    .foregroundStyle(.tertiary)
            }
            .buttonStyle(.plain)
        }
        .padding(14)
        .frame(width: 320)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(.separator, lineWidth: 0.5))
        .shadow(radius: 12, y: 4)
    }
}

// Attach to a window root view
struct RootView: View {
    @State private var toastVisible = false

    var body: some View {
        ContentView()
            .overlay(alignment: .bottomTrailing) {
                if toastVisible {
                    ToastView(title: "Changes saved", message: nil, variant: .success, isVisible: $toastVisible)
                        .padding()
                        .transition(.move(edge: .bottom).combined(with: .opacity))
                        .onAppear {
                            DispatchQueue.main.asyncAfter(deadline: .now() + 4) { toastVisible = false }
                        }
                }
            }
            .animation(.spring(duration: 0.25), value: toastVisible)
    }
}`,
  },
};

export default function DesktopNotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Desktop Notifications"
        description="Toast notifications for desktop and web — brief, non-blocking messages that appear in a screen corner to confirm actions, surface warnings, or report errors. Portaled to document.body; never interrupt flow."
      />

      {/* Demo */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <DesktopToastDemo />
        </ComponentPreview>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Variants</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Variant", "Icon color", "Use when"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { variant: "info",    color: "Blue",  use: "Neutral updates, tips, new features." },
                { variant: "success", color: "Green", use: "Confirmed saves, completed tasks, successful sends." },
                { variant: "warning", color: "Amber", use: "Non-blocking issues the user should know about but can continue." },
                { variant: "error",   color: "Red",   use: "Failed operations. Set duration=0 so it persists until the user dismisses." },
              ].map((row, i) => (
                <tr key={row.variant} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.variant}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.color}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Position */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Position</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Value", "Best for"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { value: "bottom-right",  use: "Default. Non-intrusive; far from primary content focus." },
                { value: "top-right",     use: "Apps with bottom-anchored toolbars or navigation." },
                { value: "bottom-center", use: "Mobile web or narrow viewports." },
                { value: "top-center",    use: "Critical alerts that need to be seen immediately." },
              ].map((row, i) => (
                <tr key={row.value} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.value}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The Toast renders via{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">createPortal</code> to{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">document.body</code> — it is never
          clipped by <code className="font-mono text-[13px] text-[rgb(var(--accent))]">overflow: hidden</code>{" "}
          ancestors. Auto-dismiss runs a{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">setTimeout</code> that is cleared if the user dismisses early or the component unmounts.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'Use role="status" and aria-live="polite" for informational toasts. Screen readers announce the content at the next natural pause.',
            'For urgent error toasts, switch to role="alert" and aria-live="assertive" — the announcement interrupts the current reading flow.',
            "aria-atomic=\"true\" ensures the full toast content is read at once rather than character by character as text updates.",
            "Never auto-dismiss error toasts (duration=0). Users may need to read error messages carefully or copy details. Auto-dismiss only low-urgency variants.",
            "The close button must be reachable by keyboard. Focus should not automatically move to the toast — it is supplementary information, not a blocking dialog.",
            "Respect prefers-reduced-motion: remove slide-in animation while keeping the visual appearance. The toast should still appear; just without motion.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 flex-shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
