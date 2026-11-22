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
        description="Add Sitka's colour, spacing, radius, type and motion tokens to a SwiftUI app with the SitkaTokens Swift package, generated from the same tokens.json that powers the web."
      />

      <div className="space-y-12">

        {/* Step 1 — Swift Package */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">1</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Add the Swift package</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            In Xcode choose <strong className="text-[rgb(var(--text-primary))]">File › Add Package Dependencies</strong>, paste the repository
            URL, and add the <code className="font-mono text-[rgb(var(--accent))] text-[12px]">SitkaTokens</code> product to your app target.
            The package is generated from <code className="font-mono text-[rgb(var(--accent))] text-[12px]">tokens.json</code> on every release, so
            updating the package is how token changes reach your app.
          </p>
          <CodeBlock
            language="swift"
            filename="Package.swift"
            code={`dependencies: [
    .package(url: "https://github.com/jsrothwell/Sitka.git", from: "1.13.0"),
],
targets: [
    .target(name: "MyApp", dependencies: [
        .product(name: "SitkaTokens", package: "Sitka"),
    ]),
]`}
          />
          <p className="text-[13px] text-[rgb(var(--text-tertiary))] mt-3">
            Can&apos;t add a package? Download the same file from{" "}
            <Link href="/tokens/export" className="text-[rgb(var(--accent))] underline underline-offset-2">Token Export</Link>{" "}
            and drop it into your target. You&apos;ll need to replace it by hand when tokens change.
          </p>
        </section>

        {/* Step 2 — What's in it */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">2</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">What the package gives you</h2>
          </div>
          <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))] ml-4 list-disc mb-4">
            <li><code className="font-mono text-[12px]">{"Color.sitka(\\.token)"}</code>: every themed colour, following light and dark mode automatically.</li>
            <li><code className="font-mono text-[12px]">SitkaTokens.Palette</code>: fixed colours (brand ramp, neutrals, categorical 1–8).</li>
            <li><code className="font-mono text-[12px]">SitkaTokens.Spacing</code>, <code className="font-mono text-[12px]">Radius</code>, <code className="font-mono text-[12px]">FontSize</code>, <code className="font-mono text-[12px]">FontWeight</code>, <code className="font-mono text-[12px]">LineHeight</code>, <code className="font-mono text-[12px]">Duration</code>.</li>
          </ul>
          <CodeBlock
            language="swift"
            filename="SitkaTokens.swift (excerpt)"
            code={`public enum SitkaTokens {
    public struct Theme {
        public let background: SitkaRGBA
        public let accent: SitkaRGBA
        public let onAccent: SitkaRGBA          // text on the accent (cyan needs dark text)
        public let statusSuccessText: SitkaRGBA // status colour that passes 4.5:1 as text
        // …every theme token in tokens.json
    }
    public static let dark: Theme
    public static let light: Theme

    public enum Spacing { public static let s4: Double = 16 /* … */ }
    public enum Radius  { public static let md: Double = 10 /* … */ }
}

public extension Color {
    static func sitka(_ token: KeyPath<SitkaTokens.Theme, SitkaRGBA>) -> Color
}`}
          />
        </section>

        {/* Usage examples */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Usage examples</h2>

          <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2 mt-5">Colors</h3>
          <CodeBlock
            language="swift"
            code={`import SitkaTokens

Text("Synced")
    .foregroundStyle(Color.sitka(\\.statusSuccessText))

Rectangle()
    .fill(Color.sitka(\\.accent))
    .frame(height: 2)`}
          />

          <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2 mt-6">Spacing &amp; radius</h3>
          <CodeBlock
            language="swift"
            code={`VStack(alignment: .leading, spacing: SitkaTokens.Spacing.s4) {
    Text("Card title").font(.headline)
    Text("Subtitle")
        .foregroundStyle(Color.sitka(\\.textSecondary))
}
.padding(SitkaTokens.Spacing.s6)
.background(Color.sitka(\\.surface), in: RoundedRectangle(cornerRadius: SitkaTokens.Radius.lg))`}
          />

          <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2 mt-6">Primary button</h3>
          <CodeBlock
            language="swift"
            code={`Button("Get Started") { start() }
    .buttonStyle(.borderedProminent)
    .tint(Color.sitka(\\.accent))
    .foregroundStyle(Color.sitka(\\.onAccent))   // white on cyan is only ~2.2:1`}
          />
          <p className="text-[13px] text-[rgb(var(--text-tertiary))] mt-3">
            Once the Code Connect mappings are published, Figma Dev Mode shows SwiftUI like this for Button, Input, Badge and the other mapped components.
          </p>
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
