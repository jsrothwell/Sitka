import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";

export const metadata: Metadata = { title: "Writing" };

function Pair({ good, bad, note }: { good: string; bad: string; note?: string }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg p-3.5 border" style={{ borderColor: "rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.04)" }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgb(220,38,38)" }}>✗ Avoid</p>
        <p className="text-[13px] text-[rgb(var(--text-primary))]">{bad}</p>
      </div>
      <div className="rounded-lg p-3.5 border" style={{ borderColor: "rgba(52,168,101,0.3)", background: "rgba(52,168,101,0.04)" }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgb(33,150,83)" }}>✓ Use</p>
        <p className="text-[13px] text-[rgb(var(--text-primary))]">{good}</p>
      </div>
      {note && (
        <p className="col-span-2 text-[11px] text-[rgb(var(--text-tertiary))] leading-relaxed">{note}</p>
      )}
    </div>
  );
}

export default function WritingPage() {
  return (
    <div>
      <PageHeader
        title="Writing"
        description="Clear, consistent writing is part of the design. These guidelines cover voice, capitalization, error messages, empty states, and the microcopy patterns used across Sitka products."
      />

      {/* Voice and tone */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Voice &amp; Tone</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Sitka speaks like a knowledgeable colleague: direct, calm, and precise. Not chatty. Not corporate. Never apologetic when something goes wrong — just clear about what happened and what to do next.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { trait: "Direct", desc: "Say what you mean in as few words as possible. Omit filler phrases like \"Please note that\" or \"It looks like\"." },
            { trait: "Calm", desc: "Errors happen. Describe them factually. Avoid exclamation marks except in genuine moments of celebration." },
            { trait: "Precise", desc: "Name the thing. Don't say \"the item\" when you can say \"the project\" or \"the file\"." },
          ].map(({ trait, desc }) => (
            <div key={trait} className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
              <h3 className="text-[13px] font-semibold mb-1.5" style={{ color: "var(--nav-active-color)" }}>{trait}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capitalization */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Capitalisation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed">
          Use sentence case everywhere except navigation labels and proper nouns.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-6">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Context", "Rule", "Example"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { ctx: "Page titles", rule: "Sentence case", ex: "Design principles" },
                { ctx: "Navigation labels", rule: "Title Case", ex: "Getting Started" },
                { ctx: "Buttons", rule: "Sentence case", ex: "Save changes" },
                { ctx: "Error messages", rule: "Sentence case", ex: "File size exceeds 10 MB" },
                { ctx: "Tooltips", rule: "Sentence case", ex: "Open in new tab" },
                { ctx: "Product names", rule: "Always capitalised", ex: "Sitka, SwiftUI, Figma" },
              ].map((row, i) => (
                <tr key={row.ctx} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.ctx}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.rule}</td>
                  <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--nav-active-color)" }}>{row.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Button labels</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Buttons are actions. Label them with a verb that describes what happens when you press them — not the state of the thing they affect.
        </p>
        <div className="flex flex-col gap-4">
          <Pair good="Save changes" bad="Changes" note="Lead with the verb. The noun can follow if it adds clarity." />
          <Pair good="Delete project" bad="OK" note="Generic confirmations are dangerous. Always name what will be deleted." />
          <Pair good="Send message" bad="Submit" note={'"Submit" is a form concept. Name the real-world action.'} />
          <Pair good="Try again" bad="Retry" note="Natural language over technical vocabulary." />
        </div>
      </section>

      {/* Errors */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Error messages</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-2 leading-relaxed">
          Every error message should answer three questions: what happened, why it happened, and what the user can do next. If you can only answer one, answer what to do next.
        </p>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Never blame the user. Never use technical jargon. Never leave the user with no path forward.
        </p>
        <div className="flex flex-col gap-4">
          <Pair
            good="Your session expired. Sign in again to continue."
            bad="Error 401: Unauthorized"
            note="Translate HTTP status codes into plain language with a recovery action."
          />
          <Pair
            good="We couldn't save your changes. Check your connection and try again."
            bad="Something went wrong."
            note={'"Something went wrong" communicates nothing. Name what failed.'}
          />
          <Pair
            good="Password must be at least 8 characters."
            bad="Invalid password."
            note="Validation errors must explain the rule, not just flag the failure."
          />
          <Pair
            good="File too large. Upload a file smaller than 10 MB."
            bad="Upload failed."
            note="Include the constraint. The user needs to know what to change."
          />
        </div>
      </section>

      {/* Empty states */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Empty states</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          An empty state is an opportunity to orient the user, not just fill a gap. Explain what would normally be here and what to do to get there.
        </p>
        <div className="flex flex-col gap-4">
          <Pair
            good="No projects yet. Create your first project to start collaborating."
            bad="No items found."
            note="Name the content type. Give them a next step."
          />
          <Pair
            good={'No results for "darkmode". Try a different spelling or browse all foundations.'}
            bad="No search results."
            note="Repeat the query back. Offer an alternative path."
          />
        </div>
      </section>

      {/* Microcopy patterns */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Microcopy patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              pattern: "Placeholder text",
              rule: "Placeholders disappear when typing begins and must not carry essential information. Use them for format hints only.",
              eg: "e.g. search@company.com — not \"Enter your email address\"",
            },
            {
              pattern: "Tooltip text",
              rule: "One sentence maximum. Tooltips supplement — they don't replace — visible labels. Don't put information here that a user needs to complete a task.",
              eg: "\"Export as CSV\" not \"Click this button to download your data as a comma-separated values file.\"",
            },
            {
              pattern: "Loading states",
              rule: "Name what's loading where possible. A generic \"Loading…\" is acceptable only when what's loading is obvious from context.",
              eg: "\"Loading projects…\" — not just \"Loading…\"",
            },
            {
              pattern: "Destructive confirmations",
              rule: "Use a confirmation dialog with a red CTA that names the exact action. Never make the default the destructive option.",
              eg: "\"Delete project\" (red) + \"Cancel\" (secondary) — the heading says what will happen, not \"Are you sure?\"",
            },
          ].map(({ pattern, rule, eg }) => (
            <div key={pattern} className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-2">{pattern}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed mb-2">{rule}</p>
              <p className="text-[11px] font-mono text-[rgb(var(--text-tertiary))] bg-[rgb(var(--surface-raised))] px-2.5 py-1.5 rounded-lg">{eg}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Numbers and units */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Numbers, dates &amp; units</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Rule", "Avoid", "Use"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { rule: "Spell out numbers one to nine", avoid: "3 items selected", use: "Three items selected" },
                { rule: "Use numerals at 10+", avoid: "Twelve results", use: "12 results" },
                { rule: "Abbreviate large numbers", avoid: "1,000,000 users", use: "1M users" },
                { rule: "Dates: day Month year", avoid: "01/03/2025", use: "1 March 2025" },
                { rule: "Relative time for recency", avoid: "Updated 2025-05-01", use: "Updated 4 days ago" },
                { rule: "Always include the unit", avoid: "Timeout: 30", use: "Timeout: 30 seconds" },
              ].map((row, i) => (
                <tr key={row.rule} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.rule}</td>
                  <td className="px-4 py-3 line-through text-[rgb(var(--text-tertiary))]">{row.avoid}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--nav-active-color)" }}>{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
