"use client";

import { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

// ── Round types ────────────────────────────────────────────────────────────────
const ROUND_TYPES = [
  { id: "technical",    label: "Technical" },
  { id: "behavioral",   label: "Behavioral" },
  { id: "system",       label: "System Design" },
  { id: "hr",           label: "HR Screening" },
  { id: "panel",        label: "Final Panel" },
];

const PREP_CONTENT: Record<string, string> = {
  technical: `Key topics to review

• Data structures: arrays, linked lists, trees, hash maps
• Algorithms: sorting, BFS/DFS, dynamic programming
• Swift concurrency: async/await, actors, structured concurrency
• Memory management: ARC, retain cycles, weak/unowned references

Likely questions

1. Reverse a linked list — Walk through the iterative approach (O(n), O(1) space), then mention the recursive version. Discuss tradeoffs.

2. Design a thread-safe cache — Start with Dictionary + NSLock, then explain actor-based isolation in Swift.

3. Explain SwiftUI's diffing — Describe EquatableView, why @State triggers a re-render, and how withAnimation batches changes.

Tips for this round

• Think aloud — interviewers care about your process, not just the final answer.
• Clarify constraints before coding: input size, edge cases, expected output format.
• State the brute-force approach first, then optimise. Signal that you know there's a better path.`,

  behavioral: `Key topics to review

• STAR format: Situation, Task, Action, Result — keep answers under 3 minutes
• Leadership and influence without formal authority
• Handling disagreement and giving difficult feedback
• Failure stories that show reflection and growth

Likely questions

1. Tell me about a time you disagreed with a decision — Focus on how you raised the concern constructively, what you listened to, and what you ultimately did.

2. Describe a project you are most proud of — Choose something with measurable impact. Quantify outcomes wherever possible.

3. How do you prioritise when everything is urgent? — Walk through your framework: impact × effort, dependencies, stakeholder alignment.

Tips for this round

• Prepare 5–6 strong stories that can flex across multiple questions.
• Be specific: names, dates, metrics. Vague answers signal shallow recall.
• Land the result first, then invite follow-up questions rather than burying it at the end.`,

  system: `Key topics to review

• Capacity estimation: QPS, storage, bandwidth back-of-envelope
• Database choices: relational vs. document vs. time-series; sharding strategies
• Caching: read-through, write-through, eviction policies, CDN placement
• API design: REST conventions, pagination, versioning, idempotency

Likely questions

1. Design a URL shortener — Cover hashing strategy, redirect latency, analytics storage, and rate limiting.

2. Design a notification delivery system — Fan-out on write vs. fan-out on read; push vs. pull; retry with exponential backoff.

3. Design a job tracking backend — Data model for status transitions, conflict resolution for concurrent updates, search indexing.

Tips for this round

• Drive the conversation — ask clarifying questions to scope the problem before proposing any architecture.
• Draw the data flow explicitly: client → API → service → storage. Name each arrow.
• Mention failure modes and how you'd handle them (circuit breakers, retries, dead-letter queues).`,

  hr: `Key topics to review

• Your career narrative: why this role, why this company, why now
• Compensation expectations (research bands before the call)
• Work style and preferences: remote/hybrid, team size, collaboration cadence
• Near-term and long-term goals

Likely questions

1. Walk me through your background — Practise a 90-second version that ends with why you're excited about this specific role.

2. What is your expected compensation? — Give a researched range. Anchor to the top of the range.

3. Do you have any other offers or timelines we should know about? — Be honest; this helps both sides move efficiently.

Tips for this round

• Research the company mission and recent news so your enthusiasm is grounded in specifics.
• Prepare two or three thoughtful questions that signal genuine interest — not just salary or PTO.
• Keep the tone warm and conversational; this round is about fit as much as facts.`,

  panel: `Key topics to review

• All previous round themes may resurface — review your strong stories and technical highlights
• Cross-functional alignment: how you work with design, product, and data science
• Vision and strategic thinking: what does great look like in 12 months?
• Stakeholder management: communicating up, managing expectations

Likely questions

1. If you joined tomorrow, what would you do in the first 30/60/90 days? — Show listening (you would learn before acting), then outline a concrete plan.

2. How do you define success for this role? — Align to the company's current priorities. Demonstrate you have done your research.

3. What is the most important thing the team should stop doing? — A bold, well-reasoned answer here signals confidence and strategic clarity.

Tips for this round

• Calibrate your answers to the seniority of each panelist — the VP wants vision, the IC wants specifics.
• Ask each panelist something different; it signals active listening.
• End with energy: restate your enthusiasm for the role and the team.`,
};

// ── Streaming simulation ───────────────────────────────────────────────────────
function InterviewPrepDemo() {
  const [roundType, setRoundType] = useState("technical");
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  function generate() {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsGenerating(true);
    setContent(null);
    const full = PREP_CONTENT[roundType] ?? PREP_CONTENT.technical;
    let i = 0;
    timerRef.current = setInterval(() => {
      i += 10;
      if (i >= full.length) {
        setContent(full);
        setIsGenerating(false);
        clearInterval(timerRef.current!);
      } else {
        setContent(full.slice(0, i));
      }
    }, 18);
  }

  return (
    <div style={{ maxWidth: 580 }}>
      {/* Job context strip */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
        borderRadius: 10, background: "rgb(var(--surface-raised))",
        border: "1px solid rgb(var(--border))", marginBottom: 14,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgb(var(--accent) / 0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏢</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "rgb(var(--text-primary))" }}>Senior iOS Engineer</div>
          <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))" }}>Meridian AI · Round {ROUND_TYPES.findIndex(r => r.id === roundType) + 1} of 5</div>
        </div>
        <div style={{ marginLeft: "auto", padding: "3px 10px", borderRadius: 99, background: "rgb(var(--accent) / 0.1)", fontSize: 11, fontWeight: 600, color: "rgb(var(--accent))" }}>
          Pro
        </div>
      </div>

      {/* Round selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {ROUND_TYPES.map(r => (
          <button
            key={r.id}
            onClick={() => { setRoundType(r.id); setContent(null); if (timerRef.current) clearInterval(timerRef.current); setIsGenerating(false); }}
            style={{
              padding: "5px 13px", borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: "pointer",
              border: "1px solid", transition: "all 0.15s",
              borderColor: roundType === r.id ? "rgb(var(--accent))" : "rgb(var(--border))",
              background: roundType === r.id ? "rgb(var(--accent) / 0.1)" : "transparent",
              color: roundType === r.id ? "rgb(var(--accent))" : "rgb(var(--text-secondary))",
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Generate CTA */}
      <button
        onClick={generate}
        disabled={isGenerating}
        style={{
          width: "100%", padding: "10px 0", borderRadius: 12,
          background: isGenerating ? "rgb(var(--surface-raised))" : "rgb(var(--accent))",
          color: isGenerating ? "rgb(var(--text-tertiary))" : "#fff",
          border: "none", fontSize: 14, fontWeight: 600,
          cursor: isGenerating ? "not-allowed" : "pointer", marginBottom: 14,
        }}
      >
        {isGenerating ? "Generating prep guide…" : `Generate ${ROUND_TYPES.find(r => r.id === roundType)?.label} Prep Guide`}
      </button>

      {/* Loading state */}
      {isGenerating && !content && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 20, justifyContent: "center", color: "rgb(var(--text-tertiary))", fontSize: 13 }}>
          <div style={{ width: 16, height: 16, border: "2px solid rgb(var(--accent))", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          Preparing your guide…
        </div>
      )}

      {/* Streaming content */}
      {content && (
        <div style={{
          padding: "16px 18px", borderRadius: 14,
          background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))",
          fontSize: 13, lineHeight: 1.75, color: "rgb(var(--text-secondary))",
          whiteSpace: "pre-line",
        }}>
          {content}
          {isGenerating && <span style={{ color: "rgb(var(--accent))" }}> ▌</span>}

          {!isGenerating && (
            <div style={{ display: "flex", gap: 8, marginTop: 16, paddingTop: 14, borderTop: "1px solid rgb(var(--border))" }}>
              <button style={{ padding: "7px 14px", borderRadius: 8, background: "rgb(var(--accent))", color: "#fff", border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Start Mock Interview
              </button>
              <button style={{ padding: "7px 14px", borderRadius: 8, background: "transparent", border: "1px solid rgb(var(--border))", fontSize: 12, fontWeight: 600, cursor: "pointer", color: "rgb(var(--text-secondary))" }}>
                Add to Notes
              </button>
            </div>
          )}
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Code samples ──────────────────────────────────────────────────────────────
const CODE = {
  swift: {
    filename: "InterviewPrepView.swift",
    code: `import SwiftUI

// Requires iOS 26+ Foundation Models framework (on-device LLM).
// Gate the view with \`JobAIService.shared.isAvailable\` and show
// an upgrade prompt on older OS versions.

struct InterviewPrepView: View {
    let round: InterviewRound
    let job: Job?
    @Environment(\\.dismiss) private var dismiss

    @State private var streamedContent = ""
    @State private var isGenerating = false
    @State private var errorMessage: String? = nil

    var body: some View {
        NavigationStack {
            ZStack {
                GlassTheme.backgroundColor.ignoresSafeArea()
                ScrollView {
                    VStack(alignment: .leading, spacing: 20) {
                        if isGenerating && streamedContent.isEmpty {
                            loadingPlaceholder
                        } else if let error = errorMessage {
                            errorPlaceholder(error)
                        } else if !streamedContent.isEmpty {
                            contentCard
                        }
                    }
                    .padding(20)
                }
            }
            .navigationTitle("Prep: \\(round.name ?? "")")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(GlassTheme.backgroundColor, for: .navigationBar)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .foregroundStyle(GlassTheme.accent)
                }
            }
            .task { await generatePrep() }
        }
    }

    private var loadingPlaceholder: some View {
        VStack(spacing: 16) {
            ProgressView()
                .scaleEffect(1.2)
                .tint(GlassTheme.accent)
            Text("Generating prep guide…")
                .appFont(size: 15)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(48)
    }

    private func errorPlaceholder(_ message: String) -> some View {
        VStack(spacing: 14) {
            Image(systemName: "exclamationmark.triangle.fill")
                .font(.system(size: 32))
                .foregroundStyle(.orange)
            Text(message)
                .appFont(size: 14)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(48)
    }

    private var contentCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(streamedContent)
                .appFont(size: 15)
                .foregroundStyle(.primary)
                .frame(maxWidth: .infinity, alignment: .leading)

            if isGenerating {
                HStack(spacing: 6) {
                    ProgressView()
                        .scaleEffect(0.65)
                        .tint(GlassTheme.accent)
                    Text("Writing…")
                        .appFont(size: 12)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding(16)
        .glassCard()
    }

    private func generatePrep() async {
        guard JobAIService.shared.isAvailable else {
            errorMessage = "Interview prep requires iOS 26 or later with on-device AI."
            return
        }
        isGenerating = true
        let roleTitle = job?.title ?? "this role"
        let company   = job?.company ?? "the company"
        let context   = job?.notes.flatMap { $0.isEmpty ? nil : "\\n\\nRole context: \\($0.prefix(500))" } ?? ""

        let prompt = """
            Create a focused prep guide for a \\(round.name ?? "") interview — \\(roleTitle) at \\(company).\\(context)

            Cover:
            • Key topics and skills to review
            • 3–5 likely questions with brief guidance on how to answer
            • Tips specific to this round type

            Use plain text with bullet points. Be practical, not generic.
            """
        do {
            for try await accumulated in JobAIService.shared.streamResponse(
                prompt: prompt,
                instructions: "You are an expert interview coach. Give concise, actionable preparation advice."
            ) {
                streamedContent = accumulated
            }
        } catch {
            if !Task.isCancelled {
                errorMessage = "Couldn't generate prep guide. Try again."
            }
        }
        isGenerating = false
    }
}`,
  },
  react: {
    filename: "InterviewPrepPanel.tsx",
    code: `"use client";
import { useState, useRef, useEffect } from "react";

type RoundType = "technical" | "behavioral" | "system" | "hr" | "panel";

const ROUND_LABELS: Record<RoundType, string> = {
  technical:  "Technical",
  behavioral: "Behavioral",
  system:     "System Design",
  hr:         "HR Screening",
  panel:      "Final Panel",
};

interface InterviewPrepPanelProps {
  jobTitle: string;
  company: string;
  roundType: RoundType;
  onRoundChange: (r: RoundType) => void;
  /** Async generator that yields accumulated text chunks */
  streamPrep: (roundType: RoundType) => AsyncGenerator<string, void, unknown>;
}

export function InterviewPrepPanel({
  jobTitle, company, roundType, onRoundChange, streamPrep,
}: InterviewPrepPanelProps) {
  const [content, setContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef(false);

  useEffect(() => { setContent(""); }, [roundType]);

  async function generate() {
    abortRef.current = false;
    setIsStreaming(true);
    setContent("");
    for await (const chunk of streamPrep(roundType)) {
      if (abortRef.current) break;
      setContent(chunk);
    }
    setIsStreaming(false);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Job context */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))]">
        <div className="text-xs font-semibold text-[rgb(var(--text-primary))]">
          {jobTitle} · {company}
        </div>
        <span className="ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[rgb(var(--accent)_/_0.1)] text-[rgb(var(--accent))]">
          Pro
        </span>
      </div>

      {/* Round tabs */}
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(ROUND_LABELS) as RoundType[]).map(r => (
          <button key={r} onClick={() => onRoundChange(r)}
            className={\`px-3 py-1 rounded-full text-xs font-semibold border transition-colors \${
              r === roundType
                ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent)_/_0.1)] text-[rgb(var(--accent))]"
                : "border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent)_/_0.5)]"
            }\`}
          >
            {ROUND_LABELS[r]}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button onClick={generate} disabled={isStreaming}
        className="w-full py-2.5 rounded-xl bg-[rgb(var(--accent))] text-white text-sm font-semibold disabled:opacity-60"
      >
        {isStreaming ? "Generating…" : \`Generate \${ROUND_LABELS[roundType]} Prep\`}
      </button>

      {/* Content */}
      {(content || isStreaming) && (
        <div className="p-4 rounded-2xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-sm text-[rgb(var(--text-secondary))] leading-relaxed whitespace-pre-line">
          {content}
          {isStreaming && <span className="text-[rgb(var(--accent))] animate-pulse"> ▌</span>}
        </div>
      )}
    </div>
  );
}`,
  },
  html: {
    filename: "interview-prep.html",
    code: `<!-- Interview Prep — Sitka design tokens -->
<div class="ip-panel">
  <!-- Job context -->
  <div class="ip-context">
    <span class="ip-context__title">Senior iOS Engineer · Meridian AI</span>
    <span class="ip-badge">Pro</span>
  </div>

  <!-- Round tabs -->
  <div class="ip-tabs" role="tablist">
    <button class="ip-tab ip-tab--active" role="tab">Technical</button>
    <button class="ip-tab" role="tab">Behavioral</button>
    <button class="ip-tab" role="tab">System Design</button>
    <button class="ip-tab" role="tab">HR Screening</button>
    <button class="ip-tab" role="tab">Final Panel</button>
  </div>

  <!-- Generate CTA -->
  <button class="ip-cta">Generate Technical Prep Guide</button>

  <!-- Streaming content (hidden until generation starts) -->
  <div class="ip-content" aria-live="polite" aria-label="Prep guide content">
    <!-- Streaming text injected here -->
    <span class="ip-cursor">▌</span>
  </div>
</div>

<style>
.ip-panel        { display: flex; flex-direction: column; gap: 12px; max-width: 560px; }
.ip-context      { display: flex; align-items: center; padding: 10px 14px; border-radius: 10px;
                   background: rgb(var(--surface-raised)); border: 1px solid rgb(var(--border)); }
.ip-context__title { font-size: 13px; font-weight: 600; color: rgb(var(--text-primary)); flex: 1; }
.ip-badge        { font-size: 11px; font-weight: 600; padding: 2px 10px; border-radius: 99px;
                   background: rgb(var(--accent) / 0.1); color: rgb(var(--accent)); }
.ip-tabs         { display: flex; flex-wrap: wrap; gap: 6px; }
.ip-tab          { padding: 5px 13px; border-radius: 99px; font-size: 12px; font-weight: 600;
                   border: 1px solid rgb(var(--border)); background: transparent;
                   color: rgb(var(--text-secondary)); cursor: pointer; }
.ip-tab--active  { border-color: rgb(var(--accent)); background: rgb(var(--accent) / 0.1);
                   color: rgb(var(--accent)); }
.ip-cta          { padding: 10px; border-radius: 12px; background: rgb(var(--accent)); color: white;
                   border: none; font-size: 14px; font-weight: 600; cursor: pointer; }
.ip-content      { padding: 16px 18px; border-radius: 14px; background: rgb(var(--surface));
                   border: 1px solid rgb(var(--border)); font-size: 13px; line-height: 1.75;
                   color: rgb(var(--text-secondary)); white-space: pre-line; display: none; }
.ip-content.visible { display: block; }
.ip-cursor       { color: rgb(var(--accent)); animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }
</style>`,
  },
};

// ── Main page ─────────────────────────────────────────────────────────────────
export default function InterviewPrepPage() {
  return (
    <div>
      <PageHeader
        title="Interview Prep Hub"
        description="On-device AI streaming that generates a focused preparation guide for each interview round — topics to review, likely questions with answer guidance, and round-specific tips. Powered by the Foundation Models framework (iOS 26+). Pro feature."
        badge="New"
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <InterviewPrepDemo />
        <p className="mt-3 text-[12px] text-[rgb(var(--text-tertiary))]">
          Select a round type and click Generate to simulate the streaming output
        </p>
      </section>

      {/* Architecture */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Architecture</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          All generation runs on-device via <code className="font-mono text-[12px] text-[rgb(var(--accent))]">JobAIService</code>,
          which wraps the Foundation Models <code className="font-mono text-[12px] text-[rgb(var(--accent))]">LanguageModelSession</code>.
          No network call is ever made; the prep guide is transient — it is never stored.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Layer</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Component</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {[
                { layer: "View",    comp: "InterviewPrepView",        resp: "Round selector, streaming text display, loading/error states" },
                { layer: "Service", comp: "JobAIService.shared",      resp: "Wraps LanguageModelSession, exposes streamResponse(prompt:instructions:)" },
                { layer: "Model",   comp: "InterviewRound",           resp: "round.name (\"Technical\", \"Behavioral\", etc.), links to Job for context" },
                { layer: "Gate",    comp: "JobAIService.isAvailable", resp: "Returns false on iOS <26; view shows upgrade prompt" },
              ].map(row => (
                <tr key={row.layer} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.layer}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.comp}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.resp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Prompt structure */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Prompt structure</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-3">
          The prompt is assembled from three sources and capped at ~600 tokens to keep latency under 3 seconds on device.
        </p>
        <div className="space-y-3">
          {[
            { src: "round.name",    usage: "Sets the round type (\"Technical\", \"Behavioral\"…). Drives the entire structure of the prep guide." },
            { src: "job.title + job.company", usage: "Grounds the advice in the specific role. The model tailors its examples to the industry and level." },
            { src: "job.notes (first 500 chars)", usage: "Optional extra context — pasted job description or personal notes. Omitted if empty." },
          ].map(({ src, usage }) => (
            <div key={src} className="flex gap-3 text-[14px]">
              <code className="font-mono text-[11px] text-[rgb(var(--accent))] mt-0.5 shrink-0 bg-[rgb(var(--surface-raised))] px-2 py-0.5 rounded">{src}</code>
              <span className="text-[rgb(var(--text-secondary))]">{usage}</span>
            </div>
          ))}
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">States</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">State</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Condition</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">UI</th>
              </tr>
            </thead>
            <tbody>
              {[
                { state: "Idle",           cond: "No generation started",               ui: "Round selector + Generate button" },
                { state: "Loading",        cond: "isGenerating && content is empty",     ui: "ProgressView centred; no content yet" },
                { state: "Streaming",      cond: "isGenerating && content non-empty",    ui: "Partial text + blinking cursor ▌ + small spinner" },
                { state: "Complete",       cond: "Generation finished successfully",     ui: "Full text; action row: Start Mock / Add to Notes" },
                { state: "Unavailable",    cond: "isAvailable == false (iOS < 26)",      ui: "Error card with upgrade callout; no Generate button" },
                { state: "Error",          cond: "Stream throws (not cancelled)",        ui: "Error message + Retry button" },
              ].map(row => (
                <tr key={row.state} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.state}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.cond}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.ui}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Design notes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Design notes</h2>
        <div className="space-y-3">
          {[
            { h: "Stream text immediately — never buffer then reveal", b: "Start appending tokens as soon as the first chunk arrives. Users find streaming far less anxious than a long spinner followed by a full dump. Even 2–3 words appearing immediately signals progress." },
            { h: "Transient by design", b: "Prep guides are intentionally not persisted. The round context changes each time the user generates, and storing stale advice creates more confusion than value. Offer an 'Add to Notes' button to let the user opt into saving." },
            { h: "Gate gracefully on iOS < 26", b: "Check isAvailable before showing the Generate button. On unsupported OS versions, show an upgrade callout — never a hidden button or silent failure. The user should understand why the feature is absent." },
            { h: "Cancel on dismiss", b: "Wrap generation in a .task modifier so the async work is automatically cancelled when the view disappears. Do not leave orphaned streams consuming CPU after the sheet is dismissed." },
            { h: "Round type drives prompt structure", b: "A Technical prompt asks for code-level topics and algorithm questions. A Behavioral prompt asks for STAR stories. Treat round.name as the primary control variable — do not mix structures." },
          ].map(({ h, b }) => (
            <div key={h} className="flex gap-3 text-[14px]">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              <div>
                <span className="font-medium text-[rgb(var(--text-primary))]">{h} — </span>
                <span className="text-[rgb(var(--text-secondary))]">{b}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Entitlements */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Entitlements</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Key / Framework</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Required for</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: "com.apple.developer.foundation-models.default",  req: "On-device LanguageModelSession (Foundation Models framework, iOS 26+)" },
                { key: "SubscriptionService — Pro entitlement",          req: "Gate the Generate button behind active Pro subscription" },
              ].map(row => (
                <tr key={row.key} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-primary))]">{row.key}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.req}</td>
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
            "The content area must use aria-live='polite' (web) or post an accessibility announcement when streaming completes — not on every token, which would flood the accessibility queue.",
            "The blinking cursor ▌ must be aria-hidden so screen readers do not narrate it character-by-character during streaming.",
            "The round selector tabs require role='tab' and aria-selected; the containing element requires role='tablist'.",
            "The loading spinner must have an accessible label: 'Generating prep guide' — do not rely on the visible text alone, which may still show the previous state.",
            "Minimum tap target for round tabs: 44×44 pt. Use padding to meet this without visually enlarging the text.",
          ].map(item => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
