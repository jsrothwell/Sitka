"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

// ── Sample email text ──────────────────────────────────────────────────────────
const SAMPLE_EMAIL = `Hi Jamie,

Great speaking with you earlier! I'd like to invite you for a technical interview with the Meridian team.

Date: Thursday, June 12th at 2:00 PM EST
Duration: 60 minutes
Format: Video call via Zoom

Join the meeting here: https://zoom.us/j/92847561023

Please let us know if this time works for you, or if you'd prefer an alternative slot.

Best,
Sarah Chen
Talent Acquisition · Meridian AI`;

// ── Parsed result display ──────────────────────────────────────────────────────
interface ParsedResult {
  company: string;
  dateTime: string;
  timeZone: string;
  platform: string;
  meetingUrl: string;
  confidence: "high" | "medium" | "low";
}

function parseDemo(text: string): ParsedResult | null {
  if (!text.trim()) return null;
  const hasZoom    = text.includes("zoom.us");
  const hasMeet    = text.includes("meet.google.com");
  const hasTeams   = text.includes("teams.microsoft.com");
  const dateMatch  = text.match(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)[\s,]+\w+ \d+\w*/i) ||
                     text.match(/\b\w+ \d{1,2}(?:th|st|nd|rd)?\b/i);
  const timeMatch  = text.match(/\d{1,2}(?::\d{2})?\s*(?:AM|PM)/i);
  const tzMatch    = text.match(/\b(EST|PST|CST|MST|GMT|UTC|AEST|BST|CET|SGT)\b/i);
  const compMatch  = text.match(/(?:with the |at |from )([A-Z][a-zA-Z ]+?)(?:\s+team|\s+group|\.|,)/);

  if (!dateMatch && !timeMatch) return null;

  return {
    company:    compMatch?.[1] ?? "Unknown",
    dateTime:   [dateMatch?.[0], timeMatch?.[0]].filter(Boolean).join(" at ") || "—",
    timeZone:   tzMatch?.[0] ?? "—",
    platform:   hasZoom ? "Zoom" : hasMeet ? "Google Meet" : hasTeams ? "Microsoft Teams" : "Phone / Other",
    meetingUrl: hasZoom ? "zoom.us/j/…" : hasMeet ? "meet.google.com/…" : hasTeams ? "teams.microsoft.com/…" : "—",
    confidence: (dateMatch && timeMatch && (hasZoom || hasMeet || hasTeams)) ? "high" : timeMatch ? "medium" : "low",
  };
}

const CONFIDENCE_COLOR: Record<string, string> = {
  high:   "text-emerald-500",
  medium: "text-amber-400",
  low:    "text-red-400",
};

// ── Live demo ──────────────────────────────────────────────────────────────────
function InterviewParserDemo() {
  const [emailText, setEmailText] = useState(SAMPLE_EMAIL);
  const [step, setStep] = useState<"input" | "confirm">("input");
  const result = parseDemo(emailText);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ maxWidth: 760 }}>
      {/* Left: email input */}
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
        <div className="px-4 py-3 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[rgb(var(--text-primary))]">Email / Share text</span>
          <button
            onClick={() => setEmailText("")}
            className="text-[11px] text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"
          >
            Clear
          </button>
        </div>
        <textarea
          value={emailText}
          onChange={e => { setEmailText(e.target.value); setStep("input"); }}
          className="w-full p-4 bg-transparent text-[12px] text-[rgb(var(--text-secondary))] resize-none outline-none leading-relaxed"
          rows={14}
          placeholder="Paste interview invitation email here…"
        />
        <div className="px-4 pb-4">
          <button
            onClick={() => result && setStep("confirm")}
            disabled={!result}
            className="w-full py-2 rounded-xl bg-[rgb(var(--accent))] text-white text-[13px] font-semibold
                       disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            Parse Interview Email
          </button>
        </div>
      </div>

      {/* Right: parsed result / confirmation */}
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
        <div className="px-4 py-3 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
          <span className="text-[12px] font-semibold text-[rgb(var(--text-primary))]">
            {step === "confirm" ? "Confirm & Add to Calendar" : "Parsed fields"}
          </span>
        </div>

        {!result ? (
          <div className="p-6 text-[13px] text-[rgb(var(--text-tertiary))] text-center mt-4">
            Paste an interview email to parse fields
          </div>
        ) : (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${CONFIDENCE_COLOR[result.confidence]}`}>
                {result.confidence} confidence
              </span>
            </div>
            {[
              { label: "Company",  value: result.company },
              { label: "Date & Time", value: result.dateTime },
              { label: "Time Zone", value: result.timeZone },
              { label: "Platform", value: result.platform },
              { label: "Meeting URL", value: result.meetingUrl },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-2">
                <span className="text-[12px] text-[rgb(var(--text-tertiary))] w-24 shrink-0">{label}</span>
                <span className="text-[12px] font-medium text-[rgb(var(--text-primary))]">{value}</span>
              </div>
            ))}

            {step === "confirm" && (
              <div className="pt-3 border-t border-[rgb(var(--border))] space-y-2">
                <div className="text-[11px] text-[rgb(var(--text-tertiary))]">Match to job</div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgb(var(--surface-raised))] border border-[rgb(var(--accent-muted))]">
                  <span className="w-2 h-2 rounded-full bg-[rgb(var(--accent))]" />
                  <span className="text-[12px] text-[rgb(var(--text-primary))]">Meridian AI — Backend Eng</span>
                </div>
                <button className="w-full mt-2 py-2 rounded-xl bg-[rgb(var(--accent))] text-white text-[12px] font-semibold hover:opacity-90 transition-opacity">
                  Add to Calendar & Set Interviewing
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Code ───────────────────────────────────────────────────────────────────────
const CODE = {
  swift: {
    filename: "InterviewParser.swift",
    code: `import Foundation

struct ParsedInterview {
    var company:         String?
    var role:            String?
    var dateTime:        Date?
    var timeZone:        TimeZone?
    var meetingURL:      URL?
    var meetingPlatform: String?   // "zoom" | "meet" | "teams" | "phone"
    var rawText:         String
}

struct InterviewParser {
    func parse(text: String) -> ParsedInterview {
        var result = ParsedInterview(rawText: text)

        // ── Date detection (NSDataDetector handles natural language) ──
        let detector = try? NSDataDetector(types: NSTextCheckingResult.CheckingType.date.rawValue)
        let range    = NSRange(text.startIndex..., in: text)
        let matches  = detector?.matches(in: text, range: range) ?? []
        result.dateTime = matches.first?.date
        result.timeZone = matches.first?.timeZone

        // ── Company (heuristic) ────────────────────────────────────────
        let companyPattern = #"(?:at|with|from) the ([A-Z][A-Za-z ]+?) team"#
        if let match = text.firstMatch(of: try! Regex(companyPattern)),
           let cap   = match[1].substring {
            result.company = String(cap)
        }

        // ── Meeting URL ────────────────────────────────────────────────
        let urlPatterns: [(prefix: String, platform: String)] = [
            ("zoom.us/j/",                     "zoom"),
            ("meet.google.com/",               "meet"),
            ("teams.microsoft.com/l/meetup",   "teams"),
        ]
        for candidate in text.components(separatedBy: .whitespaces) {
            guard let url = URL(string: candidate) else { continue }
            for p in urlPatterns {
                if candidate.contains(p.prefix) {
                    result.meetingURL      = url
                    result.meetingPlatform = p.platform
                }
            }
        }
        if result.meetingPlatform == nil { result.meetingPlatform = "phone" }

        return result
    }
}`,
  },
  macos: {
    filename: "InterviewConfirmationSheet+macOS.swift",
    code: `import SwiftUI
import EventKit

struct InterviewConfirmationSheet: View {
    let parsed: ParsedInterview
    @Environment(\\.modelContext) private var modelContext
    @Environment(\\.dismiss) private var dismiss

    @State private var selectedJob:  Job? = nil
    @State private var calendarName = "Calendar"
    @State private var calendarStatus = ""
    @Query private var jobs: [Job]

    private var suggestedJobs: [Job] {
        guard let co = parsed.company else { return Array(jobs.prefix(3)) }
        return jobs
            .filter { $0.company.lowercased().contains(co.lowercased()) }
            .prefix(3) + jobs.prefix(3).filter { !$0.company.lowercased().contains(co.lowercased()) }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Interview Invitation")
                .font(.system(size: 18, weight: .bold))

            // Parsed chips
            HStack(spacing: 8) {
                if let dt = parsed.dateTime {
                    chip(dt.formatted(date: .abbreviated, time: .shortened))
                }
                if let tz = parsed.timeZone {
                    chip(tz.abbreviation() ?? tz.identifier)
                }
                if let platform = parsed.meetingPlatform {
                    chip(platform.capitalized)
                }
            }

            // Job picker
            VStack(alignment: .leading, spacing: 6) {
                Text("Match to job").font(.caption).foregroundStyle(.secondary)
                ForEach(suggestedJobs.prefix(3)) { job in
                    jobRow(job)
                }
                Button("None / New Job") { selectedJob = nil }
                    .font(.system(size: 12))
                    .foregroundStyle(.secondary)
            }

            // Meeting URL
            if let url = parsed.meetingURL {
                Link(destination: url) {
                    HStack {
                        Image(systemName: "video.fill")
                        Text(url.absoluteString)
                            .font(.system(size: 12))
                            .lineLimit(1)
                    }
                    .foregroundStyle(Color.accentColor)
                }
            }

            // CTA
            Button(action: confirm) {
                Label("Add to Calendar & Set Interviewing", systemImage: "calendar.badge.plus")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
        }
        .padding(24)
        .frame(width: 460)
    }

    private func chip(_ text: String) -> some View {
        Text(text)
            .font(.system(size: 11, weight: .medium))
            .padding(.horizontal, 10).padding(.vertical, 4)
            .background(Color.accentColor.opacity(0.12))
            .foregroundStyle(Color.accentColor)
            .clipShape(Capsule())
    }

    private func jobRow(_ job: Job) -> some View {
        Button {
            selectedJob = job
        } label: {
            HStack {
                Circle().fill(selectedJob?.id == job.id ? Color.accentColor : Color.secondary.opacity(0.3))
                    .frame(width: 8, height: 8)
                Text(job.company + " · " + job.title)
                    .font(.system(size: 12))
                    .foregroundStyle(.primary)
            }
        }
        .buttonStyle(.plain)
    }

    private func confirm() {
        if let job = selectedJob {
            job.status = .interview
            job.interviewDate = parsed.dateTime
        }
        addCalendarEvent()
        dismiss()
    }

    private func addCalendarEvent() {
        let store = EKEventStore()
        store.requestWriteOnlyAccessToEvents { granted, _ in
            guard granted, let dt = parsed.dateTime else { return }
            DispatchQueue.main.async {
                let event = EKEvent(eventStore: store)
                event.title    = [parsed.company, "Interview"].compactMap { $0 }.joined(separator: " — ")
                event.startDate = dt
                event.endDate   = dt.addingTimeInterval(3600)
                event.calendar  = store.defaultCalendarForNewEvents
                if let url = parsed.meetingURL { event.url = url }
                try? store.save(event, span: .thisEvent)
            }
        }
    }
}`,
  },
  react: {
    filename: "InterviewParser.ts",
    code: `// Web reference — Interview email parser (TypeScript)
export interface ParsedInterview {
  company?:         string;
  dateTime?:        Date;
  timeZoneName?:    string;
  meetingURL?:      string;
  meetingPlatform?: "zoom" | "meet" | "teams" | "phone";
  rawText:          string;
}

const PLATFORM_PATTERNS: [RegExp, "zoom" | "meet" | "teams"][] = [
  [/zoom\\.us\\/j\\/[\\d]+/i, "zoom"],
  [/meet\\.google\\.com\\/[a-z-]+/i, "meet"],
  [/teams\\.microsoft\\.com\\/l\\/meetup/i, "teams"],
];

const TZ_MAP: Record<string, string> = {
  EST: "America/New_York", PST: "America/Los_Angeles",
  CST: "America/Chicago",  MST: "America/Denver",
  GMT: "Europe/London",    UTC: "UTC",
  AEST: "Australia/Sydney", SGT: "Asia/Singapore",
};

export function parseInterviewEmail(text: string): ParsedInterview {
  const result: ParsedInterview = { rawText: text };

  // Company
  const compMatch = text.match(/(?:at|with) the ([A-Z][A-Za-z ]+?) team/);
  if (compMatch) result.company = compMatch[1];

  // Meeting URL
  for (const [pattern, platform] of PLATFORM_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      result.meetingURL      = \`https://\${match[0]}\`;
      result.meetingPlatform = platform;
      break;
    }
  }
  if (!result.meetingPlatform) result.meetingPlatform = "phone";

  // Time zone
  const tzMatch = text.match(/\\b(EST|PST|CST|MST|GMT|UTC|AEST|SGT)\\b/);
  if (tzMatch) result.timeZoneName = TZ_MAP[tzMatch[1]] ?? tzMatch[1];

  // Date — naive extraction, production should use date-fns or chrono-node
  const dateMatch = text.match(
    /(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)[,\\s]+\\w+ \\d{1,2}(?:th|st|nd|rd)?/i
  );
  const timeMatch = text.match(/\\d{1,2}(?::\\d{2})?\\s*(?:AM|PM)/i);
  if (dateMatch && timeMatch) {
    result.dateTime = new Date(\`\${dateMatch[0]} \${timeMatch[0]}\`);
  }

  return result;
}`,
  },
  html: {
    filename: "interview-confirmation.html",
    code: `<!-- Confirmation sheet — Sitka tokens -->
<div class="ic-sheet" role="dialog" aria-modal="true" aria-label="Confirm interview invitation">
  <h2 class="ic-title">Interview Invitation</h2>

  <!-- Parsed chips -->
  <div class="ic-chips">
    <span class="ic-chip">Thu Jun 12 at 2:00 PM</span>
    <span class="ic-chip">EST</span>
    <span class="ic-chip">Zoom</span>
  </div>

  <!-- Job match -->
  <fieldset class="ic-section">
    <legend class="ic-label">Match to job</legend>
    <label class="ic-job-option">
      <input type="radio" name="job" value="meridian" checked />
      Meridian AI — Backend Engineer
    </label>
    <label class="ic-job-option">
      <input type="radio" name="job" value="none" />
      None / New Job
    </label>
  </fieldset>

  <!-- CTA -->
  <button class="ic-cta">Add to Calendar &amp; Set Interviewing</button>
</div>

<style>
.ic-sheet    { background: rgb(var(--surface-raised)); border-radius: 16px;
               padding: 24px; max-width: 440px; }
.ic-title    { font-size: 18px; font-weight: 700; color: rgb(var(--text-primary)); margin: 0 0 16px; }
.ic-chips    { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.ic-chip     { font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 999px;
               background: rgba(var(--accent), 0.12); color: rgb(var(--accent)); }
.ic-section  { border: none; margin: 0 0 20px; padding: 0; }
.ic-label    { font-size: 11px; color: rgb(var(--text-tertiary)); text-transform: uppercase;
               letter-spacing: 0.06em; margin-bottom: 8px; display: block; }
.ic-job-option { display: flex; align-items: center; gap: 8px; font-size: 13px;
                 color: rgb(var(--text-primary)); padding: 6px 0; cursor: pointer; }
.ic-cta      { width: 100%; padding: 12px; border-radius: 12px; border: none; cursor: pointer;
               background: rgb(var(--accent)); color: white;
               font-size: 13px; font-weight: 600; }
</style>`,
  },
};

// ── Main page ──────────────────────────────────────────────────────────────────
export default function InterviewParserPage() {
  return (
    <div>
      <PageHeader
        title="Interview Email Parser"
        description="On-device regex + NSDataDetector engine that extracts date, time, time zone, meeting URL, and company name from interview invitation emails. Presents a confirmation sheet to match the parsed interview to a tracked job and add an EKEvent to the user's calendar."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <InterviewParserDemo />
        <p className="mt-3 text-[12px] text-[rgb(var(--text-tertiary))]">
          Edit the email text and click Parse to see field extraction in real time
        </p>
      </section>

      {/* Signal extraction */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Signal extraction</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The parser uses two different strategies for date/time vs. other fields.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Field</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Strategy</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Fallback</th>
              </tr>
            </thead>
            <tbody>
              {[
                { field: "Date & Time", strategy: "NSDataDetector (.date) — handles most natural-language formats", fallback: "Regex fallback for 'Thursday June 12th at 2 PM'" },
                { field: "Time Zone", strategy: "Regex abbreviation map (EST→America/New_York, AEST→Australia/Sydney, etc.)", fallback: "Device local time zone" },
                { field: "Company", strategy: "Regex: 'at/with/from [the] [Org] team'", fallback: "Linked Job.company field" },
                { field: "Meeting URL", strategy: "Whitespace-tokenise → URL(string:) → match zoom/meet/teams prefix", fallback: "meetingPlatform = 'phone'" },
                { field: "Role", strategy: "Linked Job.title (not extracted from email)", fallback: "—" },
              ].map(row => (
                <tr key={row.field} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.field}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.strategy}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.fallback}</td>
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
            { heading: "Always show a confirmation step", body: "Never auto-create a calendar event without user review. The parsed result has variable confidence — show all extracted fields, allow edits, and require an explicit tap to commit." },
            { heading: "Confidence indicator prevents false trust", body: "Classify confidence as High (date + time + meeting URL all found), Medium (date or time found, but not both), or Low (no date detected). Surface this visually so the user knows to inspect Low results carefully." },
            { heading: "Job matcher by fuzzy name", body: "Filter tracked jobs by company name similarity (lowercased contains-match is sufficient). Show top 3 suggestions. Always include a 'None / New Job' option to avoid forcing a bad match." },
            { heading: "Share Extension is the primary entry point", body: "The user shares plain text from Mail.app or any email client. The extension parses the text and writes a PendingInterviewEntry to the App Group container. The main app reads and clears this entry on next launch." },
            { heading: "Paste fallback for in-app use", body: "Also expose a 'Parse Email' toolbar button inside JobDetailView. This opens a plain text-paste sheet, feeds it to the same InterviewParser, and presents InterviewConfirmationSheet directly — no Share Extension needed." },
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
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Key</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Platform</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Required for</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: "NSCalendarsWriteOnlyAccessUsageDescription", platform: "iOS 17+", required: "EKEventStore.requestWriteOnlyAccessToEvents" },
                { key: "NSCalendarsUsageDescription", platform: "macOS", required: "EKEventStore.requestAccess(to: .event)" },
                { key: "com.apple.security.personal-information.calendars", platform: "macOS entitlement", required: "Hardened runtime calendar access" },
              ].map(row => (
                <tr key={row.key} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-primary))]">{row.key}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.platform}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.required}</td>
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
            "The confirmation sheet must be presented as a modal with accessibilityViewIsModal(true) so VoiceOver does not read underlying content.",
            "Each parsed field row should have an accessibilityLabel combining the field name and value: 'Date and time: Thursday June 12 at 2 PM EST'.",
            "The confidence indicator must not rely on colour alone — include the word (High / Medium / Low) in the accessible label.",
            "The 'Add to Calendar' button should briefly announce success via UIAccessibility.post(notification: .announcement, argument: 'Interview added to calendar') after the event is saved.",
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
