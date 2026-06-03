"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

// ── Section types ──────────────────────────────────────────────────────────────
type SectionKind = "experience" | "education" | "skills" | "summary" | "projects" | "certifications" | "custom";

interface ResumeSection {
  id: string;
  kind: SectionKind;
  title: string;
  included: boolean;
  order: number;
}

const KIND_LABELS: Record<SectionKind, string> = {
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  summary: "Professional Summary",
  projects: "Projects",
  certifications: "Certifications",
  custom: "Custom Section",
};

const INITIAL_SECTIONS: ResumeSection[] = [
  { id: "1", kind: "summary", title: "Professional Summary", included: true, order: 0 },
  { id: "2", kind: "experience", title: "Work Experience", included: true, order: 1 },
  { id: "3", kind: "education", title: "Education", included: true, order: 2 },
  { id: "4", kind: "skills", title: "Core Skills", included: true, order: 3 },
  { id: "5", kind: "projects", title: "Key Projects", included: true, order: 4 },
  { id: "6", kind: "certifications", title: "Certifications", included: false, order: 5 },
  { id: "7", kind: "custom", title: "Additional Information", included: false, order: 6 },
];

// ── Live demo ──────────────────────────────────────────────────────────────────
function DocumentAssemblerDemo() {
  const [sections, setSections] = useState<ResumeSection[]>(INITIAL_SECTIONS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const toggleIncluded = (id: string) => {
    setSections(prev => prev.map(s =>
      s.id === id ? { ...s, included: !s.included } : s
    ));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setSections(prev => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next.map((s, i) => ({ ...s, order: i }));
    });
  };

  const moveDown = (index: number) => {
    setSections(prev => {
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next.map((s, i) => ({ ...s, order: i }));
    });
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 1800);
  };

  const included = sections.filter(s => s.included).sort((a, b) => a.order - b.order);

  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden" style={{ maxWidth: 480 }}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[rgb(var(--text-primary))]">Document Assembler</span>
        <span className="text-[11px] text-[rgb(var(--text-tertiary))]">
          {included.length} of {sections.length} sections
        </span>
      </div>

      {/* Section checklist */}
      <div className="p-3 space-y-1.5">
        {sections.map((s, idx) => (
          <div
            key={s.id}
            className={[
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer",
              selectedId === s.id
                ? "bg-[rgb(var(--accent-muted))]"
                : s.included
                  ? "bg-[rgb(var(--surface-raised))]"
                  : "opacity-50",
            ].join(" ")}
            onClick={() => setSelectedId(s.id === selectedId ? null : s.id)}
          >
            {/* Checkbox */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleIncluded(s.id); }}
              className={[
                "w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all",
                s.included
                  ? "bg-[rgb(var(--accent))] border-[rgb(var(--accent))]"
                  : "border-[rgb(var(--border))]",
              ].join(" ")}
            >
              {s.included && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            {/* Kind indicator */}
            <div className="w-6 h-6 rounded-lg bg-[rgb(var(--surface-hover))] flex items-center justify-center shrink-0">
              <span className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">
                {s.kind.slice(0, 2).toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <span className="text-[13px] font-medium text-[rgb(var(--text-primary))] flex-1">{s.title}</span>

            {/* Order controls */}
            {s.included && (
              <div className="flex gap-0.5">
                <button
                  onClick={(e) => { e.stopPropagation(); moveUp(idx); }}
                  disabled={idx === 0}
                  className="w-5 h-5 rounded flex items-center justify-center text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); moveDown(idx); }}
                  disabled={idx === sections.length - 1}
                  className="w-5 h-5 rounded flex items-center justify-center text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] disabled:opacity-30"
                >
                  ↓
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Preview summary */}
      {selectedId && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border-subtle))]">
          <div className="text-[11px] text-[rgb(var(--text-tertiary))] uppercase tracking-wider mb-1">Section details</div>
          {(() => {
            const s = sections.find(x => x.id === selectedId);
            if (!s) return null;
            return (
              <div className="text-[13px] text-[rgb(var(--text-secondary))] space-y-1">
                <div><span className="text-[rgb(var(--text-primary))]">Kind:</span> {KIND_LABELS[s.kind]}</div>
                <div><span className="text-[rgb(var(--text-primary))]">Included:</span> {s.included ? "Yes" : "No"}</div>
                <div><span className="text-[rgb(var(--text-primary))]">Position:</span> #{s.order + 1}</div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Export button */}
      <div className="p-3 border-t border-[rgb(var(--border))]">
        <button
          onClick={handleExport}
          className="w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-center gap-2"
          style={{
            background: exporting ? "var(--surface-hover)" : "rgb(var(--accent))",
            color: exporting ? "rgb(var(--text-secondary))" : "white",
          }}
        >
          {exporting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Generating PDF…
            </>
          ) : (
            <>Export as PDF</>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Code samples ───────────────────────────────────────────────────────────────
const CODE = {
  swift: {
    filename: "DocumentAssemblerView.swift",
    code: `import SwiftUI

struct DocumentAssemblerView: View {
    @ObservedObject var assembler: ResumeAssembler
    var onExport: () -> Void

    var body: some View {
        List {
            ForEach(assembler.sections.sorted(by: { $0.order < $1.order })) { section in
                SectionRow(
                    section: section,
                    onToggle: { assembler.toggle(section) },
                    onMoveUp: { assembler.moveUp(section) },
                    onMoveDown: { assembler.moveDown(section) }
                )
            }
        }
        .navigationTitle("Document Sections")
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button(action: onExport) {
                    Label("Export PDF", systemImage: "doc.text.fill")
                }
            }
        }
    }
}

struct SectionRow: View {
    let section: ResumeSection
    let onToggle: () -> Void
    let onMoveUp: () -> Void
    let onMoveDown: () -> Void

    var body: some View {
        HStack {
            Button(action: onToggle) {
                Image(systemName: section.included ? "checkmark.square.fill" : "square")
                    .foregroundStyle(section.included ? Color.accentColor : .secondary)
            }
            .buttonStyle(.plain)

            VStack(alignment: .leading) {
                Text(section.title).font(.body)
                Text(section.kind.rawValue.capitalized)
                    .font(.caption).foregroundStyle(.secondary)
            }

            Spacer()

            if section.included {
                HStack(spacing: 4) {
                    Button(action: onMoveUp) {
                        Image(systemName: "chevron.up")
                    }.buttonStyle(.plain)
                    Button(action: onMoveDown) {
                        Image(systemName: "chevron.down")
                    }.buttonStyle(.plain)
                }
                .font(.caption).foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 4)
    }
}`,
  },
  macos: {
    filename: "ResumeExporter+macOS.swift",
    code: `import SwiftUI
import PDFKit

struct ResumeExporter {
    static func exportPDF(sections: [ResumeSection]) throws -> URL {
        let paper = PDFDocument()
        let page = PDFPage()
        page.setBounds(CGRect(x: 0, y: 0, width: 595, height: 842), for: .mediaBox)

        let renderer = ResumRenderer(sections: sections)
        let image = renderer.render(size: CGSize(width: 595, height: 842))
        page.setBackgroundImage(image)
        paper.insert(page, at: 0)

        let url = FileManager.default.temporaryDirectory
            .appendingPathComponent("resume_\\(UUID().uuidString).pdf")
        try paper.write(to: url)
        return url
    }
}

struct ResumeExporterSheet: View {
    let url: URL

    var body: some View {
        VStack(spacing: 20) {
            Text("Resume Ready")
                .font(.title2.bold())

            Text("Your document has been generated as a PDF.")
                .foregroundStyle(.secondary)

            HStack(spacing: 16) {
                Button("Save As…") {
                    let panel = NSSavePanel()
                    panel.allowedFileTypes = ["pdf"]
                    panel.nameFieldStringValue = "Resume.pdf"
                    panel.begin { result in
                        if result == .OK, let dest = panel.url {
                            try? FileManager.default.copyItem(at: url, to: dest)
                        }
                    }
                }

                Button("Done") { dismiss() }
                    .keyboardShortcut(.defaultAction)
            }
        }
        .padding(32)
        .frame(width: 360)
    }
}`,
  },
  react: {
    filename: "DocumentAssembler.tsx",
    code: `"use client";

import { useState, useCallback } from "react";

interface ResumeSection {
  id: string;
  kind: string;
  title: string;
  included: boolean;
  order: number;
}

export function DocumentAssembler({
  initialSections,
  onExport,
}: {
  initialSections: ResumeSection[];
  onExport: (sections: ResumeSection[]) => void;
}) {
  const [sections, setSections] = useState(initialSections);

  const toggle = useCallback((id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, included: !s.included } : s))
    );
  }, []);

  const reorder = useCallback((id: string, direction: -1 | 1) => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      const swap = idx + direction;
      if (swap < 0 || swap >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next.map((s, i) => ({ ...s, order: i }));
    });
  }, []);

  return (
    <div className="space-y-1">
      {sections.map((s) => (
        <div
          key={s.id}
          className={[
            "flex items-center gap-3 px-3 py-2 rounded-lg",
            s.included ? "bg-[rgb(var(--surface-raised))]" : "opacity-40",
          ].join(" ")}
        >
          <button
            onClick={() => toggle(s.id)}
            className="w-5 h-5 rounded flex items-center justify-center
              border border-[rgb(var(--border))]"
          >
            {s.included && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="rgb(var(--accent))"
                  strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
          <span className="text-[13px] flex-1">{s.title}</span>
          {s.included && (
            <div className="flex gap-1">
              <button onClick={() => reorder(s.id, -1)}
                className="px-1 text-[rgb(var(--text-tertiary))]">↑</button>
              <button onClick={() => reorder(s.id, 1)}
                className="px-1 text-[rgb(var(--text-tertiary))]">↓</button>
            </div>
          )}
        </div>
      ))}
      <button className="mt-3 px-4 py-2 rounded-xl bg-[rgb(var(--accent))]
        text-white text-[13px] font-semibold"
        onClick={() => onExport(sections)}>
        Export PDF
      </button>
    </div>
  );
}`,
  },
  html: {
    filename: "document-assembler.html",
    code: `<!-- Document Assembler — Sitka tokens -->
<div class="da-checklist">
  <div class="da-header">
    <span class="da-title">Document Sections</span>
    <span class="da-count">5 / 7</span>
  </div>

  <div class="da-items">
    <label class="da-item da-item--included">
      <input type="checkbox" checked />
      <span class="da-icon">EX</span>
      <span class="da-label">Professional Summary</span>
    </label>
    <label class="da-item da-item--included">
      <input type="checkbox" checked />
      <span class="da-icon">WE</span>
      <span class="da-label">Work Experience</span>
    </label>
    <label class="da-item">
      <input type="checkbox" />
      <span class="da-icon">CE</span>
      <span class="da-label">Certifications</span>
    </label>
  </div>

  <button class="da-export">Export as PDF</button>
</div>

<style>
.da-checklist {
  background: rgb(var(--surface-raised));
  border-radius: 16px;
  border: 1px solid rgb(var(--border));
  max-width: 420px;
}
.da-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; border-bottom: 1px solid rgb(var(--border));
}
.da-title  { font-size: 13px; font-weight: 600; color: rgb(var(--text-primary)); }
.da-count  { font-size: 11px; color: rgb(var(--text-tertiary)); }
.da-items  { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
.da-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: 10px; cursor: pointer;
  font-size: 13px; color: rgb(var(--text-primary));
}
.da-item--included { background: rgb(var(--surface)); }
.da-item input:checked + .da-icon {
  background: rgb(var(--accent)); color: white;
}
.da-icon {
  width: 24px; height: 24px; border-radius: 6px;
  background: rgb(var(--surface-hover));
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 700; color: rgb(var(--text-tertiary));
}
.da-export {
  display: block; width: calc(100% - 32px); margin: 12px 16px 16px;
  padding: 10px; border: none; border-radius: 12px;
  background: rgb(var(--accent)); color: white;
  font-size: 13px; font-weight: 600; cursor: pointer;
}
</style>`,
  },
};

// ── Main page ──────────────────────────────────────────────────────────────────
export default function DocumentAssemblerPage() {
  return (
    <div>
      <PageHeader
        title="Document Assembler & PDF Export"
        description="A block checklist pattern for assembling modular document sections — toggle visibility, reorder by drag or arrow buttons, and export to PDF using CTFramesetter. The assembler drives ResumeExporter which renders each section into an A4 page using Sitka accent colours for headings."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <DocumentAssemblerDemo />
        <p className="mt-3 text-[12px] text-[rgb(var(--text-tertiary))]">
          Click a row to see section details · toggle the checkbox to include/exclude · use arrows to reorder
        </p>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The assembler has four distinct layers that compose the final document.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Layer</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Responsibility</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Platform</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Output</th>
              </tr>
            </thead>
            <tbody>
              {[
                { layer: "Section Registry", responsibility: "Declares available block types (experience, education, skills, summary, projects, certifications, custom)", platform: "Shared model", output: "ResumeSection.swift struct" },
                { layer: "Assembler View", responsibility: "Checklist UI — toggle, reorder, preview summary, trigger export", platform: "iOS / macOS / Web", output: "DocumentAssemblerView" },
                { layer: "PDF Renderer", responsibility: "Iterates included sections, lays out content on A4 pages using CTFramesetter", platform: "Shared core", output: "single-page or multi-page PDF" },
                { layer: "Share / Save", responsibility: "Delivers the PDF to the user — ShareSheet on iOS, NSSavePanel on macOS", platform: "Platform-specific", output: "PDF file in chosen location" },
              ].map(row => (
                <tr key={row.layer} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.layer}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.responsibility}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.platform}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Design notes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Design notes</h2>
        <div className="space-y-3">
          {[
            { heading: "Every block is self-contained", body: "Each ResumeSection carries its own kind, title, included flag, and sort order. The assembler never mutates the source data — it produces an ordered array of references that the renderer consumes." },
            { heading: "Heading styles come from Sitka tokens", body: "Use the accent colour token for all H1/H2 headings in the rendered PDF. Body text uses neutral-600 at 11pt on light background. Keep line-height at 1.5 for readability." },
            { heading: "A4 first, US-Letter fallback", body: "Default page size is A4 (595 × 842 pt). For en-US users, detect locale and swap to US-Letter (612 × 792 pt). The CTFramesetter path handles both — only the page rect changes." },
            { heading: "Re-order by intent, not drag", body: "iOS: provide up/down chevrons in each row. macOS: support table-row drag reorder via onMove. Both should commit the order change immediately to the array source of truth." },
            { heading: "Export is a side effect", body: "The PDF generation is intentionally synchronous (CTFramesetter). For long documents (>20 sections) consider offloading to a background Task and showing a progress sheet." },
          ].map(({ heading, body }) => (
            <div key={heading} className="flex gap-3 text-[14px]">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              <div>
                <span className="font-medium text-[rgb(var(--text-primary))]">{heading} — </span>
                <span className="text-[rgb(var(--text-secondary))]">{body}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Privacy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Privacy & entitlements</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Key / Entitlement</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Platform</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: "com.apple.security.files.user-selected.read-write", platform: "macOS entitlement", notes: "Required for NSSavePanel to write PDF to user-chosen location." },
                { key: "UIFileSharingEnabled", platform: "iOS Info.plist", notes: "Not required for ShareLink path; only needed if writing to Documents/ directly." },
              ].map(row => (
                <tr key={row.key} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-primary))]">{row.key}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.platform}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Each section row must expose an accessibilityLabel combining kind + included state: 'Work Experience — included' or 'Certifications — excluded'.",
            "The toggle checkbox must have an accessibilityHint explaining the consequence: 'Toggle to include this section in the exported document'.",
            "The export button label must describe the action, not just the document type: 'Export resume as PDF' rather than 'Export'.",
            "The PDF output must carry embedded metadata with document title, author, and creation date so screen readers can announce it when opened in Preview or Books.",
          ].map(item => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
