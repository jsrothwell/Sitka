import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { IconsShowcase } from "@/site/docs/IconsShowcase";

export const metadata: Metadata = { title: "Icons" };

export default function IconsPage() {
  return (
    <div>
      <PageHeader
        title="Icons"
        description="Sitka uses two icon sets: SF Symbols in native Apple apps and Lucide on the web. Every Sitka React component draws its icons from Lucide. Phosphor and Font Awesome are documented below for teams that already depend on them, but Sitka components don't use them."
      />
      <IconsShowcase />
    </div>
  );
}
