"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { FileUpload } from "@/components/ui/FileUpload";

const PROPS = [
  {
    name: "accept",
    type: "string",
    description: 'MIME types or file extensions (e.g. "image/*" or ".pdf,.docx"). Passed to the native input\'s accept attribute.',
  },
  {
    name: "multiple",
    type: "boolean",
    default: "false",
    description: "Allows selecting more than one file.",
  },
  {
    name: "maxSize",
    type: "number",
    description: "Maximum file size in bytes. Files exceeding this are rejected with an inline error.",
  },
  {
    name: "onFilesChange",
    type: "(files: File[]) => void",
    description: "Called whenever the file list changes (add or remove).",
  },
  {
    name: "label",
    type: "string",
    description: "Visible label above the drop zone.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Supplemental hint inside the drop zone. Defaults to showing accept and maxSize constraints.",
  },
  {
    name: "error",
    type: "string",
    description: "External error message shown below the drop zone.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction and dims the control.",
  },
];

const CODE = {
  react: {
    filename: "FileUpload.tsx",
    code: `import { FileUpload } from "@/components/ui/FileUpload";

// Basic
<FileUpload
  label="Attachment"
  onFilesChange={(files) => console.log(files)}
/>

// Image only, max 5 MB
<FileUpload
  label="Profile photo"
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  onFilesChange={(files) => setPhoto(files[0])}
/>

// Multiple files
<FileUpload
  label="Documents"
  accept=".pdf,.docx"
  multiple
  helperText="PDF or Word, max 10 MB each"
  maxSize={10 * 1024 * 1024}
  onFilesChange={setDocs}
/>

// Error state
<FileUpload
  label="Resume"
  error="Please upload a PDF."
  accept=".pdf"
  onFilesChange={setResume}
/>`,
  },
  html: {
    filename: "file-upload.html",
    code: `<div>
  <label for="upload" style="font-size:12px; font-weight:500; color:rgb(var(--text-secondary));">
    Attachment
  </label>

  <div
    id="drop-zone"
    role="button"
    tabindex="0"
    aria-label="Upload files"
    ondragover="event.preventDefault(); this.classList.add('dragging')"
    ondragleave="this.classList.remove('dragging')"
    ondrop="handleDrop(event)"
    onclick="document.getElementById('upload').click()"
    style="
      border:2px dashed rgb(var(--border));
      border-radius:12px;
      padding:32px 24px;
      text-align:center;
      cursor:pointer;
    "
  >
    <input type="file" id="upload" class="sr-only" onchange="handleFiles(this.files)" />
    <p style="font-size:13px; font-weight:500;">Drop files here or click to browse</p>
    <p style="font-size:12px; color:rgb(var(--text-tertiary));">PDF, max 10 MB</p>
  </div>
</div>`,
  },
  swift: {
    filename: "FileUploadView.swift",
    code: `import SwiftUI
import UniformTypeIdentifiers

struct FileUploadView: View {
  @State private var isImporting = false
  @State private var files: [URL] = []

  var body: some View {
    VStack(spacing: 12) {
      Text("Documents")
        .font(.caption)
        .fontWeight(.medium)
        .foregroundStyle(.secondary)
        .frame(maxWidth: .infinity, alignment: .leading)

      Button {
        isImporting = true
      } label: {
        VStack(spacing: 8) {
          Image(systemName: "arrow.up.doc")
            .font(.title2)
            .foregroundStyle(.secondary)
          Text("Tap to browse")
            .font(.callout)
        }
        .frame(maxWidth: .infinity)
        .padding(32)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
          RoundedRectangle(cornerRadius: 12)
            .strokeBorder(style: StrokeStyle(lineWidth: 2, dash: [6]))
            .foregroundStyle(Color(.separator))
        )
      }
      .buttonStyle(.plain)
      .fileImporter(isPresented: $isImporting, allowedContentTypes: [.pdf]) { result in
        if let url = try? result.get() {
          files.append(url)
        }
      }

      ForEach(files, id: \\.self) { url in
        HStack {
          Image(systemName: "doc.fill").foregroundStyle(.accentColor)
          Text(url.lastPathComponent).font(.caption)
          Spacer()
        }
        .padding(8)
        .background(Color(.tertiarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 8))
      }
    }
  }
}`,
  },
};

function Demo() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="w-full max-w-sm">
      <FileUpload
        label="Attachments"
        accept=".pdf,.png,.jpg,.jpeg"
        multiple
        maxSize={5 * 1024 * 1024}
        helperText="PDF or images, max 5 MB each"
        onFilesChange={setFiles}
      />
      {files.length > 0 && (
        <p className="mt-3 text-[12px] text-[rgb(var(--text-tertiary))]">
          {files.length} file{files.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

export default function FileUploadPage() {
  return (
    <div>
      <PageHeader
        title="File Upload"
        description="A drag-and-drop zone with a fallback file browser. Validates file count, type (via accept), and optional size limits. Selected files are listed below the zone with individual remove controls."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <Demo />
        </ComponentPreview>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          States
        </h2>
        <ComponentPreview label="Error">
          <div className="w-full max-w-sm">
            <FileUpload
              label="Resume"
              accept=".pdf"
              error="Please upload a PDF file."
            />
          </div>
        </ComponentPreview>
        <ComponentPreview label="Disabled" className="mt-4">
          <div className="w-full max-w-sm">
            <FileUpload label="Upload (disabled)" disabled />
          </div>
        </ComponentPreview>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Implementation
        </h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Props
        </h2>
        <PropsTable props={PROPS} />
      </section>

      {/* ARIA roles */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          ARIA roles
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Element", "Role", "Key attributes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { el: "Drop zone", role: "button", attrs: "tabIndex=0, aria-label='Upload files'" },
                { el: "File input", role: "(hidden)", attrs: "aria-hidden='true' (activated programmatically)" },
                { el: "File list", role: "list", attrs: "aria-label='Selected files'" },
                { el: "Remove button", role: "button (implicit)", attrs: "aria-label='Remove {filename}'" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.el}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.role}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.attrs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Keyboard */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Keyboard
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Key", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { key: "Enter / Space", action: "Open the native file picker when the drop zone is focused" },
                { key: "Tab", action: "Move focus from the drop zone to individual remove buttons in the file list" },
                { key: "Shift+Tab", action: "Move focus backward through the file list and back to the drop zone" },
                { key: "Enter / Space on remove", action: "Remove the associated file from the list" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{row.key}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Accessibility
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'The drop zone uses role="button" with tabIndex so keyboard users can activate it with Enter or Space — triggering the hidden file input.',
            "The actual <input type=\"file\"> is sr-only and aria-hidden — it is activated programmatically. The visible drop zone is the interactive target.",
            "Size and type errors appear as visible text; they are not announced via aria-live. If immediate announcement is needed, add role=\"alert\" to the error element.",
            "Each file in the list has an individual remove button with an aria-label describing the file being removed (\"Remove resume.pdf\").",
            "The file list uses <ul> with aria-label=\"Selected files\" so screen readers understand the context of the list items.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
