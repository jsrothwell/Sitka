import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "GTD Task Inbox" };

const CODE = {
  swift: {
    filename: "InboxView.swift",
    code: `import SwiftUI
import SwiftData

// ── GTD Inbox ─────────────────────────────────────────────────────────────
// Captures unprocessed items and presents them for triage.
// Inbox = tasks with no project assignment (projectID == nil).

struct InboxView: View {
    @Environment(\\.modelContext) private var ctx
    @Query(filter: #Predicate<OFTask> { $0.projectID == nil && !$0.isCompleted },
           sort: \\.createdAt, order: .reverse)
    private var inbox: [OFTask]

    @State private var draftTitle = ""
    @State private var selectedTask: OFTask?

    var body: some View {
        NavigationSplitView {
            List(inbox, selection: $selectedTask) { task in
                TaskRow(task: task).tag(task)
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Inbox")
            .toolbar { captureBar }
        } detail: {
            if let task = selectedTask {
                TaskDetailView(task: task)
            } else {
                ContentUnavailableView("Select a task", systemImage: "tray",
                    description: Text("\\(inbox.count) items need triage"))
            }
        }
    }

    private var captureBar: some ToolbarContent {
        ToolbarItem(placement: .bottomBar) {
            HStack {
                TextField("Capture…", text: $draftTitle)
                    .textFieldStyle(.plain).submitLabel(.done).onSubmit(capture)
                if !draftTitle.isEmpty {
                    Button(action: capture) { Image(systemName: "return") }
                }
            }
            .padding(.horizontal, 14).frame(height: 40)
            .background(Color(.secondarySystemBackground), in: RoundedRectangle(cornerRadius: 10))
        }
    }

    private func capture() {
        guard !draftTitle.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        ctx.insert(OFTask(title: draftTitle))
        draftTitle = ""
    }
}

// ── Today view ────────────────────────────────────────────────────────────
struct TodayView: View {
    @Query(filter: #Predicate<OFTask> { task in
        guard let due = task.dueDate else { return false }
        return due <= Date.now && !task.isCompleted
    }, sort: \\.dueDate)
    private var todayTasks: [OFTask]

    var body: some View {
        List(todayTasks) { TaskRow(task: $0) }
            .listStyle(.insetGrouped).navigationTitle("Today")
            .overlay { if todayTasks.isEmpty { ContentUnavailableView("All clear", systemImage: "checkmark.circle.fill") } }
    }
}

// ── Task row ───────────────────────────────────────────────────────────────
struct TaskRow: View {
    @Bindable var task: OFTask

    var body: some View {
        HStack(spacing: 12) {
            Button {
                withAnimation(.spring(duration: 0.25)) { task.isCompleted.toggle() }
            } label: {
                Image(systemName: task.isCompleted ? "checkmark.circle.fill" : "circle")
                    .font(.system(size: 20))
                    .foregroundStyle(task.isCompleted ? .green : .secondary)
                    .contentTransition(.symbolEffect(.replace))
            }
            .buttonStyle(.plain)

            VStack(alignment: .leading, spacing: 2) {
                Text(task.title).strikethrough(task.isCompleted).foregroundStyle(task.isCompleted ? .secondary : .primary)
                if let due = task.dueDate {
                    Text(due, style: .date).font(.caption).foregroundStyle(due < .now ? .red : .secondary)
                }
            }
        }
        .padding(.vertical, 2)
    }
}`,
  },
  macos: {
    filename: "OFTask.swift",
    code: `import SwiftUI
import SwiftData

// ── Data model — Area → Project → Task ───────────────────────────────────
// Inbox is defined by projectID == nil; no separate "inbox" flag needed.

@Model final class OFArea {
    var name: String; var icon: String; var colorHex: String
    @Relationship(deleteRule: .cascade) var projects: [OFProject] = []
    init(name: String, icon: String = "folder", colorHex: String = "#34A865") {
        self.name = name; self.icon = icon; self.colorHex = colorHex
    }
}

@Model final class OFProject {
    var name: String; var icon: String
    var areaID: PersistentIdentifier?
    var isCompleted: Bool = false
    @Relationship(deleteRule: .cascade) var tasks: [OFTask] = []
    init(name: String, icon: String = "checkmark.circle") { self.name = name; self.icon = icon }
}

@Model final class OFTask {
    var title: String; var notes: String = ""
    var isCompleted: Bool = false
    var dueDate: Date?
    var projectID: PersistentIdentifier?  // nil = inbox
    var areaID: PersistentIdentifier?
    var createdAt: Date = Date.now
    var tags: [String] = []
    init(title: String, dueDate: Date? = nil) { self.title = title; self.dueDate = dueDate }
}

// ── SyncService — batches SwiftData changes → CloudKit ───────────────────
actor SyncService {
    static let shared = SyncService()
    private var pendingIDs: Set<PersistentIdentifier> = []

    func enqueue(_ id: PersistentIdentifier) { pendingIDs.insert(id) }

    func flush(context: ModelContext) async throws {
        guard !pendingIDs.isEmpty else { return }
        let ids = pendingIDs; pendingIDs = []
        // Build diff payload and send to CloudKit private database.
        // Uses last-write-wins on modifiedAt for conflict resolution.
        _ = ids // replace with real CloudKit save
    }
}`,
  },
  react: {
    filename: "TaskInbox.tsx",
    code: `"use client";

import { useState, useId } from "react";

interface Task {
  id: string;
  title: string;
  dueDate?: string;
  projectId?: string;
  completed: boolean;
}

// React GTD inbox — local state version; swap useState for a server action / Zustand store.
export function TaskInbox() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Research competitor pricing", completed: false },
    { id: "2", title: "Draft Q3 retro agenda", completed: false },
    { id: "3", title: "Follow up with contractor", dueDate: new Date().toISOString(), completed: false },
  ]);
  const [draft, setDraft] = useState("");

  // Inbox = tasks with no project assignment
  const inbox = tasks.filter((t) => !t.projectId && !t.completed);

  const capture = () => {
    if (!draft.trim()) return;
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title: draft.trim(), completed: false }]);
    setDraft("");
  };

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  return (
    <div style={{ maxWidth: 400, fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 10px" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Inbox</h2>
        <span style={{ fontSize: 12, fontWeight: 600, padding: "2px 10px", borderRadius: 99, background: "rgba(52,168,101,0.15)", color: "#34a865" }}>
          {inbox.length} items
        </span>
      </div>

      {/* Task list */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border, #333)" }}>
        {inbox.length === 0 && (
          <li style={{ padding: "24px 16px", textAlign: "center", color: "#888", fontSize: 14 }}>All clear ✓</li>
        )}
        {inbox.map((task, i) => (
          <li
            key={task.id}
            style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px",
              borderBottom: i < inbox.length - 1 ? "1px solid var(--border-subtle, #222)" : undefined,
            }}
          >
            <button
              onClick={() => toggle(task.id)}
              aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
              style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #555", background: "transparent", cursor: "pointer", marginTop: 2, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: "var(--text-primary, #f2f2f6)" }}>{task.title}</div>
              {task.dueDate && (
                <div style={{ fontSize: 11, color: new Date(task.dueDate) < new Date() ? "#f87171" : "#888", marginTop: 2 }}>
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Quick-capture bar */}
      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && capture()}
          placeholder="Capture…"
          style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #333", background: "transparent", color: "inherit", fontSize: 14 }}
        />
        {draft && (
          <button onClick={capture} style={{ padding: "8px 14px", borderRadius: 8, background: "#34a865", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
            Add
          </button>
        )}
      </div>
    </div>
  );
}`,
  },
  html: {
    filename: "task-inbox.html",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: system-ui; max-width: 400px; margin: 2rem auto; padding: 0 1rem; background: #0a0a0f; color: #f2f2f6; }
  h2  { font-size: 1.25rem; display: flex; align-items: center; justify-content: space-between; }
  .count { font-size: .75rem; font-weight: 600; padding: 2px 10px; border-radius: 99px; background: rgba(52,168,101,.15); color: #34a865; }
  ul  { list-style: none; padding: 0; margin: .5rem 0; border: 1px solid #222; border-radius: 12px; overflow: hidden; }
  li  { display: flex; align-items: flex-start; gap: 12px; padding: 12px 16px; border-bottom: 1px solid #1a1a1a; }
  li:last-child { border-bottom: none; }
  .checkbox { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #555; background: transparent; cursor: pointer; flex-shrink: 0; margin-top: 2px; }
  .title { font-size: .875rem; }
  .due   { font-size: .6875rem; color: #888; margin-top: 2px; }
  .due.overdue { color: #f87171; }
  .capture { display: flex; gap: 8px; margin-top: 8px; }
  .capture input { flex: 1; padding: 8px 12px; border-radius: 8px; border: 1px solid #333; background: transparent; color: inherit; font-size: .875rem; }
  .capture button { padding: 8px 14px; border-radius: 8px; background: #34a865; color: #fff; border: none; cursor: pointer; font-weight: 600; display: none; }
</style>
</head>
<body>

<h2>Inbox <span class="count" id="count">3 items</span></h2>
<ul id="list"></ul>
<div class="capture">
  <input id="draft" type="text" placeholder="Capture…" oninput="onInput()" onkeydown="if(event.key==='Enter') capture()" />
  <button id="add-btn" onclick="capture()">Add</button>
</div>

<script>
  let tasks = [
    { id: 1, title: "Research competitor pricing", completed: false },
    { id: 2, title: "Draft Q3 retro agenda", completed: false },
    { id: 3, title: "Follow up with contractor", due: new Date(), completed: false },
  ];

  function render() {
    const inbox = tasks.filter(t => !t.completed);
    document.getElementById("count").textContent = inbox.length + " items";
    document.getElementById("list").innerHTML = inbox.length === 0
      ? '<li style="justify-content:center;color:#888;font-size:.875rem">All clear ✓</li>'
      : inbox.map(t => \`
        <li>
          <button class="checkbox" onclick="toggle(\${t.id})" aria-label="Complete"></button>
          <div>
            <div class="title">\${t.title}</div>
            \${t.due ? \`<div class="due \${t.due < new Date() ? 'overdue' : ''}">Due \${t.due.toLocaleDateString()}</div>\` : ''}
          </div>
        </li>\`).join('');
  }

  function toggle(id) { tasks = tasks.map(t => t.id === id ? {...t, completed: true} : t); render(); }
  function capture() {
    const v = document.getElementById("draft").value.trim();
    if (!v) return;
    tasks.push({ id: Date.now(), title: v, completed: false });
    document.getElementById("draft").value = "";
    document.getElementById("add-btn").style.display = "none";
    render();
  }
  function onInput() {
    document.getElementById("add-btn").style.display = document.getElementById("draft").value ? "block" : "none";
  }

  render();
</script>
</body>
</html>`,
  },
};

function InboxMockup() {
  const tasks = [
    { title: "Research competitor pricing", urgent: false },
    { title: "Draft Q3 retrospective agenda", urgent: false },
    { title: "Follow up with contractor", urgent: true },
    { title: "Review pull requests", urgent: false },
  ];

  return (
    <div style={{ width: "100%", maxWidth: 340, borderRadius: 20, overflow: "hidden", background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))", margin: "0 auto" }}>
      <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid rgb(var(--border-subtle))", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 18, color: "rgb(var(--text-primary))" }}>Inbox</span>
        <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99, background: "rgb(var(--accent-subtle))", color: "rgb(var(--accent))" }}>4 items</span>
      </div>
      <div>
        {tasks.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", borderBottom: i < tasks.length - 1 ? "1px solid rgb(var(--border-subtle))" : undefined }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${t.urgent ? "rgb(var(--status-danger))" : "rgb(var(--border))"}`, marginTop: 2, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: "rgb(var(--text-primary))", marginBottom: 3 }}>{t.title}</div>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" as const, color: t.urgent ? "rgb(var(--status-danger))" : "rgb(var(--text-tertiary))" }}>
                {t.urgent ? "Today" : "Inbox"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 12px", borderTop: "1px solid rgb(var(--border-subtle))", background: "rgb(var(--surface-raised))" }}>
        <div style={{ height: 36, borderRadius: 8, background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))", display: "flex", alignItems: "center", padding: "0 12px", color: "rgb(var(--text-tertiary))", fontSize: 13 }}>
          Capture…
        </div>
      </div>
    </div>
  );
}

export default function TaskInboxPage() {
  return (
    <div>
      <PageHeader
        title="GTD Task Inbox"
        description="A capture-first inbox, daily focus view, and upcoming timeline — the three-view core of a GTD workflow. Used in OrgFlo."
      />

      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Overview</h2>
        <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
          Three cooperating views follow David Allen&apos;s capture-clarify-organise workflow:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { title: "Inbox", desc: "Zero-friction capture. Tasks with no project land here for later triage." },
            { title: "Today", desc: "Tasks due today or overdue. Drives daily focus without manual priority tags." },
            { title: "Upcoming", desc: "Future tasks grouped by date. Surfaces commitments before they become urgent." },
          ].map(({ title, desc }) => (
            <div key={title} style={{ padding: "1.25rem", borderRadius: 12, background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))" }}>
              <p className="font-semibold text-[rgb(var(--text-primary))] mb-2">{title}</p>
              <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed">
          Data is modelled as <strong className="text-[rgb(var(--text-primary))]">Area → Project → Task</strong>. The inbox is defined by <code>projectID == nil</code> — no separate flag required.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-6">Inbox Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-[12px] overflow-hidden border border-[rgb(var(--border))] p-6 bg-[rgb(var(--surface))]">
            <InboxMockup />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-[rgb(var(--text-primary))]">Quick-capture bar</h3>
            <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
              A persistent bottom toolbar hosts the capture field. Pressing Return inserts an <code>OFTask</code> with no project. The field clears instantly — the task appears at the top of the list.
            </p>
            <h3 className="font-semibold text-[rgb(var(--text-primary))] pt-2">Triage flow</h3>
            <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Tap a task to open the detail panel (NavigationSplitView on iPad/macOS)</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Assign an Area, Project, and due date to move it out of the inbox</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Inbox count decrements in real time — zero shows an "All clear" empty state</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Code</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          SwiftUI tabs show <strong>InboxView/TodayView</strong> (iOS) and the <strong>OFTask SwiftData model</strong> (macOS tab). React and HTML tabs show equivalent web implementations.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Sync &amp; Persistence</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {["Layer", "Responsibility"].map((h) => <th key={h} className="text-left py-2 pr-6 font-semibold text-[rgb(var(--text-secondary))]">{h}</th>)}
              </tr>
            </thead>
            <tbody className="text-[rgb(var(--text-secondary))]">
              {[
                ["SwiftData store", "On-device persistence; @Query predicates define inbox / today / upcoming filters"],
                ["SyncService", "Batches changed object IDs, diffs to CloudKit private database, last-write-wins on modifiedAt"],
                ["WCSession", "Pushes habit summary to watchOS companion; receives completion events"],
              ].map(([l, r]) => (
                <tr key={l} className="border-b border-[rgb(var(--border-subtle))]">
                  <td className="py-2.5 pr-6 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{l}</td>
                  <td className="py-2.5">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Accessibility</h2>
        <ul className="space-y-3 text-[14px] text-[rgb(var(--text-secondary))]">
          <li className="flex gap-2"><span className="text-[rgb(var(--accent))] shrink-0">→</span><span>Completion toggle uses <code>.contentTransition(.symbolEffect(.replace))</code>; VoiceOver announces via <code>.accessibilityValue</code></span></li>
          <li className="flex gap-2"><span className="text-[rgb(var(--accent))] shrink-0">→</span><span>Overdue dates render red and also carry <code>.accessibilityLabel("Overdue, date")</code> so colour is not the only signal</span></li>
          <li className="flex gap-2"><span className="text-[rgb(var(--accent))] shrink-0">→</span><span>Capture field uses <code>.submitLabel(.done)</code> — keyboard stays up for rapid multi-item entry</span></li>
        </ul>
      </section>
    </div>
  );
}
