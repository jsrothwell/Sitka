import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ColorPalette } from "@/site/docs/ColorPalette";
import { DarkModeShowcase } from "@/site/docs/DarkModeShowcase";

export const metadata: Metadata = { title: "Color" };

export default function ColorPage() {
  return (
    <div className="space-y-16">
      <div>
        <PageHeader
          title="Color"
          description="The Sitka palette is built around a spruce green brand identity with a full neutral scale. All colors are tokenized and adapt to light and dark mode."
        />
        <ColorPalette />
      </div>

      <div className="border-t border-[rgb(var(--border))] pt-12">
        <DarkModeShowcase />
      </div>
    </div>
  );
}
