import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { StreamingText } from "@/components/ui/StreamingText";

export const metadata: Metadata = { title: "StreamingText" };

const PROPS = [
  { name: "content", type: "string", description: "Full text to stream character by character." },
  { name: "speed", type: "number", default: "30", description: "Delay in ms between characters." },
  { name: "showCursor", type: "boolean", default: "true", description: "Show blinking cursor at the end." },
  { name: "cursorChar", type: "string", default: '"|"', description: "Character used for cursor." },
  { name: "onComplete", type: "() => void", description: "Callback when streaming finishes." },
  { name: "autoStart", type: "boolean", default: "true", description: "Start immediately on mount." },
  { name: "wordPause", type: "number", default: "0", description: "Extra pause in ms between words." },
  { name: "streaming", type: "boolean", default: "true", description: "Pause/resume control." },
  { name: "onCharacter", type: "(index: number) => void", description: "Fires after each character rendered." },
];

export default function StreamingTextPage() {
  return (
    <div>
      <PageHeader
        title="StreamingText"
        description="Typewriter animation component for AI streaming responses. Handles cursor, timing, and can be paused/resumed."
      />

      {/* Demo */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Preview</h2>
        <ComponentPreview className="p-6">
          <div className="w-full max-w-2xl">
            <div className="text-[15px] leading-relaxed text-[rgb(var(--text-primary))]">
              <StreamingText content="Sitka is a design system built for AI-native applications." speed={25} showCursor={true} />
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Performance */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Performance</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))]">
          StreamingText uses a single state index and timeouts to avoid unnecessary re-renders.
        </p>
      </section>
    </div>
  );
}
