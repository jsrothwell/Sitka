import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PropsTable } from "@/components/docs/PropsTable";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Date and Time Pickers" };

const DATE_PICKER_PROPS = [
  { name: "value", type: "Date", description: "Currently selected date." },
  { name: "onChange", type: "(date: Date) => void", description: "Callback fired when date changes." },
  { name: "minDate", type: "Date", description: "Minimum selectable date." },
  { name: "maxDate", type: "Date", description: "Maximum selectable date." },
  { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
  { name: "label", type: "string", description: "Label text for the input." },
  { name: "placeholder", type: "string", default: "Select date", description: "Placeholder text when empty." },
];

const TIME_PICKER_PROPS = [
  { name: "value", type: "string", description: "Current time in HH:MM format." },
  { name: "onChange", type: "(time: string) => void", description: "Callback fired when time changes." },
  { name: "minTime", type: "string", description: "Earliest selectable time (HH:MM)." },
  { name: "maxTime", type: "string", description: "Latest selectable time (HH:MM)." },
  { name: "step", type: "number", default: "30", description: "Minute increment (5, 10, 15, 30, 60)." },
  { name: "label", type: "string", description: "Label text for the input." },
  { name: "format", type: '"12h" | "24h"', default: '"24h"', description: "Time format to display." },
];

const CODE = {
  react: {
    filename: "DatePicker.tsx",
    code: `"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  placeholder?: string;
};

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  label,
  placeholder = "Select date",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(value || new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const year = displayMonth.getFullYear();
  const month = displayMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const generateCalendar = () => {
    const days = [];
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isOtherMonth: true,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }
    // Current month days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);
      const isSelected = value && date.toDateString() === value.toDateString();
      const isToday = date.toDateString() === today.toDateString();
      days.push({ day, isOtherMonth: false, date, isDisabled, isSelected, isToday });
    }
    // Next month days
    const totalCells = Math.ceil((days.length + firstDay) / 7) * 7;
    const remaining = totalCells - days.length;
    for (let day = 1; day <= remaining; day++) {
      days.push({
        day,
        isOtherMonth: true,
        date: new Date(year, month + 1, day),
      });
    }
    return days;
  };

  const handleDayClick = (date: Date, isDisabled: boolean) => {
    if (isDisabled) return;
    onChange?.(date);
    setIsOpen(false);
  };

  const prevMonth = () => setDisplayMonth(new Date(year, month - 1));
  const nextMonth = () => setDisplayMonth(new Date(year, month + 1));
  const calendarDays = generateCalendar();

  return (
    <div className="relative" ref={ref}>
      {label && (
        <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))] mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full rounded-lg border px-4 py-2.5 text-left flex items-center gap-2",
          "bg-[rgb(var(--surface))] border-[rgb(var(--border))]",
          "text-[13px] text-[rgb(var(--text-primary))]",
          "hover:border-[rgb(var(--accent))] focus:border-[rgb(var(--accent))]",
          "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/20",
          "transition-colors"
        )}
      >
        <CalendarIcon className="w-4 h-4 text-[rgb(var(--text-tertiary))]" />
        <span className="flex-1 truncate">
          {value ? value.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : placeholder}
        </span>
        <ChevronRight className={cn("w-4 h-4 text-[rgb(var(--text-tertiary))] transition-transform", isOpen && "rotate-90")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50">
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-1.5 rounded hover:bg-[rgb(var(--surface))] transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[14px] font-medium text-[rgb(var(--text-primary))]">
                {displayMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
              </span>
              <button
                onClick={nextMonth}
                className="p-1.5 rounded hover:bg-[rgb(var(--surface))] transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            {/* Weekday labels */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((day) => (
                <div key={day} className="text-center text-[10px] font-semibold text-[rgb(var(--text-tertiary))] py-1">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map(({ day, isOtherMonth, date, isDisabled, isSelected, isToday }, i) => (
                <button
                  key={i}
                  onClick={() => handleDayClick(date, !!isDisabled)}
                  disabled={isDisabled}
                  className={cn(
                    "w-8 h-8 rounded-full text-[12px] font-medium flex items-center justify-center",
                    "transition-colors",
                    isOtherMonth && "text-[rgb(var(--text-tertiary))] opacity-40",
                    isDisabled && "text-[rgb(var(--text-tertiary))] opacity-30 cursor-not-allowed",
                    isSelected && "bg-[rgb(var(--accent))] text-white",
                    !isSelected && !isDisabled && !isOtherMonth && "hover:bg-[rgb(var(--surface))] text-[rgb(var(--text-primary))]",
                    isToday && !isSelected && "font-bold border border-[rgb(var(--accent))]",
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TimePicker({
  value,
  onChange,
  minTime,
  maxTime,
  step = 30,
  label,
  format = "24h",
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const generateTimes = () => {
    const times = [];
    const [minHour, minMin] = minTime ? minTime.split(":").map(Number) : [0, 0];
    const [maxHour, maxMin] = maxTime ? maxTime.split(":").map(Number) : [23, 59];
    const minTotal = minHour * 60 + minMin;
    const maxTotal = maxHour * 60 + maxMin;

    for (let minutes = minTotal; minutes <= maxTotal; minutes += step) {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      const time24 = String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
      const time12 = format === "12h"
        ? (h % 12 || 12) + ":" + String(m).padStart(2, "0") + " " + (h < 12 ? "AM" : "PM")
        : time24;
      times.push({ value: time24, label: time12 });
    }
    return times;
  };

  const times = generateTimes();

  return (
    <div className="relative">
      {label && (
        <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))] mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full rounded-lg border px-4 py-2.5 text-left flex items-center gap-2",
          "bg-[rgb(var(--surface))] border-[rgb(var(--border))]",
          "text-[13px] text-[rgb(var(--text-primary))]",
          "hover:border-[rgb(var(--accent))] focus:border-[rgb(var(--accent))]",
          "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/20",
        )}
      >
        <span className="flex-1 truncate">{value || "Select time"}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full">
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-2 max-h-60 overflow-auto">
            {times.map(({ value: t, label }) => (
              <button
                key={t}
                onClick={() => {
                  onChange?.(t);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-[13px]",
                  "hover:bg-[rgb(var(--surface))] transition-colors",
                  value === t && "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] font-medium",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
`,
  },
  html: {
    filename: "pickers.html",
    code: `<div class="date-picker">
  <label class="picker-label">Select date</label>
  <div class="picker-input">
    <span class="picker-icon">📅</span>
    <span class="picker-text">January 15, 2024</span>
    <span class="picker-arrow">▼</span>
  </div>
  <div class="calendar-popup">
    <div class="calendar-header">
      <button class="nav-btn">‹</button>
      <span class="month-label">January 2024</span>
      <button class="nav-btn">›</button>
    </div>
    <div class="calendar-grid">
      <div class="weekday">Su</div>
      <div class="weekday">Mo</div>
      <div class="weekday">Tu</div>
      <div class="weekday">We</div>
      <div class="weekday">Th</div>
      <div class="weekday">Fr</div>
      <div class="weekday">Sa</div>
      <!-- Days rendered here -->
    </div>
  </div>
</div>

<div class="time-picker">
  <label class="picker-label">Select time</label>
  <div class="picker-input">
    <span class="picker-text">14:30</span>
    <span class="picker-arrow">▼</span>
  </div>
  <div class="time-options">
    <div class="time-option">09:00</div>
    <div class="time-option">09:30</div>
    <div class="time-option selected">10:00</div>
    <!-- More times -->
  </div>
</div>

<style>
.picker-input {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; border: 1px solid var(--border);
  border-radius: 8px; background: var(--surface);
  cursor: pointer;
}
.calendar-popup {
  position: absolute; z-index: 10;
  background: var(--surface-raised); border: 1px solid var(--border);
  border-radius: 12px; padding: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.calendar-day {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; cursor: pointer;
}
.calendar-day.selected { background: var(--accent); color: white; }
.calendar-day.today { font-weight: bold; border: 1px solid var(--accent); }
.time-options {
  position: absolute; z-index: 10;
  background: var(--surface-raised); border: 1px solid var(--border);
  border-radius: 8px; padding: 8px;
  max-height: 200px; overflow: auto;
}
.time-option {
  padding: 8px 12px; border-radius: 6px; cursor: pointer;
}
.time-option:hover { background: var(--surface); }
.time-option.selected { background: var(--accent-subtle); color: var(--accent); }
</style>`,
  },
  swift: {
    filename: "DatePickerView.swift",
    code: `import SwiftUI

struct DatePickerView: View {
    @State private var selectedDate = Date()
    @State private var selectedTime = "14:30"
    
    var body: some View {
        Form {
            Section("Date") {
                DatePicker(
                    "Select date",
                    selection: $selectedDate,
                    displayedComponents: .date
                )
                .datePickerStyle(.graphical)
            }
            
            Section("Time") {
                Picker("Select time", selection: $selectedTime) {
                    ForEach(generateTimes(), id: \.self) { time in
                        Text(time).tag(time)
                    }
                }
                .pickerStyle(.menu)
            }
        }
        .navigationTitle("Schedule")
    }
    
    func generateTimes() -> [String] {
        (0...23).flatMap { hour in
            (0..<60).stride(by: 30).map { minute in
                String(format: "%02d:%02d", hour, minute)
            }
        }
    }
}

#Preview {
    NavigationStack {
        DatePickerView()
    }
}`,
  },
};

const DATE_EXAMPLES = [
  { type: "Single date", desc: "Choose one date like appointment, birthday, or deadline" },
  { type: "Date range", desc: "Select start and end dates for booking or reporting" },
];

const TIME_EXAMPLES = [
  { type: "24-hour format", desc: "Military time, common in many regions and digital devices" },
  { type: "12-hour format", desc: "AM/PM format, common in the US and some other regions" },
];

export default function DateTimePickersPage() {
  return (
    <div>
      <PageHeader
        title="Date and Time Pickers"
        description="Help users select dates and times accurately with calendar views and time lists. Supports date ranges, min/max boundaries, and keyboard navigation."
      />

      {/* Date picker section */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Date picker</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Choose specific dates from a calendar interface. Supports single dates or date ranges with configurable boundaries.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-sm mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <DatePickerDemo />
          </div>
        </ComponentPreview>
      </section>

      {/* Time picker section */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Time picker</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Select precise times from a scrollable list or dropdown. Supports 12-hour and 24-hour formats with configurable increments.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-sm mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <TimePickerDemo />
          </div>
        </ComponentPreview>
      </section>

      {/* Use cases */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Use cases</h2>
        <div className="grid grid-cols-2 gap-4">
          {DATE_EXAMPLES.map((ex) => (
            <div key={ex.type} className="rounded-xl border border-[rgb(var(--border))] p-4 bg-[rgb(var(--surface))]">
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1">{ex.type}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))]">{ex.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Date picker anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Date picker anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex items-center justify-center">
          <svg viewBox="0 0 320 280" width="320" height="280" className="max-w-full">
            {/* Calendar popup */}
            <rect x="20" y="120" width="280" height="160" rx="12" fill="rgb(var(--surface-raised))" stroke="rgb(var(--border))" strokeWidth="1" />
            {/* Header */}
            <rect x="20" y="120" width="280" height="40" fill="rgb(var(--surface))" rx="12" rxTopLeft="12" rxTopRight="12" />
            <text x="160" y="146" textAnchor="middle" fontSize="12" fontWeight="600" fill="rgb(var(--text-primary))">January 2024</text>
            <text x="60" y="146" textAnchor="middle" fontSize="14" fill="rgb(var(--text-secondary))">‹</text>
            <text x="260" y="146" textAnchor="middle" fontSize="14" fill="rgb(var(--text-secondary))">›</text>
            {/* Weekdays */}
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <text key={d} x={50 + i * 36} y="176" textAnchor="middle" fontSize="10" fontWeight="600" fill="rgb(var(--text-tertiary))">{d}</text>
            ))}
            {/* Day grid */}
            {Array.from({ length: 35 }, (_, i) => {
              const row = Math.floor(i / 7);
              const col = i % 7;
              const day = i - 3 + 1;
              if (day < 1 || day > 31) return null;
              return (
                <g key={i}>
                   <rect x={34 + col * 36} y={190 + row * 28} width="28" height="28" rx="6" fill={day === 15 ? "rgb(var(--accent))" : "transparent"} />
                  <text x={48 + col * 36} y={210 + row * 28} textAnchor="middle" fontSize="12" fill={day === 15 ? "white" : "rgb(var(--text-primary))"} fontWeight={day === 15 ? "600" : "400"}>{day}</text>
                </g>
              );
            })}
            {/* Input trigger */}
            <rect x="100" y="60" width="120" height="40" rx="10" fill="rgb(var(--surface))" stroke="rgb(var(--border))" strokeWidth="1" />
            <text x="120" y="86" fontSize="13" fill="rgb(var(--text-primary))">January 15, 2024</text>
            <text x="200" y="86" fontSize="14" fill="rgb(var(--text-tertiary))">▼</text>
            <text x="130" y="50" fontSize="10" fill="rgb(var(--text-tertiary))">SELECT DATE</text>
            {/* Connection line */}
            <line x1="160" y1="100" x2="160" y2="120" stroke="rgb(var(--border))" strokeWidth="1" strokeDasharray="4 2" />
          </svg>
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Calendar states</h2>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["State", "Appearance", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { state: "Default", appearance: "Normal date, clickable", notes: "Today may be highlighted with a border or bold text" },
                { state: "Hover", appearance: "Background highlight with pointer cursor", notes: "Indicates interactivity" },
                { state: "Selected", appearance: "Filled with accent color, white text", notes: "Confirms the chosen date" },
                { state: "Today", appearance: "Bold text or accent border", notes: "Visual anchor for current date" },
                { state: "Disabled", appearance: "Grayed out, non-clickable", notes: "Dates outside min/max boundaries" },
                { state: "Other month", appearance: "Faded text", notes: "Days from adjacent months" },
              ].map((s, i) => (
                <tr key={s.state} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{s.state}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{s.appearance}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage guidelines</h2>
        <div className="grid grid-cols-2 gap-4">
          {[{ type: "do", items: ["Provide a clear label indicating what date is needed", "Set sensible min/max boundaries to prevent invalid dates", "Default to today or a meaningful date, not an arbitrary past date", "Include a placeholder showing the expected format"] },
            { type: "dont", items: ["Don't make users type dates manually in most cases", "Avoid date pickers for birth dates far in the past (use age input)", "Don't rely on date pickers alone — always validate on the server", "Avoid calendar widgets that require excessive scrolling"] },
          ].map(({ type, items }) => (
            <div key={type} className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
              <div className={`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${
                type === "do" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" : "text-red-500 bg-red-50 dark:bg-red-950/20"
              }`}>
                {type === "do" ? "✓ Do" : "✗ Don't"}
              </div>
              <ul className="p-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-[12px] text-[rgb(var(--text-secondary))] flex gap-2">
                    <span className={type === "do" ? "text-emerald-500" : "text-red-400"}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Date picker props</h2>
        <PropsTable props={DATE_PICKER_PROPS} />
      </section>
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Time picker props</h2>
        <PropsTable props={TIME_PICKER_PROPS} />
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
           {["Date pickers must have associated labels via aria-label or aria-labelledby.",
            "Keyboard: Arrow keys navigate days; PageUp/PageDown change months; Home/End go to start/end of week.",
            "Time pickers must announce the currently focused time option.",
            "ESC key should close open pickers; Enter should select the focused date/time.",
            "Provide clear announcements when min/max boundaries prevent selection.",
            "The calendar popup must have role='dialog' and aria-modal='true' when open.",
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

function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <div className="space-y-2">
      <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">Select date</label>
      <div className="relative">
        <input
          type="date"
          value={date?.toISOString().split("T")[0] || ""}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-2.5 text-[13px] pr-10 cursor-pointer"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none">📅</span>
      </div>
      {date && (
        <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-1">
          Selected: {date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      )}
    </div>
  );
}

function TimePickerDemo() {
  const [time, setTime] = useState("14:30");
  return (
    <div className="space-y-2">
      <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">Select time</label>
      <div className="relative">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-2.5 text-[13px] pr-10 cursor-pointer"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none">🕒</span>
      </div>
    </div>
  );
}
