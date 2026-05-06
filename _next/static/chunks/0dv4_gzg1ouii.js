(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{"use strict";let r=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,r],89664)},8734,e=>{"use strict";let r=(0,e.i(56420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,r],8734)},61939,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(89664),s=e.i(8734),o=e.i(46932),l=e.i(88653),i=e.i(45060);e.s(["CodeBlock",0,function({code:e,language:n="tsx",filename:c,className:d}){let[x,b]=(0,t.useState)(!1),p=async()=>{await navigator.clipboard.writeText(e.trim()),b(!0),setTimeout(()=>b(!1),2e3)};return(0,r.jsxs)("div",{className:(0,i.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",d),children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsxs)("div",{className:"flex gap-1.5",children:[(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),c&&(0,r.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:c})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:n}),(0,r.jsx)("button",{onClick:p,className:(0,i.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",x?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,r.jsx)(l.AnimatePresence,{mode:"wait",initial:!1,children:x?(0,r.jsxs)(o.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,r.jsxs)(o.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,r.jsx)("code",{children:e.trim()})})})]})}])},64147,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(46932),s=e.i(61939),o=e.i(45060);let l={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},i={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:n}){let[c,d]=(0,t.useState)("react"),x=["react","html","swift",...e.macos?["macos"]:[]],b=e[c]??e.swift;return(0,r.jsxs)("div",{className:(0,o.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",n),children:[(0,r.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:x.map(e=>(0,r.jsxs)("button",{onClick:()=>d(e),className:(0,o.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",c===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[c===e&&(0,r.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),l[e]]},e))}),(0,r.jsx)(s.CodeBlock,{code:b.code,language:i[c],filename:b.filename,className:"rounded-none border-0"})]})}])},46017,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(46513);let s=(0,e.i(56420).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var o=e.i(45060);e.s(["ComponentPreview",0,function({children:e,label:l,className:i,dark:n,grid:c}){let[d,x]=(0,t.useState)("desktop");return(0,r.jsxs)("div",{className:(0,o.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",i),children:[(0,r.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[l?(0,r.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:l}):(0,r.jsx)("span",{}),(0,r.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:a.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:s,ariaLabel:"Mobile preview"}].map(({value:e,Icon:t,ariaLabel:a})=>(0,r.jsx)("button",{onClick:()=>x(e),"aria-label":a,className:(0,o.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",d===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,r.jsx)(t,{className:"w-3.5 h-3.5"})},e))})]}),(0,r.jsx)("div",{className:(0,o.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===d?"p-6":"p-10",n?"bg-neutral-950":"bg-[rgb(var(--background))]",c&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,r.jsx)("div",{className:(0,o.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===d&&"max-w-[390px]"),children:e})})]})}],46017)},52953,e=>{"use strict";var r=e.i(43476),t=e.i(45060);e.s(["PageHeader",0,function({title:e,description:a,badge:s,className:o}){return(0,r.jsxs)("div",{className:(0,t.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",o),children:[s&&(0,r.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,r.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,r.jsx)("h1",{className:"mb-2.5",children:e}),(0,r.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},32610,e=>{"use strict";var r=e.i(43476),t=e.i(45060);e.s(["PropsTable",0,function({props:e,className:a}){return(0,r.jsx)("div",{className:(0,t.cn)("overflow-hidden rounded-xl border border-[rgb(var(--border))]",a),children:(0,r.jsxs)("table",{className:"w-full text-[13px]",children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{className:"border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:["Prop","Type","Default","Description"].map(e=>(0,r.jsx)("th",{className:"px-4 py-3 text-left font-semibold text-[rgb(var(--text-tertiary))] text-[11px] uppercase tracking-wider",children:e},e))})}),(0,r.jsx)("tbody",{children:e.map((e,a)=>(0,r.jsxs)("tr",{className:(0,t.cn)("border-b border-[rgb(var(--border-subtle))] last:border-0",a%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"),children:[(0,r.jsx)("td",{className:"px-4 py-3",children:(0,r.jsxs)("code",{className:"text-[rgb(var(--accent))] font-mono text-[12px]",children:[e.name,e.required&&(0,r.jsx)("span",{className:"text-red-400 ml-0.5",children:"*"})]})}),(0,r.jsx)("td",{className:"px-4 py-3",children:(0,r.jsx)("code",{className:"text-[rgb(var(--text-secondary))] font-mono text-[11px] bg-[rgb(var(--surface-raised))] px-1.5 py-0.5 rounded",children:e.type})}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.default?(0,r.jsx)("code",{className:"font-mono text-[11px]",children:e.default}):(0,r.jsx)("span",{className:"opacity-40",children:"—"})}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))] leading-relaxed",children:e.description})]},e.name))})]})})}])},72115,e=>{"use strict";var r=e.i(43476),t=e.i(52953),a=e.i(46017),s=e.i(32610),o=e.i(64147),l=e.i(71645),i=e.i(89664);let n=[{label:"Coral",value:"#FF6B35"},{label:"Crimson",value:"#EF4444"},{label:"Rose",value:"#F43F5E"},{label:"Violet",value:"#8B5CF6"},{label:"Indigo",value:"#6366F1"},{label:"Blue",value:"#3B82F6"},{label:"Cyan",value:"#06B6D4"},{label:"Teal",value:"#14B8A6"},{label:"Emerald",value:"#10B981"},{label:"Lime",value:"#84CC16"},{label:"Amber",value:"#F59E0B"},{label:"Stone",value:"#78716C"}];function c(e){return function(e){let r,{r:t,g:a,b:s}=(r=parseInt(e.slice(1,3),16),{r,g:parseInt(e.slice(3,5),16),b:parseInt(e.slice(5,7),16)}),o=e=>{let r=e/255;return r<=.04045?r/12.92:Math.pow((r+.055)/1.055,2.4)};return .2126*o(t)+.7152*o(a)+.0722*o(s)}(e)>.179?"#000000":"#FFFFFF"}let d=[{name:"value",type:"string",description:"Current selected colour as a hex string (#RRGGBB)."},{name:"onChange",type:"(hex: string) => void",description:"Callback fired with a valid hex string when the selection changes."},{name:"palette",type:"Array<{ label: string; value: string }>",description:"Predefined swatches shown in the grid. Defaults to the Sitka brand palette."},{name:"allowCustom",type:"boolean",default:"true",description:"Shows the hex input field for custom colours."},{name:"size",type:'"sm" | "md" | "lg"',default:'"md"',description:"Controls swatch and picker dimensions."}],x={react:{filename:"ColorPicker.tsx",code:`"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const PALETTE = [
  { label: "Coral",   value: "#FF6B35" },
  { label: "Indigo",  value: "#6366F1" },
  { label: "Blue",    value: "#3B82F6" },
  { label: "Emerald", value: "#10B981" },
  { label: "Amber",   value: "#F59E0B" },
  // … add more as needed
];

function accessibleForeground(bgHex: string): string {
  const { r, g, b } = hexToRgb(bgHex);
  const lum = 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
  return lum > 0.179 ? "#000" : "#fff";
}

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  palette?: Array<{ label: string; value: string }>;
  allowCustom?: boolean;
}

export function ColorPicker({
  value,
  onChange,
  palette = PALETTE,
  allowCustom = true,
}: ColorPickerProps) {
  const [hex, setHex] = useState(value);

  function handleSwatchClick(color: string) {
    setHex(color);
    onChange(color);
  }

  function handleHexInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setHex(raw);
    if (/^#[0-9A-Fa-f]{6}$/.test(raw)) {
      onChange(raw);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Swatch grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
        {palette.map((swatch) => (
          <button
            key={swatch.value}
            title={swatch.label}
            onClick={() => handleSwatchClick(swatch.value)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: swatch.value,
              border: value === swatch.value
                ? \`3px solid \${accessibleForeground(swatch.value)}\`
                : "2px solid transparent",
              cursor: "pointer",
              position: "relative",
              // Specular highlight on selected swatch (sfPillSpecular equivalent)
              boxShadow: value === swatch.value
                ? "inset 0 1px 0 rgba(255,255,255,0.25), 0 0 0 2px rgba(0,0,0,0.15)"
                : "inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            {value === swatch.value && (
              <span style={{ color: accessibleForeground(swatch.value), display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Hex input */}
      {allowCustom && (
        <input
          type="text"
          value={hex}
          onChange={handleHexInput}
          placeholder="#FF6B35"
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgb(var(--border))",
            background: "rgb(var(--surface-raised))",
            color: "rgb(var(--text-primary))",
            fontSize: 13,
            fontFamily: "monospace",
          }}
        />
      )}

      {/* Preview swatch */}
      <div
        style={{
          height: 40,
          borderRadius: 8,
          background: value,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 600,
          color: accessibleForeground(value),
          letterSpacing: "0.04em",
        }}
      >
        {value}
      </div>
    </div>
  );
}`},html:{filename:"color-picker.html",code:`<div class="color-picker">
  <div class="color-picker__grid">
    <button class="color-swatch" data-color="#FF6B35" style="background:#FF6B35" aria-label="Coral"></button>
    <button class="color-swatch selected" data-color="#6366F1" style="background:#6366F1" aria-label="Indigo">
      <svg …><!-- checkmark --></svg>
    </button>
    <!-- … more swatches … -->
  </div>

  <input type="text" class="color-picker__hex-input" value="#6366F1" placeholder="#RRGGBB" />

  <div class="color-picker__preview" style="background:#6366F1;">
    #6366F1
  </div>
</div>

<style>
.color-picker__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}
.color-swatch {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
}
.color-swatch.selected {
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 0 0 2px rgba(0,0,0,0.15);
}
.color-picker__hex-input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgb(var(--border));
  background: rgb(var(--surface-raised));
  font-family: monospace;
  font-size: 13px;
}
.color-picker__preview {
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}
</style>`},swift:{filename:"ColorPicker.swift",code:`import SwiftUI

struct BrandColorPicker: View {
    @Binding var selection: Color
    let palette: [Color]

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Swatch grid
            LazyVGrid(columns: Array(repeating: .init(.fixed(36)), count: 6), spacing: 8) {
                ForEach(palette, id: \\.self) { color in
                    Circle()
                        .fill(color)
                        .frame(width: 36, height: 36)
                        .overlay {
                            if color == selection {
                                Image(systemName: "checkmark")
                                    .font(.system(size: 14, weight: .bold))
                                    .foregroundStyle(color.accessibleForeground)
                            }
                        }
                        .overlay {
                            // sfPillSpecular equivalent
                            Circle()
                                .fill(
                                    LinearGradient(
                                        colors: [.white.opacity(0.25), .clear],
                                        startPoint: .top,
                                        endPoint: .center
                                    )
                                )
                        }
                        .clipShape(Circle())
                        .scaleEffect(color == selection ? 1.15 : 1)
                        .animation(.spring(response: 0.25), value: selection)
                        .onTapGesture { selection = color }
                }
            }

            // Preview
            RoundedRectangle(cornerRadius: 8)
                .fill(selection)
                .frame(height: 40)
                .overlay {
                    Text(selection.hexString)
                        .font(.system(size: 12, weight: .semibold, design: .monospaced))
                        .foregroundStyle(selection.accessibleForeground)
                }

            // Custom hex input (macOS / iPad)
            TextField("#RRGGBB", text: $hexInput)
                .font(.system(size: 13, design: .monospaced))
                .textFieldStyle(.roundedBorder)
                .onChange(of: hexInput) { _, new in
                    if let color = Color(hex: new) {
                        selection = color
                    }
                }
        }
    }
}`},macos:{filename:"ColorPicker.swift",code:`// macOS — same SwiftUI component with ColorPicker as fallback for system panel
import SwiftUI

struct BrandColorPicker: View {
    @Binding var selection: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Predefined palette grid (same as iOS)
            // …

            // macOS also exposes the system colour panel as a secondary option
            ColorPicker("Custom colour", selection: $selection, supportsOpacity: false)
                .labelsHidden()
        }
    }
}`}};function b(){let[e,t]=(0,l.useState)(n[0].value),[a,s]=(0,l.useState)(n[0].value),o=c(e);return(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:32},children:(0,r.jsxs)("div",{style:{width:280,padding:20,borderRadius:14,background:"rgb(var(--surface))",border:"1px solid rgb(var(--border))",boxShadow:"var(--shadow-card)",display:"flex",flexDirection:"column",gap:14},children:[(0,r.jsx)("p",{style:{fontSize:12,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",color:"rgb(var(--text-tertiary))",margin:0},children:"Brand Colour"}),(0,r.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:8},children:n.map(a=>{let o=c(a.value),l=e===a.value;return(0,r.jsx)("button",{title:a.label,onClick:()=>{var e;t(e=a.value),s(e)},style:{width:36,height:36,borderRadius:8,background:a.value,border:l?`2px solid ${o}`:"2px solid transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:l?"inset 0 1px 0 rgba(255,255,255,0.3), 0 0 0 2px rgba(0,0,0,0.1)":"inset 0 1px 0 rgba(255,255,255,0.18)",transition:"transform 0.15s, box-shadow 0.15s",transform:l?"scale(1.12)":"scale(1)"},children:l&&(0,r.jsx)(i.Check,{size:14,color:o,strokeWidth:3})},a.value)})}),(0,r.jsx)("input",{type:"text",value:a,onChange:function(e){let r=e.target.value;s(r),/^#[0-9A-Fa-f]{6}$/.test(r)&&t(r)},placeholder:"#FF6B35",style:{padding:"8px 12px",borderRadius:8,border:"1px solid rgb(var(--border))",background:"rgb(var(--surface-raised))",color:"rgb(var(--text-primary))",fontSize:13,fontFamily:"monospace",outline:"none"}}),(0,r.jsx)("div",{style:{height:44,borderRadius:10,background:e,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,fontFamily:"monospace",color:o,boxShadow:"inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 6px rgba(0,0,0,0.15)",letterSpacing:"0.04em",transition:"background 0.2s"},children:e}),(0,r.jsxs)("div",{style:{padding:"10px 14px",borderRadius:8,border:"1px solid rgb(var(--border))",background:"rgb(var(--surface-raised))",display:"flex",alignItems:"center",gap:10},children:[(0,r.jsx)("div",{style:{width:10,height:10,borderRadius:"50%",background:e,flexShrink:0}}),(0,r.jsx)("span",{style:{fontSize:13,flex:1},children:"Button preview"}),(0,r.jsx)("button",{style:{padding:"5px 12px",borderRadius:6,background:e,color:o,fontSize:12,fontWeight:600,border:"none",cursor:"pointer"},children:"Action"})]})]})})}e.s(["default",0,function(){return(0,r.jsxs)("div",{children:[(0,r.jsx)(t.PageHeader,{title:"Color Picker",description:"Allows users to select a brand or theme colour from a curated palette or a custom hex value. Includes the accessibleForeground algorithm to ensure legible text on any chosen colour.",badge:"New"}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Demo"}),(0,r.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5",children:"Select a swatch or type a hex value. The preview button updates in real time, demonstrating how the chosen colour renders with automatically-computed foreground text."}),(0,r.jsx)(a.ComponentPreview,{children:(0,r.jsx)(b,{})})]}),(0,r.jsxs)("section",{className:"mb-10",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Accessible foreground algorithm"}),(0,r.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-4",children:"The picker always computes a legible foreground (black or white) for the selected colour using the WCAG relative luminance formula. This ensures button labels and preview text are always readable regardless of brand colour choice."}),(0,r.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-4",children:(0,r.jsx)("pre",{className:"p-4 text-[13px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto bg-[rgb(var(--surface))]",children:(0,r.jsx)("code",{children:`// WCAG 2.1 relative luminance → choose black or white
function accessibleForeground(bgHex: string): "#000000" | "#ffffff" {
  const { r, g, b } = hexToRgb(bgHex);
  const linearize = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const lum = 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
  return lum > 0.179 ? "#000000" : "#ffffff";
}`})})}),(0,r.jsxs)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5",children:["This is the web equivalent of Warren's ",(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"accessibleForeground(on:)"})," Swift function. Use it whenever rendering text or icons on a user-chosen colour."]})]}),(0,r.jsxs)("section",{className:"mb-10",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Dynamic brand token"}),(0,r.jsxs)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-4",children:["When the user selects a colour, write it to the ",(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"--brand-user"})," CSS variable on the document root. Other tokens resolve through it automatically:"]}),(0,r.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5",children:(0,r.jsx)("pre",{className:"p-4 text-[13px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto bg-[rgb(var(--surface))]",children:(0,r.jsx)("code",{children:`// Apply user-chosen brand colour globally
document.documentElement.style.setProperty(
  "--brand-user",
  \`\${r} \${g} \${b}\`   // space-separated RGB triplet for composability
);

// In CSS — accent uses brand-user when set
:root {
  --accent: var(--brand-user, 255 107 53);  /* fallback to Sitka Coral */
}`})})})]}),(0,r.jsxs)("section",{className:"mb-10",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Implementation"}),(0,r.jsx)(o.PlatformTabs,{code:x})]}),(0,r.jsx)(s.PropsTable,{props:d})]})}])}]);