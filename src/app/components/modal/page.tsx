import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ModalDemo, ModalFormDemo } from "@/site/docs/ModalDemo";
import { ModalMobileDemo } from "@/site/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Modal" };

const PROPS = [
  {
    name: "open",
    type: "boolean",
    description: "Controls visibility. When false the modal unmounts completely.",
  },
  {
    name: "onClose",
    type: "() => void",
    description: "Called on Escape key, backdrop click, or close button press.",
  },
  {
    name: "title",
    type: "string",
    description: "Renders an <h2> in the header and wires aria-labelledby.",
  },
  {
    name: "description",
    type: "string",
    description: "Subtitle below the title. Wires aria-describedby.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Sets max-width: sm=384px, md=448px, lg=512px, xl=672px.",
  },
  {
    name: "footer",
    type: "ReactNode",
    description: "Action row rendered at the bottom with a top border.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Body content rendered between the header and footer.",
  },
];

const CODE = {
  react: {
    filename: "Modal.tsx",
    code: `import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

function DeleteDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete project
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm deletion"
        description="This action cannot be undone."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <p>All files and collaborators will be permanently removed.</p>
      </Modal>
    </>
  );
}`,
  },
  html: {
    filename: "modal.html",
    code: `<!-- Trigger -->
<button class="btn btn-danger" onclick="document.getElementById('modal').showModal()">
  Delete project
</button>

<!-- Modal using native <dialog> -->
<dialog id="modal" class="sitka-modal">
  <div class="modal-header">
    <div class="modal-titles">
      <h2 class="modal-title">Confirm deletion</h2>
      <p class="modal-description">This action cannot be undone.</p>
    </div>
    <button class="modal-close" onclick="document.getElementById('modal').close()" aria-label="Close">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
           fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6 6 18M6 6l12 12"/>
      </svg>
    </button>
  </div>

  <div class="modal-body">
    <p>All files and collaborators will be permanently removed.</p>
  </div>

  <div class="modal-footer">
    <button class="btn btn-ghost" onclick="document.getElementById('modal').close()">Cancel</button>
    <button class="btn btn-danger">Delete</button>
  </div>
</dialog>

<style>
  .sitka-modal {
    width: 100%;
    max-width: 448px;
    border: 1px solid rgb(var(--border));
    border-radius: 14px;
    background: rgb(var(--surface));
    box-shadow: 0 24px 64px rgba(0,0,0,.35);
    padding: 0;
  }
  .sitka-modal::backdrop {
    background: rgba(0,0,0,.5);
    backdrop-filter: blur(4px);
  }
  .modal-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 24px 24px 16px;
  }
  .modal-titles { flex: 1; }
  .modal-title {
    font-size: 16px;
    font-weight: 600;
    color: rgb(var(--text-primary));
    margin: 0;
  }
  .modal-description {
    margin: 4px 0 0;
    font-size: 13px;
    color: rgb(var(--text-secondary));
  }
  .modal-close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    color: rgb(var(--text-tertiary));
  }
  .modal-close:hover { background: rgb(var(--surface-raised)); color: rgb(var(--text-primary)); }
  .modal-body {
    padding: 0 24px 16px;
    font-size: 14px;
    color: rgb(var(--text-secondary));
  }
  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 24px;
    border-top: 1px solid rgb(var(--border-subtle));
  }
</style>`,
  },
  swift: {
    filename: "SitkaModal.swift",
    code: `import SwiftUI

struct SitkaModal<Content: View, Footer: View>: View {
    @Binding var isPresented: Bool
    let title: String
    var description: String? = nil
    @ViewBuilder let content: () -> Content
    @ViewBuilder let footer: () -> Footer

    var body: some View {
        ZStack {
            if isPresented {
                // Backdrop
                Color.black.opacity(0.5)
                    .ignoresSafeArea()
                    .onTapGesture { isPresented = false }

                // Panel
                VStack(alignment: .leading, spacing: 0) {
                    // Header
                    HStack(alignment: .top) {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(title)
                                .font(.system(size: 16, weight: .semibold))
                            if let desc = description {
                                Text(desc)
                                    .font(.system(size: 13))
                                    .foregroundColor(.secondary)
                            }
                        }
                        Spacer()
                        Button(action: { isPresented = false }) {
                            Image(systemName: "xmark")
                                .font(.system(size: 12, weight: .medium))
                                .foregroundColor(.secondary)
                                .padding(6)
                                .background(Color(UIColor.tertiarySystemFill))
                                .clipShape(RoundedRectangle(cornerRadius: 8))
                        }
                    }
                    .padding(24)

                    // Body
                    content()
                        .padding(.horizontal, 24)
                        .padding(.bottom, 16)

                    // Footer
                    Divider()
                    HStack {
                        Spacer()
                        footer()
                    }
                    .padding(16)
                }
                .background(Color(UIColor.secondarySystemBackground))
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                .shadow(color: .black.opacity(0.3), radius: 32, x: 0, y: 16)
                .padding(24)
                .frame(maxWidth: 448)
                .transition(.opacity.combined(with: .scale(scale: 0.96)))
            }
        }
        .animation(.spring(response: 0.25, dampingFraction: 0.85), value: isPresented)
    }
}

// MARK: - Preview
#Preview {
    @Previewable @State var show = true

    ZStack {
        Color.black.opacity(0.4).ignoresSafeArea()
        SitkaModal(isPresented: $show, title: "Confirm deletion",
                   description: "This action cannot be undone.") {
            Text("All files will be removed permanently.")
                .font(.system(size: 14))
                .foregroundColor(.secondary)
        } footer: {
            Button("Cancel") { show = false }
            Button("Delete") { show = false }
                .foregroundColor(.red)
        }
    }
}`,
  },
  macos: {
    filename: "SitkaModal+macOS.swift",
    code: `import SwiftUI

// On macOS, modals are presented as sheets attached to a window
// or as separate panels. SitkaModal uses SwiftUI's .sheet() on macOS
// rather than a full-screen overlay, matching HIG conventions.

struct SitkaModal<Content: View, Footer: View>: View {
    @Binding var isPresented: Bool
    let title: String
    var description: String? = nil
    @ViewBuilder let content: () -> Content
    @ViewBuilder let footer: () -> Footer

    var body: some View {
        // Trigger view — in real usage this would be a Button
        EmptyView()
            .sheet(isPresented: $isPresented) {
                VStack(alignment: .leading, spacing: 0) {
                    // Header
                    HStack(alignment: .top) {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(title)
                                .font(.system(size: 15, weight: .semibold))
                            if let desc = description {
                                Text(desc)
                                    .font(.system(size: 13))
                                    .foregroundColor(Color(.secondaryLabelColor))
                            }
                        }
                        Spacer()
                        Button { isPresented = false } label: {
                            Image(systemName: "xmark")
                                .font(.system(size: 11, weight: .medium))
                                .foregroundColor(Color(.secondaryLabelColor))
                                .padding(5)
                                .background(Color(NSColor.quaternaryLabelColor).opacity(0.15))
                                .clipShape(RoundedRectangle(cornerRadius: 6))
                        }
                        .buttonStyle(.plain)
                        .keyboardShortcut(.escape, modifiers: [])
                    }
                    .padding(20)

                    Divider()

                    content()
                        .padding(.horizontal, 20)
                        .padding(.vertical, 16)

                    Divider()

                    HStack {
                        Spacer()
                        footer()
                    }
                    .padding(16)
                }
                .background(Color(NSColor.windowBackgroundColor))
                .frame(minWidth: 400, maxWidth: 480)
            }
    }
}

#Preview {
    @Previewable @State var show = true

    Button("Open modal") { show = true }
        .overlay {
            SitkaModal(
                isPresented: $show,
                title: "Confirm deletion",
                description: "This action cannot be undone."
            ) {
                Text("All files will be removed permanently.")
                    .font(.system(size: 13))
                    .foregroundColor(Color(.secondaryLabelColor))
            } footer: {
                Button("Cancel") { show = false }
                Button("Delete", role: .destructive) { show = false }
            }
        }
        .padding()
}`,
  },
};

export default function ModalPage() {
  return (
    <div>
      <PageHeader
        title="Modal"
        description="A portal-based dialog that floats above all content. Supports keyboard dismissal, click-outside, four sizes, and composable header, body, and footer regions."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview grid>
          <ModalDemo />
        </ComponentPreview>
      </section>

      {/* Form modal */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Form modal</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Any content works inside the body. Inputs, lists, code blocks — the modal adapts to its
          content height up to 90vh, after which the body scrolls internally.
        </p>
        <ComponentPreview>
          <ModalFormDemo />
        </ComponentPreview>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          React: rendered via <code className="font-mono text-[13px] text-[rgb(var(--accent))]">createPortal</code> into{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">document.body</code> — never trapped
          inside overflow-hidden ancestors. HTML: uses the native{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">&lt;dialog&gt;</code> element with{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">::backdrop</code>.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Motion */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Motion</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Entry and exit should feel fast and purposeful, not decorative.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Phase", "Property", "Value", "Easing"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { phase: "Enter", property: "opacity", value: "0 → 1", easing: "200ms ease-out" },
                { phase: "Enter", property: "scale", value: "0.96 → 1", easing: "200ms ease-out" },
                { phase: "Exit", property: "opacity", value: "1 → 0", easing: "150ms ease-in" },
                { phase: "Exit", property: "scale", value: "1 → 0.96", easing: "150ms ease-in" },
                { phase: "Backdrop", property: "opacity", value: "0 → 0.5", easing: "200ms ease-out" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.phase}</td>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{row.property}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px]">{row.value}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]"><code className="font-mono text-[11px]">{row.easing}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          On mobile, modals compete with the virtual keyboard and limited screen real estate. The preferred mobile pattern is a bottom sheet, not a centered dialog.
        </p>
        <ComponentPreview className="mb-6">
          <ModalMobileDemo />
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
                { scenario: "Layout on mobile", guidance: "Use w-full max-w-none on small screens so the modal fills the viewport width. Set max-height: 90dvh with overflow-y: auto to handle tall content." },
                { scenario: "Bottom sheet", guidance: "On mobile, slide the panel up from the bottom edge (translate-y transition) instead of scaling from center. Add a 4px drag handle at the top for discoverability." },
                { scenario: "Virtual keyboard", guidance: "When the modal contains an input, the virtual keyboard pushes content up. Use position: fixed and env(safe-area-inset-bottom) to prevent the close button from being hidden." },
                { scenario: "Swipe to dismiss", guidance: "Allow a downward swipe gesture to dismiss. Track touchstart/touchmove delta; dismiss when drag exceeds 120px or velocity exceeds 0.5px/ms." },
                { scenario: "Safe area insets", guidance: "Add padding-bottom: env(safe-area-inset-bottom) to the modal footer to clear the iPhone home indicator and Android gesture bar." },
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
            'role="dialog" and aria-modal="true" are applied automatically — screen readers announce the overlay context.',
            "aria-labelledby and aria-describedby are wired to the title and description when provided.",
            "Escape key always dismisses. Body scroll is locked while open.",
            "Focus should be moved into the modal on open and restored to the trigger on close (implement with useEffect + ref).",
            "Backdrop click dismisses via pointer event on the overlay, not the panel, so accidental interior clicks are safe.",
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
