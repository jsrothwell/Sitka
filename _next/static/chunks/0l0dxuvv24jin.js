(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72157,e=>{"use strict";let r=(0,e.i(73400).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,r],72157)},60734,e=>{"use strict";let r=(0,e.i(73400).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,r],60734)},51334,e=>{"use strict";var r=e.i(29241),t=e.i(60515),a=e.i(72157),s=e.i(60734),i=e.i(38421),n=e.i(45065),o=e.i(36534);e.s(["CodeBlock",0,function({code:e,language:c="tsx",filename:l,className:d}){let[b,x]=(0,t.useState)(!1),m=async()=>{await navigator.clipboard.writeText(e.trim()),x(!0),setTimeout(()=>x(!1),2e3)};return(0,r.jsxs)("div",{className:(0,o.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",d),children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsxs)("div",{className:"flex gap-1.5",children:[(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),l&&(0,r.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:l})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:c}),(0,r.jsx)("button",{onClick:m,className:(0,o.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",b?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,r.jsx)(n.AnimatePresence,{mode:"wait",initial:!1,children:b?(0,r.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,r.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,r.jsx)("code",{children:e.trim()})})})]})}])},60701,e=>{"use strict";var r=e.i(29241),t=e.i(60515),a=e.i(2411);let s=(0,e.i(73400).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var i=e.i(36534);e.s(["ComponentPreview",0,function({children:e,label:n,className:o,dark:c,grid:l}){let[d,b]=(0,t.useState)("desktop");return(0,r.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",o),children:[(0,r.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[n?(0,r.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:n}):(0,r.jsx)("span",{}),(0,r.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:a.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:s,ariaLabel:"Mobile preview"}].map(({value:e,Icon:t,ariaLabel:a})=>(0,r.jsx)("button",{onClick:()=>b(e),"aria-label":a,className:(0,i.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",d===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,r.jsx)(t,{className:"w-3.5 h-3.5"})},e))})]}),(0,r.jsx)("div",{className:(0,i.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===d?"p-6":"p-10",c?"bg-neutral-950":"bg-[rgb(var(--background))]",l&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,r.jsx)("div",{className:(0,i.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===d&&"max-w-[390px]"),children:e})})]})}],60701)},78241,e=>{"use strict";var r=e.i(29241),t=e.i(60515),a=e.i(38421),s=e.i(51334),i=e.i(36534);let n={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},o={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:c}){let[l,d]=(0,t.useState)("react"),b=["react","html","swift",...e.macos?["macos"]:[]],x=e[l]??e.swift;return(0,r.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",c),children:[(0,r.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:b.map(e=>(0,r.jsxs)("button",{onClick:()=>d(e),className:(0,i.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",l===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[l===e&&(0,r.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),n[e]]},e))}),(0,r.jsx)(s.CodeBlock,{code:x.code,language:o[l],filename:x.filename,className:"rounded-none border-0"})]})}])},8198,e=>{"use strict";var r=e.i(29241),t=e.i(36534);e.s(["PageHeader",0,function({title:e,description:a,badge:s,className:i}){return(0,r.jsxs)("div",{className:(0,t.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",i),children:[s&&(0,r.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,r.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,r.jsx)("h1",{className:"mb-2.5",children:e}),(0,r.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},28595,e=>{"use strict";var r=e.i(29241),t=e.i(36534);e.s(["PropsTable",0,function({props:e,className:a}){return(0,r.jsx)("div",{className:(0,t.cn)("overflow-hidden rounded-xl border border-[rgb(var(--border))]",a),children:(0,r.jsxs)("table",{className:"w-full text-[13px]",children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{className:"border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:["Prop","Type","Default","Description"].map(e=>(0,r.jsx)("th",{className:"px-4 py-3 text-left font-semibold text-[rgb(var(--text-tertiary))] text-[11px] uppercase tracking-wider",children:e},e))})}),(0,r.jsx)("tbody",{children:e.map((e,a)=>(0,r.jsxs)("tr",{className:(0,t.cn)("border-b border-[rgb(var(--border-subtle))] last:border-0",a%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"),children:[(0,r.jsx)("td",{className:"px-4 py-3",children:(0,r.jsxs)("code",{className:"text-[rgb(var(--accent))] font-mono text-[12px]",children:[e.name,e.required&&(0,r.jsx)("span",{className:"text-red-400 ml-0.5",children:"*"})]})}),(0,r.jsx)("td",{className:"px-4 py-3",children:(0,r.jsx)("code",{className:"text-[rgb(var(--text-secondary))] font-mono text-[11px] bg-[rgb(var(--surface-raised))] px-1.5 py-0.5 rounded",children:e.type})}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.default?(0,r.jsx)("code",{className:"font-mono text-[11px]",children:e.default}):(0,r.jsx)("span",{className:"opacity-40",children:"—"})}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))] leading-relaxed",children:e.description})]},e.name))})]})})}])},436,e=>{"use strict";let r=(0,e.i(73400).default)("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);e.s(["AlertCircle",0,r],436)},25235,e=>{"use strict";let r=(0,e.i(73400).default)("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);e.s(["AlertTriangle",0,r],25235)},37647,e=>{"use strict";var r=e.i(29241),t=e.i(60515);let a=(0,e.i(73400).default)("circle-check-big",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);var s=e.i(436),i=e.i(25235),n=e.i(36534),o=e.i(8198),c=e.i(28595),l=e.i(60701),d=e.i(78241);let b=[{name:"open",type:"boolean",required:!0,description:"Controls snackbar visibility."},{name:"onClose",type:"() => void",required:!0,description:"Called when snackbar closes."},{name:"message",type:"string",required:!0,description:"Main message text to display."},{name:"description",type:"string",description:"Optional secondary text below the message."},{name:"variant",type:'"default" | "success" | "error" | "warning"',default:'"default"',description:"Visual style variant."},{name:"duration",type:"number",default:"4000",description:"Auto-dismiss delay in milliseconds. 0 = never."},{name:"action",type:"{ label: string; onClick: () => void }",description:"Optional action button on the right."},{name:"position",type:'"bottom-left" | "bottom-center" | "bottom-right"',default:'"bottom-right"',description:"Screen position."}],x=[{name:"dismissible",type:"boolean",default:"false",description:"Show a dismiss (×) button."},{name:"icon",type:"ReactNode",description:"Optional icon before message."}],m={react:{filename:"Snackbar.tsx",code:`"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, AlertCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/cn";

type SnackbarVariant = "default" | "success" | "error" | "warning";
type SnackbarPosition = "bottom-left" | "bottom-center" | "bottom-right";

export interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  description?: string;
  variant?: SnackbarVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  position?: SnackbarPosition;
  dismissible?: boolean;
  icon?: React.ReactNode;
}

const ICONS: Record<SnackbarVariant, React.ReactNode> = {
  default: null,
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
};

const COLORS: Record<SnackbarVariant, string> = {
  default: "rgb(var(--text-primary))",
  success: "var(--nav-active-color)",
  error: "#ef4444",
  warning: "#f59e0b",
};

const POSITIONS: Record<SnackbarPosition, string> = {
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

export function Snackbar({
  open,
  onClose,
  message,
  description,
  variant = "default",
  duration = 4000,
  action,
  position = "bottom-right",
  dismissible = false,
  icon,
}: SnackbarProps) {
  useEffect(() => {
    if (!open || duration === 0) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const customIcon = icon ?? ICONS[variant];

  return createPortal(
    <div
      className={cn(
        "fixed z-[70] px-4",
        POSITIONS[position]
      )}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={cn(
          "flex items-start gap-3 px-4 py-3 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.15)]",
          "border backdrop-blur-sm",
          "bg-[rgb(var(--surface-raised))] border-[rgb(var(--border))]"
        )}
        style={{
          borderLeftColor: customIcon ? COLORS[variant] : undefined,
          borderLeftWidth: customIcon ? "4px" : undefined,
        }}
      >
        {customIcon && (
          <div className="flex-shrink-0 mt-0.5" style={{ color: COLORS[variant] }}>
            {customIcon}
          </div>
        )}
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-[13px] font-medium text-[rgb(var(--text-primary))] leading-snug">
            {message}
          </p>
          {description && (
            <p className="text-[12px] text-[rgb(var(--text-secondary))] mt-0.5 leading-snug">
              {description}
            </p>
          )}
        </div>
        {action && (
          <button
            onClick={() => {
              action.onClick();
              onClose();
            }}
            className="text-[12px] font-medium text-[rgb(var(--accent))] hover:underline whitespace-nowrap ml-2"
          >
            {action.label}
          </button>
        )}
        {dismissible && (
          <button
            onClick={onClose}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}
`},html:{filename:"snackbar.html",code:`<div class="snackbar-container">
  <div class="snackbar" role="status" aria-live="polite">
    <div class="snackbar-icon">
      <svg><!-- icon --></svg>
    </div>
    <div class="snackbar-content">
      <p class="snackbar-message">Changes saved successfully</p>
      <p class="snackbar-description">Your profile has been updated</p>
    </div>
    <button class="snackbar-action">Undo</button>
    <button class="snackbar-dismiss" aria-label="Dismiss">\xd7</button>
  </div>
</div>

<style>
.snackbar-container {
  position: fixed; z-index: 70;
  bottom: 16px; right: 16px;
}
.snackbar {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 12px 16px; border-radius: 8px;
  background: rgba(24, 24, 27, 0.95); color: white;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  border-left: 4px solid #22c55e;
}
.snackbar-icon { width: 20px; height: 20px; margin-top: 2px; }
.snackbar-content { flex: 1; min-width: 0; }
.snackbar-message {
  font-size: 13px; font-weight: 500;
  line-height: 1.4; margin: 0;
}
.snackbar-description {
  font-size: 12px; color: rgba(255,255,255,0.7);
  margin: 2px 0 0; line-height: 1.4;
}
.snackbar-action {
  font-size: 12px; font-weight: 500;
  color: #3b82f6; background: none;
  border: none; padding: 0; cursor: pointer;
  margin-left: 8px; white-space: nowrap;
}
.snackbar-dismiss {
  width: 20px; height: 20px;
  display: flex; align-items: center; justify-content: center;
  background: none; border: none; color: rgba(255,255,255,0.5);
  font-size: 16px; cursor: pointer; padding: 0;
}
.snackbar-dismiss:hover { color: white; }
</style>`},swift:{filename:"SnackbarView.swift",code:`import SwiftUI

struct Snackbar: View {
    let message: String
    let description: String?
    let variant: Variant
    let action: Action?
    
    enum Variant {
        case 'default', success, error, warning
        
        var color: Color {
            switch self {
            case .default: return .primary
            case .success: return .green
            case .error: return .red
            case .warning: return .orange
            }
        }
        
        var icon: String {
            switch self {
            case .default: return ""
            case .success: return "checkmark.circle.fill"
            case .error: return "xmark.octagon.fill"
            case .warning: return "exclamationmark.triangle.fill"
            }
        }
    }
    
    struct Action {
        let label: String
        let handler: () -> Void
    }
    
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            if variant != .default {
                Image(systemName: variant.icon)
                    .font(.system(size: 20))
                    .foregroundStyle(variant.color)
                    .frame(width: 20, height: 20)
            }
            
            VStack(alignment: .leading, spacing: 2) {
                Text(message)
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundStyle(.primary)
                
                if let description = description {
                    Text(description)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            
            if let action = action {
                Button(action.label) {
                    action.handler()
                }
                .font(.caption)
                .fontWeight(.semibold)
                .foregroundStyle(.accent)
                .padding(.leading, 4)
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(.systemBackground).opacity(0.95))
                .shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(variant.color.opacity(0.5), lineWidth: 3)
                .offset(x: -8)
        )
    }
}

// Snackbar manager for hosting in SwiftUI
class SnackbarManager: ObservableObject {
    @Published var snackbar: SnackbarItem?
    
    struct SnackbarItem {
        let message: String
        let description: String?
        let variant: Snackbar.Variant
        let action: Snackbar.Action?
        let duration: TimeInterval
    }
    
    func show(
        message: String,
        description: String? = nil,
        variant: Snackbar.Variant = .default,
        action: Snackbar.Action? = nil,
        duration: TimeInterval = 4
    ) {
        snackbar = SnackbarItem(
            message: message,
            description: description,
            variant: variant,
            action: action,
            duration: duration
        )
        
        DispatchQueue.main.asyncAfter(deadline: .now() + duration) {
            self.snackbar = nil
        }
    }
}

// Usage preview
struct SnackbarPreview: View {
    @StateObject private var manager = SnackbarManager()
    
    var body: some View {
        VStack {
            Button("Show Snackbar") {
                manager.show(
                    message: "Changes saved",
                    description: "Your profile has been updated",
                    variant: .success,
                    action: .init(label: "Undo") {
                        print("Undo tapped")
                    }
                )
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
        .overlay(alignment: .bottom) {
            if let snackbar = manager.snackbar {
                Snackbar(
                    message: snackbar.message,
                    description: snackbar.description,
                    variant: snackbar.variant,
                    action: snackbar.action
                )
                .padding(.horizontal, 16)
                .padding(.bottom, 20)
                .transition(.move(edge: .bottom).combined(with: .opacity))
                .animation(.easeInOut(duration: 0.3), value: snackbar)
            }
        }
    }
}`}},p=[{variant:"default",label:"Default",message:"New message received",description:"You have 1 unread notification",icon:"i"},{variant:"success",label:"Success",message:"Changes saved",description:"Your profile has been updated",icon:"check"},{variant:"error",label:"Error",message:"Upload failed",description:"File exceeds 10 MB limit",icon:"!"},{variant:"warning",label:"Warning",message:"Session expiring",description:"You'll be logged out in 5 minutes",icon:"!"}];function g(){let[e,o]=(0,t.useState)(!0),[c,l]=(0,t.useState)("success"),d={default:{message:"New message received",desc:"You have 1 unread notification"},success:{message:"Changes saved",desc:"Your profile has been updated"},error:{message:"Upload failed",desc:"File exceeds 10 MB limit"},warning:{message:"Session expiring",desc:"You will be logged out in 5 minutes"}};return(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsx)("div",{className:"flex flex-wrap gap-2",children:["default","success","error","warning"].map(e=>(0,r.jsx)("button",{onClick:()=>{l(e),o(!0)},className:(0,n.cn)("px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors",c===e?"bg-[rgb(var(--accent))] text-white border-[rgb(var(--accent))]":"bg-[rgb(var(--surface))] border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))]"),children:e},e))}),(0,r.jsxs)("div",{className:"relative h-20",children:[e&&(0,r.jsxs)("div",{className:"absolute bottom-0 left-0 right-0 flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-2",style:{background:"rgb(var(--surface-raised))",border:"1px solid rgb(var(--border))",borderLeft:`4px solid ${"success"===c?"var(--nav-active-color)":"error"===c?"#ef4444":"warning"===c?"#f59e0b":"rgb(var(--border))"}`},children:["default"!==c&&(0,r.jsxs)("div",{className:"flex-shrink-0 mt-0.5",children:["success"===c&&(0,r.jsx)(a,{className:"w-5 h-5 text-[var(--nav-active-color)]"}),"error"===c&&(0,r.jsx)(s.AlertCircle,{className:"w-5 h-5 text-red-400"}),"warning"===c&&(0,r.jsx)(i.AlertTriangle,{className:"w-5 h-5 text-amber-400"})]}),(0,r.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,r.jsx)("p",{className:"text-[13px] font-medium text-[rgb(var(--text-primary))]",children:d[c].message}),(0,r.jsx)("p",{className:"text-[12px] text-[rgb(var(--text-secondary))]",children:d[c].desc})]}),"success"===c&&(0,r.jsx)("button",{className:"text-[12px] font-medium text-[rgb(var(--accent))] hover:underline ml-2",children:"Undo"}),(0,r.jsx)("button",{onClick:()=>o(!1),className:"flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]","aria-label":"Dismiss",children:(0,r.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:(0,r.jsx)("path",{d:"M2 2L10 10M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]}),!e&&(0,r.jsx)("div",{className:"absolute inset-0 flex items-center justify-center text-[12px] text-[rgb(var(--text-tertiary))]",children:"Select a variant to show snackbar"})]})]})}e.s(["default",0,function(){return(0,r.jsxs)("div",{children:[(0,r.jsx)(o.PageHeader,{title:"Snackbar",description:"Brief, transient messages that appear at the bottom of the screen to provide feedback about an operation. Automatically dismisses after a short duration and supports optional actions."}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Variants"}),(0,r.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"Different visual styles for different types of feedback. Color helps convey meaning, but always include clear text messages."}),(0,r.jsx)("div",{className:"grid grid-cols-2 gap-4",children:p.map(e=>(0,r.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4",children:[(0,r.jsxs)("div",{className:"flex items-start gap-3 mb-3",children:[(0,r.jsx)("div",{className:"w-5 h-5 rounded flex items-center justify-center text-sm font-bold",style:{background:"success"===e.variant?"var(--nav-active-color)":"error"===e.variant?"#ef4444":"warning"===e.variant?"#f59e0b":"rgb(var(--border))",color:"default"===e.variant?"rgb(var(--text-tertiary))":"white"},children:e.icon}),(0,r.jsx)("span",{className:"text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e.label})]}),(0,r.jsx)("p",{className:"text-[13px] font-medium text-[rgb(var(--text-primary))] mb-1",children:e.message}),(0,r.jsx)("p",{className:"text-[12px] text-[rgb(var(--text-secondary))]",children:e.description})]},e.variant))})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Demo"}),(0,r.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"Snackbars appear temporarily to acknowledge an action. They can include an optional action button."}),(0,r.jsx)(l.ComponentPreview,{children:(0,r.jsx)("div",{className:"w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]",children:(0,r.jsx)(g,{})})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6",children:"Anatomy"}),(0,r.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex items-center justify-center",children:(0,r.jsxs)("svg",{viewBox:"0 0 380 100",width:"380",height:"100",className:"max-w-full",children:[(0,r.jsx)("rect",{x:"10",y:"10",width:"360",height:"80",rx:"12",fill:"rgb(var(--surface-raised))",stroke:"rgb(var(--border))",strokeWidth:"1"}),(0,r.jsx)("line",{x1:"10",y1:"10",x2:"10",y2:"90",stroke:"var(--nav-active-color)",strokeWidth:"4",strokeLinecap:"round",rx:"4"}),(0,r.jsx)("circle",{cx:"35",cy:"50",r:"12",fill:"var(--nav-active-color)",opacity:"0.15"}),(0,r.jsx)("text",{x:"35",y:"55",textAnchor:"middle",fontSize:"12",fill:"var(--nav-active-color)",children:"✓"}),(0,r.jsx)("text",{x:"60",y:"38",fontSize:"13",fontWeight:"500",fill:"rgb(var(--text-primary))",children:"Changes saved successfully"}),(0,r.jsx)("text",{x:"60",y:"56",fontSize:"11",fill:"rgb(var(--text-secondary))",children:"Your profile has been updated"}),(0,r.jsx)("rect",{x:"270",y:"42",width:"50",height:"16",rx:"4",fill:"transparent"}),(0,r.jsx)("text",{x:"295",y:"54",fontSize:"11",fontWeight:"500",fill:"var(--accent)",textAnchor:"middle",children:"Undo"}),(0,r.jsx)("text",{x:"345",y:"52",fontSize:"14",fill:"rgb(var(--text-tertiary))",cursor:"pointer",children:"×"}),(0,r.jsx)("text",{x:"60",y:"80",fontSize:"8",fill:"rgb(var(--text-tertiary))",children:"ICON"}),(0,r.jsx)("text",{x:"270",y:"80",fontSize:"8",fill:"rgb(var(--text-tertiary))",children:"ACTION"}),(0,r.jsx)("text",{x:"345",y:"80",fontSize:"8",fill:"rgb(var(--text-tertiary))",children:"DISMISS"})]})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Behavior"}),(0,r.jsx)("div",{className:"overflow-hidden rounded-xl border border-[rgb(var(--border))]",children:(0,r.jsxs)("table",{className:"w-full text-[13px]",children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:["Aspect","Behavior","Notes"].map(e=>(0,r.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e},e))})}),(0,r.jsx)("tbody",{children:[{aspect:"Auto-dismiss",behavior:"After duration (default 4s)",notes:"Set duration=0 to disable"},{aspect:"Hover",behavior:"Pauses timer",notes:"Resumes on mouse leave"},{aspect:"Focus",behavior:"Pauses timer",notes:"Accessibility friendly"},{aspect:"Multiple",behavior:"Stack vertically",notes:"Most recent on top"},{aspect:"Action click",behavior:"Dismisses after",notes:"Then executes callback"},{aspect:"Dismiss",behavior:"Immediate close",notes:"No further animation"}].map((e,t)=>(0,r.jsxs)("tr",{className:`border-b border-[rgb(var(--border-subtle))] last:border-0 ${t%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"}`,children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:e.aspect}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.behavior}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.notes})]},e.aspect))})]})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Usage guidelines"}),(0,r.jsx)("div",{className:"grid grid-cols-2 gap-4",children:[{type:"do",items:["Use for non-critical, transient feedback","Keep messages concise (1-2 lines max)","Provide action for undoable operations","Pause timer on hover/focus for accessibility"]},{type:"dont",items:["Don't use for critical errors (use banner/modal)","Avoid stacking more than 2-3 at once","Don't require reading for critical info","Avoid long messages that wrap"]}].map(({type:e,items:t})=>(0,r.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:[(0,r.jsx)("div",{className:`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${"do"===e?"text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20":"text-red-500 bg-red-50 dark:bg-red-950/20"}`,children:"do"===e?"✓ Do":"✗ Don't"}),(0,r.jsx)("ul",{className:"p-4 space-y-2",children:t.map(t=>(0,r.jsxs)("li",{className:"text-[12px] text-[rgb(var(--text-secondary))] flex gap-2",children:[(0,r.jsx)("span",{className:"do"===e?"text-emerald-500":"text-red-400",children:"·"}),t]},t))})]},e))})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5",children:"Props"}),(0,r.jsx)(c.PropsTable,{props:b})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5",children:"Additional props"}),(0,r.jsx)(c.PropsTable,{props:x})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Implementation"}),(0,r.jsx)(d.PlatformTabs,{code:m})]}),(0,r.jsxs)("section",{children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Accessibility"}),(0,r.jsx)("ul",{className:"space-y-2 text-[14px] text-[rgb(var(--text-secondary))]",children:["Use role='status' with aria-live='polite' for informational messages.","Use role='alert' only for critical errors requiring immediate attention.","Provide aria-label on dismiss button for screen readers.","Don't rely on color alone — include text and icons.","Timer should pause on hover and focus for keyboard users.","Avoid snackbars for critical errors or required confirmations."].map(e=>(0,r.jsxs)("li",{className:"flex gap-2",children:[(0,r.jsx)("span",{className:"text-[rgb(var(--accent))] mt-0.5",children:"→"}),e]},e))})]})]})}],37647)}]);