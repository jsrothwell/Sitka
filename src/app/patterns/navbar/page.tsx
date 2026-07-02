import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { NavbarDemo, SidebarNavDemo } from "@/site/docs/NavbarDemo";


const CODE = {
  react: {
    filename: "Navbar.tsx",
    code: `"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib";

const NAV_LINKS = ["Dashboard", "Team", "Analytics", "Settings"];

export function Navbar() {
  const [active, setActive]         = useState(NAV_LINKS[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen]     = useState(false);

  return (
    <nav className="border-b bg-surface">
      <div className="px-4 h-14 flex items-center gap-3">

        {/* Brand */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0 mr-2">
          <div className="w-7 h-7 rounded-lg bg-accent" />
          <span className="text-[14px] font-semibold">Sitka</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV_LINKS.map((label) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors",
                active === label
                  ? "bg-accent-subtle text-accent"
                  : "text-text-secondary hover:bg-surface-raised"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 md:flex-none" />

        {/* Right: actions + user menu */}
        <UserMenu open={userOpen} onToggle={() => setUserOpen(!userOpen)} />

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t px-3 pb-3 pt-2">
          {NAV_LINKS.map((label) => (
            <button
              key={label}
              onClick={() => { setActive(label); setMobileOpen(false); }}
              className={cn(
                "w-full flex items-center px-3 py-2.5 rounded-lg text-[13px] font-medium",
                active === label ? "bg-accent-subtle text-accent" : "text-text-secondary"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}`,
  },
  html: {
    filename: "navbar.html",
    code: `<nav class="navbar">
  <div class="nav-inner">

    <!-- Brand -->
    <a href="/" class="nav-brand">
      <div class="nav-logo"></div>
      <span>Sitka</span>
    </a>

    <!-- Desktop links -->
    <ul class="nav-links" role="list">
      <li><a href="#" class="nav-link nav-link--active" aria-current="page">Dashboard</a></li>
      <li><a href="#" class="nav-link">Team</a></li>
      <li><a href="#" class="nav-link">Analytics</a></li>
      <li><a href="#" class="nav-link">Settings</a></li>
    </ul>

    <div class="nav-spacer"></div>

    <!-- Actions -->
    <div class="nav-actions">
      <button class="nav-icon-btn" aria-label="Search">
        <svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      </button>
      <button class="nav-icon-btn" aria-label="Notifications">
        <svg class="icon" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </button>
      <!-- User menu trigger -->
      <button class="nav-user" aria-haspopup="menu" aria-expanded="false" id="userMenuBtn">
        <div class="nav-avatar">JR</div>
        <svg class="icon-sm" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
      </button>
    </div>

    <!-- Hamburger (mobile) -->
    <button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false" id="hamburger">
      <svg class="icon" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
    </button>

  </div>

  <!-- User dropdown -->
  <div class="nav-dropdown" role="menu" id="userMenu" hidden>
    <div class="nav-dropdown-header">
      <p class="nav-dropdown-name">Jamieson Rothwell</p>
      <p class="nav-dropdown-email">jamieson@sitka.design</p>
    </div>
    <button class="nav-dropdown-item" role="menuitem">Profile</button>
    <button class="nav-dropdown-item" role="menuitem">Settings</button>
    <div class="nav-dropdown-divider"></div>
    <button class="nav-dropdown-item nav-dropdown-item--danger" role="menuitem">Sign out</button>
  </div>

  <!-- Mobile drawer -->
  <div class="nav-mobile" id="mobileMenu" hidden>
    <a href="#" class="nav-mobile-link nav-mobile-link--active">Dashboard</a>
    <a href="#" class="nav-mobile-link">Team</a>
    <a href="#" class="nav-mobile-link">Analytics</a>
    <a href="#" class="nav-mobile-link">Settings</a>
  </div>
</nav>

<style>
  .navbar {
    border-bottom: 1px solid rgb(var(--border));
    background: rgb(var(--surface));
    position: relative;
  }

  .nav-inner {
    height: 56px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
  }

  .nav-brand {
    display: flex; align-items: center; gap: 8px;
    text-decoration: none; flex-shrink: 0; margin-right: 4px;
    font-size: 14px; font-weight: 600;
    color: rgb(var(--text-primary));
  }
  .nav-logo {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: rgb(var(--accent));
  }

  .nav-links {
    display: none;
    list-style: none;
    padding: 0; margin: 0;
    align-items: center;
    gap: 2px;
    flex: 1;
  }
  @media (min-width: 768px) { .nav-links { display: flex; } }

  .nav-link {
    display: block;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 13px; font-weight: 500;
    text-decoration: none;
    color: rgb(var(--text-secondary));
    transition: all 100ms;
  }
  .nav-link:hover {
    background: rgb(var(--surface-raised));
    color: rgb(var(--text-primary));
  }
  .nav-link--active {
    background: rgb(var(--accent-subtle));
    color: rgb(var(--accent));
  }

  .nav-spacer { flex: 1; }

  .nav-actions {
    display: flex; align-items: center; gap: 4px;
  }

  .nav-icon-btn {
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 8px;
    border: none; background: none; cursor: pointer;
    color: rgb(var(--text-tertiary));
    transition: background 100ms;
  }
  .nav-icon-btn:hover { background: rgb(var(--surface-raised)); }

  .nav-user {
    display: flex; align-items: center; gap: 6px;
    padding: 4px 8px 4px 4px;
    border-radius: 8px;
    border: none; background: none; cursor: pointer;
    transition: background 100ms;
  }
  .nav-user:hover { background: rgb(var(--surface-raised)); }

  .nav-avatar {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: rgb(var(--accent-muted));
    color: rgb(var(--accent));
    font-size: 9px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }

  .nav-hamburger {
    display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px;
    border-radius: 8px;
    border: none; background: none; cursor: pointer;
    color: rgb(var(--text-tertiary));
  }
  @media (min-width: 768px) { .nav-hamburger { display: none; } }

  .nav-dropdown {
    position: absolute; right: 16px; top: calc(100% + 6px);
    min-width: 200px;
    background: rgb(var(--surface-raised));
    border: 1px solid rgb(var(--border));
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,.2);
    padding: 4px 0;
    z-index: 100;
  }
  .nav-dropdown-header {
    padding: 10px 12px;
    border-bottom: 1px solid rgb(var(--border-subtle));
  }
  .nav-dropdown-name {
    font-size: 13px; font-weight: 500;
    color: rgb(var(--text-primary));
  }
  .nav-dropdown-email {
    font-size: 11px; color: rgb(var(--text-tertiary));
    margin-top: 2px;
  }
  .nav-dropdown-item {
    display: flex; width: 100%;
    padding: 8px 12px;
    font-size: 13px;
    color: rgb(var(--text-secondary));
    background: none; border: none; cursor: pointer;
    text-align: left;
    transition: background 100ms;
  }
  .nav-dropdown-item:hover { background: rgb(var(--surface)); }
  .nav-dropdown-item--danger { color: #f87171; }
  .nav-dropdown-item--danger:hover { background: rgba(248,113,113,.1); }
  .nav-dropdown-divider {
    height: 1px;
    background: rgb(var(--border-subtle));
    margin: 4px 0;
  }

  .nav-mobile {
    border-top: 1px solid rgb(var(--border));
    padding: 8px 12px 12px;
    display: flex; flex-direction: column; gap: 2px;
  }
  .nav-mobile-link {
    display: block;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 13px; font-weight: 500;
    text-decoration: none;
    color: rgb(var(--text-secondary));
    transition: background 100ms;
  }
  .nav-mobile-link:hover { background: rgb(var(--surface-raised)); }
  .nav-mobile-link--active {
    background: rgb(var(--accent-subtle));
    color: rgb(var(--accent));
  }
  .icon { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; }
  .icon-sm { width: 12px; height: 12px; stroke: currentColor; fill: none; stroke-width: 2; }
</style>

<script>
  const hamburger   = document.getElementById("hamburger");
  const mobileMenu  = document.getElementById("mobileMenu");
  const userMenuBtn = document.getElementById("userMenuBtn");
  const userMenu    = document.getElementById("userMenu");

  hamburger.addEventListener("click", () => {
    const open = mobileMenu.hidden;
    mobileMenu.hidden = !open;
    hamburger.setAttribute("aria-expanded", open);
  });

  userMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = userMenu.hidden;
    userMenu.hidden = !open;
    userMenuBtn.setAttribute("aria-expanded", open);
  });

  document.addEventListener("click", () => {
    userMenu.hidden = true;
    userMenuBtn.setAttribute("aria-expanded", false);
  });
</script>`,
  },
  swift: {
    filename: "SitkaNavbar.swift",
    code: `import SwiftUI

// Top navigation bar — use inside a NavigationStack or as a standalone header.
// On iOS, TabView handles the primary nav; this pattern maps better to macOS / iPadOS sidebars.

// ── Sidebar navigation (iOS/iPadOS/macOS) ────────────────
struct AppSidebarView: View {
    @State private var selection: String? = "Dashboard"

    let sections: [NavSection] = [
        NavSection(title: "Main", items: [
            NavItem(id: "Dashboard", label: "Dashboard", systemImage: "square.grid.2x2"),
            NavItem(id: "Team",      label: "Team",      systemImage: "person.2"),
            NavItem(id: "Analytics", label: "Analytics", systemImage: "chart.bar"),
        ]),
        NavSection(title: "Account", items: [
            NavItem(id: "Settings",  label: "Settings",  systemImage: "gearshape"),
        ]),
    ]

    var body: some View {
        NavigationSplitView {
            List(selection: $selection) {
                ForEach(sections) { section in
                    Section(section.title) {
                        ForEach(section.items) { item in
                            NavigationLink(value: item.id) {
                                Label(item.label, systemImage: item.systemImage)
                            }
                        }
                    }
                }
            }
            .navigationTitle("Sitka")
            .listStyle(.sidebar)
            .toolbar {
                ToolbarItem(placement: .bottomBar) {
                    HStack {
                        Image(systemName: "person.circle")
                            .font(.system(size: 20))
                            .foregroundStyle(.secondary)
                        VStack(alignment: .leading, spacing: 1) {
                            Text("Jamieson Rothwell")
                                .font(.caption.weight(.medium))
                            Text("Admin")
                                .font(.caption2)
                                .foregroundStyle(.secondary)
                        }
                        Spacer()
                    }
                    .padding(.vertical, 4)
                }
            }
        } detail: {
            if let id = selection {
                Text(id)
                    .font(.title2.weight(.semibold))
                    .navigationTitle(id)
            } else {
                ContentUnavailableView(
                    "Select a section",
                    systemImage: "sidebar.left"
                )
            }
        }
    }
}

struct NavSection: Identifiable {
    let id = UUID()
    let title: String
    let items: [NavItem]
}

struct NavItem: Identifiable {
    let id: String
    let label: String
    let systemImage: String
}

// ── Compact top bar (for custom full-screen views) ────────
struct TopBar: View {
    let title: String
    var onBack: (() -> Void)? = nil

    var body: some View {
        HStack(spacing: 12) {
            if let onBack {
                Button(action: onBack) {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 16, weight: .medium))
                }
                .buttonStyle(.plain)
            }

            Text(title)
                .font(.system(size: 16, weight: .semibold))

            Spacer()

            Button { } label: {
                Image(systemName: "bell")
                    .font(.system(size: 15))
            }
            .buttonStyle(.plain)

            Button { } label: {
                Image(systemName: "person.circle.fill")
                    .font(.system(size: 22))
                    .foregroundStyle(Color.accentColor)
            }
            .buttonStyle(.plain)
        }
        .padding(.horizontal, 16)
        .frame(height: 52)
        .background(.bar)
        .overlay(alignment: .bottom) {
            Divider()
        }
    }
}

#Preview {
    AppSidebarView()
}`,
  },
};

export default function NavbarPage() {
  return (
    <div>
      <PageHeader
        title="Navbar"
        description="A persistent top-of-page navigation bar with brand identity, primary links, search, notifications, and a user menu. Collapses to a hamburger drawer on narrow screens. Includes a collapsible sidebar variant."
      />

      {/* Top nav preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Top navigation
        </h2>
        <ComponentPreview>
          <div className="w-full">
            <NavbarDemo />
          </div>
        </ComponentPreview>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3">
          Click nav links to change the active state. Click the avatar to open the user menu. On narrow screens the hamburger reveals the drawer.
        </p>
      </section>

      {/* Sidebar nav */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sidebar navigation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          A vertical sidebar suits apps with more than five top-level destinations or where a wide content area
          benefits from a narrow left rail. Supports collapse-to-icon mode — the brand logo remains visible
          and each item gets a <code className="font-mono text-[13px] text-[rgb(var(--accent))]">title</code> tooltip when collapsed.
        </p>
        <ComponentPreview>
          <div className="w-full">
            <SidebarNavDemo />
          </div>
        </ComponentPreview>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Zone", "Placement", "Contents"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Brand",      "Left",   "Logo mark + product name. Links to home. Never omit on desktop."],
                ["Primary nav","Center / left of center", "3–7 top-level destinations. Active link uses accent-subtle background."],
                ["Search",     "Center or right", "Inline expand on focus (desktop) or icon-only that opens a full-screen overlay (mobile)."],
                ["Utility",    "Right",  "Notifications bell with unread dot, New/Create CTA, theme toggle."],
                ["User menu",  "Far right", "Avatar trigger. Dropdown shows name, email, profile, settings, sign out."],
                ["Hamburger",  "Far right (mobile only)", "Hides/shows the mobile drawer. Morphs to ✕ when open."],
              ].map(([zone, placement, contents], i) => (
                <tr key={zone} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{zone}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{placement}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{contents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Responsive */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Responsive behavior</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Breakpoint", "Primary nav", "Search", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["≥ 768px (md)", "Horizontal in bar",       "Expandable inline input", "All visible"],
                ["< 768px",      "Hidden — hamburger drawer", "Icon only",              "Avatar + hamburger only"],
              ].map(([bp, nav, search, actions], i) => (
                <tr key={bp} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{bp}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{nav}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{search}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{actions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Design decisions */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Design decisions</h2>
        <ul className="space-y-4 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            {
              title: "Top nav vs. sidebar",
              body: "Use a top navbar for apps with ≤ 6 destinations and a wide primary content area (dashboards, marketing tools). Use a sidebar when items exceed 6, destinations have sub-items, or vertical real estate is abundant (desktop-first apps).",
            },
            {
              title: "Active state subtlety",
              body: "The active link uses accent-subtle background (not a strong fill) so the bar doesn't compete with primary page content. The accent color alone carries enough weight.",
            },
            {
              title: "Search positioning",
              body: "An inline search bar that expands on focus saves space while remaining discoverable. If search is a primary action (e.g., documentation sites), give it more permanent width.",
            },
            {
              title: "User menu as a portal",
              body: "Render the user dropdown via createPortal to document.body so it is never clipped by overflow:hidden ancestors. Position it via getBoundingClientRect on open — the same approach as Tooltip and SplitButton.",
            },
            {
              title: "Mobile drawer, not modal",
              body: "The mobile nav slides down below the bar (not over the page content) for a lighter feel. It doesn't require a backdrop or focus trap because it is not a blocking overlay — users can still scroll the page behind it.",
            },
          ].map(({ title, body }) => (
            <li key={title} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 flex-shrink-0">→</span>
              <span><strong className="text-[rgb(var(--text-primary))]">{title}.</strong> {body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Wrap the navbar in a <nav> element with aria-label=\"Primary navigation\" so screen readers can landmark-navigate to it.",
            "The active link should have aria-current=\"page\". Never rely on visual style alone.",
            "The hamburger button must have aria-expanded and aria-controls pointing to the mobile drawer id.",
            "The user menu trigger needs aria-haspopup=\"menu\" and aria-expanded. The dropdown has role=\"menu\"; items have role=\"menuitem\".",
            "Keyboard: Tab moves through focusable items left-to-right. Escape closes any open dropdown and returns focus to its trigger.",
            "Don't put the skip-to-content link inside the navbar — place it as the very first focusable element on the page, above the navbar.",
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
