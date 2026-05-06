(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{"use strict";let r=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,r],89664)},8734,e=>{"use strict";let r=(0,e.i(56420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,r],8734)},61939,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(89664),i=e.i(8734),s=e.i(46932),n=e.i(88653),o=e.i(45060);e.s(["CodeBlock",0,function({code:e,language:l="tsx",filename:d,className:c}){let[p,x]=(0,t.useState)(!1),u=async()=>{await navigator.clipboard.writeText(e.trim()),x(!0),setTimeout(()=>x(!1),2e3)};return(0,r.jsxs)("div",{className:(0,o.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",c),children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsxs)("div",{className:"flex gap-1.5",children:[(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),d&&(0,r.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:d})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:l}),(0,r.jsx)("button",{onClick:u,className:(0,o.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",p?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,r.jsx)(n.AnimatePresence,{mode:"wait",initial:!1,children:p?(0,r.jsxs)(s.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,r.jsxs)(s.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(i.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,r.jsx)("code",{children:e.trim()})})})]})}])},64147,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(46932),i=e.i(61939),s=e.i(45060);let n={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},o={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:l}){let[d,c]=(0,t.useState)("react"),p=["react","html","swift",...e.macos?["macos"]:[]],x=e[d]??e.swift;return(0,r.jsxs)("div",{className:(0,s.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",l),children:[(0,r.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:p.map(e=>(0,r.jsxs)("button",{onClick:()=>c(e),className:(0,s.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",d===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[d===e&&(0,r.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),n[e]]},e))}),(0,r.jsx)(i.CodeBlock,{code:x.code,language:o[d],filename:x.filename,className:"rounded-none border-0"})]})}])},46017,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(46513);let i=(0,e.i(56420).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var s=e.i(45060);e.s(["ComponentPreview",0,function({children:e,label:n,className:o,dark:l,grid:d}){let[c,p]=(0,t.useState)("desktop");return(0,r.jsxs)("div",{className:(0,s.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",o),children:[(0,r.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[n?(0,r.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:n}):(0,r.jsx)("span",{}),(0,r.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:a.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:i,ariaLabel:"Mobile preview"}].map(({value:e,Icon:t,ariaLabel:a})=>(0,r.jsx)("button",{onClick:()=>p(e),"aria-label":a,className:(0,s.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",c===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,r.jsx)(t,{className:"w-3.5 h-3.5"})},e))})]}),(0,r.jsx)("div",{className:(0,s.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===c?"p-6":"p-10",l?"bg-neutral-950":"bg-[rgb(var(--background))]",d&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,r.jsx)("div",{className:(0,s.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===c&&"max-w-[390px]"),children:e})})]})}],46017)},6537,e=>{"use strict";let r=(0,e.i(56420).default)("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);e.s(["Lock",0,r],6537)},52953,e=>{"use strict";var r=e.i(43476),t=e.i(45060);e.s(["PageHeader",0,function({title:e,description:a,badge:i,className:s}){return(0,r.jsxs)("div",{className:(0,t.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",s),children:[i&&(0,r.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,r.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),i]}),(0,r.jsx)("h1",{className:"mb-2.5",children:e}),(0,r.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},32610,e=>{"use strict";var r=e.i(43476),t=e.i(45060);e.s(["PropsTable",0,function({props:e,className:a}){return(0,r.jsx)("div",{className:(0,t.cn)("overflow-hidden rounded-xl border border-[rgb(var(--border))]",a),children:(0,r.jsxs)("table",{className:"w-full text-[13px]",children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{className:"border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:["Prop","Type","Default","Description"].map(e=>(0,r.jsx)("th",{className:"px-4 py-3 text-left font-semibold text-[rgb(var(--text-tertiary))] text-[11px] uppercase tracking-wider",children:e},e))})}),(0,r.jsx)("tbody",{children:e.map((e,a)=>(0,r.jsxs)("tr",{className:(0,t.cn)("border-b border-[rgb(var(--border-subtle))] last:border-0",a%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"),children:[(0,r.jsx)("td",{className:"px-4 py-3",children:(0,r.jsxs)("code",{className:"text-[rgb(var(--accent))] font-mono text-[12px]",children:[e.name,e.required&&(0,r.jsx)("span",{className:"text-red-400 ml-0.5",children:"*"})]})}),(0,r.jsx)("td",{className:"px-4 py-3",children:(0,r.jsx)("code",{className:"text-[rgb(var(--text-secondary))] font-mono text-[11px] bg-[rgb(var(--surface-raised))] px-1.5 py-0.5 rounded",children:e.type})}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.default?(0,r.jsx)("code",{className:"font-mono text-[11px]",children:e.default}):(0,r.jsx)("span",{className:"opacity-40",children:"—"})}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))] leading-relaxed",children:e.description})]},e.name))})]})})}])},82303,e=>{"use strict";let r=(0,e.i(56420).default)("users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]);e.s(["Users",0,r],82303)},12028,e=>{"use strict";var r=e.i(43476),t=e.i(52953),a=e.i(46017),i=e.i(32610),s=e.i(64147),n=e.i(71645),o=e.i(6537),l=e.i(56420);let d=(0,l.default)("sparkles",[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]]),c=(0,l.default)("zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]),p=(0,l.default)("chart-column",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);var x=e.i(82303);let u=(0,l.default)("shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]),g=[{name:"feature",type:"string",description:"Human-readable name of the gated feature, shown in the upgrade prompt."},{name:"isLocked",type:"boolean",default:"true",description:"When false, renders children without any overlay."},{name:"variant",type:'"inline" | "sheet"',default:'"inline"',description:"Inline overlays the locked content; sheet opens a full paywall modal."},{name:"onUpgrade",type:"() => void",description:"Callback fired when the user taps the upgrade CTA."},{name:"description",type:"string",description:"Optional supporting text shown below the feature name in the overlay."}],h={react:{filename:"FeatureGate.tsx",code:`"use client";

import { useState, ReactNode } from "react";
import { Lock, Sparkles } from "lucide-react";

interface FeatureGateProps {
  feature: string;
  isLocked?: boolean;
  description?: string;
  onUpgrade?: () => void;
  children: ReactNode;
}

export function FeatureGate({
  feature,
  isLocked = true,
  description,
  onUpgrade,
  children,
}: FeatureGateProps) {
  if (!isLocked) return <>{children}</>;

  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
      {/* Blurred content */}
      <div style={{ filter: "blur(4px)", pointerEvents: "none", userSelect: "none" }}>
        {children}
      </div>

      {/* Glass overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          background: "rgb(var(--surface) / 0.7)",
          // Specular top edge
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "rgb(var(--accent) / 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgb(var(--accent))",
          }}
        >
          <Lock size={20} />
        </div>

        <div style={{ textAlign: "center", maxWidth: 240 }}>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
            {feature}
          </p>
          {description && (
            <p style={{ fontSize: 12, color: "rgb(var(--text-secondary))", lineHeight: 1.5 }}>
              {description}
            </p>
          )}
        </div>

        <button
          onClick={onUpgrade}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 8,
            background: "rgb(var(--accent))",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          <Sparkles size={14} />
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}`},html:{filename:"feature-gate.html",code:`<div class="feature-gate">
  <!-- Blurred content underneath -->
  <div class="feature-gate__content">
    <!-- your locked content here -->
  </div>

  <!-- Glass overlay -->
  <div class="feature-gate__overlay">
    <div class="feature-gate__icon">
      <!-- lock icon -->
    </div>
    <p class="feature-gate__title">Advanced Analytics</p>
    <p class="feature-gate__description">Upgrade to Pro to access team insights.</p>
    <button class="btn-upgrade">✦ Upgrade to Pro</button>
  </div>
</div>

<style>
.feature-gate {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}
.feature-gate__content {
  filter: blur(4px);
  pointer-events: none;
  user-select: none;
}
.feature-gate__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  backdrop-filter: blur(20px) saturate(160%);
  background: rgb(var(--surface) / 0.7);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
  border-radius: 12px;
}
.btn-upgrade {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  background: rgb(var(--accent));
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
</style>`},swift:{filename:"FeatureGate.swift",code:`import SwiftUI

struct FeatureGate<Content: View>: View {
    let feature: String
    var description: String? = nil
    var isLocked: Bool = true
    var onUpgrade: (() -> Void)? = nil

    @ViewBuilder let content: () -> Content

    var body: some View {
        content()
            .blur(radius: isLocked ? 4 : 0)
            .overlay {
                if isLocked {
                    overlayContent
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: 12))
    }

    private var overlayContent: some View {
        ZStack {
            // Glass backing
            SFBlurView(material: .sheet)
                .overlay(alignment: .top) {
                    // Specular top edge
                    LinearGradient(
                        colors: [.white.opacity(0.12), .clear],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                    .frame(height: 1)
                }

            VStack(spacing: 12) {
                // Icon well
                RoundedRectangle(cornerRadius: 10)
                    .fill(Color.sfBrand(.accent).opacity(0.15))
                    .frame(width: 44, height: 44)
                    .overlay {
                        Image(systemName: "lock.fill")
                            .foregroundStyle(.sfBrand(.accent))
                    }

                VStack(spacing: 4) {
                    Text(feature)
                        .font(.system(size: 14, weight: .semibold))

                    if let description {
                        Text(description)
                            .font(.system(size: 12))
                            .foregroundStyle(.sfTextSecondary)
                            .multilineTextAlignment(.center)
                    }
                }
                .padding(.horizontal, 24)

                Button {
                    onUpgrade?()
                } label: {
                    Label("Upgrade to Pro", systemImage: "sparkles")
                        .font(.system(size: 13, weight: .semibold))
                        .padding(.horizontal, 16)
                        .padding(.vertical, 8)
                        .background(Color.sfBrand(.accent))
                        .foregroundStyle(.white)
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                }
            }
        }
    }
}

// Usage
struct AnalyticsView: View {
    var body: some View {
        FeatureGate(
            feature: "Team Insights",
            description: "See how your team is performing across all projects.",
            isLocked: !userIsProSubscriber
        ) {
            TeamUtilizationSection()
        }
    }
}`},macos:{filename:"FeatureGate.swift",code:`// macOS — identical SwiftUI API, uses .sheet material
// for the blur which is appropriate for macOS vibrancy

struct FeatureGate<Content: View>: View {
    let feature: String
    var isLocked: Bool = true
    var onUpgrade: (() -> Void)? = nil
    @ViewBuilder let content: () -> Content

    var body: some View {
        content()
            .blur(radius: isLocked ? 4 : 0)
            .overlay {
                if isLocked {
                    ZStack {
                        VisualEffectView(material: .sheet, blendingMode: .withinWindow)
                        VStack(spacing: 12) {
                            Image(systemName: "lock.fill")
                                .font(.system(size: 18))
                                .foregroundStyle(.accent)
                            Text(feature).font(.headline)
                            Button("Upgrade to Pro") { onUpgrade?() }
                                .buttonStyle(.borderedProminent)
                                .tint(.accent)
                        }
                    }
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}`}};function b(){let[e,t]=(0,n.useState)(!1);return(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:16,padding:24},children:[(0,r.jsx)("div",{style:{display:"flex",justifyContent:"flex-end"},children:(0,r.jsx)("button",{onClick:()=>t(e=>!e),style:{padding:"6px 14px",borderRadius:8,border:"1px solid rgb(var(--border))",background:"rgb(var(--surface-raised))",color:"rgb(var(--text-primary))",fontSize:13,cursor:"pointer"},children:e?"Lock again":"Simulate upgrade"})}),(0,r.jsxs)("div",{style:{position:"relative",borderRadius:12,overflow:"hidden"},children:[(0,r.jsxs)("div",{style:{filter:e?"none":"blur(4px)",transition:"filter 0.3s",pointerEvents:e?"auto":"none",userSelect:e?"auto":"none",padding:20,background:"rgb(var(--surface))",border:"1px solid rgb(var(--border))",borderRadius:12},children:[(0,r.jsx)("p",{style:{fontSize:12,fontWeight:600,letterSpacing:"0.05em",color:"rgb(var(--text-tertiary))",textTransform:"uppercase",marginBottom:16},children:"Team Insights"}),(0,r.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12},children:[{icon:(0,r.jsx)(x.Users,{size:16}),label:"Members",value:"12"},{icon:(0,r.jsx)(p,{size:16}),label:"Utilization",value:"87%"},{icon:(0,r.jsx)(c,{size:16}),label:"Velocity",value:"34 pts"}].map(e=>(0,r.jsxs)("div",{style:{padding:14,borderRadius:8,background:"rgb(var(--surface-raised))",border:"1px solid rgb(var(--border-subtle))"},children:[(0,r.jsx)("div",{style:{color:"rgb(var(--accent))",marginBottom:8},children:e.icon}),(0,r.jsx)("div",{style:{fontSize:18,fontWeight:700,fontVariantNumeric:"tabular-nums"},children:e.value}),(0,r.jsx)("div",{style:{fontSize:11,color:"rgb(var(--text-tertiary))",marginTop:2},children:e.label})]},e.label))})]}),!e&&(0,r.jsxs)("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,backdropFilter:"blur(20px) saturate(160%)",WebkitBackdropFilter:"blur(20px) saturate(160%)",background:"rgb(var(--surface) / 0.72)",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.10)",borderRadius:12},children:[(0,r.jsx)("div",{style:{width:44,height:44,borderRadius:12,background:"rgb(var(--accent) / 0.15)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgb(var(--accent))"},children:(0,r.jsx)(o.Lock,{size:20})}),(0,r.jsxs)("div",{style:{textAlign:"center"},children:[(0,r.jsx)("p",{style:{fontWeight:600,fontSize:14,marginBottom:4},children:"Team Insights"}),(0,r.jsx)("p",{style:{fontSize:12,color:"rgb(var(--text-secondary))",maxWidth:220},children:"See how your team is performing across all projects."})]}),(0,r.jsxs)("button",{onClick:()=>t(!0),style:{display:"flex",alignItems:"center",gap:6,padding:"8px 18px",borderRadius:8,background:"rgb(var(--accent))",color:"#fff",fontSize:13,fontWeight:600,border:"none",cursor:"pointer"},children:[(0,r.jsx)(d,{size:14}),"Upgrade to Pro"]})]})]})]})}function f({icon:e,title:t,description:a}){return(0,r.jsxs)("div",{style:{display:"flex",gap:12,alignItems:"flex-start"},children:[(0,r.jsx)("div",{style:{width:32,height:32,borderRadius:8,background:"rgb(var(--accent) / 0.12)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgb(var(--accent))",flexShrink:0},children:e}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{style:{fontSize:13,fontWeight:600,marginBottom:2},children:t}),(0,r.jsx)("p",{style:{fontSize:12,color:"rgb(var(--text-secondary))"},children:a})]})]})}function m(){let[e,t]=(0,n.useState)(!1);return(0,r.jsxs)("div",{style:{display:"flex",justifyContent:"center",padding:40},children:[(0,r.jsxs)("button",{onClick:()=>t(!0),style:{display:"flex",alignItems:"center",gap:6,padding:"10px 20px",borderRadius:8,background:"rgb(var(--accent))",color:"#fff",fontSize:14,fontWeight:600,border:"none",cursor:"pointer"},children:[(0,r.jsx)(o.Lock,{size:14}),"Show paywall sheet"]}),e&&(0,r.jsxs)("div",{style:{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:50,padding:24},onClick:()=>t(!1),children:[(0,r.jsx)("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.4)"}}),(0,r.jsxs)("div",{onClick:e=>e.stopPropagation(),style:{position:"relative",width:"100%",maxWidth:420,borderRadius:16,background:"rgb(var(--surface))",border:"1px solid rgb(var(--border))",boxShadow:"var(--shadow-sheet)",overflow:"hidden"},children:[(0,r.jsx)("div",{style:{height:1,background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)"}}),(0,r.jsxs)("div",{style:{padding:28},children:[(0,r.jsxs)("div",{style:{textAlign:"center",marginBottom:24},children:[(0,r.jsx)("div",{style:{width:56,height:56,borderRadius:16,background:"rgb(var(--accent) / 0.15)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgb(var(--accent))",margin:"0 auto 12px"},children:(0,r.jsx)(u,{size:24})}),(0,r.jsx)("h2",{style:{fontSize:20,fontWeight:700,marginBottom:8},children:"Upgrade to Pro"}),(0,r.jsx)("p",{style:{fontSize:14,color:"rgb(var(--text-secondary))"},children:"Unlock the full power of your workspace."})]}),(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:16,marginBottom:24},children:[(0,r.jsx)(f,{icon:(0,r.jsx)(p,{size:16}),title:"Advanced Analytics",description:"Detailed insights into team performance and project health."}),(0,r.jsx)(f,{icon:(0,r.jsx)(x.Users,{size:16}),title:"Unlimited Members",description:"Invite your entire team with no seat limits."}),(0,r.jsx)(f,{icon:(0,r.jsx)(c,{size:16}),title:"Priority Support",description:"Get help from our team within 4 hours."})]}),(0,r.jsx)("button",{style:{width:"100%",padding:"12px",borderRadius:10,background:"rgb(var(--accent))",color:"#fff",fontSize:15,fontWeight:700,border:"none",cursor:"pointer",marginBottom:10},children:"Start 14-day free trial"}),(0,r.jsx)("button",{onClick:()=>t(!1),style:{width:"100%",padding:"10px",borderRadius:10,background:"transparent",color:"rgb(var(--text-secondary))",fontSize:14,border:"1px solid rgb(var(--border))",cursor:"pointer"},children:"Maybe later"})]})]})]})]})}e.s(["default",0,function(){return(0,r.jsxs)("div",{children:[(0,r.jsx)(t.PageHeader,{title:"Feature Gate",description:"Locks premium content behind a glass overlay and provides a path to upgrade. Reuses surface and accent tokens; no new tokens required.",badge:"New"}),(0,r.jsxs)("section",{children:[(0,r.jsx)("h2",{children:"Inline gate"}),(0,r.jsx)("p",{children:"The inline variant blurs the locked content in place and overlays a glass CTA. Use this for feature sections within a larger screen — it preserves layout while signalling premium content."}),(0,r.jsx)(a.ComponentPreview,{children:(0,r.jsx)(b,{})})]}),(0,r.jsxs)("section",{children:[(0,r.jsx)("h2",{children:"Sheet paywall"}),(0,r.jsx)("p",{children:"The sheet variant opens a focused modal with feature highlights and a pricing CTA. Use this when the user explicitly triggers a locked action, such as tapping a locked nav item."}),(0,r.jsx)(a.ComponentPreview,{children:(0,r.jsx)(m,{})})]}),(0,r.jsxs)("section",{children:[(0,r.jsx)("h2",{children:"Anatomy"}),(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Layer"}),(0,r.jsx)("th",{children:"Description"}),(0,r.jsx)("th",{children:"Token"})]})}),(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"Blur content"}),(0,r.jsx)("td",{children:"Children rendered at blur(4px) with pointer-events disabled"}),(0,r.jsx)("td",{children:"—"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"Glass surface"}),(0,r.jsx)("td",{children:"backdrop-filter blur(20px) saturate(160%)"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"--surface-glass"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"Specular edge"}),(0,r.jsx)("td",{children:"inset 0 1px 0 rgba(255,255,255,0.08) — hairline on top"}),(0,r.jsx)("td",{children:"—"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"Icon well"}),(0,r.jsx)("td",{children:"44×44 rounded rect, accent-tinted background"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"--accent / 0.15"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"Upgrade button"}),(0,r.jsx)("td",{children:"Solid accent fill, white label"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"--accent"})})]})]})]})]}),(0,r.jsxs)("section",{children:[(0,r.jsx)("h2",{children:"Usage guidelines"}),(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:"Always show enough of the locked content to communicate value — don't hide it entirely."}),(0,r.jsx)("li",{children:"Keep the feature name concise (2–4 words). Put extra context in the description line."}),(0,r.jsx)("li",{children:"The upgrade CTA must always be visible and tappable, even on small screens."}),(0,r.jsxs)("li",{children:["Apply ",(0,r.jsx)("code",{children:"prefers-reduced-transparency"})," fallback: replace ",(0,r.jsx)("code",{children:"backdrop-filter"})," with a solid ",(0,r.jsx)("code",{children:"--surface"})," background."]}),(0,r.jsx)("li",{children:"Do not gate core navigation or destructive/dangerous actions — only feature upsells."})]})]}),(0,r.jsxs)("section",{children:[(0,r.jsx)("h2",{children:"Implementation"}),(0,r.jsx)(s.PlatformTabs,{code:h})]}),(0,r.jsx)(i.PropsTable,{props:g})]})}],12028)}]);