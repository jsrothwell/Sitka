import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Barcode Scanner" };

const CODE = {
  swift: {
    filename: "ScanReticleOverlay.swift",
    code: `import SwiftUI

// ── Scan Reticle Overlay ───────────────────────────────────────────────────
// Full-screen overlay: dimmed backdrop with a clear cutout window,
// animated corner brackets, and a sweep-line while scanning.

struct ScanReticleOverlay: View {
    var isAnimating: Bool   // true = scanning, false = success/idle

    var body: some View {
        GeometryReader { geo in
            let cx = geo.size.width / 2
            let cy = geo.size.height / 2
            let half: CGFloat = 220 / 2

            ZStack {
                ScanCutoutShape(
                    rect: CGRect(x: cx - half, y: cy - half, width: 220, height: 220),
                    cornerRadius: 14
                )
                .fill(Color.black.opacity(0.55))

                ReticleCorners(
                    center: CGPoint(x: cx, y: cy),
                    size: 220, cornerLength: 24, lineWidth: 3,
                    color: isAnimating ? .white : .green
                )
                .animation(.easeInOut(duration: 0.25), value: isAnimating)

                if isAnimating { ScanSweepLine(rect: CGRect(x: cx - half, y: cy - half, width: 220, height: 220)) }
            }
        }
        .ignoresSafeArea()
    }
}

private struct ScanCutoutShape: Shape {
    let rect: CGRect; let cornerRadius: CGFloat
    func path(in bounds: CGRect) -> Path {
        var p = Rectangle().path(in: bounds)
        p.addPath(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous).path(in: rect))
        return p
    }
}

private struct ReticleCorners: View {
    let center: CGPoint; let size, cornerLength, lineWidth: CGFloat; let color: Color
    var body: some View {
        Canvas { ctx, _ in
            let half = size / 2
            for (dx, dy) in [(-half, -half), (half, -half), (half, half), (-half, half)] {
                var path = Path()
                let (cx, cy) = (center.x + dx, center.y + dy)
                path.move(to: .init(x: cx + cornerLength * (dx < 0 ? 1 : -1), y: cy))
                path.addLine(to: .init(x: cx, y: cy))
                path.addLine(to: .init(x: cx, y: cy + cornerLength * (dy < 0 ? 1 : -1)))
                ctx.stroke(path, with: .color(color), style: .init(lineWidth: lineWidth, lineCap: .round))
            }
        }
    }
}

private struct ScanSweepLine: View {
    let rect: CGRect
    @State private var offset: CGFloat = 0
    var body: some View {
        Rectangle()
            .fill(LinearGradient(colors: [.clear, .green.opacity(0.8), .clear], startPoint: .leading, endPoint: .trailing))
            .frame(width: rect.width, height: 2)
            .offset(y: rect.minY + offset)
            .onAppear {
                withAnimation(.linear(duration: 1.4).repeatForever(autoreverses: true)) { offset = rect.height }
            }
    }
}`,
  },
  macos: {
    filename: "CaptureCardView.swift",
    code: `import SwiftUI

// ── Capture Card (bottom-sheet result) ───────────────────────────────────
// Shown immediately after a barcode is detected. Runs an async lookup
// and cycles: .loading → .resolved(metadata) → saved, or .failed.

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
            Capsule()
                .fill(Color.white.opacity(0.35))
                .frame(width: 36, height: 5)
                .frame(maxWidth: .infinity)
                .padding(.top, 10).padding(.bottom, 14)

            VStack(alignment: .leading, spacing: 14) {
                headerRow
                Divider()
                fieldsSection
                saveButton
            }
            .padding(.horizontal, 20).padding(.bottom, 24)
        }
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 24, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 24, style: .continuous).strokeBorder(Color.white.opacity(0.18), lineWidth: 0.5))
        .shadow(color: .black.opacity(0.3), radius: 24, y: -4)
        .padding(.horizontal, 12).padding(.bottom, 12)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottom)
        .task { await runLookup() }
    }

    private var headerRow: some View {
        HStack(spacing: 12) {
            ZStack {
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .fill(Color.accentColor.opacity(0.15)).frame(width: 52, height: 52)
                switch phase {
                case .loading: ProgressView().tint(.accentColor)
                case .resolved: Image(systemName: "barcode.viewfinder").font(.system(size: 22)).foregroundStyle(Color.accentColor)
                case .failed:   Image(systemName: "exclamationmark.circle").font(.system(size: 22)).foregroundStyle(.red)
                }
            }
            VStack(alignment: .leading, spacing: 2) {
                switch phase {
                case .loading:        Text("Looking up…").font(.headline)
                case .resolved(let t): Text(t).font(.headline).lineLimit(2)
                case .failed:         Text("Not found").font(.headline)
                }
                Text(barcode).font(.caption).foregroundStyle(.secondary)
            }
        }
    }

    private var fieldsSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Title").font(.caption).foregroundStyle(.secondary).textCase(.uppercase).tracking(0.5)
            TextField("Title", text: $title).textFieldStyle(.roundedBorder).disabled(phase == .loading)
        }
    }

    private var saveButton: some View {
        Button { isSaving = true; onDismiss() } label: {
            Label("Add to Collection", systemImage: "plus.circle.fill").frame(maxWidth: .infinity)
        }
        .buttonStyle(.borderedProminent).disabled(title.isEmpty || isSaving)
    }

    private func runLookup() async {
        try? await Task.sleep(for: .milliseconds(800))
        await MainActor.run { title = "Sample Item"; phase = .resolved("Sample Item") }
    }
}`,
  },
  react: {
    filename: "BarcodeScanner.tsx",
    code: `"use client";

import { useEffect, useRef, useState } from "react";

// Web barcode scanner using the BarcodeDetector API (Chrome/Edge 83+)
// or a library like @zxing/library for broader browser support.

type LookupPhase = "idle" | "scanning" | "resolved" | "failed";

export function BarcodeScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<LookupPhase>("idle");
  const [result, setResult] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!("BarcodeDetector" in window)) return;
    let stream: MediaStream;
    let raf: number;

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((s) => {
      stream = s;
      if (videoRef.current) videoRef.current.srcObject = s;
      setPhase("scanning");

      const detector = new (window as any).BarcodeDetector({ formats: ["ean_13", "qr_code", "upc_a"] });

      const scan = async () => {
        if (videoRef.current?.readyState === 4) {
          const codes = await detector.detect(videoRef.current);
          if (codes.length > 0) {
            setResult(codes[0].rawValue);
            setPhase("resolved");
            lookup(codes[0].rawValue);
            return; // stop scanning
          }
        }
        raf = requestAnimationFrame(scan);
      };
      raf = requestAnimationFrame(scan);
    });

    return () => { stream?.getTracks().forEach((t) => t.stop()); cancelAnimationFrame(raf); };
  }, []);

  const lookup = async (barcode: string) => {
    try {
      const res = await fetch(\`https://openlibrary.org/api/books?bibkeys=ISBN:\${barcode}&format=json&jscmd=data\`);
      const data = await res.json();
      const book = data[\`ISBN:\${barcode}\`];
      setTitle(book?.title ?? "");
    } catch {
      setPhase("failed");
    }
  };

  return (
    <div style={{ maxWidth: 340, margin: "0 auto" }}>
      {/* Camera viewport */}
      <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: 16, overflow: "hidden", background: "#000" }}>
        <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* Reticle overlay */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.45)",
          WebkitMaskImage: "radial-gradient(150px 150px at 50% 50%, transparent 99%, black 100%)",
          maskImage: "radial-gradient(150px 150px at 50% 50%, transparent 99%, black 100%)",
        }} />
        <p style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
          {phase === "scanning" ? "Point at barcode" : phase === "resolved" ? "Found!" : "Starting camera…"}
        </p>
      </div>

      {/* Result card */}
      {phase === "resolved" && (
        <div style={{ marginTop: 12, padding: "16px", borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p style={{ fontSize: 12, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Title</p>
          <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--text-primary)", fontSize: 14 }} />
          <button style={{ marginTop: 12, width: "100%", padding: "10px", borderRadius: 8, background: "var(--accent)", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>
            Save to Collection
          </button>
        </div>
      )}
    </div>
  );
}`,
  },
  html: {
    filename: "barcode-scanner.html",
    code: `<!-- Barcode scanner using the BarcodeDetector Web API -->
<!-- Fallback: use <input capture="environment" accept="image/*"> on unsupported browsers -->

<style>
  .scanner-wrap { position: relative; max-width: 340px; margin: 0 auto; }
  .scanner-video { width: 100%; aspect-ratio: 4/3; border-radius: 16px; object-fit: cover; background: #000; display: block; }
  .reticle {
    position: absolute; inset: 0; border-radius: 16px;
    background: rgba(0,0,0,0.45);
    -webkit-mask-image: radial-gradient(150px 150px at 50% 50%, transparent 99%, black 100%);
    mask-image:         radial-gradient(150px 150px at 50% 50%, transparent 99%, black 100%);
    pointer-events: none;
  }
  .scan-hint { position: absolute; bottom: 12px; left: 0; right: 0; text-align: center; color: rgba(255,255,255,0.7); font-size: 13px; }
  .capture-card { margin-top: 12px; padding: 16px; border-radius: 12px; border: 1px solid #333; background: #1a1a1a; }
  .capture-card label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: #888; margin-bottom: 6px; }
  .capture-card input { width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #333; background: transparent; color: #f2f2f6; font-size: 14px; box-sizing: border-box; }
  .capture-card button { margin-top: 10px; width: 100%; padding: 10px; border-radius: 8px; background: #34a865; color: #fff; font-weight: 600; border: none; cursor: pointer; }
</style>

<div class="scanner-wrap">
  <video class="scanner-video" id="feed" autoplay playsinline muted></video>
  <div class="reticle"></div>
  <p class="scan-hint" id="hint">Starting camera…</p>
</div>

<div class="capture-card" id="card" hidden>
  <label>Title</label>
  <input id="title-input" type="text" />
  <button onclick="saveItem()">Save to Collection</button>
</div>

<script>
  const video = document.getElementById("feed");
  const hint  = document.getElementById("hint");
  const card  = document.getElementById("card");
  const titleInput = document.getElementById("title-input");

  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
    video.srcObject = stream;
    hint.textContent = "Point at barcode";
    startScanning(stream);
  });

  function startScanning(stream) {
    if (!("BarcodeDetector" in window)) return;
    const detector = new BarcodeDetector({ formats: ["ean_13", "upc_a", "qr_code"] });
    let running = true;
    const scan = async () => {
      if (!running) return;
      if (video.readyState === 4) {
        const codes = await detector.detect(video);
        if (codes.length > 0) {
          stream.getTracks().forEach((t) => t.stop());
          hint.textContent = "Found: " + codes[0].rawValue;
          card.hidden = false;
          titleInput.value = "";
          return;
        }
      }
      requestAnimationFrame(scan);
    };
    requestAnimationFrame(scan);
  }

  function saveItem() { alert("Saved: " + titleInput.value); }
</script>`,
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
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        opacity: 0.8,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.5)",
        WebkitMaskImage: "radial-gradient(ellipse 160px 160px at 50% 44%, transparent 99%, black 100%)",
        maskImage: "radial-gradient(ellipse 160px 160px at 50% 44%, transparent 99%, black 100%)",
      }} />
      <div style={{
        position: "absolute",
        left: "50%", top: "44%",
        transform: "translate(-50%, -50%)",
        width: 160, height: 160,
      }}>
        {[
          { top: 0, left: 0, borderTop: "3px solid #fff", borderLeft: "3px solid #fff", borderRadius: "4px 0 0 0" } as React.CSSProperties,
          { top: 0, right: 0, borderTop: "3px solid #fff", borderRight: "3px solid #fff", borderRadius: "0 4px 0 0" } as React.CSSProperties,
          { bottom: 0, left: 0, borderBottom: "3px solid #fff", borderLeft: "3px solid #fff", borderRadius: "0 0 0 4px" } as React.CSSProperties,
          { bottom: 0, right: 0, borderBottom: "3px solid #fff", borderRight: "3px solid #fff", borderRadius: "0 0 4px 0" } as React.CSSProperties,
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 20, height: 20, ...s }} />
        ))}
        <div style={{
          position: "absolute", left: 4, right: 4, height: 2,
          background: "linear-gradient(90deg, transparent, rgba(52,168,101,0.9), transparent)",
          top: "40%",
          animation: "sweep 1.4s ease-in-out infinite alternate",
        }} />
      </div>
      <div style={{
        position: "absolute", bottom: "18%", left: 0, right: 0,
        textAlign: "center", color: "rgba(255,255,255,0.7)",
        fontSize: 12, letterSpacing: "0.04em",
      }}>
        Point at barcode
      </div>
      <style>{`@keyframes sweep { from { top: 10%; } to { top: 85%; } }`}</style>
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
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)" }} />
      <div style={{
        position: "relative",
        margin: 10,
        borderRadius: 20,
        background: "rgba(30,30,40,0.92)",
        backdropFilter: "blur(20px)",
        border: "0.5px solid rgba(255,255,255,0.15)",
        padding: "0 0 20px",
      }}>
        <div style={{ width: 36, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.3)", margin: "10px auto 14px" }} />
        <div style={{ display: "flex", gap: 12, padding: "0 16px", alignItems: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(52,168,101,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📚</div>
          <div>
            <div style={{ color: "#f2f2f6", fontWeight: 600, fontSize: 15 }}>The Design of Everyday Things</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 }}>978-0-465-06710-7</div>
          </div>
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "14px 0" }} />
        <div style={{ padding: "0 16px" }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Title</div>
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", color: "#f2f2f6", fontSize: 14 }}>The Design of Everyday Things</div>
        </div>
        <div style={{ padding: "12px 16px 0" }}>
          <div style={{ background: "#34a865", borderRadius: 10, padding: "11px 0", textAlign: "center", color: "#fff", fontWeight: 600, fontSize: 15 }}>+ Add to Collection</div>
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

      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Overview</h2>
        <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
          Two cooperating views form the scanning experience:
        </p>
        <ul className="space-y-2 text-[15px] text-[rgb(var(--text-secondary))]">
          <li className="flex gap-2"><span className="text-[rgb(var(--accent))] shrink-0 mt-0.5">→</span><span><strong className="text-[rgb(var(--text-primary))]">ScanReticleOverlay</strong> — full-screen layer on top of the camera preview. Dims the surroundings with a rectangular cutout window, draws corner brackets, and animates a sweep line while scanning.</span></li>
          <li className="flex gap-2"><span className="text-[rgb(var(--accent))] shrink-0 mt-0.5">→</span><span><strong className="text-[rgb(var(--text-primary))]">CaptureCardView</strong> — bottom-sheet shown on detect. Runs a background metadata lookup and cycles through <code>loading → resolved → saved</code> or <code>failed</code>, letting the user edit before saving to SwiftData.</span></li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-6">Scan Reticle</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-[12px] overflow-hidden border border-[rgb(var(--border))] p-6 bg-[rgb(var(--surface))]">
            <ReticlePreview />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-[rgb(var(--text-primary))]">States</h3>
            <div className="space-y-3 text-[14px] text-[rgb(var(--text-secondary))]">
              <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" /><div><span className="text-[rgb(var(--text-primary))] font-medium">Scanning</span> — white corner brackets + animated sweep line</div></div>
              <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" /><div><span className="text-[rgb(var(--text-primary))] font-medium">Detected</span> — brackets turn green (0.25 s ease-in-out), sweep line removed</div></div>
            </div>
            <h3 className="font-semibold text-[rgb(var(--text-primary))] pt-2">Implementation notes</h3>
            <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> <code>ScanCutoutShape</code> uses even-odd fill so SwiftUI never draws inside the window</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> <code>Canvas</code> draws all four corner brackets in a single pass</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Sweep line uses <code>.repeatForever(autoreverses: true)</code> — set <code>isAnimating = false</code> on detect to stop it</li>
            </ul>
          </div>
        </div>
      </section>

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
                { label: ".loading", desc: "ProgressView spinner; title field disabled; shown immediately on detect" },
                { label: ".resolved", desc: "Title populated from API; user can edit; media-type icon badge shown" },
                { label: ".failed", desc: "Error icon; manual title entry required; still saveable" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex gap-3 items-start">
                  <code className="text-[rgb(var(--accent))] text-[12px] shrink-0 mt-0.5 font-mono">{label}</code>
                  <div>{desc}</div>
                </div>
              ))}
            </div>
            <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))] pt-2">
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Uses <code>.regularMaterial</code> to inherit camera feed colour</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Lookup runs in <code>.task</code> — auto-cancelled if the sheet is dismissed</li>
              <li className="flex gap-2"><span className="text-[rgb(var(--accent))]">→</span> Save button disabled while <code>title.isEmpty</code> to avoid orphaned records</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Code</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          SwiftUI tabs show <strong>ScanReticleOverlay</strong> (iOS) and <strong>CaptureCardView</strong> (macOS tab). React and HTML tabs show the equivalent web implementation using the <code>BarcodeDetector</code> API.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      <section className="mb-12">
        <h2 className="text-[22px] font-bold text-[rgb(var(--text-primary))] mb-4">Accessibility</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {["Concern", "Approach"].map((h) => <th key={h} className="text-left py-2 pr-6 font-semibold text-[rgb(var(--text-secondary))]">{h}</th>)}
              </tr>
            </thead>
            <tbody className="text-[rgb(var(--text-secondary))]">
              {[
                ["Camera permission", "Request only on first scan; include NSCameraUsageDescription reason string"],
                ["VoiceOver", "Reticle overlay sets .accessibilityHidden(true); card announces state changes via .accessibilityValue"],
                ["Reduce Motion", "Sweep-line animation checks @Environment(\\.accessibilityReduceMotion)"],
                ["Dynamic Type", "All card text uses system font styles — scales automatically"],
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
