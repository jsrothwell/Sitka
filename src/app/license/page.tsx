import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";

export const metadata: Metadata = { title: "License" };

export default function LicensePage() {
  return (
    <div>
      <PageHeader
        title="License"
        description="Sitka Design System is released under the MIT License."
      />

      <div className="space-y-10">

        {/* License text */}
        <section className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-6">
          <pre className="text-[13px] text-[rgb(var(--text-secondary))] font-mono leading-relaxed whitespace-pre-wrap">
{`MIT License

Copyright (c) 2025 Jamieson Rothwell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
          </pre>
        </section>

        {/* Plain-language summary */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">What this means</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                heading: "You can",
                color: "text-emerald-400",
                items: [
                  "Use Sitka in personal and commercial projects",
                  "Modify the source code",
                  "Distribute copies of the software",
                  "Sublicense to others",
                  "Use privately without disclosing source",
                ],
              },
              {
                heading: "You must",
                color: "text-amber-400",
                items: [
                  "Include the original copyright notice",
                  "Include this license text in any distribution",
                ],
              },
            ].map(({ heading, color, items }) => (
              <div key={heading} className="rounded-xl border border-[rgb(var(--border))] p-5">
                <h3 className={`text-[12px] font-semibold uppercase tracking-wider mb-3 ${color}`}>{heading}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2 text-[13px] text-[rgb(var(--text-secondary))]">
                      <span className={`${color} mt-0.5 shrink-0`}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Third-party */}
        <section>
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Third-party acknowledgements</h2>
          <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
            Sitka is built on open-source dependencies. Their respective licenses apply to their source code.
          </p>
          <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                  {["Package", "License", "Use"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Next.js",         "MIT", "Web framework"],
                  ["React",           "MIT", "UI rendering"],
                  ["Tailwind CSS",    "MIT", "Utility styling"],
                  ["Framer Motion",   "MIT", "Animation"],
                  ["Lucide React",    "ISC", "Icons"],
                  ["Style Dictionary","Apache 2.0", "Token pipeline"],
                  ["Inter",           "OFL 1.1", "Typeface"],
                ].map(([pkg, lic, use], i) => (
                  <tr key={pkg} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                    <td className="px-4 py-3 font-mono text-[12px] text-[rgb(var(--text-primary))]">{pkg}</td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{lic}</td>
                    <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
