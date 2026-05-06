(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{"use strict";let r=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,r],89664)},8734,e=>{"use strict";let r=(0,e.i(56420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,r],8734)},61939,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(89664),s=e.i(8734),o=e.i(46932),i=e.i(88653),l=e.i(45060);e.s(["CodeBlock",0,function({code:e,language:n="tsx",filename:d,className:c}){let[p,g]=(0,t.useState)(!1),b=async()=>{await navigator.clipboard.writeText(e.trim()),g(!0),setTimeout(()=>g(!1),2e3)};return(0,r.jsxs)("div",{className:(0,l.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",c),children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsxs)("div",{className:"flex gap-1.5",children:[(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),d&&(0,r.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:d})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:n}),(0,r.jsx)("button",{onClick:b,className:(0,l.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",p?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,r.jsx)(i.AnimatePresence,{mode:"wait",initial:!1,children:p?(0,r.jsxs)(o.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,r.jsxs)(o.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,r.jsx)("code",{children:e.trim()})})})]})}])},64147,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(46932),s=e.i(61939),o=e.i(45060);let i={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},l={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:n}){let[d,c]=(0,t.useState)("react"),p=["react","html","swift",...e.macos?["macos"]:[]],g=e[d]??e.swift;return(0,r.jsxs)("div",{className:(0,o.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",n),children:[(0,r.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:p.map(e=>(0,r.jsxs)("button",{onClick:()=>c(e),className:(0,o.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",d===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[d===e&&(0,r.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),i[e]]},e))}),(0,r.jsx)(s.CodeBlock,{code:g.code,language:l[d],filename:g.filename,className:"rounded-none border-0"})]})}])},46017,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(46513);let s=(0,e.i(56420).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var o=e.i(45060);e.s(["ComponentPreview",0,function({children:e,label:i,className:l,dark:n,grid:d}){let[c,p]=(0,t.useState)("desktop");return(0,r.jsxs)("div",{className:(0,o.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",l),children:[(0,r.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[i?(0,r.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:i}):(0,r.jsx)("span",{}),(0,r.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:a.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:s,ariaLabel:"Mobile preview"}].map(({value:e,Icon:t,ariaLabel:a})=>(0,r.jsx)("button",{onClick:()=>p(e),"aria-label":a,className:(0,o.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",c===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,r.jsx)(t,{className:"w-3.5 h-3.5"})},e))})]}),(0,r.jsx)("div",{className:(0,o.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===c?"p-6":"p-10",n?"bg-neutral-950":"bg-[rgb(var(--background))]",d&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,r.jsx)("div",{className:(0,o.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===c&&"max-w-[390px]"),children:e})})]})}],46017)},52953,e=>{"use strict";var r=e.i(43476),t=e.i(45060);e.s(["PageHeader",0,function({title:e,description:a,badge:s,className:o}){return(0,r.jsxs)("div",{className:(0,t.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",o),children:[s&&(0,r.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,r.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,r.jsx)("h1",{className:"mb-2.5",children:e}),(0,r.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},62368,e=>{"use strict";let r=(0,e.i(56420).default)("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]);e.s(["Download",0,r],62368)},25981,e=>{"use strict";let r=(0,e.i(56420).default)("upload",[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]]);e.s(["Upload",0,r],25981)},92572,e=>{"use strict";var r=e.i(43476),t=e.i(52953),a=e.i(46017),s=e.i(64147),o=e.i(71645),i=e.i(25981),l=e.i(62368);let n={react:{filename:"ImportExport.tsx",code:`"use client";

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
}`},html:{filename:"import-export.html",code:`<!-- Import drop zone -->
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
</style>`},swift:{filename:"ImportExportView.swift",code:`import SwiftUI
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

enum ImportPhase { case idle, uploading, processing, results }`},macos:{filename:"ImportExportView.swift",code:`// macOS export flow — field selection + format picker

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
}`}};e.s(["default",0,function(){let[e,d]=(0,o.useState)("idle"),[c,p]=(0,o.useState)(!1),[g,b]=(0,o.useState)("import"),[x,m]=(0,o.useState)("csv"),[u,v]=(0,o.useState)(new Set(["name","company","status","date","salary"]));function f(){d("uploading"),setTimeout(()=>{d("processing"),setTimeout(()=>d("results"),1500)},1e3)}return(0,r.jsxs)("div",{children:[(0,r.jsx)(t.PageHeader,{title:"Import / Export",description:"A data import flow with a glass-surfaced drop zone, progress states, and results summary — plus a structured export flow with format and field selection.",badge:"New"}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Demo"}),(0,r.jsx)(a.ComponentPreview,{children:(0,r.jsxs)("div",{style:{padding:24,maxWidth:480,margin:"0 auto"},children:[(0,r.jsx)("div",{style:{display:"flex",gap:2,marginBottom:20,padding:3,borderRadius:8,background:"rgb(var(--surface-raised))",border:"1px solid rgb(var(--border))",width:"fit-content"},children:["import","export"].map(e=>(0,r.jsx)("button",{onClick:()=>b(e),style:{padding:"5px 16px",borderRadius:6,fontSize:13,fontWeight:500,border:"none",cursor:"pointer",background:g===e?"rgb(var(--accent))":"transparent",color:g===e?"#fff":"rgb(var(--text-secondary))",textTransform:"capitalize",transition:"all 0.15s"},children:e},e))}),"import"===g&&(0,r.jsxs)(r.Fragment,{children:["idle"===e&&(0,r.jsxs)("div",{onDragOver:e=>{e.preventDefault(),p(!0)},onDragLeave:()=>p(!1),onDrop:e=>{e.preventDefault(),p(!1),f()},onClick:f,style:{border:`2px dashed ${c?"rgb(var(--accent))":"rgb(var(--border))"}`,borderRadius:12,padding:"40px 24px",textAlign:"center",cursor:"pointer",background:c?"rgb(var(--accent) / 0.06)":"rgb(var(--surface))",backdropFilter:c?"blur(8px) saturate(160%)":"none",boxShadow:c?"inset 0 1px 0 rgba(255,255,255,0.08)":"none",transition:"background 0.15s, border-color 0.15s"},children:[(0,r.jsx)(i.Upload,{size:32,style:{margin:"0 auto 12px",display:"block",color:c?"rgb(var(--accent))":"rgb(var(--text-tertiary))"}}),(0,r.jsx)("p",{style:{fontWeight:600,marginBottom:6},children:c?"Drop to import":"Drop file here or click to browse"}),(0,r.jsx)("p",{style:{fontSize:13,color:"rgb(var(--text-tertiary))"},children:"Supports CSV and JSON — up to 50 MB"})]}),("uploading"===e||"processing"===e)&&(0,r.jsxs)("div",{style:{textAlign:"center",padding:"40px 24px"},children:[(0,r.jsx)("p",{style:{fontWeight:600,marginBottom:16},children:"uploading"===e?"Uploading…":"Processing rows…"}),(0,r.jsx)("div",{style:{height:6,borderRadius:99,background:"rgb(var(--progress-track))",overflow:"hidden"},children:(0,r.jsx)("div",{style:{height:"100%",width:"uploading"===e?"40%":"85%",borderRadius:99,background:"rgb(var(--accent))",transition:"width 1s ease-in-out"}})})]}),"results"===e&&(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[(0,r.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:10},children:[{label:"Imported",value:142,c:"var(--status-success)"},{label:"Skipped",value:3,c:"var(--status-warning)"},{label:"Errors",value:3,c:"var(--status-danger)"}].map(e=>(0,r.jsxs)("div",{style:{padding:12,borderRadius:8,background:"rgb(var(--surface))",border:"1px solid rgb(var(--border))",textAlign:"center"},children:[(0,r.jsx)("div",{style:{fontSize:22,fontWeight:700,color:`rgb(${e.c})`,fontVariantNumeric:"tabular-nums"},children:e.value}),(0,r.jsx)("div",{style:{fontSize:11,color:"rgb(var(--text-tertiary))",marginTop:2},children:e.label})]},e.label))}),(0,r.jsxs)("div",{style:{borderRadius:8,border:"1px solid rgb(var(--border))",overflow:"hidden"},children:[(0,r.jsx)("div",{style:{padding:"7px 12px",background:"rgb(var(--surface-raised))",borderBottom:"1px solid rgb(var(--border))",fontSize:11,fontWeight:600,color:"rgb(var(--text-tertiary))"},children:"Errors (3)"}),[{row:17,reason:"Missing required field: company"},{row:45,reason:"Invalid date format"},{row:98,reason:"Duplicate entry"}].map(e=>(0,r.jsxs)("div",{style:{display:"flex",gap:12,alignItems:"center",padding:"8px 12px",borderBottom:"1px solid rgb(var(--border-subtle))",fontSize:12},children:[(0,r.jsxs)("span",{style:{color:"rgb(var(--text-tertiary))",fontVariantNumeric:"tabular-nums",flexShrink:0,width:48},children:["Row ",e.row]}),(0,r.jsx)("span",{style:{color:"rgb(var(--status-danger))"},children:e.reason})]},e.row))]}),(0,r.jsx)("button",{onClick:()=>d("idle"),style:{alignSelf:"flex-start",padding:"7px 14px",borderRadius:8,border:"1px solid rgb(var(--border))",background:"rgb(var(--surface-raised))",cursor:"pointer",fontSize:13},children:"Import another file"})]})]}),"export"===g&&(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{style:{fontSize:12,fontWeight:600,marginBottom:8},children:"Format"}),(0,r.jsx)("div",{style:{display:"flex",gap:8},children:["csv","json"].map(e=>(0,r.jsx)("button",{onClick:()=>m(e),style:{padding:"7px 16px",borderRadius:8,fontSize:13,cursor:"pointer",background:x===e?"rgb(var(--accent))":"rgb(var(--surface-raised))",color:x===e?"#fff":"rgb(var(--text-primary))",border:`1px solid ${x===e?"rgb(var(--accent))":"rgb(var(--border))"}`,fontWeight:x===e?600:400,transition:"all 0.15s"},children:e.toUpperCase()},e))})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{style:{fontSize:12,fontWeight:600,marginBottom:8},children:"Fields to include"}),(0,r.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:6},children:["name","company","status","date","salary","notes","tags"].map(e=>(0,r.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},children:[(0,r.jsx)("input",{type:"checkbox",checked:u.has(e),onChange:()=>{v(r=>{let t=new Set(r);return t.has(e)?t.delete(e):t.add(e),t})},style:{width:15,height:15,accentColor:"rgb(var(--accent))"}}),(0,r.jsx)("span",{style:{fontSize:13,textTransform:"capitalize"},children:e})]},e))})]}),(0,r.jsxs)("button",{style:{display:"flex",alignItems:"center",gap:8,padding:"9px 18px",borderRadius:8,background:"rgb(var(--accent))",color:"#fff",border:"none",cursor:"pointer",fontSize:14,fontWeight:600,alignSelf:"flex-start"},children:[(0,r.jsx)(l.Download,{size:15}),"Export ",u.size," fields as ",x.toUpperCase()]})]})]})})]}),(0,r.jsxs)("section",{className:"mb-10 mt-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Import flow states"}),(0,r.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5",children:(0,r.jsxs)("table",{className:"w-full text-[13px]",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:[(0,r.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:"Phase"}),(0,r.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:"UI"})]})}),(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Idle"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Drop zone with dashed border, upload icon, format hint"})]}),(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Drag over"}),(0,r.jsxs)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:["Glass surface activates: ",(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"backdrop-filter"}),", accent border, specular top edge"]})]}),(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Uploading"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Progress bar at ~40%, “Uploading…” label"})]}),(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Processing"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Progress bar at ~85%, “Processing rows…” label"})]}),(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Results"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"3-tile summary (imported / skipped / errors) + scrollable error table"})]})]})]})})]}),(0,r.jsxs)("section",{className:"mb-10",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Drop zone glass behaviour"}),(0,r.jsxs)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed",children:["The drop zone uses ",(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"backdrop-filter: blur(8px) saturate(160%)"})," and a specular inset highlight (",(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"inset 0 1px 0 rgba(255,255,255,0.08)"}),") when a file is dragged over it. This is the same Liquid Glass treatment used on the Feature Gate overlay and the Context Menu — the brightening mimics ",(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"sfBrandLitSurface"}),"."]}),(0,r.jsxs)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed",children:["Apply ",(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"@media (prefers-reduced-transparency)"})," fallback: replace the backdrop filter with a solid accent-tinted background."]})]}),(0,r.jsxs)("section",{className:"mb-10",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Implementation"}),(0,r.jsx)(s.PlatformTabs,{code:n})]})]})}])}]);