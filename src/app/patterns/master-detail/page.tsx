import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { MasterDetailDemo } from "@/components/docs/MasterDetailDemo";


const CODE = {
  react: {
    filename: "MasterDetail.tsx",
    code: `"use client";

import { useState } from "react";

interface Item { id: number; title: string; /* … */ }

export function MasterDetail({ items }: { items: Item[] }) {
  const [selected, setSelected] = useState<Item>(items[0]);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="flex h-full border rounded-xl overflow-hidden">

      {/* Master list — hidden on mobile when detail is open */}
      <div className={cn(
        "w-[260px] flex-shrink-0 border-r flex flex-col",
        showDetail && "hidden md:flex"
      )}>
        <div className="px-4 py-3 border-b">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            {items.length} items
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => { setSelected(item); setShowDetail(true); }}
              className={cn(
                "w-full px-4 py-3 text-left border-b last:border-0 transition-colors",
                selected.id === item.id
                  ? "bg-accent-subtle text-accent"
                  : "hover:bg-surface"
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Detail — hidden on mobile when list is shown */}
      <div className={cn("flex-1 flex flex-col", !showDetail && "hidden md:flex")}>
        {/* Back button — mobile only */}
        <button
          onClick={() => setShowDetail(false)}
          className="md:hidden px-4 py-3 border-b text-left text-accent"
        >
          ← Back
        </button>
        <div className="flex-1 overflow-y-auto p-6">
          {/* Render selected item detail */}
          <h1>{selected.title}</h1>
        </div>
      </div>

    </div>
  );
}`,
  },
  html: {
    filename: "master-detail.html",
    code: `<div class="master-detail">

  <!-- Master panel -->
  <nav class="master-panel" id="masterPanel">
    <div class="master-header">
      <span class="master-count">5 items</span>
    </div>
    <ul class="master-list" role="listbox" aria-label="Items">
      <li class="master-item master-item--selected"
          role="option" aria-selected="true"
          onclick="selectItem(this, 'item-1')">
        Jamieson Rothwell
      </li>
      <li class="master-item" role="option" aria-selected="false"
          onclick="selectItem(this, 'item-2')">
        Sam Park
      </li>
    </ul>
  </nav>

  <!-- Detail panel -->
  <main class="detail-panel" id="detailPanel">
    <button class="back-btn" onclick="showMaster()" aria-label="Back to list">
      ← Back
    </button>
    <div id="item-1" class="detail-content">
      <h1>Jamieson Rothwell</h1>
      <!-- Detail content -->
    </div>
    <div id="item-2" class="detail-content" hidden>
      <h1>Sam Park</h1>
    </div>
  </main>

</div>

<style>
  .master-detail {
    display: flex;
    height: 100%;
    border: 1px solid rgb(var(--border));
    border-radius: 12px;
    overflow: hidden;
  }

  .master-panel {
    width: 260px;
    flex-shrink: 0;
    border-right: 1px solid rgb(var(--border));
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .master-header {
    padding: 12px 16px;
    border-bottom: 1px solid rgb(var(--border));
  }

  .master-list {
    flex: 1;
    overflow-y: auto;
    list-style: none;
    padding: 0; margin: 0;
  }

  .master-item {
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid rgb(var(--border-subtle));
    font-size: 13px;
    color: rgb(var(--text-primary));
    transition: background 100ms;
  }
  .master-item:hover { background: rgb(var(--surface)); }
  .master-item--selected {
    background: rgb(var(--accent-subtle));
    color: rgb(var(--accent));
  }

  .detail-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
  }

  .detail-content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
  }

  .back-btn {
    display: none; /* shown on mobile */
    padding: 12px 16px;
    border-bottom: 1px solid rgb(var(--border));
    background: none; border-top: none;
    color: rgb(var(--accent));
    font-size: 13px; cursor: pointer;
    text-align: left;
  }

  /* Mobile breakpoint */
  @media (max-width: 768px) {
    .master-detail { position: relative; }

    .master-panel { width: 100%; border-right: none; }
    .detail-panel {
      position: absolute; inset: 0;
      background: rgb(var(--background));
      transform: translateX(100%);
      transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .detail-panel.is-open { transform: translateX(0); }
    .back-btn { display: block; }
  }
</style>

<script>
  function selectItem(el, id) {
    document.querySelectorAll(".master-item")
      .forEach(i => { i.classList.remove("master-item--selected"); i.ariaSelected = "false"; });
    el.classList.add("master-item--selected");
    el.ariaSelected = "true";

    document.querySelectorAll(".detail-content")
      .forEach(d => d.hidden = true);
    document.getElementById(id).hidden = false;

    // Mobile: slide in detail panel
    document.getElementById("detailPanel").classList.add("is-open");
  }

  function showMaster() {
    document.getElementById("detailPanel").classList.remove("is-open");
  }
</script>`,
  },
  swift: {
    filename: "MasterDetailView.swift",
    code: `import SwiftUI

struct Contact: Identifiable, Hashable {
    let id: Int
    let name: String
    let role: String
    // … more fields
}

struct MasterDetailView: View {
    let contacts: [Contact]
    @State private var selectedContact: Contact?

    var body: some View {
        NavigationSplitView {
            // Master — list column
            List(contacts, selection: $selectedContact) { contact in
                NavigationLink(value: contact) {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(contact.name)
                            .font(.system(size: 13, weight: .medium))
                        Text(contact.role)
                            .font(.system(size: 11))
                            .foregroundColor(.secondary)
                    }
                    .padding(.vertical, 4)
                }
            }
            .navigationTitle("Team")
            .listStyle(.sidebar)
        } detail: {
            // Detail — right column
            if let contact = selectedContact {
                ContactDetailView(contact: contact)
            } else {
                ContentUnavailableView(
                    "Select a contact",
                    systemImage: "person.circle",
                    description: Text("Choose a team member from the list")
                )
            }
        }
    }
}

struct ContactDetailView: View {
    let contact: Contact

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Hero header
                HStack(spacing: 16) {
                    Circle()
                        .fill(Color.accentColor.opacity(0.2))
                        .frame(width: 64, height: 64)
                        .overlay(
                            Text(contact.name.prefix(2).uppercased())
                                .font(.system(size: 20, weight: .semibold))
                                .foregroundColor(.accentColor)
                        )

                    VStack(alignment: .leading, spacing: 4) {
                        Text(contact.name)
                            .font(.title2.weight(.semibold))
                        Text(contact.role)
                            .foregroundColor(.secondary)
                    }
                }

                Divider()

                // Details
                // Add more rows here…
            }
            .padding(24)
        }
        .navigationTitle(contact.name)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button("Edit") { }
            }
        }
    }
}

#Preview {
    MasterDetailView(contacts: [
        Contact(id: 1, name: "Jamieson Rothwell", role: "Founder"),
        Contact(id: 2, name: "Sam Park",          role: "Engineer"),
        Contact(id: 3, name: "Lena Müller",       role: "Designer"),
    ])
}`,
  },
};

export default function MasterDetailPage() {
  return (
    <div>
      <PageHeader
        title="Master Detail"
        description="A two-panel layout where a list of items (master) drives a contextual detail view on the right. Collapses to a single-panel push navigation on narrow screens."
      />

      {/* Interactive demo */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <MasterDetailDemo />
        </ComponentPreview>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3">
          On narrow screens, tap any row to push to the detail view. Hit Back to return to the list.
        </p>
      </section>

      {/* When to use */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">When to use</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Master–detail works best when you have a collection of similar items and rich per-item
          content that would waste space if shown for every row.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              heading: "Good fits",
              items: [
                "Email / messaging inboxes",
                "CRM contact or lead views",
                "Settings pages with categories",
                "File browsers and asset managers",
                "Issue trackers and task lists",
              ],
              accent: "text-emerald-500",
              border: "border-emerald-500/20",
              bg: "bg-emerald-500/5",
            },
            {
              heading: "Poor fits",
              items: [
                "Simple lists where all data fits in one view",
                "Workflows requiring both panels simultaneously",
                "Content where comparison across items matters",
                "Very shallow item counts (< 5 items)",
              ],
              accent: "text-red-400",
              border: "border-red-400/20",
              bg: "bg-red-400/5",
            },
          ].map(({ heading, items, accent, border, bg }) => (
            <div key={heading} className={`rounded-xl border ${border} ${bg} p-5`}>
              <h3 className={`text-[13px] font-semibold mb-3 ${accent}`}>{heading}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-[rgb(var(--text-secondary))]">
                    <span className={`${accent} mt-0.5`}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Layout anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Layout anatomy</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The pattern composes three zones. Each has a clear responsibility.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Zone", "Width", "Responsibility"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Master (list)",   "240–320px fixed",    "Scannable rows. One item is always selected. Owns the selection state."],
                ["Divider",         "1px",                "Visual boundary. Can be a drag handle for resizable layouts."],
                ["Detail",          "flex: 1 (remaining)", "Rich content for the selected item. Scrolls independently of the list."],
              ].map(([zone, width, resp], i) => (
                <tr key={zone} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{zone}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{width}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{resp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Responsive behavior */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Responsive behavior</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          On narrow screens the two panels cannot coexist. The correct pattern is a push navigation —
          selecting an item slides the detail in from the right, replacing the list. A back button
          returns to the list.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Breakpoint", "Layout", "Behavior"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["≥ 768px (md)",  "Side by side",   "Both panels visible. Selecting a row updates the detail in place."],
                ["< 768px",       "Single panel",   "Only one panel visible at a time. Row tap pushes detail. Back button returns to list."],
              ].map(([bp, layout, behavior], i) => (
                <tr key={bp} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{bp}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{layout}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{behavior}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The React implementation uses a single{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">showDetail</code>{" "}
          boolean to toggle panel visibility on mobile. On desktop, both panels are always rendered
          and visible — no JS is needed to switch between them, just{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">md:flex</code> and{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">hidden</code>{" "}
          utility classes. The SwiftUI implementation uses{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">NavigationSplitView</code>{" "}
          which handles the column/stack transition automatically.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Design decisions */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Design decisions</h2>
        <ul className="space-y-4 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            {
              title: "Always have a selection",
              body: "On load, default-select the first item so the detail panel is never empty. An empty detail state creates a jarring visual hole.",
            },
            {
              title: "Keep the master list narrow",
              body: "240–320px is the sweet spot. Wider and the detail panel loses valuable real estate. Narrower and row content gets truncated too aggressively.",
            },
            {
              title: "Selected row highlight",
              body: "Use a subtle accent background (not a strong color) for the selected row. The detail panel already makes the selection obvious — the list highlight is just a secondary cue.",
            },
            {
              title: "Independent scroll areas",
              body: "The master list and the detail both scroll independently. The outer container has overflow: hidden; each panel has overflow-y: auto with flex: 1.",
            },
            {
              title: "Back button on mobile",
              body: "Use native browser history (router.push / NavigationLink) when possible so the hardware back button and gesture work without extra code.",
            },
          ].map(({ title, body }) => (
            <li key={title} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 flex-shrink-0">→</span>
              <span><strong className="text-[rgb(var(--text-primary))]">{title}.</strong> {body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "The master list should have role=\"listbox\" and each item role=\"option\" with aria-selected.",
            "When a new item is selected, move focus to the detail heading so keyboard and screen reader users know the panel has updated.",
            "The back button on mobile must be visible and focusable — don't hide it with opacity or pointer-events-none.",
            "Both panels should be keyboard reachable via Tab. On desktop, Tab should cycle: list → detail → list.",
            "On mobile, when the detail slides in, trap focus within it until the user presses Back.",
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
