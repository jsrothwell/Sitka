"use client";

import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { useState } from "react";
import { Upload, Download, FileText, AlertCircle, CheckCircle2, X } from "lucide-react";

const CODE = {
  react: {
    filename: "ImportExport.tsx",
    code: `"use client";

import { useState, useRef, DragEvent } from "react";
import { Upload, Download } from "lucide-react";

// ── Import Flow ────────────────────────────────────────────────

type ImportPhase = "idle" | "uploading" | "processing" | "results";

interface ImportResult {
  imported: number;
  skipped: number;
  errors: Array<{ row: number; reason: string }>;
}

export function ImportFlow({ onComplete }: { onComplete?: (result: ImportResult) => void }) {
  const [phase, setPhase] = useState<ImportPhase>("idle");
  const [isDragOver, setIsDragOver] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setPhase("uploading");
    // Simulate processing
    setTimeout(() => {
      setPhase("processing");
      setTimeout(() => {
        const mockResult: ImportResult = {
          imported: 142,
          skipped: 3,
          errors: [
            { row: 17, reason: "Missing required field: company" },
            { row: 45, reason: "Invalid date format" },
            { row: 98, reason: "Duplicate entry" },
          ],
        };
        setResult(mockResult);
        setPhase("results");
        onComplete?.(mockResult);
      }, 1500);
    }, 1000);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  if (phase === "idle") {
    return (
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: \`2px dashed \${isDragOver ? "rgb(var(--accent))" : "rgb(var(--border))"}\`,
          borderRadius: 12,
          padding: "40px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: isDragOver
            ? "rgb(var(--accent) / 0.06)"
            : "rgb(var(--surface))",
          // Glass specular on drag-over
          boxShadow: isDragOver ? "inset 0 1px 0 rgba(255,255,255,0.08)" : "none",
          transition: "background 0.15s, border-color 0.15s",
          backdropFilter: isDragOver ? "blur(8px)" : "none",
        }}
      >
        <input ref={inputRef} type="file" accept=".csv,.json" style={{ display: "none" }}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

        <Upload size={32} style={{ margin: "0 auto 12px", color: isDragOver ? "rgb(var(--accent))" : "rgb(var(--text-tertiary))" }} />
        <p style={{ fontWeight: 600, marginBottom: 4 }}>
          {isDragOver ? "Drop to import" : "Drop file here or click to browse"}
        </p>
        <p style={{ fontSize: 13, color: "rgb(var(--text-tertiary))" }}>
          Supports CSV and JSON — up to 50 MB
        </p>
      </div>
    );
  }

  if (phase === "uploading" || phase === "processing") {
    return (
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <p style={{ fontWeight: 600, marginBottom: 16 }}>
          {phase === "uploading" ? "Uploading…" : "Processing rows…"}
        </p>
        <div style={{ height: 6, borderRadius: 99, background: "rgb(var(--progress-track))", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: phase === "uploading" ? "40%" : "85%",
            borderRadius: 99,
            background: "rgb(var(--accent))",
            transition: "width 1s ease-in-out",
          }} />
        </div>
      </div>
    );
  }

  if (phase === "results" && result) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { label: "Imported", value: result.imported, color: "rgb(var(--status-success))" },
            { label: "Skipped", value: result.skipped, color: "rgb(var(--status-warning))" },
            { label: "Errors", value: result.errors.length, color: "rgb(var(--status-danger))" },
          ].map((s) => (
            <div key={s.label} style={{ padding: "12px", borderRadius: 8, background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color, fontVariantNumeric: "tabular-nums" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Error table */}
        {result.errors.length > 0 && (
          <div style={{ borderRadius: 8, border: "1px solid rgb(var(--border))", overflow: "hidden" }}>
            <div style={{ padding: "8px 12px", background: "rgb(var(--surface-raised))", borderBottom: "1px solid rgb(var(--border))", fontSize: 11, fontWeight: 600, color: "rgb(var(--text-tertiary))" }}>
              Errors ({result.errors.length})
            </div>
            {result.errors.map((err) => (
              <div key={err.row} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 12px", borderBottom: "1px solid rgb(var(--border-subtle))", fontSize: 12 }}>
                <span style={{ color: "rgb(var(--text-tertiary))", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>Row {err.row}</span>
                <span style={{ color: "rgb(var(--status-danger))" }}>{err.reason}</span>
              </div>
            ))}
          </div>
        )}

        <button onClick={() => { setPhase("idle"); setResult(null); }} style={{ alignSelf: "flex-start", padding: "8px 16px", borderRadius: 8, border: "1px solid rgb(var(--border))", background: "rgb(var(--surface-raised))", cursor: "pointer", fontSize: 13 }}>
          Import another file
        </button>
      </div>
    );
  }

  return null;
}

// ── Export Flow ────────────────────────────────────────────────

type ExportFormat = "csv" | "json";

export function ExportFlow() {
  const [format, setFormat] = useState<ExportFormat>("csv");
  const allFields = ["name", "company", "status", "date", "salary", "notes", "tags"];
  const [selected, setSelected] = useState<Set<string>>(new Set(allFields.slice(0, 5)));

  function toggleField(f: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Format picker */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Format</p>
        <div style={{ display: "flex", gap: 8 }}>
          {(["csv", "json"] as ExportFormat[]).map((f) => (
            <button key={f} onClick={() => setFormat(f)} style={{
              padding: "7px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer",
              background: format === f ? "rgb(var(--accent))" : "rgb(var(--surface-raised))",
              color: format === f ? "#fff" : "rgb(var(--text-primary))",
              border: \`1px solid \${format === f ? "rgb(var(--accent))" : "rgb(var(--border))"}\`,
              fontWeight: format === f ? 600 : 400,
              transition: "all 0.15s",
            }}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Field selection */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Fields to include</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {allFields.map((field) => (
            <label key={field} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input type="checkbox" checked={selected.has(field)} onChange={() => toggleField(field)} style={{ width: 15, height: 15, accentColor: "rgb(var(--accent))" }} />
              <span style={{ fontSize: 13, textTransform: "capitalize" }}>{field}</span>
            </label>
          ))}
        </div>
      </div>

      <button style={{
        display: "flex", alignItems: "center", gap: 8, padding: "9px 18px",
        borderRadius: 8, background: "rgb(var(--accent))", color: "#fff",
        border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, alignSelf: "flex-start",
      }}>
        <Download size={15} />
        Export {selected.size} fields as {format.toUpperCase()}
      </button>
    </div>
  );
}`,
  },
  html: {
    filename: "import-export.html",
    code: `<!-- Import drop zone -->
<div class="drop-zone" id="dropZone">
  <input type="file" id="fileInput" accept=".csv,.json" style="display:none">
  <!-- Upload icon (SVG) -->
  <p class="drop-zone__label">Drop file here or click to browse</p>
  <p class="drop-zone__hint">Supports CSV and JSON — up to 50 MB</p>
</div>

<!-- Active drag-over state: add class 'drop-zone--active' -->

<!-- Progress indicator (shown during upload/processing) -->
<div class="import-progress" style="display:none">
  <p>Processing rows…</p>
  <div class="progress-track"><div class="progress-fill" style="width:85%"></div></div>
</div>

<!-- Results summary (shown after processing) -->
<div class="import-results" style="display:none">
  <div class="import-summary">
    <div class="import-stat import-stat--success"><span>142</span> Imported</div>
    <div class="import-stat import-stat--warning"><span>3</span> Skipped</div>
    <div class="import-stat import-stat--danger"><span>3</span> Errors</div>
  </div>
  <table class="error-table">
    <thead><tr><th>Row</th><th>Reason</th></tr></thead>
    <tbody>
      <tr><td>17</td><td>Missing required field: company</td></tr>
    </tbody>
  </table>
</div>

<style>
.drop-zone {
  border: 2px dashed rgb(var(--border));
  border-radius: 12px;
  padding: 40px 24px;
  text-align: center;
  cursor: pointer;
  background: rgb(var(--surface));
  transition: background 0.15s, border-color 0.15s;
}
.drop-zone--active {
  border-color: rgb(var(--accent));
  background: rgb(var(--accent) / 0.06);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
}
.import-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.error-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.error-table td { padding: 8px 12px; border-bottom: 1px solid rgb(var(--border-subtle)); }
</style>`,
  },
  swift: {
    filename: "ImportExportView.swift",
    code: `import SwiftUI
import UniformTypeIdentifiers

// Mirrors Warren's ImportExportSettingsView and JobFlo's ImportJobsView

struct ImportFlow: View {
    @State private var phase: ImportPhase = .idle
    @State private var isDragOver = false
    @State private var result: ImportResult? = nil

    var body: some View {
        switch phase {
        case .idle:
            dropZone
        case .uploading, .processing:
            progressView
        case .results:
            resultsView
        }
    }

    private var dropZone: some View {
        VStack(spacing: 12) {
            Image(systemName: "arrow.up.doc.fill")
                .font(.system(size: 32))
                .foregroundStyle(isDragOver ? .sfBrand(.accent) : .sfTextTertiary)

            Text(isDragOver ? "Drop to import" : "Drop file here or click to browse")
                .font(.system(size: 14, weight: .semibold))

            Text("Supports CSV and JSON — up to 50 MB")
                .font(.system(size: 12))
                .foregroundStyle(.sfTextTertiary)
        }
        .frame(maxWidth: .infinity)
        .padding(40)
        .background(
            isDragOver
                ? Color.sfBrand(.accent).opacity(0.06)
                : Color.sfSurface
        )
        .overlay {
            RoundedRectangle(cornerRadius: 12)
                .stroke(
                    isDragOver ? Color.sfBrand(.accent) : Color.sfBorder,
                    style: StrokeStyle(lineWidth: 2, dash: [6, 4])
                )
        }
        // Specular on drag-over (sfSpecularTopEdge equivalent)
        .overlay(alignment: .top) {
            if isDragOver {
                LinearGradient(colors: [.white.opacity(0.08), .clear], startPoint: .top, endPoint: .bottom)
                    .frame(height: 1)
            }
        }
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .onDrop(of: [.csv, .json], isTargeted: $isDragOver) { providers in
            // Handle dropped file
            loadFile(from: providers)
            return true
        }
        .fileImporter(isPresented: $showFilePicker, allowedContentTypes: [.csv, .json]) { result in
            handleFileResult(result)
        }
        .onTapGesture { showFilePicker = true }
    }

    private var progressView: some View {
        VStack(spacing: 16) {
            Text(phase == .uploading ? "Uploading…" : "Processing rows…")
                .font(.system(size: 14, weight: .semibold))

            ProgressView(value: phase == .uploading ? 0.4 : 0.85)
                .progressViewStyle(.linear)
                .tint(.sfBrand(.accent))
        }
        .padding(40)
    }

    @ViewBuilder
    private var resultsView: some View {
        if let result {
            VStack(alignment: .leading, spacing: 16) {
                HStack(spacing: 10) {
                    ImportStat(value: result.imported, label: "Imported", status: .success)
                    ImportStat(value: result.skipped,  label: "Skipped",  status: .warning)
                    ImportStat(value: result.errors.count, label: "Errors", status: .danger)
                }

                if !result.errors.isEmpty {
                    ErrorTable(errors: result.errors)
                }

                Button("Import another file") { phase = .idle }
                    .buttonStyle(.bordered)
            }
        }
    }
}

enum ImportPhase { case idle, uploading, processing, results }`,
  },
  macos: {
    filename: "ImportExportView.swift",
    code: `// macOS export flow — field selection + format picker

struct ExportFlow: View {
    @State private var format: ExportFormat = .csv
    @State private var selectedFields: Set<ExportField> = ExportField.defaultSet

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Format picker
            VStack(alignment: .leading, spacing: 8) {
                Text("Format").font(.system(size: 12, weight: .semibold))
                Picker("Format", selection: $format) {
                    Text("CSV").tag(ExportFormat.csv)
                    Text("JSON").tag(ExportFormat.json)
                }
                .pickerStyle(.segmented)
                .fixedSize()
            }

            // Field selection
            VStack(alignment: .leading, spacing: 8) {
                Text("Fields to include").font(.system(size: 12, weight: .semibold))
                ForEach(ExportField.allCases) { field in
                    Toggle(field.label, isOn: Binding(
                        get: { selectedFields.contains(field) },
                        set: { if $0 { selectedFields.insert(field) } else { selectedFields.remove(field) } }
                    ))
                    .toggleStyle(.checkbox)
                }
            }

            Button {
                exportData()
            } label: {
                Label("Export \\(selectedFields.count) fields as \\(format.label)", systemImage: "arrow.down.doc")
            }
            .buttonStyle(.borderedProminent)
            .tint(.sfBrand(.accent))
        }
    }
}

enum ExportFormat: String, CaseIterable {
    case csv, json
    var label: String { rawValue.uppercased() }
}`,
  },
};

export default function ImportExportPage() {
  const [phase, setPhase] = useState<"idle" | "uploading" | "processing" | "results">("idle");
  const [isDragOver, setIsDragOver] = useState(false);
  const [tab, setTab] = useState<"import" | "export">("import");
  const [exportFormat, setExportFormat] = useState<"csv" | "json">("csv");
  const allFields = ["name", "company", "status", "date", "salary", "notes", "tags"];
  const [selectedFields, setSelectedFields] = useState(new Set(["name", "company", "status", "date", "salary"]));

  function simulateImport() {
    setPhase("uploading");
    setTimeout(() => { setPhase("processing"); setTimeout(() => setPhase("results"), 1500); }, 1000);
  }

  function toggleField(f: string) {
    setSelectedFields((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });
  }

  const ERRORS = [
    { row: 17, reason: "Missing required field: company" },
    { row: 45, reason: "Invalid date format" },
    { row: 98, reason: "Duplicate entry" },
  ];

  return (
    <div>
      <PageHeader
        title="Import / Export"
        description="A data import flow with a glass-surfaced drop zone, progress states, and results summary — plus a structured export flow with format and field selection."
        badge="New"
      />

      <section>
        <h2>Demo</h2>
        <ComponentPreview>
          <div style={{ padding: 24, maxWidth: 480, margin: "0 auto" }}>
            {/* Tab switcher */}
            <div style={{ display: "flex", gap: 2, marginBottom: 20, padding: 3, borderRadius: 8, background: "rgb(var(--surface-raised))", border: "1px solid rgb(var(--border))", width: "fit-content" }}>
              {(["import", "export"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: "5px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500,
                  border: "none", cursor: "pointer",
                  background: tab === t ? "rgb(var(--accent))" : "transparent",
                  color: tab === t ? "#fff" : "rgb(var(--text-secondary))",
                  textTransform: "capitalize",
                  transition: "all 0.15s",
                }}>
                  {t}
                </button>
              ))}
            </div>

            {tab === "import" && (
              <>
                {phase === "idle" && (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragOver(false); simulateImport(); }}
                    onClick={simulateImport}
                    style={{
                      border: `2px dashed ${isDragOver ? "rgb(var(--accent))" : "rgb(var(--border))"}`,
                      borderRadius: 12, padding: "40px 24px", textAlign: "center", cursor: "pointer",
                      background: isDragOver ? "rgb(var(--accent) / 0.06)" : "rgb(var(--surface))",
                      backdropFilter: isDragOver ? "blur(8px) saturate(160%)" : "none",
                      boxShadow: isDragOver ? "inset 0 1px 0 rgba(255,255,255,0.08)" : "none",
                      transition: "background 0.15s, border-color 0.15s",
                    }}
                  >
                    <Upload size={32} style={{ margin: "0 auto 12px", display: "block", color: isDragOver ? "rgb(var(--accent))" : "rgb(var(--text-tertiary))" }} />
                    <p style={{ fontWeight: 600, marginBottom: 6 }}>{isDragOver ? "Drop to import" : "Drop file here or click to browse"}</p>
                    <p style={{ fontSize: 13, color: "rgb(var(--text-tertiary))" }}>Supports CSV and JSON — up to 50 MB</p>
                  </div>
                )}

                {(phase === "uploading" || phase === "processing") && (
                  <div style={{ textAlign: "center", padding: "40px 24px" }}>
                    <p style={{ fontWeight: 600, marginBottom: 16 }}>{phase === "uploading" ? "Uploading…" : "Processing rows…"}</p>
                    <div style={{ height: 6, borderRadius: 99, background: "rgb(var(--progress-track))", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: phase === "uploading" ? "40%" : "85%", borderRadius: 99, background: "rgb(var(--accent))", transition: "width 1s ease-in-out" }} />
                    </div>
                  </div>
                )}

                {phase === "results" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                      {[{ label: "Imported", value: 142, c: "var(--status-success)" }, { label: "Skipped", value: 3, c: "var(--status-warning)" }, { label: "Errors", value: 3, c: "var(--status-danger)" }].map((s) => (
                        <div key={s.label} style={{ padding: 12, borderRadius: 8, background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))", textAlign: "center" }}>
                          <div style={{ fontSize: 22, fontWeight: 700, color: `rgb(${s.c})`, fontVariantNumeric: "tabular-nums" }}>{s.value}</div>
                          <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 2 }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderRadius: 8, border: "1px solid rgb(var(--border))", overflow: "hidden" }}>
                      <div style={{ padding: "7px 12px", background: "rgb(var(--surface-raised))", borderBottom: "1px solid rgb(var(--border))", fontSize: 11, fontWeight: 600, color: "rgb(var(--text-tertiary))" }}>Errors (3)</div>
                      {ERRORS.map((err) => (
                        <div key={err.row} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 12px", borderBottom: "1px solid rgb(var(--border-subtle))", fontSize: 12 }}>
                          <span style={{ color: "rgb(var(--text-tertiary))", fontVariantNumeric: "tabular-nums", flexShrink: 0, width: 48 }}>Row {err.row}</span>
                          <span style={{ color: "rgb(var(--status-danger))" }}>{err.reason}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setPhase("idle")} style={{ alignSelf: "flex-start", padding: "7px 14px", borderRadius: 8, border: "1px solid rgb(var(--border))", background: "rgb(var(--surface-raised))", cursor: "pointer", fontSize: 13 }}>
                      Import another file
                    </button>
                  </div>
                )}
              </>
            )}

            {tab === "export" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Format</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    {(["csv", "json"] as const).map((f) => (
                      <button key={f} onClick={() => setExportFormat(f)} style={{
                        padding: "7px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer",
                        background: exportFormat === f ? "rgb(var(--accent))" : "rgb(var(--surface-raised))",
                        color: exportFormat === f ? "#fff" : "rgb(var(--text-primary))",
                        border: `1px solid ${exportFormat === f ? "rgb(var(--accent))" : "rgb(var(--border))"}`,
                        fontWeight: exportFormat === f ? 600 : 400,
                        transition: "all 0.15s",
                      }}>{f.toUpperCase()}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Fields to include</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {allFields.map((field) => (
                      <label key={field} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <input type="checkbox" checked={selectedFields.has(field)} onChange={() => toggleField(field)} style={{ width: 15, height: 15, accentColor: "rgb(var(--accent))" }} />
                        <span style={{ fontSize: 13, textTransform: "capitalize" }}>{field}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "9px 18px",
                  borderRadius: 8, background: "rgb(var(--accent))", color: "#fff",
                  border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, alignSelf: "flex-start",
                }}>
                  <Download size={15} />
                  Export {selectedFields.size} fields as {exportFormat.toUpperCase()}
                </button>
              </div>
            )}
          </div>
        </ComponentPreview>
      </section>

      <section>
        <h2>Import flow states</h2>
        <table>
          <thead>
            <tr><th>Phase</th><th>UI</th></tr>
          </thead>
          <tbody>
            <tr><td>Idle</td><td>Drop zone with dashed border, upload icon, format hint</td></tr>
            <tr><td>Drag over</td><td>Glass surface activates: <code>backdrop-filter</code>, accent border, specular top edge</td></tr>
            <tr><td>Uploading</td><td>Progress bar at ~40%, "Uploading…" label</td></tr>
            <tr><td>Processing</td><td>Progress bar at ~85%, "Processing rows…" label</td></tr>
            <tr><td>Results</td><td>3-tile summary (imported / skipped / errors) + scrollable error table</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Drop zone glass behaviour</h2>
        <p>
          The drop zone uses <code>backdrop-filter: blur(8px) saturate(160%)</code> and a specular
          inset highlight (<code>inset 0 1px 0 rgba(255,255,255,0.08)</code>) when a file is dragged
          over it. This is the same Liquid Glass treatment used on the Feature Gate overlay and the
          Context Menu — the brightening mimics <code>sfBrandLitSurface</code>.
        </p>
        <p>
          Apply <code>@media (prefers-reduced-transparency)</code> fallback: replace the backdrop
          filter with a solid accent-tinted background.
        </p>
      </section>

      <section>
        <h2>Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>
    </div>
  );
}
