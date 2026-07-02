import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = { title: "iOS · SwiftUI — Libraries" };

export default function LibraryIosPage() {
  return (
    <div>
      <PageHeader
        badge="Library"
        title="iOS · SwiftUI"
        description="Bring Sitka's color, spacing, radius, shadow, and typography tokens into a SwiftUI project as typed Swift constants — generated from the same source JSON that powers the web."
      />

      <div className="space-y-12">

        {/* Step 1 — Export */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">1</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Download the Swift token file</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Go to the{" "}
            <Link href="/tokens/export" className="text-[rgb(var(--accent))] underline underline-offset-2">
              Token Export
            </Link>{" "}
            page and download <code className="font-mono text-[rgb(var(--accent))] text-[12px]">SitkaTokens.swift</code>. It is auto-generated from <code className="font-mono text-[rgb(var(--accent))] text-[12px]">tokens.json</code> — regenerate whenever tokens change.
          </p>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Or generate it yourself using Style Dictionary:
          </p>
          <CodeBlock
            language="bash"
            code={`npx style-dictionary build --config style-dictionary.config.js
# outputs dist/SitkaTokens.swift`}
          />
        </section>

        {/* Step 2 — Add to Xcode */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">2</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Add to your Xcode project</h2>
          </div>
          <ol className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))] ml-4 list-decimal">
            <li>Drag <code className="font-mono text-[rgb(var(--accent))] text-[12px]">SitkaTokens.swift</code> into your Xcode project navigator.</li>
            <li>In the <strong className="text-[rgb(var(--text-primary))]">Add Files</strong> dialog, ensure <em>Copy items if needed</em> is checked.</li>
            <li>Make sure the file is added to your app target.</li>
          </ol>
        </section>

        {/* The Swift file contents */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">3</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">What&apos;s in SitkaTokens.swift</h2>
          </div>
          <CodeBlock
            language="swift"
            filename="SitkaTokens.swift"
            code={`import SwiftUI

public enum SitkaTokens {

  // MARK: — Color
  public enum Color {
    // Brand
    public static let brandCyan    = SwiftUI.Color(hex: "#00C0E8")
    public static let brand500     = SwiftUI.Color(hex: "#34a865")
    public static let brand600     = SwiftUI.Color(hex: "#289452")

    // Semantic
    public static let success      = SwiftUI.Color(hex: "#22c55e")
    public static let warning      = SwiftUI.Color(hex: "#f59e0b")
    public static let error        = SwiftUI.Color(hex: "#ef4444")
    public static let info         = SwiftUI.Color(hex: "#3b82f6")

    // Dark-mode surface
    public static let background   = SwiftUI.Color(hex: "#09090c")
    public static let surface      = SwiftUI.Color(hex: "#0d0d11")
    public static let surfaceRaised = SwiftUI.Color(hex: "#16161c")
    public static let accent       = brandCyan
    public static let textPrimary  = SwiftUI.Color(hex: "#f2f2f6")
    public static let textSecondary = SwiftUI.Color(hex: "#9b9baa")
  }

  // MARK: — Spacing
  public enum Spacing {
    public static let s1: CGFloat = 4
    public static let s2: CGFloat = 8
    public static let s3: CGFloat = 12
    public static let s4: CGFloat = 16
    public static let s5: CGFloat = 20
    public static let s6: CGFloat = 24
    public static let s8: CGFloat = 32
    public static let s10: CGFloat = 40
    public static let s12: CGFloat = 48
    public static let s16: CGFloat = 64
  }

  // MARK: — Border Radius
  public enum Radius {
    public static let sm: CGFloat = 6
    public static let md: CGFloat = 10
    public static let lg: CGFloat = 14
    public static let xl: CGFloat = 20
    public static let full: CGFloat = 9999
  }

  // MARK: — Typography
  public enum Typography {
    public static let fontSans = "Inter"
    public static let sizeXS: CGFloat = 11
    public static let sizeSM: CGFloat = 13
    public static let sizeBase: CGFloat = 15
    public static let sizeLG: CGFloat = 17
    public static let sizeXL: CGFloat = 20
    public static let size2XL: CGFloat = 24
  }
}

// MARK: — Color hex helper
private extension SwiftUI.Color {
  init(hex: String) {
    let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
    var int: UInt64 = 0
    Scanner(string: hex).scanHexInt64(&int)
    let r = Double((int >> 16) & 0xff) / 255
    let g = Double((int >>  8) & 0xff) / 255
    let b = Double( int        & 0xff) / 255
    self.init(red: r, green: g, blue: b)
  }
}`}
          />
        </section>

        {/* Usage examples */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Usage examples</h2>

          <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2 mt-5">Colors</h3>
          <CodeBlock
            language="swift"
            code={`Text("Hello Sitka")
    .foregroundStyle(SitkaTokens.Color.textPrimary)

Rectangle()
    .fill(SitkaTokens.Color.accent)
    .frame(height: 2)`}
          />

          <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2 mt-6">Spacing & radius</h3>
          <CodeBlock
            language="swift"
            code={`VStack(spacing: SitkaTokens.Spacing.s4) {
    Text("Card title")
    Text("Subtitle")
        .foregroundStyle(SitkaTokens.Color.textSecondary)
}
.padding(SitkaTokens.Spacing.s6)
.background(SitkaTokens.Color.surface)
.clipShape(RoundedRectangle(cornerRadius: SitkaTokens.Radius.lg))`}
          />

          <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2 mt-6">Primary button</h3>
          <CodeBlock
            language="swift"
            code={`struct SitkaButton: View {
    let title: String
    var action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: SitkaTokens.Typography.sizeSM, weight: .medium))
                .foregroundStyle(.white)
                .padding(.horizontal, SitkaTokens.Spacing.s5)
                .frame(height: 40)
                .background(SitkaTokens.Color.accent)
                .clipShape(RoundedRectangle(cornerRadius: SitkaTokens.Radius.md))
        }
        .buttonStyle(.plain)
    }
}

// Usage
SitkaButton(title: "Get Started") {
    print("tapped")
}`}
          />
        </section>

        {/* Dark mode */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Dark / Light mode</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Sitka is dark-first. To support both modes, define adaptive colors using{" "}
            <code className="font-mono text-[rgb(var(--accent))] text-[12px]">UIColor</code> or Color Assets in Xcode and reference the same semantic names:
          </p>
          <CodeBlock
            language="swift"
            code={`// In Assets.xcassets / SitkaColors.xcassets
// Create a Color Set named "background" with:
//   Light: #FAFAFA
//   Dark:  #09090C
// Then use it as:
Color("background")`}
          />
        </section>

        {/* ThemeManager */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">ThemeManager</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            For apps that let users switch between Sitka defaults and custom accent colors, Sitka provides a{" "}
            <code className="font-mono text-[rgb(var(--accent))] text-[12px]">ThemeManager</code> observable object. It drives the{" "}
            <code className="font-mono text-[rgb(var(--accent))] text-[12px]">effectiveAccent</code> pattern, root{" "}
            <code className="font-mono text-[rgb(var(--accent))] text-[12px]">.tint()</code> wiring, and view-tree rebuilds via{" "}
            <code className="font-mono text-[rgb(var(--accent))] text-[12px]">.id(themeManager.useSitkaDefaults)</code>.
          </p>
          <div className="rounded-xl border border-[rgb(var(--border-warning,var(--border)))] bg-[rgb(var(--surface-warning,var(--surface-raised)))] px-4 py-3 text-[13px] text-[rgb(var(--text-secondary))] mb-4">
            <strong className="text-[rgb(var(--text-primary))]">Important:</strong>{" "}
            Text and surface tokens must use adaptive system colors (<code className="font-mono text-[rgb(var(--accent))] text-[12px]">Color(.label)</code>,{" "}
            <code className="font-mono text-[rgb(var(--accent))] text-[12px]">Color(.systemBackground)</code>), not fixed hex values, to follow the system light/dark mode correctly.
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))]">
            See the full implementation guide:{" "}
            <Link href="/how-tos/swift-theme-manager" className="text-[rgb(var(--accent))] underline underline-offset-2">
              Wire Sitka&apos;s ThemeManager in SwiftUI →
            </Link>
          </p>
        </section>

        {/* Requirements */}
        <section className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-5">
          <h2 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-3">Requirements</h2>
          <div className="grid grid-cols-3 gap-3 text-[13px]">
            {[
              { label: "Swift", value: "5.9+" },
              { label: "iOS", value: "16+" },
              { label: "Xcode", value: "15+" },
            ].map((r) => (
              <div key={r.label}>
                <p className="text-[rgb(var(--text-tertiary))] text-[11px] uppercase font-semibold tracking-wide">{r.label}</p>
                <p className="text-[rgb(var(--text-primary))] font-mono">{r.value}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="text-[13px] text-[rgb(var(--text-tertiary))]">
          Back to{" "}
          <Link href="/libraries" className="text-[rgb(var(--accent))] underline underline-offset-2">
            all libraries
          </Link>
          .
        </p>

      </div>
    </div>
  );
}
