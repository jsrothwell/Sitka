import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Barcode Scanner" };

const CODE = {
  swiftui_ios: {
    filename: "ScanReticleOverlay.swift",
    code: `import SwiftUI

// ── Scan Reticle Overlay ───────────────────────────────────────────────────
// Full-screen overlay: dimmed backdrop with a clear cutout window,
// animated corner brackets, and a sweep-line while scanning.

struct ScanReticleOverlay: View {
    var isAnimating: Bool   // true = scanning, false = success/idle
    @State private var pulse = false

    var body: some View {
        GeometryReader { geo in
            let cx = geo.size.width / 2
            let cy = geo.size.height / 2
            let half: CGFloat = 220 / 2

            ZStack {
                // Dimmed backdrop with a rectangular cutout
                ScanCutoutShape(
                    rect: CGRect(x: cx - half, y: cy - half, width: 220, height: 220),
                    cornerRadius: 14
                )
                .fill(Color.black.opacity(0.55))

                // Corner bracket decorations
                ReticleCorners(
                    center: CGPoint(x: cx, y: cy),
                    size: 220,
                    cornerLength: 24,
                    lineWidth: 3,
                    color: isAnimating ? Color.white : Color.green
                )
                .animation(.easeInOut(duration: 0.25), value: isAnimating)

                // Sweep line — only visible while scanning
                if isAnimating {
                    ScanSweepLine(
                        rect: CGRect(x: cx - half, y: cy - half, width: 220, height: 220)
                    )
                }
            }
        }
        .ignoresSafeArea()
    }
}

// ── Cut-out shape (full rect minus rounded window) ────────────────────────
private struct ScanCutoutShape: Shape {
    let rect: CGRect
    let cornerRadius: CGFloat

    func path(in bounds: CGRect) -> Path {
        var p = Rectangle().path(in: bounds)
        p.addPath(
            RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                .path(in: rect)
        )
        return p
    }
}

// ── Corner bracket tick marks ─────────────────────────────────────────────
private struct ReticleCorners: View {
    let center: CGPoint
    let size: CGFloat
    let cornerLength: CGFloat
    let lineWidth: CGFloat
    let color: Color

    var body: some View {
        Canvas { ctx, _ in
            let half = size / 2
            let corners: [(CGFloat, CGFloat)] = [
                (-half, -half), (half, -half), (half, half), (-half, half)
            ]
            for (dx, dy) in corners {
                var path = Path()
                let cx = center.x + dx
                let cy = center.y + dy
                let hx = cornerLength * (dx < 0 ? 1 : -1)
                let vy = cornerLength * (dy < 0 ? 1 : -1)
                path.move(to: CGPoint(x: cx + hx, y: cy))
                path.addLine(to: CGPoint(x: cx, y: cy))
                path.addLine(to: CGPoint(x: cx, y: cy + vy))
                ctx.stroke(path, with: .color(color),
                           style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
            }
        }
    }
}

// ── Animated sweep line ───────────────────────────────────────────────────
private struct ScanSweepLine: View {
    let rect: CGRect
    @State private var offset: CGFloat = 0

    var body: some View {
        Rectangle()
            .fill(
                LinearGradient(
                    colors: [.clear, Color.green.opacity(0.8), .clear],
                    startPoint: .leading, endPoint: .trailing
                )
            )
            .frame(width: rect.width, height: 2)
            .offset(y: rect.minY + offset)
            .onAppear {
                withAnimation(
                    .linear(duration: 1.4).repeatForever(autoreverses: true)
                ) { offset = rect.height }
            }
    }
}`,
  },
  swiftui_ios_capture: {
    filename: "CaptureCardView.swift",
    code: `import SwiftUI

// ── Capture Card ──────────────────────────────────────────────────────────
// Bottom-sheet that appears immediately after a successful scan.
// Three states: .loading → .resolved(metadata) → saved; or .failed.

struct CaptureCardView: View {
    let barcode: String
    @Binding var isPresented: Bool
    var onDismiss: () -> Void

    @State private var phase: LookupPhase = .loading
    @State private var title = ""
    @State private var isSaving = false

    enum LookupPhase { case loading, resolved(String), failed }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Drag handle
            Capsule()
                .fill(Color.white.opacity(0.35))
                .frame(width: 36, height: 5)
                .frame(maxWidth: .infinity)
                .padding(.top, 10)
                .padding(.bottom, 14)

            VStack(alignment: .leading, spacing: 14) {
                headerRow
                Divider()
                fieldsSection
                saveButton
            }
            .padding(.horizontal, 20)
            .padding(.bottom, 24)
        }
        .background(
            .regularMaterial,
            in: RoundedRectangle(cornerRadius: 24, style: .continuous)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .strokeBorder(Color.white.opacity(0.18), lineWidth: 0.5)
        )
        .shadow(color: .black.opacity(0.3), radius: 24, y: -4)
        .padding(.horizontal, 12)
        .padding(.bottom, 12)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottom)
        .task { await runLookup() }
    }

    private var headerRow: some View {
        HStack(spacing: 12) {
            // Icon — spinner while loading, SF symbol when resolved
            ZStack {
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .fill(Color.accentColor.opacity(0.15))
                    .frame(width: 52, height: 52)
                switch phase {
                case .loading:
                    ProgressView().tint(.accentColor)
                case .resolved:
                    Image(systemName: "barcode.viewfinder")
                        .font(.system(size: 22))
                        .foregroundStyle(Color.accentColor)
                case .failed:
                    Image(systemName: "exclamationmark.circle")
                        .font(.system(size: 22))
                        .foregroundStyle(.red)
                }
            }

            VStack(alignment: .leading, spacing: 2) {
                switch phase {
                case .loading:
                    Text("Looking up…").font(.headline)
                    Text(barcode).font(.caption).foregroundStyle(.secondary)
                case .resolved(let t):
                    Text(t).font(.headline).lineLimit(2)
                    Text(barcode).font(.caption).foregroundStyle(.secondary)
                case .failed:
                    Text("Not found").font(.headline)
                    Text("Enter details manually").font(.caption).foregroundStyle(.secondary)
                }
            }
        }
    }

    private var fieldsSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Title")
                .font(.caption)
                .foregroundStyle(.secondary)
                .textCase(.uppercase)
                .tracking(0.5)
            TextField("Title", text: $title)
                .textFieldStyle(.roundedBorder)
                .disabled(phase == .loading)
        }
    }

    private var saveButton: some View {
        Button {
            isSaving = true
            // Persist via SwiftData model context
            onDismiss()
        } label: {
            Label("Add to Collection", systemImage: "plus.circle.fill")
                .frame(maxWidth: .infinity)
        }
        .buttonStyle(.borderedProminent)
        .disabled(title.isEmpty || isSaving)
    }

    private func runLookup() async {
        // Replace with your actual lookup service call
        try? await Task.sleep(for: .milliseconds(800))
        await MainActor.run {
            title = "Sample Item"
            phase = .resolved("Sample Item")
        }
    }
}`,
  },
};

function ReticlePreview() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 340,
        aspectRatio: "9/16",
        borderRadius: 28,
        overflow: "hidden",
        background: "#0a0a0a",
        margin: "0 auto",
      }}
    >
      {/* Camera feed simulation */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        opacity: 0.8,
      }} />

      {/* Dimmed overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.5)",
        WebkitMaskImage: "radial-gradient(ellipse 160px 160px at 50% 44%, transparent 99%, black 100%)",
        maskImage: "radial-gradient(ellipse 160px 160px at 50% 44%, transparent 99%, black 100%)",
      }} />

      {/* Reticle frame */}
      <div style={{
        position: "absolute",
        left: "50%", top: "44%",
        transform: "translate(-50%, -50%)",
        width: 160, height: 160,
      }}>
        {/* Corner brackets */}
        {[
          { top: 0, left: 0, borderTop: "3px solid #fff", borderLeft: "3px solid #fff", borderRadius: "4px 0 0 0" },
          { top: 0, right: 0, borderTop: "3px solid #fff", borderRight: "3px solid #fff", borderRadius: "0 4px 0 0" },
          { bottom: 0, left: 0, borderBottom: "3px solid #fff", borderLeft: "3px solid #fff", borderRadius: "0 0 0 4px" },
          { bottom: 0, right: 0, borderBottom: "3px solid #fff", borderRight: "3px solid #fff", borderRadius: "0 0 4px 0" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 20, height: 20, ...s }} />
        ))}
        {/* Sweep line */}
        <div style={{
          position: "absolute", left: 4, right: 4, height: 2,
          background: "linear-gradient(90deg, transparent, rgba(52,168,101,0.9), transparent)",
          top: "40%",
          animation: "sweep 1.4s ease-in-out infinite alternate",
        }} />
      </div>

      {/* Hint text */}
      <div style={{
        position: "absolute", bottom: "18%", left: 0, right: 0,
        textAlign: "center", color: "rgba(255,255,255,0.7)",
        fontSize: 12, letterSpacing: "0.04em",
      }}>
        Point at barcode
      </div>

      <style>{`
        @keyframes sweep {
          from { top: 10%; }
          to   { top: 85%; }
        }
      `}</style>
    </div>
  );
}

function CaptureCardPreview() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 340,
        aspectRatio: "9/16",
        borderRadius: 28,
        overflow: "hidden",
        background: "#0a0a0a",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Blurred background */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)" }} />

      {/* Bottom sheet card */}
      <div style={{
        position: "relative",
        margin: 10,
        borderRadius: 20,
        background: "rgba(30,30,40,0.92)",
        backdropFilter: "blur(20px)",
        border: "0.5px solid rgba(255,255,255,0.15)",
        padding: "0 0 20px",
      }}>
        {/* Handle */}
        <div style={{
          width: 36, height: 5, borderRadius: 3,
          background: "rgba(255,255,255,0.3)",
          margin: "10px auto 14px",
        }} />
        {/* Header row */}
        <div style={{ display: "flex", gap: 12, padding: "0 16px", alignItems: "center" }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: "rgba(52,168,101,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22,
          }}>📚</div>
          <div>
            <div style={{ color: "#f2f2f6", fontWeight: 600, fontSize: 15 }}>The Design of Everyday Things</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 }}>978-0-465-06710-7</div>
          </div>
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "14px 0" }} />
        {/* Fields */}
        <div style={{ padding: "0 16px" }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Title</div>
          <div style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, padding: "8px 12px",
            color: "#f2f2f6", fontSize: 14,
          }}>The Design of Everyday Things</div>
        </div>
        {/* Button */}
        <div style={{ padding: "12px 16px 0" }}>
          <div style={{
            background: "#34a865",
            borderRadius: 10,
            padding: "11px 0",
            textAlign: "center",
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
          }}>+ Add to Collection</div>
        </div>
      </div>
    </div>
  );
}

export default function BarcodeScannerPage() {
  return (
    <div>
      <PageHeader
        title="Barcode Scanner"
        description="Camera-based barcode scanning with an animated reticle overlay and a bottom-sheet result card. Used in Scanflo for building physical media catalogs."
      />

      {/* ── Overview ──────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Overview</h2>
        <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
          The barcode scanner pattern consists of two cooperating views:
        </p>
        <ul className="space-y-2 text-[15px] text-[rgb(var(--text-secondary))]">
          <li className="flex gap-2"><span className="text-[rgb(var(--accent))] shrink-0 mt-0.5">→</span><span><strong className="text-[rgb(var(--text-primary))]">ScanReticleOverlay</strong> — full-screen layer rendered on top of an AVFoundation or DataScannerViewController preview. Dims the surroundings with a rectangular cutout window, draws corner brackets, and animates a sweep line while a scan is in progress.</span></li>
          <li className="flex gap-2"><span className="text-[rgb(var(--accent))] shrink-0 mt-0.5">→</span><span><strong className="text-[rgb(var(--text-primary))]">CaptureCardView</strong> — bottom-sheet shown immediately after a barcode is detected. Runs a background lookup (OpenLibrary, Open Food Facts, etc.) and cycles through <code>loading → resolved → saved</code> or <code>failed</code> states, letting the user edit the title before saving to SwiftData.</span></li>
        </ul>
      </section>

      {/* ── Reticle Preview ───────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-6">Scan Reticle</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-[12px] overflow-hidden border border-[rgb(var(--border))] p-6 bg-[rgb(var(--surface))]">
            <ReticlePreview />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-[rgb(var(--text-primary))]">States</h3>
            <div className="space-y-3 text-[14px] text-[rgb(var(--text-secondary))]">
              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                <div><span className="text-[rgb(var(--text-primary))] font-medium">Scanning</span> — white corner brackets + animated sweep line</div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                <div><span className="text-[rgb(var(--text-primary))] font-medium">Detected</span> — brackets turn green (0.25 s ease-in-out), sweep line disappears</div>
              </div>
            </div>
            <h3 className="font-semibold text-[rgb(var(--text-primary))] pt-2">Implementation notes</h3>
            <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Use <code>ScanCutoutShape</code> (even-odd fill rule) so SwiftUI never draws inside the window</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> <code>Canvas</code> is used for corner brackets to avoid four separate <code>Path</code> views</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Sweep line uses a <code>.linear.repeatForever(autoreverses: true)</code> animation — pause it via <code>withAnimation(.default) { isAnimating = false }</code> on detect</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <PlatformTabs
            tabs={[
              { label: "SwiftUI · iOS", ...CODE.swiftui_ios },
            ]}
          />
        </div>
      </section>

      {/* ── Capture Card ──────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-6">Capture Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-[12px] overflow-hidden border border-[rgb(var(--border))] p-6 bg-[rgb(var(--surface))]">
            <CaptureCardPreview />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-[rgb(var(--text-primary))]">Lookup states</h3>
            <div className="space-y-3 text-[14px] text-[rgb(var(--text-secondary))]">
              {[
                { label: "loading", desc: "ProgressView spinner in icon area; title field disabled; immediately shown on barcode detect" },
                { label: "resolved", desc: "Title auto-populated from API result; user can edit; media-type icon badge shown" },
                { label: "failed", desc: "Error icon; manual title entry required; still saveable so no scan is wasted" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex gap-3 items-start">
                  <code className="text-[rgb(var(--accent))] text-[12px] shrink-0 mt-0.5 font-mono">.{label}</code>
                  <div>{desc}</div>
                </div>
              ))}
            </div>
            <h3 className="font-semibold text-[rgb(var(--text-primary))] pt-2">Design decisions</h3>
            <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Bottom-sheet uses <code>.regularMaterial</code> to inherit the camera feed colour</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> A 0.5 pt glass border gives the card edge definition on dark backgrounds</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Save button stays disabled while <code>title.isEmpty</code> to avoid orphaned records</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Lookup runs inside a Swift concurrency <code>.task</code> — auto-cancelled if the sheet is dismissed</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <PlatformTabs
            tabs={[
              { label: "SwiftUI · iOS", ...CODE.swiftui_ios_capture },
            ]}
          />
        </div>
      </section>

      {/* ── Accessibility ─────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Accessibility</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {["Concern", "Approach"].map((h) => (
                  <th key={h} className="text-left py-2 pr-6 font-semibold text-[rgb(var(--text-secondary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[rgb(var(--text-secondary))]">
              {[
                ["Camera permission", "Request only on first scan; show clear reason string in Info.plist"],
                ["VoiceOver", "Reticle overlay sets .accessibilityHidden(true); capture card announces state changes via .accessibilityValue"],
                ["Dynamic Type", "All card text uses .font(.headline / .caption) — auto-scales correctly"],
                ["Reduce Motion", "Sweep-line animation respects @Environment(\\.accessibilityReduceMotion)"],
              ].map(([c, a]) => (
                <tr key={c} className="border-b border-[rgb(var(--border-subtle))]">
                  <td className="py-2.5 pr-6 font-medium text-[rgb(var(--text-primary))]">{c}</td>
                  <td className="py-2.5">{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
