"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

const MIN_CHARS = 200;

const SAMPLE =
  "We are always looking for talented rockstars to join our growing family! The ideal candidate is a self-starter who thrives in a fast-paced environment and wears many hats. Responsibilities include various duties as assigned. This posting will remain open on an ongoing basis as we build our talent pipeline for future opportunities.";

type Level = "low" | "medium" | "high";

/** Toy heuristic for the demo — the real engine weighs posting window, wording and history. */
function assess(text: string): { level: Level; reasons: string[] } {
  const t = text.toLowerCase();
  const reasons: string[] = [];
  if (/(always looking|ongoing basis|talent pipeline|future opportunities)/.test(t))
    reasons.push("This reads like an always-open pipeline listing rather than a specific opening.");
  if (/(rockstar|many hats|fast-paced|self-starter|duties as assigned)/.test(t))
    reasons.push("Most of the description is generic text, with little about the actual work.");
  if (/(internal candidate|already identified|current employee)/.test(t))
    reasons.push("The wording suggests someone may already be lined up for this role.");
  return { level: reasons.length >= 2 ? "high" : reasons.length === 1 ? "medium" : "low", reasons };
}

const SUMMARY: Record<Level, string> = {
  low: "No warning signs in the listing text.",
  medium: "Some warning signs. It's worth applying, but keep your effort in proportion.",
  high: "Several warning signs. Check the role is really open before tailoring your résumé, for example by asking the recruiter or a contact.",
};
const TOKEN: Record<Level, string> = { low: "--status-success", medium: "--status-warning", high: "--status-danger" };

const CODE = {
  react: {
    filename: "LiveCheck.tsx",
    code: `const MIN_CHARS = 200;   // Below this, every input looks like boilerplate.

export function LiveCheck({ text, assess }: { text: string; assess: (t: string) => Result }) {
  const [result, setResult] = useState<Result | null>(null);
  const trimmed = text.trim();

  useEffect(() => {
    if (trimmed.length < MIN_CHARS) { setResult(null); return; }
    const id = setTimeout(() => setResult(assess(trimmed)), 400);   // Debounce: judge pauses, not keystrokes
    return () => clearTimeout(id);
  }, [trimmed, assess]);

  if (!result) return null;   // Silent until there's enough to judge — no "waiting…" placeholder.

  return (
    <section aria-label="Listing check" className="rounded-xl bg-[rgb(var(--surface-raised))] p-3.5">
      <h3 className="flex items-center gap-1.5 text-[14px] font-semibold">
        <LevelIcon level={result.level} /> Listing check
      </h3>
      <p className="mt-1 text-[13px]">{SUMMARY[result.level]}</p>
      <ul className="mt-2 space-y-1">
        {result.reasons.map((r) => (
          <li key={r} className="flex gap-1.5 text-[12px] text-[rgb(var(--text-secondary))]">
            <span aria-hidden style={{ color: \`rgb(var(\${TOKEN[result.level]}))\` }}>!</span>{r}
          </li>
        ))}
      </ul>
    </section>
  );
}`,
  },
  html: {
    filename: "live-check.html",
    code: `<label for="desc">Job description</label>
<textarea id="desc" aria-describedby="desc-check"></textarea>

<!-- Rendered only once the text passes the minimum length; updated after a 400ms pause -->
<section id="desc-check" class="live-check" data-level="high" aria-label="Listing check">
  <h3>Listing check</h3>
  <p>Several warning signs. Check the role is really open before tailoring your résumé.</p>
  <ul>
    <li>This reads like an always-open pipeline listing rather than a specific opening.</li>
    <li>Most of the description is generic text, with little about the actual work.</li>
  </ul>
</section>

<style>
.live-check { --c: var(--status-success); padding: 14px; border-radius: 12px; background: rgb(var(--surface-raised)); }
.live-check[data-level="medium"] { --c: var(--status-warning); }
.live-check[data-level="high"]   { --c: var(--status-danger); }
.live-check h3::before { content: "●"; color: rgb(var(--c)); margin-right: 6px; }
.live-check li { font-size: 12px; color: rgb(var(--text-secondary)); }
.live-check li::marker { color: rgb(var(--c)); }
</style>`,
  },
  swift: {
    filename: "ListingCheckCard.swift",
    code: `import SwiftUI

/// A live, plain-language check shown while a form is being filled, once
/// there's enough text to judge. Explains each warning in a sentence instead
/// of a score, and runs the fast heuristic pass only (no on-device LLM) so it
/// stays instant.
struct ListingCheckCard: View {
    let title: String
    let description: String
    @State private var breakdown: RiskEngine.Breakdown?

    static let minimumCharacters = 200
    private var text: String { description.trimmingCharacters(in: .whitespacesAndNewlines) }

    var body: some View {
        Group {
            if let breakdown, text.count >= Self.minimumCharacters {
                VStack(alignment: .leading, spacing: 8) {
                    Label("Listing check", systemImage: breakdown.level.icon)
                        .font(.subheadline.weight(.semibold))
                    Text(Self.summary(for: breakdown.level)).font(.footnote)
                    ForEach(Self.reasons(for: breakdown), id: \\.self) { reason in
                        Label(reason, systemImage: "exclamationmark.circle")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
                .padding(14)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 14))
                .accessibilityElement(children: .combine)
            }
        }
        // Restarts on every change; the sleep is the debounce.
        .task(id: "\\(title)|\\(text.hashValue)") {
            guard text.count >= Self.minimumCharacters else { breakdown = nil; return }
            try? await Task.sleep(for: .milliseconds(400))
            guard !Task.isCancelled else { return }
            breakdown = RiskEngine.assess(title: title, description: text)
        }
    }
}`,
  },
};

export default function LiveCheckPage() {
  const [text, setText] = useState(SAMPLE);
  const [result, setResult] = useState<ReturnType<typeof assess> | null>(null);
  const trimmed = text.trim();

  useEffect(() => {
    if (trimmed.length < MIN_CHARS) {
      setResult(null);
      return;
    }
    const id = setTimeout(() => setResult(assess(trimmed)), 400);
    return () => clearTimeout(id);
  }, [trimmed]);

  return (
    <div>
      <PageHeader
        title="Inline Live Check"
        badge="New"
        description="Advisory feedback that appears beside a form while someone types, once there's enough input to judge — explaining each concern in a plain sentence rather than a score or an error. Unlike validation, it never blocks saving."
      />
      <SourceNote sources={[{ app: "JobFlo", file: "Shared/Views/ListingCheckCard.swift" }]} />

      <PreviewSection>
        <div className="mx-auto max-w-md">
          <label htmlFor="live-check-demo" className="mb-1.5 block text-[13px] font-medium text-[rgb(var(--text-primary))]">
            Job description
          </label>
          <textarea
            id="live-check-demo"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-describedby="live-check-result"
            rows={6}
            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-3 text-[13px] text-[rgb(var(--text-primary))]"
          />
          <p className="mb-3 mt-1 text-right text-[11px] tabular-nums text-[rgb(var(--text-tertiary))]">
            {trimmed.length < MIN_CHARS ? `${MIN_CHARS - trimmed.length} more characters before the check runs` : `${trimmed.length} characters`}
          </p>
          <div id="live-check-result" aria-live="polite">
            {result && (
              <section aria-label="Listing check" className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-3.5">
                <p className="flex items-center gap-1.5 text-[14px] font-semibold text-[rgb(var(--text-primary))]">
                  <span style={{ color: `rgb(var(${TOKEN[result.level]}))` }} aria-hidden>
                    {result.level === "low" ? "✓" : "⚠"}
                  </span>
                  Listing check
                </p>
                <p className="mt-1 text-[13px] text-[rgb(var(--text-primary))]">{SUMMARY[result.level]}</p>
                {result.reasons.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {result.reasons.map((r) => (
                      <li key={r} className="flex gap-1.5 text-[12px] text-[rgb(var(--text-secondary))]">
                        <span style={{ color: `rgb(var(${TOKEN[result.level]}))` }} aria-hidden>
                          !
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </div>
          <div className="mt-3 flex gap-3 text-[12px]">
            <button onClick={() => setText(SAMPLE)} className="text-[rgb(var(--accent))] underline underline-offset-2">
              Vague listing
            </button>
            <button
              onClick={() =>
                setText(
                  "Senior Product Designer, Payments. You'll own the checkout and refunds flows for our merchant dashboard, working with two engineers and a PM. In the first 90 days you'll redesign dispute handling, which today takes merchants 11 steps. Salary $150k–$175k. Applications close 15 December; interviews are two rounds, both remote."
                )
              }
              className="text-[rgb(var(--accent))] underline underline-offset-2"
            >
              Specific listing
            </button>
          </div>
        </div>
      </PreviewSection>

      <DocSection title="Live check vs. validation">
        <DocTable
          headers={["", "Form validation", "Inline live check"]}
          rows={[
            ["Question", "Is this input acceptable?", "Is this a good idea?"],
            ["Blocks save", "Yes", "Never"],
            ["Tone", "Field-level error (“Enter a date”)", "Advice in sentences, ending with what to do"],
            ["Timing", "On blur or submit", "After a 400ms pause, once input passes a minimum length"],
            ["When nothing's wrong", "Nothing shown", "A short all-clear (“No warning signs”) — the check earned its space"],
          ]}
        />
      </DocSection>

      <DocSection title="Rules">
        <ArrowList
          items={[
            "Stay silent below a minimum input (JobFlo uses 200 characters). Judging a sentence fragment makes everything look suspicious and trains people to ignore the card.",
            "Debounce on pauses, not keystrokes, and cancel stale runs (a .task(id:) or effect cleanup) so a slow result never overwrites a newer one.",
            "Use only the fast, deterministic pass while typing. Slower or model-based scoring belongs after save, where the full Score Explainer can show the breakdown.",
            "One sentence per distinct reason, de-duplicated by category, in the order found. Never show a number here.",
            "End the summary with a proportional next step (“keep your effort in proportion”, “ask the recruiter”) rather than a verdict.",
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Judgment while composing", body: "Pasted job listings, email drafts that may sound harsh, passwords that are guessable, budgets that overrun — places where advice is most useful before committing.", good: true },
            { heading: "Same engine before and after", body: "Run the same heuristics the saved item will be scored with, so the live advice and the later score never disagree.", good: true },
            { heading: "Hard requirements", body: "If the input can't be saved as-is, that's validation — use Form Validation's error pattern instead.", good: false },
            { heading: "Every field", body: "One live check per form, attached to the field where judgment matters. Several competing advisory cards become noise.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "Connect the card to its field with aria-describedby so the advice is read when the field is focused.",
            "Wrap the result in a polite live region; because of the debounce it updates at most once per pause, not per keystroke.",
            "Combine the card into one element in SwiftUI (.accessibilityElement(children: .combine)) so the summary and reasons are read together.",
            "The level icon is decorative; the summary sentence states the level in words.",
          ]}
        />
      </DocSection>
    </div>
  );
}
