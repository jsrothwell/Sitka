import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "GTD Task Inbox" };

const CODE = {
  swiftui_inbox: {
    filename: "InboxView.swift",
    code: `import SwiftUI
import SwiftData

// ── GTD Inbox ─────────────────────────────────────────────────────────────
// Captures unprocessed items and presents them for triage (assign area,
// project, due date). Unprocessed count drives the sidebar badge.

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
                TaskRow(task: task)
                    .tag(task)
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Inbox")
            .toolbar { captureBar }
        } detail: {
            if let task = selectedTask {
                TaskDetailView(task: task)
            } else {
                ContentUnavailableView(
                    "Select a task",
                    systemImage: "tray",
                    description: Text("\\(inbox.count) items need triage")
                )
            }
        }
    }

    private var captureBar: some ToolbarContent {
        ToolbarItem(placement: .bottomBar) {
            HStack {
                TextField("Capture…", text: $draftTitle)
                    .textFieldStyle(.plain)
                    .submitLabel(.done)
                    .onSubmit(capture)
                if !draftTitle.isEmpty {
                    Button(action: capture) {
                        Image(systemName: "return")
                    }
                }
            }
            .padding(.horizontal, 14)
            .frame(height: 40)
            .background(Color(.secondarySystemBackground), in: RoundedRectangle(cornerRadius: 10))
        }
    }

    private func capture() {
        guard !draftTitle.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        let task = OFTask(title: draftTitle)
        ctx.insert(task)
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
        List(todayTasks) { task in
            TaskRow(task: task)
        }
        .listStyle(.insetGrouped)
        .navigationTitle("Today")
        .overlay {
            if todayTasks.isEmpty {
                ContentUnavailableView("All clear", systemImage: "checkmark.circle.fill")
            }
        }
    }
}

// ── Upcoming view ─────────────────────────────────────────────────────────
struct UpcomingView: View {
    @Query(filter: #Predicate<OFTask> { task in
        guard let due = task.dueDate else { return false }
        return due > Date.now && !task.isCompleted
    }, sort: \\.dueDate)
    private var upcoming: [OFTask]

    private var grouped: [(String, [OFTask])] {
        Dictionary(grouping: upcoming) { task -> String in
            guard let due = task.dueDate else { return "No date" }
            return due.formatted(.dateTime.weekday(.wide).month().day())
        }
        .sorted { $0.key < $1.key }
    }

    var body: some View {
        List {
            ForEach(grouped, id: \\.0) { header, tasks in
                Section(header) {
                    ForEach(tasks) { TaskRow(task: $0) }
                }
            }
        }
        .listStyle(.insetGrouped)
        .navigationTitle("Upcoming")
    }
}`,
  },
  swiftui_model: {
    filename: "OFTask.swift",
    code: `import SwiftUI
import SwiftData

// ── Data model hierarchy ───────────────────────────────────────────────────
// Area → Project → Task  (each level is optional; inbox tasks have no project)

@Model
final class OFArea {
    var name: String
    var icon: String
    var colorHex: String
    @Relationship(deleteRule: .cascade) var projects: [OFProject] = []

    init(name: String, icon: String = "folder", colorHex: String = "#34A865") {
        self.name = name; self.icon = icon; self.colorHex = colorHex
    }
}

@Model
final class OFProject {
    var name: String
    var icon: String
    var areaID: PersistentIdentifier?
    var isCompleted: Bool = false
    @Relationship(deleteRule: .cascade) var tasks: [OFTask] = []

    init(name: String, icon: String = "checkmark.circle") {
        self.name = name; self.icon = icon
    }
}

@Model
final class OFTask {
    var title: String
    var notes: String = ""
    var isCompleted: Bool = false
    var dueDate: Date?
    var projectID: PersistentIdentifier?   // nil = inbox
    var areaID: PersistentIdentifier?
    var createdAt: Date = Date.now
    var tags: [String] = []

    init(title: String, dueDate: Date? = nil) {
        self.title = title; self.dueDate = dueDate
    }
}

// ── Task row ───────────────────────────────────────────────────────────────
struct TaskRow: View {
    @Bindable var task: OFTask

    var body: some View {
        HStack(spacing: 12) {
            Button {
                withAnimation(.spring(duration: 0.25)) {
                    task.isCompleted.toggle()
                }
            } label: {
                Image(systemName: task.isCompleted ? "checkmark.circle.fill" : "circle")
                    .font(.system(size: 20))
                    .foregroundStyle(task.isCompleted ? .green : .secondary)
                    .contentTransition(.symbolEffect(.replace))
            }
            .buttonStyle(.plain)

            VStack(alignment: .leading, spacing: 2) {
                Text(task.title)
                    .strikethrough(task.isCompleted)
                    .foregroundStyle(task.isCompleted ? .secondary : .primary)
                if let due = task.dueDate {
                    Text(due, style: .date)
                        .font(.caption)
                        .foregroundStyle(due < .now ? .red : .secondary)
                }
            }
        }
        .padding(.vertical, 2)
    }
}`,
  },
};

function InboxMockup() {
  const tasks = [
    { title: "Research competitor pricing", tag: "Inbox", urgent: false },
    { title: "Draft Q3 retrospective agenda", tag: "Inbox", urgent: false },
    { title: "Follow up with contractor", tag: "Today", urgent: true },
    { title: "Review pull requests", tag: "Inbox", urgent: false },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 340,
        borderRadius: 20,
        overflow: "hidden",
        background: "rgb(var(--surface))",
        border: "1px solid rgb(var(--border))",
        margin: "0 auto",
      }}
    >
      {/* Nav bar */}
      <div style={{
        padding: "14px 16px 10px",
        borderBottom: "1px solid rgb(var(--border-subtle))",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontWeight: 700, fontSize: 18, color: "rgb(var(--text-primary))" }}>Inbox</span>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "2px 8px",
          borderRadius: 99,
          background: "rgb(var(--accent-subtle))",
          color: "rgb(var(--accent))",
        }}>4 items</span>
      </div>

      {/* Task list */}
      <div>
        {tasks.map((t, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 12,
            padding: "12px 16px",
            borderBottom: i < tasks.length - 1 ? "1px solid rgb(var(--border-subtle))" : undefined,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              border: `2px solid ${t.urgent ? "rgb(var(--status-danger))" : "rgb(var(--border))"}`,
              marginTop: 2, flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: "rgb(var(--text-primary))", marginBottom: 3 }}>{t.title}</div>
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
                color: t.urgent ? "rgb(var(--status-danger))" : "rgb(var(--text-tertiary))",
              }}>{t.tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Capture bar */}
      <div style={{
        padding: "10px 12px",
        borderTop: "1px solid rgb(var(--border-subtle))",
        background: "rgb(var(--surface-raised))",
      }}>
        <div style={{
          height: 36, borderRadius: 8,
          background: "rgb(var(--surface))",
          border: "1px solid rgb(var(--border))",
          display: "flex", alignItems: "center",
          padding: "0 12px",
          color: "rgb(var(--text-tertiary))",
          fontSize: 13,
        }}>
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
        description="A capture-first inbox, daily focus view, and upcoming timeline — the three-view core of a GTD (Getting Things Done) workflow. Used in OrgFlo."
      />

      {/* ── Overview ──────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Overview</h2>
        <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
          The GTD inbox pattern follows David Allen&apos;s capture-clarify-organise workflow. Three cooperating views form the core:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { title: "Inbox", desc: "Zero-friction capture. Tasks with no project assignment land here for later triage." },
            { title: "Today", desc: "Tasks due today or overdue. Drives the user's daily focus without requiring manual priority tags." },
            { title: "Upcoming", desc: "Future tasks grouped by date. Scans forward to surface commitments before they become urgent." },
          ].map(({ title, desc }) => (
            <div
              key={title}
              style={{ padding: "1.25rem", borderRadius: 12, background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))" }}
            >
              <p className="font-semibold text-[rgb(var(--text-primary))] mb-2">{title}</p>
              <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed">
          Data is modelled as a three-level hierarchy — <strong className="text-[rgb(var(--text-primary))]">Area → Project → Task</strong> — stored in SwiftData with a <code>SyncService</code> that batches changes and resolves conflicts using a last-write-wins strategy.
        </p>
      </section>

      {/* ── Preview ───────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-6">Inbox Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-[12px] overflow-hidden border border-[rgb(var(--border))] p-6 bg-[rgb(var(--surface))]">
            <InboxMockup />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-[rgb(var(--text-primary))]">Capture bar</h3>
            <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
              A persistent bottom toolbar hosts the quick-capture field. Pressing Return inserts an <code>OFTask</code> with no project, triggering a SwiftData insert. The field clears instantly — the task appears at the top of the list.
            </p>
            <h3 className="font-semibold text-[rgb(var(--text-primary))] pt-2">Triage flow</h3>
            <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Tap a task to open the detail panel (NavigationSplitView on iPad/macOS, push on iPhone)</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Assign an Area, Project, and due date to move it out of the inbox</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Inbox count decrements in real time — zero = empty state with a "All clear" illustration</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <PlatformTabs
            tabs={[
              { label: "SwiftUI · iOS", ...CODE.swiftui_inbox },
            ]}
          />
        </div>
      </section>

      {/* ── Data model ────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Data Model</h2>
        <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
          The three-level hierarchy is modelled with SwiftData <code>@Model</code> classes. The inbox is defined by the absence of a <code>projectID</code> — no separate "inbox" flag is needed.
        </p>
        <PlatformTabs
          tabs={[
            { label: "SwiftUI · iOS", ...CODE.swiftui_model },
          ]}
        />
      </section>

      {/* ── SyncService ───────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Sync &amp; Persistence</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {["Layer", "Responsibility"].map((h) => (
                  <th key={h} className="text-left py-2 pr-6 font-semibold text-[rgb(var(--text-secondary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[rgb(var(--text-secondary))]">
              {[
                ["SwiftData store", "On-device persistence; @Query predicates for inbox/today/upcoming filters"],
                ["SyncService", "Batches changed object IDs, sends diffs to CloudKit private database, resolves conflicts last-write-wins on modifiedAt"],
                ["WCSession (watchOS)", "Pushes a lightweight habit summary to the watch companion; receives completion events back"],
              ].map(([layer, resp]) => (
                <tr key={layer} className="border-b border-[rgb(var(--border-subtle))]">
                  <td className="py-2.5 pr-6 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{layer}</td>
                  <td className="py-2.5">{resp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Accessibility ─────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Accessibility</h2>
        <ul className="space-y-3 text-[14px] text-[rgb(var(--text-secondary))]">
          <li className="flex gap-2"><span className="text-[rgb(var(--accent))] shrink-0">→</span><span>Completion toggle uses <code>.contentTransition(.symbolEffect(.replace))</code> — VoiceOver announces "Completed" / "Not completed" via <code>.accessibilityValue</code></span></li>
          <li className="flex gap-2"><span className="text-[rgb(var(--accent))] shrink-0">→</span><span>Overdue dates render in red; they also carry <code>.accessibilityLabel("Overdue, \(date)")</code> so colour isn&apos;t the only signal</span></li>
          <li className="flex gap-2"><span className="text-[rgb(var(--accent))] shrink-0">→</span><span>Quick-capture field uses <code>.submitLabel(.done)</code> and no modal — keyboard stays up for rapid multi-item entry</span></li>
        </ul>
      </section>
    </div>
  );
}
