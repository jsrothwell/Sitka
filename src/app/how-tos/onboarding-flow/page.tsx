import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "How to design an onboarding flow" };

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

function CallOut({ type, children }: { type: "info" | "warning"; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4 my-4"
      style={{
        background: type === "info" ? "rgba(52,168,101,0.07)" : "rgba(245,158,11,0.07)",
        border: `1px solid ${type === "info" ? "rgba(52,168,101,0.25)" : "rgba(245,158,11,0.25)"}`,
      }}
    >
      <p className="text-[12px] leading-relaxed" style={{ color: type === "info" ? "rgb(33,150,83)" : "rgb(180,120,0)" }}>
        {children}
      </p>
    </div>
  );
}

export default function OnboardingFlowPage() {
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
        title="How to design an onboarding flow"
        description="Structure a wizard, decide what to ask upfront versus what to defer, write clear step copy, and give users a satisfying completion moment — all using the Sitka onboarding pattern."
      />

      <div className="mb-8 p-5 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">Objective</p>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
          By the end of this guide you will be able to design a focused onboarding wizard that collects only what is necessary, gives users clear orientation at every step, and ends with a completion moment that sets up the first session.
        </p>
      </div>

      <div>
        <Step n={1} title="Decide what belongs in onboarding">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            Onboarding has a single job: get the user to their first moment of value as quickly as possible. Every question or step you add delays that moment. Before building a step, ask: can we get this information after the user is already in the product?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {[
              {
                label: "Ask in onboarding",
                items: [
                  "Information without which the product cannot function (account credentials, locale, required legal consent)",
                  "Personalisation that changes what the user sees on their very first session",
                ],
                tone: "green" as const,
              },
              {
                label: "Defer to settings",
                items: [
                  "Preferences that have a sensible default (notification frequency, colour theme)",
                  "Information that can be inferred or populated progressively (team size, billing details)",
                ],
                tone: "amber" as const,
              },
            ].map(({ label, items, tone }) => (
              <div
                key={label}
                className="p-3.5 rounded-xl border"
                style={{
                  borderColor: tone === "green" ? "rgba(52,168,101,0.3)" : "rgba(245,158,11,0.3)",
                  background: tone === "green" ? "rgba(52,168,101,0.04)" : "rgba(245,158,11,0.04)",
                }}
              >
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: tone === "green" ? "rgb(33,150,83)" : "rgb(180,120,0)" }}
                >
                  {label}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2 text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">
                      <span className="shrink-0 mt-0.5" style={{ color: tone === "green" ? "rgb(33,150,83)" : "rgb(180,120,0)" }}>
                        {tone === "green" ? "✓" : "→"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <CallOut type="info">
            Aim for three steps or fewer. Research consistently shows completion rates fall sharply after step four. If you have five or more steps, look for fields to remove entirely.
          </CallOut>
        </Step>

        <Step n={2} title="Structure each step clearly">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            Every step in the wizard needs the same four elements. Skipping any one of them increases drop-off.
          </p>
          <div className="flex flex-col gap-2 mb-4">
            {[
              {
                element: "Step indicator",
                desc: "Show position and total (e.g. \"Step 2 of 3\") using the Sitka StepIndicator pattern. Never hide how many steps remain.",
              },
              {
                element: "Step title",
                desc: "One short, verb-first phrase that names the task — not the product feature. \"Choose your plan\" not \"Plan selection\".",
              },
              {
                element: "Helper text",
                desc: "One sentence below the title that explains why this step matters. If you can't explain it, consider removing the step.",
              },
              {
                element: "Primary action",
                desc: "A single, specific CTA: \"Continue\", \"Create workspace\", \"Send invite\". Not \"Next\" — name the action.",
              },
            ].map(({ element, desc }) => (
              <div key={element} className="flex items-start gap-3 rounded-lg px-3.5 py-3 border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                <span className="text-[12px] font-semibold shrink-0 w-28 text-[rgb(var(--text-primary))]">{element}</span>
                <span className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{desc}</span>
              </div>
            ))}
          </div>
        </Step>

        <Step n={3} title="Write the step copy">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            Onboarding copy has to earn its place at every line. Users are impatient and task-focused here more than anywhere else in the product.
          </p>
          <div className="flex flex-col gap-3 mb-4">
            {[
              {
                before: "Tell us a bit about yourself so we can personalise your experience",
                after: "What's your role?",
                note: "Remove all preamble. Get to the question.",
              },
              {
                before: "Almost there! Just a few more details and you'll be ready to go.",
                after: "Set your notification preferences",
                note: "Motivational filler wastes time. Name the task.",
              },
              {
                before: "By clicking Continue you agree to our Terms of Service and Privacy Policy",
                after: "I agree to the Terms of Service and Privacy Policy",
                note: "Make the user the subject of the consent, not the button.",
              },
              {
                before: "Next",
                after: "Create workspace",
                note: "Name what happens when the user taps Continue.",
              },
            ].map(({ before, after, note }) => (
              <div key={before} className="flex flex-col gap-2">
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
                <p className="text-[11px] text-[rgb(var(--text-tertiary))] leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </Step>

        <Step n={4} title="Handle skipping and going back">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            Users need to feel in control. Both a back affordance and an optional skip should be present whenever they are valid actions.
          </p>
          <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-4">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                  {["Action", "Placement", "When to show"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { action: "Back", placement: "Top-left or inline secondary button", when: "Always, from step 2 onwards. Never disable it." },
                  { action: "Skip", placement: "Text link, below primary CTA", when: "Only on optional steps. Don't show it on required steps — it implies required steps are also skippable." },
                  { action: "Exit / Save & exit", placement: "Top-right or overflow menu", when: "Long or complex flows where the user may need to pause and return." },
                ].map((row, i) => (
                  <tr key={row.action} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                    <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))]">{row.action}</td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.placement}</td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CallOut type="warning">
            Never block the Back button to prevent users from changing their answers. If a previous step's answer affects later steps, update the later steps to reflect the change — don't trap the user.
          </CallOut>
        </Step>

        <Step n={5} title="Design the completion moment" last>
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            The final screen is a transition, not a dead end. It should confirm success, set expectations for what comes next, and move the user into the product with clear first-session guidance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {[
              {
                label: "Confirm success",
                desc: "Use a clear visual signal (checkmark, illustration) and a short headline that names what was created. \"Your workspace is ready.\" not \"Onboarding complete.\"",
              },
              {
                label: "Set next-session expectations",
                desc: "One sentence about what happens next: \"You'll get an email when your team accepts your invite.\" This prevents users from returning confused.",
              },
              {
                label: "Bridge to first action",
                desc: "The CTA should be the most valuable first action in the product, not the dashboard. \"Invite your team\", \"Create your first project\", \"Connect your data source\".",
              },
            ].map(({ label, desc }) => (
              <div key={label} className="p-3.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                <p className="text-[12px] font-semibold text-[rgb(var(--text-primary))] mb-1.5">{label}</p>
                <p className="text-[11px] text-[rgb(var(--text-secondary))] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <CallOut type="info">
            See the <Link href="/patterns/onboarding" className="underline">Onboarding pattern</Link> for the interactive reference implementation, including the StepIndicator component and completion screen layout.
          </CallOut>
        </Step>
      </div>

      {/* Related */}
      <div className="mt-8 pt-8 border-t border-[rgb(var(--border))]">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Related</p>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/patterns/onboarding", label: "Onboarding pattern" },
            { href: "/patterns/form", label: "Form patterns" },
            { href: "/how-tos/write-for-interfaces", label: "How to write clear interface copy" },
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
