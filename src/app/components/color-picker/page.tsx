"use client";

import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { useState } from "react";
import { Check } from "lucide-react";

const PALETTE = [
  { label: "Coral",    value: "#FF6B35" },
  { label: "Crimson",  value: "#EF4444" },
  { label: "Rose",     value: "#F43F5E" },
  { label: "Violet",   value: "#8B5CF6" },
  { label: "Indigo",   value: "#6366F1" },
  { label: "Blue",     value: "#3B82F6" },
  { label: "Cyan",     value: "#06B6D4" },
  { label: "Teal",     value: "#14B8A6" },
  { label: "Emerald",  value: "#10B981" },
  { label: "Lime",     value: "#84CC16" },
  { label: "Amber",    value: "#F59E0B" },
  { label: "Stone",    value: "#78716C" },
];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function accessibleForeground(bgHex: string): string {
  const lum = luminance(bgHex);
  return lum > 0.179 ? "#000000" : "#FFFFFF";
}

function isValidHex(s: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(s);
}

const PROPS = [
  {
    name: "value",
    type: "string",
    description: "Current selected colour as a hex string (#RRGGBB).",
  },
  {
    name: "onChange",
    type: "(hex: string) => void",
    description: "Callback fired with a valid hex string when the selection changes.",
  },
  {
    name: "palette",
    type: "Array<{ label: string; value: string }>",
    description: "Predefined swatches shown in the grid. Defaults to the Sitka brand palette.",
  },
  {
    name: "allowCustom",
    type: "boolean",
    default: "true",
    description: "Shows the hex input field for custom colours.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Controls swatch and picker dimensions.",
  },
];

const CODE = {
  react: {
    filename: "ColorPicker.tsx",
    code: `"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const PALETTE = [
  { label: "Coral",   value: "#FF6B35" },
  { label: "Indigo",  value: "#6366F1" },
  { label: "Blue",    value: "#3B82F6" },
  { label: "Emerald", value: "#10B981" },
  { label: "Amber",   value: "#F59E0B" },
  // … add more as needed
];

function accessibleForeground(bgHex: string): string {
  const { r, g, b } = hexToRgb(bgHex);
  const lum = 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
  return lum > 0.179 ? "#000" : "#fff";
}

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  palette?: Array<{ label: string; value: string }>;
  allowCustom?: boolean;
}

export function ColorPicker({
  value,
  onChange,
  palette = PALETTE,
  allowCustom = true,
}: ColorPickerProps) {
  const [hex, setHex] = useState(value);

  function handleSwatchClick(color: string) {
    setHex(color);
    onChange(color);
  }

  function handleHexInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setHex(raw);
    if (/^#[0-9A-Fa-f]{6}$/.test(raw)) {
      onChange(raw);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Swatch grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
        {palette.map((swatch) => (
          <button
            key={swatch.value}
            title={swatch.label}
            onClick={() => handleSwatchClick(swatch.value)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: swatch.value,
              border: value === swatch.value
                ? \`3px solid \${accessibleForeground(swatch.value)}\`
                : "2px solid transparent",
              cursor: "pointer",
              position: "relative",
              // Specular highlight on selected swatch (sfPillSpecular equivalent)
              boxShadow: value === swatch.value
                ? "inset 0 1px 0 rgba(255,255,255,0.25), 0 0 0 2px rgba(0,0,0,0.15)"
                : "inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            {value === swatch.value && (
              <span style={{ color: accessibleForeground(swatch.value), display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Hex input */}
      {allowCustom && (
        <input
          type="text"
          value={hex}
          onChange={handleHexInput}
          placeholder="#FF6B35"
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgb(var(--border))",
            background: "rgb(var(--surface-raised))",
            color: "rgb(var(--text-primary))",
            fontSize: 13,
            fontFamily: "monospace",
          }}
        />
      )}

      {/* Preview swatch */}
      <div
        style={{
          height: 40,
          borderRadius: 8,
          background: value,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 600,
          color: accessibleForeground(value),
          letterSpacing: "0.04em",
        }}
      >
        {value}
      </div>
    </div>
  );
}`,
  },
  html: {
    filename: "color-picker.html",
    code: `<div class="color-picker">
  <div class="color-picker__grid">
    <button class="color-swatch" data-color="#FF6B35" style="background:#FF6B35" aria-label="Coral"></button>
    <button class="color-swatch selected" data-color="#6366F1" style="background:#6366F1" aria-label="Indigo">
      <svg …><!-- checkmark --></svg>
    </button>
    <!-- … more swatches … -->
  </div>

  <input type="text" class="color-picker__hex-input" value="#6366F1" placeholder="#RRGGBB" />

  <div class="color-picker__preview" style="background:#6366F1;">
    #6366F1
  </div>
</div>

<style>
.color-picker__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}
.color-swatch {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
}
.color-swatch.selected {
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 0 0 2px rgba(0,0,0,0.15);
}
.color-picker__hex-input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgb(var(--border));
  background: rgb(var(--surface-raised));
  font-family: monospace;
  font-size: 13px;
}
.color-picker__preview {
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}
</style>`,
  },
  swift: {
    filename: "ColorPicker.swift",
    code: `import SwiftUI

struct BrandColorPicker: View {
    @Binding var selection: Color
    let palette: [Color]

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Swatch grid
            LazyVGrid(columns: Array(repeating: .init(.fixed(36)), count: 6), spacing: 8) {
                ForEach(palette, id: \\.self) { color in
                    Circle()
                        .fill(color)
                        .frame(width: 36, height: 36)
                        .overlay {
                            if color == selection {
                                Image(systemName: "checkmark")
                                    .font(.system(size: 14, weight: .bold))
                                    .foregroundStyle(color.accessibleForeground)
                            }
                        }
                        .overlay {
                            // sfPillSpecular equivalent
                            Circle()
                                .fill(
                                    LinearGradient(
                                        colors: [.white.opacity(0.25), .clear],
                                        startPoint: .top,
                                        endPoint: .center
                                    )
                                )
                        }
                        .clipShape(Circle())
                        .scaleEffect(color == selection ? 1.15 : 1)
                        .animation(.spring(response: 0.25), value: selection)
                        .onTapGesture { selection = color }
                }
            }

            // Preview
            RoundedRectangle(cornerRadius: 8)
                .fill(selection)
                .frame(height: 40)
                .overlay {
                    Text(selection.hexString)
                        .font(.system(size: 12, weight: .semibold, design: .monospaced))
                        .foregroundStyle(selection.accessibleForeground)
                }

            // Custom hex input (macOS / iPad)
            TextField("#RRGGBB", text: $hexInput)
                .font(.system(size: 13, design: .monospaced))
                .textFieldStyle(.roundedBorder)
                .onChange(of: hexInput) { _, new in
                    if let color = Color(hex: new) {
                        selection = color
                    }
                }
        }
    }
}`,
  },
  macos: {
    filename: "ColorPicker.swift",
    code: `// macOS — same SwiftUI component with ColorPicker as fallback for system panel
import SwiftUI

struct BrandColorPicker: View {
    @Binding var selection: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Predefined palette grid (same as iOS)
            // …

            // macOS also exposes the system colour panel as a secondary option
            ColorPicker("Custom colour", selection: $selection, supportsOpacity: false)
                .labelsHidden()
        }
    }
}`,
  },
};

function ColorPickerDemo() {
  const [selected, setSelected] = useState(PALETTE[0].value);
  const [hexInput, setHexInput] = useState(PALETTE[0].value);

  function handleSwatchClick(color: string) {
    setSelected(color);
    setHexInput(color);
  }

  function handleHexChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setHexInput(val);
    if (isValidHex(val)) setSelected(val);
  }

  const fg = accessibleForeground(selected);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
      <div
        style={{
          width: 280,
          padding: 20,
          borderRadius: 14,
          background: "rgb(var(--surface))",
          border: "1px solid rgb(var(--border))",
          boxShadow: "var(--shadow-card)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgb(var(--text-tertiary))", margin: 0 }}>
          Brand Colour
        </p>

        {/* Swatch grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
          {PALETTE.map((swatch) => {
            const swatchFg = accessibleForeground(swatch.value);
            const isSelected = selected === swatch.value;
            return (
              <button
                key={swatch.value}
                title={swatch.label}
                onClick={() => handleSwatchClick(swatch.value)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: swatch.value,
                  border: isSelected ? `2px solid ${swatchFg}` : "2px solid transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isSelected
                    ? "inset 0 1px 0 rgba(255,255,255,0.3), 0 0 0 2px rgba(0,0,0,0.1)"
                    : "inset 0 1px 0 rgba(255,255,255,0.18)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  transform: isSelected ? "scale(1.12)" : "scale(1)",
                }}
              >
                {isSelected && <Check size={14} color={swatchFg} strokeWidth={3} />}
              </button>
            );
          })}
        </div>

        {/* Hex input */}
        <input
          type="text"
          value={hexInput}
          onChange={handleHexChange}
          placeholder="#FF6B35"
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgb(var(--border))",
            background: "rgb(var(--surface-raised))",
            color: "rgb(var(--text-primary))",
            fontSize: 13,
            fontFamily: "monospace",
            outline: "none",
          }}
        />

        {/* Preview */}
        <div
          style={{
            height: 44,
            borderRadius: 10,
            background: selected,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "monospace",
            color: fg,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 6px rgba(0,0,0,0.15)",
            letterSpacing: "0.04em",
            transition: "background 0.2s",
          }}
        >
          {selected}
        </div>

        {/* Simulated UI preview */}
        <div
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid rgb(var(--border))",
            background: "rgb(var(--surface-raised))",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: selected, flexShrink: 0 }} />
          <span style={{ fontSize: 13, flex: 1 }}>Button preview</span>
          <button
            style={{
              padding: "5px 12px",
              borderRadius: 6,
              background: selected,
              color: fg,
              fontSize: 12,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Action
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ColorPickerPage() {
  return (
    <div>
      <PageHeader
        title="Color Picker"
        description="Allows users to select a brand or theme colour from a curated palette or a custom hex value. Includes the accessibleForeground algorithm to ensure legible text on any chosen colour."
        badge="New"
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Demo</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Select a swatch or type a hex value. The preview button updates in real time, demonstrating
          how the chosen colour renders with automatically-computed foreground text.
        </p>
        <ComponentPreview>
          <ColorPickerDemo />
        </ComponentPreview>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessible foreground algorithm</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          The picker always computes a legible foreground (black or white) for the selected
          colour using the WCAG relative luminance formula. This ensures button labels and preview
          text are always readable regardless of brand colour choice.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-4">
          <pre className="p-4 text-[13px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto bg-[rgb(var(--surface))]">
            <code>{`// WCAG 2.1 relative luminance → choose black or white
function accessibleForeground(bgHex: string): "#000000" | "#ffffff" {
  const { r, g, b } = hexToRgb(bgHex);
  const linearize = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const lum = 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
  return lum > 0.179 ? "#000000" : "#ffffff";
}`}</code>
          </pre>
        </div>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          This is the web equivalent of Warren&apos;s <code className="font-mono text-[11px] text-[rgb(var(--accent))]">accessibleForeground(on:)</code> Swift
          function. Use it whenever rendering text or icons on a user-chosen colour.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Dynamic brand token</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          When the user selects a colour, write it to the <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--brand-user</code> CSS variable
          on the document root. Other tokens resolve through it automatically:
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <pre className="p-4 text-[13px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto bg-[rgb(var(--surface))]">
            <code>{`// Apply user-chosen brand colour globally
document.documentElement.style.setProperty(
  "--brand-user",
  \`\${r} \${g} \${b}\`   // space-separated RGB triplet for composability
);

// In CSS — accent uses brand-user when set
:root {
  --accent: var(--brand-user, 255 107 53);  /* fallback to Sitka Coral */
}`}</code>
          </pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      <PropsTable props={PROPS} />
    </div>
  );
}
