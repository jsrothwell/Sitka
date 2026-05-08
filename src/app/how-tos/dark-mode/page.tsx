import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/docs/PageHeader";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "How to design for dark mode" };

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center shrink-0">
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
          style={{ background: "rgba(52,168,101,0.12)", color: "var(--nav-active-color)" }}
        >
          {n}
        </span>
        <div className="w-px flex-1 mt-2" style={{ background: "rgb(var(--border))" }} />
      </div>
      <div className="pb-10 flex-1 min-w-0">
        <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-3">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function CallOut({ type, children }: { type: "info" | "warning"; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4 my-4"
      style={{
        background: type === "info" ? "rgba(52,168,101,0.07)" : "rgba(245,158,11,0.07)",
        border: `1px solid ${type === "info" ? "rgba(52,168,101,0.25)" : "rgba(245,158,11,0.25)"}`,
      }}
    >
      <p className="text-[12px] leading-relaxed" style={{ color: type === "info" ? "rgb(33,150,83)" : "rgb(180,120,0)" }}>
        {children}
      </p>
    </div>
  );
}

export default function HowToDarkModePage() {
  return (
    <div>
      <Link
        href="/how-tos"
        className="inline-flex items-center gap-1.5 text-[12px] text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] mb-8 transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        How-tos
      </Link>

      <PageHeader
        title="How to design for dark mode"
        description="Apply the Sitka colour token set correctly in dark contexts. This guide covers surface stepping, elevation, contrast validation, and the most common dark-mode mistakes."
      />

      <div className="mb-8 p-5 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">Objective</p>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
          By the end of this guide you will be able to apply the Sitka dark-mode token set consistently, validate contrast pairings in both themes, and avoid the four most common dark-mode design failures.
        </p>
      </div>

      <div>
        <Step n={1} title="Use tokens — never raw hex values">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-3">
            Every colour in Sitka is available as a CSS custom property. When you use a token, the dark and light values swap automatically. When you hardcode a hex, they don't.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded-lg p-3.5 border" style={{ borderColor: "rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.04)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgb(220,38,38)" }}>✗ Avoid</p>
              <code className="text-[12px] font-mono text-[rgb(var(--text-primary))]">color: #ffffff;</code>
            </div>
            <div className="rounded-lg p-3.5 border" style={{ borderColor: "rgba(52,168,101,0.3)", background: "rgba(52,168,101,0.04)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgb(33,150,83)" }}>✓ Use</p>
              <code className="text-[12px] font-mono text-[rgb(var(--text-primary))]">color: rgb(var(--text-primary));</code>
            </div>
          </div>
          <CallOut type="info">
            Related: <Link href="/tokens" className="underline">Design tokens</Link> lists every available token. The{" "}
            <Link href="/foundations/color" className="underline">Colour foundations</Link> page shows how they map to the palette.
          </CallOut>
        </Step>

        <Step n={2} title="Use surface stepping for elevation">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-3">
            In dark mode, shadows are barely visible. Elevation is communicated through surface lightness instead. Each surface token is approximately 5–10 lightness points brighter than the one below it.
          </p>
          <div className="flex flex-col gap-2 mb-3">
            {[
              { token: "--background", hex: "#09090c", note: "Page canvas" },
              { token: "--surface", hex: "#0d0d11", note: "Cards, panels" },
              { token: "--surface-raised", hex: "#16161c", note: "Dropdowns, popovers" },
              { token: "--surface-hover", hex: "#202028", note: "Hover fill" },
            ].map(({ token, hex, note }) => (
              <div
                key={token}
                className="flex items-center gap-3 rounded-lg p-2.5 border border-[rgb(var(--border))]"
                style={{ background: hex }}
              >
                <span className="w-8 h-8 rounded-lg shrink-0" style={{ background: hex, border: "1px solid rgba(255,255,255,0.1)" }} />
                <div className="flex-1">
                  <code className="text-[11px] font-mono" style={{ color: "#34a865" }}>{token}</code>
                  <p className="text-[10px]" style={{ color: "rgb(var(--text-tertiary))" }}>{note}</p>
                </div>
                <code className="text-[10px] font-mono shrink-0" style={{ color: "rgb(var(--text-tertiary))" }}>{hex}</code>
              </div>
            ))}
          </div>
        </Step>

        <Step n={3} title="Validate contrast in both modes">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-3">
            A colour pair that passes in light mode may fail in dark mode, and vice versa. Always check both.
          </p>
          <ol className="flex flex-col gap-2 text-[13px] text-[rgb(var(--text-secondary))] mb-3">
            {[
              "Open your design in Figma with the Stark plugin, or the browser with Polypane.",
              "Toggle the interface to dark mode.",
              "Run a contrast check on every text/background pairing that uses a non-standard token.",
              "Confirm all body text meets 4.5:1 (AA), all large text meets 3:1 (AA Large).",
              "Toggle back to light mode and repeat.",
            ].map((step, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="shrink-0 font-semibold" style={{ color: "var(--nav-active-color)" }}>{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
          <CallOut type="info">
            The <Link href="/foundations/contrast" className="underline">Contrast foundations page</Link> lists every pre-validated token pairing and its ratio. Use those pairings and you won't need to check.
          </CallOut>
        </Step>

        <Step n={4} title="Don't invert icons or images">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-3">
            Icons that use <code className="font-mono text-[11px] text-[rgb(var(--text-primary))] bg-[rgb(var(--surface-raised))] px-1 py-0.5 rounded">currentColor</code> adapt automatically. Raster images and logos with dark fills need a white or light background container in dark mode — don't CSS-invert them, as this breaks colour accuracy.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg p-3.5 border" style={{ borderColor: "rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.04)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgb(220,38,38)" }}>✗ Avoid</p>
              <code className="text-[11px] font-mono text-[rgb(var(--text-primary))]">filter: invert(1);</code>
            </div>
            <div className="rounded-lg p-3.5 border" style={{ borderColor: "rgba(52,168,101,0.3)", background: "rgba(52,168,101,0.04)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgb(33,150,83)" }}>✓ Use</p>
              <code className="text-[11px] font-mono text-[rgb(var(--text-primary))leading-relaxed]">{"<span class=\"rounded-full bg-white\">…</span>"}</code>
            </div>
          </div>
        </Step>

        <Step n={5} title="Test with a real device in dark mode">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-3">
            Screens vary. OLED displays have true black, LCD panels have a grey black. Always test on a real device, not just the browser simulator.
          </p>
          <ul className="flex flex-col gap-1.5 text-[13px] text-[rgb(var(--text-secondary))]">
            {[
              "Enable dark mode in System Preferences / Display Settings.",
              "Open your app in Safari or the native shell.",
              "Check that surfaces are distinct — background, surface, and surface-raised should read as three separate depths.",
              "Check that text reads comfortably at arm's length — tertiary text at small sizes is the most common failure point.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="shrink-0" style={{ color: "var(--nav-active-color)" }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </Step>
      </div>

      {/* Related */}
      <div className="mt-4 pt-8 border-t border-[rgb(var(--border))]">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Related</p>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/foundations/color", label: "Color" },
            { href: "/foundations/contrast", label: "Contrast" },
            { href: "/tokens", label: "Design tokens" },
            { href: "/how-tos/colour-contrast", label: "How to ensure colour is accessible" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--accent-muted))] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
