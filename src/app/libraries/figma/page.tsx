import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";
import { FigmaDownloads } from "@/site/home/FigmaDownloads";

export const metadata: Metadata = { title: "Figma — Libraries" };

export default function LibraryFigmaPage() {
  return (
    <div>
      <PageHeader
        badge="Library"
        title="Figma"
        description="Sitka's Figma library: components, text and effect styles, and variables for colour (Light and Dark), type, spacing, radii and layout. Code Connect mappings for 11 components (React and SwiftUI) are in the repo, ready to publish to Dev Mode."
      />

      <div className="mt-8">
        <FigmaDownloads />
      </div>

      <section className="mt-10 space-y-3 text-[14px] leading-relaxed text-[rgb(var(--text-secondary))]">
        <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Using the file</h2>
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>In Figma, drag the .fig onto the file browser (or use Import) to create your own copy.</li>
          <li>Publish it as a library from the Assets panel so your other files can use its components and variables.</li>
          <li>Switch the Colors collection between Light and Dark modes on a frame to preview both themes.</li>
          <li>When a new export ships, open the new file and accept library updates; check the changelog for renamed tokens.</li>
        </ol>
      </section>

      <p className="mt-8 text-[13px] text-[rgb(var(--text-tertiary))]">
        Back to{" "}
        <Link href="/libraries" className="text-[rgb(var(--accent))] underline underline-offset-2">
          all libraries
        </Link>
        .
      </p>
    </div>
  );
}
