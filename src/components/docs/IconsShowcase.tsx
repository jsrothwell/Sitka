"use client";

import React from "react";
import {
  House, MagnifyingGlass, Bell, User, Gear, Heart,
  Plus, Check, Star, Globe, ArrowRight, Download,
  Trash, Eye, Lock, Calendar, Lightning, Warning,
  Info, Envelope,
} from "@phosphor-icons/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse, faMagnifyingGlass, faBell, faUser, faGear, faHeart,
  faPlus, faCheck, faStar, faGlobe, faArrowRight, faDownload,
  faTrash, faEye, faLock, faCalendarDays, faBolt,
  faTriangleExclamation, faCircleInfo, faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBell as faBellReg,
  faHeart as faHeartReg,
  faStar as faStarReg,
  faUser as faUserReg,
  faEye as faEyeReg,
  faCalendar as faCalendarReg,
  faEnvelope as faEnvelopeReg,
} from "@fortawesome/free-regular-svg-icons";
import { CodeBlock } from "@/components/ui/CodeBlock";

type PWeight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
type PIComponent = React.FC<{ size?: number; weight?: PWeight; color?: string }>;

const PHOSPHOR_WEIGHTS: { weight: PWeight; label: string }[] = [
  { weight: "thin",    label: "Thin"    },
  { weight: "light",   label: "Light"   },
  { weight: "regular", label: "Regular" },
  { weight: "bold",    label: "Bold"    },
  { weight: "fill",    label: "Fill"    },
  { weight: "duotone", label: "Duotone" },
];

const PHOSPHOR_ICONS: { Icon: PIComponent; name: string }[] = [
  { Icon: House as PIComponent,           name: "House"          },
  { Icon: MagnifyingGlass as PIComponent, name: "MagnifyingGlass"},
  { Icon: Bell as PIComponent,            name: "Bell"           },
  { Icon: User as PIComponent,            name: "User"           },
  { Icon: Gear as PIComponent,            name: "Gear"           },
  { Icon: Heart as PIComponent,           name: "Heart"          },
  { Icon: Plus as PIComponent,            name: "Plus"           },
  { Icon: Check as PIComponent,           name: "Check"          },
  { Icon: Star as PIComponent,            name: "Star"           },
  { Icon: Globe as PIComponent,           name: "Globe"          },
  { Icon: ArrowRight as PIComponent,      name: "ArrowRight"     },
  { Icon: Download as PIComponent,        name: "Download"       },
  { Icon: Trash as PIComponent,           name: "Trash"          },
  { Icon: Eye as PIComponent,             name: "Eye"            },
  { Icon: Lock as PIComponent,            name: "Lock"           },
  { Icon: Calendar as PIComponent,        name: "Calendar"       },
  { Icon: Lightning as PIComponent,       name: "Lightning"      },
  { Icon: Warning as PIComponent,         name: "Warning"        },
  { Icon: Info as PIComponent,            name: "Info"           },
  { Icon: Envelope as PIComponent,        name: "Envelope"       },
];

const FA_COMPARISON = [
  { label: "Bell",     solid: faBell,     regular: faBellReg     },
  { label: "Heart",    solid: faHeart,    regular: faHeartReg    },
  { label: "Star",     solid: faStar,     regular: faStarReg     },
  { label: "User",     solid: faUser,     regular: faUserReg     },
  { label: "Eye",      solid: faEye,      regular: faEyeReg      },
  { label: "Calendar", solid: faCalendarDays, regular: faCalendarReg },
  { label: "Envelope", solid: faEnvelope, regular: faEnvelopeReg },
];

const FA_SOLID_GRID = [
  { icon: faHouse,              label: "house"              },
  { icon: faMagnifyingGlass,    label: "magnifying-glass"   },
  { icon: faBell,               label: "bell"               },
  { icon: faUser,               label: "user"               },
  { icon: faGear,               label: "gear"               },
  { icon: faHeart,              label: "heart"              },
  { icon: faPlus,               label: "plus"               },
  { icon: faCheck,              label: "check"              },
  { icon: faStar,               label: "star"               },
  { icon: faGlobe,              label: "globe"              },
  { icon: faArrowRight,         label: "arrow-right"        },
  { icon: faDownload,           label: "download"           },
  { icon: faTrash,              label: "trash"              },
  { icon: faEye,                label: "eye"                },
  { icon: faLock,               label: "lock"               },
  { icon: faCalendarDays,       label: "calendar-days"      },
  { icon: faBolt,               label: "bolt"               },
  { icon: faTriangleExclamation,label: "triangle-exclamation"},
  { icon: faCircleInfo,         label: "circle-info"        },
  { icon: faEnvelope,           label: "envelope"           },
];

const SF_WEIGHTS = [
  "ultraLight", "thin", "light", "regular",
  "medium", "semibold", "bold", "heavy", "black",
];

const SF_RENDERING_MODES = [
  { mode: ".monochrome",   desc: "Single colour — matches foreground tint"  },
  { mode: ".hierarchical", desc: "Depth layers in one colour"               },
  { mode: ".palette",      desc: "Two or more explicit colours"             },
  { mode: ".multicolor",   desc: "Apple-defined full-colour rendering"      },
];

const cell = "flex flex-col items-center gap-2 p-3 rounded-lg bg-[rgb(var(--surface))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent-muted))] transition-standard";
const iconLabel = "text-[10px] font-mono text-[rgb(var(--text-tertiary))] text-center leading-tight";
const sectionH = "text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1";
const sectionSub = "text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed";
const h3 = "text-[13px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3";

export function IconsShowcase() {
  return (
    <div className="space-y-16">

      {/* ── Overview table ─────────────────────────────── */}
      <section>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
                {["Library", "Platform", "Style", "Free tier"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border-subtle))]">
              {[
                { lib: "SF Symbols",      platform: "iOS · macOS · watchOS · tvOS", style: "9 weights · 4 rendering modes",    free: "6,000+ symbols"     },
                { lib: "Phosphor Icons",  platform: "Web · React · Vue · Svelte",   style: "6 weights (thin → duotone)",        free: "1,248 icons"        },
                { lib: "Font Awesome",    platform: "Web · React",                  style: "Solid · Regular · Brands",          free: "~2,000 solid icons" },
              ].map(({ lib, platform, style, free }) => (
                <tr key={lib} className="bg-[rgb(var(--surface))] hover:bg-[rgb(var(--surface-raised))] transition-standard">
                  <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))]">{lib}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{platform}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{style}</td>
                  <td className="px-4 py-3 font-mono text-[rgb(var(--text-tertiary))]">{free}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Phosphor Icons ─────────────────────────────── */}
      <section>
        <h2 className={sectionH}>Phosphor Icons</h2>
        <p className={sectionSub}>
          A flexible icon family with six weight variants that share the same underlying geometry. Use a consistent weight across a surface — mixing weights should be intentional.
        </p>

        {/* Weight showcase */}
        <p className={h3}>Weight variants</p>
        <div className="grid grid-cols-6 gap-3 mb-10">
          {PHOSPHOR_WEIGHTS.map(({ weight, label }) => (
            <div key={weight} className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
              <House size={28} weight={weight} color="rgb(var(--text-primary))" />
              <span className="text-[11px] font-semibold text-[rgb(var(--text-secondary))]">{label}</span>
              <code className="text-[9px] font-mono text-[rgb(var(--text-tertiary))]">{weight}</code>
            </div>
          ))}
        </div>

        {/* Icon grid */}
        <p className={h3}>Common icons (regular)</p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-10">
          {PHOSPHOR_ICONS.map(({ Icon, name }) => (
            <div key={name} className={cell}>
              <Icon size={22} weight="regular" />
              <span className={iconLabel}>{name}</span>
            </div>
          ))}
        </div>

        {/* Code */}
        <p className={h3}>Installation</p>
        <CodeBlock
          code="npm install @phosphor-icons/react"
          language="bash"
          className="mb-6"
        />

        <p className={h3}>Usage</p>
        <CodeBlock
          language="tsx"
          filename="MyComponent.tsx"
          code={`import { House, Bell, Heart } from "@phosphor-icons/react";

// Default weight (regular)
<House size={24} />

// Explicit weight
<Bell size={24} weight="bold" />
<Heart size={24} weight="fill" />

// With colour token
<House size={24} weight="duotone" color="rgb(var(--accent))" />`}
        />
      </section>

      {/* ── SF Symbols ─────────────────────────────────── */}
      <section>
        <h2 className={sectionH}>SF Symbols</h2>
        <p className={sectionSub}>
          Apple's native icon system is built into iOS, macOS, watchOS, and tvOS — no import needed. Symbols adapt to Dynamic Type, support nine weights, and four rendering modes including full multicolour.
        </p>

        {/* Weight + rendering mode tables */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          <div>
            <p className={h3}>Weights</p>
            <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
              {SF_WEIGHTS.map((w, i) => (
                <div
                  key={w}
                  className={`px-4 py-2.5 flex items-center justify-between text-[13px] ${i < SF_WEIGHTS.length - 1 ? "border-b border-[rgb(var(--border-subtle))]" : ""} ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}
                >
                  <code className="font-mono text-[rgb(var(--accent))] text-[12px]">.{w}</code>
                  <span className="text-[rgb(var(--text-tertiary))] text-[11px]">Font.Weight</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className={h3}>Rendering modes</p>
            <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
              {SF_RENDERING_MODES.map(({ mode, desc }, i) => (
                <div
                  key={mode}
                  className={`px-4 py-3 ${i < SF_RENDERING_MODES.length - 1 ? "border-b border-[rgb(var(--border-subtle))]" : ""} ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}
                >
                  <code className="font-mono text-[rgb(var(--accent))] text-[12px]">{mode}</code>
                  <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className={h3}>Usage (SwiftUI)</p>
        <CodeBlock
          language="swift"
          filename="IconExamples.swift"
          code={`import SwiftUI

struct IconExamples: View {
    var body: some View {
        VStack(spacing: 20) {

            // Basic usage — name matches SF Symbols app
            Image(systemName: "house.fill")
                .font(.system(size: 24))

            // Weight override
            Image(systemName: "bell")
                .font(.system(size: 24, weight: .bold))

            // Hierarchical rendering (depth layers in one colour)
            Image(systemName: "star.fill")
                .symbolRenderingMode(.hierarchical)
                .foregroundStyle(.blue)

            // Palette rendering (explicit multi-colour)
            Image(systemName: "person.crop.circle.badge.checkmark")
                .symbolRenderingMode(.palette)
                .foregroundStyle(.green, .secondary)

            // Multicolor (Apple-defined colours)
            Image(systemName: "flame.fill")
                .symbolRenderingMode(.multicolor)

            // Scaled with Dynamic Type
            Image(systemName: "envelope")
                .imageScale(.large)
                .font(.title2)
        }
    }
}`}
        />

        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-4">
          Browse the full symbol catalogue in the <span className="font-semibold text-[rgb(var(--text-secondary))]">SF Symbols app</span> — available free from developer.apple.com.
        </p>
      </section>

      {/* ── Font Awesome ───────────────────────────────── */}
      <section>
        <h2 className={sectionH}>Font Awesome</h2>
        <p className={sectionSub}>
          Font Awesome's free tier includes ~2,000 solid icons and a limited set of regular and brand icons. Use it where FA-specific icon names are already part of your design language or you need broad browser compatibility.
        </p>

        {/* Solid vs Regular */}
        <p className={h3}>Solid vs Regular (free)</p>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))] mb-10">
          <div className="grid grid-cols-[1fr_80px_80px] border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
            <div className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Icon</div>
            <div className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] text-center">Solid</div>
            <div className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] text-center">Regular</div>
          </div>
          {FA_COMPARISON.map(({ label, solid, regular }, i) => (
            <div
              key={label}
              className={`grid grid-cols-[1fr_80px_80px] items-center ${i < FA_COMPARISON.length - 1 ? "border-b border-[rgb(var(--border-subtle))]" : ""} ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}
            >
              <div className="px-4 py-3 text-[13px] font-medium text-[rgb(var(--text-secondary))]">{label}</div>
              <div className="flex justify-center py-3 text-[rgb(var(--text-primary))]">
                <FontAwesomeIcon icon={solid} style={{ width: 18, height: 18 }} />
              </div>
              <div className="flex justify-center py-3 text-[rgb(var(--text-primary))]">
                <FontAwesomeIcon icon={regular} style={{ width: 18, height: 18 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Solid grid */}
        <p className={h3}>Solid icon set (sample)</p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-10">
          {FA_SOLID_GRID.map(({ icon, label }) => (
            <div key={label} className={cell}>
              <FontAwesomeIcon icon={icon} style={{ width: 20, height: 20 }} />
              <span className={iconLabel}>{label}</span>
            </div>
          ))}
        </div>

        {/* Code */}
        <p className={h3}>Installation</p>
        <CodeBlock
          language="bash"
          code={`npm install @fortawesome/react-fontawesome \\
  @fortawesome/fontawesome-svg-core \\
  @fortawesome/free-solid-svg-icons \\
  @fortawesome/free-regular-svg-icons`}
          className="mb-6"
        />

        <p className={h3}>Usage</p>
        <CodeBlock
          language="tsx"
          filename="MyComponent.tsx"
          code={`import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBell } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

// Solid icon
<FontAwesomeIcon icon={faHouse} />

// With size
<FontAwesomeIcon icon={faBell} size="lg" />

// With pixel size via style
<FontAwesomeIcon icon={faHouse} style={{ width: 24, height: 24 }} />

// Regular variant
<FontAwesomeIcon icon={faHeart} />`}
        />
      </section>

    </div>
  );
}
