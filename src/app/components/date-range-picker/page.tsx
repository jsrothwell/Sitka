import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Date Range Picker" };

// ── SVG Demo ─────────────────────────────────────────────────────────────────

const P = {
  surface:  "#0d0d11",
  raised:   "#14141a",
  border:   "#262630",
  text:     "#f2f2f6",
  subtle:   "#9b9baa",
  tertiary: "#646473",
  accent:   "#60a5fa",
  accentBg: "rgba(96,165,250,0.18)",
  accentStart: "rgba(96,165,250,0.35)",
};

function CalendarDiagram() {
  const W = 560, H = 220;

  // Calendar grid — left panel: May 2025, right panel: June 2025
  const cellW = 28, cellH = 28, cols = 7;
  const headerH = 32;

  // Days for May 2025: starts on Thursday (index 3), 31 days
  const mayStart = 3;
  const mayDays = 31;

  // Selected range: May 14 – May 22
  const rangeStart = 14;
  const rangeEnd = 22;

  // Simplified: draw only left calendar (May)
  const calX = 40, calY = 24;
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const totalCells = mayStart + mayDays;
  const rows = Math.ceil(totalCells / 7);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      <rect width={W} height={H} fill={P.surface} rx={12} />

      {/* Left calendar panel */}
      <rect x={calX - 8} y={calY - 8} width={cols * cellW + 16} height={rows * cellH + headerH + 16} rx={10} fill={P.raised} stroke={P.border} strokeWidth={1} />

      {/* Month header */}
      <text x={calX + (cols * cellW) / 2} y={calY + 10} fontSize={12} fill={P.text} textAnchor="middle" fontWeight={700}>May 2025</text>
      <text x={calX - 2} y={calY + 10} fontSize={14} fill={P.subtle} textAnchor="middle">‹</text>
      <text x={calX + cols * cellW + 2} y={calY + 10} fontSize={14} fill={P.subtle} textAnchor="middle">›</text>

      {/* Day-of-week labels */}
      {daysOfWeek.map((d, i) => (
        <text key={i} x={calX + i * cellW + cellW / 2} y={calY + headerH - 6} fontSize={9} fill={P.tertiary} textAnchor="middle" fontWeight={600}>
          {d}
        </text>
      ))}

      {/* Day cells */}
      {Array.from({ length: mayDays }, (_, idx) => {
        const day = idx + 1;
        const cellIdx = idx + mayStart;
        const row = Math.floor(cellIdx / cols);
        const col = cellIdx % cols;
        const cx = calX + col * cellW;
        const cy = calY + headerH + row * cellH;

        const inRange = day >= rangeStart && day <= rangeEnd;
        const isStart = day === rangeStart;
        const isEnd = day === rangeEnd;
        const isToday = day === 5; // visual "today"

        return (
          <g key={day}>
            {/* Range highlight band */}
            {inRange && !isStart && !isEnd && (
              <rect x={cx} y={cy + 4} width={cellW} height={cellH - 8} fill={P.accentBg} />
            )}
            {isStart && (
              <rect x={cx + cellW / 2} y={cy + 4} width={cellW / 2} height={cellH - 8} fill={P.accentBg} />
            )}
            {isEnd && (
              <rect x={cx} y={cy + 4} width={cellW / 2} height={cellH - 8} fill={P.accentBg} />
            )}

            {/* Start / end circle */}
            {(isStart || isEnd) && (
              <circle cx={cx + cellW / 2} cy={cy + cellH / 2} r={12} fill={P.accent} />
            )}

            {/* Today ring */}
            {isToday && !inRange && (
              <circle cx={cx + cellW / 2} cy={cy + cellH / 2} r={11} fill="none" stroke={P.accent} strokeWidth={1.5} />
            )}

            <text
              x={cx + cellW / 2}
              y={cy + cellH / 2 + 4}
              fontSize={11}
              fill={isStart || isEnd ? P.surface : inRange ? P.accent : isToday ? P.accent : P.text}
              textAnchor="middle"
              fontWeight={isStart || isEnd ? 700 : inRange ? 600 : 400}
            >
              {day}
            </text>
          </g>
        );
      })}

      {/* Right side: input fields */}
      <g>
        <text x={360} y={40} fontSize={9} fill={P.tertiary} fontWeight={600} letterSpacing={0.5}>DATE RANGE INPUTS</text>

        {/* Start date */}
        <rect x={352} y={50} width={90} height={32} rx={7} fill={P.raised} stroke={P.accent} strokeWidth={1.5} />
        <text x={360} y={71} fontSize={11} fill={P.subtle}>From</text>
        <text x={392} y={71} fontSize={12} fill={P.text} fontWeight={600}>May 14</text>

        <text x={446} y={68} fontSize={14} fill={P.tertiary}>→</text>

        {/* End date */}
        <rect x={460} y={50} width={86} height={32} rx={7} fill={P.raised} stroke={P.border} strokeWidth={1} />
        <text x={468} y={71} fontSize={11} fill={P.subtle}>To</text>
        <text x={490} y={71} fontSize={12} fill={P.text} fontWeight={600}>May 22</text>

        {/* Preset chips */}
        <text x={352} y={110} fontSize={9} fill={P.tertiary} fontWeight={600} letterSpacing={0.5}>PRESETS</text>
        {["Today", "7 days", "30 days", "Quarter"].map((preset, i) => (
          <g key={preset}>
            <rect x={352 + i * 48} y={118} width={44} height={22} rx={5}
              fill={i === 1 ? P.accent : P.raised}
              stroke={i === 1 ? P.accent : P.border}
              strokeWidth={1}
            />
            <text x={374 + i * 48} y={133} fontSize={10} fill={i === 1 ? P.surface : P.subtle} textAnchor="middle" fontWeight={i === 1 ? 700 : 500}>
              {preset}
            </text>
          </g>
        ))}

        {/* Summary */}
        <text x={352} y={168} fontSize={10} fill={P.subtle}>8 days selected</text>
        <rect x={352} y={178} width={88} height={24} rx={6} fill={P.accent} />
        <text x={396} y={194} fontSize={11} fill={P.surface} textAnchor="middle" fontWeight={700}>Apply Range</text>
      </g>
    </svg>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

const PROPS = [
  {
    name: "value",
    type: "{ start: Date | null; end: Date | null }",
    description: "Controlled date range. Pass null for unset start or end.",
  },
  {
    name: "onChange",
    type: "(range: { start: Date | null; end: Date | null }) => void",
    description: "Called after each selection change — fires after start is picked, then after end is picked.",
  },
  {
    name: "presets",
    type: "Array<{ label: string; range: () => { start: Date; end: Date } }>",
    description: "Quick-select preset buttons displayed above or beside the calendar.",
  },
  {
    name: "minDate",
    type: "Date",
    description: "Earliest selectable date. Dates before this are rendered disabled.",
  },
  {
    name: "maxDate",
    type: "Date",
    description: "Latest selectable date. Defaults to no upper bound.",
  },
  {
    name: "numberOfMonths",
    type: "1 | 2",
    default: "2",
    description: "How many calendar months to show side-by-side. Use 1 on narrow viewports.",
  },
  {
    name: "firstDayOfWeek",
    type: "0 | 1",
    default: "0",
    description: "0 = Sunday, 1 = Monday. Affects the grid column order.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the trigger and calendar.",
  },
];

// ── Code ──────────────────────────────────────────────────────────────────────

const CODE = {
  react: {
    filename: "DateRangePicker.tsx",
    code: `import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { startOfDay, subDays, endOfDay } from "date-fns";

const [range, setRange] = useState<{
  start: Date | null;
  end: Date | null;
}>({ start: null, end: null });

// Basic
<DateRangePicker value={range} onChange={setRange} />

// With presets
const PRESETS = [
  {
    label: "Today",
    range: () => ({ start: startOfDay(new Date()), end: endOfDay(new Date()) }),
  },
  {
    label: "Last 7 days",
    range: () => ({ start: subDays(new Date(), 6), end: new Date() }),
  },
  {
    label: "Last 30 days",
    range: () => ({ start: subDays(new Date(), 29), end: new Date() }),
  },
  {
    label: "This quarter",
    range: () => {
      const now = new Date();
      const q = Math.floor(now.getMonth() / 3);
      return {
        start: new Date(now.getFullYear(), q * 3, 1),
        end:   new Date(now.getFullYear(), q * 3 + 3, 0),
      };
    },
  },
];

<DateRangePicker
  value={range}
  onChange={setRange}
  presets={PRESETS}
  minDate={new Date("2020-01-01")}
  maxDate={new Date()}
/>

// Single-month on mobile
<DateRangePicker
  value={range}
  onChange={setRange}
  numberOfMonths={1}
/>`,
  },
  html: {
    filename: "date-range-picker.html",
    code: `<!-- Native fallback: two <input type="date"> fields -->
<fieldset class="date-range-fieldset">
  <legend class="sr-only">Date range</legend>

  <div class="date-range-inputs">
    <label class="date-range-label">
      <span>From</span>
      <input
        type="date"
        id="date-start"
        name="date-start"
        class="input date-input"
        aria-label="Start date"
      />
    </label>

    <span class="date-range-sep" aria-hidden="true">→</span>

    <label class="date-range-label">
      <span>To</span>
      <input
        type="date"
        id="date-end"
        name="date-end"
        class="input date-input"
        aria-label="End date"
      />
    </label>
  </div>
</fieldset>

<style>
  .date-range-inputs {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .date-range-label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    color: rgb(var(--text-secondary));
  }

  .date-input {
    width: 150px;
  }

  .date-range-sep {
    color: rgb(var(--text-tertiary));
    margin-top: 18px;
  }
</style>`,
  },
  swift: {
    filename: "SitkaDateRangePicker.swift",
    code: `import SwiftUI

struct DateRange {
    var start: Date?
    var end: Date?
}

struct SitkaDateRangePicker: View {
    @Binding var range: DateRange
    var minDate: Date? = nil
    var maxDate: Date? = nil

    @State private var displayedMonth = Calendar.current.date(
        from: Calendar.current.dateComponents([.year, .month], from: .now)
    )!

    private var calendar: Calendar { .current }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Month navigation
            HStack {
                Button { shiftMonth(-1) } label: {
                    Image(systemName: "chevron.left")
                }
                .buttonStyle(.plain)

                Text(displayedMonth, format: .dateTime.year().month(.wide))
                    .font(.system(size: 14, weight: .bold))
                    .frame(maxWidth: .infinity)

                Button { shiftMonth(1) } label: {
                    Image(systemName: "chevron.right")
                }
                .buttonStyle(.plain)
            }

            // Day-of-week headers
            HStack(spacing: 0) {
                ForEach(["S","M","T","W","T","F","S"], id: \\.self) { d in
                    Text(d)
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundColor(.secondary)
                        .frame(maxWidth: .infinity)
                }
            }

            // Calendar grid
            let days = daysInMonth(displayedMonth)
            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 0), count: 7), spacing: 0) {
                ForEach(days, id: \\.self) { date in
                    DayCell(
                        date: date,
                        range: range,
                        minDate: minDate,
                        maxDate: maxDate
                    ) {
                        selectDate(date)
                    }
                }
            }
        }
        .padding(12)
        .background(Color(UIColor.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        .shadow(color: .black.opacity(0.15), radius: 12, x: 0, y: 6)
    }

    private func selectDate(_ date: Date) {
        if range.start == nil || (range.start != nil && range.end != nil) {
            range = DateRange(start: date, end: nil)
        } else if let start = range.start, date >= start {
            range.end = date
        } else {
            range = DateRange(start: date, end: nil)
        }
    }

    private func shiftMonth(_ delta: Int) {
        displayedMonth = calendar.date(byAdding: .month, value: delta, to: displayedMonth)!
    }

    private func daysInMonth(_ date: Date) -> [Date] {
        guard let range = calendar.range(of: .day, in: .month, for: date),
              let first = calendar.date(from: calendar.dateComponents([.year, .month], from: date))
        else { return [] }

        let weekday = calendar.component(.weekday, from: first) - 1
        let padding = Array(repeating: Date.distantPast, count: weekday)
        let dates = range.compactMap { calendar.date(byAdding: .day, value: $0 - 1, to: first) }
        return padding + dates
    }
}`,
  },
  macos: {
    filename: "SitkaDateRangePicker+macOS.swift",
    code: `import SwiftUI

// On macOS 13+, use the built-in DatePicker with .graphical style for a
// native calendar picker. For a date range, pair two DatePickers in a
// sheet or popover.

struct DateRange {
    var start: Date?
    var end: Date?
}

struct SitkaDateRangePicker: View {
    @Binding var range: DateRange
    var minDate: Date? = nil
    var maxDate: Date? = nil

    @State private var displayedMonth = Calendar.current.date(
        from: Calendar.current.dateComponents([.year, .month], from: .now)
    )!

    private var calendar: Calendar { .current }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            // Month navigation
            HStack {
                Button { shiftMonth(-1) } label: {
                    Image(systemName: "chevron.left").font(.system(size: 11))
                }
                .buttonStyle(.plain)

                Text(displayedMonth, format: .dateTime.year().month(.wide))
                    .font(.system(size: 13, weight: .bold))
                    .frame(maxWidth: .infinity)

                Button { shiftMonth(1) } label: {
                    Image(systemName: "chevron.right").font(.system(size: 11))
                }
                .buttonStyle(.plain)
            }

            // Day-of-week headers
            HStack(spacing: 0) {
                ForEach(["S","M","T","W","T","F","S"], id: \\.self) { d in
                    Text(d)
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundColor(Color(.tertiaryLabelColor))
                        .frame(maxWidth: .infinity)
                }
            }

            // Calendar grid
            let days = daysInMonth(displayedMonth)
            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 0), count: 7), spacing: 0) {
                ForEach(days, id: \\.self) { date in
                    DayCell(date: date, range: range, minDate: minDate, maxDate: maxDate) {
                        selectDate(date)
                    }
                }
            }
        }
        .padding(12)
        .background(Color(NSColor.controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 10, style: .continuous)
                .stroke(Color(NSColor.separatorColor), lineWidth: 1)
        )
        .shadow(color: .black.opacity(0.08), radius: 8, x: 0, y: 3)
        .frame(width: 260)
    }

    private func selectDate(_ date: Date) {
        if range.start == nil || (range.start != nil && range.end != nil) {
            range = DateRange(start: date, end: nil)
        } else if let start = range.start, date >= start {
            range.end = date
        } else {
            range = DateRange(start: date, end: nil)
        }
    }

    private func shiftMonth(_ delta: Int) {
        displayedMonth = calendar.date(byAdding: .month, value: delta, to: displayedMonth)!
    }

    private func daysInMonth(_ date: Date) -> [Date] {
        guard let monthRange = calendar.range(of: .day, in: .month, for: date),
              let first = calendar.date(from: calendar.dateComponents([.year, .month], from: date))
        else { return [] }

        let weekday = calendar.component(.weekday, from: first) - 1
        let padding = Array(repeating: Date.distantPast, count: weekday)
        let dates = monthRange.compactMap { calendar.date(byAdding: .day, value: $0 - 1, to: first) }
        return padding + dates
    }
}

#Preview {
    @Previewable @State var range = DateRange()

    SitkaDateRangePicker(range: $range)
        .padding()
}`,
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DateRangePickerPage() {
  return (
    <div>
      <PageHeader
        title="Date Range Picker"
        description="Calendar-based picker for selecting a start and end date. Supports presets, min/max bounds, and single or dual-month display."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <div className="p-6" style={{ backgroundColor: P.surface, borderRadius: 12, width: "100%" }}>
            <CalendarDiagram />
          </div>
        </ComponentPreview>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The picker consists of a trigger (two date input fields), a floating calendar panel, optional preset chips, and an Apply button for confirmed selection.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Region", "Purpose"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { region: "Trigger inputs",  purpose: "Show the current start and end date. Clicking either opens the calendar." },
                { region: "Month navigation", purpose: "Prev/next arrows step one month at a time. Clicking the month/year label opens a month/year selector." },
                { region: "Calendar grid",   purpose: "7-column grid. Days before the month pad the first row. Selected range is highlighted in a band." },
                { region: "Preset chips",    purpose: "One-click shortcuts for common ranges (Today, Last 7 days, etc.). Shown in a row above or beside the grid." },
                { region: "Apply button",    purpose: "Commits the selection. Until clicked, changes are in a pending state visible only in the calendar." },
              ].map((row, i) => (
                <tr key={row.region} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))] whitespace-nowrap">{row.region}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interaction model */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Interaction Model</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Selection follows a two-click pattern: the first click sets the start date, the second click on any later date sets the end date. Hovering between clicks previews the range.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["State", "Visual", "Behaviour"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { state: "Empty",         visual: "No highlight",                       behaviour: "First click → sets start, enters 'awaiting end' state." },
                { state: "Awaiting end",  visual: "Start dot, hover preview band",      behaviour: "Hover shows tentative range. Click confirms end." },
                { state: "Range set",     visual: "Filled band, start + end circles",   behaviour: "Click anywhere restarts selection from scratch." },
                { state: "Same day",      visual: "Single circle, no band",             behaviour: "Allowed. start === end is a valid 1-day range." },
                { state: "Reverse click", visual: "Swaps start and end automatically",  behaviour: "If user clicks a date before the current start, it becomes the new start." },
              ].map((row, i) => (
                <tr key={row.state} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))]">{row.state}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.visual}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.behaviour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'The calendar grid uses role="grid", each row is role="row", and each day cell is role="gridcell" with aria-selected and aria-disabled as appropriate.',
            'Selected range days have aria-pressed="true" and a visually-hidden label: "14 May, selected range start" / "22 May, selected range end" / "15 May, within range".',
            'The trigger inputs accept direct text entry in ISO or locale format as a fallback — do not make the calendar the only input mechanism.',
            "Month navigation arrows must be keyboard-focusable with clear aria-labels: 'Previous month' and 'Next month'.",
            "The floating panel is trapped for keyboard navigation. Tab cycles through: prev-month, grid cells, next-month, presets, Apply, then back.",
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
