import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/docs/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = { title: "Figma — Libraries" };

export default function LibraryFigmaPage() {
  return (
    <div>
      <PageHeader
        badge="Library"
        title="Figma"
        description="Sitka's Figma library ships ready-to-use components, a full variable collection, and Code Connect mappings that link every design token back to this codebase."
      />

      <div className="space-y-12">

        {/* Enable the library */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Enable the library</h2>
          <ol className="space-y-3 text-[14px] text-[rgb(var(--text-secondary))] ml-4 list-decimal">
            <li>Open any Figma file in your organisation.</li>
            <li>Click the grid icon in the left sidebar → <strong className="text-[rgb(var(--text-primary))]">Assets</strong>.</li>
            <li>In the Assets panel, click the <strong className="text-[rgb(var(--text-primary))]">book icon</strong> → <strong className="text-[rgb(var(--text-primary))]">Team libraries</strong>.</li>
            <li>Find <strong className="text-[rgb(var(--text-primary))]">Sitka Design System</strong> and toggle it on.</li>
          </ol>
          <p className="mt-4 text-[14px] text-[rgb(var(--text-secondary))]">
            All Sitka components and variables are now available in every file across your team.
          </p>
        </section>

        {/* Variables */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Variables</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            The Figma library publishes <strong className="text-[rgb(var(--text-primary))]">local variables</strong> that map 1:1 to{" "}
            <Link href="/tokens" className="text-[rgb(var(--accent))] underline underline-offset-2">
              design tokens
            </Link>
            . Collections include:
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { name: "Color / Brand", desc: "Sitka cyan + green scale" },
              { name: "Color / Neutral", desc: "0 → 1000 greyscale" },
              { name: "Color / Semantic", desc: "success · warning · error · info" },
              { name: "Color / Surface", desc: "Background · surface · raised" },
              { name: "Spacing", desc: "4px grid · 0–96" },
              { name: "Border Radius", desc: "sm → full" },
            ].map((v) => (
              <div key={v.name} className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] px-3 py-2.5">
                <p className="text-[12px] font-semibold text-[rgb(var(--text-primary))]">{v.name}</p>
                <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-0.5">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Components */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Components</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Every component in the Figma library has a corresponding React implementation in this codebase. Use the same component names and variant values in both Figma and code.
          </p>
          <div className="overflow-x-auto rounded-xl border border-[rgb(var(--border))]">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
                  <th className="px-4 py-2.5 text-left font-semibold text-[rgb(var(--text-secondary))]">Figma component</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-[rgb(var(--text-secondary))]">React import</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-[rgb(var(--text-secondary))]">Variant prop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(var(--border))]">
                {[
                  { figma: "Button", react: "Button", variants: "primary · secondary · ghost · danger · glass" },
                  { figma: "Input",  react: "Input",  variants: "default · error · disabled" },
                  { figma: "Badge",  react: "Badge",  variants: "default · success · warning · error · info" },
                  { figma: "Avatar", react: "Avatar", variants: "image · initials · icon" },
                  { figma: "Card",   react: "Card",   variants: "default · elevated · glass" },
                  { figma: "Switch", react: "Switch", variants: "on · off · disabled" },
                  { figma: "Tabs",   react: "Tabs",   variants: "underline · pill" },
                  { figma: "Modal",  react: "Modal",  variants: "sm · md · lg · fullscreen" },
                ].map((row) => (
                  <tr key={row.figma} className="bg-[rgb(var(--surface))] hover:bg-[rgb(var(--surface-raised))] transition-colors">
                    <td className="px-4 py-2.5 font-medium text-[rgb(var(--text-primary))]">{row.figma}</td>
                    <td className="px-4 py-2.5 font-mono text-[rgb(var(--accent))] text-[12px]">{row.react}</td>
                    <td className="px-4 py-2.5 text-[rgb(var(--text-secondary))]">{row.variants}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Code Connect */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Code Connect</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Sitka uses{" "}
            <Link href="https://www.figma.com/developers/code-connect" className="text-[rgb(var(--accent))] underline underline-offset-2" target="_blank" rel="noopener noreferrer">
              Figma Code Connect
            </Link>{" "}
            to link every Figma component variant directly to the matching React props. When a developer inspects a component in Dev Mode, they see the exact code snippet they need to paste — no manual translation.
          </p>
          <p className="text-[14px] font-medium text-[rgb(var(--text-primary))] mb-2">
            Mapping file example:
          </p>
          <CodeBlock
            language="tsx"
            filename="Button.figma.tsx"
            code={`import figma from "@figma/code-connect";
import { Button } from "@/components/ui/Button";

figma.connect(Button, "https://www.figma.com/design/YOUR_FILE_KEY", {
  props: {
    variant: figma.enum("Variant", {
      Primary:   "primary",
      Secondary: "secondary",
      Ghost:     "ghost",
      Danger:    "danger",
      Glass:     "glass",
    }),
    size: figma.enum("Size", {
      Small:  "sm",
      Medium: "md",
      Large:  "lg",
    }),
    loading: figma.boolean("Loading"),
    label: figma.string("Label"),
  },
  example: ({ variant, size, loading, label }) => (
    <Button variant={variant} size={size} loading={loading}>
      {label}
    </Button>
  ),
});`}
          />

          <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mt-6 mb-2">Publish mappings</h3>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-3">
            After editing a <code className="font-mono text-[rgb(var(--accent))] text-[12px]">*.figma.tsx</code> mapping file, push the changes to Figma:
          </p>
          <CodeBlock
            language="bash"
            code={`# Install the CLI (once)
npm install -D @figma/code-connect

# Parse and publish all mappings
npx figma connect publish --token $FIGMA_ACCESS_TOKEN`}
          />
        </section>

        {/* Workflow */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Recommended workflow</h2>
          <div className="space-y-3">
            {[
              {
                step: "Design",
                desc: "Designers use Sitka Figma components and variables. Because variables mirror design tokens, colours and spacing stay in sync with code automatically.",
              },
              {
                step: "Handoff",
                desc: "Developers open Dev Mode and see Code Connect snippets for every component — copy the snippet directly into their IDE.",
              },
              {
                step: "Token update",
                desc: "When a token value changes, update tokens.json, re-run the Style Dictionary build, and update Figma variables to match. All components update in both layers.",
              },
            ].map((w, i) => (
              <div key={w.step} className="flex gap-4 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[12px] font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">{w.step}</p>
                  <p className="text-[13px] text-[rgb(var(--text-secondary))] mt-0.5">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="text-[13px] text-[rgb(var(--text-tertiary))]">
          Back to{" "}
          <Link href="/libraries" className="text-[rgb(var(--accent))] underline underline-offset-2">
            all libraries
          </Link>
          .
        </p>

      </div>
    </div>
  );
}
