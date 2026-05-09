import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Download, Plus, Trash2 } from "lucide-react";
import { ButtonMobileDemo } from "@/components/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Button" };

const PROPS = [
  {
    name: "variant",
    type: '"primary" | "secondary" | "ghost" | "danger" | "glass"',
    default: '"primary"',
    description: "Controls the visual style of the button.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "icon"',
    default: '"md"',
    description: "Sets the height, padding, and font size.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Shows a spinner and disables interaction.",
  },
  {
    name: "leftIcon",
    type: "ReactNode",
    description: "Icon rendered to the left of the label.",
  },
  {
    name: "rightIcon",
    type: "ReactNode",
    description: "Icon rendered to the right of the label.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents all interaction and dims the button.",
  },
];

const CODE = {
  react: {
    filename: "Button.tsx",
    code: `import { Button } from "@/components/ui/Button";
import { ArrowRight, Download } from "lucide-react";

// Primary — the default call-to-action
<Button variant="primary">Get Started</Button>

// Secondary — for supporting actions
<Button variant="secondary">Learn More</Button>

// Ghost — for low-emphasis, inline actions
<Button variant="ghost">Cancel</Button>

// Danger — destructive actions
<Button variant="danger">Delete Account</Button>

// Glass — for overlays and hero sections
<Button variant="glass">Explore</Button>

// With icons
<Button leftIcon={<Download className="w-4 h-4" />}>
  Download
</Button>
<Button rightIcon={<ArrowRight className="w-4 h-4" />}>
  Continue
</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading>Saving...</Button>

// Disabled
<Button disabled>Unavailable</Button>`,
  },
  html: {
    filename: "button.html",
    code: `<!-- CSS variables are defined in tokens.css -->

<!-- Primary -->
<button class="btn btn-primary">Get Started</button>

<!-- Secondary -->
<button class="btn btn-secondary">Learn More</button>

<!-- Ghost -->
<button class="btn btn-ghost">Cancel</button>

<!-- Danger -->
<button class="btn btn-danger">Delete Account</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-md">Medium</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- With icon -->
<button class="btn btn-primary">
  <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
  Continue
</button>

<!-- Loading -->
<button class="btn btn-primary btn-loading" disabled>
  <span class="btn-spinner"></span>
  Saving...
</button>

<!-- Disabled -->
<button class="btn btn-primary" disabled>Unavailable</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: var(--font-sans);
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
    outline: none;
    user-select: none;
  }
  .btn:active { transform: scale(0.97); }
  .btn:focus-visible {
    box-shadow: 0 0 0 2px var(--color-brand-500);
    outline-offset: 2px;
  }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }

  /* Variants */
  .btn-primary {
    background: var(--color-brand-500);
    color: #fff;
    box-shadow: 0 0 0 1px rgba(139,109,255,.3), 0 2px 8px rgba(139,109,255,.25);
  }
  .btn-primary:hover { opacity: 0.9; }

  .btn-secondary {
    background: var(--color-surface);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
  }
  .btn-secondary:hover { border-color: var(--color-brand-500); color: var(--color-brand-500); }

  .btn-ghost {
    background: transparent;
    color: var(--color-text-secondary);
  }
  .btn-ghost:hover { background: var(--color-surface); color: var(--color-text-primary); }

  .btn-danger {
    background: #ef4444;
    color: #fff;
    box-shadow: 0 2px 8px rgba(239,68,68,.3);
  }
  .btn-danger:hover { background: #dc2626; }

  /* Sizes */
  .btn-sm  { height: 32px; padding: 0 12px; font-size: 12px; border-radius: 8px; }
  .btn-md  { height: 40px; padding: 0 16px; font-size: 13px; border-radius: 8px; }
  .btn-lg  { height: 48px; padding: 0 20px; font-size: 15px; border-radius: 12px; }

  /* Icon */
  .btn-icon { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; }

  /* Spinner */
  .btn-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>`,
  },
  swift: {
    filename: "SitkaButton.swift",
    code: `import SwiftUI

// MARK: - Button Variant
enum SitkaButtonVariant {
    case primary, secondary, ghost, danger, glass
}

// MARK: - Button Size
enum SitkaButtonSize {
    case small, medium, large

    var height: CGFloat {
        switch self {
        case .small:  return 32
        case .medium: return 40
        case .large:  return 48
        }
    }

    var horizontalPadding: CGFloat {
        switch self {
        case .small:  return 12
        case .medium: return 16
        case .large:  return 20
        }
    }

    var fontSize: CGFloat {
        switch self {
        case .small:  return 12
        case .medium: return 13
        case .large:  return 15
        }
    }

    var cornerRadius: CGFloat {
        switch self {
        case .small, .medium: return 10
        case .large:          return 14
        }
    }
}

// MARK: - SitkaButton
struct SitkaButton: View {
    let title: String
    var variant: SitkaButtonVariant = .primary
    var size: SitkaButtonSize = .medium
    var isLoading: Bool = false
    var isDisabled: Bool = false
    var leftIcon: String? = nil  // SF Symbol name
    var rightIcon: String? = nil
    let action: () -> Void

    @State private var isPressed = false
    @Environment(\\.colorScheme) private var colorScheme

    var body: some View {
        Button(action: action) {
            HStack(spacing: iconSpacing) {
                if isLoading {
                    ProgressView()
                        .scaleEffect(0.7)
                        .tint(foregroundColor)
                } else if let icon = leftIcon {
                    Image(systemName: icon)
                        .font(.system(size: size.fontSize - 1, weight: .medium))
                }

                Text(title)
                    .font(.system(size: size.fontSize, weight: .medium))

                if !isLoading, let icon = rightIcon {
                    Image(systemName: icon)
                        .font(.system(size: size.fontSize - 1, weight: .medium))
                }
            }
            .foregroundColor(foregroundColor)
            .frame(height: size.height)
            .padding(.horizontal, size.horizontalPadding)
            .background(backgroundView)
            .clipShape(RoundedRectangle(cornerRadius: size.cornerRadius, style: .continuous))
            .overlay(borderOverlay)
            .shadow(color: shadowColor, radius: shadowRadius, x: 0, y: 2)
            .scaleEffect(isPressed ? 0.97 : 1.0)
            .opacity(isDisabled ? 0.4 : 1.0)
        }
        .buttonStyle(PlainButtonStyle())
        .disabled(isDisabled || isLoading)
        .pressAction(
            onPress: { withAnimation(.spring(response: 0.2, dampingFraction: 0.8)) { isPressed = true } },
            onRelease: { withAnimation(.spring(response: 0.2, dampingFraction: 0.8)) { isPressed = false } }
        )
    }

    // MARK: - Computed Styling
    private var foregroundColor: Color {
        switch variant {
        case .primary, .danger: return .white
        case .secondary, .ghost, .glass:
            return Color(UIColor.label)
        }
    }

    @ViewBuilder
    private var backgroundView: some View {
        switch variant {
        case .primary:
            Color(hex: "#8B6DFF")
        case .secondary:
            Color(UIColor.secondarySystemBackground)
        case .ghost:
            Color.clear
        case .danger:
            Color(hex: "#EF4444")
        case .glass:
            Color(UIColor.systemBackground).opacity(0.72)
                .background(.ultraThinMaterial)
        }
    }

    @ViewBuilder
    private var borderOverlay: some View {
        switch variant {
        case .secondary:
            RoundedRectangle(cornerRadius: size.cornerRadius, style: .continuous)
                .stroke(Color(UIColor.separator), lineWidth: 1)
        case .glass:
            RoundedRectangle(cornerRadius: size.cornerRadius, style: .continuous)
                .stroke(Color.white.opacity(0.2), lineWidth: 1)
        default:
            EmptyView()
        }
    }

    private var shadowColor: Color {
        switch variant {
        case .primary:  return Color(hex: "#8B6DFF").opacity(0.3)
        case .danger:   return Color(hex: "#EF4444").opacity(0.3)
        default:        return .clear
        }
    }

    private var shadowRadius: CGFloat {
        switch variant {
        case .primary, .danger: return 8
        default: return 0
        }
    }

    private var iconSpacing: CGFloat {
        switch size {
        case .small:  return 6
        case .medium: return 8
        case .large:  return 10
        }
    }
}

// MARK: - Preview
#Preview {
    VStack(spacing: 16) {
        SitkaButton(title: "Get Started", variant: .primary)  { }
        SitkaButton(title: "Learn More", variant: .secondary) { }
        SitkaButton(title: "Cancel",     variant: .ghost)     { }
        SitkaButton(title: "Delete",     variant: .danger)    { }
        SitkaButton(title: "Continue",   variant: .primary, rightIcon: "arrow.right") { }
        SitkaButton(title: "Saving…",    variant: .primary, isLoading: true) { }
        SitkaButton(title: "Small",      variant: .primary, size: .small) { }
        SitkaButton(title: "Large",      variant: .primary, size: .large) { }
    }
    .padding()
}`,
  },
  macos: {
    filename: "SitkaButton+macOS.swift",
    code: `import SwiftUI

// macOS SitkaButton — same API as iOS, AppKit-aligned colors and
// first-class keyboard shortcut support.

struct SitkaButton: View {
    let title: String
    var variant: SitkaButtonVariant = .primary
    var size: SitkaButtonSize = .medium
    var isLoading: Bool = false
    var isDisabled: Bool = false
    var leftIcon: String? = nil
    var rightIcon: String? = nil
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 6) {
                if isLoading {
                    ProgressView().scaleEffect(0.7).tint(foregroundColor)
                } else if let icon = leftIcon {
                    Image(systemName: icon)
                        .font(.system(size: size.fontSize - 1, weight: .medium))
                }
                Text(title)
                    .font(.system(size: size.fontSize, weight: .medium))
                if !isLoading, let icon = rightIcon {
                    Image(systemName: icon)
                        .font(.system(size: size.fontSize - 1, weight: .medium))
                }
            }
            .foregroundColor(foregroundColor)
            .padding(.horizontal, size.horizontalPadding)
            .frame(minHeight: size.height)
            .background(background)
            .clipShape(RoundedRectangle(cornerRadius: size.cornerRadius, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: size.cornerRadius, style: .continuous)
                    .stroke(borderColor, lineWidth: 1)
            )
        }
        .buttonStyle(.plain)
        .disabled(isDisabled || isLoading)
        .opacity(isDisabled ? 0.45 : 1)
    }

    private var foregroundColor: Color {
        switch variant {
        case .primary:   return .white
        case .secondary: return Color(.labelColor)
        case .ghost:     return Color(.labelColor)
        case .danger:    return .white
        case .glass:     return .white
        }
    }

    private var background: some View {
        Group {
            switch variant {
            case .primary:   Color.accentColor
            case .secondary: Color(NSColor.controlBackgroundColor)
            case .ghost:     Color.clear
            case .danger:    Color.red
            case .glass:     Color(NSColor.windowBackgroundColor).opacity(0.6)
            }
        }
    }

    private var borderColor: Color {
        switch variant {
        case .secondary: Color(NSColor.separatorColor)
        case .glass:     Color(NSColor.separatorColor).opacity(0.5)
        default:         .clear
        }
    }
}

// macOS: attach keyboard shortcuts at the call site
#Preview {
    VStack(spacing: 10) {
        SitkaButton(title: "Save",   variant: .primary,   action: {})
            .keyboardShortcut("s", modifiers: .command)
        SitkaButton(title: "Cancel", variant: .secondary, action: {})
            .keyboardShortcut(.escape, modifiers: [])
        SitkaButton(title: "Delete", variant: .danger,    action: {})
            .keyboardShortcut(.delete, modifiers: .command)
    }
    .padding(24)
    .frame(width: 280)
}`,
  },
};

export default function ButtonPage() {
  return (
    <div>
      <PageHeader
        badge="Gold Standard"
        title="Button"
        description="The foundational interactive element. Every variant, size, and state is defined here and serves as the template for all future component entries."
      />

      {/* Live Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview grid>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="glass">Glass</Button>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sizes</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Three sizes cover the full range of UI contexts: compact lists, standard
          forms, and prominent hero actions.
        </p>
        <ComponentPreview>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ComponentPreview>
      </section>

      {/* Icons */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          With Icons
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Icons amplify intent. Use a left icon to set context, a right icon to
          suggest directionality.
        </p>
        <ComponentPreview>
          <Button leftIcon={<Plus className="w-4 h-4" />}>New Item</Button>
          <Button rightIcon={<ArrowRight className="w-4 h-4" />}>Continue</Button>
          <Button
            variant="secondary"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
          <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>
            Delete
          </Button>
        </ComponentPreview>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">States</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          All interactive states are handled. Loading replaces content with a spinner;
          disabled dims and removes pointer events.
        </p>
        <ComponentPreview>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" loading>
            Saving…
          </Button>
          <Button variant="secondary" disabled>
            Unavailable
          </Button>
        </ComponentPreview>
      </section>

      {/* Code */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Implementation
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Full implementations for every platform. The React version uses a
          forwardRef pattern for ref forwarding. The SwiftUI version uses a custom
          press-state modifier for spring feedback.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Motion spec */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Motion</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Buttons use spring physics for press feedback — not a linear scale. This
          preserves energy and feels alive.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Interaction", "Property", "Value", "Easing"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { interaction: "Press", property: "scale", value: "0.97", easing: "spring(500, 40)" },
                { interaction: "Release", property: "scale", value: "1.0", easing: "spring(500, 40)" },
                { interaction: "Hover", property: "opacity / shadow", value: "0.9 / reduced", easing: "150ms ease" },
                { interaction: "Focus", property: "ring", value: "2px accent", easing: "instant" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.interaction}</td>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{row.property}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px]">{row.value}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]"><code className="font-mono text-[11px]">{row.easing}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Buttons on touch screens need larger hit areas and thoughtful sizing. Use the viewport toggle above any preview to see how buttons reflow at 390px.
        </p>
        <ComponentPreview className="mb-6">
          <ButtonMobileDemo />
        </ComponentPreview>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Scenario", "Guidance"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { scenario: "Touch target", guidance: "Minimum 44×44 pt. The md size (h-10 / 40px) is borderline — prefer lg for primary CTAs on mobile." },
                { scenario: "Primary CTA", guidance: "Use w-full on the primary action at the bottom of a form or screen. Full-width buttons are easier to tap and establish visual hierarchy." },
                { scenario: "Icon-only buttons", guidance: "Use size=\"icon\" (44px) not a smaller size. Add a tooltip or visible label nearby since hover tooltips don't work on touch." },
                { scenario: "Haptic feedback", guidance: "On iOS/Android, trigger UIImpactFeedbackGenerator or Vibration.vibrate() on press for tactile confirmation on destructive or primary actions." },
                { scenario: "Button groups", guidance: "Avoid more than 2 side-by-side buttons on narrow screens. Stack vertically or use a split-button to consolidate." },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.scenario}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ARIA roles */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          ARIA roles
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Element", "Role", "Key attributes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { el: "Root", role: "button (implicit)", attrs: "aria-busy, aria-disabled, aria-label" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.el}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.role}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.attrs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Keyboard */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Keyboard
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Key", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { key: "Enter / Space", action: "Activate the button" },
                { key: "Tab", action: "Move focus to the next focusable element" },
                { key: "Shift+Tab", action: "Move focus to the previous focusable element" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{row.key}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Accessibility
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Uses a native <button> element — keyboard navigable and screen-reader accessible by default.",
            "Focus ring is visible only with keyboard navigation (focus-visible).",
            'Loading state disables the button and announces via aria-busy="true".',
            "Danger variant maintains WCAG AA contrast (4.8:1 on white).",
            "Icon-only buttons should include aria-label for assistive technology.",
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
