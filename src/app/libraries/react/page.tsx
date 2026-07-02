import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = { title: "React · Next.js — Libraries" };

export default function LibraryReactPage() {
  return (
    <div>
      <PageHeader
        badge="Library"
        title="React · Next.js"
        description="Add Sitka to an existing Next.js project. Components are copied directly into your codebase — no npm package, no version lock-in."
      />

      <div className="space-y-12">

        {/* Prerequisites */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Prerequisites</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Your project needs these peer dependencies. Install any that are missing:
          </p>
          <CodeBlock
            language="bash"
            code={`npm install clsx tailwind-merge framer-motion lucide-react @fontsource/inter`}
          />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { name: "React", version: "19+" },
              { name: "Next.js", version: "16+" },
              { name: "Tailwind CSS", version: "4+" },
              { name: "TypeScript", version: "5+" },
            ].map((dep) => (
              <div key={dep.name} className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] px-3 py-2.5">
                <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">{dep.name}</p>
                <p className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">{dep.version}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step 1 — CSS Variables */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">1</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Add CSS variables</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Copy the token variables block into your global stylesheet (or a new <code className="font-mono text-[rgb(var(--accent))] text-[12px]">sitka.css</code> that you import in <code className="font-mono text-[rgb(var(--accent))] text-[12px]">layout.tsx</code>).
          </p>
          <CodeBlock
            language="css"
            filename="app/globals.css"
            code={`@import "tailwindcss";

/* ── Sitka tokens — dark (default) ───────────────── */
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

  --radius-sm:  4px;
  --radius:     6px;
  --radius-md:  10px;
  --radius-lg:  16px;
}

/* ── Sitka tokens — light ─────────────────────────── */
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

/* ── Glass surface ────────────────────────────────── */
.glass {
  background-color: rgb(var(--surface) / 0.92);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgb(var(--border));
}`}
          />
        </section>

        {/* Step 2 — Tailwind config */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">2</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Extend Tailwind config</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Merge the Sitka theme extension into your existing <code className="font-mono text-[rgb(var(--accent))] text-[12px]">tailwind.config.ts</code>:
          </p>
          <CodeBlock
            language="ts"
            filename="tailwind.config.ts"
            code={`import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        sitka: {
          cyan: "#00C0E8",
          50: "#f0faf4",  100: "#dcf5e7", 200: "#b9eace",
          300: "#84d4a8", 400: "#4dba82", 500: "#34a865",
          600: "#289452", 700: "#1f7341", 800: "#165733",
          900: "#0f3d24", 950: "#071f12",
        },
      },
      boxShadow: {
        glass: "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.12)",
        glow:  "0 0 0 1px rgba(0,192,232,0.3), 0 0 20px rgba(0,192,232,0.15)",
        soft:  "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
};

export default config;`}
          />
        </section>

        {/* Step 3 — cn helper */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">3</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Add the <code className="font-mono text-[16px]">cn</code> helper</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            All components use this tiny utility to merge Tailwind classes:
          </p>
          <CodeBlock
            language="ts"
            filename="lib/cn.ts"
            code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
          />
        </section>

        {/* Step 4 — Copy components */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">4</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Copy components</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Each component is a self-contained file in <code className="font-mono text-[rgb(var(--accent))] text-[12px]">src/components/ui/</code>. Copy whichever ones you need into your project's component directory and import them:
          </p>
          <CodeBlock
            language="tsx"
            filename="app/page.tsx"
            code={`import { Button } from "@/components/ui/Button";
import { Badge }  from "@/components/ui/Badge";
import { Input }  from "@/components/ui/Input";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <Badge variant="success">Active</Badge>
      <Input placeholder="Search…" />
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </div>
  );
}`}
          />
        </section>

        {/* Step 5 — Fonts */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[11px] font-bold">5</span>
            <h2 className="text-[18px] font-semibold text-[rgb(var(--text-primary))]">Load Inter font</h2>
          </div>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Sitka uses Inter as its primary typeface. Load it via <code className="font-mono text-[rgb(var(--accent))] text-[12px]">next/font</code> in your root layout:
          </p>
          <CodeBlock
            language="tsx"
            filename="app/layout.tsx"
            code={`import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}`}
          />
        </section>

        {/* Dark mode */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Dark / Light mode</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Sitka is dark-first. Toggle light mode by setting <code className="font-mono text-[rgb(var(--accent))] text-[12px]">data-theme="light"</code> on <code className="font-mono text-[rgb(var(--accent))] text-[12px]">&lt;html&gt;</code>:
          </p>
          <CodeBlock
            language="ts"
            code={`// anywhere in your client code
document.documentElement.setAttribute("data-theme", "light");
// reset to dark
document.documentElement.removeAttribute("data-theme");`}
          />
        </section>

        {/* Next steps */}
        <section className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-5">
          <h2 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">Next steps</h2>
          <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
            <li>
              Browse the{" "}
              <Link href="/components/button" className="text-[rgb(var(--accent))] underline underline-offset-2">
                Component docs
              </Link>{" "}
              for props and copy-paste examples.
            </li>
            <li>
              Download the full{" "}
              <Link href="/tokens/export" className="text-[rgb(var(--accent))] underline underline-offset-2">
                token JSON
              </Link>{" "}
              for automated generation pipelines.
            </li>
            <li>
              Check the{" "}
              <Link href="/foundations/motion" className="text-[rgb(var(--accent))] underline underline-offset-2">
                Motion guide
              </Link>{" "}
              for Framer Motion spring presets.
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
}
