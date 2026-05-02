import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { GlassShowcase } from "@/components/docs/GlassShowcase";

export const metadata: Metadata = { title: "Glass" };

export default function GlassPage() {
  return (
    <div>
      <PageHeader
        title="Glass"
        description="Frosted glass surfaces communicate spatial depth — a panel floats above content, a modal floats above the page. Every glass level pairs blur, saturation, opacity, and a hairline border."
      />
      <GlassShowcase />
    </div>
  );
}
