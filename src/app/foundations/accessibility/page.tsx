import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Accessibility" };

const STANDARDS = [
  {
    title: "Perceivable",
    description: "Information and user interface components must be presentable to users in ways they can perceive.",
    items: [
      {
        subtitle: "Contrast Ratio",
        text: "Every text and interactive element in Sitka is designed to meet WCAG 2.1 AA as a minimum. Primary reading text targets AAA (7:1) where possible.",
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

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Accessibility"
        description="Sitka is built with accessibility at its core. We adhere to WCAG 2.1 Level AA standards to ensure that our products are usable by everyone, regardless of ability."
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
                      className="inline-flex items-center text-[13px] font-medium text-[rgb(var(--accent))] hover:underline"
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
