"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

// Game-local palette. Intentionally outside Sitka's tokens: a themed game UI
// must look unlike system and app chrome (see "Why not tokens" below).
const P = { cyan: "#00F0FF", magenta: "#FF2BD6", amber: "#FFB000", amberDim: "#7A5400", green: "#38FF87" };

const CODE = {
  react: {
    filename: "TerminalPanel.tsx",
    code: `// Square, black, outlined — never rounded or blurred, so it can't be mistaken for a system alert.
export function TerminalPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="panel-title"
         className="fixed inset-0 grid place-items-center bg-black/70 p-6">
      <div className="w-full max-w-[360px] border-2 border-[#FFB000] bg-black p-6 font-mono">
        <h2 id="panel-title" className="text-[18px] font-bold text-[#FFB000]">&gt; {title}</h2>
        <hr className="my-3.5 border-[#7A5400]" />
        <div className="flex flex-col gap-3.5">{children}</div>
      </div>
    </div>
  );
}

// Text-styled actions still get a full 44px hit area.
export function TerminalAction({ children, primary, onClick }: { children: string; primary?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
            className={\`min-h-11 w-full text-left font-mono \${primary
              ? "text-[22px] font-bold text-[#00F0FF] [text-shadow:0_0_6px_rgb(0_240_255/.8)]"
              : "text-[15px] text-[#38FF87]"}\`}>
      &gt; {children}
    </button>
  );
}

// Photosensitivity-safe attract text: ~0.3 Hz sine on opacity, floor 0.6 — never a blink.
// @keyframes breathe { 0%,100% { opacity: 1 } 50% { opacity: .6 } }
// .attract { animation: breathe 3.2s ease-in-out infinite; }
// @media (prefers-reduced-motion: reduce) { .attract { animation: none } }`,
  },
  html: {
    filename: "terminal-panel.html",
    code: `<div class="scrim">
  <div class="panel" role="dialog" aria-modal="true" aria-labelledby="t">
    <h2 id="t">&gt; SIMULATION TERMINATED</h2>
    <hr>
    <p class="row"><span>FINAL SCORE</span><span>0048210</span></p>
    <p class="row row--amber"><span>HIGH SCORE</span><span>0127550</span></p>
    <button class="primary">&gt; RE-ENGAGE</button>
    <button>&gt; RETURN TO TERMINAL</button>
  </div>
</div>

<style>
.scrim { position: fixed; inset: 0; display: grid; place-items: center; background: rgb(0 0 0 / .7); padding: 24px; }
.panel { width: 100%; max-width: 360px; padding: 24px; background: #000; border: 2px solid #FFB000;
         font-family: Menlo, ui-monospace, monospace; display: grid; gap: 14px; }
.panel h2 { color: #FFB000; font-size: 18px; }
.panel hr { border: 0; border-top: 1px solid #7A5400; }
.row { display: flex; justify-content: space-between; color: #00F0FF; font-size: 16px; }
.row--amber { color: #FFB000; }
.panel button { min-height: 44px; text-align: left; background: none; border: 0; color: #38FF87; font: inherit; font-size: 15px; }
.panel button.primary { color: #00F0FF; font-size: 22px; font-weight: 700; text-shadow: 0 0 6px rgb(0 240 255 / .8); }
</style>`,
  },
  swift: {
    filename: "GameOverView.swift",
    code: `import SwiftUI

/// Terminal-styled debrief panel. Deliberately square, black and amber so it
/// never reads as a native iOS alert (App Review Guideline 2.5.1 / system imitation).
struct GameOverView: View {
    let score: Int
    let highScore: Int
    let isNewHigh: Bool
    let onRetry: () -> Void
    let onExit: () -> Void
    /// Nil once ads have been removed — the option disappears instead of disabling.
    let onRemoveAds: (() -> Void)?

    var body: some View {
        ZStack {
            Color.black.opacity(0.7).ignoresSafeArea()
            VStack(alignment: .leading, spacing: 14) {
                Text("> SIMULATION TERMINATED")
                    .font(Palette.mono(18, bold: true)).foregroundStyle(Palette.amber)
                Rectangle().fill(Palette.amberDim).frame(height: 1)
                row("FINAL SCORE", score.scoreDigits, Palette.cyan)
                row("HIGH SCORE", highScore.scoreDigits, Palette.amber)
                if isNewHigh {
                    Text("> NEW RECORD LOGGED").font(Palette.mono(13)).foregroundStyle(Palette.green)
                }
                action("> RE-ENGAGE", size: 22, color: Palette.cyan, glow: true, perform: onRetry)
                action("> RETURN TO TERMINAL", size: 15, color: Palette.green, perform: onExit)
                if let onRemoveAds {
                    action("> REMOVE ADS", size: 13, color: Palette.amber.opacity(0.8), perform: onRemoveAds)
                }
            }
            .buttonStyle(.plain)
            .padding(24)
            .frame(maxWidth: 360, alignment: .leading)
            .background(Color.black)
            .overlay(Rectangle().stroke(Palette.amber, lineWidth: 2))
            .padding(24)
        }
    }

    private func action(_ title: String, size: CGFloat, color: Color, glow: Bool = false,
                        perform: @escaping () -> Void) -> some View {
        Button(action: perform) {
            Text(title)
                .font(Palette.mono(size, bold: glow))
                .foregroundStyle(color)
                .shadow(color: glow ? color.opacity(0.8) : .clear, radius: 6)
                .frame(maxWidth: .infinity, minHeight: 44, alignment: .leading)  // 44pt even for text links
                .contentShape(Rectangle())
        }
    }

    private func row(_ label: String, _ value: String, _ color: Color) -> some View {
        HStack { Text(label).foregroundStyle(color.opacity(0.7)); Spacer(); Text(value).foregroundStyle(color) }
            .font(Palette.mono(16))
            .accessibilityElement(children: .combine)
    }
}

/// Attract-mode prompt: soft sine pulse (~0.3 Hz), never a blink.
struct AttractText: View {
    let text: String
    @Environment(\\.accessibilityReduceMotion) private var reduceMotion

    var body: some View {
        TimelineView(.animation(paused: reduceMotion)) { t in
            Text(text)
                .opacity(reduceMotion ? 1 : 0.6 + 0.4 * sin(t.date.timeIntervalSinceReferenceDate * 2))
        }
    }
}`,
  },
};

export default function GameOverlaysPage() {
  const [screen, setScreen] = useState<"over" | "upgrade">("over");

  return (
    <div>
      <PageHeader
        title="Game Overlays"
        badge="New"
        description="Themed menus, debrief panels and purchase offers for games. Covers the rules that still apply when a game's art direction replaces the design system: overlays must not look like system alerts, light effects must be photosensitivity-safe, and stylized text actions still need 44pt targets."
      />
      <SourceNote
        sources={[
          { app: "Blackbox 1981", file: "GameOverView.swift" },
          { app: "Blackbox 1981", file: "PaywallView.swift" },
          { app: "Blackbox 1981", file: "MainMenuView.swift" },
        ]}
      />

      <PreviewSection>
        <div className="mx-auto max-w-md">
          <div className="relative overflow-hidden rounded-lg bg-black p-6" style={{ fontFamily: "Menlo, ui-monospace, monospace" }}>
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgb(255 255 255 / .08) 2px 3px)" }}
              aria-hidden
            />
            <div className="relative mx-auto max-w-[360px] border-2 bg-black p-6" style={{ borderColor: P.amber }}>
              {screen === "over" ? (
                <div className="flex flex-col gap-3.5">
                  <p className="text-[18px] font-bold" style={{ color: P.amber }}>&gt; SIMULATION TERMINATED</p>
                  <div className="h-px" style={{ background: P.amberDim }} />
                  <p className="flex justify-between text-[15px]" style={{ color: P.cyan }}>
                    <span style={{ opacity: 0.7 }}>FINAL SCORE</span>
                    <span>0048210</span>
                  </p>
                  <p className="flex justify-between text-[15px]" style={{ color: P.amber }}>
                    <span style={{ opacity: 0.7 }}>HIGH SCORE</span>
                    <span>0127550</span>
                  </p>
                  <button className="min-h-11 text-left text-[22px] font-bold" style={{ color: P.cyan, textShadow: `0 0 6px ${P.cyan}cc` }}>
                    &gt; RE-ENGAGE
                  </button>
                  <button className="min-h-11 text-left text-[15px]" style={{ color: P.green }}>&gt; RETURN TO TERMINAL</button>
                  <button onClick={() => setScreen("upgrade")} className="min-h-11 text-left text-[13px]" style={{ color: P.amber, opacity: 0.8 }}>
                    &gt; REMOVE ADS
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5">
                  <p className="text-[18px] font-bold" style={{ color: P.amber }}>&gt; CLEARANCE UPGRADE</p>
                  <div className="h-px" style={{ background: P.amberDim }} />
                  <p className="text-[15px] font-bold" style={{ color: P.cyan }}>REMOVE ALL ADS</p>
                  <p className="text-[12px] leading-relaxed" style={{ color: P.cyan, opacity: 0.75 }}>
                    One-time purchase. No banners, no interruptions between runs. Applies to every device on your Apple Account.
                  </p>
                  <button className="min-h-11 text-left text-[20px] font-bold" style={{ color: P.cyan, textShadow: `0 0 6px ${P.cyan}cc` }}>
                    &gt; AUTHORIZE&nbsp;&nbsp;$2.99
                  </button>
                  <button className="min-h-11 text-left text-[15px]" style={{ color: P.green }}>&gt; RESTORE PURCHASE</button>
                  <button onClick={() => setScreen("over")} className="min-h-11 text-left text-[15px]" style={{ color: P.green }}>
                    &gt; CANCEL
                  </button>
                </div>
              )}
            </div>
            <p className="relative mt-5 text-center text-[13px] font-bold motion-safe:animate-[breathe_3.2s_ease-in-out_infinite]" style={{ color: P.cyan }}>
              &gt; TAP TO ENGAGE &lt;
            </p>
            <style>{`@keyframes breathe { 0%,100% { opacity: 1 } 50% { opacity: .6 } }`}</style>
          </div>
        </div>
      </PreviewSection>

      <DocSection title="Rules that survive a full re-theme" intro="A game can drop Sitka's colors, type and radii. It can't drop these.">
        <DocTable
          headers={["Rule", "How Blackbox 1981 meets it"]}
          rows={[
            ["Don't imitate system UI", "Panels are square, opaque black with a 2px amber outline and monospace type — never rounded, blurred, or laid out like a UIAlertController. System-imitation is an App Review rejection (Guideline 2.5.1)."],
            ["No flashing", "No full-screen strobes or high-frequency flashes. Attention effects are a soft sine pulse at ~0.3 Hz with an opacity floor of 0.6; strobe effects are hard-disabled in config. WCAG 2.3.1 caps flashes at 3 per second."],
            ["44pt targets", "Every “> ACTION” text link has minHeight 44 and a full-width contentShape, even when the glyphs are 13pt."],
            ["Purchase clarity", "The one-time offer states what it removes, that it's a single purchase, and that it covers every device — with Restore Purchase and Cancel always visible. Price comes from StoreKit, not a hard-coded string."],
            ["Options disappear, not disable", "“Remove Ads” and “Leaderboard” are nil-able actions: once ads are removed or while Game Center is signed out, the line isn't shown at all."],
            ["Consent re-entry", "A PRIVACY link appears only where consent law requires a way back into the ad-consent form."],
            ["Ads off the playfield", "Banners appear only on the debrief screen, docked to the bottom edge, never over gameplay or the primary action."],
          ]}
        />
      </DocSection>

      <DocSection title="Why not tokens">
        <p className="text-[14px] text-[rgb(var(--text-secondary))]">
          Like Live Activities, a themed game is a surface where Sitka's normal chrome is the wrong answer: the art
          direction is the product, and a glass card would break it. Keep the game palette in one local enum (
          <code>Palette</code>) shared by renderer and menus, keep it matched to the asset generator, and apply this
          page's rules instead of Sitka's tokens. Accessibility and platform rules are the shared layer; color and
          type are not.
        </p>
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Games and toys", body: "Arcade games, puzzles, interactive brand experiences — anywhere art direction deliberately replaces the system look.", good: true },
            { heading: "Overlays over live content", body: "Debriefs, pause menus and offers drawn over a running or frozen playfield, behind a 70–80% black scrim.", good: true },
            { heading: "Productivity apps", body: "A retro terminal skin in a tool app is a theme, not a game. Use Sitka's tokens with a personalization accent instead.", good: false },
            { heading: "Settings and legal", body: "Account, privacy and subscription management should still use native, unstyled system UI.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "Strip decorative prefixes from spoken labels: “> RE-ENGAGE” should be announced as “Re-engage”, not “greater than re-engage”.",
            "Combine label/value rows (“FINAL SCORE 0048210”) into one element, and speak scores as numbers, not seven zero-padded digits.",
            "Respect Reduce Motion: pause attract-mode pulses and CRT effects entirely, not just slow them.",
            "If the whole title screen is one tap-to-start target, keep secondary links (Leaderboard, Privacy, Remove Ads) outside that element so VoiceOver can reach them.",
            "Neon-on-black passes contrast easily; dimmed variants (amber at 0.7 opacity) must still clear 4.5:1 against black.",
          ]}
        />
      </DocSection>
    </div>
  );
}
