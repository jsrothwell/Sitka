import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { SplitButtonDemo, SplitButtonSizesDemo } from "@/components/docs/SplitButtonDemo";
import { SplitButtonMobileDemo } from "@/components/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Split Button" };

const PROPS = [
  { name: "label",     type: "string",              description: "Label for the primary action button." },
  { name: "onClick",   type: "() => void",           description: "Handler for the primary action." },
  { name: "items",     type: "SplitButtonItem[]",    description: "Menu items shown in the dropdown." },
  { name: "variant",   type: '"primary" | "secondary" | "ghost" | "danger" | "glass"', default: '"primary"', description: "Visual style — matches Button variants." },
  { name: "size",      type: '"sm" | "md" | "lg"',  default: '"md"', description: "Height and padding — matches Button sizes." },
  { name: "leftIcon",  type: "ReactNode",            description: "Icon rendered to the left of the label." },
  { name: "disabled",  type: "boolean",              default: "false", description: "Disables both the action button and the chevron." },
  { name: "loading",   type: "boolean",              default: "false", description: "Disables interaction (loading state)." },
];

const ITEM_PROPS = [
  { name: "label",    type: "string",        description: "Menu item label." },
  { name: "icon",     type: "ReactNode",     description: "Optional icon rendered to the left." },
  { name: "onClick",  type: "() => void",   description: "Handler called when the item is selected." },
  { name: "disabled", type: "boolean",       description: "Grays out and disables the item." },
  { name: "danger",   type: "boolean",       description: "Renders the item in red — for destructive actions." },
];

const CODE = {
  react: {
    filename: "SplitButton.tsx",
    code: `import { SplitButton } from "@/components/ui/SplitButton";
import { Download, FileText, Archive } from "lucide-react";

<SplitButton
  label="Export"
  variant="secondary"
  leftIcon={<Download className="w-4 h-4" />}
  onClick={() => exportDefault()}
  items={[
    {
      label: "Export as CSV",
      icon: <FileText className="w-3.5 h-3.5" />,
      onClick: () => exportCSV(),
    },
    {
      label: "Export as JSON",
      icon: <FileText className="w-3.5 h-3.5" />,
      onClick: () => exportJSON(),
    },
    {
      label: "Delete export",
      icon: <Archive className="w-3.5 h-3.5" />,
      onClick: () => deleteExport(),
      danger: true,
    },
  ]}
/>`,
  },
  html: {
    filename: "split-button.html",
    code: `<div class="split-btn">
  <button class="split-btn-main btn btn-secondary">
    Export
  </button>
  <div class="split-btn-divider"></div>
  <button class="split-btn-chevron btn btn-secondary" aria-haspopup="menu" aria-expanded="false">
    <svg class="chevron-icon" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
  </button>
  <div class="split-btn-menu" role="menu" hidden>
    <button class="split-btn-item" role="menuitem">Export as CSV</button>
    <button class="split-btn-item" role="menuitem">Export as JSON</button>
    <button class="split-btn-item split-btn-item-danger" role="menuitem">Delete export</button>
  </div>
</div>

<style>
  .split-btn { position: relative; display: inline-flex; align-items: stretch; }

  .split-btn-main {
    border-radius: 8px 0 0 8px !important;
    border-right: none !important;
  }
  .split-btn-chevron {
    border-radius: 0 8px 8px 0 !important;
    border-left: none !important;
    padding: 0 8px;
  }
  .split-btn-divider {
    width: 1px;
    background: rgb(var(--border));
    align-self: center;
    height: 60%;
  }

  .chevron-icon {
    width: 14px; height: 14px;
    stroke: currentColor; fill: none; stroke-width: 2;
    transition: transform 150ms;
  }
  [aria-expanded="true"] .chevron-icon { transform: rotate(180deg); }

  .split-btn-menu {
    position: absolute;
    top: calc(100% + 4px); left: 0;
    min-width: 100%;
    background: rgb(var(--surface-raised));
    border: 1px solid rgb(var(--border));
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,.2);
    padding: 4px 0;
    z-index: 999;
  }
  .split-btn-item {
    display: flex; align-items: center; gap: 10px;
    width: 100%; padding: 8px 12px;
    font-size: 13px; text-align: left;
    background: none; border: none; cursor: pointer;
    color: rgb(var(--text-primary));
    transition: background 100ms;
  }
  .split-btn-item:hover { background: rgb(var(--surface)); }
  .split-btn-item-danger { color: #f87171; }
  .split-btn-item-danger:hover { background: rgba(248,113,113,.1); }
</style>`,
  },
  swift: {
    filename: "SitkaSplitButton.swift",
    code: `import SwiftUI

struct SplitButtonMenuItem: Identifiable {
    let id = UUID()
    let label: String
    let systemImage: String?
    let action: () -> Void
    var isDanger: Bool = false
}

struct SitkaSplitButton: View {
    let label: String
    let action: () -> Void
    let items: [SplitButtonMenuItem]
    var systemImage: String? = nil

    var body: some View {
        HStack(spacing: 0) {
            // Primary action
            Button(action: action) {
                HStack(spacing: 6) {
                    if let img = systemImage {
                        Image(systemName: img)
                            .font(.system(size: 13, weight: .medium))
                    }
                    Text(label)
                        .font(.system(size: 13, weight: .medium))
                }
                .padding(.horizontal, 14)
                .frame(height: 40)
                .background(Color(UIColor.secondarySystemBackground))
            }
            .buttonStyle(.plain)

            // Divider
            Rectangle()
                .fill(Color(UIColor.separator))
                .frame(width: 1, height: 20)

            // Dropdown trigger
            Menu {
                ForEach(items) { item in
                    Button(role: item.isDanger ? .destructive : .none) {
                        item.action()
                    } label: {
                        if let img = item.systemImage {
                            Label(item.label, systemImage: img)
                        } else {
                            Text(item.label)
                        }
                    }
                }
            } label: {
                Image(systemName: "chevron.down")
                    .font(.system(size: 11, weight: .medium))
                    .frame(width: 32, height: 40)
                    .background(Color(UIColor.secondarySystemBackground))
            }
            .menuStyle(.borderlessButton)
        }
        .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 10, style: .continuous)
                .stroke(Color(UIColor.separator), lineWidth: 1)
        )
    }
}

#Preview {
    SitkaSplitButton(
        label: "Export",
        action: { },
        items: [
            SplitButtonMenuItem(label: "Export as CSV",  systemImage: "doc.text",  action: { }),
            SplitButtonMenuItem(label: "Export as JSON", systemImage: "doc.text",  action: { }),
            SplitButtonMenuItem(label: "Delete export",  systemImage: "trash",     action: { }, isDanger: true),
        ],
        systemImage: "square.and.arrow.up"
    )
    .padding()
}`,
  },
};

export default function SplitButtonPage() {
  return (
    <div>
      <PageHeader
        title="Split Button"
        description="A compound control that combines a primary action with a dropdown of secondary actions. The left segment triggers the default action immediately; the right chevron reveals the full menu."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <SplitButtonDemo />
        </ComponentPreview>
      </section>

      {/* When to use */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">When to use</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          A split button collapses a group of related actions into a single control when one action
          is clearly the default. It reduces visual clutter without hiding important secondary paths.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Use a split button when…", "Use separate buttons when…"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["One action is clearly primary",        "Actions are equally weighted"],
                ["Secondary actions are rarely needed",  "Users need to see all options at a glance"],
                ["Space is constrained",                 "Actions have different destructive risk levels"],
                ["Deploy, export, or send patterns",     "You have more than ~5 secondary actions"],
              ].map(([yes, no], i) => (
                <tr key={i} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{yes}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sizes</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          All three Button sizes. The chevron segment width scales proportionally.
        </p>
        <ComponentPreview>
          <SplitButtonSizesDemo />
        </ComponentPreview>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The dropdown is portaled to{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">document.body</code> via{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">createPortal</code> — it
          is never clipped by{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">overflow: hidden</code>{" "}
          ancestors. Position is computed from{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">getBoundingClientRect</code>{" "}
          on open. Click-outside dismissal is wired via a{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">mousedown</code>{" "}
          listener on{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">document</code>.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">SplitButton props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">SplitButtonItem</h2>
        <PropsTable props={ITEM_PROPS} />
      </section>

      {/* Accessibility */}
      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Split buttons have two small adjacent tap targets — the primary action and the chevron — which can be error-prone on touch. Adapt the layout for narrow screens.
        </p>
        <ComponentPreview className="mb-6">
          <SplitButtonMobileDemo />
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
                { scenario: "Chevron tap target", guidance: "The divider + chevron section should be at least 44px wide on mobile — wider than the default 32px. Consider a separate touch target area that expands beyond the visible chevron." },
                { scenario: "Simplify on mobile", guidance: "If the secondary actions are rarely used, hide the split on mobile and show only the primary action. Put secondary actions in a separate overflow menu (⋯) in the toolbar." },
                { scenario: "Dropdown positioning", guidance: "On mobile, the dropdown can be clipped by the bottom of the screen. Position it above the button when there is less than 200px of space below." },
                { scenario: "Full-width variant", guidance: "In bottom action bars, a full-width split button works well: left ~80% is the primary action, right ~20% is the chevron. Divide with a 1px vertical separator." },
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
            "The chevron button has aria-haspopup=\"menu\" and aria-expanded so screen readers announce it as a menu trigger.",
            "The dropdown has role=\"menu\"; each item has role=\"menuitem\".",
            "Keyboard: Enter/Space on the chevron opens the menu. Arrow keys move between items. Escape closes.",
            "The primary action and the chevron are separate focusable elements — Tab visits them independently.",
            "Danger items should describe what they do in plain language, not just label them \"Delete\".",
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
