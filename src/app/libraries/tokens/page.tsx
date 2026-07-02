import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = { title: "Tokens Only — Libraries" };

export default function LibraryTokensPage() {
  return (
    <div>
      <PageHeader
        badge="Library"
        title="Tokens Only"
        description="Use Sitka's design tokens in any framework — or no framework at all. Available as CSS custom properties, raw JSON (DTCG format), and a typed JS/TS module."
      />

      <div className="space-y-12">

        {/* Overview */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">What's in the token set</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { category: "Color", count: "Brand · Neutral · Semantic" },
              { category: "Spacing", count: "0–96 px scale" },
              { category: "Typography", count: "Size · Weight · Leading" },
              { category: "Border Radius", count: "sm → full" },
              { category: "Shadow", count: "sm → xl · glass · glow" },
              { category: "Motion", count: "Duration · Easing curves" },
            ].map((t) => (
              <div key={t.category} className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] px-3 py-2.5">
                <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{t.category}</p>
                <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-0.5">{t.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Option A — CSS custom properties */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Option A — CSS custom properties</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Paste the token block into your global stylesheet and reference tokens anywhere via <code className="font-mono text-[rgb(var(--accent))] text-[12px]">rgb(var(--token-name))</code>. Works in any framework.
          </p>
          <CodeBlock
            language="css"
            filename="tokens.css"
            code={`:root {
  /* Color — surface */
  --background:      9   9  12;
  --surface:        13  13  17;
  --surface-raised: 22  22  28;

  /* Color — accent (Sitka cyan) */
  --accent:         0 192 232;
  --accent-subtle:  0  38  46;
  --accent-muted:   0  72  86;

  /* Color — text */
  --text-primary:   242 242 246;
  --text-secondary: 155 155 170;
  --text-tertiary:  100 100 115;

  /* Color — border */
  --border:          38  38  48;
  --border-subtle:   26  26  33;

  /* Border radius */
  --radius-sm: 4px;
  --radius:    6px;
  --radius-md: 10px;
  --radius-lg: 16px;
}

/* Usage */
.card {
  background: rgb(var(--surface));
  border: 1px solid rgb(var(--border));
  border-radius: var(--radius-md);
  color: rgb(var(--text-primary));
}`}
          />
        </section>

        {/* Option B — JSON */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Option B — JSON (DTCG)</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            The canonical token file lives at <code className="font-mono text-[rgb(var(--accent))] text-[12px]">src/tokens/tokens.json</code> and follows the{" "}
            <Link href="https://tr.designtokens.org/format/" className="text-[rgb(var(--accent))] underline underline-offset-2" target="_blank" rel="noopener noreferrer">
              Design Token Community Group
            </Link>{" "}
            (DTCG) spec. Download it from the{" "}
            <Link href="/tokens/export" className="text-[rgb(var(--accent))] underline underline-offset-2">
              Token Export
            </Link>{" "}
            page or copy it into your pipeline directly.
          </p>
          <CodeBlock
            language="json"
            filename="tokens.json (excerpt)"
            code={`{
  "$schema": "https://sitka.design/tokens/v1",
  "color": {
    "brand": {
      "cyan": { "$value": "#00C0E8", "$type": "color" },
      "500":  { "$value": "#34a865", "$type": "color" }
    },
    "semantic": {
      "success": { "$value": "#22c55e", "$type": "color" },
      "warning": { "$value": "#f59e0b", "$type": "color" },
      "error":   { "$value": "#ef4444", "$type": "color" }
    }
  },
  "spacing": {
    "4":  { "$value": "16px", "$type": "dimension" },
    "8":  { "$value": "32px", "$type": "dimension" },
    "16": { "$value": "64px", "$type": "dimension" }
  },
  "borderRadius": {
    "md":  { "$value": "10px", "$type": "dimension" },
    "lg":  { "$value": "14px", "$type": "dimension" },
    "full":{ "$value": "9999px", "$type": "dimension" }
  }
}`}
          />
        </section>

        {/* Option C — JS/TS module */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Option C — JS/TS module</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            For tooling, style-system integrations, or runtime lookups, import the tokens directly as a typed object:
          </p>
          <CodeBlock
            language="ts"
            filename="tokens.ts"
            code={`export const tokens = {
  color: {
    brand: {
      cyan:  "#00C0E8",
      "500": "#34a865",
      "600": "#289452",
    },
    neutral: {
      "0":   "#ffffff",
      "900": "#171717",
      "950": "#0a0a0a",
    },
    semantic: {
      success: "#22c55e",
      warning: "#f59e0b",
      error:   "#ef4444",
      info:    "#3b82f6",
    },
  },
  spacing: {
    "1":  "4px",
    "2":  "8px",
    "4":  "16px",
    "8":  "32px",
    "16": "64px",
  },
  borderRadius: {
    sm:   "6px",
    md:   "10px",
    lg:   "14px",
    xl:   "20px",
    full: "9999px",
  },
  shadow: {
    sm:    "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
    md:    "0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)",
    glow:  "0 0 0 1px rgba(0,192,232,0.3), 0 0 20px rgba(0,192,232,0.15)",
  },
  motion: {
    duration: { fast: "150ms", normal: "250ms", slow: "400ms" },
    easing: {
      spring:       "cubic-bezier(0.16, 1, 0.3, 1)",
      springBouncy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },
} as const;

export type Tokens = typeof tokens;`}
          />
          <p className="mt-3 text-[13px] text-[rgb(var(--text-secondary))]">
            Use it in style-in-JS, Emotion, styled-components, or any custom theming layer that accepts plain JS values.
          </p>
        </section>

        {/* Using tokens with Emotion / vanilla-extract */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Example — Emotion</h2>
          <CodeBlock
            language="tsx"
            code={`import { css } from "@emotion/react";
import { tokens } from "./tokens";

const cardStyle = css\`
  background: rgb(var(--surface));
  border: 1px solid rgb(var(--border));
  border-radius: \${tokens.borderRadius.md};
  box-shadow: \${tokens.shadow.md};
  padding: \${tokens.spacing["4"]};
  color: rgb(var(--text-primary));
\`;

export function Card({ children }: { children: React.ReactNode }) {
  return <div css={cardStyle}>{children}</div>;
}`}
          />
        </section>

        {/* Style Dictionary */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Automating with Style Dictionary</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            The DTCG-formatted <code className="font-mono text-[rgb(var(--accent))] text-[12px]">tokens.json</code> can be fed directly into{" "}
            <Link href="https://amzn.github.io/style-dictionary/" className="text-[rgb(var(--accent))] underline underline-offset-2" target="_blank" rel="noopener noreferrer">
              Style Dictionary
            </Link>{" "}
            to generate platform-specific outputs (Swift, Kotlin, CSS, SCSS, JSON, JS, and more):
          </p>
          <CodeBlock
            language="js"
            filename="style-dictionary.config.js"
            code={`export default {
  source: ["tokens/tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      prefix: "sitka",
      buildPath: "dist/",
      files: [{ destination: "tokens.css", format: "css/variables" }],
    },
    js: {
      transformGroup: "js",
      buildPath: "dist/",
      files: [{ destination: "tokens.js", format: "javascript/es6" }],
    },
    ios: {
      transformGroup: "ios-swift",
      buildPath: "dist/",
      files: [{ destination: "SitkaTokens.swift", format: "ios-swift/class.swift" }],
    },
  },
};`}
          />
        </section>

        <p className="text-[13px] text-[rgb(var(--text-tertiary))]">
          Back to{" "}
          <Link href="/libraries" className="text-[rgb(var(--accent))] underline underline-offset-2">
            all libraries
          </Link>
          {" · "}
          <Link href="/tokens/export" className="text-[rgb(var(--accent))] underline underline-offset-2">
            Download tokens.json
          </Link>
          .
        </p>

      </div>
    </div>
  );
}
