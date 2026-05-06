(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72157,e=>{"use strict";let r=(0,e.i(73400).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,r],72157)},60734,e=>{"use strict";let r=(0,e.i(73400).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,r],60734)},51334,e=>{"use strict";var r=e.i(29241),t=e.i(60515),a=e.i(72157),s=e.i(60734),i=e.i(38421),o=e.i(45065),l=e.i(36534);e.s(["CodeBlock",0,function({code:e,language:n="tsx",filename:c,className:d}){let[m,x]=(0,t.useState)(!1),p=async()=>{await navigator.clipboard.writeText(e.trim()),x(!0),setTimeout(()=>x(!1),2e3)};return(0,r.jsxs)("div",{className:(0,l.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",d),children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsxs)("div",{className:"flex gap-1.5",children:[(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),c&&(0,r.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:c})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:n}),(0,r.jsx)("button",{onClick:p,className:(0,l.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",m?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,r.jsx)(o.AnimatePresence,{mode:"wait",initial:!1,children:m?(0,r.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,r.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,r.jsx)("code",{children:e.trim()})})})]})}])},60701,e=>{"use strict";var r=e.i(29241),t=e.i(60515),a=e.i(2411);let s=(0,e.i(73400).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var i=e.i(36534);e.s(["ComponentPreview",0,function({children:e,label:o,className:l,dark:n,grid:c}){let[d,m]=(0,t.useState)("desktop");return(0,r.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",l),children:[(0,r.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[o?(0,r.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:o}):(0,r.jsx)("span",{}),(0,r.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:a.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:s,ariaLabel:"Mobile preview"}].map(({value:e,Icon:t,ariaLabel:a})=>(0,r.jsx)("button",{onClick:()=>m(e),"aria-label":a,className:(0,i.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",d===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,r.jsx)(t,{className:"w-3.5 h-3.5"})},e))})]}),(0,r.jsx)("div",{className:(0,i.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===d?"p-6":"p-10",n?"bg-neutral-950":"bg-[rgb(var(--background))]",c&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,r.jsx)("div",{className:(0,i.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===d&&"max-w-[390px]"),children:e})})]})}],60701)},78241,e=>{"use strict";var r=e.i(29241),t=e.i(60515),a=e.i(38421),s=e.i(51334),i=e.i(36534);let o={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},l={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:n}){let[c,d]=(0,t.useState)("react"),m=["react","html","swift",...e.macos?["macos"]:[]],x=e[c]??e.swift;return(0,r.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",n),children:[(0,r.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:m.map(e=>(0,r.jsxs)("button",{onClick:()=>d(e),className:(0,i.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",c===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[c===e&&(0,r.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),o[e]]},e))}),(0,r.jsx)(s.CodeBlock,{code:x.code,language:l[c],filename:x.filename,className:"rounded-none border-0"})]})}])},8198,e=>{"use strict";var r=e.i(29241),t=e.i(36534);e.s(["PageHeader",0,function({title:e,description:a,badge:s,className:i}){return(0,r.jsxs)("div",{className:(0,t.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",i),children:[s&&(0,r.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,r.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,r.jsx)("h1",{className:"mb-2.5",children:e}),(0,r.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},61392,e=>{"use strict";var r=e.i(29241),t=e.i(60515),a=e.i(8198),s=e.i(60701),i=e.i(78241);let o={react:{filename:"CollaborationFeatures.tsx",code:`"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Users, Link as LinkIcon, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";

// ── Share component ────────────────────────────────────────

type SharePlatform = "email" | "link" | "message" | "copy";

interface ShareProps {
  title: string;
  url: string;
  text?: string;
  platforms?: SharePlatform[];
}

export function Share({ title, url, text, platforms = ["link", "email", "message", "copy"] }: ShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = \`\${window.location.origin}\${url}\`;

  async function handleShare(platform: SharePlatform) {
    switch (platform) {
      case "copy":
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      case "email":
        window.location.href = \`mailto:?subject=\${encodeURIComponent(title)}&body=\${encodeURIComponent(text || "")} \${encodeURIComponent(shareUrl)}\`;
        break;
      case "message":
        if (navigator.share) {
          await navigator.share({ title, text, url: shareUrl });
        }
        break;
      case "link":
        // Open copy modal or dropdown
        break;
    }
  }

  return (
    <div className="flex items-center gap-2">
      {platforms.map((platform) => {
        const icons = {
          copy: copied ? Check : Copy,
          link: LinkIcon,
          email: Mail,
          message: MessageCircle,
        };
        const labels = {
          copy: copied ? "Copied!" : "Copy",
          link: "Share link",
          email: "Email",
          message: "Message",
        };
        const Icon = icons[platform];
        return (
          <button
            key={platform}
            onClick={() => handleShare(platform)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors flex items-center gap-1.5",
              "bg-[rgb(var(--surface))] border-[rgb(var(--border))] text-[rgb(var(--text-secondary))]",
              "hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--text-primary))]"
            )}
            disabled={copied && platform === "copy"}
          >
            <Icon className="w-3.5 h-3.5" />
            {labels[platform as keyof typeof labels]}
          </button>
        );
      })}
    </div>
  );
}

// ── Collaborator Avatar stack ─────────────────────────────

interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  color?: string;
}

interface CollaboratorAvatarsProps {
  collaborators: Collaborator[];
  maxDisplay?: number;
  size?: "sm" | "md" | "lg";
}

export function CollaboratorAvatars({ collaborators, maxDisplay = 3, size = "md" }: CollaboratorAvatarsProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-8 h-8 text-[12px]",
    lg: "w-10 h-10 text-[14px]",
  };
  const offsetSize = {
    sm: "-space-x-1",
    md: "-space-x-2",
    lg: "-space-x-3",
  };
  const display = collaborators.slice(0, maxDisplay);
  const remaining = collaborators.length - maxDisplay;

  return (
    <div className={cn("flex", offsetSize[size])}>
      {display.map((c, i) => (
        <div
          key={c.id}
          className={cn(
            "relative rounded-full border-2 border-[rgb(var(--surface))] flex items-center justify-center font-medium text-white",
            sizeClasses[size]
          )}
          style={{
            background: c.color || \`hsl(\${(i * 137) % 360}, 70%, 50%)\`,
            zIndex: display.length - i,
          }}
          title={c.name}
        >
          {c.avatar ? (
            <img src={c.avatar} alt={c.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
          )}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            "relative rounded-full border-2 border-[rgb(var(--surface))] bg-[rgb(var(--surface-raised))] flex items-center justify-center font-medium text-[rgb(var(--text-secondary))]",
            sizeClasses[size]
          )}
          style={{ zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

// ── Presence indicator ────────────────────────────────────

interface PresenceIndicatorProps {
  activeUsers: {
    id: string;
    name: string;
    color?: string;
    cursor?: { x: number; y: number };
  }[];
}

export function PresenceIndicator({ activeUsers }: PresenceIndicatorProps) {
  return (
    <div className="relative">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
        <span className="text-[11px] text-[rgb(var(--text-tertiary))]">
          {activeUsers.length} {activeUsers.length === 1 ? "person" : "people"} active
        </span>
      </div>
      {activeUsers.map((user) => (
        <div
          key={user.id}
          className="absolute pointer-events-none transition-all"
          style={{
            left: user.cursor?.x ?? 0,
            top: user.cursor?.y ?? 0,
          }}
        >
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full border-2 border-white"
              style={{ background: user.color || "#3b82f6" }}
            />
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white text-black whitespace-nowrap">
              {user.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Collaboration demo ────────────────────────────────────

interface Document {
  id: string;
  title: string;
  collaborators: Collaborator[];
  updatedAt: string;
}

export function CollaborationDemo() {
  const [activeUsers] = useState([
    { id: "1", name: "Jamie", color: "#22c55e" },
    { id: "2", name: "Alex", color: "#3b82f6" },
    { id: "3", name: "Sam", color: "#f59e0b" },
  ]);
  const [documents] = useState<Document[]>([
    {
      id: "1",
      title: "Design System v2.0",
      collaborators: [
        { id: "1", name: "Jamie", color: "#22c55e" },
        { id: "2", name: "Alex", color: "#3b82f6" },
        { id: "3", name: "Sam", color: "#f59e0b" },
        { id: "4", name: "Taylor", color: "#ec4899" },
      ],
      updatedAt: "2 minutes ago",
    },
    {
      id: "2",
      title: "Q2 Roadmap",
      collaborators: [
        { id: "1", name: "Jamie", color: "#22c55e" },
        { id: "2", name: "Alex", color: "#3b82f6" },
      ],
      updatedAt: "1 hour ago",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header with presence */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">Active collaborators</h3>
          <PresenceIndicator activeUsers={activeUsers} />
        </div>
        <Share title="Design System" url="/design-system" text="Check out our latest design system updates" />
      </div>

      {/* Document list */}
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] hover:border-[rgb(var(--accent))] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-[13px] font-medium text-[rgb(var(--text-primary))]">{doc.title}</h4>
                <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-1">Updated {doc.updatedAt}</p>
              </div>
              <CollaboratorAvatars collaborators={doc.collaborators} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`},html:{filename:"collaboration.html",code:`<div class="collaboration-container">
  <!-- Share buttons -->
  <div class="share-buttons">
    <button class="share-btn" data-platform="link">
      <svg class="icon"><!-- link icon --></svg>
      <span>Share link</span>
    </button>
    <button class="share-btn" data-platform="email">
      <svg class="icon"><!-- mail icon --></svg>
      <span>Email</span>
    </button>
    <button class="share-btn" data-platform="message">
      <svg class="icon"><!-- message icon --></svg>
      <span>Message</span>
    </button>
    <button class="share-btn" data-platform="copy">
      <svg class="icon"><!-- copy icon --></svg>
      <span>Copy</span>
    </button>
  </div>

  <!-- Collaborator avatars -->
  <div class="collaborator-stack">
    <div class="avatar" style="background: #22c55e;">JD</div>
    <div class="avatar" style="background: #3b82f6;">AS</div>
    <div class="avatar" style="background: #f59e0b;">SK</div>
    <div class="avatar-more">+2</div>
  </div>

  <!-- Presence indicator -->
  <div class="presence">
    <span class="presence-dot"></span>
    <span class="presence-text">3 people active</span>
  </div>
</div>

<style>
.share-buttons {
  display: flex; gap: 8px;
}
.share-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 12px; border: 1px solid var(--border);
  border-radius: 6px; background: var(--surface);
  font-size: 12px; cursor: pointer;
}
.avatar-stack {
  display: flex; margin-left: -8px;
}
.avatar {
  width: 28px; height: 28px;
  border-radius: 50%; border: 2px solid var(--surface);
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 10px; font-weight: 600;
}
.avatar-more {
  width: 28px; height: 28px;
  border-radius: 50%; border: 2px solid var(--surface);
  background: var(--surface-raised); color: var(--text-tertiary);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 600;
}
.presence {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; color: var(--text-tertiary);
}
.presence-dot {
  width: 8px; height: 8px;
  background: #22c55e; border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>`},swift:{filename:"CollaborationView.swift",code:`import SwiftUI

// Share sheet integration
struct ShareButton: UIViewControllerRepresentable {
    let items: [Any]
    let activities: [UIActivity]?
    
    func makeUIViewController(context: Context) -> UIActivityViewController {
        return UIActivityViewController(activityItems: items, applicationActivities: activities)
    }
    
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

// Presence indicator view
struct PresenceView: View {
    let users: [User]
    
    struct User: Identifiable {
        let id: UUID
        let name: String
        let color: Color
    }
    
    var body: some View {
        HStack(spacing: 8) {
            Circle()
                .fill(Color.green)
                .frame(width: 8, height: 8)
                .overlay(Circle().stroke(Color.white, lineWidth: 2))
                .shadow(color: Color.green.opacity(0.5), radius: 4)
                .animation(
                    .easeInOut(duration: 1.5).repeatForever(autoreverses: true),
                    value: users.count
                )
            
            Text("(users.count) active")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
    }
}

struct CollaborationView: View {
    @State private var showShareSheet = false
    let users = [
        User(id: UUID(), name: "Jamie", color: .green),
        User(id: UUID(), name: "Alex", color: .blue),
        User(id: UUID(), name: "Sam", color: .orange),
    ]
    
    var body: some View {
        VStack(spacing: 20) {
            // Share buttons
            HStack(spacing: 12) {
                Button(action: { showShareSheet = true }) {
                    Label("Share", systemImage: "square.and.arrow.up")
                        .font(.caption)
                }
                .buttonStyle(.bordered)
                
                Button(action: {}) {
                    Label("Copy Link", systemImage: "link")
                        .font(.caption)
                }
                .buttonStyle(.bordered)
            }
            .sheet(isPresented: $showShareSheet) {
                ShareButton(
                    items: ["Check out this design!", URL(string: "https://example.com")!],
                    activities: nil
                )
            }
            
            // Presence indicator
            PresenceView(users: users)
                .padding()
            
            // Collaborator avatars
            HStack(spacing: -8) {
                ForEach(users) { user in
                    Circle()
                        .fill(user.color)
                        .frame(width: 32, height: 32)
                        .overlay(
                            Text(String(user.name.prefix(1)))
                                .font(.caption)
                                .bold()
                                .foregroundColor(.white)
                        )
                        .shadow(color: .black.opacity(0.2), radius: 2)
                        .zIndex(Double(users.firstIndex(where: { $0.id == user.id }) ?? 0))
                }
                
                Circle()
                    .fill(Color(.systemGray5))
                    .frame(width: 32, height: 32)
                    .overlay(
                        Text("+2")
                            .font(.caption2)
                            .bold()
                            .foregroundColor(.secondary)
                    )
            }
            .padding()
        }
        .padding()
    }
}

#Preview {
    CollaborationView()
}`}};function l(){let[e,a]=(0,t.useState)(!1);return(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[(0,r.jsx)("div",{className:"flex -space-x-2",children:[{id:"1",name:"Jamie",initials:"JR",color:"#22c55e"},{id:"2",name:"Alex",initials:"AS",color:"#3b82f6"},{id:"3",name:"Sam",initials:"SK",color:"#f59e0b"}].map(e=>(0,r.jsx)("div",{className:"w-8 h-8 rounded-full border-2 border-[rgb(var(--surface))] flex items-center justify-center text-[11px] font-semibold text-white",style:{background:e.color},title:e.name,children:e.initials},e.id))}),(0,r.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,r.jsx)("div",{className:"w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"}),(0,r.jsx)("span",{className:"text-[12px] text-[rgb(var(--text-tertiary))]",children:"3 people active"})]})]}),(0,r.jsxs)("div",{className:"flex gap-2",children:[(0,r.jsx)("button",{onClick:()=>{a(!0),setTimeout(()=>a(!1),2e3)},className:"px-3 py-1.5 rounded-lg text-[12px] font-medium border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] transition-colors",children:e?"Copied!":"Copy link"}),(0,r.jsx)("button",{className:"px-3 py-1.5 rounded-lg text-[12px] font-medium bg-[rgb(var(--accent))] text-white hover:opacity-90 transition-opacity",children:"Share"})]})]}),(0,r.jsx)("div",{className:"space-y-2",children:[{title:"Design System v2.0",collab:["JR","AS","SK","+1"],time:"2 min ago",color:"#22c55e"},{title:"Q2 Roadmap",collab:["JR","AS"],time:"1 hr ago",color:"#3b82f6"}].map(e=>(0,r.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))]",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-[13px] font-medium text-[rgb(var(--text-primary))]",children:e.title}),(0,r.jsxs)("p",{className:"text-[11px] text-[rgb(var(--text-tertiary))]",children:["Updated ",e.time]})]}),(0,r.jsx)("div",{className:"flex -space-x-1",children:e.collab.map((t,a)=>(0,r.jsx)("div",{className:"w-6 h-6 rounded-full border-2 border-[rgb(var(--surface))] flex items-center justify-center text-[9px] font-semibold text-white",style:{background:0===a?e.color:1===a?"#6366f1":"#94a3b8"},children:t},a))})]},e.title))})]})}let n=[{type:"Real-time editing",desc:"Multiple users editing a document simultaneously with live cursor tracking"},{type:"Comment threads",desc:"Contextual discussions anchored to specific elements"},{type:"Shared workspaces",desc:"Central hub for team resources and activity feeds"},{type:"Permission levels",desc:"Granular access control from view-only to admin"}];e.s(["default",0,function(){return(0,r.jsxs)("div",{children:[(0,r.jsx)(a.PageHeader,{title:"Collaboration and Sharing",description:"Enable teamwork through real-time interaction patterns, presence indicators, and seamless content distribution across platforms and devices."}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Real-time collaboration demo"}),(0,r.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"See how presence indicators, avatar stacks, and sharing controls work together to create a connected workspace."}),(0,r.jsx)(s.ComponentPreview,{children:(0,r.jsx)("div",{className:"w-full max-w-2xl mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",children:(0,r.jsx)(l,{})})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Common patterns"}),(0,r.jsx)("div",{className:"grid grid-cols-2 gap-4",children:n.map(e=>(0,r.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] p-4 bg-[rgb(var(--surface))]",children:[(0,r.jsx)("h3",{className:"text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1",children:e.type}),(0,r.jsx)("p",{className:"text-[12px] text-[rgb(var(--text-secondary))]",children:e.desc})]},e.type))})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6",children:"Presence indicator anatomy"}),(0,r.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex items-center justify-center",children:(0,r.jsxs)("svg",{viewBox:"0 0 300 100",width:"300",height:"100",className:"max-w-full",children:[(0,r.jsx)("circle",{cx:"30",cy:"50",r:"20",fill:"#22c55e"}),(0,r.jsx)("text",{x:"30",y:"54",textAnchor:"middle",fontSize:"10",fill:"white",fontWeight:"600",children:"J"}),(0,r.jsx)("circle",{cx:"55",cy:"50",r:"20",fill:"#3b82f6"}),(0,r.jsx)("text",{x:"55",y:"54",textAnchor:"middle",fontSize:"10",fill:"white",fontWeight:"600",children:"A"}),(0,r.jsx)("circle",{cx:"80",cy:"50",r:"20",fill:"#f59e0b"}),(0,r.jsx)("text",{x:"80",y:"54",textAnchor:"middle",fontSize:"10",fill:"white",fontWeight:"600",children:"S"}),(0,r.jsx)("circle",{cx:"105",cy:"50",r:"20",fill:"rgb(var(--surface-raised))",stroke:"rgb(var(--border))",strokeWidth:"1"}),(0,r.jsx)("text",{x:"105",y:"54",textAnchor:"middle",fontSize:"10",fill:"rgb(var(--text-secondary))",fontWeight:"600",children:"+2"}),(0,r.jsx)("circle",{cx:"150",cy:"30",r:"6",fill:"#22c55e"}),(0,r.jsx)("animate",{attributeName:"opacity",values:"1;0.5;1",dur:"2s",repeatCount:"indefinite"}),(0,r.jsx)("text",{x:"170",y:"34",fontSize:"11",fill:"rgb(var(--text-tertiary))",children:"3 people active"}),(0,r.jsx)("rect",{x:"210",y:"32",width:"80",height:"32",rx:"8",fill:"rgb(var(--surface))",stroke:"rgb(var(--border))"}),(0,r.jsx)("text",{x:"250",y:"52",textAnchor:"middle",fontSize:"12",fill:"rgb(var(--text-secondary))",children:"Share"}),(0,r.jsx)("text",{x:"30",y:"82",fontSize:"8",fill:"rgb(var(--text-tertiary))",textAnchor:"middle",children:"Avatar"}),(0,r.jsx)("text",{x:"105",y:"82",fontSize:"8",fill:"rgb(var(--text-tertiary))",textAnchor:"middle",children:"Overflow"}),(0,r.jsx)("text",{x:"150",y:"82",fontSize:"8",fill:"rgb(var(--text-tertiary))",textAnchor:"middle",children:"Presence"}),(0,r.jsx)("text",{x:"250",y:"82",fontSize:"8",fill:"rgb(var(--text-tertiary))",textAnchor:"middle",children:"Action"})]})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Usage guidelines"}),(0,r.jsx)("div",{className:"grid grid-cols-2 gap-4",children:[{type:"do",items:["Show live presence for collaborative documents","Provide multiple sharing options (link, email, copy)","Use avatar stacks to show collaborators efficiently","Offer granular permission controls"]},{type:"dont",items:["Don't show full names in crowded avatar stacks","Avoid auto-sharing without explicit consent","Don't expose sensitive data in share previews","Avoid overwhelming users with too many collaboration options"]}].map(({type:e,items:t})=>(0,r.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:[(0,r.jsx)("div",{className:`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${"do"===e?"text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20":"text-red-500 bg-red-50 dark:bg-red-950/20"}`,children:"do"===e?"✓ Do":"✗ Don't"}),(0,r.jsx)("ul",{className:"p-4 space-y-2",children:t.map(t=>(0,r.jsxs)("li",{className:"text-[12px] text-[rgb(var(--text-secondary))] flex gap-2",children:[(0,r.jsx)("span",{className:"do"===e?"text-emerald-500":"text-red-400",children:"·"}),t]},t))})]},e))})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Implementation"}),(0,r.jsx)(i.PlatformTabs,{code:o})]}),(0,r.jsxs)("section",{children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Accessibility"}),(0,r.jsx)("ul",{className:"space-y-2 text-[14px] text-[rgb(var(--text-secondary))]",children:["Share buttons must have descriptive aria-labels for screen readers.","Presence indicators should announce changes for assistive technology.","Collaborator avatars need alt text with names.","Real-time content changes should have polite aria-live announcements.","Provide keyboard shortcuts for common collaboration actions.","Cursor positions should be announced when they move to new regions."].map(e=>(0,r.jsxs)("li",{className:"flex gap-2",children:[(0,r.jsx)("span",{className:"text-[rgb(var(--accent))] mt-0.5",children:"→"}),e]},e))})]})]})}])}]);