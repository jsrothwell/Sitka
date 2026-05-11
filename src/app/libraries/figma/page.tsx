import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Figma — Libraries" };

export default function LibraryFigmaPage() {
  return (
    <div>
      <PageHeader
        badge="Library"
        title="Figma"
        description="Sitka's Figma library is coming soon — components, variables, and Code Connect mappings that link your design directly to this codebase."
      />

      <div className="mt-8 flex flex-col items-center gap-6 rounded-2xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] px-8 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-tertiary))]">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
            <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.587v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.587v8.98zM8.148 10.52c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117v-6.038H8.148zm4.587 0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49-4.49-2.014-4.49-4.49V10.52zm4.588 7.509c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117v3.019c0 1.665 1.354 3.019 3.117 3.019z" />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="inline-block rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-secondary))]">
            Coming Soon
          </span>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))]">
            Figma library in progress
          </h2>
          <p className="max-w-md text-[14px] leading-relaxed text-[rgb(var(--text-secondary))]">
            We&apos;re building out the Figma library — components, design token variables, and Code Connect mappings. Check back soon.
          </p>
        </div>
      </div>

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
