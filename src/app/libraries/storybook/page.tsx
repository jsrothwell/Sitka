import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = { title: "Storybook — Libraries" };

export default function LibraryStorybookPage() {
  return (
    <div>
      <PageHeader
        badge="Library"
        title="Storybook"
        description="Interactive component workshop for Sitka. Browse every component in isolation, switch themes, test viewports, and check accessibility — all without running the full app."
      />

      <div className="space-y-12">

        {/* Overview */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Overview</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
            Sitka ships with Storybook 8 pre-configured. All 31 components have stories in{" "}
            <code className="font-mono text-[rgb(var(--accent))] text-[12px]">src/stories/</code>.
            The setup uses <code className="font-mono text-[rgb(var(--accent))] text-[12px]">@storybook/react-vite</code> so
            Storybook builds independently of Next.js — no version coupling, instant HMR.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { name: "Storybook", version: "8.6" },
              { name: "Framework", version: "react-vite" },
              { name: "Tailwind", version: "v4 via Vite" },
              { name: "Stories", version: "31 components" },
            ].map((item) => (
              <div key={item.name} className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] px-3 py-2.5">
                <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">{item.name}</p>
                <p className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">{item.version}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Run locally */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Run locally</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Start Storybook on <code className="font-mono text-[rgb(var(--accent))] text-[12px]">localhost:6006</code>:
          </p>
          <CodeBlock
            language="bash"
            code={`npm run storybook`}
          />
          <p className="mt-4 text-[14px] text-[rgb(var(--text-secondary))]">
            To build a static version for deployment:
          </p>
          <CodeBlock
            language="bash"
            code={`npm run build-storybook
# output → storybook-static/`}
          />
        </section>

        {/* Features */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Built-in features</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Theme switcher",
                description: "Toggle between dark and light via the toolbar. Uses data-theme attribute — identical to the production implementation.",
              },
              {
                title: "Viewport presets",
                description: "Mobile (390 × 844), Tablet (768 × 1024), Desktop (1440 × 900) — match real device breakpoints.",
              },
              {
                title: "Accessibility audit",
                description: "The a11y addon runs axe-core on every story automatically. Violations surface in the Accessibility panel.",
              },
              {
                title: "Controls & autodocs",
                description: "All props are wired to interactive controls. Component pages are auto-generated from TypeScript types and JSDoc.",
              },
            ].map((feature) => (
              <div key={feature.title} className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-4">
                <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))] mb-1">{feature.title}</p>
                <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Writing a story */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Writing a story</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Stories live in <code className="font-mono text-[rgb(var(--accent))] text-[12px]">src/stories/</code> and follow
            the Component Story Format (CSF 3). Here is the Button story as a reference:
          </p>
          <CodeBlock
            language="tsx"
            filename="src/stories/Button.stories.tsx"
            code={`import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof Button> = {
  title: "Actions/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size:    { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    loading:  { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", size: "md", children: "Button" },
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "md", children: "Button" },
};`}
          />
        </section>

        {/* Config files */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Configuration</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            The config lives in <code className="font-mono text-[rgb(var(--accent))] text-[12px]">.storybook/</code>.
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-[13px] font-medium text-[rgb(var(--text-secondary))] mb-2">.storybook/main.ts</p>
              <CodeBlock
                language="ts"
                filename=".storybook/main.ts"
                code={`import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import tailwindVite from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: { name: "@storybook/react-vite", options: {} },
  staticDirs: ["../public"],
  async viteFinal(cfg) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(cfg, {
      plugins: [tailwindVite()],
      resolve: { alias: { "@": path.resolve(__dirname, "../src") } },
    });
  },
};
export default config;`}
              />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[rgb(var(--text-secondary))] mb-2">.storybook/preview.tsx</p>
              <CodeBlock
                language="tsx"
                filename=".storybook/preview.tsx"
                code={`import type { Preview, Decorator } from "@storybook/react";
import React from "react";
import "../src/app/globals.css";

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "dark";
  return (
    <div
      data-theme={theme}
      style={{
        background: theme === "dark" ? "rgb(9 9 12)" : "rgb(252 252 253)",
        minHeight: "100vh",
        padding: "2rem",
        colorScheme: theme,
      }}
    >
      <Story />
    </div>
  );
};

export default {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      name: "Theme",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "dark",  title: "Dark",  icon: "moon" },
          { value: "light", title: "Light", icon: "sun" },
        ],
        showName: true,
      },
    },
  },
} satisfies Preview;`}
              />
            </div>
          </div>
        </section>

        {/* Next steps */}
        <section className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-5">
          <h2 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">Related</h2>
          <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
            <li>
              <Link href="/components/button" className="text-[rgb(var(--accent))] underline underline-offset-2">
                Component docs
              </Link>{" "}
              — props, variants, and usage guidelines for every component.
            </li>
            <li>
              <Link href="/foundations/accessibility" className="text-[rgb(var(--accent))] underline underline-offset-2">
                Accessibility
              </Link>{" "}
              — the a11y standards each component is tested against.
            </li>
            <li>
              <Link href="/libraries/react" className="text-[rgb(var(--accent))] underline underline-offset-2">
                React · Next.js
              </Link>{" "}
              — how to integrate Sitka into a Next.js project.
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
}
