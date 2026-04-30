import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Design Principles" };

const PRINCIPLES = [
  {
    number: "01",
    title: "Intentional Restraint",
    body: "Every visual element must earn its place. Whitespace is not emptiness — it is structure. When in doubt, remove. A calm interface communicates confidence; a cluttered one communicates anxiety.",
  },
  {
    number: "02",
    title: "Honest Materials",
    body: "Use depth effects (glass, blur, shadow) only when they reflect real spatial relationships. A frosted sidebar sits in front of content. A modal floats above the page. Never apply depth as decoration.",
  },
  {
    number: "03",
    title: "Motion is Communication",
    body: "Animations should explain something: what appeared, what changed, where it went. If removing an animation doesn't confuse the user, it shouldn't exist. Motion should feel physical, not theatrical.",
  },
  {
    number: "04",
    title: "Consistent Density",
    body: "Generous whitespace in a dense table feels like wasted space. Tight spacing in a landing hero feels cramped. Density is a design decision — apply it deliberately and consistently within context.",
  },
  {
    number: "05",
    title: "Platform Native First",
    body: "On iOS, use SwiftUI idioms. On Web, use semantic HTML. Sitka provides parity of intent, not parity of pixels. A button should feel right on each platform, not identical across them.",
  },
  {
    number: "06",
    title: "The Token is the Truth",
    body: "Never hardcode a color, spacing value, or duration. The token is the contract between design and engineering. When a token changes, every instance changes. This is the system working as intended.",
  },
];

export default function PrinciplesPage() {
  return (
    <div>
      <PageHeader
        title="Design Principles"
        description="Six principles that guide every decision in Sitka — from token naming to component behavior. When in conflict, these resolve the ambiguity."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRINCIPLES.map(({ number, title, body }) => (
          <div
            key={number}
            className="p-6 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]"
          >
            <div className="text-[11px] font-mono font-semibold text-[rgb(var(--accent))] mb-3">
              {number}
            </div>
            <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-2">
              {title}
            </h3>
            <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
