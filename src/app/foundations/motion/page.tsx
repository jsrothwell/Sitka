import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { MotionShowcase } from "@/components/docs/MotionShowcase";

export const metadata: Metadata = { title: "Motion" };

const PANEL_RISE_TOKENS = [
  { token: "--motion-sheet-entry-duration", value: "0.25s", notes: "Total rise time. Matches the Normal duration step." },
  { token: "--motion-sheet-entry-easing",   value: "cubic-bezier(0.16, 1, 0.3, 1)", notes: "Spring-out easing — fast exit, slow settle. Same as the Spring curve." },
  { token: "--motion-sheet-entry-from",     value: "0.97", notes: "Initial scale factor. The sheet grows from 97% → 100% as it rises." },
];

const SHEET_ENTRY_CONTEXTS = [
  { context: "Action sheet / bottom sheet",  dir: "↑ Slide + scale up from bottom edge" },
  { context: "Modal / dialog",               dir: "↑ Scale from 0.97 → 1.0, fade in from 0 → 1" },
  { context: "Popover / dropdown",           dir: "↓ Scale from 0.96 → 1.0, origin at trigger" },
  { context: "Side drawer",                  dir: "← Slide in from leading/trailing edge" },
  { context: "Toast / notification",         dir: "↑ Slide in from bottom, 30px travel" },
];

export default function MotionPage() {
  return (
    <div>
      <PageHeader
        title="Motion"
        description="Motion is not decoration — it communicates state changes, establishes hierarchy, and gives the interface a sense of physicality. Every transition in Sitka is intentional."
      />
      <MotionShowcase />

      {/* ── Panel Rise ──────────────────────────────── */}
      <section className="mb-12 mt-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Panel Rise</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Panel Rise is the standard entry animation for sheets, modals, and overlays. The surface
          scales from 97% → 100% while fading in, giving the impression of a physical panel rising
          toward the user. The spring-out easing lands crisply without a linear feel.
        </p>

        {/* Token table */}
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Token", "Value", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PANEL_RISE_TOKENS.map((row, i) => (
                <tr key={row.token} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3">
                    <code className="font-mono text-[11px] text-[rgb(var(--accent))]">{row.token}</code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="font-mono text-[11px] text-[rgb(var(--text-primary))] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] px-1.5 py-0.5 rounded">
                      {row.value}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Code */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">CSS — @keyframes</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`@keyframes panel-rise {
  from {
    opacity: 0;
    transform: scale(var(--motion-sheet-entry-from, 0.97));
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.sheet-enter {
  animation:
    panel-rise
    var(--motion-sheet-entry-duration, 0.25s)
    var(--motion-sheet-entry-easing,
        cubic-bezier(0.16, 1, 0.3, 1))
    both;
}`}</code></pre>
          </div>
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">SwiftUI — .transition</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`// Warren's SheetTransition modifier
extension AnyTransition {
    static var panelRise: AnyTransition {
        .asymmetric(
            insertion: .scale(scale: 0.97)
                .combined(with: .opacity)
                .animation(.spring(
                    response: 0.25,
                    dampingFraction: 0.8
                )),
            removal: .scale(scale: 0.97)
                .combined(with: .opacity)
                .animation(.easeIn(duration: 0.15))
        )
    }
}`}</code></pre>
          </div>
        </div>

        {/* Per-context table */}
        <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-3">Per-context behaviour</h3>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Context", "Direction"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SHEET_ENTRY_CONTEXTS.map((row, i) => (
                <tr key={row.context} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.context}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.dir}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Reduced motion ──────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Reduced motion</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Users who have enabled "Reduce Motion" in their OS settings must get a simplified experience.
          Never remove all feedback — replace motion with an instant opacity cross-fade.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">CSS — prefers-reduced-motion</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`/* Default: spring-based panel rise */
.sheet-enter {
  animation: panel-rise 0.25s
    cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Reduced: instant fade only */
@media (prefers-reduced-motion: reduce) {
  .sheet-enter {
    animation: fade-in 0.15s linear both;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}`}</code></pre>
          </div>
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">SwiftUI — accessibilityReduceMotion</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`@Environment(\.accessibilityReduceMotion)
var reduceMotion

var sheetAnimation: Animation {
    reduceMotion
        ? .linear(duration: 0.15)
        : .spring(response: 0.25,
                  dampingFraction: 0.8)
}`}</code></pre>
          </div>
        </div>
      </section>
    </div>
  );
}
