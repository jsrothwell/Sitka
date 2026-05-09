import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Haptic Feedback" };

const HAPTIC_CATEGORIES = [
  {
    name: "Impact",
    description: "Physical strikes and collisions; conveys weight, solidity, and confirmation of direct manipulation.",
    tokens: [
      { id: "light", description: "Light tap, gentle confirmation, selection change", useWhen: "Picking from list, scroll end" },
      { id: "medium", description: "Medium-impact collision, standard action feedback", useWhen: "Button press, toggle switch" },
      { id: "heavy", description: "Heavy impact, strong physical feel", useWhen: "Destructive action confirmation, door knock" },
    ],
    platforms: {
      ios: "UIImpactFeedbackGenerator(style: .medium)",
      android: "Vibrator.vibrate(VibrationEffect.createPredefined(VibrationEffect.EFFECT_CLICK))",
      web: "navigator.vibrate(15)",
      reactNative: "Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)",
    },
  },
  {
    name: "Notification",
    description: "Event-driven signals for attention, success, warning, or error states.",
    tokens: [
      { id: "success", description: "Positive completion, task succeeded", useWhen: "Form submitted, upload complete" },
      { id: "warning", description: "Non-critical issue needs attention", useWhen: "Validation warning, battery low" },
      { id: "error", description: "Critical failure, action blocked", useWhen: "Network error, validation failed" },
    ],
    platforms: {
      ios: "UINotificationFeedbackGenerator",
      android: "Vibrator.vibrate(VibrationEffect.createPredefined(VibrationEffect.EFFECT_DOUBLE_CLICK))",
      web: "navigator.vibrate([50, 50, 50])",
      reactNative: "Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)",
    },
  },
  {
    name: "Selection",
    description: "Continuous tactile feedback during manipulation tasks like picking or adjusting.",
    tokens: [
      { id: "click", description: "Snap-to-grid or discrete selection tick", useWhen: "Picker wheel selection, slider increment" },
      { id: "pick", description: "Item chosen from set", useWhen: "Dropdown selection, segmented control change" },
    ],
    platforms: {
      ios: "UISelectionFeedbackGenerator",
      android: "Vibrator.vibrate(VibrationEffect.createPredefined(VibrationEffect.EFFECT_TICK))",
      web: "navigator.vibrate(8)",
      reactNative: "Haptics.selectionAsync()",
    },
  },
];

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function HapticsPage() {
  return (
    <div>
      <PageHeader
        title="Haptic Feedback"
        description="Tactile feedback patterns that complement visual and audio cues. All Sitka components respect the haptic taxonomy for consistent physical feeling across platforms."
      />

      {/* Overview */}
      <section className="mb-16">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Categories</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] max-w-3xl mb-6">
          Haptics convey meaning through vibration patterns and intensity. Sitka provides a
          cross-platform mapping so a notification-success feels equally affirming on iOS, Android, and the web (where supported).
        </p>

        <div className="space-y-6">
          {HAPTIC_CATEGORIES.map((category) => (
            <div
              key={category.name}
              id={category.name.toLowerCase()}
              className="scroll-mt-24"
            >
              <h3 className="text-xl font-semibold text-[rgb(var(--text-primary))] mb-2 flex items-center gap-3">
                {category.name}
                <span className="text-xs px-2 py-0.5 rounded-full bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] text-[rgb(var(--text-tertiary))]">
                  {category.tokens.length} tokens
                </span>
              </h3>
              <p className="text-sm text-[rgb(var(--text-secondary))] mb-4">{category.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tokens.map((token) => (
                  <div
                    key={token.id}
                    className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent-muted))] transition-colors"
                  >
                    <code className="text-sm font-mono text-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))] px-1.5 py-0.5 rounded">
                      haptic.{category.name.toLowerCase()}.{token.id}
                    </code>
                    <p className="mt-2 text-sm text-[rgb(var(--text-primary))]">{token.description}</p>
                    <p className="mt-1 text-xs text-[rgb(var(--text-tertiary))]">{token.useWhen}</p>
                  </div>
                ))}
              </div>

              {/* Platform implementations */}
              <div className="mt-4 p-4 rounded-xl bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border-subtle))]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
                  Platform API mapping
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {Object.entries(category.platforms).map(([platform, api]) => (
                    <div key={platform}>
                      <div className="text-[rgb(var(--text-tertiary))] text-xs mb-1 uppercase">{platform}</div>
                      <code className="block text-[rgb(var(--text-primary))] font-mono text-xs bg-[rgb(var(--surface))] px-2 py-1 rounded">
                        {api}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="mb-16">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Best practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Don't overuse",
              description: "Every haptic should mean something. Avoid haptics for routine interactions; reserve for confirmation, error, or delight moments.",
            },
            {
              title: "Respect accessibility",
              description: "Users can disable haptics system-wide. Your app must work without them — never gate functionality behind haptic feedback.",
            },
            {
              title: "Keep it brief",
              description: "Haptics should last 10–50ms. Longer vibrations feel like buzzing and are annoying.",
            },
            {
              title: "Sync with visual/audio",
              description: "Haptics should align with the moment of action completion. Delay breaks the illusion of causality.",
            },
            {
              title: "Test on device",
              description: "Simulators cannot accurately reproduce haptics. Test on real hardware to verify intensity and duration.",
            },
            {
              title: "Use platform defaults",
              description: "Don't invent custom patterns unless your brand requires it. System patterns are already learned by users.",
            },
          ].map((practice) => (
            <div
              key={practice.title}
              className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]"
            >
              <h4 className="font-medium text-[rgb(var(--text-primary))] mb-1">{practice.title}</h4>
              <p className="text-sm text-[rgb(var(--text-secondary))]">{practice.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation example */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          Sitka exposes a unified haptic utility that maps to platform-native APIs. Use it in your
          interaction handlers to keep tactile feedback consistent.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] overflow-hidden">
              <div className="px-4 py-2 bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))] text-xs font-mono text-[rgb(var(--text-tertiary))]">
                hooks/useHaptic.ts
              </div>
              <pre className="p-4 text-sm text-[rgb(var(--text-secondary))] overflow-x-auto">
{`import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export type HapticType =
  | "impact.light" | "impact.medium" | "impact.heavy"
  | "notification.success" | "notification.warning" | "notification.error"
  | "selection.click" | "selection.pick";

export function useHaptic() {
  const trigger = (type: HapticType) => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const [category, variant] = type.split('.') as [HapticCategory, string];
      // Maps to expo-haptics or react-native-haptic-feedback
      Haptics[category]?.[variant]?.();
    } else if (navigator.vibrate) {
      // Web fallback
      const patterns: Record<HapticType, number[]> = {
        "impact.light": [8],
        "impact.medium": [15],
        "impact.heavy": [25],
        "notification.success": [20, 50, 20],
        "notification.error": [30, 30, 30],
      };
      navigator.vibrate(patterns[type]);
    }
  };

  return { trigger };
}`}
              </pre>
            </div>
          </div>

          <div>
            <div className="p-4 rounded-xl bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border-subtle))] h-full">
              <h4 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-3">Usage</h4>
              <pre className="text-xs text-[rgb(var(--text-secondary))] font-mono space-y-2">
{`const { trigger } = useHaptic();

// Button press
<Button
  onPress={() => {
    trigger("impact.medium");
    handleSubmit();
  }}
/>

// Error state
if (error) {
  trigger("notification.error");
}

// Selection in picker
trigger("selection.click");`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
