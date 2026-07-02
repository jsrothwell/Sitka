import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";

export const metadata: Metadata = { title: "Spatial Computing" };

const DEPTH_LEVELS = [
  { name: "Level 1: Background", desc: "The furthest layer. Solid or deep blur.", z: "0px", opacity: 1 },
  { name: "Level 2: Main Window", desc: "Primary content area. Standard glass material.", z: "20px", opacity: 0.8 },
  { name: "Level 3: Ornaments", desc: "Floating toolbars and controls. High saturation glass.", z: "40px", opacity: 0.9 },
  { name: "Level 4: Overlays", desc: "Modals, alerts, and tooltips. Maximum depth contrast.", z: "80px", opacity: 0.95 },
];

export default function SpatialComputingPage() {
  return (
    <div>
      <PageHeader
        title="Spatial Computing"
        description="Foundations for visionOS and spatial interfaces. Depth, volumetric materials, and ornaments."
      />

      {/* ── Depth & Z-Axis ──────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Depth & Z-Axis</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          In spatial environments, depth communicates hierarchy. Surfaces don&apos;t just overlap; they occupy physical
          space. Use Z-axis transforms to create clear separation between layers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-64 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] overflow-hidden flex items-center justify-center p-12">
            {/* Visual Depth Demo */}
            <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
              <div 
                className="absolute w-32 h-32 bg-[rgb(var(--accent)/0.1)] border border-[rgb(var(--accent)/0.3)] rounded-xl"
                style={{ transform: "translateZ(0px) rotateY(-20deg)" }}
              />
              <div 
                className="absolute w-32 h-32 bg-[rgb(var(--accent)/0.2)] border border-[rgb(var(--accent)/0.5)] rounded-xl backdrop-blur-md"
                style={{ transform: "translateZ(40px) rotateY(-20deg)" }}
              />
              <div 
                className="absolute w-32 h-32 bg-[rgb(var(--accent)/0.4)] border border-[rgb(var(--accent))] rounded-xl shadow-xl backdrop-blur-xl"
                style={{ transform: "translateZ(80px) rotateY(-20deg)" }}
              />
            </div>
            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-[rgb(var(--text-tertiary))]">
              Perspective: 1000px
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {DEPTH_LEVELS.map((level) => (
              <div key={level.name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{level.name}</span>
                  <code className="text-[11px] font-mono text-[rgb(var(--accent))]">z: {level.z}</code>
                </div>
                <p className="text-[12px] text-[rgb(var(--text-secondary))]">{level.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Materials ────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Spatial Materials</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Spatial glass (Liquid Glass v2) uses higher blur radius and dynamic saturation to ensure legibility against
          complex, unpredictable backgrounds (the user&apos;s physical environment).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl border border-[rgb(var(--border))] bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
            <div className="h-24 rounded-xl backdrop-blur-[64px] bg-white/10 border border-white/20 flex items-center justify-center shadow-2xl">
              <span className="text-[12px] font-semibold text-white">visionOS Blur</span>
            </div>
            <p className="mt-4 text-[11px] text-[rgb(var(--text-tertiary))] font-mono">blur: 64px</p>
          </div>
          <div className="p-6 rounded-2xl border border-[rgb(var(--border))] bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
            <div className="h-24 rounded-xl backdrop-blur-[24px] saturate-[180%] bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
              <span className="text-[12px] font-semibold text-white">Standard Glass</span>
            </div>
            <p className="mt-4 text-[11px] text-[rgb(var(--text-tertiary))] font-mono">blur: 24px</p>
          </div>
          <div className="p-6 rounded-2xl border border-[rgb(var(--border))] bg-gradient-to-br from-orange-500/20 to-red-500/20">
            <div className="h-24 rounded-xl backdrop-blur-[12px] bg-white/5 border border-white/5 flex items-center justify-center">
              <span className="text-[12px] font-semibold text-white">Thin Glass</span>
            </div>
            <p className="mt-4 text-[11px] text-[rgb(var(--text-tertiary))] font-mono">blur: 12px</p>
          </div>
        </div>
      </section>

      {/* ── Ornaments ────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Ornaments</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Ornaments are specialized toolbars that float outside the main window bounds, usually anchored to the bottom.
          They provide quick access to persistent actions without cluttering the canvas.
        </p>
        <div className="relative h-80 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex flex-col items-center justify-center overflow-hidden">
          <div className="w-64 h-40 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-xl flex items-center justify-center">
             <span className="text-[11px] text-[rgb(var(--text-tertiary))]">Main Window</span>
          </div>
          {/* Ornament */}
          <div className="absolute bottom-12 px-4 py-2 rounded-full backdrop-blur-3xl bg-[rgb(var(--accent)/0.15)] border border-[rgb(var(--accent)/0.4)] shadow-2xl flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-[rgb(var(--accent))] flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
             </div>
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[rgb(var(--text-primary))]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
             </div>
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[rgb(var(--text-primary))]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
             </div>
          </div>
          <div className="absolute bottom-4 text-[10px] font-mono text-[rgb(var(--accent))]">Ornament (Floating bottom)</div>
        </div>
      </section>

      {/* ── Window Chrome ────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Window Chrome</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Spatial windows have rounded corners (xl or 2xl) and a subtle 1px internal border. The grab handle at the bottom
          allows for repositioning in 3D space.
        </p>
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
            </div>
            <span className="text-[12px] font-medium text-[rgb(var(--text-secondary))]">Spatial Window</span>
            <div className="w-12" />
          </div>
          <div className="p-12 flex flex-col items-center gap-8">
             <div className="w-full h-32 rounded-xl border border-dashed border-[rgb(var(--border))] flex items-center justify-center">
                <span className="text-[13px] text-[rgb(var(--text-tertiary))]">Viewport Content</span>
             </div>
             {/* Grab handle */}
             <div className="w-32 h-1.5 rounded-full bg-[rgb(var(--text-tertiary)/0.3)] mb-2" />
          </div>
        </div>
      </section>
    </div>
  );
}
