import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "AI Agent Standards" };

const PRINCIPLES = [
  {
    number: "1.",
    title: "Concise by Default",
    body: "Respond with the minimum text needed to convey the answer. Use bullet points, single sentences, or code blocks. Every word must earn its place in the interface.",
  },
  {
    number: "2.",
    title: "Action-Oriented Language",
    body: "Prefer verbs over nouns. Instead of 'The settings can be found in...' say 'Go to Settings → Account.' Guide users toward the next step, not just information.",
  },
  {
    number: "3.",
    title: "Context-Aware Tone",
    body: "Match the formality to the product. A developer tool uses direct technical language. A consumer app uses friendly, approachable phrasing. Never default to corporate speak.",
  },
  {
    number: "4.",
    title: "Consistent Identity",
    body: "If the agent has a name or personality established, maintain it across all interactions. Inconsistent tone fragments trust and makes the agent feel unreliable.",
  },
  {
    number: "5.",
    title: "Transparent Process",
    body: "Show thinking steps for complex tasks. 'Searching 3 files...' builds trust. 'Here's what I found' explains the work done. Hidden effort feels like magic, not competence.",
  },
  {
    number: "6.",
    title: "Graceful Error Handling",
    body: "When uncertain, say so clearly. Offer alternatives or ask clarifying questions. Never guess when precision matters — acknowledge the gap and bridge it.",
  },
];

const INTERACTION_PATTERNS = [
  {
    name: "Loading States",
    scenarios: ["Processing request", "Searching knowledge", "Generating response"],
    example: "Searching documentation... 3 results found",
  },
  {
    name: "Clarification Prompts",
    scenarios: ["Ambiguous request", "Multiple interpretations", "Missing context"],
    example: "Did you mean create a new component or modify an existing one?",
  },
  {
    name: "Confirmation Flows",
    scenarios: ["Destructive actions", "Irreversible changes", "External commits"],
    example: "This will modify 5 files. Proceed?",
  },
];

const VISUAL_STANDARDS = [
  {
    category: "Response Structure",
    rules: [
      "Lead with the answer, then explain if needed",
      "Use markdown headers sparingly (h3 maximum in chat)",
      "Code blocks for multi-line content, inline for single values",
      "Max 3 levels of bullet indentation",
    ],
  },
  {
    category: "Tone Markers",
    rules: [
      "Emojis for emotional clarity only (✅ ❌ ⚠️)",
      "Bold for emphasis, never italics",
      "Monospace for file names, paths, commands",
      "Italics for placeholder values like `your-api-key`",
    ],
  },
];

const COMPONENT_CATEGORIES = [
  {
    category: "Conversation",
    description: "Core chat interface components for AI interactions",
    components: [
      { name: "Chat Container", purpose: "Primary conversation surface with message threading" },
      { name: "Message Bubble", purpose: "User and AI messages with distinct styling" },
      { name: "Typing Indicator", purpose: "Visual feedback during AI response generation" },
      { name: "Quick Actions", purpose: "Suggested follow-up prompts below messages" },
    ],
  },
  {
    category: "Reasoning",
    description: "Components that expose AI thought processes",
    components: [
      { name: "Thought Chain", purpose: "Expandable reasoning steps before final answer" },
      { name: "Confidence Meter", purpose: "Visual indicator of response certainty" },
      { name: "Source Citations", purpose: "Referenced documents or data sources" },
    ],
  },
  {
    category: "Generation",
    description: "Components for AI-assisted content creation",
    components: [
      { name: "Smart Input", purpose: "Multimodal input with attachments and voice" },
      { name: "Diff Viewer", purpose: "Show changes proposed by AI" },
      { name: "Undo Stack", purpose: "Reversible AI modifications with history" },
    ],
  },
];

const BEHAVIOR_STATES = [
  {
    state: "Idle",
    description: "Ready to receive input. Show subtle accent ring or placeholder text.",
    visual: "border-[rgb(var(--border))] placeholder-[rgb(var(--text-tertiary))]",
  },
  {
    state: "Listening",
    description: "Capturing voice or preparing to process. Animate pulse on microphone.",
    visual: "ring-2 ring-[rgb(var(--accent))] ring-opacity-50",
  },
  {
    state: "Processing",
    description: "Analyzing input or querying knowledge. Show spinner or progress dots.",
    visual: "animate-pulse bg-[rgb(var(--surface-raised))]",
  },
  {
    state: "Streaming",
    description: "Generating response token by token. Reveal text progressively.",
    visual: "cursor-blink after:content-['|']",
  },
  {
    state: "Error",
    description: "Failed to process or understand. Use red-tinted surface with retry.",
    visual: "border-[rgb(var(--danger))] bg-[rgb(var(--danger-subtle))]",
  },
];

export default function AIAgentsPage() {
  return (
    <div>
      <PageHeader
        title="AI Agent Standards"
        description="Standards for AI agent interactions in Sitka-powered products. Covers verbal response patterns, visual presentation, interaction models, and component behaviors."
      />

      {/* ── Principles ───────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Verbal Principles
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Six principles guiding AI agent language and tone. These ensure responses
          feel appropriate to the product context and build user trust.
        </p>
        <div className="grid grid-cols-2 gap-5">
          {PRINCIPLES.map(({ number, title, body }) => (
            <div
              key={number}
              className="flex flex-col gap-2 rounded-[10px]"
              style={{ padding: "2rem 2.25rem", backgroundColor: "var(--card-tint-bg)" }}
            >
              <span
                className="font-semibold"
                style={{ fontSize: "1.0625rem", color: "var(--nav-active-color)" }}
              >
                {number}
              </span>
              <h3 className="text-[rgb(var(--text-primary))]" style={{ fontSize: "1.125rem" }}>
                {title}
              </h3>
              <p
                className="text-[rgb(var(--text-secondary))]"
                style={{ fontSize: "0.9375rem", lineHeight: 1.6, fontWeight: 500 }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interaction Patterns ──────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Interaction Patterns
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          Standard interaction flows for common agent scenarios. Use these to
          maintain consistency across different agent implementations.
        </p>
        <div className="flex flex-col gap-4">
          {INTERACTION_PATTERNS.map((pattern) => (
            <div
              key={pattern.name}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
                <h3 className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">
                  {pattern.name}
                </h3>
              </div>
              <div className="px-5 py-4">
                <ul className="flex flex-col gap-1 mb-3">
                  {pattern.scenarios.map((scenario) => (
                    <li
                      key={scenario}
                      className="text-[12px] text-[rgb(var(--text-secondary))]"
                    >
                      • {scenario}
                    </li>
                  ))}
                </ul>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                    Example
                  </span>
                  <code className="block mt-1.5 text-[11px] font-mono text-[rgb(var(--text-primary))] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] px-2 py-1 rounded">
                    {pattern.example}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Visual Standards ───────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Visual Standards
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          Formatting and presentation rules for agent responses in chat
          interfaces. Maintains visual consistency while preserving readability.
        </p>
        <div className="grid grid-cols-2 gap-5">
          {VISUAL_STANDARDS.map((standard) => (
            <div
              key={standard.category}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5"
            >
              <h3 className="text-[14px] font-semibold text-[rgb(var(--text-primary))] mb-3">
                {standard.category}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {standard.rules.map((rule) => (
                  <li
                    key={rule}
                    className="text-[12px] text-[rgb(var(--text-secondary))]"
                  >
                    • {rule}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI Components ──────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          AI Component Categories
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          Components organized by purpose. Each category serves a distinct role in
          the AI interaction lifecycle from input to output.
        </p>
        <div className="flex flex-col gap-6">
          {COMPONENT_CATEGORIES.map((category) => (
            <div
              key={category.category}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5"
            >
              <div className="mb-3">
                <h3 className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">
                  {category.category}
                </h3>
                <p className="text-[12px] text-[rgb(var(--text-secondary))] mt-1">
                  {category.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {category.components.map((component) => (
                  <div
                    key={component.name}
                    className="rounded-lg border border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))] p-3"
                  >
                    <div className="text-[12px] font-semibold text-[rgb(var(--text-primary))]">
                      {component.name}
                    </div>
                    <div className="text-[11px] text-[rgb(var(--text-secondary))] mt-1">
                      {component.purpose}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Behavior States ────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Component States
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          Visual states for AI-driven components. Each state communicates the
          current status of the AI interaction lifecycle.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BEHAVIOR_STATES.map((state) => (
            <div
              key={state.state}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4"
            >
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1.5">
                {state.state}
              </h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed mb-2">
                {state.description}
              </p>
              <code className="text-[10px] font-mono text-[rgb(var(--accent))] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] px-2 py-0.5 rounded">
                {state.visual}
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}