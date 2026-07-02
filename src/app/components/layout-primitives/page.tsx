"use client";

import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Box } from "@/components/ui/Box";
import { Stack, Inline } from "@/components/ui/Stack";

function Demo() {
  return (
    <div className="w-full max-w-lg space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">Stack (vertical, gap-4)</p>
        <Stack gap="4" className="p-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
          {["First item", "Second item", "Third item"].map((label) => (
            <Box key={label} className="h-10 rounded-lg bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border-subtle))] flex items-center px-3 text-[13px] text-[rgb(var(--text-secondary))]">
              {label}
            </Box>
          ))}
        </Stack>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">Inline (row, gap-2, wrapping)</p>
        <Inline gap="2" className="p-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
          {["Design", "Systems", "Components", "Tokens", "Motion", "Accessibility"].map((tag) => (
            <Box
              key={tag}
              className="px-3 py-1 rounded-full bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border-subtle))] text-[12px] text-[rgb(var(--text-secondary))]"
            >
              {tag}
            </Box>
          ))}
        </Inline>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">Stack row, justify-between</p>
        <Stack direction="row" justify="between" align="center" className="p-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
          <Box className="text-[13px] font-medium text-[rgb(var(--text-primary))]">Title</Box>
          <Inline gap="2">
            <Box className="px-3 py-1.5 rounded-lg border border-[rgb(var(--border))] text-[13px] text-[rgb(var(--text-secondary))]">Cancel</Box>
            <Box className="px-3 py-1.5 rounded-lg bg-[rgb(var(--accent))] text-[13px] text-white">Save</Box>
          </Inline>
        </Stack>
      </div>
    </div>
  );
}

const CODE = {
  react: {
    filename: "Stack.tsx",
    code: `// Box — polymorphic wrapper, any HTML element
<Box as="section" className="p-6">
  content
</Box>

// Stack — vertical flex column
<Stack gap="4">
  <Card />
  <Card />
  <Card />
</Stack>

// Stack — horizontal row
<Stack direction="row" justify="between" align="center">
  <Logo />
  <NavLinks />
</Stack>

// Inline — row, wrapping, centered items (default)
<Inline gap="2">
  <Tag>Design</Tag>
  <Tag>Systems</Tag>
  <Tag>Components</Tag>
</Inline>

// Props
// Box:   as?, className?, + all native element props
// Stack: direction? ("col"|"row"), gap? (0–12),
//        align?, justify?, wrap?, as?, className?
// Inline: same as Stack (direction fixed to "row")`,
  },
  html: {
    filename: "stack.html",
    code: `<!-- Vertical stack -->
<div style="display:flex; flex-direction:column; gap:16px;">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Inline / row -->
<div style="display:flex; flex-direction:row; flex-wrap:wrap; gap:8px; align-items:center;">
  <span>Tag A</span>
  <span>Tag B</span>
</div>

<!-- Space-between row -->
<div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center;">
  <span>Title</span>
  <div style="display:flex; gap:8px;">
    <button>Cancel</button>
    <button>Save</button>
  </div>
</div>`,
  },
  swift: {
    filename: "LayoutPrimitives.swift",
    code: `import SwiftUI

// Stack — VStack equivalent
VStack(alignment: .leading, spacing: 16) {
  ForEach(items) { item in
    ItemView(item: item)
  }
}

// Inline — HStack with wrapping (SwiftUI 4+)
// For wrapping, use LazyVGrid or FlowLayout
HStack(spacing: 8) {
  ForEach(tags, id: \\.self) { tag in
    TagView(label: tag)
  }
}

// Space-between row
HStack {
  Text("Title")
  Spacer()
  HStack(spacing: 8) {
    Button("Cancel") {}
    Button("Save") {}
  }
}`,
  },
};

export default function LayoutPrimitivesPage() {
  return (
    <div>
      <PageHeader
        title="Layout Primitives"
        description="Box, Stack, and Inline — composable layout components that wrap flexbox and remove the need for utility-class repetition on common layout patterns."
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Preview</h2>
        <ComponentPreview>
          <Demo />
        </ComponentPreview>
      </section>

      {/* ── Components ───────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Components</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Component", "Description", "Key props"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Box", desc: "Polymorphic wrapper — renders as any HTML element via the as prop.", props: "as, className" },
                { name: "Stack", desc: "Flex column (default) or row with gap, align, and justify control.", props: "direction, gap, align, justify, wrap, as" },
                { name: "Inline", desc: "Shorthand for Stack direction=row wrap=true align=center.", props: "gap, align, justify" },
              ].map((row) => (
                <tr key={row.name} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.name}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.desc}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-tertiary))]">{row.props}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Gap scale ───────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Gap scale</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Prop value", "CSS gap", "Use case"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { val: "1", css: "4px",  use: "Icon + label tight coupling" },
                { val: "2", css: "8px",  use: "Inline tags, chip groups" },
                { val: "3", css: "12px", use: "Form label + input" },
                { val: "4", css: "16px", use: "Default — card items, list rows" },
                { val: "6", css: "24px", use: "Section-level separation" },
                { val: "8", css: "32px", use: "Major layout regions" },
              ].map((row) => (
                <tr key={row.val} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">gap=&quot;{row.val}&quot;</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.css}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Guidelines</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Use Stack instead of writing flex flex-col gap-4 inline — it communicates intent and enforces the spacing scale.",
            "Box with as='section' or as='ul' keeps semantics correct without adding a wrapper div.",
            "Inline defaults to wrap so it doesn't overflow on small screens — only set wrap={false} when truncation is intentional.",
            "These primitives have no visual opinion — all surface styling (borders, backgrounds) comes from Tailwind utilities on the child elements.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
