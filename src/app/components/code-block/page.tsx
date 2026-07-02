import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = { title: "Code Block" };

const PROPS = [
  {
    name: "code",
    type: "string",
    description: "The source code string to display. Leading and trailing whitespace is trimmed automatically.",
  },
  {
    name: "language",
    type: "string",
    default: '"tsx"',
    description: "Language label shown in the header bar. Cosmetic only — no syntax highlighting is applied.",
  },
  {
    name: "filename",
    type: "string",
    description: "Optional filename displayed alongside the traffic-light controls in the header.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional classes applied to the outer container.",
  },
];

const SAMPLE_TSX = `import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function HeroActions() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
        Get Started
      </Button>
      <Button variant="ghost">Learn more</Button>
    </div>
  );
}`;

const SAMPLE_SWIFT = `import SwiftUI
import SitkaTokens

struct HeroActions: View {
  var body: some View {
    HStack(spacing: SFSpacing.sm) {
      Button("Get Started") {}
        .buttonStyle(SFPrimaryButtonStyle())
      Button("Learn more") {}
        .buttonStyle(SFGhostButtonStyle())
    }
  }
}`;

const SAMPLE_CSS = `/* Base utility */
.code-block {
  background: rgb(var(--surface));
  border: 1px solid rgb(var(--border));
  border-radius: 0.75rem;
  overflow: hidden;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.code-block pre {
  padding: 1rem;
  overflow-x: auto;
  color: rgb(var(--text-primary));
}`;

const CODE = {
  react: {
    filename: "CodeBlock.tsx",
    code: `import { CodeBlock } from "@/components/ui/CodeBlock";

// Basic usage
<CodeBlock
  code={\`const greeting = "Hello, world!";\`}
/>

// With language label
<CodeBlock
  language="typescript"
  code={\`type Status = "idle" | "loading" | "success" | "error";\`}
/>

// With filename in the header
<CodeBlock
  language="tsx"
  filename="Button.tsx"
  code={\`export function Button({ children }: { children: React.ReactNode }) {
  return <button className="btn">{children}</button>;
}\`}
/>`,
  },
  html: {
    filename: "code-block.html",
    code: `<div class="code-block">
  <!-- Header bar -->
  <div class="code-block-header">
    <div class="traffic-lights" aria-hidden="true">
      <span class="tl tl-red"></span>
      <span class="tl tl-yellow"></span>
      <span class="tl tl-green"></span>
    </div>
    <span class="code-block-lang">tsx</span>
    <button class="code-block-copy" onclick="copyCode(this)">
      Copy
    </button>
  </div>

  <!-- Code -->
  <pre><code>const greeting = "Hello, world!";</code></pre>
</div>

<style>
.traffic-lights { display: flex; gap: 6px; }
.tl { width: 12px; height: 12px; border-radius: 50%; display: block; }
.tl-red    { background: #ff5f57; }
.tl-yellow { background: #febc2e; }
.tl-green  { background: #28c840; }
</style>`,
  },
  swift: {
    filename: "CodeBlockView.swift",
    code: `import SwiftUI

struct CodeBlockView: View {
  let code: String
  var language: String = "swift"
  var filename: String? = nil

  @State private var isCopied = false

  var body: some View {
    VStack(alignment: .leading, spacing: 0) {
      // Header
      HStack {
        TrafficLightsView()
        if let filename {
          Text(filename)
            .font(.system(size: 11))
            .foregroundStyle(.tertiary)
        }
        Spacer()
        Text(language.uppercased())
          .font(.system(size: 10, weight: .medium))
          .foregroundStyle(.tertiary)
        Button(isCopied ? "Copied!" : "Copy") {
          NSPasteboard.general.clearContents()
          NSPasteboard.general.setString(code, forType: .string)
          isCopied = true
          DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            isCopied = false
          }
        }
        .buttonStyle(.borderless)
        .font(.system(size: 11))
      }
      .padding(.horizontal, 12)
      .padding(.vertical, 8)
      .background(.quaternary)

      Divider()

      // Code
      ScrollView([.horizontal, .vertical]) {
        Text(code)
          .font(.system(size: 12, design: .monospaced))
          .foregroundStyle(.primary)
          .padding(12)
          .frame(maxWidth: .infinity, alignment: .leading)
      }
    }
    .background(.background)
    .clipShape(RoundedRectangle(cornerRadius: 10))
    .overlay(
      RoundedRectangle(cornerRadius: 10)
        .strokeBorder(.separator)
    )
  }
}`,
  },
  macos: {
    filename: "CodeBlockView.swift",
    code: `import SwiftUI

// On macOS, use the same CodeBlockView from the iOS target —
// the NSPasteboard API and ScrollView both work on macOS.
// Adjust font sizes for a denser desktop layout:

struct CodeBlockView: View {
  let code: String
  var language: String = "swift"

  var body: some View {
    ScrollView([.horizontal, .vertical]) {
      Text(code)
        .font(.system(size: 11, design: .monospaced))  // 1pt smaller on macOS
        .textSelection(.enabled)                        // allow native copy selection
        .padding(10)
        .frame(maxWidth: .infinity, alignment: .leading)
    }
    .background(Color(nsColor: .textBackgroundColor))
    .clipShape(RoundedRectangle(cornerRadius: 8))
    .overlay(
      RoundedRectangle(cornerRadius: 8)
        .strokeBorder(Color(nsColor: .separatorColor))
    )
  }
}`,
  },
};

export default function CodeBlockPage() {
  return (
    <div>
      <PageHeader
        title="Code Block"
        description="A preformatted code surface with a macOS-style header, language label, and one-click copy. Used throughout the docs site to display implementation examples."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <div className="w-full max-w-xl">
            <CodeBlock
              language="tsx"
              filename="HeroActions.tsx"
              code={SAMPLE_TSX}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">
          Language variants
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          The <code className="px-1 py-0.5 rounded bg-[rgb(var(--surface-raised))] font-mono text-[12px]">language</code> prop controls the label shown in the header only — no syntax highlighting is applied. Pass any string that conveys the language to readers.
        </p>
        <div className="space-y-4">
          <CodeBlock
            language="swift"
            filename="HeroActions.swift"
            code={SAMPLE_SWIFT}
          />
          <CodeBlock
            language="css"
            code={SAMPLE_CSS}
          />
        </div>
      </section>

      {/* Header anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">
          Header anatomy
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Element", "Description"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { el: "Traffic lights", desc: "Three decorative dots matching macOS window chrome. Purely visual — not interactive." },
                { el: "Filename", desc: "Optional label shown when the filename prop is provided. Helps readers identify the file context." },
                { el: "Language badge", desc: "Uppercase label derived from the language prop. Shown on the right side of the header." },
                { el: "Copy button", desc: 'Writes the full code string to the clipboard. Animates to a green "Copied!" state for 2 seconds using Framer Motion.' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{row.el}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Implementation
        </h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Props
        </h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Accessibility
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "The copy button is a native <button> element and is fully keyboard accessible via Tab and Enter.",
            "The traffic-light dots carry no semantic meaning — they are rendered as decorative divs with no ARIA role.",
            "Code content is wrapped in a <pre><code> pair, which signals preformatted computer code to assistive technology.",
            "The language label and filename are visible text; screen readers can read them in the natural document order.",
            "The copy action provides immediate visual feedback (Copied! state) but does not announce to screen readers by default. If announcing is required, add a live region with aria-live=\"polite\".",
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
