import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { AvatarMobileDemo } from "@/site/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Avatar" };

const PROPS = [
  {
    name: "src",
    type: "string",
    description: "Image URL. When provided, renders an <img> inside the avatar.",
  },
  {
    name: "alt",
    type: "string",
    description: "Accessible name. Used as the aria-label and to derive initials when src is absent.",
  },
  {
    name: "initials",
    type: "string",
    description: "Explicit 1–2 character override for the fallback initials.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Controls diameter, font size, and status dot size.",
  },
  {
    name: "status",
    type: '"online" | "offline" | "away" | "busy"',
    description: "Renders a colored dot indicator in the bottom-right corner.",
  },
];

const CODE = {
  react: {
    filename: "Avatar.tsx",
    code: `import { Avatar, AvatarGroup } from "@/components/ui/Avatar";

// Image avatar
<Avatar src="/avatars/jamieson.jpg" alt="Jamieson Rothwell" />

// Initials fallback (derived from alt)
<Avatar alt="Jamieson Rothwell" />        // → JR
<Avatar alt="Claude" initials="AI" />     // → AI (explicit override)

// Sizes
<Avatar alt="Sam Park" size="xs" />
<Avatar alt="Sam Park" size="sm" />
<Avatar alt="Sam Park" size="md" />
<Avatar alt="Sam Park" size="lg" />
<Avatar alt="Sam Park" size="xl" />

// Status indicators
<Avatar alt="Sam Park"    status="online"  />
<Avatar alt="Lena Müller" status="away"    />
<Avatar alt="Dev Bot"     status="busy"    />
<Avatar alt="Amir Karimi" status="offline" />

// Avatar group
<AvatarGroup>
  <Avatar alt="Sam Park"    size="sm" />
  <Avatar alt="Lena Müller" size="sm" />
  <Avatar alt="Amir Karimi" size="sm" />
  <Avatar alt="Dev Bot"     size="sm" />
</AvatarGroup>`,
  },
  html: {
    filename: "avatar.html",
    code: `<!-- Image avatar -->
<span class="avatar" aria-label="Jamieson Rothwell">
  <img src="/avatars/jamieson.jpg" alt="Jamieson Rothwell" />
</span>

<!-- Initials fallback -->
<span class="avatar" aria-label="Jamieson Rothwell">
  <span class="avatar-initials">JR</span>
</span>

<!-- With status dot -->
<span class="avatar avatar-with-status">
  <span class="avatar-initials">SP</span>
  <span class="avatar-status avatar-status-online" aria-label="online"></span>
</span>

<!-- Avatar group -->
<div class="avatar-group">
  <span class="avatar avatar-sm"><span class="avatar-initials">SP</span></span>
  <span class="avatar avatar-sm"><span class="avatar-initials">LM</span></span>
  <span class="avatar avatar-sm"><span class="avatar-initials">AK</span></span>
</div>

<style>
  .avatar {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background: rgb(var(--accent-muted));
    user-select: none;
    flex-shrink: 0;
  }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }

  .avatar-initials {
    font-size: 13px;
    font-weight: 600;
    color: rgb(var(--accent));
    line-height: 1;
  }

  /* Sizes */
  .avatar-xs { width: 24px; height: 24px; }
  .avatar-xs .avatar-initials { font-size: 9px; }
  .avatar-sm { width: 32px; height: 32px; }
  .avatar-sm .avatar-initials { font-size: 11px; }
  .avatar-lg { width: 48px; height: 48px; }
  .avatar-lg .avatar-initials { font-size: 15px; }
  .avatar-xl { width: 64px; height: 64px; }
  .avatar-xl .avatar-initials { font-size: 19px; }

  /* Status dot */
  .avatar-with-status { overflow: visible; }
  .avatar-status {
    position: absolute;
    bottom: 1px; right: 1px;
    width: 10px; height: 10px;
    border-radius: 50%;
    border: 2px solid rgb(var(--surface));
  }
  .avatar-status-online  { background: #10b981; }
  .avatar-status-offline { background: rgb(var(--text-tertiary)); }
  .avatar-status-away    { background: #f59e0b; }
  .avatar-status-busy    { background: #f87171; }

  /* Group */
  .avatar-group { display: flex; align-items: center; }
  .avatar-group .avatar + .avatar { margin-left: -8px; ring: 2px solid rgb(var(--surface)); }
</style>`,
  },
  swift: {
    filename: "SitkaAvatar.swift",
    code: `import SwiftUI

enum SitkaAvatarStatus { case online, offline, away, busy }
enum SitkaAvatarSize   { case xs, sm, md, lg, xl }

struct SitkaAvatar: View {
    var imageURL: URL? = nil
    var alt: String = ""
    var initials: String? = nil
    var size: SitkaAvatarSize = .md
    var status: SitkaAvatarStatus? = nil

    var body: some View {
        ZStack(alignment: .bottomTrailing) {
            Circle()
                .fill(Color.accentColor.opacity(0.2))
                .frame(width: diameter, height: diameter)
                .overlay {
                    if let url = imageURL {
                        AsyncImage(url: url) { image in
                            image.resizable().scaledToFill()
                        } placeholder: { Color.clear }
                        .clipShape(Circle())
                    } else {
                        Text(resolvedInitials)
                            .font(.system(size: fontSize, weight: .semibold))
                            .foregroundColor(.accentColor)
                    }
                }
                .accessibilityLabel(alt)

            if let status {
                Circle()
                    .fill(statusColor(status))
                    .frame(width: dotDiameter, height: dotDiameter)
                    .overlay(Circle().stroke(Color(UIColor.systemBackground), lineWidth: dotBorder))
                    .accessibilityLabel(statusLabel(status))
            }
        }
    }

    private var resolvedInitials: String {
        if let i = initials { return String(i.prefix(2)).uppercased() }
        let words = alt.split(separator: " ")
        if words.count >= 2 { return String(words.first!.prefix(1) + words.last!.prefix(1)).uppercased() }
        return String(alt.prefix(2)).uppercased()
    }

    private var diameter: CGFloat {
        switch size { case .xs: 24; case .sm: 32; case .md: 40; case .lg: 48; case .xl: 64 }
    }
    private var fontSize: CGFloat {
        switch size { case .xs: 9; case .sm: 11; case .md: 13; case .lg: 15; case .xl: 19 }
    }
    private var dotDiameter: CGFloat {
        switch size { case .xs: 6; case .sm: 8; case .md: 10; case .lg: 12; case .xl: 14 }
    }
    private var dotBorder: CGFloat { size == .xs ? 1.5 : 2 }

    private func statusColor(_ s: SitkaAvatarStatus) -> Color {
        switch s {
        case .online:  Color(hex: "#10b981")
        case .offline: Color(UIColor.tertiaryLabel)
        case .away:    Color(hex: "#f59e0b")
        case .busy:    Color(hex: "#f87171")
        }
    }
    private func statusLabel(_ s: SitkaAvatarStatus) -> String {
        switch s { case .online: "Online"; case .offline: "Offline"; case .away: "Away"; case .busy: "Busy" }
    }
}

#Preview {
    HStack(spacing: 12) {
        SitkaAvatar(alt: "Jamieson Rothwell", size: .xl, status: .online)
        SitkaAvatar(alt: "Sam Park",    size: .lg, status: .away)
        SitkaAvatar(alt: "Lena Müller", size: .md, status: .busy)
        SitkaAvatar(alt: "Dev Bot",     size: .sm, status: .offline)
        SitkaAvatar(alt: "A",           size: .xs)
    }
    .padding()
}`,
  },
  macos: {
    filename: "SitkaAvatar+macOS.swift",
    code: `import SwiftUI

enum SitkaAvatarSize { case xs, sm, md, lg, xl }
enum SitkaAvatarStatus { case online, offline, away, busy }

struct SitkaAvatar: View {
    let alt: String
    var initials: String? = nil
    var imageURL: URL? = nil
    var size: SitkaAvatarSize = .md
    var status: SitkaAvatarStatus? = nil

    var body: some View {
        ZStack(alignment: .bottomTrailing) {
            Circle()
                .fill(Color.accentColor.opacity(0.12))
                .frame(width: diameter, height: diameter)
                .overlay {
                    if let url = imageURL {
                        AsyncImage(url: url) { image in
                            image.resizable().scaledToFill()
                        } placeholder: { Color.clear }
                        .clipShape(Circle())
                    } else {
                        Text(resolvedInitials)
                            .font(.system(size: fontSize, weight: .semibold))
                            .foregroundColor(.accentColor)
                    }
                }
                .accessibilityLabel(alt)

            if let status {
                Circle()
                    .fill(statusColor(status))
                    .frame(width: dotDiameter, height: dotDiameter)
                    .overlay(Circle().stroke(Color(NSColor.windowBackgroundColor), lineWidth: dotBorder))
                    .accessibilityLabel(statusLabel(status))
            }
        }
    }

    private var resolvedInitials: String {
        if let i = initials { return String(i.prefix(2)).uppercased() }
        let words = alt.split(separator: " ")
        if words.count >= 2 { return String(words.first!.prefix(1) + words.last!.prefix(1)).uppercased() }
        return String(alt.prefix(2)).uppercased()
    }

    private var diameter: CGFloat {
        switch size { case .xs: 20; case .sm: 28; case .md: 36; case .lg: 44; case .xl: 56 }
    }
    private var fontSize: CGFloat {
        switch size { case .xs: 8; case .sm: 10; case .md: 12; case .lg: 14; case .xl: 17 }
    }
    private var dotDiameter: CGFloat {
        switch size { case .xs: 5; case .sm: 7; case .md: 9; case .lg: 11; case .xl: 13 }
    }
    private var dotBorder: CGFloat { size == .xs ? 1.5 : 2 }

    private func statusColor(_ s: SitkaAvatarStatus) -> Color {
        switch s {
        case .online:  Color(hex: "#10b981")
        case .offline: Color(.tertiaryLabelColor)
        case .away:    Color(hex: "#f59e0b")
        case .busy:    Color(hex: "#f87171")
        }
    }
    private func statusLabel(_ s: SitkaAvatarStatus) -> String {
        switch s { case .online: "Online"; case .offline: "Offline"; case .away: "Away"; case .busy: "Busy" }
    }
}

#Preview {
    HStack(spacing: 10) {
        SitkaAvatar(alt: "Jamieson Rothwell", size: .xl, status: .online)
        SitkaAvatar(alt: "Sam Park",    size: .lg, status: .away)
        SitkaAvatar(alt: "Lena Müller", size: .md, status: .busy)
        SitkaAvatar(alt: "Dev Bot",     size: .sm, status: .offline)
        SitkaAvatar(alt: "A",           size: .xs)
    }
    .padding()
}`,
  },
};

export default function AvatarPage() {
  return (
    <div>
      <PageHeader
        title="Avatar"
        description="User representation with image, initials fallback, five sizes, and four status indicators. AvatarGroup stacks multiple avatars with an overlap ring."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview grid>
          <Avatar alt="Jamieson Rothwell" size="xl" status="online" />
          <Avatar alt="Sam Park"    size="lg" status="away" />
          <Avatar alt="Lena Müller" size="md" status="busy" />
          <Avatar alt="Dev Bot"     size="sm" status="offline" />
          <Avatar alt="A"           size="xs" />
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sizes</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Five sizes cover icon-scale ({`xs`}), compact lists ({`sm`}), standard UI ({`md`}),
          profile cards ({`lg`}), and hero sections ({`xl`}).
        </p>
        <ComponentPreview>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Avatar alt="Jamieson Rothwell" size={s} />
              <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">{s}</code>
            </div>
          ))}
        </ComponentPreview>
      </section>

      {/* Status */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Status</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          A dot in the bottom-right corner communicates presence. The dot is sized proportionally
          and ringed with the surface color to lift it off any background.
        </p>
        <ComponentPreview>
          {(["online", "away", "busy", "offline"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Avatar alt="Sam Park" size="md" status={s} />
              <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">{s}</code>
            </div>
          ))}
        </ComponentPreview>
      </section>

      {/* Initials */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Initials fallback</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          When no <code className="font-mono text-[13px] text-[rgb(var(--accent))]">src</code> is provided,
          initials are derived from the <code className="font-mono text-[13px] text-[rgb(var(--accent))]">alt</code> prop
          (first + last word). Pass <code className="font-mono text-[13px] text-[rgb(var(--accent))]">initials</code> to
          override.
        </p>
        <ComponentPreview>
          <Avatar alt="Jamieson Rothwell" size="md" />
          <Avatar alt="Sam Park" size="md" />
          <Avatar alt="Claude" initials="AI" size="md" />
          <Avatar alt="X" size="md" />
        </ComponentPreview>
      </section>

      {/* Group */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Avatar group</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">AvatarGroup</code> stacks
          avatars with a negative margin and a surface-colored ring to separate them visually.
        </p>
        <ComponentPreview>
          <AvatarGroup>
            <Avatar alt="Jamieson Rothwell" size="sm" />
            <Avatar alt="Sam Park"    size="sm" />
            <Avatar alt="Lena Müller" size="sm" />
            <Avatar alt="Amir Karimi" size="sm" />
            <Avatar alt="Dev Bot"     size="sm" />
          </AvatarGroup>
        </ComponentPreview>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Avatar is a server component — no client-side state. The status dot and initials
          derivation are pure rendering logic.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Avatars are primarily visual. On mobile, ensure interactive avatar areas meet touch target minimums and that AvatarGroup stacks don't overflow their containers.
        </p>
        <ComponentPreview className="mb-6">
          <AvatarMobileDemo />
        </ComponentPreview>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Scenario", "Guidance"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { scenario: "Tap target", guidance: "If an avatar opens a profile or triggers an action, wrap it in a button with at least 44×44px of tappable area even if the avatar itself is smaller (e.g. sm at 24px)." },
                { scenario: "AvatarGroup on narrow screens", guidance: "Reduce the visible count or decrease avatar size when the group would overflow its container. Expose the \"+N\" overflow count rather than clipping silently." },
                { scenario: "Image loading", guidance: "On slow mobile connections, avatar images may take time to load. The initials fallback is rendered before the image resolves — ensure the initials + background color always look correct." },
                { scenario: "Status dots on small sizes", guidance: "Status dots at xs/sm avatar sizes can become too small to notice. Only show status on md+ avatars, or increase the dot size relative to the avatar." },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.scenario}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Always provide alt — it becomes the aria-label for the avatar container.",
            "Status dots have aria-label set to the status string (\"online\", \"away\", etc.).",
            "When src is present the inner <img> receives alt; the outer span gets role=img.",
            "Initials-only avatars are decorative when the user's name is already visible nearby — in that case pass aria-hidden to the avatar.",
            "AvatarGroup has no semantic role; describe the group with a nearby heading or aria-label on the parent.",
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
