import type { Metadata } from "next";

export const metadata: Metadata = { title: "Design Principles" };

const PRINCIPLES = [
  {
    number: "1.",
    title: "Intentional Restraint",
    body: "Every visual element must earn its place. Whitespace is not emptiness — it is structure. When in doubt, remove. A calm interface communicates confidence; a cluttered one communicates anxiety.",
  },
  {
    number: "2.",
    title: "Honest Materials",
    body: "Use depth effects (glass, blur, shadow) only when they reflect real spatial relationships. A frosted sidebar sits in front of content. A modal floats above the page. Never apply depth as decoration.",
  },
  {
    number: "3.",
    title: "Motion is Communication",
    body: "Animations should explain something: what appeared, what changed, where it went. If removing an animation doesn't confuse the user, it shouldn't exist. Motion should feel physical, not theatrical.",
  },
  {
    number: "4.",
    title: "Consistent Density",
    body: "Generous whitespace in a dense table feels like wasted space. Tight spacing in a landing hero feels cramped. Density is a design decision — apply it deliberately and consistently within context.",
  },
  {
    number: "5.",
    title: "Platform Native First",
    body: "On iOS, use SwiftUI idioms. On Web, use semantic HTML. Sitka provides parity of intent, not parity of pixels. A button should feel right on each platform, not identical across them.",
  },
  {
    number: "6.",
    title: "The Token is the Truth",
    body: "Never hardcode a color, spacing value, or duration. The token is the contract between design and engineering. When a token changes, every instance changes. This is the system working as intended.",
  },
];

export default function PrinciplesPage() {
  return (
    <div>
      {/* ── Header ──────────────────────────────────── */}
      <section className="pb-10 mb-10 border-b border-[rgb(var(--border))]">
        <h1 className="mb-4">Design Principles</h1>
        <p
          className="text-[rgb(var(--text-primary))] max-w-[640px]"
          style={{ fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.5 }}
        >
          Six principles that guide every decision in Sitka — from token naming
          to component behavior. When in conflict, these resolve the ambiguity.
        </p>
      </section>

      {/* ── Card grid ───────────────────────────────── */}
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
    </div>
  );
}
