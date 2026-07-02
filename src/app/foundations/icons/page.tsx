import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { IconsShowcase } from "@/site/docs/IconsShowcase";

export const metadata: Metadata = { title: "Icons" };

export default function IconsPage() {
  return (
    <div>
      <PageHeader
        title="Icons"
        description="Sitka supports three icon libraries across platforms — SF Symbols for native Apple apps, Phosphor Icons for web and React, and Font Awesome for broad compatibility."
      />
      <IconsShowcase />
    </div>
  );
}
