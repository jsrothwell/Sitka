import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star, Zap } from "lucide-react";
import { CardMobileDemo } from "@/site/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Card" };

const PROPS = [
  {
    name: "variant",
    type: '"default" | "elevated" | "ghost" | "accent"',
    default: '"default"',
    description: "Controls border, background, and shadow treatment.",
  },
  {
    name: "interactive",
    type: "boolean",
    default: "false",
    description: "Adds hover elevation, accent border on hover, and active scale.",
  },
  {
    name: "as",
    type: '"div" | "button" | "a"',
    default: '"div"',
    description: "Render the card as a different HTML element for semantic correctness.",
  },
];

const CODE = {
  react: {
    filename: "Card.tsx",
    code: `import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Default — border + surface background
<Card>
  <CardHeader>
    <h3 className="text-[14px] font-semibold">Project Alpha</h3>
  </CardHeader>
  <CardBody>
    <p className="text-[13px] text-[rgb(var(--text-secondary))]">
      A brief description of the project and its current status.
    </p>
  </CardBody>
  <CardFooter>
    <Button size="sm" variant="secondary">Open</Button>
  </CardFooter>
</Card>

// Elevated — drop shadow
<Card variant="elevated">
  <CardBody>Elevated card with depth shadow.</CardBody>
</Card>

// Ghost — subtle filled background, no border
<Card variant="ghost">
  <CardBody>Ghost card blends into the background.</CardBody>
</Card>

// Accent — green-tinted border and background
<Card variant="accent">
  <CardBody>Accent card for highlighted content.</CardBody>
</Card>

// Interactive — hover + press states
<Card interactive as="button" onClick={() => {}}>
  <CardBody>Click me</CardBody>
</Card>`,
  },
  html: {
    filename: "card.html",
    code: `<!-- Default card -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Project Alpha</h3>
  </div>
  <div class="card-body">
    <p class="card-text">A brief description of the project.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-secondary btn-sm">Open</button>
  </div>
</div>

<!-- Elevated card -->
<div class="card card-elevated">
  <div class="card-body">
    <p class="card-text">Elevated with a drop shadow.</p>
  </div>
</div>

<!-- Interactive (clickable) card -->
<button class="card card-interactive">
  <div class="card-body">
    <p class="card-text">Click me</p>
  </div>
</button>

<style>
  .card {
    border-radius: 14px;
    border: 1px solid rgb(var(--border));
    background: rgb(var(--surface));
    overflow: hidden;
  }

  .card-elevated {
    box-shadow: 0 4px 24px rgba(0,0,0,.12), 0 1px 4px rgba(0,0,0,.08);
  }

  .card-ghost {
    border-color: transparent;
    background: rgb(var(--surface-raised));
  }

  .card-accent {
    border-color: rgb(var(--accent) / 0.35);
    background: rgb(var(--accent-subtle));
  }

  .card-interactive {
    cursor: pointer;
    transition: border-color 150ms, box-shadow 150ms, transform 100ms;
    text-align: left;
    width: 100%;
  }
  .card-interactive:hover {
    border-color: rgb(var(--accent) / 0.5);
    box-shadow: 0 4px 24px rgba(0,0,0,.12);
  }
  .card-interactive:active { transform: scale(0.99); }

  .card-header {
    padding: 20px 20px 16px;
    border-bottom: 1px solid rgb(var(--border-subtle));
  }
  .card-title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: rgb(var(--text-primary));
  }

  .card-body { padding: 20px; }
  .card-text { margin: 0; font-size: 13px; color: rgb(var(--text-secondary)); }

  .card-footer {
    padding: 16px 20px;
    border-top: 1px solid rgb(var(--border-subtle));
    background: rgb(var(--surface-raised));
  }
</style>`,
  },
  swift: {
    filename: "SitkaCard.swift",
    code: `import SwiftUI

enum SitkaCardVariant {
    case defaultStyle, elevated, ghost, accent
}

struct SitkaCard<Content: View>: View {
    var variant: SitkaCardVariant = .defaultStyle
    var isInteractive: Bool = false
    let action: (() -> Void)?
    @ViewBuilder let content: () -> Content

    @State private var isPressed = false

    var body: some View {
        Group {
            if isInteractive, let action {
                Button(action: action) { cardBody }
                    .buttonStyle(PlainButtonStyle())
            } else {
                cardBody
            }
        }
        .scaleEffect(isPressed ? 0.99 : 1)
        .animation(.spring(response: 0.2, dampingFraction: 0.8), value: isPressed)
    }

    private var cardBody: some View {
        content()
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            .background(background)
            .overlay(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .stroke(borderColor, lineWidth: 1)
            )
            .shadow(color: shadowColor, radius: shadowRadius, x: 0, y: 2)
    }

    private var background: some View {
        Group {
            switch variant {
            case .default: Color(UIColor.secondarySystemBackground)
            case .elevated: Color(UIColor.secondarySystemBackground)
            case .ghost: Color(UIColor.tertiarySystemBackground)
            case .accent: Color.accentColor.opacity(0.08)
            }
        }
    }

    private var borderColor: Color {
        switch variant {
        case .default, .elevated: Color(UIColor.separator)
        case .ghost: Color.clear
        case .accent: Color.accentColor.opacity(0.35)
        }
    }

    private var shadowColor: Color {
        variant == .elevated ? Color.black.opacity(0.1) : .clear
    }

    private var shadowRadius: CGFloat {
        variant == .elevated ? 12 : 0
    }
}

// MARK: - Preview
#Preview {
    VStack(spacing: 16) {
        SitkaCard {
            VStack(alignment: .leading, spacing: 0) {
                Text("Default card")
                    .font(.system(size: 14, weight: .semibold))
                    .padding()
            }
        }
        SitkaCard(variant: .elevated) {
            Text("Elevated card").font(.system(size: 14)).padding()
        }
        SitkaCard(variant: .accent) {
            Text("Accent card").font(.system(size: 14)).padding()
        }
        SitkaCard(isInteractive: true, action: {}) {
            Text("Interactive card").font(.system(size: 14)).padding()
        }
    }
    .padding()
}`,
  },
  macos: {
    filename: "SitkaCard+macOS.swift",
    code: `import SwiftUI

enum SitkaCardVariant {
    case defaultStyle, elevated, ghost, accent
}

struct SitkaCard<Content: View>: View {
    var variant: SitkaCardVariant = .defaultStyle
    var isInteractive: Bool = false
    let action: (() -> Void)?
    @ViewBuilder let content: () -> Content

    var body: some View {
        Group {
            if isInteractive, let action {
                Button(action: action) { cardBody }
                    .buttonStyle(PlainButtonStyle())
            } else {
                cardBody
            }
        }
    }

    private var cardBody: some View {
        content()
            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
            .background(background)
            .overlay(
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .stroke(borderColor, lineWidth: 1)
            )
            .shadow(color: shadowColor, radius: shadowRadius, x: 0, y: 1)
    }

    private var background: some View {
        Group {
            switch variant {
            case .defaultStyle: Color(NSColor.controlBackgroundColor)
            case .elevated:     Color(NSColor.windowBackgroundColor)
            case .ghost:        Color(NSColor.quaternaryLabelColor).opacity(0.06)
            case .accent:       Color.accentColor.opacity(0.08)
            }
        }
    }

    private var borderColor: Color {
        switch variant {
        case .defaultStyle, .elevated: Color(NSColor.separatorColor)
        case .ghost:                   Color.clear
        case .accent:                  Color.accentColor.opacity(0.35)
        }
    }

    private var shadowColor: Color {
        variant == .elevated ? Color.black.opacity(0.08) : .clear
    }

    private var shadowRadius: CGFloat {
        variant == .elevated ? 8 : 0
    }
}

// MARK: - Preview
#Preview {
    VStack(spacing: 12) {
        SitkaCard {
            VStack(alignment: .leading, spacing: 0) {
                Text("Default card")
                    .font(.system(size: 13, weight: .semibold))
                    .padding()
            }
        }
        SitkaCard(variant: .elevated) {
            Text("Elevated card").font(.system(size: 13)).padding()
        }
        SitkaCard(variant: .accent) {
            Text("Accent card").font(.system(size: 13)).padding()
        }
        SitkaCard(isInteractive: true, action: {}) {
            Text("Interactive card").font(.system(size: 13)).padding()
        }
    }
    .padding()
    .frame(width: 320)
}`,
  },
};

export default function CardPage() {
  return (
    <div>
      <PageHeader
        title="Card"
        description="A flexible container with four visual variants and an optional interactive mode. Composed from CardHeader, CardBody, and CardFooter for structured layouts."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview grid>
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[rgb(var(--accent))]" />
                  <span className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">Default</span>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-[12px] text-[rgb(var(--text-secondary))]">
                  Standard bordered card with surface background. The workhorse variant.
                </p>
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="secondary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Open
                </Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[rgb(var(--accent))]" />
                  <span className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">Elevated</span>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-[12px] text-[rgb(var(--text-secondary))]">
                  Drop shadow communicates that this card floats above the page surface.
                </p>
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="primary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Open
                </Button>
              </CardFooter>
            </Card>
          </div>
        </ComponentPreview>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Variants</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Four variants for different elevations and semantic contexts.
        </p>
        <ComponentPreview>
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            {(["default", "elevated", "ghost", "accent"] as const).map((v) => (
              <Card key={v} variant={v}>
                <CardBody>
                  <div className="text-[12px] font-semibold text-[rgb(var(--text-primary))] mb-1 capitalize">{v}</div>
                  <p className="text-[11px] text-[rgb(var(--text-tertiary))]">
                    {v === "default" && "Border + surface background"}
                    {v === "elevated" && "Drop shadow, no extra border style"}
                    {v === "ghost" && "No border, subtle filled background"}
                    {v === "accent" && "Green-tinted border and background"}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </ComponentPreview>
      </section>

      {/* Interactive */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Interactive</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Adding <code className="font-mono text-[13px] text-[rgb(var(--accent))]">interactive</code> enables hover
          elevation, accent border on hover, and a subtle press scale. Pair with{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">as="button"</code> or{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">as="a"</code> for correct semantics.
        </p>
        <ComponentPreview>
          <div className="flex gap-4 flex-wrap justify-center">
            {(["default", "elevated", "ghost"] as const).map((v) => (
              <Card key={v} variant={v} interactive className="w-44">
                <CardBody>
                  <div className="text-[12px] font-semibold text-[rgb(var(--text-primary))] mb-1 capitalize">
                    {v}
                  </div>
                  <p className="text-[11px] text-[rgb(var(--text-tertiary))]">Hover me</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </ComponentPreview>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Card, CardHeader, CardBody, and CardFooter are all named exports from the same file.
          Use them together for structured layouts or use Card alone for simple containers.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Cards on mobile should fill the available width and be large enough to tap comfortably. Avoid dense multi-column grids on narrow screens.
        </p>
        <ComponentPreview className="mb-6">
          <CardMobileDemo />
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
                { scenario: "Grid layout", guidance: "Use a single column on screens below 640px. Two columns can work above 480px if cards don't contain much text. grid-cols-1 sm:grid-cols-2 is the safe default." },
                { scenario: "Touch target", guidance: "Interactive cards should be at least 44px tall. Content-heavy cards usually exceed this naturally, but icon cards and small thumbnails may need extra padding." },
                { scenario: "Swipe in lists", guidance: "Horizontal card carousels should use scroll-snap-type: x mandatory with scroll-snap-align: start on each card so swipes land cleanly." },
                { scenario: "Hover states", guidance: "Cards with hover effects (shadow lift, scale) should still look correct without hover on touch. Add an active: pressed state to replace hover feedback." },
                { scenario: "Image aspect ratio", guidance: "Use aspect-video or aspect-square on card images to prevent layout shift as images load. Avoid auto height with no explicit ratio." },
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

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'Use as="button" or as="a" for interactive cards — never attach onClick to a <div>.',
            "Interactive cards have active:scale feedback; avoid additional animations inside that compound the motion.",
            "Ensure card content contains a meaningful heading or label for screen readers.",
            "Focus ring is inherited from the element — <button> cards receive it automatically.",
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
