import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { MotionShowcase } from "@/components/docs/MotionShowcase";

export const metadata: Metadata = { title: "Motion" };

export default function MotionPage() {
  return (
    <div>
      <PageHeader
        title="Motion"
        description="Motion is not decoration — it communicates state changes, establishes hierarchy, and gives the interface a sense of physicality. Every transition in Sitka is intentional."
      />
      <MotionShowcase />
    </div>
  );
}
