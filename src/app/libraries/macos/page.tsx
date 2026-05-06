import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/docs/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = { title: "macOS · SwiftUI — Libraries" };

export default function LibraryMacosPage() {
  return (
    <div>
      <PageHeader
        badge="Library"
        title="macOS · SwiftUI"
        description="Use Sitka's design tokens in a macOS SwiftUI app. The same typed Swift constants that power iOS — with macOS-native color APIs, window-chrome conventions, and HIG-correct component patterns."
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
            page and download <code className="font-mono text-[rgb(var(--accent))] text-[12px]">SitkaTokens.swift</code>. It contains the same brand colors and spacing scale used across web and iOS.
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
            <li>In the <strong className="text-[rgb(var(--text-primary))]">Add Files</strong> dialog, ensure <em>Copy items if needed</em> is checked and your macOS target is selected.</li>
            <li>For shared iOS+macOS targets, the same token file works on both platforms — only the semantic color bridges differ.</li>
          </ol>
        </section>

        {/* macOS Color Bridges */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">3</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">macOS semantic color bridges</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            macOS uses <code className="font-mono text-[rgb(var(--accent))] text-[12px]">NSColor</code> instead of <code className="font-mono text-[rgb(var(--accent))] text-[12px]">UIColor</code> for system colors. The mapping is consistent across all Sitka component pages.
          </p>
          <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-4">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                  {["iOS (UIColor)", "macOS (NSColor)", "Semantic role"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["UIColor.systemBackground",        "NSColor.windowBackgroundColor",    "Window / screen background"],
                  ["UIColor.secondarySystemBackground","NSColor.controlBackgroundColor",   "Card / panel surface"],
                  ["UIColor.tertiarySystemBackground", "NSColor.quaternaryLabelColor.opacity(0.06)", "Subtle fill"],
                  ["UIColor.label",                    "NSColor.labelColor / .labelColor", "Primary text"],
                  ["UIColor.secondaryLabel",           "NSColor.secondaryLabelColor",      "Secondary text"],
                  ["UIColor.tertiaryLabel",            "NSColor.tertiaryLabelColor",       "Tertiary text"],
                  ["UIColor.separator",                "NSColor.separatorColor",           "Borders & dividers"],
                ].map(([ios, macos, role], i) => (
                  <tr key={ios} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                    <td className="px-4 py-3 font-mono text-[12px] text-[rgb(var(--accent))]">{ios}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-[rgb(var(--text-secondary))]">{macos}</td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CodeBlock
            language="swift"
            filename="SitkaTokens+macOS.swift"
            code={`import SwiftUI
import AppKit

// Drop this file into a macOS-only target alongside SitkaTokens.swift
// to get NSColor-backed semantic tokens.

extension SitkaTokens.Color {
    // Adaptive surfaces — follow the system light/dark mode automatically
    public static var windowBackground: Color { Color(NSColor.windowBackgroundColor) }
    public static var controlBackground: Color { Color(NSColor.controlBackgroundColor) }
    public static var separator:         Color { Color(NSColor.separatorColor) }

    // Adaptive text
    public static var label:          Color { Color(.labelColor) }
    public static var secondaryLabel: Color { Color(.secondaryLabelColor) }
    public static var tertiaryLabel:  Color { Color(.tertiaryLabelColor) }
}`}
          />
        </section>

        {/* Usage examples */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Usage examples</h2>

          <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2 mt-5">Card surface</h3>
          <CodeBlock
            language="swift"
            code={`VStack(alignment: .leading, spacing: SitkaTokens.Spacing.s3) {
    Text("Card title")
        .font(.system(size: SitkaTokens.Typography.sizeSM, weight: .semibold))
        .foregroundStyle(SitkaTokens.Color.label)

    Text("Subtitle text")
        .font(.system(size: SitkaTokens.Typography.sizeXS))
        .foregroundStyle(SitkaTokens.Color.secondaryLabel)
}
.padding(SitkaTokens.Spacing.s5)
.background(SitkaTokens.Color.controlBackground)
.clipShape(RoundedRectangle(cornerRadius: SitkaTokens.Radius.md, style: .continuous))
.overlay(
    RoundedRectangle(cornerRadius: SitkaTokens.Radius.md, style: .continuous)
        .stroke(SitkaTokens.Color.separator, lineWidth: 1)
)`}
          />

          <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2 mt-6">Settings form</h3>
          <CodeBlock
            language="swift"
            code={`struct AppSettingsView: View {
    @State private var notifications = true
    @State private var theme = "system"

    var body: some View {
        Form {
            Section("General") {
                Toggle("Enable notifications", isOn: $notifications)
                    .toggleStyle(.checkbox)

                Picker("Appearance", selection: $theme) {
                    Text("System").tag("system")
                    Text("Light").tag("light")
                    Text("Dark").tag("dark")
                }
                .pickerStyle(.radioGroup)
            }
        }
        .formStyle(.grouped)
        .frame(width: 380)
        .padding()
    }
}`}
          />

          <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2 mt-6">Keyboard shortcut</h3>
          <CodeBlock
            language="swift"
            code={`Button("New Document") { createDocument() }
    .keyboardShortcut("n", modifiers: .command)

Button("Find") { openFind() }
    .keyboardShortcut("f", modifiers: .command)

Button("Close") { closeWindow() }
    .keyboardShortcut("w", modifiers: .command)`}
          />

          <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2 mt-6">Native toolbar</h3>
          <CodeBlock
            language="swift"
            code={`struct ContentView: View {
    var body: some View {
        NavigationSplitView {
            List(items) { item in
                NavigationLink(item.title, value: item)
            }
            .listStyle(.sidebar)
        } detail: {
            DetailView()
        }
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button(action: addItem) {
                    Label("Add", systemImage: "plus")
                }
            }
        }
        .navigationTitle("Library")
    }
}`}
          />
        </section>

        {/* macOS-specific patterns */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">macOS-specific patterns</h2>
          <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                  {["Pattern", "iOS approach", "macOS approach"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Modal / sheet",    "ZStack overlay fullscreen",     ".sheet(isPresented:) on window"],
                  ["Tooltips",         "Custom overlay on long press",   ".help() modifier (native hover)"],
                  ["Form layout",      "Section {} in Form",             ".formStyle(.grouped)"],
                  ["Toggles",          "Toggle with .tint",              ".toggleStyle(.checkbox)"],
                  ["Radio buttons",    "Custom button group",            "Picker with .pickerStyle(.radioGroup)"],
                  ["Sidebar nav",      "TabView / NavigationStack",      "NavigationSplitView + .listStyle(.sidebar)"],
                  ["Table",            "Custom VStack/HStack rows",      "SwiftUI Table view (sortable, multi-select)"],
                  ["Shortcuts",        "N/A (touch-first)",              ".keyboardShortcut() on any Button"],
                ].map(([pattern, ios, macos], i) => (
                  <tr key={pattern} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                    <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))]">{pattern}</td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{ios}</td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{macos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Requirements */}
        <section className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-5">
          <h2 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-3">Requirements</h2>
          <div className="grid grid-cols-3 gap-3 text-[13px]">
            {[
              { label: "Swift", value: "5.9+" },
              { label: "macOS", value: "13+" },
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
