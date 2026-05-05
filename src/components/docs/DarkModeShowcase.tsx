"use client";

// Forced-colour mockups rendered with hardcoded token values so they look
// correct regardless of the viewer's current theme.
const DARK = {
  bg: "#09090c",
  surface: "#0d0d11",
  surfaceRaised: "#16161c",
  surfaceHover: "#202028",
  border: "#262630",
  borderSubtle: "#1a1a21",
  textPrimary: "#f2f2f6",
  textSecondary: "#9b9baa",
  textTertiary: "#646473",
  accent: "rgb(52,168,101)",
  accentSubtle: "rgba(52,168,101,0.08)",
};

const LIGHT = {
  bg: "#fafafa",
  surface: "#ffffff",
  surfaceRaised: "#f6f6f8",
  surfaceHover: "#f0f0f4",
  border: "#e0e0e7",
  borderSubtle: "#f0f0f4",
  textPrimary: "#282828",
  textSecondary: "#747474",
  textTertiary: "#a7a7ac",
  accent: "rgb(33,150,83)",
  accentSubtle: "rgba(33,150,83,0.08)",
};

function SurfaceStack({ t }: { t: typeof DARK }) {
  const layers = [
    { label: "--background", hex: t.bg, note: "Page canvas" },
    { label: "--surface", hex: t.surface, note: "Cards, panels" },
    { label: "--surface-raised", hex: t.surfaceRaised, note: "Dropdowns, popovers" },
    { label: "--surface-hover", hex: t.surfaceHover, note: "Hover state fill" },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {layers.map((l) => (
        <div key={l.label} className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-lg shrink-0 border"
            style={{ backgroundColor: l.hex, borderColor: t.border }}
          />
          <div className="flex-1 min-w-0">
            <code className="text-[11px] font-mono block" style={{ color: t.accent }}>
              {l.label}
            </code>
            <span className="text-[11px]" style={{ color: t.textTertiary }}>
              {l.note}
            </span>
          </div>
          <span
            className="text-[10px] font-mono shrink-0"
            style={{ color: t.textTertiary }}
          >
            {l.hex}
          </span>
        </div>
      ))}
    </div>
  );
}

function SettingsPanel({ t }: { t: typeof DARK }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: t.bg, border: `1px solid ${t.border}`, minWidth: 0 }}
    >
      {/* Header */}
      <div
        className="px-5 py-3.5 border-b"
        style={{ background: t.surface, borderColor: t.border }}
      >
        <span className="text-[13px] font-semibold" style={{ color: t.textPrimary }}>
          Settings
        </span>
      </div>

      {/* Section */}
      <div className="px-5 pt-4 pb-2">
        <p
          className="text-[10px] font-semibold uppercase tracking-wider mb-2"
          style={{ color: t.textTertiary }}
        >
          Appearance
        </p>
        {["Theme", "Language", "Font size"].map((item, i) => (
          <div
            key={item}
            className="flex items-center justify-between py-2.5 border-b"
            style={{ borderColor: i < 2 ? t.borderSubtle : "transparent" }}
          >
            <span className="text-[13px]" style={{ color: t.textPrimary }}>
              {item}
            </span>
            <span
              className="text-[12px] flex items-center gap-1"
              style={{ color: t.textSecondary }}
            >
              {["System", "English", "Medium"][i]}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3.5 2.5L6.5 5L3.5 7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        ))}
      </div>

      <div className="px-5 pt-2 pb-4">
        <p
          className="text-[10px] font-semibold uppercase tracking-wider mb-2"
          style={{ color: t.textTertiary }}
        >
          Notifications
        </p>
        {[
          { label: "Email alerts", on: true },
          { label: "Push notifications", on: false },
        ].map(({ label, on }) => (
          <div
            key={label}
            className="flex items-center justify-between py-2.5"
          >
            <span className="text-[13px]" style={{ color: t.textPrimary }}>
              {label}
            </span>
            <span
              className="w-8 h-5 rounded-full flex items-center"
              style={{
                background: on ? t.accent : t.surfaceHover,
                border: `1px solid ${on ? t.accent : t.border}`,
                padding: "2px",
                justifyContent: on ? "flex-end" : "flex-start",
              }}
            >
              <span
                className="w-3.5 h-3.5 rounded-full bg-white"
                style={{ display: "block" }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OnboardingCard({ t }: { t: typeof DARK }) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: t.surface, border: `1px solid ${t.border}` }}
    >
      {/* Illustration area */}
      <div
        className="h-28 flex items-center justify-center"
        style={{ background: t.accentSubtle }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke={t.accent} strokeWidth="1.5" />
          <path
            d="M24 14V24L30 30"
            stroke={t.accent}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: t.accent }}>
          Step 2 of 4
        </p>
        <h3 className="text-[15px] font-semibold mb-1.5" style={{ color: t.textPrimary }}>
          Connect your workspace
        </h3>
        <p className="text-[12px] leading-relaxed mb-4" style={{ color: t.textSecondary }}>
          Link your existing tools so Sitka can pull in your data automatically.
        </p>

        {/* Step indicators */}
        <div className="flex gap-1.5 mb-4">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-1 rounded-full flex-1"
              style={{ background: i <= 1 ? t.accent : t.surfaceHover }}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            className="flex-1 py-2 rounded-lg text-[12px] font-medium"
            style={{ background: t.surfaceRaised, color: t.textSecondary, border: `1px solid ${t.border}` }}
          >
            Back
          </button>
          <button
            className="flex-1 py-2 rounded-lg text-[12px] font-medium"
            style={{ background: t.accent, color: "#fff" }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function Swatch({ hex, label, note, t }: { hex: string; label: string; note: string; t: typeof DARK }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="w-5 h-5 rounded shrink-0"
        style={{ background: hex, border: `1px solid ${t.border}` }}
      />
      <div>
        <p className="text-[11px] font-medium" style={{ color: t.textPrimary }}>{label}</p>
        <p className="text-[10px]" style={{ color: t.textTertiary }}>{note}</p>
      </div>
    </div>
  );
}

function ThemePanel({ t, label }: { t: typeof DARK; label: string }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-5"
      style={{ background: t.bg, border: `1px solid ${t.border}` }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: t.textTertiary }}>
        {label}
      </p>
      <SurfaceStack t={t} />
      <div className="border-t" style={{ borderColor: t.border }} />
      <div className="flex flex-col gap-2">
        <Swatch hex={t.textPrimary} label="--text-primary" note="Headings, body" t={t} />
        <Swatch hex={t.textSecondary} label="--text-secondary" note="Labels, captions" t={t} />
        <Swatch hex={t.textTertiary} label="--text-tertiary" note="Placeholders, hints" t={t} />
        <Swatch hex={t.accent} label="--nav-active-color" note="Interactive, brand" t={t} />
      </div>
    </div>
  );
}

export function DarkModeShowcase() {
  return (
    <div className="space-y-12">
      {/* Surface hierarchy */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1.5">
          Colour Roles in Context
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          The same token set rendered in both modes. Surface values step up in increments of roughly 5–10 lightness points so depth reads clearly without harsh contrast.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ThemePanel t={DARK} label="Dark mode" />
          <ThemePanel t={LIGHT} label="Light mode" />
        </div>
      </section>

      {/* UI patterns */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1.5">
          Patterns in Dark Mode
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          How the palette behaves across the two most common patterns — onboarding and settings. Notice that accent fills remain readable at full opacity in both contexts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
              Onboarding — dark
            </p>
            <OnboardingCard t={DARK} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
              Settings — dark
            </p>
            <SettingsPanel t={DARK} />
          </div>
        </div>
      </section>

      {/* Guidance */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Never use pure black",
              body: "Pure #000000 backgrounds create harsh contrast. Sitka dark uses #09090c — a near-black with a cool tint that reads as black while being easier on the eyes.",
            },
            {
              title: "Elevation through value, not shadows",
              body: "In dark mode, shadows don't read. Use surface stepping (background → surface → surface-raised) to communicate elevation instead.",
            },
            {
              title: "Accent stays green",
              body: "The brand green (#219653 light, #34a865 dark) maintains sufficient contrast in both modes. Don't replace it with a lighter tint just because you're in dark mode.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]"
            >
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-2">{title}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
