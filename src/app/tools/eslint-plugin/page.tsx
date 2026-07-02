import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";

export const metadata: Metadata = { title: "ESLint Plugin" };

export default function ESLintPluginPage() {
  return (
    <div>
      <PageHeader
        title="ESLint Plugin"
        description="sitka-tokens ESLint plugin enforces token usage over hardcoded hex colors, spacing values, border radii, and shadows. Keeps your codebase strictly on-brand."
      />

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Installation</h2>
        <div className="rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-4 mb-4">
          <pre className="text-sm text-[rgb(var(--text-secondary))] font-mono">
            {`npm install -D eslint-plugin-sitka-tokens
# or
yarn add -D eslint-plugin-sitka-tokens`}
          </pre>
        </div>
      </section>

      {/* Configuration */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Configuration</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Add to your ESLint flat config (eslint.config.mjs or eslint.config.js):
        </p>
        <div className="rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-4">
          <pre className="text-sm text-[rgb(var(--text-secondary))] font-mono">
            {`import { defineConfig } from 'eslint/config';
import sitkaTokens from 'eslint-plugin-sitka-tokens';

export default defineConfig([
  // ...other configs
  sitkaTokens.configs.recommended,
]);`}
          </pre>
        </div>
      </section>

      {/* Rules */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Rules</h2>
        <div className="space-y-4">
          {[
            {
              rule: "sitka-tokens/token-usage",
              description: "Disallows hardcoded hex colors, px spacing, border-radius values, and shadow strings that don't match Sitka tokens.",
              example: `// ❌ Bad
.button {
  background-color: #00c0e8; // ✗ Hardcoded
  border-radius: 10px;        // ✗ Not a Sitka token
  box-shadow: 0 4px 16px rgba(0,0,0,0.08); // ✗
}

// ✅ Good
.button {
  background-color: rgb(var(--accent));
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);`,
            },
          ].map((r) => (
            <div key={r.rule} className="p-5 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
              <h3 className="font-mono text-[rgb(var(--accent))]">{r.rule}</h3>
              <p className="mt-2 text-sm text-[rgb(var(--text-primary))]">{r.description}</p>
              <pre className="mt-3 p-3 rounded-lg bg-[rgb(var(--surface-raised))] text-xs text-[rgb(var(--text-secondary))] overflow-x-auto">
                {r.example}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Customization */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Options</h2>
        <pre className="rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-4 text-sm text-[rgb(var(--text-secondary))] font-mono">
          {`{
  "plugins": ["sitka-tokens"],
  "rules": {
    "sitka-tokens/token-usage": ["error", {
      "allowFallback": false,     // Permit CSS custom properties for dynamic values
      "tokenPath": "@/tokens/tokens.json"  // Path to token definition file
    }]
  }
}`}
        </pre>
      </section>

      {/* CI / pre-commit */}
      <section>
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">
          Works with husky + lint-staged
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))]">
          Add the plugin to your pre-commit hooks to prevent hardcoded values from entering the codebase:
        </p>
        <pre className="mt-3 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-4 text-sm text-[rgb(var(--text-secondary))] font-mono">
          {`// package.json scripts
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix"]
  }
}`}
        </pre>
      </section>
    </div>
  );
}
