"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

// ─────────────────────────────────────────────────────────────
// Warren / Sitka color palette
// ─────────────────────────────────────────────────────────────
const C = {
  spruce:      "#16302A",
  spruceInk:   "#1E3F36",
  cyan:        "#00C7D6",
  cyanDeep:    "#00A8B6",
  paper:       "#F6F5F1",
  card:        "#FFFFFF",
  line:        "#E4E2DA",
  lineStrong:  "#D6D3C9",
  ink:         "#0F1F19",
  ink2:        "#3B4A43",
  ink3:        "#6E7A74",
  ink4:        "#9CA59F",
  moss:        "#5C8C5A",
  rose:        "#C9533F",
} as const;

const SWATCHES = ["#16302A", "#8A5A3B", "#2D5F87", "#7A4B86"];

// ─────────────────────────────────────────────────────────────
// WeekRing
// ─────────────────────────────────────────────────────────────
function WeekRing({ logged, goal, size = 64 }: { logged: number; goal: number; size?: number }) {
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(logged / goal, 1);
  const pctInt = Math.round((logged / goal) * 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.14)" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={C.cyan} strokeWidth={stroke} fill="none"
        strokeDasharray={`${c * pct} ${c}`} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dasharray 0.6s ease-out" }}
      />
      <text x={size / 2} y={size / 2 - 3} textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontVariantNumeric="tabular-nums">{pctInt}</text>
      <text x={size / 2} y={size / 2 + 9} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8" fontWeight="700">%</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// WeekBars
// ─────────────────────────────────────────────────────────────
function WeekBars({ days }: { days: { d: string; hrs: number; today?: boolean }[] }) {
  const max = 9;
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 44 }}>
      {days.map((dd, i) => {
        const h = Math.max(2, (dd.hrs / max) * 32);
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: h, borderRadius: 2, background: dd.today ? C.cyan : "rgba(255,255,255,0.32)" }} />
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em", fontWeight: 600 }}>{dd.d}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SyncBadge
// ─────────────────────────────────────────────────────────────
type SyncStatus = "synced" | "pending" | "failed";

function SyncBadge({ status }: { status: SyncStatus }) {
  if (status === "synced") {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" title="Synced">
        <circle cx="6.5" cy="6.5" r="5.7" stroke={C.moss} strokeWidth="1.3" />
        <path d="M4.2 6.6l1.7 1.7L9 5.2" stroke={C.moss} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "pending") {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" title="Syncing">
        <path d="M11 6.5a4.5 4.5 0 1 1-1.32-3.18M11 1.5V4h-2.5" stroke={C.ink3} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" title="Sync failed">
      <circle cx="6.5" cy="6.5" r="5.7" stroke={C.rose} strokeWidth="1.3" />
      <path d="M6.5 3.4v3.7M6.5 9.1v.5" stroke={C.rose} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Live preview — full screen mock
// ─────────────────────────────────────────────────────────────
function TimeLoggingPreview() {
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(42 * 60 + 18);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const hh = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const mm = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const DAYS = [
    { d: "M", hrs: 8.25 }, { d: "T", hrs: 7.5 }, { d: "W", hrs: 6.75 },
    { d: "T", hrs: 7.25 }, { d: "F", hrs: 4.75, today: true }, { d: "S", hrs: 0 }, { d: "S", hrs: 0 },
  ];

  const TODAY_ENTRIES = [
    { project: "Cascade Coffee",  color: SWATCHES[1], type: "DESIGN",      note: "Packaging system explorations — round 2 (kraft + foil)",  duration: "2h 10m", start: "9:12", end: "11:22", billable: true,  sync: "synced" as SyncStatus },
    { project: "Northwind Health", color: SWATCHES[0], type: "DISCOVERY",   note: "Stakeholder synthesis & opportunity map",                  duration: "1h 45m", start: "11:35", end: "1:20",  billable: true,  sync: "synced" as SyncStatus },
    { project: "Foxglove Studio",  color: SWATCHES[3], type: "REVIEW",      note: "Async loom feedback — onboarding v3",                     duration: "0h 30m", start: "2:05", end: "2:35",  billable: false, sync: "pending" as SyncStatus },
  ];

  const YESTERDAY_ENTRIES = [
    { project: "Meridian Labs",    color: SWATCHES[2], type: "ENGINEERING", note: "Design tokens → Tailwind config wiring",                  duration: "3h 15m", start: "8:45", end: "12:00", billable: true,  sync: "synced" as SyncStatus },
    { project: "Northwind Health", color: SWATCHES[0], type: "DESIGN",      note: "Component audit: navigation, sheets, list cells",         duration: "2h 30m", start: "1:00", end: "3:30",  billable: true,  sync: "synced" as SyncStatus },
    { project: "Cascade Coffee",   color: SWATCHES[1], type: "DESIGN",      note: "Logo lockup refinement — vertical & horizontal",          duration: "1h 30m", start: "3:45", end: "5:15",  billable: true,  sync: "failed" as SyncStatus },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
      <div style={{
        width: 390,
        maxHeight: 720,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        borderRadius: 40,
        border: "1px solid rgba(0,0,0,0.12)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.16)",
        background: C.paper,
        fontFamily: '-apple-system, "SF Pro Text", BlinkMacSystemFont, sans-serif',
      }}>

        {/* ── Branded Header ── */}
        <div style={{ background: C.spruce, color: "#fff", padding: "54px 20px 22px", position: "relative", flexShrink: 0 }}>
          {/* Grain texture */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 0.5px, transparent 0.5px)",
            backgroundSize: "3px 3px",
          }} />
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M7 1L1 13h12L7 1z" fill="none" stroke={C.cyan} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M7 5.5L4 11h6L7 5.5z" fill={C.cyan} />
              </svg>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", color: "rgba(255,255,255,0.72)", textTransform: "uppercase" }}>Warren</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" opacity={0.85}><rect x="2.5" y="3.5" width="13" height="12" rx="2" stroke="white" strokeWidth="1.4" /><path d="M2.5 7h13M6 2v3M12 2v3" stroke="white" strokeWidth="1.4" strokeLinecap="round" /></svg>
              <div style={{ position: "relative", opacity: 0.85 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.5 13h11l-1.5-2V7.5a4 4 0 1 0-8 0V11l-1.5 2zM7 14.5a2 2 0 0 0 4 0" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div style={{ position: "absolute", top: -1, right: -1, width: 6, height: 6, borderRadius: 3, background: C.cyan, boxShadow: `0 0 0 1.5px ${C.spruce}` }} />
              </div>
            </div>
          </div>
          {/* Large title */}
          <h1 style={{ margin: "14px 0 18px", fontSize: 34, lineHeight: "38px", fontWeight: 700, letterSpacing: "-0.022em", color: "#fff", position: "relative", zIndex: 1 }}>Time Tracker</h1>
          {/* Week summary card */}
          <div style={{
            position: "relative", zIndex: 1,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 14, padding: "14px 14px 12px",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <WeekRing logged={34.5} goal={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, letterSpacing: "0.14em", fontWeight: 600, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", marginBottom: 4 }}>
                This week · May 18–24
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>34.5</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontVariantNumeric: "tabular-nums" }}>/ 40.0 hrs</div>
                <div style={{ marginLeft: "auto", fontSize: 10.5, fontWeight: 600, color: C.cyan, letterSpacing: "0.04em", whiteSpace: "nowrap", flexShrink: 0 }}>+2.3 wk</div>
              </div>
              <div style={{ marginTop: 8 }}>
                <WeekBars days={DAYS} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Active Timer Card ── */}
        <div style={{ margin: "-14px 16px 0", background: C.card, borderRadius: 16, border: `1px solid ${C.line}`, boxShadow: "0 1px 0 rgba(15,31,25,0.04)", position: "relative", zIndex: 2, overflow: "hidden", flexShrink: 0 }}>
          {/* Project + task row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${C.line}` }}>
            <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 9, borderRight: `1px solid ${C.line}` }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: SWATCHES[0], flexShrink: 0 }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 9.5, fontWeight: 600, color: C.ink3, letterSpacing: "0.12em", textTransform: "uppercase" }}>Project</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Northwind Health</div>
              </div>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 4l2.5 2.5L7.5 4" stroke={C.ink3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 9.5, fontWeight: 600, color: C.ink3, letterSpacing: "0.12em", textTransform: "uppercase" }}>Task type</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, marginTop: 1 }}>Design</div>
              </div>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 4l2.5 2.5L7.5 4" stroke={C.ink3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
          {/* Note */}
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${C.line}`, fontSize: 13.5, color: C.ink2, lineHeight: "18px" }}>
            High-fidelity mobile wireframes &amp; Sitka integration
          </div>
          {/* Timer row */}
          <div style={{
            padding: "12px 14px", display: "flex", alignItems: "center", gap: 12,
            background: running ? `linear-gradient(180deg, ${C.card} 0%, #FBFEFE 100%)` : C.card,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
              {/* Pulsing dot */}
              <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                <div style={{
                  position: "absolute", inset: 0, borderRadius: 4,
                  background: running ? C.cyan : C.ink4,
                  ...(running && { animation: "sitka-pulse 1.6s ease-out infinite" }),
                }} />
              </div>
              <div style={{ fontSize: 28, fontWeight: 600, color: C.ink, letterSpacing: "-0.01em", lineHeight: 1, fontVariantNumeric: "tabular-nums", fontFamily: "ui-monospace, monospace" }}>
                {hh}<span style={{ color: C.ink4 }}>:</span>{mm}<span style={{ color: C.ink4 }}>:</span>{ss}
              </div>
            </div>
            <button
              onClick={() => setRunning((r) => !r)}
              style={{
                all: "unset", cursor: "pointer",
                background: C.cyan, color: "#fff",
                height: 42, padding: "0 18px 0 14px",
                borderRadius: 10, display: "flex", alignItems: "center", gap: 8,
                fontSize: 14, fontWeight: 600,
                boxShadow: `0 0 0 1px ${C.cyanDeep} inset, 0 1px 0 rgba(0,0,0,0.04)`,
              }}>
              {running
                ? <svg width="14" height="14" viewBox="0 0 14 14"><rect x="3" y="2" width="3" height="10" rx="1" fill="white" /><rect x="8" y="2" width="3" height="10" rx="1" fill="white" /></svg>
                : <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1.5v11l9-5.5z" fill="white" /></svg>}
              <span>{running ? "Pause" : "Resume"}</span>
            </button>
          </div>
        </div>

        {/* ── Manual Log Strip ── */}
        <div style={{ margin: "10px 16px 0", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{
            flex: 1, padding: "9px 12px",
            border: `1px dashed ${C.lineStrong}`, borderRadius: 10,
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 13, fontWeight: 500, color: C.ink2, cursor: "pointer",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 2v10M2 7h10" stroke={C.ink3} strokeWidth="1.5" strokeLinecap="round" /></svg>
            Add manual entry
          </div>
          <div style={{
            padding: "9px 12px",
            border: `1px solid ${C.lineStrong}`, borderRadius: 10,
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 500, color: C.ink2, cursor: "pointer",
          }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-6" stroke={C.ink2} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Resume…
          </div>
        </div>

        {/* ── Scrollable log list ── */}
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 8 }}>
          {[
            { title: "Today · Fri May 22", total: "4h 25m", entries: TODAY_ENTRIES },
            { title: "Yesterday · Thu May 21", total: "8h 00m", entries: YESTERDAY_ENTRIES },
          ].map((section) => (
            <div key={section.title}>
              {/* Section header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 16px 8px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.ink, letterSpacing: "0.04em", textTransform: "uppercase" }}>{section.title}</h3>
                  <span style={{ fontSize: 11, color: C.ink3 }}>{section.entries.length} entries</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.spruceInk, fontVariantNumeric: "tabular-nums" }}>{section.total}</div>
              </div>
              {/* Log card */}
              <div style={{ background: C.card, borderRadius: 14, margin: "0 16px", border: `1px solid ${C.line}`, overflow: "hidden" }}>
                {section.entries.map((entry, i) => (
                  <div key={i} style={{
                    padding: "12px 16px",
                    display: "flex", alignItems: "flex-start", gap: 12,
                    borderBottom: i < section.entries.length - 1 ? `1px solid ${C.line}` : "none",
                  }}>
                    {/* Color rail */}
                    <div style={{ width: 4, alignSelf: "stretch", borderRadius: 2, background: entry.color, marginTop: 2, marginBottom: 2, flexShrink: 0 }} />
                    {/* Middle */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, letterSpacing: "-0.005em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0, flexShrink: 1 }}>{entry.project}</div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: C.ink3, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0 }}>· {entry.type}</div>
                      </div>
                      <div style={{ fontSize: 13, color: C.ink2, lineHeight: "18px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.note}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                        <span style={{ fontSize: 11, color: C.ink3, fontVariantNumeric: "tabular-nums" }}>{entry.start}–{entry.end}</span>
                        <span style={{ width: 3, height: 3, borderRadius: 1.5, background: "#C7CCC8" }} />
                        <span style={{ fontSize: 11, color: C.ink3 }}>{entry.billable ? "Billable" : "Internal"}</span>
                      </div>
                    </div>
                    {/* Right */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0, marginLeft: 4 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: C.ink, letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums" }}>{entry.duration}</div>
                      <SyncBadge status={entry.sync} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Sync footer */}
          <div style={{ textAlign: "center", fontSize: 11, color: C.ink4, padding: "18px 16px 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <SyncBadge status="synced" />
            <span>Synced with Harvest · 2 min ago</span>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div style={{
          borderTop: `1px solid ${C.line}`,
          background: "rgba(246,245,241,0.92)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          padding: "8px 8px 24px",
          display: "flex", justifyContent: "space-around",
          flexShrink: 0,
        }}>
          {[
            { label: "Timer",    active: true  },
            { label: "Projects", active: false },
            { label: "Reports",  active: false },
            { label: "Invoices", active: false },
          ].map((t) => (
            <button key={t.label} style={{
              all: "unset", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              padding: "4px 10px", minWidth: 60,
              color: t.active ? C.spruceInk : C.ink4,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                {t.label === "Timer"    && <><circle cx="12" cy="13" r="7.2" /><path d="M12 9v4l2.5 1.5M10 3h4M8 4l-1.5 1.5" /></>}
                {t.label === "Projects" && <><rect x="3.5" y="5" width="17" height="14" rx="2" /><path d="M3.5 9h17M8 5V3.5M16 5V3.5" /></>}
                {t.label === "Reports"  && <path d="M4 19h16M6 16V10M10 16V6M14 16v-7M18 16v-4" />}
                {t.label === "Invoices" && <><path d="M6 3h9l3 3v15l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3z" strokeLinejoin="round" /><path d="M9 9h6M9 13h6M9 17h3" /></>}
              </svg>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.01em" }}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sitka-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(0,199,214,0.55); }
          70%  { box-shadow: 0 0 0 8px rgba(0,199,214,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,199,214,0); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Code samples
// ─────────────────────────────────────────────────────────────
const CODE = {
  react: {
    filename: "TimeLoggingScreen.tsx",
    code: `"use client";
import { useState, useEffect } from "react";

// Project palette — cycled by index
const PROJECT_COLORS = ["#16302A", "#8A5A3B", "#2D5F87", "#7A4B86"];

type SyncStatus = "synced" | "pending" | "failed";

interface TimeEntry {
  id: string;
  projectName: string;
  projectColor: string;
  taskType: string;
  note: string;
  durationLabel: string;
  timeRange: string;
  billable: boolean;
  sync: SyncStatus;
}

interface LogSectionProps {
  title: string;
  total: string;
  entries: TimeEntry[];
}

// ── Pulsing live-indicator dot ──────────────────────────────
function PulsingDot({ active }: { active: boolean }) {
  return (
    <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: 4,
        background: active ? "rgb(var(--accent))" : "rgb(var(--text-tertiary))",
        ...(active && { animation: "timer-pulse 1.6s ease-out infinite" }),
      }} />
      <style>{\`
        @keyframes timer-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(var(--accent) / 0.55); }
          70%  { box-shadow: 0 0 0 8px rgba(var(--accent) / 0); }
          100% { box-shadow: 0 0 0 0 rgba(var(--accent) / 0); }
        }
      \`}</style>
    </div>
  );
}

// ── Active timer card ───────────────────────────────────────
export function ActiveTimerCard({
  projectName,
  projectColor,
  taskType,
  note,
  running,
  elapsedSeconds,
  onToggle,
}: {
  projectName: string;
  projectColor: string;
  taskType: string;
  note: string;
  running: boolean;
  elapsedSeconds: number;
  onToggle: () => void;
}) {
  const hh = String(Math.floor(elapsedSeconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, "0");
  const ss = String(elapsedSeconds % 60).padStart(2, "0");

  return (
    <div style={{
      background: "rgb(var(--surface))",
      borderRadius: 16,
      border: "1px solid rgb(var(--border))",
      boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
      overflow: "hidden",
    }}>
      {/* Row 1 — Project + Task type selectors */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgb(var(--border))" }}>
        <button style={{
          all: "unset", cursor: "pointer",
          padding: "12px 14px", display: "flex", alignItems: "center", gap: 9,
          borderRight: "1px solid rgb(var(--border))",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: projectColor, flexShrink: 0 }} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 9.5, fontWeight: 600, color: "rgb(var(--text-tertiary))", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Project
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "rgb(var(--text-primary))", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {projectName}
            </div>
          </div>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2.5 4l2.5 2.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button style={{
          all: "unset", cursor: "pointer",
          padding: "12px 14px", display: "flex", alignItems: "center", gap: 9,
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 9.5, fontWeight: 600, color: "rgb(var(--text-tertiary))", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Task type
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "rgb(var(--text-primary))", marginTop: 1 }}>
              {taskType}
            </div>
          </div>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2.5 4l2.5 2.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Row 2 — Note */}
      <div style={{
        padding: "10px 14px",
        borderBottom: "1px solid rgb(var(--border))",
        fontSize: 13.5, color: note ? "rgb(var(--text-secondary))" : "rgb(var(--text-tertiary))",
        lineHeight: "18px",
      }}>
        {note || "Add a note…"}
      </div>

      {/* Row 3 — Live timer + action */}
      <div style={{
        padding: "12px 14px",
        display: "flex", alignItems: "center", gap: 12,
        background: running ? "linear-gradient(180deg, rgb(var(--surface)) 0%, rgb(var(--surface-raised)) 100%)" : "rgb(var(--surface))",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
          <PulsingDot active={running} />
          <div style={{
            fontSize: 28, fontWeight: 600,
            color: "rgb(var(--text-primary))",
            letterSpacing: "-0.01em", lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            fontFamily: "ui-monospace, monospace",
          }}>
            {hh}<span style={{ color: "rgb(var(--text-tertiary))" }}>:</span>
            {mm}<span style={{ color: "rgb(var(--text-tertiary))" }}>:</span>
            {ss}
          </div>
        </div>
        <button
          onClick={onToggle}
          style={{
            all: "unset", cursor: "pointer",
            background: "rgb(var(--accent))",
            color: "rgb(var(--accent-foreground))",
            height: 42, padding: "0 18px 0 14px",
            borderRadius: 10,
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 14, fontWeight: 600,
          }}
        >
          {running ? "Pause" : "Resume"}
        </button>
      </div>
    </div>
  );
}

// ── Log section + rows ──────────────────────────────────────
function SyncIndicator({ status }: { status: SyncStatus }) {
  const colors: Record<SyncStatus, string> = {
    synced:  "#5C8C5A",
    pending: "rgb(var(--text-tertiary))",
    failed:  "#C9533F",
  };
  return (
    <div
      style={{ width: 13, height: 13, borderRadius: "50%", background: colors[status], opacity: 0.8 }}
      title={status}
    />
  );
}

function LogRow({ entry, isLast }: { entry: TimeEntry; isLast: boolean }) {
  return (
    <div style={{
      padding: "12px 16px",
      display: "flex", alignItems: "flex-start", gap: 12,
      borderBottom: isLast ? "none" : "1px solid rgb(var(--border-subtle))",
    }}>
      {/* Project color rail */}
      <div style={{
        width: 4, alignSelf: "stretch",
        borderRadius: 2, background: entry.projectColor,
        marginTop: 2, marginBottom: 2, flexShrink: 0,
      }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2 }}>
          <span style={{
            fontSize: 14, fontWeight: 600,
            color: "rgb(var(--text-primary))", letterSpacing: "-0.005em",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {entry.projectName}
          </span>
          <span style={{
            fontSize: 10, fontWeight: 600,
            color: "rgb(var(--text-tertiary))", letterSpacing: "0.08em",
            textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0,
          }}>
            · {entry.taskType}
          </span>
        </div>
        <div style={{ fontSize: 13, color: "rgb(var(--text-secondary))", lineHeight: "18px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {entry.note}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", fontVariantNumeric: "tabular-nums" }}>
            {entry.timeRange}
          </span>
          <span style={{ width: 3, height: 3, borderRadius: 1.5, background: "rgb(var(--border))" }} />
          <span style={{ fontSize: 11, color: "rgb(var(--text-tertiary))" }}>
            {entry.billable ? "Billable" : "Internal"}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: "rgb(var(--text-primary))", fontVariantNumeric: "tabular-nums" }}>
          {entry.durationLabel}
        </span>
        <SyncIndicator status={entry.sync} />
      </div>
    </div>
  );
}

export function LogSection({ title, total, entries }: LogSectionProps) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "18px 16px 8px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "rgb(var(--text-primary))", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {title}
          </h3>
          <span style={{ fontSize: 11, color: "rgb(var(--text-tertiary))" }}>{entries.length} entries</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: "rgb(var(--text-primary))", fontVariantNumeric: "tabular-nums" }}>
          {total}
        </span>
      </div>
      <div style={{
        background: "rgb(var(--surface))",
        borderRadius: 14, margin: "0 16px",
        border: "1px solid rgb(var(--border))",
        overflow: "hidden",
      }}>
        {entries.map((e, i) => <LogRow key={e.id} entry={e} isLast={i === entries.length - 1} />)}
      </div>
    </div>
  );
}

// ── Manual log strip ────────────────────────────────────────
export function ManualLogStrip({ onAdd, onResume }: { onAdd: () => void; onResume: () => void }) {
  const dashed: React.CSSProperties = {
    all: "unset" as "unset",
    cursor: "pointer",
    flex: 1, padding: "9px 12px",
    display: "flex", alignItems: "center", gap: 8,
    fontSize: 13, fontWeight: 500,
    color: "rgb(var(--text-secondary))",
    border: "1.5px dashed rgb(var(--border-strong))",
    borderRadius: 10,
  };
  const solid: React.CSSProperties = {
    all: "unset" as "unset",
    cursor: "pointer",
    padding: "9px 12px",
    display: "flex", alignItems: "center", gap: 6,
    fontSize: 13, fontWeight: 500,
    color: "rgb(var(--text-secondary))",
    border: "1px solid rgb(var(--border-strong))",
    borderRadius: 10,
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px 0" }}>
      <button style={dashed} onClick={onAdd}>
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        Add manual entry
      </button>
      <button style={solid} onClick={onResume}>
        Resume…
      </button>
    </div>
  );
}`,
  },
  html: {
    filename: "time-logging.html",
    code: `<!-- Active Timer Card -->
<div class="timer-card">
  <!-- Row 1: project + task selectors -->
  <div class="timer-selectors">
    <button class="selector-btn selector-btn--left">
      <span class="project-swatch" style="--swatch: #16302A"></span>
      <div class="selector-labels">
        <span class="selector-eyebrow">Project</span>
        <span class="selector-value">Northwind Health</span>
      </div>
      <svg class="chev" viewBox="0 0 10 10"><path d="M2.5 4l2.5 2.5L7.5 4"/></svg>
    </button>
    <button class="selector-btn">
      <div class="selector-labels">
        <span class="selector-eyebrow">Task type</span>
        <span class="selector-value">Design</span>
      </div>
      <svg class="chev" viewBox="0 0 10 10"><path d="M2.5 4l2.5 2.5L7.5 4"/></svg>
    </button>
  </div>

  <!-- Row 2: note -->
  <div class="timer-note">High-fidelity mobile wireframes &amp; Sitka integration</div>

  <!-- Row 3: live readout + action -->
  <div class="timer-row timer-row--running">
    <div class="timer-readout">
      <span class="pulse-dot pulse-dot--active"></span>
      <span class="timer-digits tnum">00:42:18</span>
    </div>
    <button class="timer-btn timer-btn--pause">
      Pause
    </button>
  </div>
</div>

<!-- Log section -->
<section class="log-section">
  <header class="log-section__header">
    <div class="log-section__title-group">
      <h3 class="log-section__title">Today · Fri May 22</h3>
      <span class="log-section__count">3 entries</span>
    </div>
    <span class="log-section__total tnum">4h 25m</span>
  </header>
  <ul class="log-card">
    <li class="log-row">
      <div class="log-row__rail" style="--rail: #16302A"></div>
      <div class="log-row__body">
        <div class="log-row__headline">
          <span class="log-row__project">Northwind Health</span>
          <span class="log-row__type">· Design</span>
        </div>
        <p class="log-row__note">Component audit: navigation, sheets, list cells</p>
        <div class="log-row__meta">
          <span class="tnum">9:12–11:22</span>
          <span class="meta-dot"></span>
          <span>Billable</span>
        </div>
      </div>
      <div class="log-row__right">
        <span class="log-row__duration tnum">2h 10m</span>
        <span class="sync-badge sync-badge--synced" aria-label="Synced"></span>
      </div>
    </li>
  </ul>
</section>

<!-- Manual log strip -->
<div class="manual-strip">
  <button class="manual-strip__add">
    <svg viewBox="0 0 14 14"><path d="M7 2v10M2 7h10"/></svg>
    Add manual entry
  </button>
  <button class="manual-strip__resume">Resume…</button>
</div>

<style>
/* Timer card */
.timer-card {
  background: rgb(var(--surface));
  border-radius: 16px;
  border: 1px solid rgb(var(--border));
  overflow: hidden;
}
.timer-selectors {
  display: grid; grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid rgb(var(--border));
}
.selector-btn {
  all: unset; cursor: pointer;
  padding: 12px 14px; display: flex; align-items: center; gap: 9px;
}
.selector-btn--left { border-right: 1px solid rgb(var(--border)); }
.project-swatch {
  width: 8px; height: 8px; border-radius: 2px;
  background: var(--swatch); flex-shrink: 0;
}
.selector-eyebrow {
  display: block; font-size: 9.5px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.12em;
  color: rgb(var(--text-tertiary));
}
.selector-value {
  display: block; font-size: 14px; font-weight: 600;
  color: rgb(var(--text-primary)); margin-top: 1px;
}
.chev {
  width: 10px; height: 10px; stroke: rgb(var(--text-tertiary));
  stroke-width: 1.5; fill: none; stroke-linecap: round;
  stroke-linejoin: round;
}
.timer-note {
  padding: 10px 14px;
  border-bottom: 1px solid rgb(var(--border));
  font-size: 13.5px; color: rgb(var(--text-secondary)); line-height: 1.4;
}
.timer-row {
  padding: 12px 14px;
  display: flex; align-items: center; gap: 12px;
}
.timer-row--running { background: linear-gradient(180deg, rgb(var(--surface)) 0%, rgb(var(--surface-raised)) 100%); }
.timer-readout { display: flex; align-items: center; gap: 8px; flex: 1; }
.pulse-dot {
  display: block; width: 8px; height: 8px; border-radius: 50%;
  background: rgb(var(--text-tertiary));
}
.pulse-dot--active {
  background: rgb(var(--accent));
  animation: timer-pulse 1.6s ease-out infinite;
}
@keyframes timer-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(var(--accent) / .55); }
  70%  { box-shadow: 0 0 0 8px rgba(var(--accent) / 0);  }
  100% { box-shadow: 0 0 0 0 rgba(var(--accent) / 0);    }
}
.timer-digits {
  font-size: 28px; font-weight: 600; letter-spacing: -0.01em;
  color: rgb(var(--text-primary)); font-family: ui-monospace, monospace;
}
.timer-btn {
  all: unset; cursor: pointer; height: 42px;
  padding: 0 18px 0 14px; border-radius: 10px;
  background: rgb(var(--accent)); color: rgb(var(--accent-foreground));
  font-size: 14px; font-weight: 600;
  display: flex; align-items: center; gap: 8px;
}

/* Log section */
.log-section__header {
  display: flex; align-items: baseline; justify-content: space-between;
  padding: 18px 16px 8px;
}
.log-section__title-group { display: flex; gap: 8px; align-items: baseline; }
.log-section__title {
  margin: 0; font-size: 13px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.04em;
  color: rgb(var(--text-primary));
}
.log-section__count { font-size: 11px; color: rgb(var(--text-tertiary)); }
.log-section__total { font-size: 13px; font-weight: 600; color: rgb(var(--text-primary)); }
.log-card {
  list-style: none; margin: 0 16px; padding: 0;
  background: rgb(var(--surface)); border-radius: 14px;
  border: 1px solid rgb(var(--border)); overflow: hidden;
}
.log-row {
  padding: 12px 16px; display: flex; align-items: flex-start; gap: 12px;
  border-bottom: 1px solid rgb(var(--border-subtle));
}
.log-row:last-child { border-bottom: none; }
.log-row__rail {
  width: 4px; align-self: stretch;
  border-radius: 2px; background: var(--rail);
  margin: 2px 0; flex-shrink: 0;
}
.log-row__body { flex: 1; min-width: 0; }
.log-row__headline { display: flex; align-items: baseline; gap: 6px; margin-bottom: 2px; }
.log-row__project {
  font-size: 14px; font-weight: 600; color: rgb(var(--text-primary));
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.log-row__type {
  font-size: 10px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.08em; color: rgb(var(--text-tertiary));
  white-space: nowrap; flex-shrink: 0;
}
.log-row__note {
  margin: 0; font-size: 13px; color: rgb(var(--text-secondary));
  line-height: 1.4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.log-row__meta { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.log-row__meta span { font-size: 11px; color: rgb(var(--text-tertiary)); }
.meta-dot {
  width: 3px; height: 3px; border-radius: 50%;
  background: rgb(var(--border));
}
.log-row__right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }
.log-row__duration { font-size: 16px; font-weight: 600; color: rgb(var(--text-primary)); }
.sync-badge {
  display: block; width: 13px; height: 13px;
  border-radius: 50%;
}
.sync-badge--synced  { background: #5C8C5A; }
.sync-badge--pending { background: rgb(var(--text-tertiary)); }
.sync-badge--failed  { background: #C9533F; }

/* Manual strip */
.manual-strip {
  display: flex; gap: 8px; padding: 10px 16px 0;
}
.manual-strip__add {
  all: unset; cursor: pointer;
  flex: 1; padding: 9px 12px;
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 500; color: rgb(var(--text-secondary));
  border: 1.5px dashed rgb(var(--border-strong));
  border-radius: 10px;
}
.manual-strip__add svg {
  width: 14px; height: 14px; stroke: currentColor;
  stroke-width: 1.5; fill: none; stroke-linecap: round;
}
.manual-strip__resume {
  all: unset; cursor: pointer;
  padding: 9px 12px;
  font-size: 13px; font-weight: 500; color: rgb(var(--text-secondary));
  border: 1px solid rgb(var(--border-strong)); border-radius: 10px;
}
</style>`,
  },
  swift: {
    filename: "TimeLoggingView.swift",
    code: `import SwiftUI

// Paste these views into your iOS project.
// Requires: MobileDesignSystem.swift (Sitka color + font extensions)

// ── Active Timer Card ────────────────────────────────────────
struct ActiveTimerCard: View {
    let projectName: String
    let projectColor: Color
    let taskType: String
    let note: String
    let running: Bool
    let formatted: (h: String, m: String, s: String)
    let onToggle: () -> Void

    var body: some View {
        VStack(spacing: 0) {
            // Row 1: selectors
            HStack(spacing: 0) {
                projectSelector
                    .overlay(alignment: .trailing) {
                        Rectangle().fill(Color.sitkaLine).frame(width: 1)
                    }
                taskTypeSelector
            }
            .overlay(alignment: .bottom) {
                Rectangle().fill(Color.sitkaLine).frame(height: 1)
            }

            // Row 2: note
            HStack {
                Text(note.isEmpty ? "Add a note…" : note)
                    .font(.system(size: 13.5))
                    .foregroundColor(note.isEmpty ? .sitkaInk4 : .sitkaInk2)
                    .lineLimit(1)
                Spacer()
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .overlay(alignment: .bottom) {
                Rectangle().fill(Color.sitkaLine).frame(height: 1)
            }

            // Row 3: timer
            HStack(spacing: 12) {
                HStack(spacing: 8) {
                    PulsingDot(active: running)
                    TimerReadout(formatted: formatted)
                }
                Spacer()
                TimerButton(running: running, action: onToggle)
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 12)
            .background(
                LinearGradient(
                    colors: running ? [.sitkaCard, Color(hex: 0xFBFEFE)] : [.sitkaCard, .sitkaCard],
                    startPoint: .top, endPoint: .bottom
                )
            )
        }
        .background(Color.sitkaCard)
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .stroke(Color.sitkaLine, lineWidth: 1)
        )
        .shadow(color: .sitkaInk.opacity(0.04), radius: 0, x: 0, y: 1)
    }

    private var projectSelector: some View {
        Button {} label: {
            HStack(spacing: 9) {
                RoundedRectangle(cornerRadius: 2).fill(projectColor).frame(width: 8, height: 8)
                VStack(alignment: .leading, spacing: 1) {
                    Text("PROJECT").font(.system(size: 9.5, weight: .semibold))
                        .foregroundColor(.sitkaInk3).tracking(0.12 * 9.5)
                    Text(projectName).font(.sitkaBody).foregroundColor(.sitkaInk)
                        .lineLimit(1).truncationMode(.tail)
                }
                Spacer()
                Image(systemName: "chevron.down")
                    .font(.system(size: 9, weight: .semibold)).foregroundColor(.sitkaInk3)
            }
            .padding(.horizontal, 14).padding(.vertical, 12)
            .frame(maxWidth: .infinity, alignment: .leading).contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }

    private var taskTypeSelector: some View {
        Button {} label: {
            HStack(spacing: 9) {
                VStack(alignment: .leading, spacing: 1) {
                    Text("TASK TYPE").font(.system(size: 9.5, weight: .semibold))
                        .foregroundColor(.sitkaInk3).tracking(0.12 * 9.5)
                    Text(taskType).font(.sitkaBody).foregroundColor(.sitkaInk)
                }
                Spacer()
                Image(systemName: "chevron.down")
                    .font(.system(size: 9, weight: .semibold)).foregroundColor(.sitkaInk3)
            }
            .padding(.horizontal, 14).padding(.vertical, 12)
            .frame(maxWidth: .infinity, alignment: .leading).contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}

// ── Pulsing dot ──────────────────────────────────────────────
struct PulsingDot: View {
    let active: Bool
    @State private var pulse = false

    var body: some View {
        ZStack {
            Circle().stroke(Color.sitkaCyan.opacity(pulse ? 0.0 : 0.55), lineWidth: 4)
                .scaleEffect(pulse ? 2.4 : 1)
            Circle().fill(active ? Color.sitkaCyan : Color.sitkaInk4)
        }
        .frame(width: 8, height: 8)
        .onAppear { if active { startPulse() } }
        .onChange(of: active) { _, new in
            if new { startPulse() } else { pulse = false }
        }
    }

    private func startPulse() {
        pulse = false
        withAnimation(.easeOut(duration: 1.6).repeatForever(autoreverses: false)) { pulse = true }
    }
}

// ── Timer readout ────────────────────────────────────────────
struct TimerReadout: View {
    let formatted: (h: String, m: String, s: String)
    var body: some View {
        HStack(spacing: 0) {
            Text(formatted.h); Text(":").foregroundColor(.sitkaInk4)
            Text(formatted.m); Text(":").foregroundColor(.sitkaInk4)
            Text(formatted.s)
        }
        .font(Font.system(size: 28, weight: .semibold, design: .monospaced).monospacedDigit())
        .foregroundColor(.sitkaInk)
        .tracking(-0.01 * 28)
    }
}

// ── Timer primary button ─────────────────────────────────────
struct TimerButton: View {
    let running: Bool; let action: () -> Void
    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                Image(systemName: running ? "pause.fill" : "play.fill")
                    .font(.system(size: 12, weight: .bold))
                Text(running ? "Pause" : "Resume")
                    .font(.system(size: 14, weight: .semibold))
            }
            .foregroundColor(.white)
            .padding(.leading, 14).padding(.trailing, 18).frame(height: 42)
            .background(
                RoundedRectangle(cornerRadius: 10, style: .continuous).fill(Color.sitkaCyan)
                    .overlay(RoundedRectangle(cornerRadius: 10, style: .continuous)
                        .stroke(Color.sitkaCyanDeep, lineWidth: 1))
            )
        }
        .buttonStyle(.plain)
    }
}

// ── Log section ──────────────────────────────────────────────
struct LogSection<Content: View>: View {
    let title: String; let total: String; let count: Int
    @ViewBuilder var content: () -> Content

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .firstTextBaseline) {
                HStack(alignment: .firstTextBaseline, spacing: 8) {
                    Text(title.uppercased())
                        .font(.system(size: 13, weight: .semibold)).foregroundColor(.sitkaInk).tracking(0.04 * 13)
                    Text("\\(count) \\(count == 1 ? "entry" : "entries")")
                        .font(.system(size: 11)).foregroundColor(.sitkaInk3)
                }
                Spacer()
                Text(total).font(.system(size: 13, weight: .semibold)).monospacedDigit()
                    .foregroundColor(.sitkaSpruceInk)
            }
            .padding(.horizontal, 16).padding(.top, 18).padding(.bottom, 8)

            VStack(spacing: 0) { content() }
                .background(Color.sitkaCard)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .stroke(Color.sitkaLine, lineWidth: 1))
                .padding(.horizontal, 16)
        }
    }
}

// ── Log row ──────────────────────────────────────────────────
struct LogRow: View {
    let projectName: String
    let projectColor: Color
    let taskType: String
    let note: String
    let timeRange: String
    let duration: String
    let billable: Bool
    let synced: Bool
    let isLast: Bool

    var body: some View {
        VStack(spacing: 0) {
            HStack(alignment: .top, spacing: 12) {
                RoundedRectangle(cornerRadius: 2).fill(projectColor)
                    .frame(width: 4).padding(.vertical, 2)

                VStack(alignment: .leading, spacing: 2) {
                    HStack(alignment: .firstTextBaseline, spacing: 6) {
                        Text(projectName).font(.sitkaBody).foregroundColor(.sitkaInk)
                            .lineLimit(1).truncationMode(.tail).layoutPriority(0)
                        if !taskType.isEmpty {
                            Text("· \\(taskType.uppercased())")
                                .font(.system(size: 10, weight: .semibold))
                                .foregroundColor(.sitkaInk3).tracking(0.08 * 10)
                                .lineLimit(1).fixedSize()
                        }
                    }
                    if !note.isEmpty {
                        Text(note).font(.system(size: 13)).foregroundColor(.sitkaInk2)
                            .lineLimit(1).truncationMode(.tail).padding(.top, 2)
                    }
                    HStack(spacing: 8) {
                        Text(timeRange).font(.system(size: 11)).monospacedDigit().foregroundColor(.sitkaInk3)
                        Circle().fill(Color(hex: 0xC7CCC8)).frame(width: 3, height: 3)
                        Text(billable ? "Billable" : "Internal").font(.system(size: 11)).foregroundColor(.sitkaInk3)
                    }
                    .padding(.top, 6)
                }

                Spacer(minLength: 4)

                VStack(alignment: .trailing, spacing: 4) {
                    Text(duration).font(.sitkaNumeric).foregroundColor(.sitkaInk).tracking(-0.01 * 16)
                    Image(systemName: synced ? "checkmark.circle" : "arrow.triangle.2.circlepath")
                        .font(.system(size: 13, weight: .medium))
                        .foregroundColor(synced ? .sitkaMoss : .sitkaInk3)
                }
            }
            .padding(.horizontal, 16).padding(.vertical, 12)

            if !isLast { Rectangle().fill(Color.sitkaLine).frame(height: 1) }
        }
    }
}

// ── Manual log strip ─────────────────────────────────────────
struct ManualLogStrip: View {
    var onAdd: () -> Void = {}
    var onResume: () -> Void = {}

    var body: some View {
        HStack(spacing: 8) {
            Button(action: onAdd) {
                HStack(spacing: 8) {
                    Image(systemName: "plus").font(.system(size: 11, weight: .bold)).foregroundColor(.sitkaInk3)
                    Text("Add manual entry").font(.system(size: 13, weight: .medium)).foregroundColor(.sitkaInk2)
                    Spacer()
                }
                .padding(.horizontal, 12).padding(.vertical, 9).frame(maxWidth: .infinity)
                .overlay(RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .strokeBorder(Color.sitkaLineStrong, style: StrokeStyle(lineWidth: 1, dash: [3, 3])))
            }
            .buttonStyle(.plain)

            Button(action: onResume) {
                HStack(spacing: 6) {
                    Image(systemName: "checkmark").font(.system(size: 11, weight: .semibold)).foregroundColor(.sitkaInk2)
                    Text("Resume…").font(.system(size: 13, weight: .medium)).foregroundColor(.sitkaInk2)
                }
                .padding(.horizontal, 12).padding(.vertical, 9)
                .overlay(RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .stroke(Color.sitkaLineStrong, lineWidth: 1))
            }
            .buttonStyle(.plain)
        }
    }
}`,
  },
};

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function MobileTimeLoggingPage() {
  return (
    <div>
      <PageHeader
        title="Mobile Time Logging"
        description="Patterns for time-tracking mobile apps: a branded dark header with embedded week stats, a live active-timer card, grouped log lists with project color rails, and a sync-status system."
        badge="New"
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <TimeLoggingPreview />
        </ComponentPreview>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3">
          Tap the Pause / Resume button to toggle the live timer. The pulsing dot and gradient animate in response.
        </p>
      </section>

      {/* Branded Header */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Branded App Header</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The header extends behind the status bar in the brand&apos;s primary dark color. A subtle dot-grid grain at 4%
          opacity adds texture without competing with content. The bottom of the header overlaps the first card by
          14px — this overlap grounds the card visually and signals that the header and card are one compositional unit.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Layer", "Value", "Purpose"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Background", "Brand dark (#16302A)", "Strong brand presence; reverse-coloured text on top"],
                ["Grain texture", "radial-gradient dot at 3px grid, 4% opacity", "Adds tactile depth without visible pattern at small sizes"],
                ["Large title", "34px / 700 / −0.022em tracking", "Maps to iOS .largeTitle; feels native and spacious"],
                ["Week summary card", "rgba(white, 0.06) fill + rgba(white, 0.10) stroke, 14px radius", "Glassmorphic surface on the dark header — stays legible in both themes"],
                ["Card overlap", "margin-top: −14px on the timer card", "Visually binds the header and first card into one unit"],
              ].map(([layer, value, purpose], i) => (
                <tr key={layer} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{layer}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{value}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Week Summary Card */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Week Summary Card</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Embedded within the header, the week summary card combines three data-density layers: a circular ring
          showing percentage completion, a numeric readout with a pro-rata delta, and a 7-bar mini chart. The ring
          animates from 0 on first mount using an <code className="font-mono text-[13px] text-[rgb(var(--accent))]">easeOut(0.6s)</code> stroke-dasharray transition.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Element", "Spec"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["WeekRing", "64×64pt SVG, 6pt stroke, accent color, round linecap, rotated −90° so 0% starts at 12 o'clock"],
                ["Percentage label", "18px bold + 10px % superscript, monospaced digits, white on dark"],
                ["WeekBars", "8px wide × up to 32px tall bars, 6px gap, today's bar in accent color, others at rgba(white, 0.32)"],
                ["Delta", "Pro-rata: logged − (goal × days_elapsed/7). +/− prefix, accent color text"],
                ["Eyebrow", "10.5px / 600 / 0.14em tracking, UPPERCASE, 55% white opacity"],
              ].map(([el, spec], i) => (
                <tr key={el} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{el}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Active Timer Card */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Active Timer Card</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The timer card has three rows separated by 1px dividers. The top row is a 2-column grid of tappable selectors
          (project and task type). The middle row holds a free-form note. The bottom row shows the live readout and the
          primary Pause / Resume action.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Row", "Contents", "Interaction"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Selectors", "Project color swatch (8px) + name + chevron | Task type + chevron", "Full-cell tap area; each half opens a picker/menu"],
                ["Note", "Single-line text; placeholder when empty", "Tapping opens an edit sheet or inline text field"],
                ["Timer row", "Pulsing dot + monospaced HH:MM:SS + Pause/Resume button", "Button toggles running state; dot and gradient respond immediately"],
              ].map(([row, contents, interaction], i) => (
                <tr key={row} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{row}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{contents}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{interaction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <div className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))] px-4 py-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] m-0">Pulsing dot spec</h3>
          </div>
          <div className="bg-[rgb(var(--surface))] px-4 py-3 text-[13px] text-[rgb(var(--text-secondary))] space-y-2">
            <p>The 8px dot has two layers: a static filled circle (accent when running, tertiary-text when paused) and an expanding ring that fades to transparent over 1.6s, repeating forever. This is a <strong>keyframe animation</strong>, not a spring — the cadence is slow and calm, not reactive.</p>
            <ul className="space-y-1 pl-4 list-disc">
              <li>Ring starts at <code className="font-mono text-[rgb(var(--accent))]">scale(1)</code>, <code className="font-mono text-[rgb(var(--accent))]">opacity 0.55</code></li>
              <li>Ring expands to <code className="font-mono text-[rgb(var(--accent))]">scale(2.4)</code>, <code className="font-mono text-[rgb(var(--accent))]">opacity 0</code> over 1.6s easeOut</li>
              <li>Only animate when <code className="font-mono text-[rgb(var(--accent))]">running === true</code> — stop immediately on pause</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Manual Log Strip */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Manual Log Strip</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          A two-button strip placed immediately below the timer card. The left button uses a{" "}
          <strong>dashed border</strong> to signal an additive / creative action (creating something new). The right
          button uses a solid border for a secondary action (resuming an existing entry). The visual language of dashed
          vs. solid comes from conventions in drawing and CAD tools where dashed lines indicate potential or pending states.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Button", "Border", "Label", "Flex"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Add manual entry", "1.5px dashed, --border-strong", "Plus icon + label, full width", "flex: 1 — expands to fill remaining space"],
                ["Resume…", "1px solid, --border-strong", "Checkmark icon + label, fixed width", "flex: 0 — sized to content"],
              ].map(([btn, border, label, flex], i) => (
                <tr key={btn} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{btn}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{border}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{label}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{flex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Log List */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Log Section & Row</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Entries are grouped by day into sections. Each section has a header row (date label + entry count + total
          duration) and a rounded card containing the rows, separated by 1px lines. Within each row, a 4px color rail
          on the left edge conveys project identity — faster to scan than a project name alone.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Part", "Description"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Section header",   "UPPERCASE date label + entry count (subdued) + right-aligned total (monospaced, brand ink)"],
                ["Card container",   "14px radius, 1px border, white background — groups rows into a cohesive visual unit"],
                ["Color rail",       "4px wide × full row height, 2px radius, project swatch color — instant project identification"],
                ["Project + type",   "14px semibold project name + 10px UPPERCASE task type with · separator, text-tertiary"],
                ["Note",             "13px regular, text-secondary, single line with ellipsis truncation"],
                ["Meta row",         "11px time range (monospaced) + 3px dot separator + billable/internal status"],
                ["Duration",         "16px semibold, right-aligned, monospaced digits"],
                ["Sync badge",       "13px icon: checkmark.circle (moss green) · sync arrow (tertiary) · exclamation circle (rose)"],
              ].map(([part, desc], i) => (
                <tr key={part} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{part}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sync Status */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sync Status Badge</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          A three-state 13px icon indicator used on each log row and in the screen footer. States must be visually
          distinct without relying on color alone (use shape + color for accessibility).
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["State", "Icon", "Color", "Meaning"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["synced",  "Circle with checkmark",            "#5C8C5A (moss)",  "Entry has been pushed to the remote timesheet"],
                ["pending", "Circular arrow (refresh)",          "--text-tertiary", "Sync in progress or queued"],
                ["failed",  "Circle with exclamation point",    "#C9533F (rose)",  "Sync failed — user action may be required"],
              ].map(([state, icon, color, meaning], i) => (
                <tr key={state} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{state}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{icon}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{color}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Project Color Palette */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Project Color Swatches</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Projects are assigned colors from a curated palette of intentionally muted, mid-tone swatches. They are
          distinguishable under both light and dark themes without being garish. Colors cycle by project index.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { hex: "#16302A", name: "Spruce",    note: "Brand / index 0" },
            { hex: "#8A5A3B", name: "Umber",     note: "Warm brown / index 1" },
            { hex: "#2D5F87", name: "Slate",     note: "Cool blue / index 2" },
            { hex: "#7A4B86", name: "Heather",   note: "Muted purple / index 3" },
          ].map(({ hex, name, note }) => (
            <div key={hex} className="flex items-center gap-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-3">
              <div style={{ width: 20, height: 20, borderRadius: 5, background: hex, flexShrink: 0 }} />
              <div>
                <div className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{name}</div>
                <div className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">{hex} · {note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          All four components — <code className="font-mono text-[13px] text-[rgb(var(--accent))]">ActiveTimerCard</code>,{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">ManualLogStrip</code>,{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">LogSection</code>, and{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">LogRow</code> — are self-contained. They use
          Sitka design tokens for all colors, typography, and radii. The Swift implementations require{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">MobileDesignSystem.swift</code> from the
          Warren iOS library.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "The pulsing dot is purely decorative — never rely on it alone to convey timer state. The Pause / Resume button label must change with state.",
            "Timer readout: add aria-label=\"Elapsed time: 0 hours 42 minutes 18 seconds\" on the digit container, updating every minute (not every second) to avoid excessive announcements.",
            "Sync badge: use title attribute (HTML) or accessibilityLabel (SwiftUI) on each badge — e.g. \"Synced\", \"Syncing\", \"Sync failed\".",
            "Project color rail is a visual-only affordance. Project name is always present as visible text in the same row.",
            "Manual log strip: the dashed \"Add\" button must have a descriptive accessible label — \"Add manual time entry\" (not just \"Add\").",
            "Minimum tap target for all row items: 44×44pt. The full log row should be tappable with a 44pt minimum height.",
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
