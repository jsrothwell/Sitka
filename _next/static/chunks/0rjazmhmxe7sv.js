(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72157,e=>{"use strict";let r=(0,e.i(73400).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,r],72157)},60734,e=>{"use strict";let r=(0,e.i(73400).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,r],60734)},51334,e=>{"use strict";var r=e.i(29241),a=e.i(60515),t=e.i(72157),s=e.i(60734),l=e.i(38421),i=e.i(45065),n=e.i(36534);e.s(["CodeBlock",0,function({code:e,language:d="tsx",filename:o,className:c}){let[x,u]=(0,a.useState)(!1),b=async()=>{await navigator.clipboard.writeText(e.trim()),u(!0),setTimeout(()=>u(!1),2e3)};return(0,r.jsxs)("div",{className:(0,n.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",c),children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsxs)("div",{className:"flex gap-1.5",children:[(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),o&&(0,r.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:o})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:d}),(0,r.jsx)("button",{onClick:b,className:(0,n.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",x?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,r.jsx)(i.AnimatePresence,{mode:"wait",initial:!1,children:x?(0,r.jsxs)(l.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(t.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,r.jsxs)(l.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,r.jsx)("code",{children:e.trim()})})})]})}])},60701,e=>{"use strict";var r=e.i(29241),a=e.i(60515),t=e.i(2411);let s=(0,e.i(73400).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var l=e.i(36534);e.s(["ComponentPreview",0,function({children:e,label:i,className:n,dark:d,grid:o}){let[c,x]=(0,a.useState)("desktop");return(0,r.jsxs)("div",{className:(0,l.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",n),children:[(0,r.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[i?(0,r.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:i}):(0,r.jsx)("span",{}),(0,r.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:t.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:s,ariaLabel:"Mobile preview"}].map(({value:e,Icon:a,ariaLabel:t})=>(0,r.jsx)("button",{onClick:()=>x(e),"aria-label":t,className:(0,l.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",c===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,r.jsx)(a,{className:"w-3.5 h-3.5"})},e))})]}),(0,r.jsx)("div",{className:(0,l.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===c?"p-6":"p-10",d?"bg-neutral-950":"bg-[rgb(var(--background))]",o&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,r.jsx)("div",{className:(0,l.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===c&&"max-w-[390px]"),children:e})})]})}],60701)},78241,e=>{"use strict";var r=e.i(29241),a=e.i(60515),t=e.i(38421),s=e.i(51334),l=e.i(36534);let i={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},n={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:d}){let[o,c]=(0,a.useState)("react"),x=["react","html","swift",...e.macos?["macos"]:[]],u=e[o]??e.swift;return(0,r.jsxs)("div",{className:(0,l.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",d),children:[(0,r.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:x.map(e=>(0,r.jsxs)("button",{onClick:()=>c(e),className:(0,l.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",o===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[o===e&&(0,r.jsx)(t.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),i[e]]},e))}),(0,r.jsx)(s.CodeBlock,{code:u.code,language:n[o],filename:u.filename,className:"rounded-none border-0"})]})}])},8198,e=>{"use strict";var r=e.i(29241),a=e.i(36534);e.s(["PageHeader",0,function({title:e,description:t,badge:s,className:l}){return(0,r.jsxs)("div",{className:(0,a.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",l),children:[s&&(0,r.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,r.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,r.jsx)("h1",{className:"mb-2.5",children:e}),(0,r.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:t})]})}])},28595,e=>{"use strict";var r=e.i(29241),a=e.i(36534);e.s(["PropsTable",0,function({props:e,className:t}){return(0,r.jsx)("div",{className:(0,a.cn)("overflow-hidden rounded-xl border border-[rgb(var(--border))]",t),children:(0,r.jsxs)("table",{className:"w-full text-[13px]",children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{className:"border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:["Prop","Type","Default","Description"].map(e=>(0,r.jsx)("th",{className:"px-4 py-3 text-left font-semibold text-[rgb(var(--text-tertiary))] text-[11px] uppercase tracking-wider",children:e},e))})}),(0,r.jsx)("tbody",{children:e.map((e,t)=>(0,r.jsxs)("tr",{className:(0,a.cn)("border-b border-[rgb(var(--border-subtle))] last:border-0",t%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"),children:[(0,r.jsx)("td",{className:"px-4 py-3",children:(0,r.jsxs)("code",{className:"text-[rgb(var(--accent))] font-mono text-[12px]",children:[e.name,e.required&&(0,r.jsx)("span",{className:"text-red-400 ml-0.5",children:"*"})]})}),(0,r.jsx)("td",{className:"px-4 py-3",children:(0,r.jsx)("code",{className:"text-[rgb(var(--text-secondary))] font-mono text-[11px] bg-[rgb(var(--surface-raised))] px-1.5 py-0.5 rounded",children:e.type})}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.default?(0,r.jsx)("code",{className:"font-mono text-[11px]",children:e.default}):(0,r.jsx)("span",{className:"opacity-40",children:"—"})}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))] leading-relaxed",children:e.description})]},e.name))})]})})}])},68575,e=>{"use strict";var r=e.i(29241),a=e.i(60515),t=e.i(8198),s=e.i(28595),l=e.i(60701),i=e.i(78241);let n=[{name:"value",type:"number | number[]",required:!0,description:"Current slider value(s). Single number for single thumb, array for range."},{name:"onValueChange",type:"(value: number | number[]) => void",required:!0,description:"Callback fired when value changes."},{name:"min",type:"number",default:"0",description:"Minimum value."},{name:"max",type:"number",default:"100",description:"Maximum value."},{name:"step",type:"number",default:"1",description:"Step increment."},{name:"disabled",type:"boolean",default:"false",description:"Prevents interaction and reduces opacity."},{name:"label",type:"string",description:"Label text displayed above the slider."},{name:"showValue",type:"boolean",default:"false",description:"Display current value next to the label."}],d={react:{filename:"Slider.tsx",code:`"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";

export interface SliderProps {
  value?: number | number[];
  defaultValue?: number | number[];
  onValueChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
}

export function Slider({
  value: controlledValue,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  showValue = false,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState<number | number[]>(
    controlledValue ?? defaultValue ?? 0
  );
  const currentValue = controlledValue ?? internalValue;

  function handleChange(newValue: number | number[]) {
    if (disabled) return;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  }

  function getPercentage(val: number) {
    return ((val - min) / (max - min)) * 100;
  }

  const isRange = Array.isArray(currentValue);
  const values = isRange ? currentValue : [currentValue];
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  return (
    <div className="w-full space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-[12px] font-medium text-[rgb(var(--text-secondary))]">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-[12px] font-medium text-[rgb(var(--text-primary))]">
               {isRange ? minVal + " – " + maxVal : minVal}
            </span>
          )}
        </div>
      )}
      <div className="relative h-2 flex items-center">
        {/* Track */}
        <div className="absolute h-[3px] rounded-full w-full bg-[rgb(var(--border))]" />
        {/* Fill */}
        <div
          className="absolute h-[3px] rounded-full bg-[rgb(var(--accent))]"
          style={{
             left: getPercentage(minVal) + "%",
             width: getPercentage(maxVal) - getPercentage(minVal) + "%",
          }}
        />
        {/* Thumbs */}
        {values.map((val, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-4 h-4 rounded-full border-2 cursor-pointer",
              "bg-white border-[rgb(var(--accent))]",
              "transition-transform hover:scale-110",
              disabled && "opacity-40 cursor-not-allowed"
            )}
            style={{
               left: getPercentage(val) + "%",
              transform: "translateX(-50%)",
              top: "50%",
              marginTop: "-6px",
            }}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={val}
            aria-label={label}
            tabIndex={disabled ? undefined : 0}
            onKeyDown={(e) => {
              if (disabled) return;
              const delta = e.shiftKey ? step * 10 : step;
              let newVal = val;
              if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                newVal = Math.max(val - delta, min);
              } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                newVal = Math.min(val + delta, max);
              }
              if (newVal !== val) {
                e.preventDefault();
                const newValue = isRange
                  ? (values.map((v, idx) => (idx === i ? newVal : v)) as [number, number])
                  : newVal;
                handleChange(newValue);
              }
            }}
          >
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={val}
              onChange={(e) => {
                const newVal = parseFloat(e.target.value);
                if (isRange) {
                  const newValue = [...values] as [number, number];
                  newValue[i] = newVal;
                  handleChange(newValue);
                } else {
                  handleChange(newVal);
                }
              }}
              className="sr-only"
              disabled={disabled}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-[rgb(var(--text-tertiary))]">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
`},html:{filename:"slider.html",code:`<div class="slider-container">
  <div class="slider-header">
    <label class="slider-label">Volume</label>
    <span class="slider-value">75</span>
  </div>
  <div class="slider-track">
    <div class="slider-fill" style="width: 75%;"></div>
    <input 
      type="range" 
      min="0" 
      max="100" 
      value="75" 
      class="slider-input"
    />
    <div class="slider-thumb" style="left: 75%;"></div>
  </div>
  <div class="slider-labels">
    <span>0</span>
    <span>100</span>
  </div>
</div>

<style>
.slider-container { width: 100%; padding: 8px 0; }
.slider-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
.slider-label { font-size: 12px; color: var(--text-secondary); font-weight: 500; }
.slider-value { font-size: 12px; color: var(--text-primary); font-weight: 500; }
.slider-track { position: relative; height: 2px; background: var(--border); border-radius: 1px; }
.slider-fill { position: absolute; height: 100%; background: var(--accent); border-radius: 1px; }
.slider-input { position: absolute; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
.slider-thumb {
  position: absolute; top: 50%; width: 16px; height: 16px;
  background: white; border: 2px solid var(--accent); border-radius: 50%;
  transform: translate(-50%, -50%); cursor: pointer;
  transition: transform 0.15s;
}
.slider-thumb:hover { transform: translate(-50%, -50%) scale(1.15); }
.slider-labels { display: flex; justify-content: space-between; margin-top: 4px; }
.slider-labels span { font-size: 10px; color: var(--text-tertiary); }
</style>

<script>
const slider = document.querySelector('.slider-input');
const thumb = document.querySelector('.slider-thumb');
const fill = document.querySelector('.slider-fill');
const value = document.querySelector('.slider-value');

slider.addEventListener('input', (e) => {
  const val = e.target.value;
  thumb.style.left = val + '%';
  fill.style.width = val + '%';
  value.textContent = val;
});
</script>`},swift:{filename:"CustomSlider.swift",code:`import SwiftUI

struct CustomSlider: View {
    @Binding var value: Double
    let range: ClosedRange<Double>
    let step: Double
    let label: String?
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            if let label = label {
                HStack {
                    Text(label)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Spacer()
                    Text("(Int(value))")
                        .font(.caption)
                        .fontDesign(.monospaced)
                        .foregroundStyle(.primary)
                }
            }
            
            Slider(value: $value, in: range, step: step)
                .tint(.accent)
            
            HStack {
                Text("(Int(range.lowerBound))")
                    .font(.caption2)
                    .foregroundStyle(.tertiary)
                Spacer()
                Text("(Int(range.upperBound))")
                    .font(.caption2)
                    .foregroundStyle(.tertiary)
            }
        }
        .padding(.vertical, 4)
    }
}

struct VolumeSlider: View {
    @State private var volume: Double = 75
    
    var body: some View {
        VStack(spacing: 24) {
            CustomSlider(
                value: $volume,
                range: 0...100,
                step: 1,
                label: "Volume"
            )
            .padding()
        }
    }
}

#Preview {
    VolumeSlider()
}`}},o=[{state:"Default",thumbClass:"bg-white border-[rgb(var(--accent))]",accentFill:!0,wrapperClass:"",note:"Resting state"},{state:"Hover",thumbClass:"bg-white border-[rgb(var(--accent))] scale-110",accentFill:!0,wrapperClass:"",note:"Cursor over thumb"},{state:"Active",thumbClass:"bg-white border-[rgb(var(--accent))] scale-125",accentFill:!0,wrapperClass:"",note:"Dragging thumb"},{state:"Disabled",thumbClass:"bg-white border-[rgb(var(--border))]",accentFill:!1,wrapperClass:"opacity-40",note:"Not interactive"}];function c({label:e,min:t,max:s,value:l,onChange:i,defaultValue:n,showValue:d}){let[o,x]=(0,a.useState)(l??n??t),u=(0,a.useRef)(null),b=(0,a.useRef)(!1),m=e=>{x(e),i?.(e)},p=(o-t)/(s-t)*100;return(0,r.jsxs)("div",{className:"space-y-2",children:[(e||d)&&(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[e&&(0,r.jsx)("label",{className:"text-[12px] font-medium text-[rgb(var(--text-secondary))]",children:e}),d&&(0,r.jsx)("span",{className:"text-[12px] font-medium text-[rgb(var(--text-primary))]",children:o})]}),(0,r.jsxs)("div",{className:"relative h-2 flex items-center",ref:u,children:[(0,r.jsx)("div",{className:"absolute h-[3px] rounded-full w-full bg-[rgb(var(--border))]"}),(0,r.jsx)("div",{className:"absolute h-[3px] rounded-full bg-[rgb(var(--accent))]",style:{left:"0%",width:`${p}%`}}),(0,r.jsx)("div",{className:"absolute w-4 h-4 rounded-full border-2 bg-white border-[rgb(var(--accent))] cursor-pointer touch-none",style:{left:`${p}%`,transform:"translateX(-50%)",top:"50%",marginTop:"-6px"},role:"slider",tabIndex:0,"aria-valuemin":t,"aria-valuemax":s,"aria-valuenow":o,"aria-label":e,onPointerDown:e=>{b.current=!0,e.currentTarget.setPointerCapture(e.pointerId)},onPointerMove:e=>{b.current&&m(function(e){let r=u.current;if(!r)return t;let a=r.getBoundingClientRect();return Math.round(Math.max(0,Math.min(1,(e-a.left)/a.width))*(s-t)+t)}(e.clientX))},onPointerUp:()=>{b.current=!1},onKeyDown:e=>{let r=e.shiftKey?10:1;"ArrowLeft"===e.key&&(e.preventDefault(),m(Math.max(t,o-r))),"ArrowRight"===e.key&&(e.preventDefault(),m(Math.min(s,o+r)))}})]}),(0,r.jsxs)("div",{className:"flex justify-between text-[10px] text-[rgb(var(--text-tertiary))]",children:[(0,r.jsx)("span",{children:t}),(0,r.jsx)("span",{children:s})]})]})}function x({label:e,min:t,max:s,value:l,onChange:i,showValue:n}){let[d,o]=(0,a.useState)(l??[t,s]),c=(0,a.useRef)(null),u=(0,a.useRef)(null),b=e=>{o(e),i?.(e)},m=e=>(e-t)/(s-t)*100;return(0,r.jsxs)("div",{className:"space-y-2",children:[(e||n)&&(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[e&&(0,r.jsx)("label",{className:"text-[12px] font-medium text-[rgb(var(--text-secondary))]",children:e}),n&&(0,r.jsxs)("span",{className:"text-[12px] font-medium text-[rgb(var(--text-primary))]",children:[d[0]," – ",d[1]]})]}),(0,r.jsxs)("div",{className:"relative h-2 flex items-center",ref:c,children:[(0,r.jsx)("div",{className:"absolute h-[3px] rounded-full w-full bg-[rgb(var(--border))]"}),(0,r.jsx)("div",{className:"absolute h-[3px] rounded-full bg-[rgb(var(--accent))]",style:{left:`${m(d[0])}%`,width:`${m(d[1])-m(d[0])}%`}}),[0,1].map(a=>(0,r.jsx)("div",{className:"absolute w-4 h-4 rounded-full border-2 bg-white border-[rgb(var(--accent))] cursor-pointer touch-none",style:{left:`${m(d[a])}%`,transform:"translateX(-50%)",top:"50%",marginTop:"-6px"},role:"slider",tabIndex:0,"aria-valuemin":t,"aria-valuemax":s,"aria-valuenow":d[a],"aria-label":`${e} ${0===a?"minimum":"maximum"}`,onPointerDown:e=>{u.current=a,e.currentTarget.setPointerCapture(e.pointerId)},onPointerMove:e=>{if(u.current!==a)return;let r=function(e){let r=c.current;if(!r)return t;let a=r.getBoundingClientRect();return Math.round(Math.max(0,Math.min(1,(e-a.left)/a.width))*(s-t)+t)}(e.clientX),l=[...d];l[a]=r,0===a&&l[0]>=l[1]&&(l[0]=l[1]-1),1===a&&l[1]<=l[0]&&(l[1]=l[0]+1),b(l)},onPointerUp:()=>{u.current=null},onKeyDown:e=>{let r=e.shiftKey?10:1,l=[...d];"ArrowLeft"===e.key&&(l[a]=Math.max(0===a?t:d[0]+1,d[a]-r)),"ArrowRight"===e.key&&(l[a]=Math.min(1===a?s:d[1]-1,d[a]+r)),(l[0]!==d[0]||l[1]!==d[1])&&(e.preventDefault(),b(l))}},a))]}),(0,r.jsxs)("div",{className:"flex justify-between text-[10px] text-[rgb(var(--text-tertiary))]",children:[(0,r.jsx)("span",{children:t}),(0,r.jsx)("span",{children:s})]})]})}e.s(["default",0,function(){let[e,u]=(0,a.useState)(50),[b,m]=(0,a.useState)([25,75]);return(0,r.jsxs)("div",{children:[(0,r.jsx)(t.PageHeader,{title:"Slider",description:"Select a value from a continuous range. Supports single thumb for simple selection or dual thumbs for range selection with keyboard accessibility."}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Single value"}),(0,r.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"Choose one value from a range. Common uses include volume control, brightness adjustment, or rating input."}),(0,r.jsx)(l.ComponentPreview,{children:(0,r.jsx)("div",{className:"w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",children:(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsx)("div",{children:(0,r.jsx)(c,{label:"Volume",min:0,max:100,value:e,onChange:u,showValue:!0})}),(0,r.jsx)("div",{children:(0,r.jsx)(c,{label:"Brightness",min:0,max:100,defaultValue:70,showValue:!0})})]})})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Range selection"}),(0,r.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"Select a minimum and maximum value. Useful for price filters, date ranges, or any bounded selection."}),(0,r.jsx)(l.ComponentPreview,{children:(0,r.jsx)("div",{className:"w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",children:(0,r.jsx)(x,{label:"Price range",min:0,max:500,value:b,onChange:m,showValue:!0})})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6",children:"Anatomy"}),(0,r.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-10 flex items-center justify-center",children:(0,r.jsxs)("svg",{viewBox:"0 0 400 120",width:"400",height:"120",className:"max-w-full",children:[(0,r.jsx)("line",{x1:"40",y1:"60",x2:"360",y2:"60",stroke:"rgb(var(--border))",strokeWidth:"4",strokeLinecap:"round"}),(0,r.jsx)("line",{x1:"40",y1:"60",x2:"200",y2:"60",stroke:"rgb(var(--accent))",strokeWidth:"4",strokeLinecap:"round"}),(0,r.jsx)("circle",{cx:"200",cy:"60",r:"12",fill:"white",stroke:"rgb(var(--accent))",strokeWidth:"3"}),(0,r.jsx)("text",{x:"40",y:"85",fontSize:"10",fill:"rgb(var(--text-tertiary))",children:"Min"}),(0,r.jsx)("text",{x:"360",y:"85",fontSize:"10",fill:"rgb(var(--text-tertiary))",textAnchor:"end",children:"Max"}),(0,r.jsx)("text",{x:"200",y:"40",fontSize:"10",fill:"rgb(var(--text-tertiary))",textAnchor:"middle",children:"Value"}),(0,r.jsx)("line",{x1:"200",y1:"74",x2:"200",y2:"95",stroke:"rgb(var(--border))",strokeWidth:"1",strokeDasharray:"3 2"}),(0,r.jsx)("line",{x1:"200",y1:"74",x2:"180",y2:"100",stroke:"rgb(var(--border))",strokeWidth:"1",strokeDasharray:"3 2"})]})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"States"}),(0,r.jsx)("div",{className:"overflow-hidden rounded-xl border border-[rgb(var(--border))]",children:(0,r.jsxs)("table",{className:"w-full text-[13px]",children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:["State","Appearance","Notes"].map(e=>(0,r.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e},e))})}),(0,r.jsx)("tbody",{children:o.map((e,a)=>(0,r.jsxs)("tr",{className:`border-b border-[rgb(var(--border-subtle))] last:border-0 ${a%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"}`,children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:e.state}),(0,r.jsx)("td",{className:"px-4 py-3",children:(0,r.jsxs)("div",{className:`relative flex items-center w-44 h-5 ${e.wrapperClass}`,children:[(0,r.jsx)("div",{className:"absolute h-[3px] rounded-full w-full bg-[rgb(var(--border))]"}),(0,r.jsx)("div",{className:`absolute h-[3px] rounded-full ${e.accentFill?"bg-[rgb(var(--accent))]":"bg-[rgb(var(--border))]"}`,style:{left:"0%",width:"60%"}}),(0,r.jsx)("div",{className:`absolute w-4 h-4 rounded-full border-2 ${e.thumbClass}`,style:{left:"60%",transform:"translateX(-50%)"}})]})}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.note})]},e.state))})]})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Usage guidelines"}),(0,r.jsx)("div",{className:"grid grid-cols-2 gap-4",children:[{type:"do",items:["Use sliders for continuous values, not discrete choices","Provide clear min/max labels to define the range","Default to a meaningful middle value, not extremes","Allow precise input via keyboard arrows and Shift for larger steps"]},{type:"dont",items:["Don't use sliders for binary choices (use a switch instead)","Avoid sliders when precision is critical (use numeric input)","Don't hide the current value — always show it","Don't use more than 2 thumbs for range selection"]}].map(({type:e,items:a})=>(0,r.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:[(0,r.jsx)("div",{className:`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${"do"===e?"text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20":"text-red-500 bg-red-50 dark:bg-red-950/20"}`,children:"do"===e?"✓ Do":"✗ Don't"}),(0,r.jsx)("ul",{className:"p-4 space-y-2",children:a.map(a=>(0,r.jsxs)("li",{className:"text-[12px] text-[rgb(var(--text-secondary))] flex gap-2",children:[(0,r.jsx)("span",{className:"do"===e?"text-emerald-500":"text-red-400",children:"·"}),a]},a))})]},e))})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5",children:"Props"}),(0,r.jsx)(s.PropsTable,{props:n})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Implementation"}),(0,r.jsx)(i.PlatformTabs,{code:d})]}),(0,r.jsxs)("section",{children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Accessibility"}),(0,r.jsx)("ul",{className:"space-y-2 text-[14px] text-[rgb(var(--text-secondary))]",children:["Sliders must have an associated label via aria-label or aria-labelledby.","Keyboard: Arrow keys adjust by step; Shift + arrow keys adjust by 10× step.","Range sliders must have aria-valuemin, aria-valuemax, and aria-valuenow on each thumb.","Provide visible focus indicators on thumbs for keyboard users.","Value display must be screen-reader accessible via aria-valuetext if needed."].map(e=>(0,r.jsxs)("li",{className:"flex gap-2",children:[(0,r.jsx)("span",{className:"text-[rgb(var(--accent))] mt-0.5",children:"→"}),e]},e))})]})]})}])}]);