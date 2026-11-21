"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

type Status = "lookingUp" | "found" | "ambiguous" | "notFound";

interface Row {
  id: number;
  text: string;
  title?: string;
  author?: string;
  owned?: boolean;
  status: Status;
  included: boolean;
  x: number; // Marker position on the photo, 0–100
}

const INITIAL: Row[] = [
  { id: 1, text: "DUNE HERBERT", title: "Dune", author: "Frank Herbert", status: "found", included: true, x: 10 },
  { id: 2, text: "PIRANESI", title: "Piranesi", author: "Susanna Clarke", owned: true, status: "found", included: false, x: 27 },
  { id: 3, text: "THE WAVES", status: "ambiguous", included: true, x: 44 },
  { id: 4, text: "ST0NER WILLIAMS", status: "lookingUp", included: true, x: 61 },
  { id: 5, text: "GRBL MRCH", status: "notFound", included: true, x: 80 },
];

const SPINES = ["#7c2d12", "#1e3a8a", "#14532d", "#581c87", "#713f12"];

const CODE = {
  react: {
    filename: "BatchReview.tsx",
    code: `type Status = "lookingUp" | "found" | "ambiguous" | "notFound";
interface Row { id: number; text: string; title?: string; subtitle?: string; status: Status; included: boolean }

// One capture → many detections → a checklist the user confirms before anything is saved.
export function BatchReview({ rows, setRows, onAdd }: {
  rows: Row[]; setRows: (r: Row[]) => void; onAdd: (r: Row[]) => void;
}) {
  const included = rows.filter((r) => r.included);
  const busy = rows.some((r) => r.status === "lookingUp");
  const update = (id: number, patch: Partial<Row>) => setRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <div>
      <header className="flex justify-between">
        <h2>Scan a Shelf</h2>
        <button disabled={included.length === 0 || busy} onClick={() => onAdd(included)}>Add {included.length}</button>
      </header>
      <ol>
        {rows.map((r, i) => (
          <li key={r.id} className="flex gap-3 py-2.5">
            <span className="w-5 text-right tabular-nums text-[rgb(var(--text-secondary))]">{i + 1}</span>
            <div className="flex-1">
              {r.status === "found" ? (
                <><p>{r.title}</p><p className="text-[12px] text-[rgb(var(--text-secondary))]">{r.subtitle}</p></>
              ) : r.status === "lookingUp" ? (
                <><p>{r.text}</p><p className="text-[12px] text-[rgb(var(--text-secondary))]" aria-live="polite">Looking up…</p></>
              ) : (
                <>
                  <input value={r.text} aria-label={\`Title for item \${i + 1}\`} onChange={(e) => update(r.id, { text: e.target.value })} />
                  <p className="text-[12px] text-[rgb(var(--text-secondary))]">
                    {r.status === "ambiguous" ? "Several match. Add the author, then search." : "Not found. Fix the title, or add it as it is."}
                  </p>
                </>
              )}
            </div>
            <input type="checkbox" checked={r.included} aria-label={\`Add \${r.title ?? r.text}\`}
                   onChange={(e) => update(r.id, { included: e.target.checked })} />
          </li>
        ))}
      </ol>
    </div>
  );
}`,
  },
  html: {
    filename: "batch-review.html",
    code: `<figure class="capture">
  <img src="shelf.jpg" alt="Photo of the shelf">
  <!-- Numbered markers tie each row to its place in the photo -->
  <span class="capture__marker" style="left: 10%">1</span>
  <span class="capture__marker capture__marker--off" style="left: 27%">2</span>
</figure>

<ol class="review">
  <li class="review__row">
    <span class="review__n">1</span>
    <div><p>Dune</p><p class="review__sub">Frank Herbert</p></div>
    <input type="checkbox" checked aria-label="Add Dune">
  </li>
  <li class="review__row">
    <span class="review__n">2</span>
    <div><p>Piranesi</p><p class="review__sub">Susanna Clarke · Already in your library</p></div>
    <input type="checkbox" aria-label="Add Piranesi">
  </li>
</ol>

<style>
.capture { position: relative; }
.capture__marker { position: absolute; top: 8px; min-width: 22px; height: 22px; border-radius: 50%;
  display: grid; place-items: center; font: 700 11px system-ui; color: #fff; background: rgb(var(--accent)); }
.capture__marker--off { background: rgb(var(--text-tertiary)); }
.review__row { display: flex; gap: 12px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid rgb(var(--border-subtle)); }
.review__row > div { flex: 1; }
.review__n { width: 20px; text-align: right; font-variant-numeric: tabular-nums; color: rgb(var(--text-secondary)); }
.review__sub { font-size: 12px; color: rgb(var(--text-secondary)); }
</style>`,
  },
  swift: {
    filename: "BatchReviewView.swift",
    code: `import SwiftUI

struct BatchReviewView: View {
    @Binding var rows: [DetectionRow]
    var onAdd: ([DetectionRow]) -> Void
    @Environment(\\.dismiss) private var dismiss

    private var includedCount: Int { rows.filter(\\.isIncluded).count }
    private var isBusy: Bool { rows.contains { $0.status == .lookingUp } }

    var body: some View {
        List {
            Section {
                ForEach($rows) { $row in
                    let number = (rows.firstIndex { $0.id == row.id } ?? 0) + 1
                    HStack(alignment: .top, spacing: 12) {
                        Text("\\(number)").monospacedDigit().foregroundStyle(.secondary).frame(width: 20, alignment: .trailing)
                        VStack(alignment: .leading, spacing: 4) {
                            switch row.status {
                            case .lookingUp:
                                Text(row.text)
                                Label("Looking up…", systemImage: "magnifyingglass").font(.caption).foregroundStyle(.secondary)
                            case .found(let match):
                                Text(match.title)
                                Text([match.creator, row.isOwned ? "Already in your library" : nil]
                                        .compactMap { $0 }.joined(separator: " · "))
                                    .font(.caption).foregroundStyle(.secondary)
                            case .ambiguous, .notFound:
                                TextField("Title", text: $row.text).onSubmit { retry(row.id) }
                                Text(row.status == .ambiguous
                                     ? "Several match. Add the author, then search."
                                     : "Not found. Fix the title, or add it as it is.")
                                    .font(.caption).foregroundStyle(.secondary)
                            }
                        }
                        Spacer(minLength: 0)
                        Toggle("Add", isOn: $row.isIncluded).labelsHidden()
                            .accessibilityLabel("Add \\(row.displayTitle)")
                    }
                    .contextMenu { mergeSplitActions(for: row) }   // Fix detection mistakes in place
                }
            } footer: {
                Text("Items not found are added with the text that was read, and appear in Needs Review.")
            }
        }
        .toolbar {
            ToolbarItem(placement: .cancellationAction) { Button("Cancel") { dismiss() } }
            ToolbarItem(placement: .confirmationAction) {
                Button("Add \\(includedCount)") { onAdd(rows.filter(\\.isIncluded)) }
                    .disabled(includedCount == 0 || isBusy)
            }
        }
    }
}`,
  },
};

export default function BatchCaptureReviewPage() {
  const [rows, setRows] = useState(INITIAL);
  const [added, setAdded] = useState<number | null>(null);
  const included = rows.filter((r) => r.included).length;
  const busy = rows.some((r) => r.status === "lookingUp");
  const update = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <div>
      <PageHeader
        title="Batch Capture Review"
        badge="New"
        description="One capture, many detections, one confirmation. When a photo, scan, or pasted document yields several items at once, show a numbered checklist tied back to the source, let lookups resolve row by row, and let the user fix or exclude anything before a single item is saved."
      />
      <SourceNote
        sources={[
          { app: "scanflo", file: "DesignTokens/ShelfScanView.swift" },
          { app: "JobFlo", file: "Shared/Views/EmailStatusImportSheet.swift" },
        ]}
      />

      <PreviewSection>
        <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
          <div className="flex items-center justify-between border-b border-[rgb(var(--border-subtle))] px-4 py-2.5">
            <button onClick={() => { setRows(INITIAL); setAdded(null); }} className="text-[14px] text-[rgb(var(--accent))]">
              {added === null ? "Cancel" : "Done"}
            </button>
            <span className="text-[15px] font-semibold text-[rgb(var(--text-primary))]">Scan a Shelf</span>
            {added === null ? (
              <button
                disabled={included === 0 || busy}
                onClick={() => setAdded(included)}
                className="text-[14px] font-semibold text-[rgb(var(--accent))] disabled:opacity-40"
              >
                Add {included}
              </button>
            ) : (
              <span className="w-10" />
            )}
          </div>

          {added !== null ? (
            <div role="status" className="px-6 py-10 text-center">
              <p className="text-[28px]" aria-hidden>✓</p>
              <p className="text-[17px] font-semibold text-[rgb(var(--text-primary))]">Added {added} Books</p>
              <p className="mt-1 text-[13px] text-[rgb(var(--text-secondary))]">Anything missing a title or author is waiting in Needs Review.</p>
            </div>
          ) : (
            <>
              {/* Source capture with numbered markers */}
              <div className="relative flex h-36 items-end gap-1.5 bg-[#2a2118] px-6 pb-3" aria-hidden>
                {rows.map((r, i) => (
                  <div key={r.id} className="relative flex-1 rounded-sm" style={{ height: `${70 + (i % 3) * 10}%`, background: SPINES[i] }}>
                    <span
                      className="absolute -top-3 left-1/2 flex h-[22px] min-w-[22px] -translate-x-1/2 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: r.included ? "rgb(var(--accent))" : "rgb(var(--text-tertiary))" }}
                    >
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>

              <ol className="divide-y divide-[rgb(var(--border-subtle))] px-4">
                {rows.map((r, i) => (
                  <li key={r.id} className="flex items-start gap-3 py-2.5">
                    <span className="w-5 pt-0.5 text-right text-[12px] font-medium tabular-nums text-[rgb(var(--text-secondary))]">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      {r.status === "found" && (
                        <>
                          <p className="text-[14px] text-[rgb(var(--text-primary))]">{r.title}</p>
                          <p className="text-[12px] text-[rgb(var(--text-secondary))]">
                            {[r.author, r.owned ? "Already in your library" : null].filter(Boolean).join(" · ")}
                          </p>
                        </>
                      )}
                      {r.status === "lookingUp" && (
                        <>
                          <p className="text-[14px] text-[rgb(var(--text-primary))]">{r.text}</p>
                          <button
                            onClick={() => update(r.id, { status: "found", title: "Stoner", author: "John Williams" })}
                            className="text-[12px] text-[rgb(var(--text-secondary))] motion-safe:animate-pulse"
                          >
                            🔍 Looking up… <span className="underline">(resolve)</span>
                          </button>
                        </>
                      )}
                      {(r.status === "ambiguous" || r.status === "notFound") && (
                        <>
                          <input
                            value={r.text}
                            aria-label={`Title for item ${i + 1}`}
                            onChange={(e) => update(r.id, { text: e.target.value })}
                            className="w-full rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-2 py-1 text-[14px] text-[rgb(var(--text-primary))]"
                          />
                          <p className="mt-1 text-[12px] text-[rgb(var(--text-secondary))]">
                            {r.status === "ambiguous"
                              ? "Several books match. Add the author to the title, then search. "
                              : "Not found. Fix the title, or add it as it is. "}
                            <button className="font-semibold text-[rgb(var(--accent))]">Search</button>
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={r.included}
                      onChange={(e) => update(r.id, { included: e.target.checked })}
                      aria-label={`Add ${r.title ?? r.text}`}
                      className="mt-1 h-4 w-4 accent-[rgb(var(--accent))]"
                    />
                  </li>
                ))}
              </ol>
              <p className="px-4 pb-4 pt-1 text-[11px] text-[rgb(var(--text-tertiary))]">
                Books not found are added with the title read from the spine, and appear in Needs Review. Touch and hold a row to merge or split it.
              </p>
            </>
          )}
        </div>
      </PreviewSection>

      <DocSection title="Row states">
        <DocTable
          headers={["State", "Shows", "Default"]}
          rows={[
            ["Looking up", "Raw detected text + “Looking up…”", "Included. The Add button stays disabled until all lookups settle."],
            ["Found", "Canonical title + creator", "Included — unless it's a duplicate, which is shown as “Already in your library” and pre-excluded."],
            ["Ambiguous", "Editable text field + “Several match. Add the author, then search.”", "Included. Re-searching replaces the row's lookup with a fresh ID so a late result for the old text can't land on it."],
            ["Not found", "Editable text field + “Fix the title, or add it as it is.”", "Included, saved with the detected text and routed to a Needs Review queue."],
          ]}
        />
      </DocSection>

      <DocSection title="Principles">
        <ArrowList
          items={[
            "Nothing is saved until the user presses Add N. The count in the button is the contract.",
            "Number every detection and draw the same numbers on the source image, so a wrong row can be traced to the exact spine, line, or region it came from.",
            "Resolve progressively: show rows immediately with the raw reading, then fill them in as lookups return (Gather runs three lookups concurrently).",
            "Make detection errors fixable in place — merge two rows that are one item, split one row that is two — rather than forcing a re-capture.",
            "Never drop an item silently. Unmatched items are still added, flagged for later review.",
            "Never move existing data backwards: JobFlo's email import won't let a late “we received your application” email demote a job that's already interviewing.",
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Many items from one input", body: "A shelf photo, a scanned receipt, a pasted email thread, a CSV — any capture where recognition will be mostly right but not entirely.", good: true },
            { heading: "On-device recognition", body: "Say so in the empty state (“Gather reads them on this device”) — it explains the speed and reassures about privacy.", good: true },
            { heading: "Single-item scans", body: "One barcode, one item: use the Barcode Scanner pattern's result card. A checklist of one is friction.", good: false },
            { heading: "Auto-commit with undo", body: "Saving everything immediately and offering Undo hides recognition errors in the library. Review first.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "Each row's include toggle is labelled with the item's name (“Add Dune”), not just “Add”.",
            "Markers on the photo are decorative (aria-hidden); the numbered list is the accessible representation.",
            "Merge and Split live in a context menu — also expose them as accessibility custom actions so they're reachable without a long-press.",
            "Announce lookups resolving politely, and announce the final “Added N” confirmation with role=\"status\".",
          ]}
        />
      </DocSection>
    </div>
  );
}
