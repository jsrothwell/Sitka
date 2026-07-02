import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "How to write clear interface copy" };

function Step({ n, title, children, last }: { n: number; title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center shrink-0">
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
          style={{ background: "rgba(52,168,101,0.12)", color: "var(--nav-active-color)" }}
        >
          {n}
        </span>
        {!last && <div className="w-px flex-1 mt-2" style={{ background: "rgb(var(--border))" }} />}
      </div>
      <div className={`${last ? "pb-0" : "pb-10"} flex-1 min-w-0`}>
        <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-3">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function BeforeAfter({ before, after, note }: { before: string; after: string; note?: string }) {
  return (
    <div className="flex flex-col gap-2 mb-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg p-3.5 border" style={{ borderColor: "rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.04)" }}>
          <p className="text-[9px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgb(220,38,38)" }}>Before</p>
          <p className="text-[13px] text-[rgb(var(--text-primary))]">{before}</p>
        </div>
        <div className="rounded-lg p-3.5 border" style={{ borderColor: "rgba(52,168,101,0.3)", background: "rgba(52,168,101,0.04)" }}>
          <p className="text-[9px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgb(33,150,83)" }}>After</p>
          <p className="text-[13px] text-[rgb(var(--text-primary))]">{after}</p>
        </div>
      </div>
      {note && <p className="text-[11px] text-[rgb(var(--text-tertiary))] leading-relaxed">{note}</p>}
    </div>
  );
}

export default function WriteForInterfacesPage() {
  return (
    <div>
      <Link
        href="/how-tos"
        className="inline-flex items-center gap-1.5 text-[12px] text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] mb-8 transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        How-tos
      </Link>

      <PageHeader
        title="How to write clear interface copy"
        description="Apply the Sitka writing guidelines to the four highest-impact areas: button labels, error messages, empty states, and tooltips."
      />

      <div className="mb-8 p-5 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">Objective</p>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
          By the end of this guide you will be able to audit and rewrite the four most common sources of unclear UI copy in a Sitka product, following the voice and tone guidelines.
        </p>
      </div>

      <div>
        <Step n={1} title="Audit for filler phrases and passive voice">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            Start by scanning the interface for these patterns. Each one is a signal that the copy can be tightened.
          </p>
          <div className="flex flex-col gap-2 mb-4">
            {[
              { phrase: "\"Please note that…\"", fix: "Delete it. The user is already reading." },
              { phrase: "\"It looks like…\"", fix: "State the condition directly." },
              { phrase: "\"We're sorry, but…\"", fix: "Don't apologise. Describe and recover." },
              { phrase: "\"This action cannot be undone.\"", fix: "\"Deleting [name] is permanent.\"" },
              { phrase: "\"Are you sure?\"", fix: "Name the consequence in the dialog title." },
            ].map(({ phrase, fix }) => (
              <div key={phrase} className="flex items-start gap-3 rounded-lg px-3.5 py-2.5 border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                <code className="text-[12px] font-mono shrink-0" style={{ color: "rgb(220,38,38)" }}>{phrase}</code>
                <span className="text-[12px] text-[rgb(var(--text-tertiary))]">→</span>
                <span className="text-[12px] text-[rgb(var(--text-secondary))]">{fix}</span>
              </div>
            ))}
          </div>
        </Step>

        <Step n={2} title="Rewrite button labels">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            Every button label should be a verb-first phrase that names the real-world action. Generic labels like "OK", "Submit", and "Yes" are almost always wrong.
          </p>
          <div className="flex flex-col gap-3">
            <BeforeAfter before="Submit" after="Save changes" note="Name the action, not the mechanism." />
            <BeforeAfter before="OK" after="Delete project" note="Especially in confirmation dialogs — name exactly what will happen." />
            <BeforeAfter before="Yes" after="Sign out" note="'Yes' on its own is meaningless. What are they agreeing to?" />
            <BeforeAfter before="Process" after="Send payment" note="Use natural language over technical process vocabulary." />
          </div>
        </Step>

        <Step n={3} title="Rewrite error messages">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            A good error message answers three questions: what happened, why it happened, and what to do next. If you can only answer one, answer "what to do next."
          </p>
          <div className="flex flex-col gap-3">
            <BeforeAfter
              before="Something went wrong."
              after="We couldn't save your changes. Check your connection and try again."
              note="Name what failed and give a recovery action."
            />
            <BeforeAfter
              before="Error 401: Unauthorized"
              after="Your session expired. Sign in again to continue."
              note="Translate HTTP codes into plain language."
            />
            <BeforeAfter
              before="Invalid input."
              after="Password must be at least 8 characters."
              note="Name the constraint, not just the failure."
            />
            <BeforeAfter
              before="Upload failed."
              after="File too large. Upload a file smaller than 10 MB."
              note="Include the limit so the user knows what to change."
            />
          </div>
        </Step>

        <Step n={4} title="Rewrite empty states">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            Empty states have two jobs: explain what would normally be here, and give the user a clear next step.
          </p>
          <div className="flex flex-col gap-3">
            <BeforeAfter
              before="No items found."
              after="No projects yet. Create your first project to start collaborating."
              note="Name the content type. Give them a next step."
            />
            <BeforeAfter
              before="Nothing here."
              after={'No results for "darkmode". Try a different spelling or browse all foundations.'}
              note="Repeat the query. Offer an alternative."
            />
          </div>
        </Step>

        <Step n={5} title="Write tooltips and helper text" last>
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            Tooltips should be one sentence maximum. They supplement a visible label — they never replace it. Helper text below a field is for constraints (format, limits), not instructions.
          </p>
          <div className="flex flex-col gap-3">
            <BeforeAfter
              before="Click this button to download your data as a comma-separated values file that you can open in Excel."
              after="Export as CSV"
              note="Tooltips are one line. The label already says most of it."
            />
            <BeforeAfter
              before="Please enter a valid email address in the format user@example.com"
              after="e.g. name@company.com"
              note="Placeholder text shows format. Don't use it for instructions — it disappears on focus."
            />
          </div>
        </Step>
      </div>

      {/* Related */}
      <div className="mt-8 pt-8 border-t border-[rgb(var(--border))]">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Related</p>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/foundations/writing", label: "Writing guidelines" },
            { href: "/foundations/empty-states", label: "Empty states" },
            { href: "/patterns/form", label: "Form patterns" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--accent-muted))] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
