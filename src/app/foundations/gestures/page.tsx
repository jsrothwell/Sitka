import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Gestures" };

const GESTURES = [
  {
    name: "Tap",
    icon: "●",
    description: "Brief touch contact, single point. Used for selection, activation, and precise interaction.",
    ios: {
      name: "UITapGestureRecognizer",
      haptic: "UIFeedbackStyle.light",
      velocity: "N/A",
      threshold: "Touch up inside",
    },
    macos: {
      name: "NSClickGestureRecognizer",
      haptic: "NSHapticFeedbackPattern.generic",
      velocity: "N/A",
      threshold: "Mouse up inside",
    },
    web: {
      event: "click / touchend",
      haptic: "Navigator.vibrate(8) for light",
      threshold: "Pointer down/up within 8px tolerance",
    },
    guidance: [
      "Use for buttons, links, toggles, and single-selection controls",
      "Minimum target size 44×44 pt (iOS HIG)",
      "Double-tap rate limit is 0.3s between taps",
      "Avoid nesting tappable elements",
    ],
  },
  {
    name: "Double Tap",
    icon: "●●",
    description: "Two quick successive taps. Used for zoom, favorite, or alternate action.",
    ios: {
      name: "UITapGestureRecognizer (numberOfTapsRequired = 2)",
      haptic: "UIImpactFeedbackStyle.medium",
      velocity: "N/A",
      threshold: "Two tap events within 300ms",
    },
    macos: {
      name: "NSClickGestureRecognizer ( numberOfClicksRequired = 2)",
      haptic: "None", 
      velocity: "N/A",
      threshold: "Two click events within 300ms",
    },
    web: {
      event: "Custom via click/touch timing",
      haptic: "Navigator.vibrate(15)",
      threshold: "Two clicks within 300ms",
    },
    guidance: [
      "Should not conflict with scroll gesture",
      "Provide visual feedback on first tap",
      "Disable on form controls to prevent accidental double-submit",
      "iOS Maps zoom, Photos favorite are canonical examples",
    ],
  },
  {
    name: "Long Press",
    icon: "○",
    description: "Press and hold for 500ms+. Triggers context menus, drag initiation, or haptic confirmation.",
    ios: {
      name: "UILongPressGestureRecognizer",
      haptic: "UIImpactFeedbackStyle.heavy",
      velocity: "N/A",
      threshold: "0.5s minimum press duration",
    },
    macos: {
      name: "NSPressGestureRecognizer",
      haptic: "NSHapticFeedbackPattern.generic",
      velocity: "N/A",
      threshold: "0.5s minimum press duration",
    },
    web: {
      event: "touchstart / mousedown + timer",
      haptic: "Navigator.vibrate(50) on recognition",
      threshold: "500ms hold, optional movement tolerance 10px",
    },
    guidance: [
      "Provides haptic confirmation on recognition",
      "Shows contextual menu or drag handle after recognition",
      "Allow 10px movement tolerance to avoid canceling slight shifts",
      "Disambiguation: differentiate from force touch on capable devices",
    ],
  },
  {
    name: "Swipe",
    icon: "→",
    description: "Quick horizontal or vertical flick. Used for navigation, dismissal, or reveal actions.",
    ios: {
      name: "UISwipeGestureRecognizer",
      haptic: "UISelectionFeedbackGenerator for edge swipe",
      velocity: "800px/s minimum",
      threshold: "30px translation",
    },
    macos: {
      name: "NSPanGestureRecognizer with velocity tracking",
      haptic: "None",
      velocity: "Points/s equivalent",
      threshold: "Velocity threshold + minimum translation",
    },
    web: {
      event: "pointermove with velocity tracking",
      haptic: "None typically",
      threshold: "Velocity > 0.5px/ms OR translation > 50px",
    },
    guidance: [
      "Direction matters: left/right for deck navigation, up/down for dismiss",
      "iOS swipe-to-delete/archive pattern (~75% screen width swipe)",
      "Should feel decisive — rapid acceleration, not dragging",
      "Show arrow/chevron hints for discoverability",
    ],
  },
  {
    name: "Pan / Drag",
    icon: "✋",
    description: "Continuous tracking of finger movement. Used for scrolling, repositioning, and drawing.",
    ios: {
      name: "UIPanGestureRecognizer",
      haptic: "Optional tick feedback on grid alignment",
      velocity: "N/A",
      threshold: "3–5px minimum translation before began",
    },
    macos: {
      name: "NSPanGestureRecognizer",
      haptic: "None",
      velocity: "N/A",
      threshold: "3–5pt minimum translation",
    },
    web: {
      event: "pointerdown + pointermove",
      haptic: "Optional on alignment",
      threshold: "3px before drag begins",
    },
    guidance: [
      "Uses inertia/flick for deceleration ending (native scroll)",
      "Should maintain 1:1 touch fidelity (no lag)",
      "Boundary bounces and rubber-banding for overscroll",
      "Disable text selection during drag on interactive elements",
    ],
  },
  {
    name: "Pinch",
    icon: "⚏",
    description: "Two-finger scale gesture. Used for zoom in/out in maps, galleries, document viewers.",
    ios: {
      name: "UIPinchGestureRecognizer",
      haptic: "None by default; optional on scale thresholds",
      velocity: "N/A",
      threshold: "Scale factor 1.0 baseline",
    },
    macos: {
      name: "NSPinchGestureRecognizer",
      haptic: "None",
      velocity: "N/A",
      threshold: "Scale 1.0 baseline",
    },
    web: {
      event: "gesturestart / gesturechange / gestureend (touch)",
      haptic: "None",
      threshold: "Track scale relative to initial distance",
    },
    guidance: [
      "Scale factor typically clamped 0.5x–3x",
      "Pinch center point tracks focal point for zoom origin",
      "Provide double-tap to zoom alternative",
      "Sync with semantic zoom levels (e.g., 100%, 150%, 200%)",
    ],
  },
  {
    name: "Rotate",
    icon: "↻",
    description: "Two-finger rotation. Used for image rotation, compass, map orientation.",
    ios: {
      name: "UIRotationGestureRecognizer",
      haptic: "None",
      velocity: "N/A",
      threshold: "Rotation in radians from start angle",
    },
    macos: {
      name: "NSRotationGestureRecognizer",
      haptic: "None",
      velocity: "N/A",
      threshold: "Radians from start",
    },
    web: {
      event: "gesturestart / gesturechange (rotate)",
      haptic: "None",
      threshold: "Angle delta from initial touch down",
    },
    guidance: [
      "Often combined with pinch for freeform transform tools",
      "Provide 0°, 90°, 180°, 270° snap points for precision tools",
      "Display rotation value as overlay during gesture",
      "Can conflict with pinch — prefer combined gesture recognizer delegate",
    ],
  },
  {
    name: "Force Touch / 3D Touch",
    icon: "⏟",
    description: "Pressure-sensitive interaction. Peek (light) and Pop (deep) on iOS; Force Click on macOS.",
    ios: {
      name: "UIForceTouchGestureRecognizer / traitCollection.forceTouchCapability",
      haptic: "UIFeedbackStyle.medium (peek), .heavy (pop)",
      velocity: "N/A",
      threshold: "Peek at 0.5 force, Pop at 1.0+ (device-dependent)",
    },
    macos: {
      name: "NSPressureGestureRecognizer / trackpad force click",
      haptic: "Taptic Engine feedback",
      velocity: "N/A",
      threshold: "Force > 1.0 (trackpad click depth)",
    },
    web: {
      event: "pointerdown with pressure property (webkit)",
      haptic: "None",
      threshold: "pressure >= 0.5 (normalized 0–1)",
    },
    guidance: [
      "Peek shows preview; Pop commits action",
      "Provide alternative long-press for devices without pressure sensitivity",
      "Disable on accessibility zoom areas",
      "Deprecated in iOS 13+ in favor of context menus, but still relevant for macOS trackpad",
    ],
  },
];

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function GesturesPage() {
  return (
    <div>
      <PageHeader
        title="Gestures"
        description="Reference for touch, pointer, and haptic interaction patterns across iOS, macOS, and web. Use these gestures as building blocks for consistent, platform-appropriate behavior."
      />

      {/* Overview */}
      <section className="mb-16">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">The gesture taxonomy</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] max-w-3xl mb-6">
          Gestures are the primary input for touch and spatial interfaces. Sitka defines gesture semantics
          that map to native platform APIs while degrading gracefully to the web. Each gesture has
          clear recognition thresholds, haptic feedback profiles, and platform-specific mapping.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
          {GESTURES.map((gesture) => (
            <div
              key={gesture.name}
              className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent-muted))] transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] font-mono font-medium">
                  {gesture.icon}
                </span>
                <h3 className="font-semibold text-[rgb(var(--text-primary))]">{gesture.name}</h3>
              </div>
              <p className="text-xs text-[rgb(var(--text-secondary))] leading-relaxed">{gesture.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed gesture cards */}
      <section className="mb-16">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Gesture reference</h2>
        <div className="space-y-8">
          {GESTURES.map((gesture) => (
            <div
              key={gesture.name}
              id={gesture.name.toLowerCase().replace(" ", "-")}
              className="scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold text-[rgb(var(--text-primary))]">{gesture.name}</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] font-mono">
                  {gesture.ios.name}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Platform implementations */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PlatformCard platform="iOS" data={gesture.ios} />
                    <PlatformCard platform="macOS" data={gesture.macos} />
                    <PlatformCard platform="Web" data={gesture.web} />
                  </div>

                  {/* Guidance */}
                  <div className="p-5 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
                    <h4 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 rounded-full bg-[rgb(var(--accent))]" />
                      Usage guidance
                    </h4>
                    <ul className="space-y-2">
                      {gesture.guidance.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-[rgb(var(--text-secondary))]">
                          <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quick reference table */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 p-4 rounded-xl bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border-subtle))]">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
                      Quick reference
                    </h4>
                    <table className="w-full text-sm">
                      <tbody className="space-y-2">
                        <tr>
                          <td className="text-[rgb(var(--text-secondary))] py-1">Haptic</td>
                          <td className="text-[rgb(var(--text-primary))] text-right font-mono text-xs">
                            {gesture.ios.haptic}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-[rgb(var(--text-secondary))] py-1">Velocity</td>
                          <td className="text-[rgb(var(--text-primary))] text-right font-mono text-xs">
                            {gesture.ios.velocity}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-[rgb(var(--text-secondary))] py-1">Threshold</td>
                          <td className="text-[rgb(var(--text-primary))] text-right font-mono text-xs">
                            {gesture.ios.threshold}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-4 pt-4 border-t border-[rgb(var(--border-subtle))]">
                      <h5 className="text-xs font-medium text-[rgb(var(--text-tertiary))] mb-2">Related tokens</h5>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(gesture.ios)
                          .filter(([key]) => key !== "name")
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <span
                              key={key}
                              className="px-1.5 py-0.5 text-[10px] rounded bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] font-mono"
                            >
                              {typeof value === "string" && value.length > 20
                                ? value.slice(0, 20) + "..."
                                : value}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Haptic feedback section */}
      <section className="mb-16">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Haptic feedback taxonomy</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 max-w-3xl">
          Sitka defines three haptic categories that map to device Taptic Engine capabilities.
          Use them consistently to create a coherent tactile language.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Impact",
              description: "Physical-like collisions and taps",
              tokens: [
                { name: "light", use: "Light taps, selection changes" },
                { name: "medium", use: "Standard actions, button press" },
                { name: "heavy", use: "Destructive actions, confirmations" },
              ],
            },
            {
              name: "Notification",
              description: "Event-driven signals",
              tokens: [
                { name: "success", use: "Task completed, save confirmed" },
                { name: "warning", use: "Non-critical issue, attention needed" },
                { name: "error", use: "Failed action, validation error" },
              ],
            },
            {
              name: "Selection",
              description: "Continuous feedback during manipulation",
              tokens: [
                { name: "click", use: "Picker wheel selection" },
                { name: "pick", use: "Item chosen from list" },
              ],
            },
          ].map((category) => (
            <div key={category.name} className="p-5 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
              <h3 className="font-semibold text-[rgb(var(--text-primary))] mb-1">{category.name}</h3>
              <p className="text-xs text-[rgb(var(--text-secondary))] mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.tokens.map((token) => (
                  <li key={token.name} className="flex items-start gap-2">
                    <code className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-[rgb(var(--surface-raised))] text-[rgb(var(--accent))] border border-[rgb(var(--border-subtle))]">
                      {token.name}
                    </code>
                    <span className="text-xs text-[rgb(var(--text-secondary))]">{token.use}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation guidelines */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Implementation</h2>
        <div className="p-6 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] overflow-x-auto">
          <pre className="text-sm text-[rgb(var(--text-secondary))] font-mono">
{`// iOS Swift: UIImpactFeedbackGenerator for tap
let generator = UIImpactFeedbackGenerator(style: .medium)
generator.prepare()
generator.impactOccurred()

// Web: Navigator.vibrate for tactile feedback
element.addEventListener("click", () => {
  navigator.vibrate?.(15)  // Light tap
})

// React Native: React Native Haptics
import * as Haptics from 'expo-haptics';
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);`}
          </pre>
        </div>
      </section>
    </div>
  );
}

function PlatformCard({
  platform,
  data,
}: {
  platform: "iOS" | "macOS" | "Web";
  data: Record<string, string>;
}) {
  return (
    <div className="p-4 rounded-xl bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border-subtle))]">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
          {platform}
        </h4>
        <span className="text-xs px-1.5 py-0.5 rounded bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] font-mono">
          {data.name}
        </span>
      </div>
      <table className="w-full text-xs">
        <tbody className="space-y-1">
          {Object.entries(data)
            .filter(([key]) => key !== "name")
            .map(([key, value]) => (
              <tr key={key}>
                <td className="text-[rgb(var(--text-tertiary))] py-0.5 capitalize w-24">{key}</td>
                <td className="text-[rgb(var(--text-primary))] text-right font-mono text-[10px] truncate">
                  {value}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
