import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ColorPalette } from "@/components/docs/ColorPalette";

export const metadata: Metadata = { title: "Color" };

export default function ColorPage() {
  return (
    <div>
      <PageHeader
        title="Color"
        description="The Sitka palette is built around a violet brand identity with a full neutral scale. All colors are tokenized and adapt to light and dark mode."
      />
      <ColorPalette />
    </div>
  );
}
