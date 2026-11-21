"use client";

import { useRef, useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { PropsTable, type PropRow } from "@/site/docs/PropsTable";
import { ArrowList, DocSection, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

const MASK_W = 200;
const MASK_H = 300; // 2:3, the cover-tile ratio

const PROPS: PropRow[] = [
  { name: "image", type: "Blob | UIImage", required: true, description: "The picked or captured photo." },
  { name: "aspectRatio", type: "number", default: "2 / 3", description: "Fixed mask ratio. Match the tile the image will be shown in — there is no free-form crop." },
  { name: "maxScale", type: "number", default: "4", description: "Zoom ceiling. Minimum is always 1 (image fills the mask), so the result never has empty edges." },
  { name: "onCancel", type: "() => void", required: true, description: "Discards the photo." },
  { name: "onConfirm", type: "(data: Blob) => void", required: true, description: "Receives a JPEG of exactly what's under the mask, rendered at 3× the mask size." },
];

const CODE = {
  react: {
    filename: "ImageCrop.tsx",
    code: `export function ImageCrop({ src, aspectRatio = 2 / 3, maxScale = 4, onCancel, onConfirm }: ImageCropProps) {
  const mask = { w: 280, h: 280 / aspectRatio };
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Drag (pointer events) to reposition; wheel / pinch / slider to zoom, clamped to [1, maxScale].
  // Arrow keys nudge by 10px, +/- zoom by 0.1 — the crop must work without a pointer.

  async function confirm() {
    const img = await loadImage(src);
    const k = 3;                                             // Render scale: sharp enough, downsampled on save
    const canvas = Object.assign(document.createElement("canvas"), { width: mask.w * k, height: mask.h * k });
    const fit = coverSize(img, mask.w * k, mask.h * k);      // "cover" fit, like object-fit: cover
    const w = fit.w * scale, h = fit.h * scale;
    canvas.getContext("2d")!.drawImage(img,
      (canvas.width - w) / 2 + offset.x * k, (canvas.height - h) / 2 + offset.y * k, w, h);
    canvas.toBlob((b) => b && onConfirm(b), "image/jpeg", 0.9);
  }

  return (
    <div className="flex flex-col bg-black text-white" role="dialog" aria-label="Adjust cover">
      <header className="flex justify-between p-4">
        <button onClick={onCancel}>Cancel</button>
        <h2 className="font-semibold">Adjust Cover</h2>
        <button onClick={confirm} className="font-semibold text-[rgb(var(--accent))]">Use Photo</button>
      </header>
      {/* mask + image … */}
      <p className="text-center text-[12px] text-white/85">Drag to reposition, pinch to zoom</p>
    </div>
  );
}`,
  },
  html: {
    filename: "image-crop.html",
    code: `<div class="crop" role="dialog" aria-label="Adjust cover">
  <header>
    <button>Cancel</button><h2>Adjust Cover</h2><button class="crop__use">Use Photo</button>
  </header>
  <div class="crop__mask" tabindex="0" aria-label="Crop area. Arrow keys move, plus and minus zoom.">
    <img src="photo.jpg" alt="" style="transform: translate(0px, 0px) scale(1)">
  </div>
  <input type="range" min="1" max="4" step="0.01" value="1" aria-label="Zoom">
  <p>Drag to reposition, pinch to zoom</p>
</div>

<style>
.crop { background: #000; color: #fff; display: grid; justify-items: center; gap: 12px; padding-bottom: 24px; }
.crop header { width: 100%; display: flex; justify-content: space-between; padding: 16px; }
.crop__use { color: rgb(var(--accent)); font-weight: 600; }
.crop__mask { width: 280px; aspect-ratio: 2 / 3; overflow: hidden; border-radius: 12px;
              outline: 2px solid #fff; touch-action: none; cursor: grab; }
.crop__mask img { width: 100%; height: 100%; object-fit: cover; transform-origin: center; }
</style>`,
  },
  swift: {
    filename: "ThumbnailCropView.swift",
    code: `import SwiftUI

/// A minimal, native crop step shown after an image is picked or captured —
/// drag to reposition, pinch to zoom, fixed to the tile's aspect ratio.
/// Deliberately not a photo editor: one mask, one gesture pair, one "Use Photo".
struct ThumbnailCropView: View {
    let image: UIImage
    var aspectRatio: CGFloat = 2.0 / 3.0
    var onCancel: () -> Void
    var onConfirm: (Data) -> Void

    @State private var scale: CGFloat = 1
    @State private var offset: CGSize = .zero
    @GestureState private var gestureScale: CGFloat = 1
    @GestureState private var gestureOffset: CGSize = .zero

    private var maskSize: CGSize { CGSize(width: 280, height: 280 / aspectRatio) }

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Button("Cancel", action: onCancel).foregroundStyle(.white)
                Spacer()
                Text("Adjust Cover").font(.headline).foregroundStyle(.white)
                Spacer()
                Button("Use Photo", action: confirm).fontWeight(.semibold)
            }
            .padding()

            Spacer()

            Image(uiImage: image)
                .resizable()
                .scaledToFill()
                .frame(width: maskSize.width, height: maskSize.height)
                .scaleEffect(scale * gestureScale)
                .offset(x: offset.width + gestureOffset.width, y: offset.height + gestureOffset.height)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).strokeBorder(.white, lineWidth: 2))
                .contentShape(Rectangle())
                .gesture(DragGesture()
                    .updating($gestureOffset) { value, state, _ in state = value.translation }
                    .onEnded { offset.width += $0.translation.width; offset.height += $0.translation.height })
                .simultaneousGesture(MagnificationGesture()
                    .updating($gestureScale) { value, state, _ in state = value }
                    .onEnded { scale = max(1, min(4, scale * $0)) })
                .accessibilityElement()
                .accessibilityLabel("Crop area")
                .accessibilityAdjustableAction { direction in
                    scale = direction == .increment ? min(4, scale + 0.25) : max(1, scale - 0.25)
                }

            Text("Drag to reposition, pinch to zoom")
                .font(.caption).foregroundStyle(.white.opacity(0.85))
                .padding(.top)

            Spacer()
        }
        .background(Color.black.ignoresSafeArea())
    }

    /// Renders exactly the pixels under the mask at 3× the mask size.
    private func confirm() { /* UIGraphicsImageRenderer → jpegData(0.9) → onConfirm */ }
}`,
  },
};

export default function ImageCropPage() {
  const [scale, setScale] = useState(1.2);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);

  function onKey(e: React.KeyboardEvent) {
    const step = 10;
    const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (moves[e.key]) {
      e.preventDefault();
      setOffset((o) => ({ x: o.x + moves[e.key][0], y: o.y + moves[e.key][1] }));
    } else if (e.key === "+" || e.key === "=") setScale((s) => Math.min(4, s + 0.1));
    else if (e.key === "-") setScale((s) => Math.max(1, s - 0.1));
  }

  return (
    <div>
      <PageHeader
        title="Image Crop"
        badge="New"
        description="A single, fixed-ratio crop step after picking or capturing a photo: drag to reposition, pinch to zoom, one 'Use Photo'. Deliberately not a photo editor — the ratio is locked to the tile the image will appear in, so every result fits."
      />
      <SourceNote sources={[{ app: "scanflo", file: "DesignTokens/ThumbnailCropView.swift" }]} />

      <PreviewSection>
        <div className="mx-auto flex max-w-sm flex-col items-center gap-3 rounded-xl bg-black pb-5 text-white">
          <div className="flex w-full items-center justify-between px-4 py-3 text-[14px]">
            <button>Cancel</button>
            <span className="font-semibold">Adjust Cover</span>
            <button className="font-semibold text-[rgb(var(--accent))]">Use Photo</button>
          </div>
          <div
            tabIndex={0}
            role="group"
            aria-label="Crop area. Arrow keys move the image, plus and minus zoom."
            onKeyDown={onKey}
            onPointerDown={(e) => {
              drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => drag.current && setOffset({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y })}
            onPointerUp={() => (drag.current = null)}
            onWheel={(e) => setScale((s) => Math.max(1, Math.min(4, s - e.deltaY * 0.002)))}
            className="relative cursor-grab touch-none overflow-hidden rounded-xl outline outline-2 outline-white focus-visible:outline-[rgb(var(--accent))] active:cursor-grabbing"
            style={{ width: MASK_W, height: MASK_H }}
          >
            {/* Stand-in "photo": a book cover on a desk */}
            <div
              className="absolute inset-[-30%]"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                background:
                  "radial-gradient(circle at 50% 45%, #8b1e3f 0 22%, transparent 22.5%), linear-gradient(160deg, #6b4f3a, #3b2a1e)",
              }}
              aria-hidden
            />
            <span className="pointer-events-none absolute inset-x-0 top-[42%] text-center font-serif text-[18px] font-semibold" aria-hidden style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}>
              Piranesi
            </span>
          </div>
          <label className="flex w-[200px] items-center gap-2 text-[11px] text-white/70">
            Zoom
            <input type="range" min={1} max={4} step={0.01} value={scale} onChange={(e) => setScale(Number(e.target.value))} className="flex-1" aria-label="Zoom" />
          </label>
          <p className="text-[12px] text-white/85">Drag to reposition, pinch to zoom</p>
        </div>
      </PreviewSection>

      <DocSection title="Props">
        <PropsTable props={PROPS} />
      </DocSection>

      <DocSection title="Design rules">
        <ArrowList
          items={[
            "Lock the ratio to the destination tile (2:3 for covers). Offering free-form crop just moves the problem to every grid that shows the image.",
            "Minimum zoom is 1 — the image always fills the mask, so the result never has empty bars.",
            "Render exactly what's under the mask at ~3× mask size, then let the storage layer downsample; there's no need to keep the original resolution.",
            "Black, full-screen, three controls: Cancel, title, Use Photo. One instruction line under the mask. No rotate, filters or aspect picker.",
            "Show it immediately after picking or capturing, before the image is saved anywhere.",
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "User-supplied thumbnails", body: "Covers, avatars (with a circle mask), product photos — anything shown in a fixed-ratio slot.", good: true },
            { heading: "Pairs with Cover Art", body: "The crop's ratio and the Cover Art tile ratio come from the same layout constant, so they can't drift apart.", good: true },
            { heading: "Photo editing", body: "If users need rotation, straightening or filters, hand off to the system editor instead of growing this component.", good: false },
            { heading: "Documents and receipts", body: "Use the document scanner's perspective correction; a rectangle crop can't fix a skewed page.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "Gestures need alternatives: arrow keys to move and +/− to zoom on the web (try it in the preview), an adjustable action for zoom under VoiceOver, plus a visible zoom slider.",
            "The crop area is a focusable group with a label that explains the keys; the image itself is decorative.",
            "“Use Photo” must work at any position — there's no invalid crop, so never disable it.",
            "Use touch-action: none on the mask so dragging doesn't scroll the page on touch devices.",
          ]}
        />
      </DocSection>
    </div>
  );
}
