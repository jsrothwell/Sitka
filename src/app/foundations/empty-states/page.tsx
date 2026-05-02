import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { EmptyStatesDemo } from "@/components/docs/EmptyStatesDemo";

export const metadata: Metadata = { title: "Empty States" };

const EMPTY_STATE_TYPES = [
  {
    name: "No Results",
    situation: "Search returns empty or no matching content exists",
    guidance: "Suggest alternative queries, show popular topics, or offer to start fresh",
    example: "No files match your query. Try 'Show me all components' or upload a file to search.",
  },
  {
    name: "First Interaction",
    situation: "User has not yet engaged with the product",
    guidance: "Focus on core value proposition with clear primary action",
    example: "Upload your first document to get started. Supports PDF, DOCX, and TXT files.",
  },
  {
    name: "No Access",
    situation: "User lacks permission to view or perform an action",
    guidance: "Explain the limitation clearly and provide upgrade or contact paths",
    example: "Upgrade to Pro to access advanced analytics. [View Plans] or [Contact Sales].",
  },
  {
    name: "Disconnected",
    situation: "Network or service unavailable",
    guidance: "Show retry option with estimated time or offline capability notice",
    example: "Connection lost. Retrying in 3s… Use offline mode for previously loaded content.",
  },
  {
    name: "Empty Collection",
    situation: "List or library has no items yet",
    guidance: "Show creation flow or explain what belongs here",
    example: "No bookmarks yet. Save important pages by clicking the bookmark icon.",
  },
  {
    name: "Deleted Content",
    situation: "Content was removed or belongs to deleted account",
    guidance: "Acknowledge deletion and suggest alternatives",
    example: "This project was deleted. [View other projects] or [Restore from trash].",
  },
];

const VISUAL_PRINCIPLES = [
  {
    principle: "Illustration Override",
    rule: "Use subtle duotone illustrations, never full color photography",
    tokens: "--surface, --border, --accent-subtle",
  },
  {
    principle: "Text Hierarchy",
    rule: "Primary text sets context, secondary text provides next step",
    tokens: "--text-primary, --text-secondary",
  },
  {
    principle: "Action Placement",
    rule: "Primary action aligned left, secondary right in button group",
    tokens: "--accent, --surface-raised",
  },
];

export default function EmptyStatesPage() {
  return (
    <div>
      <PageHeader
        title="Empty States"
        description="Patterns for when interfaces have no content to display. Each state should guide users toward productive next steps."
      />

      {/* Visual examples */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Empty State Types
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          Six common scenarios requiring explicit empty state handling.
        </p>
        <ComponentPreview>
          <EmptyStatesDemo />
        </ComponentPreview>
      </section>

      {/* Reference table */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EMPTY_STATE_TYPES.map((state) => (
            <div
              key={state.name}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5"
            >
              <h3 className="text-[14px] font-semibold text-[rgb(var(--text-primary))] mb-2">
                {state.name}
              </h3>
              <div className="mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                  Situation
                </span>
                <p className="text-[12px] text-[rgb(var(--text-secondary))] mt-1">
                  {state.situation}
                </p>
              </div>
              <div className="mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                  Guidance
                </span>
                <p className="text-[12px] text-[rgb(var(--text-secondary))] mt-1">
                  {state.guidance}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                  Example
                </span>
                <code className="block mt-1 text-[11px] font-mono text-[rgb(var(--text-primary))] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] px-2 py-1 rounded">
                  {state.example}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Visual Principles
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          Design rules ensuring empty states remain consistent and helpful.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {VISUAL_PRINCIPLES.map((vp) => (
            <div
              key={vp.principle}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4"
            >
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1.5">
                {vp.principle}
              </h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed mb-2">
                {vp.rule}
              </p>
              <code className="text-[10px] font-mono text-[rgb(var(--accent))] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] px-2 py-0.5 rounded">
                {vp.tokens}
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
