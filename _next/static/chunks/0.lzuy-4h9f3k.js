(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{"use strict";let t=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,t],89664)},8734,e=>{"use strict";let t=(0,e.i(56420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,t],8734)},61939,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(89664),i=e.i(8734),s=e.i(46932),n=e.i(88653),l=e.i(45060);e.s(["CodeBlock",0,function({code:e,language:d="tsx",filename:c,className:o}){let[b,x]=(0,r.useState)(!1),p=async()=>{await navigator.clipboard.writeText(e.trim()),x(!0),setTimeout(()=>x(!1),2e3)};return(0,t.jsxs)("div",{className:(0,l.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",o),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex gap-1.5",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),c&&(0,t.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:c})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:d}),(0,t.jsx)("button",{onClick:p,className:(0,l.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",b?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,t.jsx)(n.AnimatePresence,{mode:"wait",initial:!1,children:b?(0,t.jsxs)(s.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,t.jsxs)(s.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(i.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,t.jsx)("code",{children:e.trim()})})})]})}])},64147,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),i=e.i(61939),s=e.i(45060);let n={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},l={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:d}){let[c,o]=(0,r.useState)("react"),b=["react","html","swift",...e.macos?["macos"]:[]],x=e[c]??e.swift;return(0,t.jsxs)("div",{className:(0,s.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",d),children:[(0,t.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:b.map(e=>(0,t.jsxs)("button",{onClick:()=>o(e),className:(0,s.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",c===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[c===e&&(0,t.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),n[e]]},e))}),(0,t.jsx)(i.CodeBlock,{code:x.code,language:l[c],filename:x.filename,className:"rounded-none border-0"})]})}])},46017,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46513);let i=(0,e.i(56420).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var s=e.i(45060);e.s(["ComponentPreview",0,function({children:e,label:n,className:l,dark:d,grid:c}){let[o,b]=(0,r.useState)("desktop");return(0,t.jsxs)("div",{className:(0,s.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",l),children:[(0,t.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[n?(0,t.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:n}):(0,t.jsx)("span",{}),(0,t.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:a.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:i,ariaLabel:"Mobile preview"}].map(({value:e,Icon:r,ariaLabel:a})=>(0,t.jsx)("button",{onClick:()=>b(e),"aria-label":a,className:(0,s.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",o===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,t.jsx)(r,{className:"w-3.5 h-3.5"})},e))})]}),(0,t.jsx)("div",{className:(0,s.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===o?"p-6":"p-10",d?"bg-neutral-950":"bg-[rgb(var(--background))]",c&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,t.jsx)("div",{className:(0,s.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===o&&"max-w-[390px]"),children:e})})]})}],46017)},52953,e=>{"use strict";var t=e.i(43476),r=e.i(45060);e.s(["PageHeader",0,function({title:e,description:a,badge:i,className:s}){return(0,t.jsxs)("div",{className:(0,r.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",s),children:[i&&(0,t.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),i]}),(0,t.jsx)("h1",{className:"mb-2.5",children:e}),(0,t.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},82303,e=>{"use strict";let t=(0,e.i(56420).default)("users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]);e.s(["Users",0,t],82303)},49803,e=>{"use strict";let t=(0,e.i(56420).default)("chart-column",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);e.s(["BarChart3",0,t],49803)},56298,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(52953),i=e.i(46017),s=e.i(64147),n=e.i(82303),l=e.i(49803),d=e.i(56420);let c=(0,d.default)("clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]]),o=(0,d.default)("target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]),b={react:{filename:"AnalyticsDashboard.tsx",code:`"use client";

import { useState } from "react";

type TimeRange = "7d" | "30d" | "90d" | "all";

interface KPIData {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: React.ReactNode;
}

export function AnalyticsDashboard() {
  const [range, setRange] = useState<TimeRange>("30d");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Sticky header */}
      <div style={{
        position: "sticky",
        top: 0,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "rgb(var(--background))",
        borderBottom: "1px solid rgb(var(--border))",
        zIndex: 10,
      }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Analytics</h1>
        <TimeRangePicker value={range} onChange={setRange} />
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <KPITile label="Total Applications" value="1,284" delta="+12%" trend="up" />
          <KPITile label="Interview Rate" value="34%" delta="+3%" trend="up" />
          <KPITile label="Avg. Response Time" value="8.2d" delta="-1.4d" trend="up" />
          <KPITile label="Active Pipelines" value="6" delta="+2" trend="up" />
        </div>

        {/* Primary chart zone */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 12 }}>
          <ChartTile title="Applications Over Time">
            {/* Chart content */}
          </ChartTile>
          <ChartTile title="Stage Breakdown">
            {/* Donut / breakdown */}
          </ChartTile>
        </div>
      </div>
    </div>
  );
}

function TimeRangePicker({ value, onChange }: { value: TimeRange; onChange: (v: TimeRange) => void }) {
  const options: [TimeRange, string][] = [["7d","7 Days"],["30d","30 Days"],["90d","90 Days"],["all","All Time"]];
  return (
    <div style={{ display: "flex", gap: 2, padding: 3, borderRadius: 8, background: "rgb(var(--surface-raised))", border: "1px solid rgb(var(--border))" }}>
      {options.map(([key, label]) => (
        <button key={key} onClick={() => onChange(key)} style={{
          padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500,
          border: "none", cursor: "pointer",
          background: value === key ? "rgb(var(--accent))" : "transparent",
          color: value === key ? "#fff" : "rgb(var(--text-secondary))",
          transition: "background 0.15s",
        }}>{label}</button>
      ))}
    </div>
  );
}`},html:{filename:"analytics-dashboard.html",code:`<div class="analytics-dashboard">
  <!-- Sticky header: 56px -->
  <header class="analytics-header">
    <h1 class="analytics-header__title">Analytics</h1>
    <!-- Time range picker (Segmented Button) -->
    <div class="segmented" role="group">
      <button class="segmented__btn">7 Days</button>
      <button class="segmented__btn segmented__btn--active">30 Days</button>
      <button class="segmented__btn">90 Days</button>
      <button class="segmented__btn">All Time</button>
    </div>
  </header>

  <div class="analytics-body">
    <!-- KPI row: 4 equal tiles -->
    <section class="kpi-row">
      <div class="kpi-tile"><!-- … --></div>
      <div class="kpi-tile"><!-- … --></div>
      <div class="kpi-tile"><!-- … --></div>
      <div class="kpi-tile"><!-- … --></div>
    </section>

    <!-- Primary chart zone: 1fr + 300px companion -->
    <section class="chart-zone">
      <div class="chart-tile chart-tile--primary"><!-- main chart --></div>
      <div class="chart-tile chart-tile--companion"><!-- donut or breakdown list --></div>
    </section>

    <!-- Full-width section -->
    <section class="full-width-section">
      <!-- utilization grid or table -->
    </section>
  </div>
</div>

<style>
.analytics-header {
  position: sticky;
  top: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: rgb(var(--background));
  border-bottom: 1px solid rgb(var(--border));
  z-index: 10;
}
.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
@media (max-width: 768px) {
  .kpi-row { grid-template-columns: repeat(2, 1fr); }
}
.chart-zone {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 12px;
}
</style>`},swift:{filename:"AnalyticsDashboard.swift",code:`import SwiftUI

// Mirrors Warren's InsightsView and JobFlo's AnalyticsView

enum TimeRange: String, CaseIterable, Identifiable {
    case sevenDays = "7d"
    case thirtyDays = "30d"
    case ninetyDays = "90d"
    case allTime = "all"

    var id: String { rawValue }
    var label: String {
        switch self {
        case .sevenDays: "7 Days"
        case .thirtyDays: "30 Days"
        case .ninetyDays: "90 Days"
        case .allTime: "All Time"
        }
    }
}

struct AnalyticsDashboard: View {
    @State private var range: TimeRange = .thirtyDays

    var body: some View {
        ScrollView {
            LazyVStack(spacing: 20, pinnedViews: [.sectionHeaders]) {
                Section {
                    VStack(spacing: 20) {
                        kpiRow
                        chartZone
                        utilizationGrid
                    }
                    .padding(.horizontal, 20)
                    .padding(.bottom, 20)
                } header: {
                    stickyHeader
                }
            }
        }
        .background(Color.sfBackground)
    }

    private var stickyHeader: some View {
        HStack {
            Text("Analytics")
                .font(.system(size: 16, weight: .bold))
            Spacer()
            Picker("Range", selection: $range) {
                ForEach(TimeRange.allCases) { r in
                    Text(r.label).tag(r)
                }
            }
            .pickerStyle(.segmented)
            .fixedSize()
        }
        .padding(.horizontal, 20)
        .frame(height: 56)
        .background(.regularMaterial)
        .overlay(alignment: .bottom) { Divider() }
    }

    private var kpiRow: some View {
        // Responsive: HStack on iPad/Mac, 2-col grid on iPhone
        AdaptiveGrid(minWidth: 160) {
            KPITile(icon: Image(systemName: "doc.text"),
                    value: "1,284", label: "Applications",
                    delta: "+12%", trend: .up)
            KPITile(icon: Image(systemName: "calendar"),
                    value: "34%", label: "Interview Rate",
                    delta: "+3%", trend: .up)
            KPITile(icon: Image(systemName: "clock"),
                    value: "8.2d", label: "Avg Response",
                    delta: "-1.4d", trend: .up)
            KPITile(icon: Image(systemName: "chart.bar"),
                    value: "6", label: "Active Pipelines",
                    delta: "+2", trend: .up)
        }
    }

    private var chartZone: some View {
        HStack(alignment: .top, spacing: 12) {
            ApplicationsChart()
                .frame(maxWidth: .infinity)
            StageBreakdown()
                .frame(width: 300)
        }
    }
}`},macos:{filename:"AnalyticsDashboard.swift",code:`// macOS — uses NavigationSplitView sidebar layout.
// Analytics view sits in the detail column with full-width charts.
// Warren's InsightsView is the primary reference.

struct AnalyticsDetailView: View {
    @State private var range: TimeRange = .thirtyDays

    var body: some View {
        VStack(spacing: 0) {
            toolbar
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Section labels: 11px semibold, tracking 0.8, tertiary colour
                    sectionLabel("Overview")
                    kpiRow
                    sectionLabel("Performance")
                    chartZone
                    sectionLabel("Utilization")
                    utilizationGrid
                }
                .padding(24)
            }
        }
    }

    private func sectionLabel(_ title: String) -> some View {
        Text(title)
            .font(.system(size: 11, weight: .semibold))
            .kerning(0.8)
            .foregroundStyle(.sfTextTertiary)
            .textCase(.uppercase)
    }
}`}};function x({label:e,value:r,delta:a,trend:i,icon:s,color:n}){let l="up"===i?"rgb(var(--status-success))":"rgb(var(--status-danger))";return(0,t.jsxs)("div",{style:{padding:16,borderRadius:12,background:"rgb(var(--surface))",border:"1px solid rgb(var(--border))",boxShadow:"var(--shadow-card)",display:"flex",flexDirection:"column",gap:10},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between"},children:[(0,t.jsx)("div",{style:{width:36,height:36,borderRadius:9,background:n+"20",display:"flex",alignItems:"center",justifyContent:"center",color:n,boxShadow:"inset 0 1px 0 rgba(255,255,255,0.12)"},children:s}),a&&(0,t.jsx)("span",{style:{fontSize:11,fontWeight:600,color:l,background:l.replace(")"," / 0.12)").replace("rgb(","rgba("),padding:"2px 7px",borderRadius:99},children:a})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{style:{fontSize:22,fontWeight:700,fontVariantNumeric:"tabular-nums",letterSpacing:"-0.01em"},children:r}),(0,t.jsx)("div",{style:{fontSize:12,color:"rgb(var(--text-tertiary))",marginTop:2},children:e})]})]})}function p({children:e}){return(0,t.jsx)("p",{style:{fontSize:11,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgb(var(--text-tertiary))",margin:0},children:e})}let g=[{label:"Applied",count:1284,color:"#6366F1"},{label:"Screening",count:438,color:"#3B82F6"},{label:"Interview",count:182,color:"#F59E0B"},{label:"Offer",count:34,color:"#10B981"},{label:"Hired",count:12,color:"#10B981"}];e.s(["default",0,function(){let[e,d]=(0,r.useState)("30d"),m=Math.max(...g.map(e=>e.count));return(0,t.jsxs)("div",{children:[(0,t.jsx)(a.PageHeader,{title:"Analytics Dashboard",description:"A pattern for composing KPI tiles, charts, and tables into a cohesive analytics screen with a sticky time-range header. Mirrors Warren's InsightsView and JobFlo's AnalyticsView.",badge:"New"}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Demo"}),(0,t.jsx)(i.ComponentPreview,{children:(0,t.jsxs)("div",{style:{fontFamily:"inherit",display:"flex",flexDirection:"column",gap:0},children:[(0,t.jsxs)("div",{style:{height:52,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",borderBottom:"1px solid rgb(var(--border))",marginBottom:20},children:[(0,t.jsx)("span",{style:{fontSize:15,fontWeight:700},children:"Analytics"}),(0,t.jsx)("div",{style:{display:"flex",gap:2,padding:3,borderRadius:8,background:"rgb(var(--surface-raised))",border:"1px solid rgb(var(--border))"},children:["7 Days","30 Days","90 Days","All Time"].map(e=>(0,t.jsx)("span",{style:{padding:"4px 12px",borderRadius:6,fontSize:12,fontWeight:500,background:"30 Days"===e?"rgb(var(--accent))":"transparent",color:"30 Days"===e?"#fff":"rgb(var(--text-secondary))"},children:e},e))})]}),(0,t.jsxs)("div",{style:{padding:"0 20px 20px",display:"flex",flexDirection:"column",gap:20},children:[(0,t.jsx)(p,{children:"Overview"}),(0,t.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10},children:[(0,t.jsx)(x,{label:"Applications",value:"1,284",delta:"+12%",trend:"up",icon:(0,t.jsx)(l.BarChart3,{size:16}),color:"#6366F1"}),(0,t.jsx)(x,{label:"Interview Rate",value:"34%",delta:"+3%",trend:"up",icon:(0,t.jsx)(n.Users,{size:16}),color:"#3B82F6"}),(0,t.jsx)(x,{label:"Avg Response",value:"8.2d",delta:"-1.4d",trend:"up",icon:(0,t.jsx)(c,{size:16}),color:"#F59E0B"}),(0,t.jsx)(x,{label:"Active Pipelines",value:"6",delta:"+2",trend:"up",icon:(0,t.jsx)(o,{size:16}),color:"#10B981"})]}),(0,t.jsx)(p,{children:"Stage Funnel"}),(0,t.jsx)("div",{style:{padding:16,borderRadius:12,background:"rgb(var(--surface))",border:"1px solid rgb(var(--border))",boxShadow:"var(--shadow-card)",display:"flex",flexDirection:"column",gap:10},children:g.map(e=>(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12},children:[(0,t.jsx)("span",{style:{width:80,fontSize:12,color:"rgb(var(--text-secondary))",textAlign:"right",flexShrink:0},children:e.label}),(0,t.jsx)("div",{style:{flex:1,height:20,borderRadius:4,background:"rgb(var(--surface-raised))",overflow:"hidden"},children:(0,t.jsx)("div",{style:{height:"100%",width:`${e.count/m*100}%`,background:e.color,borderRadius:4,transition:"width 0.4s"}})}),(0,t.jsx)("span",{style:{width:50,fontSize:12,fontWeight:600,fontVariantNumeric:"tabular-nums"},children:e.count.toLocaleString()})]},e.label))})]})]})})]}),(0,t.jsxs)("section",{className:"mb-10 mt-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Layout spec"}),(0,t.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5",children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:[(0,t.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:"Zone"}),(0,t.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:"Spec"})]})}),(0,t.jsxs)("tbody",{children:[(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Sticky header"}),(0,t.jsxs)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:["56 px, view title + time-range Segmented Button, ",(0,t.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"--background"})," backing, bottom divider"]})]}),(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"KPI row"}),(0,t.jsxs)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:["Equal-width tiles in HStack, gap ",(0,t.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"--spacing-lg"}),"; collapses to 2-col on narrow"]})]}),(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Primary chart zone"}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"1fr flexible chart + 300 px companion (donut or breakdown list)"})]}),(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Section headers"}),(0,t.jsxs)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:["11 px semibold, letter-spacing 0.8, ",(0,t.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"--text-tertiary"}),", uppercase — matches ",(0,t.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"label-mono"})]})]}),(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Empty states"}),(0,t.jsxs)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:["Inline ",(0,t.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"EmptyState"})," per chart tile; never full-page replacement"]})]}),(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--background))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Dashboard background"}),(0,t.jsxs)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:[(0,t.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"--background"}),", not ",(0,t.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"--surface"})]})]})]})]})})]}),(0,t.jsxs)("section",{className:"mb-10",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Time range picker"}),(0,t.jsxs)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed",children:["Use the ",(0,t.jsx)("a",{href:"/components/segmented-button",className:"text-[rgb(var(--accent))] hover:underline",children:"Segmented Button"})," locked to these options:",(0,t.jsx)("strong",{children:" 7 Days / 30 Days / 90 Days / All Time"}),". Place it in the sticky header row, right-aligned. The picker drives all chart and KPI data on the same screen."]})]}),(0,t.jsxs)("section",{className:"mb-10",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Implementation"}),(0,t.jsx)(s.PlatformTabs,{code:b})]})]})}],56298)}]);