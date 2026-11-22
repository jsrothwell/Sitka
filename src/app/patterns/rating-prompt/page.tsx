"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

type Moment = "fifthJob" | "firstInterview" | "lifetime";

const MOMENTS: { id: Moment; label: string }[] = [
  { id: "fifthJob", label: "Logs 5th job" },
  { id: "firstInterview", label: "Gets 1st interview" },
  { id: "lifetime", label: "Buys Lifetime" },
];

const CODE = {
  react: {
    filename: "useRatingMoments.ts",
    code: `type Moment = "fifthJob" | "firstInterview" | "lifetime";

// Web has no system rating sheet; the same logic gates an in-app
// "Enjoying the app?" card or a link to your review page.
export function useRatingMoments(current: Set<Moment>, version: string, onPrompt: (m: Moment) => void) {
  const baseline = useRef<Set<Moment> | null>(null);

  useEffect(() => {
    // First observation only sets the baseline: moments reached before
    // this session (or before the feature shipped) never trigger a prompt.
    if (!baseline.current) { baseline.current = new Set(current); return; }
    const fresh = [...current].filter((m) => !baseline.current!.has(m));
    baseline.current = new Set([...baseline.current, ...current]);
    if (fresh.length === 0) return;

    if (localStorage.getItem("ratingAskedVersion") === version) return;   // Once per version
    localStorage.setItem("ratingAskedVersion", version);
    const id = setTimeout(() => onPrompt(fresh[0]), 1500);                // Let the moment land first
    return () => clearTimeout(id);
  }, [current, version, onPrompt]);
}`,
  },
  html: {
    filename: "rating-moments.md",
    code: `<!-- Decision table — same on every platform

  Moment happened…            Prompt?
  ─────────────────────────   ───────
  while the app is open        yes
  before this launch           no   (baseline)
  already asked this version   no
  during an error / paywall    no
  right after a destructive    no
    action or a failure
-->`,
  },
  swift: {
    filename: "ReviewMomentObserver.swift",
    code: `import StoreKit
import SwiftUI

/// Asks for an App Store rating at the moments people are happiest with the
/// app. A moment counts only when it happens while the app is open, and the
/// prompt is limited to once per version.
struct ReviewMomentObserver: View {
    let current: Set<Moment>            // Derived from app data
    @Environment(\\.requestReview) private var requestReview
    @State private var baseline: Set<Moment>?

    enum Moment: String { case fifthJob, firstInterview, lifetime }

    var body: some View {
        Color.clear
            .frame(width: 0, height: 0)
            .accessibilityHidden(true)
            .onAppear { if baseline == nil { baseline = current } }
            .onChange(of: current) { _, now in
                guard let seen = baseline else { baseline = now; return }
                let new = now.subtracting(seen)
                baseline = seen.union(now)
                guard !new.isEmpty, ReviewService.shared.canAskThisVersion else { return }
                ReviewService.shared.markRequested()
                // A short delay lets the celebration finish before the system sheet.
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) { requestReview() }
            }
    }
}`,
  },
};

export default function RatingPromptPage() {
  const [reached, setReached] = useState<Set<Moment>>(new Set(["fifthJob"]));
  const [baseline] = useState<Set<Moment>>(new Set(["fifthJob"]));
  const [askedThisVersion, setAsked] = useState(false);
  const [log, setLog] = useState<string[]>(["Launch: baseline = {5th job} — already reached, never prompts."]);

  function trigger(m: Moment) {
    if (reached.has(m)) {
      setLog((l) => [...l, `${MOMENTS.find((x) => x.id === m)!.label}: already reached → no prompt`]);
      return;
    }
    setReached((s) => new Set(s).add(m));
    if (askedThisVersion) {
      setLog((l) => [...l, `${MOMENTS.find((x) => x.id === m)!.label}: new moment, but already asked in 2.7 → no prompt`]);
      return;
    }
    setAsked(true);
    setLog((l) => [...l, `${MOMENTS.find((x) => x.id === m)!.label}: new moment → rating sheet after 1.5 s ★★★★★`]);
  }

  return (
    <div>
      <PageHeader
        title="Rating Prompt Moments"
        badge="New"
        description="When to ask for an App Store rating: only right after a moment of genuine success that happened during this session, at most once per version, and never near friction. Small rules, measurable effect on rating quality."
      />
      <SourceNote
        sources={[
          { app: "JobFlo", file: "Shared/Views/ConversionViews.swift (ReviewMomentObserver)" },
          { app: "JobFlo", file: "Shared/Services/ReviewService.swift" },
        ]}
      />

      <PreviewSection>
        <div className="mx-auto max-w-md">
          <div className="mb-3 flex flex-wrap gap-2">
            {MOMENTS.map((m) => (
              <button
                key={m.id}
                onClick={() => trigger(m.id)}
                className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1.5 text-[12px] font-medium text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))]"
              >
                {m.label}
              </button>
            ))}
            <button
              onClick={() => {
                setReached(new Set(baseline));
                setAsked(false);
                setLog(["Launch: baseline = {5th job} — already reached, never prompts."]);
              }}
              className="px-2 text-[12px] text-[rgb(var(--text-tertiary))] underline underline-offset-2"
            >
              Reset
            </button>
          </div>
          <ol className="space-y-1.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 font-mono text-[12px]" aria-live="polite">
            {log.map((line, i) => (
              <li key={i} className={line.includes("rating sheet") ? "text-[rgb(var(--status-success-text))]" : "text-[rgb(var(--text-secondary))]"}>
                {line}
              </li>
            ))}
          </ol>
        </div>
      </PreviewSection>

      <DocSection title="Rules">
        <DocTable
          headers={["Rule", "Why"]}
          rows={[
            ["Ask at success moments", "JobFlo uses three: the 5th job logged (habit formed), the first interview (the app is working), and a Lifetime purchase (explicit vote of confidence)."],
            ["Only moments that happen now", "The first observation sets a baseline. Existing users updating to a version with this code aren't asked about something they did months ago."],
            ["Once per version", "Apple already rate-limits the system sheet (3 times in 365 days), but a per-version gate keeps your best moments from being spent on the first trivial one."],
            ["Delay ~1.5 s", "Let the celebration animation or confirmation land; a sheet that appears mid-animation reads as an interruption."],
            ["Never near friction", "No prompt after an error, a failed sync, a paywall, a cancellation or a destructive action — even if a moment technically fired."],
            ["Use the system sheet", "requestReview / SKStoreReviewController only. Apple requires the system API for in-app rating requests (Guideline 5.6.1). Don't pre-ask “Do you like the app?” to route unhappy users to a feedback form instead — that's review gating."],
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Clear success moments", body: "Your app has events users unambiguously feel good about. If you can't name three, you're not ready to ask.", good: true },
            { heading: "Measure the moment", body: "Log which moment triggered the prompt so you can see which ones correlate with rating changes after a release.", good: true },
            { heading: "On a timer or launch count", body: "“Ask after 10 launches” asks people who might be mid-task, mid-frustration, or opening the app to cancel.", good: false },
            { heading: "Behind a button", body: "A “Rate us” button in Settings should open the App Store page directly (action=write-review), not call requestReview — the system may silently show nothing.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "The system sheet is accessible by default; the observer view itself is zero-size and hidden from assistive tech.",
            "Don't trigger the prompt while VoiceOver is announcing the celebration — the 1.5 s delay usually covers it; lengthen it if your success message is long.",
            "Never steal focus from a form or text field to show a rating prompt.",
          ]}
        />
      </DocSection>
    </div>
  );
}
