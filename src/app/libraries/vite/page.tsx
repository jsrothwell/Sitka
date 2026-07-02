import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";


export default function LibraryVitePage() {
  return (
    <div>
      <PageHeader
        badge="Library"
        title="React · Vite"
        description="Integrate Sitka into a Vite + React SPA. No framework dependencies — just CSS variables, Tailwind 4, and React components."
      />

      <div className="space-y-12">

        {/* Step 1 — Scaffold */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">1</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Create a Vite project</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Skip this step if you already have a project.
          </p>
          <CodeBlock
            language="bash"
            code={`npm create vite@latest my-app -- --template react-ts
cd my-app`}
          />
        </section>

        {/* Step 2 — Install deps */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">2</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Install dependencies</h2>
          </div>
          <CodeBlock
            language="bash"
            code={`# Runtime
npm install clsx tailwind-merge framer-motion lucide-react @fontsource/inter

# Dev
npm install -D tailwindcss @tailwindcss/vite`}
          />
        </section>

        {/* Step 3 — Vite config */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">3</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Configure Vite + Tailwind 4</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Tailwind 4 ships its own Vite plugin — no <code className="font-mono text-[rgb(var(--accent))] text-[12px]">postcss.config</code> needed:
          </p>
          <CodeBlock
            language="ts"
            filename="vite.config.ts"
            code={`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});`}
          />
        </section>

        {/* Step 4 — CSS */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">4</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Add CSS variables</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Replace the contents of <code className="font-mono text-[rgb(var(--accent))] text-[12px]">src/index.css</code> with the Sitka token layer:
          </p>
          <CodeBlock
            language="css"
            filename="src/index.css"
            code={`@import "tailwindcss";
@import "@fontsource/inter/variable.css";

:root {
  --background:      9   9  12;
  --surface:        13  13  17;
  --surface-raised: 22  22  28;
  --surface-hover:  32  32  40;

  --accent:         0 192 232;
  --accent-hover:   0 160 200;
  --accent-subtle:  0  38  46;
  --accent-muted:   0  72  86;

  --text-primary:   242 242 246;
  --text-secondary: 155 155 170;
  --text-tertiary:  100 100 115;

  --border:          38  38  48;
  --border-subtle:   26  26  33;

  --radius-sm: 4px;
  --radius:    6px;
  --radius-md: 10px;
  --radius-lg: 16px;
}

[data-theme="light"] {
  --background:      250 250 250;
  --surface:         255 255 255;
  --surface-raised:  246 246 248;
  --surface-hover:   240 240 244;
  --accent:          0 192 232;
  --accent-subtle:   224 247 252;
  --accent-muted:    179 237 249;
  --text-primary:    40  40  40;
  --text-secondary:  116 116 116;
  --text-tertiary:   167 167 172;
  --border:          224 224 231;
  --border-subtle:   240 240 244;
}

html, body {
  background-color: rgb(var(--background));
  color: rgb(var(--text-primary));
  font-family: "Inter Variable", Inter, system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.glass {
  background-color: rgb(var(--surface) / 0.92);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgb(var(--border));
}`}
          />
        </section>

        {/* Step 5 — cn helper */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">5</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Add the <code className="font-mono text-[16px]">cn</code> helper</h2>
          </div>
          <CodeBlock
            language="ts"
            filename="src/lib/cn.ts"
            code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
          />
        </section>

        {/* Step 6 — Use components */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">6</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Copy &amp; use components</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Copy any component files from <code className="font-mono text-[rgb(var(--accent))] text-[12px]">src/components/ui/</code> into your project, then import normally:
          </p>
          <CodeBlock
            language="tsx"
            filename="src/App.tsx"
            code={`import { Button } from "@/components/ui/Button";
import { Card }   from "@/components/ui/Card";
import { Badge }  from "@/components/ui/Badge";

function App() {
  return (
    <div className="min-h-screen p-8">
      <Card className="max-w-sm mx-auto p-6 flex flex-col gap-4">
        <Badge variant="info">Beta</Badge>
        <h1>Hello Sitka</h1>
        <Button variant="primary">Continue</Button>
      </Card>
    </div>
  );
}

export default App;`}
          />
        </section>

        {/* Differences vs Next.js */}
        <section className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-5">
          <h2 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-3">Differences vs. Next.js</h2>
          <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
            <li className="flex gap-2">
              <span className="text-[rgb(var(--accent))] shrink-0">→</span>
              All components work as-is — the <code className="font-mono text-[rgb(var(--accent))] text-[12px]">"use client"</code> directive at the top of each file is ignored by Vite and has no effect.
            </li>
            <li className="flex gap-2">
              <span className="text-[rgb(var(--accent))] shrink-0">→</span>
              Replace any <code className="font-mono text-[rgb(var(--accent))] text-[12px]">next/link</code> imports with <code className="font-mono text-[rgb(var(--accent))] text-[12px]">react-router-dom</code> or your SPA router.
            </li>
            <li className="flex gap-2">
              <span className="text-[rgb(var(--accent))] shrink-0">→</span>
              Replace <code className="font-mono text-[rgb(var(--accent))] text-[12px]">next/image</code> with a plain <code className="font-mono text-[rgb(var(--accent))] text-[12px]">&lt;img&gt;</code> tag.
            </li>
            <li className="flex gap-2">
              <span className="text-[rgb(var(--accent))] shrink-0">→</span>
              The <code className="font-mono text-[rgb(var(--accent))] text-[12px]">next/font</code> Inter loader is replaced by the <code className="font-mono text-[rgb(var(--accent))] text-[12px]">@fontsource/inter</code> CSS import above.
            </li>
          </ul>
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
