(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72157,e=>{"use strict";let t=(0,e.i(73400).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,t],72157)},60734,e=>{"use strict";let t=(0,e.i(73400).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,t],60734)},51334,e=>{"use strict";var t=e.i(29241),a=e.i(60515),r=e.i(72157),s=e.i(60734),i=e.i(38421),n=e.i(45065),l=e.i(36534);e.s(["CodeBlock",0,function({code:e,language:d="tsx",filename:o,className:c}){let[m,x]=(0,a.useState)(!1),p=async()=>{await navigator.clipboard.writeText(e.trim()),x(!0),setTimeout(()=>x(!1),2e3)};return(0,t.jsxs)("div",{className:(0,l.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",c),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex gap-1.5",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),o&&(0,t.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:o})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:d}),(0,t.jsx)("button",{onClick:p,className:(0,l.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",m?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,t.jsx)(n.AnimatePresence,{mode:"wait",initial:!1,children:m?(0,t.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(r.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,t.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,t.jsx)("code",{children:e.trim()})})})]})}])},60701,e=>{"use strict";var t=e.i(29241),a=e.i(60515),r=e.i(2411);let s=(0,e.i(73400).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var i=e.i(36534);e.s(["ComponentPreview",0,function({children:e,label:n,className:l,dark:d,grid:o}){let[c,m]=(0,a.useState)("desktop");return(0,t.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",l),children:[(0,t.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[n?(0,t.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:n}):(0,t.jsx)("span",{}),(0,t.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:r.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:s,ariaLabel:"Mobile preview"}].map(({value:e,Icon:a,ariaLabel:r})=>(0,t.jsx)("button",{onClick:()=>m(e),"aria-label":r,className:(0,i.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",c===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,t.jsx)(a,{className:"w-3.5 h-3.5"})},e))})]}),(0,t.jsx)("div",{className:(0,i.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===c?"p-6":"p-10",d?"bg-neutral-950":"bg-[rgb(var(--background))]",o&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,t.jsx)("div",{className:(0,i.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===c&&"max-w-[390px]"),children:e})})]})}],60701)},78241,e=>{"use strict";var t=e.i(29241),a=e.i(60515),r=e.i(38421),s=e.i(51334),i=e.i(36534);let n={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},l={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:d}){let[o,c]=(0,a.useState)("react"),m=["react","html","swift",...e.macos?["macos"]:[]],x=e[o]??e.swift;return(0,t.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",d),children:[(0,t.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:m.map(e=>(0,t.jsxs)("button",{onClick:()=>c(e),className:(0,i.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",o===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[o===e&&(0,t.jsx)(r.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),n[e]]},e))}),(0,t.jsx)(s.CodeBlock,{code:x.code,language:l[o],filename:x.filename,className:"rounded-none border-0"})]})}])},8198,e=>{"use strict";var t=e.i(29241),a=e.i(36534);e.s(["PageHeader",0,function({title:e,description:r,badge:s,className:i}){return(0,t.jsxs)("div",{className:(0,a.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",i),children:[s&&(0,t.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,t.jsx)("h1",{className:"mb-2.5",children:e}),(0,t.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:r})]})}])},28595,e=>{"use strict";var t=e.i(29241),a=e.i(36534);e.s(["PropsTable",0,function({props:e,className:r}){return(0,t.jsx)("div",{className:(0,a.cn)("overflow-hidden rounded-xl border border-[rgb(var(--border))]",r),children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:["Prop","Type","Default","Description"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left font-semibold text-[rgb(var(--text-tertiary))] text-[11px] uppercase tracking-wider",children:e},e))})}),(0,t.jsx)("tbody",{children:e.map((e,r)=>(0,t.jsxs)("tr",{className:(0,a.cn)("border-b border-[rgb(var(--border-subtle))] last:border-0",r%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"),children:[(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsxs)("code",{className:"text-[rgb(var(--accent))] font-mono text-[12px]",children:[e.name,e.required&&(0,t.jsx)("span",{className:"text-red-400 ml-0.5",children:"*"})]})}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsx)("code",{className:"text-[rgb(var(--text-secondary))] font-mono text-[11px] bg-[rgb(var(--surface-raised))] px-1.5 py-0.5 rounded",children:e.type})}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.default?(0,t.jsx)("code",{className:"font-mono text-[11px]",children:e.default}):(0,t.jsx)("span",{className:"opacity-40",children:"—"})}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))] leading-relaxed",children:e.description})]},e.name))})]})})}])},84237,e=>{"use strict";var t=e.i(29241),a=e.i(60515),r=e.i(8198),s=e.i(28595),i=e.i(60701),n=e.i(78241);let l=[{name:"value",type:"Date",description:"Currently selected date."},{name:"onChange",type:"(date: Date) => void",description:"Callback fired when date changes."},{name:"minDate",type:"Date",description:"Minimum selectable date."},{name:"maxDate",type:"Date",description:"Maximum selectable date."},{name:"disabled",type:"boolean",default:"false",description:"Prevents interaction."},{name:"label",type:"string",description:"Label text for the input."},{name:"placeholder",type:"string",default:"Select date",description:"Placeholder text when empty."}],d=[{name:"value",type:"string",description:"Current time in HH:MM format."},{name:"onChange",type:"(time: string) => void",description:"Callback fired when time changes."},{name:"minTime",type:"string",description:"Earliest selectable time (HH:MM)."},{name:"maxTime",type:"string",description:"Latest selectable time (HH:MM)."},{name:"step",type:"number",default:"30",description:"Minute increment (5, 10, 15, 30, 60)."},{name:"label",type:"string",description:"Label text for the input."},{name:"format",type:'"12h" | "24h"',default:'"24h"',description:"Time format to display."}],o={react:{filename:"DatePicker.tsx",code:`"use client";

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
`},html:{filename:"pickers.html",code:`<div class="date-picker">
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
</style>`},swift:{filename:"DatePickerView.swift",code:`import SwiftUI

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
                    ForEach(generateTimes(), id: .self) { time in
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
}`}},c=[{type:"Single date",desc:"Choose one date like appointment, birthday, or deadline"},{type:"Date range",desc:"Select start and end dates for booking or reporting"}];function m(){let[e,r]=(0,a.useState)(new Date);return(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"block text-[12px] font-medium text-[rgb(var(--text-secondary))]",children:"Select date"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("input",{type:"date",value:e?.toISOString().split("T")[0]||"",onChange:e=>r(new Date(e.target.value)),className:"w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-2.5 text-[13px] pr-10 cursor-pointer"}),(0,t.jsx)("span",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none",children:"📅"})]}),e&&(0,t.jsxs)("p",{className:"text-[11px] text-[rgb(var(--text-tertiary))] mt-1",children:["Selected: ",e.toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric",year:"numeric"})]})]})}function x(){let[e,r]=(0,a.useState)("14:30");return(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"block text-[12px] font-medium text-[rgb(var(--text-secondary))]",children:"Select time"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("input",{type:"time",value:e,onChange:e=>r(e.target.value),className:"w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-2.5 text-[13px] pr-10 cursor-pointer"}),(0,t.jsx)("span",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none",children:"🕒"})]})]})}e.s(["default",0,function(){return(0,t.jsxs)("div",{children:[(0,t.jsx)(r.PageHeader,{title:"Date and Time Pickers",description:"Help users select dates and times accurately with calendar views and time lists. Supports date ranges, min/max boundaries, and keyboard navigation."}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Date picker"}),(0,t.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"Choose specific dates from a calendar interface. Supports single dates or date ranges with configurable boundaries."}),(0,t.jsx)(i.ComponentPreview,{children:(0,t.jsx)("div",{className:"w-full max-w-sm mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",children:(0,t.jsx)(m,{})})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Time picker"}),(0,t.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"Select precise times from a scrollable list or dropdown. Supports 12-hour and 24-hour formats with configurable increments."}),(0,t.jsx)(i.ComponentPreview,{children:(0,t.jsx)("div",{className:"w-full max-w-sm mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",children:(0,t.jsx)(x,{})})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Use cases"}),(0,t.jsx)("div",{className:"grid grid-cols-2 gap-4",children:c.map(e=>(0,t.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] p-4 bg-[rgb(var(--surface))]",children:[(0,t.jsx)("h3",{className:"text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1",children:e.type}),(0,t.jsx)("p",{className:"text-[12px] text-[rgb(var(--text-secondary))]",children:e.desc})]},e.type))})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6",children:"Date picker anatomy"}),(0,t.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex items-center justify-center",children:(0,t.jsxs)("svg",{viewBox:"0 0 320 280",width:"320",height:"280",className:"max-w-full",children:[(0,t.jsx)("rect",{x:"20",y:"120",width:"280",height:"160",rx:"12",fill:"rgb(var(--surface-raised))",stroke:"rgb(var(--border))",strokeWidth:"1"}),(0,t.jsx)("rect",{x:"20",y:"120",width:"280",height:"40",fill:"rgb(var(--surface))",rx:"12"}),(0,t.jsx)("text",{x:"160",y:"146",textAnchor:"middle",fontSize:"12",fontWeight:"600",fill:"rgb(var(--text-primary))",children:"January 2024"}),(0,t.jsx)("text",{x:"60",y:"146",textAnchor:"middle",fontSize:"14",fill:"rgb(var(--text-secondary))",children:"‹"}),(0,t.jsx)("text",{x:"260",y:"146",textAnchor:"middle",fontSize:"14",fill:"rgb(var(--text-secondary))",children:"›"}),["S","M","T","W","T","F","S"].map((e,a)=>(0,t.jsx)("text",{x:50+36*a,y:"176",textAnchor:"middle",fontSize:"10",fontWeight:"600",fill:"rgb(var(--text-tertiary))",children:e},e)),Array.from({length:35},(e,a)=>{let r=Math.floor(a/7),s=a%7,i=a-3+1;return i<1||i>31?null:(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:34+36*s,y:190+28*r,width:"28",height:"28",rx:"6",fill:15===i?"rgb(var(--accent))":"transparent"}),(0,t.jsx)("text",{x:48+36*s,y:210+28*r,textAnchor:"middle",fontSize:"12",fill:15===i?"white":"rgb(var(--text-primary))",fontWeight:15===i?"600":"400",children:i})]},a)}),(0,t.jsx)("rect",{x:"100",y:"60",width:"120",height:"40",rx:"10",fill:"rgb(var(--surface))",stroke:"rgb(var(--border))",strokeWidth:"1"}),(0,t.jsx)("text",{x:"120",y:"86",fontSize:"13",fill:"rgb(var(--text-primary))",children:"January 15, 2024"}),(0,t.jsx)("text",{x:"200",y:"86",fontSize:"14",fill:"rgb(var(--text-tertiary))",children:"▼"}),(0,t.jsx)("text",{x:"130",y:"50",fontSize:"10",fill:"rgb(var(--text-tertiary))",children:"SELECT DATE"}),(0,t.jsx)("line",{x1:"160",y1:"100",x2:"160",y2:"120",stroke:"rgb(var(--border))",strokeWidth:"1",strokeDasharray:"4 2"})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Calendar states"}),(0,t.jsx)("div",{className:"overflow-hidden rounded-xl border border-[rgb(var(--border))]",children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:["State","Appearance","Notes"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e},e))})}),(0,t.jsx)("tbody",{children:[{state:"Default",appearance:"Normal date, clickable",notes:"Today may be highlighted with a border or bold text"},{state:"Hover",appearance:"Background highlight with pointer cursor",notes:"Indicates interactivity"},{state:"Selected",appearance:"Filled with accent color, white text",notes:"Confirms the chosen date"},{state:"Today",appearance:"Bold text or accent border",notes:"Visual anchor for current date"},{state:"Disabled",appearance:"Grayed out, non-clickable",notes:"Dates outside min/max boundaries"},{state:"Other month",appearance:"Faded text",notes:"Days from adjacent months"}].map((e,a)=>(0,t.jsxs)("tr",{className:`border-b border-[rgb(var(--border-subtle))] last:border-0 ${a%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"}`,children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:e.state}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.appearance}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.notes})]},e.state))})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Usage guidelines"}),(0,t.jsx)("div",{className:"grid grid-cols-2 gap-4",children:[{type:"do",items:["Provide a clear label indicating what date is needed","Set sensible min/max boundaries to prevent invalid dates","Default to today or a meaningful date, not an arbitrary past date","Include a placeholder showing the expected format"]},{type:"dont",items:["Don't make users type dates manually in most cases","Avoid date pickers for birth dates far in the past (use age input)","Don't rely on date pickers alone — always validate on the server","Avoid calendar widgets that require excessive scrolling"]}].map(({type:e,items:a})=>(0,t.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:[(0,t.jsx)("div",{className:`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${"do"===e?"text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20":"text-red-500 bg-red-50 dark:bg-red-950/20"}`,children:"do"===e?"✓ Do":"✗ Don't"}),(0,t.jsx)("ul",{className:"p-4 space-y-2",children:a.map(a=>(0,t.jsxs)("li",{className:"text-[12px] text-[rgb(var(--text-secondary))] flex gap-2",children:[(0,t.jsx)("span",{className:"do"===e?"text-emerald-500":"text-red-400",children:"·"}),a]},a))})]},e))})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5",children:"Date picker props"}),(0,t.jsx)(s.PropsTable,{props:l})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5",children:"Time picker props"}),(0,t.jsx)(s.PropsTable,{props:d})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Implementation"}),(0,t.jsx)(n.PlatformTabs,{code:o})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Accessibility"}),(0,t.jsx)("ul",{className:"space-y-2 text-[14px] text-[rgb(var(--text-secondary))]",children:["Date pickers must have associated labels via aria-label or aria-labelledby.","Keyboard: Arrow keys navigate days; PageUp/PageDown change months; Home/End go to start/end of week.","Time pickers must announce the currently focused time option.","ESC key should close open pickers; Enter should select the focused date/time.","Provide clear announcements when min/max boundaries prevent selection.","The calendar popup must have role='dialog' and aria-modal='true' when open."].map(e=>(0,t.jsxs)("li",{className:"flex gap-2",children:[(0,t.jsx)("span",{className:"text-[rgb(var(--accent))] mt-0.5",children:"→"}),e]},e))})]})]})}])}]);