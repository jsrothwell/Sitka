"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import tokens from "@/tokens/tokens.json";

function Swatch({ step, hex }: { step: string; hex: string }) {
  const [copied, setCopied] = useState(false);

  const isLight = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 155;
  };

  const textColor = isLight(hex) ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)";

  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="group relative flex flex-col justify-end p-3 h-20 rounded-xl transition-transform hover:scale-105 hover:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent))]"
      style={{ backgroundColor: hex }}
      title={`${step} — ${hex}`}
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? (
          <Check className="w-3 h-3" style={{ color: textColor }} />
        ) : (
          <Copy className="w-3 h-3" style={{ color: textColor }} />
        )}
      </div>
      <span className="text-[10px] font-semibold" style={{ color: textColor }}>
        {step}
      </span>
      <span className="text-[9px] font-mono opacity-70" style={{ color: textColor }}>
        {hex}
      </span>
    </button>
  );
}

export function ColorPalette() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Brand</h2>
        <p className="text-[13px] text-[rgb(var(--text-secondary))] mb-4">
          The core palette. <code className="font-mono text-[rgb(var(--accent))]">brand.cyan</code> is the primary alert and reminder color.
        </p>
        <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
          {Object.entries(tokens.color.brand).map(([k, v]) => (
            <Swatch key={k} step={k} hex={(v as { $value: string }).$value} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Neutral</h2>
        <p className="text-[13px] text-[rgb(var(--text-secondary))] mb-4">
          True neutral grays — no color cast. Matches Sitka Design System standards.
        </p>
        <div className="grid grid-cols-5 md:grid-cols-13 gap-2">
          {Object.entries(tokens.color.neutral).map(([k, v]) => (
            <Swatch key={k} step={k} hex={(v as { $value: string }).$value} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Semantic</h2>
        <p className="text-[13px] text-[rgb(var(--text-secondary))] mb-4">
          Status colors with consistent meaning across the system.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(tokens.color.semantic).map(([k, v]) => {
            const hex = (v as { $value: string }).$value;
            return (
              <div key={k} className="flex items-center gap-3 p-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                <div className="w-10 h-10 rounded-lg flex-shrink-0 border border-black/10 dark:border-white/10" style={{ backgroundColor: hex }} />
                <div>
                  <div className="text-[13px] font-medium text-[rgb(var(--text-primary))] capitalize">{k}</div>
                  <code className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">{hex}</code>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Dark Mode Adaptation
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed">
          Sitka does not simply invert colors in dark mode. Each semantic token maps
          to a different step in the palette — lighter backgrounds become deeper darks,
          not their inverse. This preserves contrast ratios and the overall hierarchy.
        </p>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Token", "Light", "Dark"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { token: "--background", light: "neutral.50 (#fafafa)", dark: "neutral.950 (#0a0a0a)" },
                { token: "--surface", light: "neutral.0 (#ffffff)", dark: "neutral.900 (#171717)" },
                { token: "--border", light: "neutral.200 (#e5e5e5)", dark: "neutral.800 (#282828)" },
                { token: "--text-primary", light: "neutral.800 (#282828)", dark: "neutral.50 (#fafafa)" },
                { token: "--text-secondary", light: "neutral.500 (#747474)", dark: "neutral.400 (#a7a7ac)" },
                { token: "--accent", light: "brand.cyan (#00C0E8)", dark: "brand.cyan (#00C0E8)" },
              ].map((row, i) => (
                <tr key={row.token} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{row.token}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))] text-[12px]">{row.light}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))] text-[12px]">{row.dark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
