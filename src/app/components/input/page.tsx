import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Input } from "@/components/ui/Input";
import { Search, Mail, Eye, Lock } from "lucide-react";
import { InputMobileDemo } from "@/site/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Input" };

const PROPS = [
  {
    name: "label",
    type: "string",
    description: "Renders a <label> element associated with the input via id.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Subtle hint text shown below the input when there is no error.",
  },
  {
    name: "error",
    type: "string",
    description: "Error message. Switches border and ring to red and replaces helperText.",
  },
  {
    name: "inputSize",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Controls height, padding, and font size.",
  },
  {
    name: "leftIcon",
    type: "ReactNode",
    description: "Icon node rendered inside the left edge of the input.",
  },
  {
    name: "rightIcon",
    type: "ReactNode",
    description: "Icon node rendered inside the right edge of the input.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Dims the input and removes interaction.",
  },
];

const CODE = {
  react: {
    filename: "Input.tsx",
    code: `import { Input } from "@/components/ui/Input";
import { Search, Mail, Lock } from "lucide-react";

// Basic
<Input label="Email" placeholder="you@example.com" type="email" />

// With helper text
<Input
  label="Username"
  helperText="Must be 3–24 characters."
  placeholder="sitka_user"
/>

// Error state
<Input
  label="Password"
  error="Must be at least 8 characters."
  type="password"
  defaultValue="abc"
/>

// With icons
<Input
  label="Search"
  leftIcon={<Search className="w-4 h-4" />}
  placeholder="Search components…"
/>

<Input
  label="Email"
  leftIcon={<Mail className="w-4 h-4" />}
  rightIcon={<Lock className="w-3.5 h-3.5" />}
  placeholder="you@example.com"
  type="email"
/>

// Sizes
<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium" />
<Input inputSize="lg" placeholder="Large" />

// Disabled
<Input label="Read-only field" disabled defaultValue="Cannot edit this" />`,
  },
  html: {
    filename: "input.html",
    code: `<!-- Base input group -->
<div class="input-group">
  <label class="input-label" for="email">Email</label>
  <div class="input-wrap">
    <input class="input" id="email" type="email" placeholder="you@example.com" />
  </div>
</div>

<!-- Error state -->
<div class="input-group">
  <label class="input-label" for="pass">Password</label>
  <div class="input-wrap">
    <input class="input input-error" id="pass" type="password" value="abc" />
  </div>
  <p class="input-error-text">Must be at least 8 characters.</p>
</div>

<!-- With left icon -->
<div class="input-group">
  <label class="input-label" for="search">Search</label>
  <div class="input-wrap">
    <svg class="input-icon-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <input class="input input-has-left-icon" id="search" placeholder="Search…" />
  </div>
</div>

<style>
  .input-group { display: flex; flex-direction: column; gap: 6px; width: 100%; }

  .input-label {
    font-size: 12px;
    font-weight: 500;
    color: rgb(var(--text-primary));
  }

  .input-wrap { position: relative; display: flex; align-items: center; }

  .input {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    font-size: 13px;
    border-radius: 10px;
    border: 1px solid rgb(var(--border));
    background: rgb(var(--surface));
    color: rgb(var(--text-primary));
    outline: none;
    transition: border-color 150ms, box-shadow 150ms;
  }
  .input::placeholder { color: rgb(var(--text-tertiary)); }
  .input:focus {
    border-color: rgb(var(--accent));
    box-shadow: 0 0 0 3px rgb(var(--accent) / 0.15);
  }
  .input:disabled { opacity: 0.5; cursor: not-allowed; }
  .input-error:not(:focus) { border-color: rgba(248,113,113,0.6); }
  .input-error:focus {
    border-color: #f87171;
    box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
  }
  .input-error-text { font-size: 11px; color: #f87171; }

  .input-has-left-icon { padding-left: 36px; }

  .input-icon-left {
    position: absolute;
    left: 12px;
    width: 16px;
    height: 16px;
    stroke: rgb(var(--text-tertiary));
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
  }
</style>`,
  },
  swift: {
    filename: "SitkaInput.swift",
    code: `import SwiftUI

struct SitkaInput: View {
    let label: String
    @Binding var text: String
    var placeholder: String = ""
    var helperText: String? = nil
    var error: String? = nil
    var isDisabled: Bool = false
    var leftSystemImage: String? = nil
    var rightSystemImage: String? = nil

    @FocusState private var isFocused: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(label)
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(Color(UIColor.label))

            HStack(spacing: 8) {
                if let icon = leftSystemImage {
                    Image(systemName: icon)
                        .font(.system(size: 14))
                        .foregroundColor(Color(UIColor.tertiaryLabel))
                }

                TextField(placeholder, text: $text)
                    .font(.system(size: 13))
                    .disabled(isDisabled)
                    .focused($isFocused)

                if let icon = rightSystemImage {
                    Image(systemName: icon)
                        .font(.system(size: 13))
                        .foregroundColor(Color(UIColor.tertiaryLabel))
                }
            }
            .padding(.horizontal, 12)
            .frame(height: 40)
            .background(Color(UIColor.secondarySystemBackground))
            .cornerRadius(10)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(
                        error != nil
                            ? Color.red.opacity(0.6)
                            : isFocused
                                ? Color.accentColor
                                : Color(UIColor.separator),
                        lineWidth: 1
                    )
            )
            .shadow(
                color: isFocused
                    ? (error != nil ? Color.red : Color.accentColor).opacity(0.15)
                    : .clear,
                radius: 4
            )
            .opacity(isDisabled ? 0.5 : 1)

            if let err = error {
                Text(err)
                    .font(.system(size: 11))
                    .foregroundColor(.red)
            } else if let hint = helperText {
                Text(hint)
                    .font(.system(size: 11))
                    .foregroundColor(Color(UIColor.tertiaryLabel))
            }
        }
    }
}

// MARK: - Preview
#Preview {
    @Previewable @State var email = ""
    @Previewable @State var password = "abc"

    VStack(spacing: 16) {
        SitkaInput(label: "Email", text: $email,
                   placeholder: "you@example.com",
                   leftSystemImage: "envelope")
        SitkaInput(label: "Password", text: $password,
                   error: "Must be at least 8 characters.",
                   leftSystemImage: "lock")
    }
    .padding()
}`,
  },
  macos: {
    filename: "SitkaInput+macOS.swift",
    code: `import SwiftUI

// SitkaInput for macOS — AppKit color tokens and macOS focus ring.

struct SitkaInput: View {
    let label: String
    @Binding var text: String
    var placeholder: String = ""
    var helpText: String? = nil
    var error: String? = nil
    var leftSystemImage: String? = nil
    var isDisabled: Bool = false

    @FocusState private var isFocused: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(Color(.labelColor))

            HStack(spacing: 8) {
                if let icon = leftSystemImage {
                    Image(systemName: icon)
                        .font(.system(size: 13))
                        .foregroundColor(Color(.secondaryLabelColor))
                }
                TextField(placeholder, text: $text)
                    .textFieldStyle(.plain)
                    .font(.system(size: 13))
                    .focused($isFocused)
                    .disabled(isDisabled)
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 7)
            .background(Color(NSColor.controlBackgroundColor))
            .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 8, style: .continuous)
                    .stroke(
                        error != nil    ? Color.red :
                        isFocused       ? Color.accentColor :
                        Color(NSColor.separatorColor),
                        lineWidth: (error != nil || isFocused) ? 1.5 : 1
                    )
            )
            .opacity(isDisabled ? 0.45 : 1)

            if let error {
                Text(error).font(.system(size: 11)).foregroundColor(.red)
            } else if let help = helpText {
                Text(help).font(.system(size: 11)).foregroundColor(Color(.secondaryLabelColor))
            }
        }
    }
}

#Preview {
    @Previewable @State var email    = ""
    @Previewable @State var password = ""

    Form {
        SitkaInput(label: "Email",    text: $email,
                   placeholder: "you@example.com",
                   leftSystemImage: "envelope")
        SitkaInput(label: "Password", text: $password,
                   error: "Must be at least 8 characters.",
                   leftSystemImage: "lock")
    }
    .formStyle(.grouped)
    .padding()
    .frame(width: 360)
}`,
  },
};

export default function InputPage() {
  return (
    <div>
      <PageHeader
        title="Input"
        description="A labeled text field with built-in states for validation, icons, and helper text. Extends the native input element so all HTML attributes pass through."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview grid>
          <div className="w-72 flex flex-col gap-3">
            <Input label="Email" placeholder="you@example.com" type="email" />
            <Input
              label="Search"
              leftIcon={<Search className="w-4 h-4" />}
              placeholder="Search components…"
            />
            <Input
              label="Password"
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={<Eye className="w-3.5 h-3.5" />}
              type="password"
              defaultValue="secret"
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sizes</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Three sizes to fit any density — compact toolbars, standard forms, or prominent search bars.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-sm flex flex-col gap-3">
            <Input inputSize="sm" placeholder="Small — h-8" />
            <Input inputSize="md" placeholder="Medium — h-10" />
            <Input inputSize="lg" placeholder="Large — h-12" />
          </div>
        </ComponentPreview>
      </section>

      {/* Icons */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Icons</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Left icons set context; right icons signal supplementary actions or status.
          Both are pointer-events-none by default.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-sm flex flex-col gap-3">
            <Input
              placeholder="Search…"
              leftIcon={<Search className="w-4 h-4" />}
            />
            <Input
              placeholder="your@email.com"
              leftIcon={<Mail className="w-4 h-4" />}
              type="email"
            />
            <Input
              placeholder="Password"
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={<Eye className="w-3.5 h-3.5" />}
              type="password"
            />
          </div>
        </ComponentPreview>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">States</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Error replaces helperText and switches the ring to red. Disabled removes all interaction
          and dims to 50%.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-sm flex flex-col gap-3">
            <Input
              label="Username"
              helperText="3–24 characters, no spaces."
              placeholder="sitka_user"
            />
            <Input
              label="Email"
              error="That email is already taken."
              defaultValue="taken@example.com"
              type="email"
            />
            <Input
              label="API key"
              disabled
              defaultValue="sk_live_xxxxxxxxxxxxxx"
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Built with <code className="font-mono text-[13px] text-[rgb(var(--accent))]">forwardRef</code> so
          refs work transparently. All standard HTML input attributes are forwarded through.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Inputs on mobile trigger the virtual keyboard and interact directly with the OS input system. Getting these details right prevents zoom jank and missed taps.
        </p>
        <ComponentPreview className="mb-6">
          <InputMobileDemo />
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
                { scenario: "Prevent zoom on focus", guidance: "Keep font-size ≥ 16px on the <input> element. iOS zooms in when the font is smaller. The lg size meets this; md (13px) does not — add font-size: 16px in mobile CSS." },
                { scenario: "inputmode attribute", guidance: "Pass inputMode=\"email\" for emails, \"numeric\" or \"decimal\" for numbers, \"tel\" for phone numbers, and \"url\" for URLs. This surfaces the right virtual keyboard without changing validation type." },
                { scenario: "Full-width on mobile", guidance: "Inputs should be full-width (w-full) on small screens. Avoid fixed widths like w-72 in mobile layouts." },
                { scenario: "returnKeyType", guidance: "Use type=\"search\" for search fields — mobile browsers show a Search/Go key. For form fields followed by another input, iOS advances focus on Next automatically." },
                { scenario: "Autofill", guidance: "Add autocomplete attributes (\"email\", \"current-password\", \"given-name\", etc.) so iOS/Android Autofill and password managers work correctly." },
                { scenario: "Touch target height", guidance: "Use inputSize=\"md\" (h-10) or larger. The sm size (h-8 / 32px) is below the 44px guideline — only use it in dense UI where labels confirm context." },
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

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "The label prop auto-generates an id and wires the <label> htmlFor — never skip it for form inputs.",
            "Error strings are rendered in a <p> below the input; screen readers announce them on focus.",
            "Disabled inputs are excluded from tab order natively — no aria-disabled workaround needed.",
            "Icons are aria-hidden via pointer-events-none spans; they carry no semantic meaning.",
            "Focus ring uses focus-visible so it only appears on keyboard navigation.",
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
