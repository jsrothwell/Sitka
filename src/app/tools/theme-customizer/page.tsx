"use client";

import { useState, useEffect } from "react";
import { Copy, Download, RotateCcw, Check } from "lucide-react";
import { PageHeader } from "@/components/docs/PageHeader";

// ── Helpers ───────────────────────────────────────────────────────────

function hexToTriple(hex: string): string {
  const h = hex.replace("#", "").padEnd(6, "0");
  const r = parseInt(h.slice(0, 2), 16) || 0;
  const g = parseInt(h.slice(2, 4), 16) || 0;
  const b = parseInt(h.slice(4, 6), 16) || 0;
  return `${r} ${g} ${b}`;
}

function hexToRgbFull(hex: string): string {
  const h = hex.replace("#", "").padEnd(6, "0");
  const r = parseInt(h.slice(0, 2), 16) || 0;
  const g = parseInt(h.slice(2, 4), 16) || 0;
  const b = parseInt(h.slice(4, 6), 16) || 0;
  return `rgb(${r}, ${g}, ${b})`;
}

// ── Token schema ──────────────────────────────────────────────────────

type TokenType = "color" | "full-color" | "px";

interface TokenDef {
  label: string;
  cssVar: string;
  type: TokenType;
  defaultVal: string;
  min?: number;
  max?: number;
}

interface TokenGroup {
  label: string;
  tokens: TokenDef[];
}

const TOKEN_GROUPS: TokenGroup[] = [
  {
    label: "Brand · Accent",
    tokens: [
      { label: "Accent",        cssVar: "--accent",        type: "color", defaultVal: "#00c0e8" },
      { label: "Accent Hover",  cssVar: "--accent-hover",  type: "color", defaultVal: "#00a0c8" },
      { label: "Accent Subtle", cssVar: "--accent-subtle", type: "color", defaultVal: "#00262e" },
      { label: "Accent Muted",  cssVar: "--accent-muted",  type: "color", defaultVal: "#004856" },
    ],
  },
  {
    label: "Surfaces",
    tokens: [
      { label: "Background",     cssVar: "--background",    type: "color", defaultVal: "#09090c" },
      { label: "Surface",        cssVar: "--surface",        type: "color", defaultVal: "#0d0d11" },
      { label: "Surface Raised", cssVar: "--surface-raised", type: "color", defaultVal: "#16161c" },
      { label: "Surface Hover",  cssVar: "--surface-hover",  type: "color", defaultVal: "#202028" },
    ],
  },
  {
    label: "Text",
    tokens: [
      { label: "Primary",   cssVar: "--text-primary",   type: "color", defaultVal: "#f2f2f6" },
      { label: "Secondary", cssVar: "--text-secondary",  type: "color", defaultVal: "#9b9baa" },
      { label: "Tertiary",  cssVar: "--text-tertiary",   type: "color", defaultVal: "#646473" },
    ],
  },
  {
    label: "Borders",
    tokens: [
      { label: "Border",        cssVar: "--border",        type: "color", defaultVal: "#262630" },
      { label: "Border Subtle", cssVar: "--border-subtle", type: "color", defaultVal: "#1a1a21" },
    ],
  },
  {
    label: "Navigation",
    tokens: [
      { label: "Active Link", cssVar: "--nav-active-color", type: "full-color", defaultVal: "#6366f1" },
    ],
  },
  {
    label: "Shape",
    tokens: [
      { label: "Radius SM", cssVar: "--radius-sm", type: "px", defaultVal: "4",  min: 0, max: 24 },
      { label: "Radius",    cssVar: "--radius",    type: "px", defaultVal: "6",  min: 0, max: 24 },
      { label: "Radius MD", cssVar: "--radius-md", type: "px", defaultVal: "10", min: 0, max: 32 },
      { label: "Radius LG", cssVar: "--radius-lg", type: "px", defaultVal: "16", min: 0, max: 48 },
    ],
  },
];

const FONT_OPTIONS: { value: string; label: string; stack: string }[] = [
  { value: "default",      label: "Inter (default)",    stack: "" },
  { value: "geist",        label: "Geist Sans",         stack: "'Geist', system-ui, sans-serif" },
  { value: "dm-sans",      label: "DM Sans",            stack: "'DM Sans', system-ui, sans-serif" },
  { value: "plus-jakarta", label: "Plus Jakarta Sans",  stack: "'Plus Jakarta Sans', system-ui, sans-serif" },
  { value: "ibm-plex",     label: "IBM Plex Sans",      stack: "'IBM Plex Sans', system-ui, sans-serif" },
  { value: "system-ui",    label: "System UI",          stack: "system-ui, -apple-system, sans-serif" },
];

const LS_KEY = "sitka-theme-customizer-v1";

function getDefaults(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const g of TOKEN_GROUPS) for (const t of g.tokens) out[t.cssVar] = t.defaultVal;
  return out;
}

function generateCSS(values: Record<string, string>, font: string): string {
  const defaults = getDefaults();
  const lines: string[] = [];

  for (const g of TOKEN_GROUPS) {
    for (const t of g.tokens) {
      const val = values[t.cssVar] ?? t.defaultVal;
      if (val === defaults[t.cssVar]) continue;
      if (t.type === "color") lines.push(`  ${t.cssVar}: ${hexToTriple(val)};`);
      else if (t.type === "full-color") lines.push(`  ${t.cssVar}: ${hexToRgbFull(val)};`);
      else if (t.type === "px") lines.push(`  ${t.cssVar}: ${val}px;`);
    }
  }

  const fontOption = FONT_OPTIONS.find(f => f.value === font);
  const fontLine = fontOption?.stack ? `\nhtml, body { font-family: ${fontOption.stack}; }` : "";

  if (lines.length === 0 && !fontLine) {
    return "/* No changes from defaults — all tokens match the Sitka baseline. */";
  }

  const rootBlock = lines.length > 0 ? `:root {\n${lines.join("\n")}\n}` : "";
  return `/* Sitka Child Theme — generated by Theme Customizer */\n\n${rootBlock}${fontLine}`.trim();
}

// ── Sub-components ────────────────────────────────────────────────────

function TokenControl({
  token,
  value,
  onChange,
}: {
  token: TokenDef;
  value: string;
  onChange: (v: string) => void;
}) {
  const isColor = token.type === "color" || token.type === "full-color";
  return (
    <div className="flex items-center gap-2">
      <label
        className="text-[12px] text-[rgb(var(--text-secondary))] flex-1 min-w-0 truncate"
        title={token.label}
      >
        {token.label}
      </label>
      {isColor && (
        <div className="flex items-center gap-1.5 shrink-0">
          <input
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-6 h-6 rounded cursor-pointer border border-[rgb(var(--border))]"
            style={{ padding: "1px", backgroundColor: "rgb(var(--surface-raised))" }}
          />
          <input
            type="text"
            value={value}
            onChange={e => {
              const v = e.target.value;
              if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v.length === 7 ? v : value);
            }}
            className="w-[68px] font-mono text-[11px] rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] px-1.5 py-1 focus:outline-none focus:border-[rgb(var(--accent))]"
          />
        </div>
      )}
      {token.type === "px" && (
        <div className="flex items-center gap-2 shrink-0">
          <input
            type="range"
            min={token.min ?? 0}
            max={token.max ?? 32}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-14"
            style={{ accentColor: "rgb(var(--accent))" }}
          />
          <span className="font-mono text-[11px] text-[rgb(var(--text-tertiary))] w-8 text-right tabular-nums">
            {value}px
          </span>
        </div>
      )}
    </div>
  );
}

function KitchenSink() {
  const [inputVal, setInputVal] = useState("Sitka design");
  const [checked, setChecked] = useState(true);
  const [focused, setFocused] = useState(false);

  return (
    <section>
      <p className="label-mono mb-4">Live Preview</p>
      <div
        className="rounded-[var(--radius-lg)] border overflow-hidden"
        style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--background))" }}
      >
        {/* Mini header */}
        <div
          className="flex items-center gap-4 px-5 border-b"
          style={{ height: "44px", backgroundColor: "rgb(var(--surface))", borderColor: "rgb(var(--border))" }}
        >
          <span className="font-semibold text-[13px]" style={{ color: "var(--nav-active-color)" }}>
            Sitka
          </span>
          {["Components", "Foundations", "Tokens"].map(s => (
            <span key={s} className="text-[12px]" style={{ color: "rgb(var(--text-tertiary))" }}>{s}</span>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgb(var(--accent))" }} />
            <span className="text-[11px] font-medium" style={{ color: "rgb(var(--accent))" }}>
              Custom theme
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-7">
          {/* Typography */}
          <div>
            <h3
              className="font-bold mb-1.5 leading-tight"
              style={{ fontSize: "20px", letterSpacing: "-0.02em", color: "rgb(var(--text-primary))" }}
            >
              The quick brown fox
            </h3>
            <p className="text-[13px] leading-relaxed" style={{ color: "rgb(var(--text-secondary))", maxWidth: "440px" }}>
              Sitka bridges engineering and design with a single source of truth — consistent, accessible, and built to scale.
            </p>
          </div>

          {/* Buttons */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "rgb(var(--text-tertiary))" }}>Buttons</p>
            <div className="flex flex-wrap gap-2">
              <button
                className="px-4 py-2 text-[13px] font-semibold rounded-[var(--radius)] transition-standard"
                style={{ backgroundColor: "rgb(var(--accent))", color: "rgb(var(--background))" }}
              >
                Primary
              </button>
              <button
                className="px-4 py-2 text-[13px] font-medium rounded-[var(--radius)] border transition-standard"
                style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--surface-raised))", color: "rgb(var(--text-primary))" }}
              >
                Secondary
              </button>
              <button
                className="px-4 py-2 text-[13px] font-medium rounded-[var(--radius)] transition-standard"
                style={{ color: "rgb(var(--text-secondary))" }}
              >
                Ghost
              </button>
              <button
                className="px-4 py-2 text-[13px] font-medium rounded-[var(--radius)] border transition-standard"
                style={{ borderColor: "rgba(239,68,68,0.3)", backgroundColor: "rgba(239,68,68,0.08)", color: "rgb(248 113 113)" }}
              >
                Destructive
              </button>
            </div>
          </div>

          {/* Badges */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "rgb(var(--text-tertiary))" }}>Badges</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Default", bg: "rgb(var(--surface-raised))",   text: "rgb(var(--text-secondary))", border: "rgb(var(--border))" },
                { label: "Accent",  bg: "rgb(var(--accent-subtle))",     text: "rgb(var(--accent))",         border: "rgb(var(--accent-muted))" },
                { label: "Success", bg: "rgba(16,185,129,0.1)",          text: "rgb(52,211,153)",             border: "rgba(16,185,129,0.3)" },
                { label: "Warning", bg: "rgba(245,158,11,0.1)",          text: "rgb(251,191,36)",             border: "rgba(245,158,11,0.3)" },
                { label: "Error",   bg: "rgba(239,68,68,0.1)",           text: "rgb(248,113,113)",            border: "rgba(239,68,68,0.3)" },
              ].map(b => (
                <span
                  key={b.label}
                  className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full border"
                  style={{ background: b.bg, color: b.text, borderColor: b.border }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Card */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "rgb(var(--text-tertiary))" }}>Card</p>
            <div
              className="rounded-[var(--radius-md)] border p-5 flex items-start justify-between gap-4"
              style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--surface-raised))" }}
            >
              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "rgb(var(--text-primary))" }}>Button component</p>
                <p className="text-[13px]" style={{ color: "rgb(var(--text-secondary))" }}>
                  Primary interactive element for confirmatory actions.
                </p>
              </div>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                style={{ background: "rgb(var(--accent-subtle))", color: "rgb(var(--accent))" }}
              >
                Gold Standard
              </span>
            </div>
          </div>

          {/* Form controls */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "rgb(var(--text-tertiary))" }}>Form Controls</p>
            <div className="flex items-center gap-4 flex-wrap">
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="rounded-[var(--radius)] text-[13px] px-3 py-2 focus:outline-none transition-standard"
                style={{
                  width: "200px",
                  border: `1px solid ${focused ? "rgb(var(--accent))" : "rgb(var(--border))"}`,
                  backgroundColor: "rgb(var(--surface-raised))",
                  color: "rgb(var(--text-primary))",
                }}
              />
              <label
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setChecked(c => !c)}
              >
                <div
                  className="w-4 h-4 rounded-[var(--radius-sm)] border flex items-center justify-center shrink-0 transition-standard"
                  style={{
                    borderColor: checked ? "rgb(var(--accent))" : "rgb(var(--border))",
                    backgroundColor: checked ? "rgb(var(--accent))" : "transparent",
                  }}
                >
                  {checked && (
                    <Check className="w-2.5 h-2.5" strokeWidth={3} style={{ color: "rgb(var(--background))" }} />
                  )}
                </div>
                <span className="text-[13px]" style={{ color: "rgb(var(--text-secondary))" }}>Remember me</span>
              </label>
            </div>
          </div>

          {/* Table */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "rgb(var(--text-tertiary))" }}>Table</p>
            <div
              className="rounded-[var(--radius-md)] border overflow-hidden text-[13px]"
              style={{ borderColor: "rgb(var(--border))" }}
            >
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "rgb(var(--surface-raised))", borderBottom: "1px solid rgb(var(--border))" }}>
                    {["Token", "Value", "Type"].map(h => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider"
                        style={{ color: "rgb(var(--text-tertiary))" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["--accent",       "#00c0e8", "Color"],
                    ["--background",   "#09090c", "Color"],
                    ["--radius",       "6px",     "Dimension"],
                    ["--text-primary", "#f2f2f6", "Color"],
                  ].map(([tok, val, type], i) => (
                    <tr
                      key={tok}
                      style={{
                        backgroundColor: i % 2 === 0 ? "rgb(var(--surface))" : "rgb(var(--background))",
                        borderBottom: "1px solid rgb(var(--border-subtle))",
                      }}
                    >
                      <td className="px-4 py-2.5 font-mono text-[12px]" style={{ color: "rgb(var(--accent))" }}>{tok}</td>
                      <td className="px-4 py-2.5 font-mono text-[12px]" style={{ color: "rgb(var(--text-primary))" }}>{val}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgb(var(--text-secondary))" }}>{type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CSSExport({
  css,
  onCopy,
  onDownload,
  copied,
}: {
  css: string;
  onCopy: () => void;
  onDownload: () => void;
  copied: boolean;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <p className="label-mono">CSS Export</p>
        <div className="flex items-center gap-2">
          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-[var(--radius)] border transition-standard"
            style={{
              borderColor: "rgb(var(--border))",
              backgroundColor: "rgb(var(--surface-raised))",
              color: copied ? "rgb(var(--accent))" : "rgb(var(--text-secondary))",
            }}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-[var(--radius)] border transition-standard"
            style={{
              borderColor: "rgb(var(--border))",
              backgroundColor: "rgb(var(--surface-raised))",
              color: "rgb(var(--text-secondary))",
            }}
          >
            <Download className="w-3.5 h-3.5" />
            Download .css
          </button>
        </div>
      </div>
      <pre
        className="rounded-[var(--radius-md)] border overflow-x-auto font-mono text-[12px] leading-relaxed"
        style={{
          borderColor: "rgb(var(--border))",
          backgroundColor: "rgb(var(--surface-raised))",
          color: "rgb(var(--text-secondary))",
          padding: "1.25rem 1.5rem",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {css}
      </pre>
      <p className="mt-2 text-[12px]" style={{ color: "rgb(var(--text-tertiary))" }}>
        Import this file after{" "}
        <code
          className="font-mono px-1 py-0.5 rounded-[var(--radius-sm)]"
          style={{ backgroundColor: "rgb(var(--surface-raised))" }}
        >
          sitka-tokens.css
        </code>{" "}
        to override defaults without touching the core library.
      </p>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────

export default function ThemeCustomizerPage() {
  const [values, setValues] = useState<Record<string, string>>(getDefaults);
  const [font, setFont] = useState("default");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.values) setValues(prev => ({ ...prev, ...saved.values }));
        if (saved.font) setFont(saved.font);
      }
    } catch {}
  }, []);

  // Apply CSS vars to :root
  useEffect(() => {
    if (!mounted) return;
    const el = document.documentElement;
    for (const g of TOKEN_GROUPS) {
      for (const t of g.tokens) {
        const val = values[t.cssVar] ?? t.defaultVal;
        if (t.type === "color") el.style.setProperty(t.cssVar, hexToTriple(val));
        else if (t.type === "full-color") el.style.setProperty(t.cssVar, hexToRgbFull(val));
        else if (t.type === "px") el.style.setProperty(t.cssVar, val + "px");
      }
    }
    const fontOption = FONT_OPTIONS.find(f => f.value === font);
    document.body.style.fontFamily = fontOption?.stack ?? "";
  }, [values, font, mounted]);

  // Persist to localStorage
  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem(LS_KEY, JSON.stringify({ values, font })); } catch {}
  }, [values, font, mounted]);

  // Reset CSS vars on unmount
  useEffect(() => {
    return () => {
      const el = document.documentElement;
      for (const g of TOKEN_GROUPS) for (const t of g.tokens) el.style.removeProperty(t.cssVar);
      document.body.style.fontFamily = "";
    };
  }, []);

  const defaults = getDefaults();
  const hasChanges =
    Object.entries(values).some(([k, v]) => v !== defaults[k]) || font !== "default";

  function handleReset() {
    setValues(getDefaults());
    setFont("default");
    try { localStorage.removeItem(LS_KEY); } catch {}
  }

  const css = generateCSS(values, font);

  async function handleCopy() {
    try { await navigator.clipboard.writeText(css); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitka-child-theme.css";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        title="Theme Customizer"
        description="Adjust design tokens live and export a CSS child theme for your own project."
      />

      {hasChanges && (
        <div
          className="mb-6 flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border"
          style={{ borderColor: "rgb(var(--accent-muted))", backgroundColor: "rgb(var(--accent-subtle))" }}
        >
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "rgb(var(--accent))" }} />
          <p className="text-[13px] font-medium flex-1" style={{ color: "rgb(var(--accent))" }}>
            Custom theme active
          </p>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-[12px] transition-standard"
            style={{ color: "rgb(var(--text-tertiary))" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgb(var(--text-primary))")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgb(var(--text-tertiary))")}
          >
            <RotateCcw className="w-3 h-3" />
            Reset to defaults
          </button>
        </div>
      )}

      <div className="flex gap-8 items-start">
        {/* ── Controls sidebar ── */}
        <aside
          className="shrink-0 flex flex-col gap-6"
          style={{
            width: "252px",
            position: "sticky",
            top: "calc(var(--header-height) + 1.5rem)",
            maxHeight: "calc(100vh - var(--header-height) - 3rem)",
            overflowY: "auto",
            paddingBottom: "1rem",
          }}
        >
          {TOKEN_GROUPS.map(group => (
            <div key={group.label}>
              <p className="label-mono mb-3">{group.label}</p>
              <div className="flex flex-col gap-2.5">
                {group.tokens.map(token => (
                  <TokenControl
                    key={token.cssVar}
                    token={token}
                    value={values[token.cssVar] ?? token.defaultVal}
                    onChange={val => setValues(prev => ({ ...prev, [token.cssVar]: val }))}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Font family */}
          <div>
            <p className="label-mono mb-3">Typography</p>
            <div className="flex flex-col gap-1">
              <label className="text-[12px]" style={{ color: "rgb(var(--text-tertiary))" }}>
                Font Family
              </label>
              <select
                value={font}
                onChange={e => setFont(e.target.value)}
                className="rounded-[var(--radius)] border text-[13px] px-2.5 py-1.5 focus:outline-none"
                style={{
                  borderColor: "rgb(var(--border))",
                  backgroundColor: "rgb(var(--surface-raised))",
                  color: "rgb(var(--text-primary))",
                }}
              >
                {FONT_OPTIONS.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
              <p className="text-[11px] mt-1" style={{ color: "rgb(var(--text-tertiary))" }}>
                Font must be loaded separately in your project.
              </p>
            </div>
          </div>
        </aside>

        {/* ── Main panel ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          <KitchenSink />
          <CSSExport css={css} onCopy={handleCopy} onDownload={handleDownload} copied={copied} />
        </div>
      </div>
    </div>
  );
}
