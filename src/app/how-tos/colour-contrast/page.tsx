import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "How to ensure colour is accessible" };

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

export default function ColourContrastPage() {
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
        title="How to ensure colour is accessible"
        description="Check that every colour pairing in your designs meets WCAG 2.1 AA. This guide covers the approved Sitka pairings, how to test custom colours, and what to do when a pairing fails."
      />

      <div className="mb-8 p-5 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">Objective</p>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
          By the end of this guide you will know how to validate any colour pairing against WCAG 2.1 AA, use the pre-approved Sitka token pairings, and fix the most common contrast failures.
        </p>
      </div>

      <div>
        <Step n={1} title="Understand the two WCAG thresholds you need to meet">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            WCAG 2.1 defines two thresholds. Sitka requires AA for all text and interactive elements.
          </p>
          <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                  {["Level", "Minimum ratio", "Applies to"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { level: "AA", ratio: "4.5:1", applies: "Normal text (body copy, labels, captions)" },
                  { level: "AA Large", ratio: "3:1", applies: "Large text (≥18pt or ≥14pt bold) and UI components" },
                ].map((row, i) => (
                  <tr key={row.level} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-[rgba(52,168,101,0.1)] text-[rgb(33,150,83)]">{row.level}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[12px] text-[rgb(var(--text-primary))]">{row.ratio}</td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.applies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Step>

        <Step n={2} title="Check whether your pairing is already in the approved list">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-3">
            The Sitka token pairings have been pre-validated. If you're using only these combinations, you're already compliant — skip to step 5.
          </p>
          <div className="flex flex-col gap-2 mb-3">
            {[
              { fg: "--text-primary", bg: "--background (dark)", ratio: "17.8:1" },
              { fg: "--text-secondary", bg: "--background (dark)", ratio: "6.1:1" },
              { fg: "--nav-active-color", bg: "--background (dark)", ratio: "5.4:1" },
              { fg: "--text-primary", bg: "--surface (light)", ratio: "15.3:1" },
              { fg: "--text-secondary", bg: "--surface (light)", ratio: "4.7:1" },
            ].map(({ fg, bg, ratio }) => (
              <div key={fg + bg} className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                <code className="text-[11px] font-mono flex-1" style={{ color: "var(--nav-active-color)" }}>{fg}</code>
                <span className="text-[11px] text-[rgb(var(--text-tertiary))]">on</span>
                <code className="text-[11px] font-mono flex-1 text-[rgb(var(--text-secondary))]">{bg}</code>
                <span className="text-[11px] font-semibold text-[rgb(var(--text-primary))]">{ratio}</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "rgba(52,168,101,0.1)", color: "rgb(33,150,83)" }}>AA</span>
              </div>
            ))}
          </div>
          <CallOut type="info">
            The full list is on the <Link href="/foundations/contrast" className="underline">Contrast foundations</Link> page.
          </CallOut>
        </Step>

        <Step n={3} title="For custom pairings, calculate the ratio">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-3">
            When you need a colour combination not in the approved list, calculate the contrast ratio before using it.
          </p>
          <ol className="flex flex-col gap-2 text-[13px] text-[rgb(var(--text-secondary))]">
            {[
              "In Figma: use the Stark plugin → Contrast Checker. Select the text and background layers.",
              "In the browser: open Polypane or use Chrome DevTools (Inspect → Accessibility → Contrast Ratio).",
              "Standalone: use WebAIM Contrast Checker at webaim.org/resources/contrastchecker.",
              "Record the ratio and confirm it meets 4.5:1 (normal text) or 3:1 (large text / UI components).",
            ].map((step, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="shrink-0 font-semibold" style={{ color: "var(--nav-active-color)" }}>{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </Step>

        <Step n={4} title="Fix pairings that fail">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-3">
            When a pairing fails, adjust the foreground colour first — backgrounds affect the whole composition.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            {[
              { strategy: "Darken the foreground (light mode)", detail: "Move the text colour towards the dark end of the neutral scale. A step of 20–30 lightness points is usually enough." },
              { strategy: "Lighten the foreground (dark mode)", detail: "In dark mode, text that's too dark (e.g. --text-tertiary) fails against dark surfaces. Increase lightness or use --text-secondary instead." },
              { strategy: "Increase font weight", detail: "Bold and large text qualifies for the AA Large threshold (3:1 instead of 4.5:1). Increasing weight from 400 to 600 can turn a fail into a pass — but don't use this as an excuse for low contrast." },
              { strategy: "Change the background", detail: "If the text is inside a card on a dark surface, consider using --surface-raised rather than --background. A lighter canvas gives more headroom." },
            ].map(({ strategy, detail }) => (
              <div key={strategy} className="p-3.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                <p className="text-[12px] font-semibold text-[rgb(var(--text-primary))] mb-1.5">{strategy}</p>
                <p className="text-[11px] text-[rgb(var(--text-secondary))] leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          <CallOut type="warning">
            Don't sacrifice readability for brand colour. If the brand colour doesn't pass at a given size, either use a darker tint or increase the font size and weight.
          </CallOut>
        </Step>

        <Step n={5} title="Add contrast checks to your CI pipeline" last>
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-3">
            Manual checking doesn't scale. Add axe or Lighthouse to your CI so new colour violations are caught before they reach production.
          </p>
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-4 font-mono text-[12px] text-[rgb(var(--text-secondary))] mb-3">
            <p className="text-[rgb(var(--text-tertiary))] mb-1"># Install axe-core in your test suite</p>
            <p>npm install --save-dev @axe-core/playwright</p>
            <p className="text-[rgb(var(--text-tertiary))] mt-3 mb-1"># In your Playwright test</p>
            <p>{"const results = await new AxeBuilder({ page }).analyze();"}</p>
            <p>{"expect(results.violations).toHaveLength(0);"}</p>
          </div>
        </Step>
      </div>

      {/* Related */}
      <div className="mt-8 pt-8 border-t border-[rgb(var(--border))]">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Related</p>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/foundations/contrast", label: "Contrast" },
            { href: "/foundations/color", label: "Color" },
            { href: "/how-tos/dark-mode", label: "How to design for dark mode" },
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
