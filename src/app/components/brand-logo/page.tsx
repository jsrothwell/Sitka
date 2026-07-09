import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Building2, MessagesSquare } from "lucide-react";

export const metadata: Metadata = { title: "Brand Logo" };

const PROPS = [
  {
    name: "name",
    type: "string",
    required: true,
    description: "Entity name. Used as the accessible label and to derive the initials fallback.",
  },
  {
    name: "src",
    type: "string",
    description: "Image URL — a favicon, CDN logo, or uploaded asset. Falls through to icon/initials on load failure.",
  },
  {
    name: "icon",
    type: "ReactNode",
    description: "Icon rendered when src is absent or fails to load, before falling back to initials.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Controls the box dimensions and initials font size.",
  },
  {
    name: "shape",
    type: '"rounded" | "circle"',
    default: '"rounded"',
    description: "rounded for app/company logos, circle for people or informal brands.",
  },
];

const CODE = {
  react: {
    filename: "BrandLogo.tsx",
    code: `import { BrandLogo } from "@/components/ui/BrandLogo";

// Image, falls back to initials if the URL 404s
<BrandLogo src="https://logo.clearbit.com/acme.com" name="Acme Corp" />

// No image — icon fallback
<BrandLogo name="Slack" icon={<SlackIcon />} />

// No image, no icon — initials fallback
<BrandLogo name="Netflix" />

// Sizes and shape
<BrandLogo name="Acme Corp" size="sm" />
<BrandLogo name="Acme Corp" size="lg" shape="circle" />`,
  },
  html: {
    filename: "brand-logo.html",
    code: `<!-- Image, with onerror JS fallback to the initials sibling -->
<span class="brand-logo" aria-label="Acme Corp">
  <img
    src="https://logo.clearbit.com/acme.com"
    alt=""
    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
  />
  <span class="brand-logo-initials" style="display:none">AC</span>
</span>

<!-- No image — initials only -->
<span class="brand-logo" aria-label="Netflix">
  <span class="brand-logo-initials">NE</span>
</span>

<style>
  .brand-logo {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: rgb(var(--surface-raised));
    border: 1px solid rgb(var(--border));
    flex-shrink: 0;
  }
  .brand-logo img { width: 100%; height: 100%; object-fit: cover; }
  .brand-logo-initials {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: rgb(var(--text-secondary));
  }
  .brand-logo.circle { border-radius: 50%; }
</style>`,
  },
  swift: {
    filename: "SitkaBrandLogo.swift",
    code: `import SwiftUI

enum SitkaBrandLogoSize { case sm, md, lg }
enum SitkaBrandLogoShape { case rounded, circle }

struct SitkaBrandLogo: View {
    let name: String
    var imageURL: URL? = nil
    var icon: Image? = nil
    var size: SitkaBrandLogoSize = .md
    var shape: SitkaBrandLogoShape = .rounded

    @State private var imageFailed = false

    var body: some View {
        ZStack {
            if let url = imageURL, !imageFailed {
                AsyncImage(url: url) { phase in
                    if let image = phase.image {
                        image.resizable().scaledToFill()
                    } else if phase.error != nil {
                        fallback.onAppear { imageFailed = true }
                    } else {
                        Color.clear
                    }
                }
            } else {
                fallback
            }
        }
        .frame(width: dimension, height: dimension)
        .background(Color(.secondarySystemBackground))
        .overlay(clipShape.stroke(Color(.separator), lineWidth: 1))
        .clipShape(clipShape)
        .accessibilityLabel(name)
    }

    @ViewBuilder private var fallback: some View {
        if let icon {
            icon.resizable().scaledToFit().frame(width: dimension * 0.44, height: dimension * 0.44)
                .foregroundColor(.secondary)
        } else {
            Text(initials)
                .font(.system(size: fontSize, weight: .semibold))
                .foregroundColor(.secondary)
        }
    }

    private var clipShape: AnyShape {
        shape == .circle ? AnyShape(Circle()) : AnyShape(RoundedRectangle(cornerRadius: 8))
    }

    private var initials: String {
        let words = name.split(separator: " ")
        if words.count >= 2 { return String(words.first!.prefix(1) + words.last!.prefix(1)).uppercased() }
        return String(name.prefix(2)).uppercased()
    }

    private var dimension: CGFloat { switch size { case .sm: 24; case .md: 36; case .lg: 48 } }
    private var fontSize: CGFloat { switch size { case .sm: 10; case .md: 13; case .lg: 16 } }
}

#Preview {
    HStack(spacing: 12) {
        SitkaBrandLogo(name: "Acme Corp", imageURL: URL(string: "https://logo.clearbit.com/acme.com"))
        SitkaBrandLogo(name: "Netflix")
        SitkaBrandLogo(name: "Person", shape: .circle, size: .lg)
    }
    .padding()
}`,
  },
};

export default function BrandLogoPage() {
  return (
    <div>
      <PageHeader
        title="Brand Logo"
        description="A URL image → icon → initials fallback chain for external entities — job sources, integrations, and companies — where a reliable logo isn't guaranteed at render time."
        badge="New"
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview grid>
          <BrandLogo name="Acme Corp" src="https://logo.clearbit.com/acme.com" size="lg" />
          <BrandLogo name="Team Chat" icon={<MessagesSquare className="w-full h-full" />} size="lg" />
          <BrandLogo name="Netflix" size="lg" />
          <BrandLogo name="Contoso Ltd" size="lg" shape="circle" />
        </ComponentPreview>
      </section>

      {/* Fallback chain */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Fallback chain</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Three tiers, evaluated in order: a remote <code className="font-mono text-[13px] text-[rgb(var(--accent))]">src</code> image
          (favicon or CDN logo), then a passed-in <code className="font-mono text-[13px] text-[rgb(var(--accent))]">icon</code>,
          then initials derived from <code className="font-mono text-[13px] text-[rgb(var(--accent))]">name</code>. An <code className="font-mono text-[13px] text-[rgb(var(--accent))]">onError</code> handler
          on the image demotes to the next tier automatically — no network status tracking required.
        </p>
        <ComponentPreview>
          <div className="flex flex-col items-center gap-2">
            <BrandLogo name="Acme Corp" src="https://logo.clearbit.com/acme.com" />
            <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">image</code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BrandLogo name="Team Chat" icon={<MessagesSquare className="w-full h-full" />} />
            <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">icon</code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BrandLogo name="Netflix" />
            <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">initials</code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BrandLogo name="Broken Co" src="https://this-domain-does-not-resolve.invalid/logo.png" />
            <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">image → initials</code>
          </div>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sizes</h2>
        <ComponentPreview>
          {(["sm", "md", "lg"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <BrandLogo name="Acme Corp" size={s} icon={<Building2 className="w-full h-full" />} />
              <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">{s}</code>
            </div>
          ))}
        </ComponentPreview>
      </section>

      {/* Shape */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Shape</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Use <code className="font-mono text-[13px] text-[rgb(var(--accent))]">rounded</code> (default) for
          companies and integrations; use <code className="font-mono text-[13px] text-[rgb(var(--accent))]">circle</code> for
          people or informal brand marks.
        </p>
        <ComponentPreview>
          <div className="flex flex-col items-center gap-2">
            <BrandLogo name="Acme Corp" shape="rounded" size="lg" />
            <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">rounded</code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BrandLogo name="Acme Corp" shape="circle" size="lg" />
            <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">circle</code>
          </div>
        </ComponentPreview>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
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
            "The outer element carries role=img and aria-label=name — screen readers announce the entity name regardless of which fallback tier rendered.",
            "The inner <img> has an empty alt (\"\") to avoid double-announcing the name via both the image and the container label.",
            "Icon and initials fallbacks are purely visual; they inherit the same aria-label from the container.",
            "Don't rely on logo colour alone to distinguish entities in a list — pair it with the name in adjacent text.",
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
