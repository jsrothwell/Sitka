"use client";

const VARIANTS = [
  {
    name: "Overlay",
    description: "The strongest glass level. Used for command palettes, sheets, and full-screen overlays.",
    blur: "20px",
    saturate: "180%",
    bgOpacity: "0.92",
    bgToken: "--surface",
    border: "1px solid rgb(var(--border))",
    where: "Command palette, modals, drawers",
  },
  {
    name: "Chrome",
    description: "High-fidelity frosting for persistent chrome. Sits between content and the edge of the viewport.",
    blur: "16px",
    saturate: "180%",
    bgOpacity: "0.85",
    bgToken: "--surface",
    border: "1px solid rgb(var(--border-subtle))",
    where: "Header, navigation bars",
  },
  {
    name: "Panel",
    description: "Lighter blur for persistent sidebars and panels. Keeps content behind subtly readable.",
    blur: "10px",
    saturate: "160%",
    bgOpacity: "1",
    bgToken: "--surface",
    border: "1px solid rgb(var(--border-subtle))",
    where: "Sidebar, floating panels",
  },
  {
    name: "Ghost",
    description: "Low-opacity glass for inline controls. The content behind remains clearly legible.",
    blur: "12px",
    saturate: "150%",
    bgOpacity: "0.72",
    bgToken: "--surface",
    border: "1px solid rgb(var(--border))",
    where: "Ghost buttons, secondary controls",
  },
  {
    name: "Accent",
    description: "Brand-coloured glass for primary actions. The accent hue tints the frosting.",
    blur: "12px",
    saturate: "160%",
    bgOpacity: "0.9",
    bgToken: "--accent",
    border: "1px solid rgb(var(--accent) / 0.45)",
    where: "Primary buttons, active badges",
  },
];

const PROPERTIES = [
  {
    property: "backdrop-filter: blur()",
    values: [
      { val: "10px", label: "Panel" },
      { val: "12px", label: "Ghost / Accent" },
      { val: "16px", label: "Chrome" },
      { val: "20px", label: "Overlay" },
    ],
    description:
      "Controls how much the content beneath is blurred. Higher values create denser frosting at the cost of GPU compositing.",
  },
  {
    property: "backdrop-filter: saturate()",
    values: [
      { val: "150%", label: "Ghost" },
      { val: "160%", label: "Panel / Accent" },
      { val: "180%", label: "Chrome / Overlay" },
    ],
    description:
      "Boosts color saturation of the blurred content below. Prevents glass from looking washed-out — always paired with blur.",
  },
  {
    property: "background-color opacity",
    values: [
      { val: "72%", label: "Ghost" },
      { val: "85%", label: "Chrome" },
      { val: "90%", label: "Accent" },
      { val: "92%", label: "Overlay" },
      { val: "100%", label: "Panel" },
    ],
    description:
      "The fill opacity of the surface token. Lower values let more background bleed through the frosting.",
  },
  {
    property: "border",
    values: [
      { val: "1px solid rgb(var(--border-subtle))", label: "Low-contrast contexts" },
      { val: "1px solid rgb(var(--border))", label: "Standard glass edge" },
      { val: "1px solid rgb(var(--accent) / 0.45)", label: "Accent glass" },
    ],
    description:
      "A hairline border defines the glass edge against blurred content. Without it the surface dissolves into the background.",
  },
];

const RULES = [
  {
    label: "Glass needs real depth",
    body: "Frosted glass only communicates spatial meaning when there is real content behind it. A glass card over a flat colour is a lie — use a solid surface instead.",
  },
  {
    label: "Layer from the inside out",
    body: "Content → Surface → Panel → Chrome → Overlay. Each layer uses a stronger blur than the one beneath it. Never apply a stronger glass variant lower in the stack.",
  },
  {
    label: "GPU cost is real",
    body: "backdrop-filter forces the browser to composite every layer beneath it. Limit glass surfaces to persistent chrome and infrequent overlays. Never animate blur values.",
  },
  {
    label: "Always include the border",
    body: "Without a hairline border the glass edge dissolves into the background. The border is not decoration — it is the surface definition.",
  },
  {
    label: "Saturate alongside blur",
    body: "blur() alone drains colour from the background. saturate() restores it. The two are always paired — removing one makes the glass look washed out or unnaturally vivid.",
  },
  {
    label: "Provide a solid fallback",
    body: "backdrop-filter is not universally supported. Always pair it with a solid background-color so the surface remains legible when the effect drops out.",
  },
];

const BG_GRADIENT =
  "linear-gradient(135deg, rgb(52,168,101) 0%, rgb(15,61,36) 45%, rgb(9,9,12) 100%)";

function GlassCard({ v }: { v: (typeof VARIANTS)[number] }) {
  const isAccent = v.bgToken === "--accent";

  const glassStyle: React.CSSProperties = {
    backdropFilter: `blur(${v.blur}) saturate(${v.saturate})`,
    WebkitBackdropFilter: `blur(${v.blur}) saturate(${v.saturate})`,
    backgroundColor: isAccent
      ? `rgb(var(--accent) / ${v.bgOpacity})`
      : v.bgOpacity === "1"
      ? `rgb(var(--surface))`
      : `rgb(var(--surface) / ${v.bgOpacity})`,
    border: v.border,
  };

  const labelColor = isAccent ? "#fff" : "rgb(var(--text-primary))";
  const subColor = isAccent ? "rgba(255,255,255,0.65)" : "rgb(var(--text-tertiary))";

  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
      {/* Live preview over brand gradient */}
      <div
        className="flex items-center justify-center"
        style={{ background: BG_GRADIENT, height: "8.5rem" }}
      >
        <div
          className="w-52 h-16 rounded-xl flex flex-col justify-center px-4 gap-0.5"
          style={glassStyle}
        >
          <span className="text-[12px] font-semibold" style={{ color: labelColor }}>
            {v.name}
          </span>
          <span className="text-[10px] font-mono" style={{ color: subColor }}>
            blur({v.blur}) · saturate({v.saturate}) · {Math.round(parseFloat(v.bgOpacity) * 100)}% bg
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <div className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{v.name}</div>
          <p className="text-[12px] text-[rgb(var(--text-secondary))] mt-0.5 leading-relaxed">{v.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {[
            ["Blur", v.blur],
            ["Saturate", v.saturate],
            ["BG opacity", `${Math.round(parseFloat(v.bgOpacity) * 100)}%`],
            ["Used in", v.where],
          ].map(([label, val]) => (
            <div key={label}>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{label}</div>
              <div className="text-[11px] font-mono text-[rgb(var(--text-primary))] mt-0.5">{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GlassShowcase() {
  return (
    <div>
      {/* ── Variants ─────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Variants</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Five glass variants ordered by elevation. Each preview renders the surface over the brand
          gradient so the frosting effect is always visible.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {VARIANTS.map((v) => (
            <GlassCard key={v.name} v={v} />
          ))}
        </div>
      </section>

      {/* ── Properties ───────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Properties</h2>
        <div className="flex flex-col gap-4">
          {PROPERTIES.map((p) => (
            <div
              key={p.property}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
                <code className="text-[12px] font-mono font-semibold text-[rgb(var(--accent))]">
                  {p.property}
                </code>
              </div>
              <div className="px-5 py-4 flex gap-8">
                <div className="flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2.5">
                    Values in use
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {p.values.map(({ val, label }) => (
                      <li key={val} className="flex items-center gap-2">
                        <code className="text-[11px] font-mono text-[rgb(var(--text-primary))] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] px-2 py-0.5 rounded">
                          {val}
                        </code>
                        <span className="text-[11px] text-[rgb(var(--text-tertiary))]">{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-64 flex-shrink-0">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2.5">
                    Notes
                  </div>
                  <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{p.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rules ────────────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Rules</h2>
        <div className="grid grid-cols-2 gap-4">
          {RULES.map((r) => (
            <div
              key={r.label}
              className="flex flex-col gap-2 rounded-[10px] p-5"
              style={{ backgroundColor: "var(--card-tint-bg)" }}
            >
              <span
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--nav-active-color)" }}
              >
                {r.label}
              </span>
              <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
