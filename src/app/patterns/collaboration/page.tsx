import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Collaboration and Sharing" };

const CODE = {
  react: {
    filename: "CollaborationFeatures.tsx",
    code: `"use client";

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
`,
  },
  html: {
    filename: "collaboration.html",
    code: `<div class="collaboration-container">
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
</style>`,
  },
  swift: {
    filename: "CollaborationView.swift",
    code: `import SwiftUI

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
            
            Text("\(users.count) active")
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
}`,
  },
};

const PATTERN_EXAMPLES = [
  { type: "Real-time editing", desc: "Multiple users editing a document simultaneously with live cursor tracking" },
  { type: "Comment threads", desc: "Contextual discussions anchored to specific elements" },
  { type: "Shared workspaces", desc: "Central hub for team resources and activity feeds" },
  { type: "Permission levels", desc: "Granular access control from view-only to admin" },
];

export default function CollaborationPatternPage() {
  return (
    <div>
      <PageHeader
        title="Collaboration and Sharing"
        description="Enable teamwork through real-time interaction patterns, presence indicators, and seamless content distribution across platforms and devices."
      />

      {/* Live demo */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Real-time collaboration demo</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          See how presence indicators, avatar stacks, and sharing controls work together to create a connected workspace.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-2xl mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <CollaborationDemo />
          </div>
        </ComponentPreview>
      </section>

      {/* Pattern examples */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Common patterns</h2>
        <div className="grid grid-cols-2 gap-4">
          {PATTERN_EXAMPLES.map((ex) => (
            <div key={ex.type} className="rounded-xl border border-[rgb(var(--border))] p-4 bg-[rgb(var(--surface))]">
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1">{ex.type}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))]">{ex.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Presence indicator anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Presence indicator anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex items-center justify-center">
          <svg viewBox="0 0 300 100" width="300" height="100" className="max-w-full">
            {/* Avatars */}
            <circle cx="30" cy="50" r="20" fill="#22c55e" />
            <text x="30" y="54" textAnchor="middle" fontSize="10" fill="white" fontWeight="600">J</text>
            <circle cx="55" cy="50" r="20" fill="#3b82f6" />
            <text x="55" y="54" textAnchor="middle" fontSize="10" fill="white" fontWeight="600">A</text>
            <circle cx="80" cy="50" r="20" fill="#f59e0b" />
            <text x="80" y="54" textAnchor="middle" fontSize="10" fill="white" fontWeight="600">S</text>
            
            {/* More indicator */}
            <circle cx="105" cy="50" r="20" fill="rgb(var(--surface-raised))" stroke="rgb(var(--border))" strokeWidth="1" />
            <text x="105" y="54" textAnchor="middle" fontSize="10" fill="rgb(var(--text-secondary))" fontWeight="600">+2</text>
            
            {/* Online indicator */}
            <circle cx="150" cy="30" r="6" fill="#22c55e" />
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            
            {/* Label */}
            <text x="170" y="34" fontSize="11" fill="rgb(var(--text-tertiary))">3 people active</text>
            
            {/* Share button */}
            <rect x="210" y="32" width="80" height="32" rx="8" fill="rgb(var(--surface))" stroke="rgb(var(--border))" />
            <text x="250" y="52" textAnchor="middle" fontSize="12" fill="rgb(var(--text-secondary))">Share</text>
            
            {/* Annotations */}
            <text x="30" y="82" fontSize="8" fill="rgb(var(--text-tertiary))" textAnchor="middle">Avatar</text>
            <text x="105" y="82" fontSize="8" fill="rgb(var(--text-tertiary))" textAnchor="middle">Overflow</text>
            <text x="150" y="82" fontSize="8" fill="rgb(var(--text-tertiary))" textAnchor="middle">Presence</text>
            <text x="250" y="82" fontSize="8" fill="rgb(var(--text-tertiary))" textAnchor="middle">Action</text>
          </svg>
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage guidelines</h2>
        <div className="grid grid-cols-2 gap-4">
           {[{ type: "do", items: ["Show live presence for collaborative documents", "Provide multiple sharing options (link, email, copy)", "Use avatar stacks to show collaborators efficiently", "Offer granular permission controls"] },
            { type: "dont", items: ["Don't show full names in crowded avatar stacks", "Avoid auto-sharing without explicit consent", "Don't expose sensitive data in share previews", "Avoid overwhelming users with too many collaboration options"] },
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

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
           {["Share buttons must have descriptive aria-labels for screen readers.",
            "Presence indicators should announce changes for assistive technology.",
            "Collaborator avatars need alt text with names.",
            "Real-time content changes should have polite aria-live announcements.",
            "Provide keyboard shortcuts for common collaboration actions.",
            "Cursor positions should be announced when they move to new regions.",
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
