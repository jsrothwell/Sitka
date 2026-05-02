import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { MobileNotificationDemo } from "@/components/docs/NotificationDemo";

export const metadata: Metadata = { title: "Mobile Notifications" };

const CODE = {
  react: {
    filename: "MobileNotification.tsx",
    code: `// iOS-style banner notification inside a phone frame
// For real apps, use the OS notification API (Expo Notifications / FCM)

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";

interface BannerProps {
  visible: boolean;
  icon: React.ReactNode;
  app: string;
  title: string;
  body: string;
  onDismiss: () => void;
  duration?: number; // ms, default 3500
}

export function NotificationBanner({
  visible, icon, app, title, body, onDismiss, duration = 3500,
}: BannerProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [visible, duration, onDismiss]);

  return (
    <div
      className={cn(
        "fixed top-safe-top left-0 right-0 z-50 px-3 pt-2 transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-2xl
        bg-surface-raised/90 backdrop-blur-sm border border-border
        shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
        <div className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wide truncate">{app}</span>
            <span className="text-[10px] text-text-tertiary flex-shrink-0">now</span>
          </div>
          <p className="text-[12px] font-semibold text-text-primary truncate">{title}</p>
          <p className="text-[11px] text-text-secondary truncate">{body}</p>
        </div>
      </div>
    </div>
  );
}

// Usage
export function Example() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button onClick={() => setVisible(true)}>Trigger notification</button>
      <NotificationBanner
        visible={visible}
        icon={<MessageCircle className="w-4 h-4 text-blue-400" />}
        app="Messages"
        title="Jamie replied to you"
        body="Sounds good, see you at 3pm!"
        onDismiss={() => setVisible(false)}
      />
    </>
  );
}`,
  },
  html: {
    filename: "notification.html",
    code: `<div class="notification" id="notification" aria-live="assertive" aria-atomic="true" role="alert" hidden>
  <div class="notification-icon">
    <!-- icon here -->
  </div>
  <div class="notification-body">
    <div class="notification-meta">
      <span class="notification-app">Messages</span>
      <span class="notification-time">now</span>
    </div>
    <p class="notification-title">Jamie replied to you</p>
    <p class="notification-subtitle">Sounds good, see you at 3pm!</p>
  </div>
</div>

<style>
  .notification {
    position: fixed;
    top: env(safe-area-inset-top, 0);
    left: 0; right: 0;
    z-index: 9999;
    padding: 8px 12px;
    transform: translateY(-110%);
    transition: transform 300ms ease-out;
  }
  .notification.visible { transform: translateY(0); }
  .notification > div {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 10px 12px; border-radius: 16px;
    background: rgba(var(--surface-raised), 0.92);
    backdrop-filter: blur(12px);
    border: 1px solid rgb(var(--border));
    box-shadow: 0 4px 20px rgba(0,0,0,.25);
  }
  .notification-icon {
    width: 32px; height: 32px; border-radius: 10px;
    background: rgb(var(--surface));
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .notification-body { flex: 1; min-width: 0; }
  .notification-meta { display: flex; justify-content: space-between; }
  .notification-app  { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; color: rgb(var(--text-tertiary)); }
  .notification-time { font-size: 10px; color: rgb(var(--text-tertiary)); }
  .notification-title    { font-size: 12px; font-weight: 600; color: rgb(var(--text-primary)); margin-top: 2px; }
  .notification-subtitle { font-size: 11px; color: rgb(var(--text-secondary)); }
</style>

<script>
  let timer;
  function showNotification(duration = 3500) {
    const el = document.getElementById("notification");
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add("visible"));
    clearTimeout(timer);
    timer = setTimeout(hideNotification, duration);
  }
  function hideNotification() {
    const el = document.getElementById("notification");
    el.classList.remove("visible");
    el.addEventListener("transitionend", () => { el.hidden = true; }, { once: true });
  }
</script>`,
  },
  swift: {
    filename: "NotificationDemo.swift",
    code: `import SwiftUI
import UserNotifications

// Request permission
func requestPermission() {
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, _ in
        print(granted ? "Granted" : "Denied")
    }
}

// Schedule a local notification
func scheduleNotification(title: String, body: String, delay: TimeInterval = 1) {
    let content = UNMutableNotificationContent()
    content.title = title
    content.body = body
    content.sound = .default

    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: delay, repeats: false)
    let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: trigger)

    UNUserNotificationCenter.current().add(request)
}

// In-app banner using SwiftUI overlay
struct InAppBanner: View {
    let title: String
    let body: String
    @Binding var visible: Bool

    var body: some View {
        VStack {
            if visible {
                HStack(spacing: 12) {
                    Image(systemName: "message.fill")
                        .foregroundStyle(.blue)
                        .padding(8)
                        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 10))
                    VStack(alignment: .leading, spacing: 2) {
                        Text(title).font(.subheadline.weight(.semibold))
                        Text(body).font(.caption).foregroundStyle(.secondary)
                    }
                    Spacer()
                }
                .padding()
                .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 16))
                .padding()
                .transition(.move(edge: .top).combined(with: .opacity))
            }
            Spacer()
        }
        .animation(.spring(duration: 0.3), value: visible)
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 3.5) { visible = false }
        }
    }
}`,
  },
};

export default function MobileNotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Mobile Notifications"
        description="iOS-style banner notifications that slide in from the top of the screen. Used for real-time alerts, messages, and system events. Banners auto-dismiss after a few seconds; they never block interaction with the app behind them."
      />

      {/* Demo */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <MobileNotificationDemo />
        </ComponentPreview>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3">
          Tap a type to trigger the banner. It auto-dismisses after 3.5 s.
        </p>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Part", "Required", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { part: "App icon / colored icon", req: "Yes", notes: "Identifies the source at a glance. Use the app icon for system notifications; a category icon (filled) for in-app banners." },
                { part: "App name", req: "Yes", notes: "Small uppercase label. Gives context before the user reads the title." },
                { part: "Timestamp", req: "Recommended", notes: "\"now\", \"2m ago\", or an absolute time. Omit only if the banner is ephemeral and timing is always 'now'." },
                { part: "Title", req: "Yes", notes: "One line, ≤50 chars. The most important information — often the sender name or event." },
                { part: "Body / subtitle", req: "Recommended", notes: "Preview of the content. 1–2 lines max. Truncate with ellipsis if longer." },
                { part: "Action buttons", req: "No", notes: "Long-press affordance on iOS (UNNotificationAction). In-app banners can show up to 2 inline buttons for quick actions." },
              ].map((row, i) => (
                <tr key={row.part} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.part}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.req}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Notification types */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Notification types</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Type", "Use case", "Urgency", "Auto-dismiss"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Message",   use: "New chat, reply, mention",           urgency: "Medium",   dismiss: "3–5 s" },
                { type: "Social",    use: "Like, follow, comment",              urgency: "Low",      dismiss: "3–5 s" },
                { type: "Alert",     use: "Low battery, storage, connectivity", urgency: "High",     dismiss: "Never (sticky)" },
                { type: "Reminder",  use: "Calendar event, task due",           urgency: "Medium",   dismiss: "5 s" },
                { type: "Promo",     use: "Sale, new content, feature",         urgency: "None",     dismiss: "3–4 s" },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.type}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.urgency}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.dismiss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Design decisions */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Design decisions</h2>
        <ul className="space-y-4 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            { title: "Banners never block interaction", body: "The banner sits above content without a blocking overlay. Users can interact with the app while the banner is visible. Never use a full-screen overlay for a notification." },
            { title: "Frosted glass surface", body: "backdrop-filter: blur(12px) with a semi-transparent surface lets users see context behind the banner — they don't lose their place in the app. Ensure enough opacity for contrast in both light and dark modes." },
            { title: "Safe area clearance", body: "Position banners at env(safe-area-inset-top) on iOS to avoid the Dynamic Island and status bar. Use a top-padding of ~8px after the safe area." },
            { title: "Duration tuned to content length", body: "Short titles (under 40 chars) can dismiss in 3 s. Longer content or alerts should stay 5 s or be sticky. Users reading slowly should not have content yanked away." },
            { title: "Sound + haptics", body: "System notifications pair with a sound. In-app banners should not auto-play sound — use haptics (UIFeedbackGenerator / Haptics API) for subtle acknowledgement instead." },
          ].map(({ title, body }) => (
            <li key={title} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 flex-shrink-0">→</span>
              <span><strong className="text-[rgb(var(--text-primary))]">{title}.</strong> {body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'Use role="alert" with aria-live="assertive" for urgent notifications. For lower-priority banners use aria-live="polite" so the announcement waits for a natural pause.',
            "aria-atomic=\"true\" ensures the entire banner content is read as one unit when it appears, rather than piece by piece.",
            "Do not auto-dismiss notifications that require user action (errors, critical alerts). A user who steps away from the screen should not miss an actionable state.",
            "Reduce Motion: Respect prefers-reduced-motion by removing slide animation. The banner can still appear/disappear instantly — just without the translate transition.",
            "VoiceOver / TalkBack: The notification should be announced immediately on appearance. Test that the app name, title, and body are all read in order.",
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
