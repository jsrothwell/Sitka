import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";

export const metadata: Metadata = { title: "Accessibility" };

const STANDARDS = [
  {
    title: "Perceivable",
    description: "Information and user interface components must be presentable to users in ways they can perceive.",
    items: [
      {
        subtitle: "Contrast Ratio",
        text: "Every text and interactive element in Sitka is designed to meet WCAG 2.2 AA as a minimum. Primary reading text targets AAA (7:1) where possible.",
        link: "/foundations/contrast"
      },
      {
        subtitle: "Non-Text Content",
        text: "Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language."
      },
      {
        subtitle: "Visual Hierarchy",
        text: "Use layout, typography, and color to create a clear visual hierarchy that guides the user through the interface."
      }
    ]
  },
  {
    title: "Operable",
    description: "User interface components and navigation must be operable.",
    items: [
      {
        subtitle: "Keyboard Accessibility",
        text: "All functionality must be available from a keyboard. Sitka components use standard focus indicators and logical tab orders.",
        link: "/foundations/keyboard-shortcuts"
      },
      {
        subtitle: "Focus States",
        text: "Interactive elements must have a visible focus state. Sitka uses a high-contrast accent ring for all focused elements."
      },
      {
        subtitle: "Navigable",
        text: "Provide ways to help users navigate, find content, and determine where they are. This includes breadcrumbs, clear headings, and skip links."
      }
    ]
  },
  {
    title: "Understandable",
    description: "Information and the operation of the user interface must be understandable.",
    items: [
      {
        subtitle: "Predictable",
        text: "Make Web pages appear and operate in predictable ways. Navigation should be consistent across the system."
      },
      {
        subtitle: "Input Assistance",
        text: "Help users avoid and correct mistakes. Use clear error messages and inline validation.",
        link: "/forms/validation"
      },
      {
        subtitle: "Readability",
        text: "Ensure text is readable and understandable. Use clear typography and avoid overly complex language.",
        link: "/foundations/writing"
      }
    ]
  },
  {
    title: "Robust",
    description: "Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.",
    items: [
      {
        subtitle: "Semantic HTML",
        text: "Use semantic HTML elements (like <nav>, <main>, <article>, <button>) to provide meaning to assistive technologies."
      },
      {
        subtitle: "ARIA Roles & Attributes",
        text: "Use ARIA (Accessible Rich Internet Applications) attributes where semantic HTML is not sufficient to describe complex components."
      }
    ]
  }
];

const WCAG22 = [
  {
    sc: "2.4.11 Focus Not Obscured (Minimum)",
    level: "AA",
    rule: "A focused element is never completely hidden by sticky headers, toasts, bottom sheets or cookie bars.",
    sitka: "The site sets scroll-padding-top to the header height. Toasts sit in a corner and never over the focused control; bottom sheets move focus into themselves.",
  },
  {
    sc: "2.5.7 Dragging Movements",
    level: "AA",
    rule: "Anything done by dragging can also be done with single taps or clicks.",
    sitka: "Kanban, Drag & Drop, Image Crop and Slider must offer a non-drag path: a Move menu, arrow buttons or a number field.",
  },
  {
    sc: "2.5.8 Target Size (Minimum)",
    level: "AA",
    rule: "Pointer targets are at least 24×24 CSS px, or have enough space around them.",
    sitka: "The smallest Button is 32px tall. Checkbox and Radio labels are part of the target, so the hit area is the whole row, not the 14px box.",
  },
  {
    sc: "3.2.6 Consistent Help",
    level: "A",
    rule: "Help links, contact details and chat appear in the same place on every page.",
    sitka: "Put help in the same slot of Settings or the navigation bar across an app; don't move it between screens.",
  },
  {
    sc: "3.3.7 Redundant Entry",
    level: "A",
    rule: "Don't ask for the same information twice in one process; prefill it or let people pick it.",
    sitka: "Wizard and Form patterns carry earlier answers forward, such as a \"same as shipping address\" option.",
  },
  {
    sc: "3.3.8 Accessible Authentication (Minimum)",
    level: "AA",
    rule: "Signing in never depends on remembering or transcribing something, unless paste and password managers work.",
    sitka: "OTP Input accepts paste and sets autocomplete=\"one-time-code\". Never block paste in password fields.",
  },
];

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Accessibility"
        description="Sitka is built with accessibility at its core. We adhere to WCAG 2.2 Level AA standards to ensure that our products are usable by everyone, regardless of ability."
      />

      <div className="space-y-12 mt-12">
        {STANDARDS.map((standard) => (
          <section key={standard.title} className="border-t border-[rgb(var(--border))] pt-12 first:border-0 first:pt-0">
            <h2 className="text-[24px] font-bold text-[rgb(var(--text-primary))] mb-2">{standard.title}</h2>
            <p className="text-[15px] text-[rgb(var(--text-secondary))] mb-8 leading-relaxed max-w-2xl">
              {standard.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {standard.items.map((item) => (
                <div key={item.subtitle} className="space-y-3">
                  <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))]">{item.subtitle}</h3>
                  <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
                    {item.text}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      className="inline-flex items-center text-[13px] font-medium text-[rgb(var(--accent-text))] hover:underline"
                    >
                      Learn more →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-20" aria-labelledby="wcag22">
        <h2 id="wcag22" className="text-[24px] font-bold text-[rgb(var(--text-primary))] mb-2">New in WCAG 2.2</h2>
        <p className="text-[15px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed max-w-2xl">
          WCAG 2.2 (October 2023) is Sitka&apos;s baseline. It adds six A and AA criteria to 2.1 and removes 4.1.1 Parsing. It is also the
          version EN 301 549 is moving to, which the European Accessibility Act relies on.
        </p>
        <div className="overflow-x-auto rounded-xl border border-[rgb(var(--border))]" tabIndex={0} role="region" aria-labelledby="wcag22">
          <table className="w-full min-w-[640px] text-left text-[13px]">
            <thead className="bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-secondary))]">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">Success criterion</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Rule</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">How Sitka meets it</th>
              </tr>
            </thead>
            <tbody>
              {WCAG22.map((row) => (
                <tr key={row.sc} className="border-t border-[rgb(var(--border))] align-top">
                  <th scope="row" className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))]">
                    {row.sc} <span className="ml-1 font-mono text-[11px] text-[rgb(var(--text-tertiary))]">{row.level}</span>
                  </th>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.rule}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.sitka}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[13px] text-[rgb(var(--text-tertiary))]">
          Sitka also supports <code className="font-mono">prefers-contrast: more</code>: secondary and tertiary text rise to 7:1 and borders to 3:1 on every surface.
        </p>
      </section>

      <section className="mt-20 p-8 rounded-2xl bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))]">
        <h2 className="text-[20px] font-bold text-[rgb(var(--text-primary))] mb-4">Our Commitment</h2>
        <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed">
          Accessibility is not a checklist, but a continuous process. We regularly audit our components and patterns
          to ensure they meet the highest standards of inclusivity. If you encounter any accessibility issues,
          please report them through our feedback channels.
        </p>
      </section>
    </div>
  );
}
