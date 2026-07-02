import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = { title: "Installation" };

export default function InstallationPage() {
  return (
    <div>
      <PageHeader
        title="Installation"
        description="Get Sitka running in your project in under five minutes."
      />

      <div className="space-y-10">
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">1. Clone the repository</h2>
          <CodeBlock
            code={`git clone https://github.com/your-org/sitka.git
cd sitka
npm install`}
            language="bash"
          />
        </section>

        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">2. Start the dev server</h2>
          <CodeBlock code={`npm run dev\n# Open http://localhost:3000`} language="bash" />
        </section>

        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">3. Use components</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Components live in <code className="font-mono text-[rgb(var(--accent))] text-[12px]">src/components/ui/</code>. Import directly:
          </p>
          <CodeBlock
            code={`import { Button } from "@/components/ui/Button";

export function MyPage() {
  return (
    <Button variant="primary" size="lg">
      Launch Product
    </Button>
  );
}`}
            language="tsx"
            filename="app/page.tsx"
          />
        </section>

        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">4. Use design tokens</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            CSS custom properties are available globally after importing globals.css:
          </p>
          <CodeBlock
            code={`.my-component {
  background: rgb(var(--surface));
  color: rgb(var(--text-primary));
  border: 1px solid rgb(var(--border));
  border-radius: 10px; /* token: borderRadius.md */
}`}
            language="css"
          />
        </section>

        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">iOS / SwiftUI</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Export the Swift token file from the{" "}
            <a href="/tokens/export" className="text-[rgb(var(--accent))] underline underline-offset-2">
              Token Export
            </a>{" "}
            page and add it to your Xcode project.
          </p>
          <CodeBlock
            code={`// After adding SitkaTokens.swift to your project:
import SwiftUI

struct ContentView: View {
    var body: some View {
        SitkaButton(title: "Get Started", variant: .primary) {
            // action
        }
    }
}`}
            language="swift"
          />
        </section>
      </div>
    </div>
  );
}
