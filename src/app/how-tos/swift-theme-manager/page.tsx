import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = { title: "Wire Sitka's ThemeManager in SwiftUI" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Callout({ type, children }: { type: "info" | "warning" | "danger"; children: React.ReactNode }) {
  const styles = {
    info:    { bg: "rgba(52,168,101,0.07)",  border: "rgba(52,168,101,0.25)",  color: "rgb(33,150,83)" },
    warning: { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.25)",  color: "rgb(180,120,0)" },
    danger:  { bg: "rgba(239,68,68,0.07)",  border: "rgba(239,68,68,0.25)",   color: "rgb(200,50,50)" },
  }[type];
  return (
    <div className="rounded-xl p-4 my-4" style={{ background: styles.bg, border: `1px solid ${styles.border}` }}>
      <p className="text-[13px] leading-relaxed" style={{ color: styles.color }}>{children}</p>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mt-7 mb-3">{children}</h3>;
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed">{children}</p>;
}

export default function SwiftThemeManagerPage() {
  return (
    <div>
      <PageHeader
        badge="How-to · Swift"
        title="Wire Sitka's ThemeManager in SwiftUI"
        description="Set up the Sitka theme toggle, apply the effectiveAccent pattern, keep tokens adaptive for light and dark mode, and forward ThemeManager correctly through macOS sheets."
      />

      <div className="space-y-2">

        {/* ── Overview ───────────────────────────────────── */}
        <Section title="Overview">
          <Para>
            Sitka ships with a <code className="font-mono text-[12px] text-[rgb(var(--accent))]">ThemeManager</code> class that lets a SwiftUI app switch
            between a user-chosen accent colour and the locked Sitka brand palette at runtime.
            It is not a saved preference — it is a live preview tool that defaults to <code className="font-mono text-[12px] text-[rgb(var(--accent))]">false</code> on
            every launch. The toggle is typically exposed in a debug overlay or internal settings screen.
          </Para>
          <Para>
            Getting it right requires five things working together: creating the manager, injecting it into the
            environment, rebuilding the view tree on change, writing adaptive tokens, and forwarding the manager
            into every sheet. Miss any one of these and the toggle will either do nothing, corrupt colours in light
            mode, or crash at runtime.
          </Para>
          <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                  {["File", "Role"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["ThemeManager.swift",       "ObservableObject with useSitkaDefaults: Bool"],
                  ["SitkaDebugModifier.swift",  "Color.sitka* aliases + convenience extensions"],
                  ["SitkaTokens.swift",         "All typed token constants (colors, spacing, radius …)"],
                  ["App entry point",           "Creates ThemeManager, injects it as an EnvironmentObject"],
                ].map(([file, role]) => (
                  <tr key={file} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                    <td className="px-4 py-3 font-mono text-[12px] text-[rgb(var(--accent))]">{file}</td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── ThemeManager setup ─────────────────────────── */}
        <Section title="1 · ThemeManager setup">
          <Para>
            Create <code className="font-mono text-[12px] text-[rgb(var(--accent))]">ThemeManager.swift</code> in your <code className="font-mono text-[12px] text-[rgb(var(--accent))]">Shared/Theme/</code> folder.
            The <code className="font-mono text-[12px] text-[rgb(var(--accent))]">@Published</code> property on an <code className="font-mono text-[12px] text-[rgb(var(--accent))]">ObservableObject</code> causes SwiftUI
            to re-render any view that reads it via <code className="font-mono text-[12px] text-[rgb(var(--accent))]">@EnvironmentObject</code> whenever the value changes.
          </Para>
          <CodeBlock
            language="swift"
            filename="ThemeManager.swift"
            code={`import SwiftUI

final class ThemeManager: ObservableObject {
    /// Defaults to false every launch — this is a preview tool, not a saved preference.
    @Published var useSitkaDefaults = false
}`}
          />

          <SubHeading>Inject at the app root (iOS)</SubHeading>
          <Para>
            Create a single <code className="font-mono text-[12px] text-[rgb(var(--accent))]">ThemeManager</code> instance at the app entry point and inject it into
            the environment with <code className="font-mono text-[12px] text-[rgb(var(--accent))]">.environmentObject()</code>. Also wire <code className="font-mono text-[12px] text-[rgb(var(--accent))]">.tint()</code>
            through the manager so system-rendered controls (native buttons, toggle switches, back-chevrons) also
            switch colour.
          </Para>
          <CodeBlock
            language="swift"
            filename="JobFlowApp.swift (iOS)"
            code={`@main
struct JobFlowApp: App {
    @StateObject private var themeManager = ThemeManager()
    @StateObject private var appSettings  = AppSettings()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(themeManager)
                .environmentObject(appSettings)
                // Wire the root tint through ThemeManager so all native
                // controls respond to the toggle — not just custom views.
                .tint(themeManager.useSitkaDefaults
                    ? Color.sitkaPrimary
                    : appSettings.currentAccent)
        }
    }
}`}
          />

          <SubHeading>Force a full tree rebuild when the toggle flips</SubHeading>
          <Para>
            SwiftUI caches rendered views aggressively. Without <code className="font-mono text-[12px] text-[rgb(var(--accent))]">.id()</code> on the root,
            views that were already on screen keep their old colours even after <code className="font-mono text-[12px] text-[rgb(var(--accent))]">useSitkaDefaults</code> changes.
            Applying <code className="font-mono text-[12px] text-[rgb(var(--accent))]">.id(themeManager.useSitkaDefaults)</code> tells SwiftUI to treat the whole
            content view as a new view whenever the boolean flips — guaranteeing a clean re-render.
          </Para>
          <CodeBlock
            language="swift"
            filename="ContentView.swift"
            code={`struct ContentView: View {
    @EnvironmentObject private var themeManager: ThemeManager

    var body: some View {
        // The .id() modifier causes SwiftUI to discard and recreate the
        // entire view tree when useSitkaDefaults changes. Without it, cached
        // views keep stale colours after the toggle flips.
        MainTabView()
            .id(themeManager.useSitkaDefaults)
    }
}`}
          />

          <SubHeading>Inject at the app root (macOS)</SubHeading>
          <CodeBlock
            language="swift"
            filename="JobFlowApp.swift (macOS)"
            code={`@main
struct JobFlowApp: App {
    @StateObject private var themeManager = ThemeManager()
    @StateObject private var appSettings  = AppSettings()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(themeManager)
                .environmentObject(appSettings)
        }
    }
}`}
          />
        </Section>

        {/* ── Adaptive tokens ────────────────────────────── */}
        <Section title="2 · Adaptive tokens (light & dark mode)">
          <Callout type="danger">
            Sitka is dark-first. Fixed hex values for text tokens — like <code className="font-mono text-[11px]">Color.white</code> — look correct in dark mode but become invisible against a white background in light mode. All text and surface tokens must resolve to adaptive system colors.
          </Callout>
          <Para>
            The <code className="font-mono text-[12px] text-[rgb(var(--accent))]">SitkaTokens.swift</code> Color enum uses static hex values, which are correct for
            brand colours (accent, success, warning, error) that are intentionally vivid regardless of mode. But
            text and surface tokens must use adaptive platform values so they automatically flip with the system
            appearance.
          </Para>
          <CodeBlock
            language="swift"
            filename="SitkaTokens+Adaptive.swift"
            code={`import SwiftUI

// Add this file alongside SitkaTokens.swift.
// These properties REPLACE the hex-based textPrimary / textSecondary / surface
// values for any view that may appear in both light and dark mode.

extension SitkaTokens.Color {
    // Text — adaptive: white in dark mode, near-black in light mode
    public static var textPrimary:    Color { Color(.label) }
    public static var textSecondary:  Color { Color(.secondaryLabel) }
    public static var textTertiary:   Color { Color(.tertiaryLabel) }

    // Surfaces — adaptive: near-black in dark, near-white in light
    public static var adaptiveBackground:  Color { Color(.systemBackground) }
    public static var adaptiveSurface:     Color { Color(.secondarySystemBackground) }
    public static var adaptiveSeparator:   Color { Color(.separator) }
}`}
          />
          <Para>
            For macOS, use <code className="font-mono text-[12px] text-[rgb(var(--accent))]">NSColor</code> equivalents — see the{" "}
            <Link href="/libraries/macos" className="text-[rgb(var(--accent))] underline underline-offset-2">macOS library page</Link>{" "}
            for the full mapping table.
          </Para>

          <SubHeading>Rule of thumb</SubHeading>
          <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                  {["Token type", "Use hex?", "Reason"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Brand accent (#8B6DFF)",   "Yes",  "Same vivid purple in both modes"],
                  ["Semantic (success/warning/error)", "Yes", "Fixed meaning, same hue both modes"],
                  ["Text primary / secondary",  "No",  "Must adapt — white in dark, near-black in light"],
                  ["Surface / background",      "No",  "Must adapt — dark panel vs. white card"],
                  ["Separator / border",        "No",  "System color adapts hairline weight automatically"],
                ].map(([type, use, reason]) => (
                  <tr key={type} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                    <td className="px-4 py-3 font-mono text-[12px] text-[rgb(var(--text-primary))]">{type}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: use === "Yes" ? "rgb(52,168,101)" : "rgb(239,68,68)" }}>{use}</td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── SitkaDebugModifier ─────────────────────────── */}
        <Section title="3 · SitkaDebugModifier and Color.sitka* aliases">
          <Para>
            <code className="font-mono text-[12px] text-[rgb(var(--accent))]">SitkaDebugModifier.swift</code> provides short-form <code className="font-mono text-[12px] text-[rgb(var(--accent))]">Color.sitka*</code> aliases
            so views don&apos;t reach into the <code className="font-mono text-[12px] text-[rgb(var(--accent))]">SFColor</code> or <code className="font-mono text-[12px] text-[rgb(var(--accent))]">SitkaTokens.Color</code> namespace directly.
            It also houses the <code className="font-mono text-[12px] text-[rgb(var(--accent))]">ThemeManager</code> class in some project layouts.
          </Para>
          <CodeBlock
            language="swift"
            filename="SitkaDebugModifier.swift"
            code={`import SwiftUI

// Short aliases — use these in views instead of SitkaTokens.Color.*
extension Color {
    // Brand accent (fixed — same vivid colour in both modes)
    static let sitkaPrimary = SitkaTokens.Color.accent

    // Semantic status colours (fixed)
    static let sitkaSuccess = SitkaTokens.Color.success
    static let sitkaWarning = SitkaTokens.Color.warning
    static let sitkaDanger  = SitkaTokens.Color.error

    // Adaptive text (these MUST be computed vars, not lets)
    static var sitkaLabel:          Color { SitkaTokens.Color.textPrimary }
    static var sitkaSecondaryLabel: Color { SitkaTokens.Color.textSecondary }
}`}
          />
          <Callout type="warning">
            Brand/semantic colours can be <code className="font-mono text-[11px]">static let</code> because they never change. Adaptive tokens that
            call <code className="font-mono text-[11px]">Color(.label)</code> must be <code className="font-mono text-[11px]">static var</code> — a <code className="font-mono text-[11px]">let</code> captures the value once at startup
            and will not respond to system appearance changes.
          </Callout>
        </Section>

        {/* ── effectiveAccent pattern ────────────────────── */}
        <Section title="4 · The effectiveAccent pattern">
          <Para>
            When <code className="font-mono text-[12px] text-[rgb(var(--accent))]">useSitkaDefaults</code> is <code className="font-mono text-[12px] text-[rgb(var(--accent))]">true</code>, views should use the locked Sitka brand accent.
            When it is <code className="font-mono text-[12px] text-[rgb(var(--accent))]">false</code>, they should use the user&apos;s chosen colour from <code className="font-mono text-[12px] text-[rgb(var(--accent))]">AppSettings</code>.
            The computed property <code className="font-mono text-[12px] text-[rgb(var(--accent))]">effectiveAccent</code> encodes this decision in one place.
          </Para>
          <CodeBlock
            language="swift"
            filename="Any view that shows an accent colour"
            code={`struct ExampleView: View {
    @EnvironmentObject private var themeManager: ThemeManager
    @EnvironmentObject private var appSettings:  AppSettings

    // Declare once per view — reads the toggle and returns the right colour
    private var effectiveAccent: Color {
        themeManager.useSitkaDefaults
            ? Color.sitkaPrimary
            : appSettings.currentAccent
    }

    var body: some View {
        VStack {
            // Use effectiveAccent wherever you previously used appSettings.currentAccent
            ProgressView(value: 0.7)
                .tint(effectiveAccent)

            Button("Continue") { }
                .foregroundStyle(effectiveAccent)

            Circle()
                .fill(effectiveAccent.opacity(0.15))
                .overlay(Image(systemName: "star.fill").foregroundStyle(effectiveAccent))
        }
    }
}`}
          />

          <SubHeading>Where to add it</SubHeading>
          <Para>
            Every view that directly reads <code className="font-mono text-[12px] text-[rgb(var(--accent))]">appSettings.currentAccent</code> needs the
            <code className="font-mono text-[12px] text-[rgb(var(--accent))]"> effectiveAccent</code> property. Common culprits:
          </Para>
          <ul className="space-y-1.5 text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            {[
              "GoalStreakView — progress rings, streak counter tint",
              "AnalyticsView (iOS & macOS) — chart series color, axis labels",
              "AddJobView (macOS) — primary action button, field focus ring",
              "JobDetailView, JobsView, KanbanView, FunnelView — status chips, selected states",
              "InterviewRoundsView, ResumeVaultView, ImportJobsView — icon tints, CTA buttons",
              "PaywallView — highlight tier border, pricing badge",
              "ContentView — tab bar selected icon (iOS), sidebar selection (macOS)",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
                <code className="font-mono text-[12px]">{item.split(" — ")[0]}</code>
                <span className="text-[rgb(var(--text-tertiary))]">— {item.split(" — ")[1]}</span>
              </li>
            ))}
          </ul>
          <Callout type="info">
            The root <code className="font-mono text-[11px]">.tint()</code> modifier (wired in step 1 above) handles system-rendered controls globally.
            You only need <code className="font-mono text-[11px]">effectiveAccent</code> in views that explicitly read <code className="font-mono text-[11px]">appSettings.currentAccent</code> for custom drawing.
          </Callout>
        </Section>

        {/* ── GlassTheme ─────────────────────────────────── */}
        <Section title="5 · Routing GlassTheme.accent through ThemeManager">
          <Para>
            <code className="font-mono text-[12px] text-[rgb(var(--accent))]">GlassTheme</code> is a static struct — it reads <code className="font-mono text-[12px] text-[rgb(var(--accent))]">AppSettings.shared.currentAccent</code> directly
            and has no connection to <code className="font-mono text-[12px] text-[rgb(var(--accent))]">ThemeManager</code>. Any view that uses <code className="font-mono text-[12px] text-[rgb(var(--accent))]">GlassTheme.accent</code> will
            always show the user&apos;s custom colour even when Sitka mode is on.
          </Para>
          <Para>
            The fix is to make <code className="font-mono text-[12px] text-[rgb(var(--accent))]">GlassTheme.accent</code> a passthrough that takes the resolved
            colour at the call site, or to add a ThemeManager-aware variant:
          </Para>
          <CodeBlock
            language="swift"
            filename="GlassTheme.swift — updated"
            code={`struct GlassTheme {
    // Legacy: reads directly from AppSettings — does NOT respond to ThemeManager
    static var accent: Color { AppSettings.shared.currentAccent }

    // Preferred: call with the resolved effectiveAccent from the calling view
    static func accentOverlay(_ color: Color, opacity: Double = 0.15) -> Color {
        color.opacity(opacity)
    }

    // Convenience for views that have EnvironmentObject access
    static func resolvedAccent(
        themeManager: ThemeManager,
        appSettings: AppSettings
    ) -> Color {
        themeManager.useSitkaDefaults
            ? Color.sitkaPrimary
            : appSettings.currentAccent
    }
}

// In your view:
struct MacSectionHeader: View {
    @EnvironmentObject private var themeManager: ThemeManager
    @EnvironmentObject private var appSettings:  AppSettings

    var body: some View {
        // Use resolvedAccent instead of GlassTheme.accent
        let accent = GlassTheme.resolvedAccent(
            themeManager: themeManager,
            appSettings: appSettings
        )
        HStack {
            Image(systemName: "sparkles")
                .foregroundStyle(accent)
            // …
        }
    }
}`}
          />
        </Section>

        {/* ── Environment propagation ────────────────────── */}
        <Section title="6 · Environment propagation in macOS sheets">
          <Callout type="danger">
            On macOS, any sheet or window that manually declares <code className="font-mono text-[11px]">.environmentObject()</code> must include the <strong>complete</strong> set of environment objects — including <code className="font-mono text-[11px]">themeManager</code>. Omitting it causes a runtime crash when the presented view tries to read ThemeManager from the environment.
          </Callout>
          <Para>
            This is the most common cause of "works on iOS, crashes on macOS" bugs after adding ThemeManager.
            macOS <code className="font-mono text-[12px] text-[rgb(var(--accent))]">ContentView</code> often presents sheets with explicit environment declarations. Every one of those chains must include all three managers.
          </Para>
          <CodeBlock
            language="swift"
            filename="ContentView.swift (macOS) — incorrect"
            code={`// ❌ themeManager is missing — AddJobView crashes if it reads ThemeManager
.sheet(isPresented: $showAddJob) {
    AddJobView()
        .environmentObject(appSettings)
        .environmentObject(subscriptionService)
}`}
          />
          <CodeBlock
            language="swift"
            filename="ContentView.swift (macOS) — correct"
            code={`// ✅ All three environment objects forwarded
.sheet(isPresented: $showAddJob) {
    AddJobView()
        .environmentObject(themeManager)       // ← required
        .environmentObject(appSettings)
        .environmentObject(subscriptionService)
}

// Apply the same fix to every sheet, popover, and fullScreenCover:
.sheet(isPresented: $showPaywall) {
    PaywallView()
        .environmentObject(themeManager)       // ← required
        .environmentObject(appSettings)
        .environmentObject(subscriptionService)
}`}
          />

          <SubHeading>Why the root injection isn&apos;t enough</SubHeading>
          <Para>
            On iOS, <code className="font-mono text-[12px] text-[rgb(var(--accent))]">.sheet()</code> inherits the parent&apos;s environment automatically. On macOS, sheets presented
            from a <code className="font-mono text-[12px] text-[rgb(var(--accent))]">WindowGroup</code> run in a separate context and do not inherit the parent environment unless
            you explicitly forward it. This is a macOS-only behaviour and not a SwiftUI bug.
          </Para>
        </Section>

        {/* ── Checklist ──────────────────────────────────── */}
        <Section title="Checklist">
          <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                  {["Item", "File / location"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["ThemeManager created as @StateObject at app root",          "App entry point"],
                  [".environmentObject(themeManager) on root WindowGroup",       "App entry point"],
                  [".tint() wired through ThemeManager on iOS root",             "App entry point"],
                  [".id(themeManager.useSitkaDefaults) on ContentView",          "ContentView.swift"],
                  ["Text/surface tokens use adaptive Color(.label) — not .white","SitkaTokens+Adaptive.swift"],
                  ["Color.sitkaLabel is a static var (not let)",                 "SitkaDebugModifier.swift"],
                  ["All views reading currentAccent use effectiveAccent instead","Each affected view"],
                  ["GlassTheme.accent replaced with resolvedAccent(_:)",         "GlassTheme.swift"],
                  ["All macOS sheets forward themeManager environmentObject",    "ContentView.swift (macOS)"],
                ].map(([item, location]) => (
                  <tr key={item} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                    <td className="px-4 py-3 text-[rgb(var(--text-primary))]">{item}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-[rgb(var(--accent))]">{location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

      </div>
    </div>
  );
}
