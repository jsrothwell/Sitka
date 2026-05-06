import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Combobox" };

// ── SVG Demo ─────────────────────────────────────────────────────────────────

const P = {
  surface:  "#0d0d11",
  raised:   "#14141a",
  border:   "#262630",
  text:     "#f2f2f6",
  subtle:   "#9b9baa",
  tertiary: "#646473",
  accent:   "#60a5fa",
  green:    "#34a865",
};

function ComboboxDemo() {
  const W = 560, H = 200;
  const inputW = 220, inputH = 36;
  const inputX = 40, inputY = 30;
  const query = "Sea";
  const options = ["Seattle", "Search Engines", "Seafood Recipes"];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      <rect width={W} height={H} fill={P.surface} rx={12} />

      {/* Input field */}
      <rect x={inputX} y={inputY} width={inputW} height={inputH} rx={8} fill={P.raised} stroke={P.accent} strokeWidth={1.5} />

      {/* Search icon */}
      <circle cx={inputX + 14} cy={inputY + 18} r={5} fill="none" stroke={P.subtle} strokeWidth={1.5} />
      <line x1={inputX + 18} y1={inputY + 22} x2={inputX + 21} y2={inputY + 25} stroke={P.subtle} strokeWidth={1.5} strokeLinecap="round" />

      {/* Typed query */}
      <text x={inputX + 28} y={inputY + 23} fontSize={13} fill={P.text} fontWeight={500}>{query}</text>

      {/* Cursor */}
      <rect x={inputX + 28 + query.length * 8} y={inputY + 10} width={1.5} height={16} fill={P.accent} opacity={0.9} />

      {/* Clear button */}
      <text x={inputX + inputW - 14} y={inputY + 23} fontSize={14} fill={P.tertiary} textAnchor="middle">×</text>

      {/* Dropdown panel */}
      <rect x={inputX} y={inputY + inputH + 4} width={inputW} height={options.length * 32 + 8} rx={8} fill={P.raised} stroke={P.border} strokeWidth={1} />

      {options.map((opt, i) => {
        const optY = inputY + inputH + 4 + 4 + i * 32;
        const isActive = i === 0;
        const matchStart = opt.toLowerCase().indexOf(query.toLowerCase());
        const matchEnd = matchStart + query.length;
        return (
          <g key={opt}>
            {isActive && (
              <rect x={inputX + 4} y={optY} width={inputW - 8} height={28} rx={6} fill={P.accent} opacity={0.15} />
            )}
            {/* Pre-match text */}
            <text x={inputX + 12} y={optY + 18} fontSize={13} fill={isActive ? P.text : P.subtle} fontWeight={isActive ? 600 : 400}>
              {opt.slice(0, matchStart)}
            </text>
            {/* Highlighted match */}
            <text x={inputX + 12 + matchStart * 7.8} y={optY + 18} fontSize={13} fill={isActive ? P.accent : P.accent} fontWeight={700}>
              {opt.slice(matchStart, matchEnd)}
            </text>
            {/* Post-match text */}
            <text x={inputX + 12 + matchEnd * 7.8} y={optY + 18} fontSize={13} fill={isActive ? P.text : P.subtle} fontWeight={isActive ? 600 : 400}>
              {opt.slice(matchEnd)}
            </text>
          </g>
        );
      })}

      {/* Multi-select example (right side) */}
      <text x={320} y={28} fontSize={9} fill={P.tertiary} fontWeight={600} letterSpacing={0.5}>MULTI-SELECT VARIANT</text>

      {/* Input with chips */}
      <rect x={300} y={36} width={220} height={44} rx={8} fill={P.raised} stroke={P.border} strokeWidth={1} />

      {/* Selected chips */}
      {["React", "TypeScript"].map((chip, i) => (
        <g key={chip}>
          <rect x={308 + i * 80} y={44} width={72} height={28} rx={6} fill={P.accent} opacity={0.18} />
          <text x={316 + i * 80} y={62} fontSize={11} fill={P.accent} fontWeight={600}>{chip}</text>
          <text x={368 + i * 80} y={62} fontSize={13} fill={P.accent} opacity={0.6}>×</text>
        </g>
      ))}

      {/* Labels */}
      <text x={inputX + inputW / 2} y={H - 10} fontSize={9} fill={P.tertiary} textAnchor="middle" fontWeight={600} letterSpacing={0.5}>SINGLE-SELECT WITH SEARCH</text>
    </svg>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

const PROPS = [
  {
    name: "options",
    type: "Array<{ value: string; label: string; group?: string }>",
    description: "The full list of selectable options. Filtered client-side by default; pass onSearch to filter server-side.",
  },
  {
    name: "value",
    type: "string | string[]",
    description: "Controlled selected value. Pass an array to enable multi-select mode.",
  },
  {
    name: "onChange",
    type: "(value: string | string[]) => void",
    description: "Called when the selection changes.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Select…"',
    description: "Placeholder shown in the trigger when no value is selected.",
  },
  {
    name: "onSearch",
    type: "(query: string) => void",
    default: "undefined",
    description: "When provided, disables client-side filtering and calls this function on every keystroke so you can fetch server-side results.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Shows a spinner inside the dropdown while onSearch results are loading.",
  },
  {
    name: "maxSelected",
    type: "number",
    description: "In multi-select mode, caps the number of selected items. Disables remaining options when the cap is reached.",
  },
  {
    name: "clearable",
    type: "boolean",
    default: "true",
    description: "Shows an × button to clear the selection.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction and dims the control.",
  },
];

// ── Code ──────────────────────────────────────────────────────────────────────

const CODE = {
  react: {
    filename: "Combobox.tsx",
    code: `import { Combobox } from "@/components/ui/Combobox";

const LANGUAGES = [
  { value: "ts",   label: "TypeScript" },
  { value: "rs",   label: "Rust" },
  { value: "go",   label: "Go" },
  { value: "py",   label: "Python" },
  { value: "swift", label: "Swift" },
];

// Single select
const [lang, setLang] = useState("");

<Combobox
  options={LANGUAGES}
  value={lang}
  onChange={setLang}
  placeholder="Select a language…"
/>

// Multi-select
const [langs, setLangs] = useState<string[]>([]);

<Combobox
  options={LANGUAGES}
  value={langs}
  onChange={setLangs}
  placeholder="Pick languages…"
  maxSelected={3}
/>

// Server-side search
const [results, setResults] = useState(LANGUAGES);
const [loading, setLoading] = useState(false);

async function handleSearch(query: string) {
  setLoading(true);
  const data = await fetchLanguages(query);
  setResults(data);
  setLoading(false);
}

<Combobox
  options={results}
  value={lang}
  onChange={setLang}
  onSearch={handleSearch}
  loading={loading}
  placeholder="Search languages…"
/>`,
  },
  html: {
    filename: "combobox.html",
    code: `<!-- Native <datalist> — basic, no multi-select -->
<label for="lang-input">Language</label>
<input
  id="lang-input"
  list="lang-options"
  placeholder="Select a language…"
  autocomplete="off"
  class="input"
/>
<datalist id="lang-options">
  <option value="TypeScript" />
  <option value="Rust" />
  <option value="Go" />
  <option value="Python" />
  <option value="Swift" />
</datalist>

<!--
  For full combobox behaviour (grouped options, multi-select,
  async search, keyboard nav) use the Combobox web component
  or a library such as Floating UI + your own listbox logic.
  The ARIA pattern is:

  <div role="combobox" aria-expanded="true" aria-haspopup="listbox"
       aria-controls="lb" aria-autocomplete="list">
    <input type="text" id="cb-input" aria-activedescendant="opt-0" />
  </div>
  <ul id="lb" role="listbox">
    <li id="opt-0" role="option" aria-selected="true">TypeScript</li>
    <li id="opt-1" role="option" aria-selected="false">Rust</li>
  </ul>
-->`,
  },
  swift: {
    filename: "SitkaCombobox.swift",
    code: `import SwiftUI

struct ComboboxOption: Identifiable, Hashable {
    let id = UUID()
    let value: String
    let label: String
}

struct SitkaCombobox: View {
    let options: [ComboboxOption]
    @Binding var selected: ComboboxOption?
    var placeholder: String = "Select…"

    @State private var query = ""
    @State private var isExpanded = false

    private var filtered: [ComboboxOption] {
        query.isEmpty ? options : options.filter {
            $0.label.localizedCaseInsensitiveContains(query)
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(.secondary)
                    .font(.system(size: 13))

                TextField(placeholder, text: $query)
                    .font(.system(size: 13))
                    .onTapGesture { isExpanded = true }

                if !query.isEmpty {
                    Button { query = ""; selected = nil } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundColor(.secondary)
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 8)
            .background(Color(UIColor.secondarySystemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 8, style: .continuous)
                    .stroke(isExpanded ? Color.accentColor : Color(UIColor.separator), lineWidth: 1)
            )

            if isExpanded && !filtered.isEmpty {
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 2) {
                        ForEach(filtered) { opt in
                            Button {
                                selected = opt
                                query = opt.label
                                isExpanded = false
                            } label: {
                                Text(opt.label)
                                    .font(.system(size: 13, weight: selected == opt ? .semibold : .regular))
                                    .foregroundColor(selected == opt ? .accentColor : .primary)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .padding(.horizontal, 10)
                                    .padding(.vertical, 6)
                                    .background(selected == opt ? Color.accentColor.opacity(0.12) : .clear)
                                    .clipShape(RoundedRectangle(cornerRadius: 6, style: .continuous))
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(4)
                }
                .frame(maxHeight: 200)
                .background(Color(UIColor.secondarySystemBackground))
                .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                .shadow(color: .black.opacity(0.15), radius: 8, x: 0, y: 4)
            }
        }
    }
}`,
  },
  macos: {
    filename: "SitkaCombobox+macOS.swift",
    code: `import SwiftUI

// On macOS, use a Menu-based picker for simple single-select,
// or a SearchField + popover for full combobox behavior.

struct ComboboxOption: Identifiable, Hashable {
    let id = UUID()
    let value: String
    let label: String
}

// Full combobox with search field + popover dropdown
struct SitkaCombobox: View {
    let options: [ComboboxOption]
    @Binding var selected: ComboboxOption?
    var placeholder: String = "Select…"

    @State private var query = ""
    @State private var isExpanded = false

    private var filtered: [ComboboxOption] {
        query.isEmpty ? options : options.filter {
            $0.label.localizedCaseInsensitiveContains(query)
        }
    }

    var body: some View {
        HStack {
            Image(systemName: "magnifyingglass")
                .foregroundColor(Color(.secondaryLabelColor))
                .font(.system(size: 12))

            TextField(placeholder, text: $query)
                .textFieldStyle(.plain)
                .font(.system(size: 13))
                .onSubmit {
                    if let first = filtered.first {
                        selected = first
                        query = first.label
                        isExpanded = false
                    }
                }
                .onChange(of: query) { isExpanded = !query.isEmpty }

            if !query.isEmpty {
                Button { query = ""; selected = nil } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(Color(.secondaryLabelColor))
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 6)
        .background(Color(NSColor.controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 6, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 6, style: .continuous)
                .stroke(isExpanded ? Color.accentColor : Color(NSColor.separatorColor), lineWidth: 1)
        )
        .popover(isPresented: $isExpanded, arrowEdge: .bottom) {
            ScrollView {
                LazyVStack(alignment: .leading, spacing: 1) {
                    ForEach(filtered) { opt in
                        Button {
                            selected = opt
                            query = opt.label
                            isExpanded = false
                        } label: {
                            Text(opt.label)
                                .font(.system(size: 13, weight: selected == opt ? .semibold : .regular))
                                .foregroundColor(selected == opt ? .accentColor : Color(.labelColor))
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 5)
                                .background(selected == opt ? Color.accentColor.opacity(0.1) : Color.clear)
                                .clipShape(RoundedRectangle(cornerRadius: 4, style: .continuous))
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(6)
            }
            .frame(minWidth: 200, maxHeight: 220)
        }
    }
}

let languages = [
    ComboboxOption(value: "ts",    label: "TypeScript"),
    ComboboxOption(value: "rs",    label: "Rust"),
    ComboboxOption(value: "go",    label: "Go"),
    ComboboxOption(value: "py",    label: "Python"),
    ComboboxOption(value: "swift", label: "Swift"),
]

#Preview {
    @Previewable @State var selected: ComboboxOption? = nil

    SitkaCombobox(options: languages, selected: $selected, placeholder: "Select a language…")
        .frame(width: 240)
        .padding()
}`,
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ComboboxPage() {
  return (
    <div>
      <PageHeader
        title="Combobox"
        description="Searchable select with keyboard navigation, multi-select, grouped options, and async server-side filtering. Drop-in replacement for <select> wherever search is needed."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <div className="p-6" style={{ backgroundColor: P.surface, borderRadius: 12, width: "100%" }}>
            <ComboboxDemo />
          </div>
        </ComponentPreview>
      </section>

      {/* Modes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Modes</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Mode", "value type", "When to use"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { mode: "Single select",       type: "string",   use: "One value chosen from a long list (> 7 options). Prefer a native <select> for short lists." },
                { mode: "Multi-select",        type: "string[]", use: "Multiple values from the same list — tags, permissions, categories." },
                { mode: "Async search",        type: "string",   use: "Options fetched from the server on each keystroke — users, locations, large datasets." },
                { mode: "Free text + select",  type: "string",   use: "User can type a value that doesn't exist in the list (email CC field, custom tags)." },
              ].map((row, i) => (
                <tr key={row.mode} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))]">{row.mode}</td>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{row.type}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Keyboard navigation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Keyboard Navigation</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Key", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["↓ / ↑",    "Move focus through options"],
                ["↵",        "Select focused option; confirm free-text entry"],
                ["Esc",      "Close dropdown without selecting; clear query if already closed"],
                ["Tab",      "Close dropdown and move to next field"],
                ["Backspace","In multi-select: remove the last chip when the input is empty"],
                ["⌘A",       "In multi-select: select all visible options"],
              ].map(([key, action], i) => (
                <tr key={key} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3"><code className="font-mono text-[12px] text-[rgb(var(--accent))]">{key}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{action}</td>
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

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'The input has role="combobox", aria-expanded, aria-haspopup="listbox", aria-autocomplete="list", and aria-controls pointing to the listbox.',
            'Each option has role="option". The focused option is tracked via aria-activedescendant on the input, not a moved focus.',
            'Selected options in multi-select have aria-selected="true". Chips include a visually-hidden "Remove" label for screen readers.',
            "When async results load, announce the count to screen readers via a live region: '5 options available'.",
            "The dropdown is portaled to document.body so it's never clipped by overflow:hidden ancestors.",
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
