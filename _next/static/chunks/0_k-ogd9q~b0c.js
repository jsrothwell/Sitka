(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{"use strict";let t=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,t],89664)},8734,e=>{"use strict";let t=(0,e.i(56420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,t],8734)},61939,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(89664),s=e.i(8734),i=e.i(46932),n=e.i(88653),l=e.i(45060);e.s(["CodeBlock",0,function({code:e,language:o="tsx",filename:d,className:c}){let[p,m]=(0,r.useState)(!1),x=async()=>{await navigator.clipboard.writeText(e.trim()),m(!0),setTimeout(()=>m(!1),2e3)};return(0,t.jsxs)("div",{className:(0,l.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",c),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex gap-1.5",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),d&&(0,t.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:d})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:o}),(0,t.jsx)("button",{onClick:x,className:(0,l.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",p?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,t.jsx)(n.AnimatePresence,{mode:"wait",initial:!1,children:p?(0,t.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,t.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,t.jsx)("code",{children:e.trim()})})})]})}])},64147,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(61939),i=e.i(45060);let n={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},l={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:o}){let[d,c]=(0,r.useState)("react"),p=["react","html","swift",...e.macos?["macos"]:[]],m=e[d]??e.swift;return(0,t.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",o),children:[(0,t.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:p.map(e=>(0,t.jsxs)("button",{onClick:()=>c(e),className:(0,i.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",d===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[d===e&&(0,t.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),n[e]]},e))}),(0,t.jsx)(s.CodeBlock,{code:m.code,language:l[d],filename:m.filename,className:"rounded-none border-0"})]})}])},46017,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46513);let s=(0,e.i(56420).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var i=e.i(45060);e.s(["ComponentPreview",0,function({children:e,label:n,className:l,dark:o,grid:d}){let[c,p]=(0,r.useState)("desktop");return(0,t.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",l),children:[(0,t.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[n?(0,t.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:n}):(0,t.jsx)("span",{}),(0,t.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:a.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:s,ariaLabel:"Mobile preview"}].map(({value:e,Icon:r,ariaLabel:a})=>(0,t.jsx)("button",{onClick:()=>p(e),"aria-label":a,className:(0,i.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",c===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,t.jsx)(r,{className:"w-3.5 h-3.5"})},e))})]}),(0,t.jsx)("div",{className:(0,i.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===c?"p-6":"p-10",o?"bg-neutral-950":"bg-[rgb(var(--background))]",d&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,t.jsx)("div",{className:(0,i.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===c&&"max-w-[390px]"),children:e})})]})}],46017)},52953,e=>{"use strict";var t=e.i(43476),r=e.i(45060);e.s(["PageHeader",0,function({title:e,description:a,badge:s,className:i}){return(0,t.jsxs)("div",{className:(0,r.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",i),children:[s&&(0,t.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,t.jsx)("h1",{className:"mb-2.5",children:e}),(0,t.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(45060);let i=(0,e.i(56420).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),n={primary:"bg-[rgb(var(--accent))] text-white hover:opacity-90 shadow-[0_0_0_1px_rgba(0,192,232,0.3),0_2px_8px_rgba(0,192,232,0.25)] active:shadow-none",secondary:"bg-[rgb(var(--surface))] text-[rgb(var(--text-primary))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] active:bg-[rgb(var(--accent-subtle))]",ghost:"text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface))] hover:text-[rgb(var(--text-primary))] active:bg-[rgb(var(--border))]",danger:"bg-red-500 text-white hover:bg-red-600 shadow-[0_2px_8px_rgba(239,68,68,0.3)] active:shadow-none",glass:"glass text-[rgb(var(--text-primary))] hover:bg-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.05)]"},l={sm:"h-8 px-3 text-[12px] gap-1.5 rounded-lg",md:"h-10 px-4 text-[13px] gap-2 rounded-lg",lg:"h-12 px-5 text-[15px] gap-2.5 rounded-xl",icon:"h-10 w-10 rounded-lg"},o=(0,r.forwardRef)(({variant:e="primary",size:r="md",loading:o=!1,leftIcon:d,rightIcon:c,children:p,className:m,disabled:x,...b},u)=>(0,t.jsxs)(a.motion.button,{ref:u,whileTap:{scale:.97},transition:{type:"spring",stiffness:500,damping:40},className:(0,s.cn)("inline-flex items-center justify-center font-medium transition-all select-none","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--background))]","disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",n[e],l[r],m),disabled:x||o,...b,children:[o?(0,t.jsx)(i,{className:"w-4 h-4 animate-spin"}):d&&(0,t.jsx)("span",{className:"flex-shrink-0",children:d}),p&&(0,t.jsx)("span",{children:p}),!o&&c&&(0,t.jsx)("span",{className:"flex-shrink-0",children:c})]}));o.displayName="Button",e.s(["Button",0,o],59544)},3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(45060);let s={sm:{base:"h-8 text-[12px]",pl:"pl-2.5",pr:"pr-2.5",iconLeftPad:"pl-[28px]",iconRightPad:"pr-[28px]",iconSz:"w-3.5 h-3.5",iconLeftPos:"left-2.5",iconRightPos:"right-2.5",label:"text-[11px]"},md:{base:"h-10 text-[13px]",pl:"pl-3",pr:"pr-3",iconLeftPad:"pl-9",iconRightPad:"pr-9",iconSz:"w-4 h-4",iconLeftPos:"left-3",iconRightPos:"right-3",label:"text-[12px]"},lg:{base:"h-12 text-[15px]",pl:"pl-4",pr:"pr-4",iconLeftPad:"pl-11",iconRightPad:"pr-11",iconSz:"w-[18px] h-[18px]",iconLeftPos:"left-4",iconRightPos:"right-4",label:"text-[13px]"}},i=(0,r.forwardRef)(({label:e,helperText:r,error:i,inputSize:n="md",leftIcon:l,rightIcon:o,className:d,disabled:c,id:p,...m},x)=>{let b=s[n],u=p??e?.toLowerCase().replace(/\s+/g,"-");return(0,t.jsxs)("div",{className:"flex flex-col gap-1.5 w-full",children:[e&&(0,t.jsx)("label",{htmlFor:u,className:(0,a.cn)("font-medium text-[rgb(var(--text-primary))]",b.label),children:e}),(0,t.jsxs)("div",{className:"relative flex items-center",children:[l&&(0,t.jsx)("span",{className:(0,a.cn)("absolute top-1/2 -translate-y-1/2 pointer-events-none text-[rgb(var(--text-tertiary))]",b.iconSz,b.iconLeftPos),children:l}),(0,t.jsx)("input",{ref:x,id:u,disabled:c,className:(0,a.cn)("w-full rounded-[var(--radius-md)] border bg-[rgb(var(--surface))]","text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-tertiary))]","transition-all duration-150 outline-none",i?["border-red-400/60","focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"]:["border-[rgb(var(--border))]","focus:border-[rgb(var(--accent))] focus:shadow-[0_0_0_3px_rgb(var(--accent)/0.15)]"],c&&"opacity-50 cursor-not-allowed bg-[rgb(var(--surface-raised))]",b.base,l?b.iconLeftPad:b.pl,o?b.iconRightPad:b.pr,d),...m}),o&&(0,t.jsx)("span",{className:(0,a.cn)("absolute top-1/2 -translate-y-1/2 pointer-events-none text-[rgb(var(--text-tertiary))]",b.iconSz,b.iconRightPos),children:o})]}),(i||r)&&(0,t.jsx)("p",{className:(0,a.cn)("text-[11px] leading-snug",i?"text-red-400":"text-[rgb(var(--text-tertiary))]"),children:i??r})]})});i.displayName="Input",e.s(["Input",0,i])},89390,e=>{"use strict";var t=e.i(43476),r=e.i(52953),a=e.i(46017),s=e.i(64147),i=e.i(71645),n=e.i(3812),l=e.i(59544);let o={react:{filename:"DataEntryForm.tsx",code:`"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/date-time-pickers";
import { cn } from "@/lib/cn";

// ── Form with inline validation ─────────────────────────────

interface FormField<T = string> {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "textarea" | "select" | "date" | "number";
  value: T;
  error?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface DataEntryFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  submitLabel?: string;
}

export function DataEntryForm({ fields, onSubmit, submitLabel = "Save" }: DataEntryFormProps) {
  const [formFields, setFormFields] = useState(fields);

  function updateField(name: string, value: any) {
    setFormFields(prev =>
      prev.map(f => {
        if (f.name !== name) return f;
        const error = validate(f, value);
        return { ...f, value, error };
      })
    );
  }

  function validate(field: FormField, value: any): string | undefined {
    if (field.required && !value?.toString().trim()) {
       return field.label + " is required";
    }
    if (field.type === "email" && value && !/^[^@]+@[^@]+.[^@]+$/.test(value)) {
      return "Enter a valid email address";
    }
    return undefined;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let hasError = false;
    const validated = formFields.map(f => {
      const error = validate(f, f.value);
      if (error) hasError = true;
      return { ...f, error };
    });
    setFormFields(validated);

    if (!hasError) {
      const data = validated.reduce((acc, f) => ({ ...acc, [f.name]: f.value }), {});
      onSubmit(data);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formFields.map((field) => (
        <div key={field.name}>
          <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))] mb-2">
            {field.label}
            {field.required && <span className="text-[rgb(var(--accent))] ml-0.5">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              value={field.value as string}
              onChange={(e) => updateField(field.name, e.target.value)}
              onBlur={() => updateField(field.name, field.value)}
              rows={3}
              className={cn(
                "w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
                "px-3 py-2 text-[13px] text-[rgb(var(--text-primary))]",
                "focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20",
                "transition-colors resize-none",
                field.error && "border-[#f87171] focus:ring-[#f87171]/20"
              )}
               placeholder={"Enter " + field.label.toLowerCase() + "..."}
            />
          ) : field.type === "select" ? (
            <select
              value={field.value as string}
              onChange={(e) => updateField(field.name, e.target.value)}
              className={cn(
                "w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
                "px-3 py-2 text-[13px] text-[rgb(var(--text-primary))] cursor-pointer",
                "focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20",
                "appearance-none",
                field.error && "border-[#f87171]"
              )}
            >
              <option value="">Select an option</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : field.type === "date" ? (
            <div>
              <Input
                type="date"
                value={field.value as string}
                onChange={(e) => updateField(field.name, e.target.value)}
                error={field.error}
                required={field.required}
              />
            </div>
          ) : (
            <Input
              type={field.type}
              value={field.value as string}
              onChange={(e) => updateField(field.name, e.target.value)}
              onBlur={() => updateField(field.name, field.value)}
              error={field.error}
              required={field.required}
               placeholder={"Enter " + field.label.toLowerCase() + "..."}
            />
          )}

          {field.error && (
            <p className="flex items-center gap-1.5 mt-2 text-[12px] text-[#f87171]">
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="6" y1="3" x2="6" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {field.error}
            </p>
          )}
        </div>
      ))}

      <Button type="submit" variant="primary" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}

// ── Stepped data entry w/ progress ─────────────────────────

interface Step {
  title: string;
  fields: FormField[];
}

export function SteppedDataEntry({
  steps,
  onComplete,
}: {
  steps: Step[];
  onComplete: (data: Record<string, any>) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState<Record<string, any>[]>(steps.map(() => ({})));

  function updateStepData(field: FormField, value: any) {
    setStepData(prev => {
      const next = [...prev];
      next[currentStep] = { ...next[currentStep], [field.name]: value };
      return next;
    });
  }

  function next() {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    else {
      const allData = stepData.reduce((acc, data, i) => {
        steps[i].fields.forEach(f => { acc[f.name] = data[f.name]; });
        return acc;
      }, {} as Record<string, any>);
      onComplete(allData);
    }
  }

  function back() {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((step, i) => (
          <div key={step.title} className="flex items-center flex-1">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all",
              i < currentStep ? "bg-[rgb(var(--accent))] text-white" :
              i === currentStep ? "bg-[rgb(var(--accent))] text-white ring-4 ring-[rgb(var(--accent))]/20" :
                                "bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-tertiary))] border border-[rgb(var(--border))]"
            )}>
              {i < currentStep ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={cn("flex-1 h-px mx-2", i < currentStep ? "bg-[rgb(var(--accent))]" : "bg-[rgb(var(--border))]")} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6">
        <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-6">{steps[currentStep].title}</h3>
        
        <div className="space-y-5">
          {steps[currentStep].fields.map((field) => (
            <div key={field.name}>
              <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))] mb-2">
                {field.label}
                {field.required && <span className="text-[rgb(var(--accent))] ml-0.5">*</span>}
              </label>
              <Input
                type={field.type === "number" ? "number" : "text"}
                value={stepData[currentStep][field.name] || ""}
                onChange={(e) => updateStepData(field, e.target.value)}
                placeholder={field.label}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[rgb(var(--border-subtle))]">
          <button
            onClick={back}
            disabled={currentStep === 0}
            className={cn(
              "text-[12px] font-medium transition-colors",
              currentStep === 0
                ? "text-[rgb(var(--text-tertiary))] cursor-not-allowed"
                : "text-[rgb(var(--accent))] hover:underline"
            )}
          >
            Back
          </button>
          <button
            onClick={next}
            className="px-4 py-2 rounded-lg bg-[rgb(var(--accent))] text-white text-[12px] font-medium hover:bg-[rgb(var(--accent))]/90 transition-colors"
          >
            {currentStep === steps.length - 1 ? "Complete" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Bulk entry table ───────────────────────────────────────

interface BulkEntryProps<T = Record<string, any>> {
  columns: { key: string; label: string; type: "text" | "number" | "select" }[];
  rows: T[];
  onChange: (rows: T[]) => void;
  addRowLabel?: string;
}

export function BulkEntryTable<T extends Record<string, any>>({
  columns,
  rows,
  onChange,
  addRowLabel = "Add row",
}: BulkEntryProps<T>) {
  const updateCell = (rowIndex: number, colKey: string, value: any) => {
    const newRows = [...rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [colKey]: value };
    onChange(newRows);
  };

  const addRow = () => {
    const newRow = columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {} as T);
    onChange([...rows, newRow]);
  };

  const removeRow = (index: number) => {
    onChange(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
            {columns.map(col => (
              <th key={col.key} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                {col.label}
              </th>
            ))}
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[rgb(var(--border-subtle))] last:border-0 hover:bg-[rgb(var(--surface))]">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-2">
                  {col.type === "select" ? (
                    <select
                      value={row[col.key] as string}
                      onChange={(e) => updateCell(rowIndex, col.key, e.target.value)}
                      className="w-full rounded border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-2 py-1 text-[12px]"
                    >
                      <option value="">Select</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </select>
                  ) : (
                    <input
                      type={col.type}
                      value={row[col.key] as string}
                      onChange={(e) => updateCell(rowIndex, col.key, e.target.value)}
                      className="w-full bg-transparent text-[12px] outline-none focus:text-[rgb(var(--text-primary))]"
                    />
                  )}
                </td>
              ))}
              <td>
                <button
                  onClick={() => removeRow(rowIndex)}
                  className="p-1 rounded text-[rgb(var(--text-tertiary))] hover:text-[#f87171] transition-colors"
                  aria-label="Remove row"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="w-full py-2 text-[12px] text-[rgb(var(--accent))] font-medium hover:bg-[rgb(var(--surface))] transition-colors flex items-center justify-center gap-1"
      >
        <Plus className="w-3 h-3" />
        {addRowLabel}
      </button>
    </div>
  );
}
`},html:{filename:"data-entry.html",code:`<div class="data-entry-form">
  <form>
    <!-- Validation -->
    <div class="form-group">
      <label>Email <span class="required">*</span></label>
      <input type="email" class="form-input" required>
      <div class="error-msg">Please enter a valid email</div>
    </div>

    <!-- Stepped entry -->
    <div class="stepper">
      <div class="step-indicator">
        <span class="step active">1</span>
        <span class="step">2</span>
        <span class="step">3</span>
      </div>
    </div>

    <!-- Bulk entry table -->
    <table class="bulk-entry">
      <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th></th></tr></thead>
      <tbody>
        <tr>
          <td><input type="text" value="Product A"></td>
          <td><input type="number" value="2"></td>
          <td><input type="number" value="29.99"></td>
          <td><button class="remove">✕</button></td>
        </tr>
      </tbody>
    </table>
    <button class="add-row">+ Add row</button>
  </form>
</div>

<style>
.data-entry-form { padding: 24px; }
.required { color: #ef4444; }
.error-msg {
  font-size: 12px; color: #ef4444; margin-top: 4px;
  display: none;
}
.form-input:invalid:focus ~ .error-msg { display: block; }

.stepper { display: flex; gap: 8px; margin: 16px 0; }
.step {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600;
  background: var(--surface); border: 1px solid var(--border);
}
.step.active { background: var(--accent); color: white; border-color: var(--accent); }

.bulk-entry { width: 100%; border-collapse: collapse; }
.bulk-entry td { padding: 8px; border-bottom: 1px solid var(--border); }
.bulk-entry input { width: 100%; border: none; background: transparent; }
.bulk-entry input:focus { outline: none; background: var(--surface-hover); }
.remove {
  width: 24px; height: 24px; border: none; background: none;
  cursor: pointer; color: var(--text-tertiary);
}
.add-row {
  width: 100%; padding: 8px; margin-top: 8px;
  background: none; border: 1px dashed var(--border);
  color: var(--accent); cursor: pointer;
}
</style>`},swift:{filename:"DataEntryView.swift",code:`import SwiftUI

// ── Form with validation ────────────────────────────────────

struct ValidatedForm: View {
    @State private var email = ""
    @State private var name = ""
    @State private var emailError: String?
    
    var body: some View {
        Form {
            Section("Account Info") {
                TextField("Email", text: $email)
                    .keyboardType(.emailAddress)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .onChange(of: email) { _, newValue in
                        emailError = validateEmail(newValue)
                    }
                
                if let error = emailError {
                    Label(error, systemImage: "exclamationmark.circle")
                        .font(.caption)
                        .foregroundColor(.red)
                }
                
                TextField("Full Name", text: $name)
            }
            
            Section {
                Button("Create Account") {
                    // Submit logic
                }
                .disabled(!isValid)
            }
        }
    }
    
    var isValid: Bool {
        !email.isEmpty && emailError == nil && !name.isEmpty
    }
    
    func validateEmail(_ email: String) -> String? {
        let emailRegex = #"^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$"#
        let predicate = NSPredicate(format: "SELF MATCHES[c] %@", emailRegex)
        return predicate.evaluate(with: email) ? nil : "Invalid email format"
    }
}

// ── Stepped entry wizard ───────────────────────────────────

struct SteppedEntryWizard: View {
    @State private var step = 0
    @State private var personalInfo = (name: "", email: "")
    @State private var preferences = (theme: "Light", notifications: true)
    
    var body: some View {
        NavigationStack {
            Form {
                switch step {
                case 0:
                    Section("Personal Information") {
                        TextField("Name", text: $personalInfo.name)
                        TextField("Email", text: $personalInfo.email)
                            .keyboardType(.emailAddress)
                    }
                case 1:
                    Section("Preferences") {
                        Picker("Theme", selection: $preferences.theme) {
                            Text("Light").tag("Light")
                            Text("Dark").tag("Dark")
                        }
                        Toggle("Email Notifications", isOn: $preferences.notifications)
                    }
                default:
                    Section {
                        VStack(spacing: 16) {
                            Image(systemName: "checkmark.circle.fill")
                                .font(.system(size: 48))
                                .foregroundStyle(.green)
                            Text("Account Created!")
                                .font(.title2.bold())
                            Text("Welcome, (personalInfo.name)!")
                                .foregroundStyle(.secondary)
                        }
                        .frame(maxWidth: .infinity)
                    }
                }
                
                if step < 2 {
                    Section {
                        Button("Continue") {
                            withAnimation {
                                step += 1
                            }
                        }
                        .disabled(step == 0 && (personalInfo.name.isEmpty || personalInfo.email.isEmpty))
                    }
                }
            }
            .navigationTitle(step == 2 ? "Complete" : "Step (step + 1)/3")
            .toolbar {
                if step > 0 && step < 2 {
                    ToolbarItem(placement: .cancellationAction) {
                        Button("Back") {
                            step -= 1
                        }
                    }
                }
            }
        }
    }
}

// ── Bulk entry with inline editing ─────────────────────────

struct BulkEntryTable: View {
    @State private var items: [ExpenseItem] = [
        .init(name: "Office Supplies", amount: 149.99, category: "Operations"),
        .init(name: "Team Lunch", amount: 85.50, category: "Team"),
    ]
    
    @State private var showingAddSheet = false
    
    var body: some View {
        List {
            ForEach($items) { $item in
                HStack {
                    TextField("Item name", text: $item.name)
                        .textFieldStyle(.roundedBorder)
                    TextField("Amount", value: $item.amount, format: .number)
                        .textFieldStyle(.roundedBorder)
                        .frame(width: 100)
                        .multilineTextAlignment(.trailing)
                }
            }
            .onDelete(perform: deleteItems)
            
            Button {
                showingAddSheet = true
            } label: {
                Label("Add Item", systemImage: "plus.circle")
                    .foregroundStyle(.accent)
            }
        }
        .sheet(isPresented: $showingAddSheet) {
            NavigationStack {
                AddItemView(items: $items)
                    .navigationTitle("New Item")
                    .toolbar {
                        ToolbarItem(placement: .cancellationAction) {
                            Button("Cancel") { showingAddSheet = false }
                        }
                    }
            }
        }
    }
    
    func deleteItems(at offsets: IndexSet) {
        items.remove(atOffsets: offsets)
    }
}

struct ExpenseItem: Identifiable {
    let id = UUID()
    var name: String
    var amount: Double
    var category: String
}

struct AddItemView: View {
    @Environment(.dismiss) var dismiss
    @Binding var items: [ExpenseItem]
    @State private var name = ""
    @State private var amount = ""
    
    var body: some View {
        Form {
            TextField("Item name", text: $name)
            TextField("Amount", text: $amount)
                .keyboardType(.decimalPad)
            
            Button("Save") {
                if let amount = Double(amount) {
                    items.append(.init(name: name, amount: amount, category: "Misc"))
                }
                dismiss()
            }
            .disabled(name.isEmpty || amount.isEmpty)
        }
    }
}

// Preview provider
struct DataEntryPreviews: PreviewProvider {
    static var previews: some View {
        TabView {
            ValidatedForm()
                .tabItem { Label("Form", systemImage: "doc.text") }
            
            SteppedEntryWizard()
                .tabItem { Label("Wizard", systemImage: "list.bullet") }
            
            BulkEntryTable()
                .tabItem { Label("Bulk", systemImage: "table") }
        }
    }
}`}},d=[{type:"Inline validation",desc:"Validate as you type with clear error messages and helpful suggestions"},{type:"Stepped wizard",desc:"Break complex forms into logical steps with progress indicators"},{type:"Bulk editing",desc:"Edit multiple records in a spreadsheet-like interface for efficiency"},{type:"Smart defaults",desc:"Pre-fill with sensible defaults and remember user preferences"}];e.s(["default",0,function(){let[e,c]=(0,i.useState)(!1),[p,m]=(0,i.useState)(!1);return(0,t.jsxs)("div",{children:[(0,t.jsx)(r.PageHeader,{title:"Data Entry",description:"Patterns for efficient and accurate data input — from inline validation to multi-step wizards and bulk editing. Minimize errors and maximize completion rates."}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Form with inline validation"}),(0,t.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"Validate input as users type and provide immediate, specific error messages. Show success states when input is valid."}),(0,t.jsx)(a.ComponentPreview,{children:(0,t.jsx)("div",{className:"w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",children:(0,t.jsxs)("form",{className:"space-y-4",onSubmit:e=>{e.preventDefault(),c(!0),setTimeout(()=>c(!1),2e3)},children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("label",{className:"block text-[12px] font-medium text-[rgb(var(--text-secondary))]",children:["Email ",(0,t.jsx)("span",{className:"text-[rgb(var(--accent))]",children:"*"})]}),(0,t.jsx)(n.Input,{type:"email",placeholder:"you@example.com",error:"Please enter a valid email address"}),(0,t.jsx)("p",{className:"text-[11px] text-[rgb(var(--text-tertiary))] mt-1",children:"We'll send a confirmation email"})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("label",{className:"block text-[12px] font-medium text-[rgb(var(--text-secondary))]",children:["Full name ",(0,t.jsx)("span",{className:"text-[rgb(var(--accent))]",children:"*"})]}),(0,t.jsx)(n.Input,{placeholder:"Jane Smith"})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("label",{className:"block text-[12px] font-medium text-[rgb(var(--text-secondary))]",children:"Role"}),(0,t.jsxs)("select",{className:"w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-[13px] text-[rgb(var(--text-primary))] focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 outline-none",children:[(0,t.jsx)("option",{value:"",children:"Select a role"}),(0,t.jsx)("option",{value:"designer",children:"Designer"}),(0,t.jsx)("option",{value:"engineer",children:"Engineer"}),(0,t.jsx)("option",{value:"pm",children:"Product Manager"})]})]}),(0,t.jsx)(l.Button,{type:"submit",variant:"primary",className:"w-full",loading:e,children:e?"Creating Account…":"Create Account"})]})})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Multi-step wizard"}),(0,t.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"Break complex data entry into focused steps. Validate each step before allowing progress, and show clear navigation controls."}),(0,t.jsx)(a.ComponentPreview,{children:(0,t.jsxs)("div",{className:"w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",children:[(0,t.jsx)("div",{className:"flex items-center justify-center gap-2 mb-6",children:[1,2,3].map(e=>(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${1===e?"bg-[rgb(var(--accent))] text-white":"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-tertiary))] border border-[rgb(var(--border))]"}`,children:e<3?e:"✓"}),e<3&&(0,t.jsx)("div",{className:`w-12 h-px ${1===e?"bg-[rgb(var(--accent))]":"bg-[rgb(var(--border))]"}`})]},e))}),(0,t.jsxs)("div",{className:"space-y-4 mb-6",children:[(0,t.jsx)("h3",{className:"text-[14px] font-semibold text-[rgb(var(--text-primary))]",children:"Personal information"}),(0,t.jsx)(n.Input,{label:"First name",placeholder:"Jane"}),(0,t.jsx)(n.Input,{label:"Last name",placeholder:"Smith"}),(0,t.jsx)(n.Input,{label:"Email",type:"email",placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between pt-4 border-t border-[rgb(var(--border-subtle))]",children:[(0,t.jsx)("button",{className:"text-[12px] font-medium text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]",children:"Back"}),(0,t.jsx)(l.Button,{variant:"primary",size:"sm",children:"Continue"})]})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Bulk data entry"}),(0,t.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"For entering multiple records at once, provide a spreadsheet-like interface with inline editing and quick-add rows."}),(0,t.jsx)(a.ComponentPreview,{children:(0,t.jsxs)("div",{className:"w-full overflow-x-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",children:[(0,t.jsxs)("table",{className:"w-full text-left",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:[(0,t.jsx)("th",{className:"py-3 px-4",children:"Item"}),(0,t.jsx)("th",{className:"py-3 px-4",children:"Quantity"}),(0,t.jsx)("th",{className:"py-3 px-4",children:"Price"}),(0,t.jsx)("th",{className:"py-3 px-4 w-8"})]})}),(0,t.jsxs)("tbody",{children:[(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))]",children:[(0,t.jsx)("td",{className:"py-2 px-4",children:(0,t.jsx)("input",{type:"text",defaultValue:"Laptop",className:"w-full bg-transparent text-[12px] outline-none focus:text-[rgb(var(--text-primary))]"})}),(0,t.jsx)("td",{className:"py-2 px-4",children:(0,t.jsx)("input",{type:"number",defaultValue:"2",className:"w-16 bg-transparent text-[12px] text-right outline-none focus:text-[rgb(var(--text-primary))]"})}),(0,t.jsx)("td",{className:"py-2 px-4",children:(0,t.jsx)("input",{type:"number",defaultValue:"1299.99",className:"w-20 bg-transparent text-[12px] text-right outline-none focus:text-[rgb(var(--text-primary))]"})}),(0,t.jsx)("td",{className:"py-2 px-4",children:(0,t.jsx)("button",{className:"p-1 text-[rgb(var(--text-tertiary))] hover:text-[#f87171]",children:(0,t.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:(0,t.jsx)("path",{d:"M2 2L10 10M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})})]}),(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))]",children:[(0,t.jsx)("td",{className:"py-2 px-4",children:(0,t.jsx)("input",{type:"text",defaultValue:"Mouse",className:"w-full bg-transparent text-[12px] outline-none focus:text-[rgb(var(--text-primary))]"})}),(0,t.jsx)("td",{className:"py-2 px-4",children:(0,t.jsx)("input",{type:"number",defaultValue:"5",className:"w-16 bg-transparent text-[12px] text-right outline-none focus:text-[rgb(var(--text-primary))]"})}),(0,t.jsx)("td",{className:"py-2 px-4",children:(0,t.jsx)("input",{type:"number",defaultValue:"49.99",className:"w-20 bg-transparent text-[12px] text-right outline-none focus:text-[rgb(var(--text-primary))]"})}),(0,t.jsx)("td",{className:"py-2 px-4",children:(0,t.jsx)("button",{className:"p-1 text-[rgb(var(--text-tertiary))] hover:text-[#f87171]",children:(0,t.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:(0,t.jsx)("path",{d:"M2 2L10 10M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})})]})]})]}),(0,t.jsxs)("button",{className:"w-full py-2 mt-2 text-[12px] text-[rgb(var(--accent))] font-medium hover:bg-[rgb(var(--surface))] flex items-center justify-center gap-1",children:[(0,t.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:(0,t.jsx)("path",{d:"M6 2V10M2 6H10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})}),"Add row"]})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Entry patterns"}),(0,t.jsx)("div",{className:"grid grid-cols-2 gap-4",children:d.map(e=>(0,t.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] p-4 bg-[rgb(var(--surface))]",children:[(0,t.jsx)("h3",{className:"text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1",children:e.type}),(0,t.jsx)("p",{className:"text-[12px] text-[rgb(var(--text-secondary))]",children:e.desc})]},e.type))})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Implementation"}),(0,t.jsx)(s.PlatformTabs,{code:o})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Accessibility"}),(0,t.jsx)("ul",{className:"space-y-2 text-[14px] text-[rgb(var(--text-secondary))]",children:["Always provide associated <label> elements for inputs, use aria-label as fallback.","Error messages must be linked via aria-describedby and have role='alert' for screen readers.","Required fields need aria-required='true' and visually indicate the requirement.","After validation errors, move focus to the first error or provide a summary at the top.","Use appropriate input types (email, number, tel) to trigger correct virtual keyboards.","For multi-step forms, announce step changes with aria-live regions."].map(e=>(0,t.jsxs)("li",{className:"flex gap-2",children:[(0,t.jsx)("span",{className:"text-[rgb(var(--accent))] mt-0.5",children:"→"}),e]},e))})]})]})}])}]);