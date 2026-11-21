"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

const STATS = [
  { value: 64, label: "applications sent" },
  { value: 9, label: "roles that reached an interview" },
  { value: 83, label: "days of searching" },
  { value: 7, label: "ghost jobs spotted and dropped" },
];

const CODE = {
  react: {
    filename: "ShareCard.tsx",
    code: `// Aggregate numbers only. No company names, job titles, people or dates —
// the card must be safe to post publicly without the user editing it.
interface Recap { applications: number; interviews: number; days: number; ghostJobs: number }

export function RecapCard({ recap }: { recap: Recap }) {
  // Fixed 1080×1350 (4:5) canvas, rendered off-screen; scale it down for the preview.
  return (
    <div style={{ width: 1080, height: 1350 }}
         className="flex flex-col gap-10 bg-gradient-to-br from-[#0f1714] to-[#050a08] p-20 text-white">
      <div className="flex justify-between">
        <span className="text-[22px] font-bold tracking-[3px] text-white/60">MY JOB SEARCH</span>
        <span className="text-[26px] font-bold">JobFlo</span>
      </div>
      <h1 className="text-[88px] font-bold">I got the job.</h1>
      <dl className="flex flex-col gap-7">
        <Stat value={recap.applications} label="applications sent" />
        <Stat value={recap.interviews} label="roles that reached an interview" />
        <Stat value={recap.days} label="days of searching" />
        {recap.ghostJobs > 0 && <Stat value={recap.ghostJobs} label="ghost jobs spotted and dropped" />}
      </dl>
      <p className="mt-auto text-[22px] text-white/55">Tracked privately on my iPhone and Mac with JobFlo.</p>
    </div>
  );
}

// Render to PNG once, when the celebration appears; hide the share button if rendering fails.
export async function renderRecapPNG(node: HTMLElement) {
  const { toBlob } = await import("html-to-image");
  return toBlob(node, { width: 1080, height: 1350, pixelRatio: 1 });
}

export async function share(blob: Blob) {
  const file = new File([blob], "search-recap.png", { type: "image/png" });
  if (navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], title: "My job search" });
  else downloadBlob(blob, file.name);
}`,
  },
  html: {
    filename: "share-card.html",
    code: `<!-- Preview: the real 1080×1350 card scaled with a transform, so it's pixel-identical to the export -->
<div class="share-preview" style="--scale: .25">
  <div class="share-card">
    <header><span class="kicker">MY JOB SEARCH</span><span class="brand">JobFlo</span></header>
    <h1>I got the job.</h1>
    <dl>
      <div><dt>64</dt><dd>applications sent</dd></div>
      <div><dt>9</dt><dd>roles that reached an interview</dd></div>
    </dl>
    <footer>Tracked privately on my iPhone and Mac with JobFlo.</footer>
  </div>
</div>
<button class="share-btn">Share your search</button>

<style>
.share-preview { width: calc(1080px * var(--scale)); height: calc(1350px * var(--scale)); overflow: hidden; }
.share-card { width: 1080px; height: 1350px; transform: scale(var(--scale)); transform-origin: top left;
  padding: 80px; display: flex; flex-direction: column; gap: 40px; color: #fff;
  background: linear-gradient(135deg, #0f1714, #050a08); font-family: ui-rounded, system-ui; }
.share-card dt { font-size: 72px; font-weight: 700; color: #5ccc8a; display: inline; }
.share-card dd { font-size: 30px; display: inline; margin-left: 20px; color: rgb(255 255 255 / .85); }
.share-card footer { margin-top: auto; font-size: 22px; color: rgb(255 255 255 / .55); }
</style>`,
  },
  swift: {
    filename: "SearchRecapShareButton.swift",
    code: `import SwiftUI

/// "Share your search" for the Accepted celebration. Renders the card once on
/// appear; the button is hidden if rendering fails.
struct SearchRecapShareButton: View {
    let recap: SearchRecap
    @State private var shareURL: URL?

    var body: some View {
        Group {
            if let shareURL {
                ShareLink(item: shareURL,
                          preview: SharePreview("My job search", image: Image(systemName: "party.popper"))) {
                    Label("Share your search", systemImage: "square.and.arrow.up")
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                }
                .buttonStyle(.bordered)
            }
        }
        .task {
            guard shareURL == nil else { return }
            shareURL = ShareCardRenderer.renderPNG(
                SearchRecapCardView(recap: recap),
                size: CGSize(width: 1080, height: 1350),
                filePrefix: "search-recap"
            )
        }
    }
}

enum ShareCardRenderer {
    @MainActor
    static func renderPNG<V: View>(_ view: V, size: CGSize, filePrefix: String) -> URL? {
        let renderer = ImageRenderer(content: view.frame(width: size.width, height: size.height))
        renderer.scale = 1                                  // Size is already in pixels
        #if os(iOS)
        guard let data = renderer.uiImage?.pngData() else { return nil }
        #else
        guard let tiff = renderer.nsImage?.tiffRepresentation,
              let data = NSBitmapImageRep(data: tiff)?.representation(using: .png, properties: [:]) else { return nil }
        #endif
        let url = FileManager.default.temporaryDirectory.appendingPathComponent("\\(filePrefix)-\\(UUID()).png")
        return (try? data.write(to: url)) != nil ? url : nil
    }
}`,
  },
};

export default function ShareCardPage() {
  const [showGhost, setShowGhost] = useState(true);
  const stats = showGhost ? STATS : STATS.slice(0, 3);

  return (
    <div>
      <PageHeader
        title="Share Card"
        badge="New"
        description="A fixed-size, branded image summarizing an achievement, offered at the moment of celebration and built only from aggregate numbers — so it's safe to post publicly without editing. Turns a private milestone into organic word of mouth without exposing anyone's data."
      />
      <SourceNote
        sources={[{ app: "JobFlo", file: "Shared/Views/SearchRecapCard.swift" }]}
      />

      <PreviewSection>
        <div className="flex flex-col items-center gap-4">
          <div className="overflow-hidden rounded-lg shadow-[var(--shadow-card-lifted)]" style={{ width: 270, height: 337.5 }}>
            <div
              className="flex flex-col gap-10 p-20 text-white"
              style={{
                width: 1080,
                height: 1350,
                transform: "scale(0.25)",
                transformOrigin: "top left",
                background: "linear-gradient(135deg, #0f1714, #050a08)",
                fontFamily: "ui-rounded, system-ui, sans-serif",
              }}
              role="img"
              aria-label={`Share card: I got the job. ${stats.map((s) => `${s.value} ${s.label}`).join(", ")}.`}
            >
              <div className="flex justify-between">
                <span className="text-[22px] font-bold tracking-[3px] text-white/60">MY JOB SEARCH</span>
                <span className="text-[26px] font-bold">JobFlo</span>
              </div>
              <p className="text-[88px] font-bold leading-none">I got the job.</p>
              <div className="flex flex-col gap-7">
                {stats.map((s) => (
                  <p key={s.label} className="flex items-baseline gap-5">
                    <span className="text-[72px] font-bold tabular-nums text-[#5ccc8a]">{s.value}</span>
                    <span className="text-[30px] font-medium text-white/85">{s.label}</span>
                  </p>
                ))}
              </div>
              <p className="mt-auto text-[22px] font-medium text-white/55">Tracked privately on my iPhone and Mac with JobFlo.</p>
            </div>
          </div>
          <button className="w-[270px] rounded-xl border border-[rgb(var(--accent))] py-2.5 text-[14px] font-semibold text-[rgb(var(--accent))]">
            ⬆ Share your search
          </button>
          <label className="flex items-center gap-2 text-[12px] text-[rgb(var(--text-secondary))]">
            <input type="checkbox" checked={showGhost} onChange={(e) => setShowGhost(e.target.checked)} />
            User flagged at least one ghost job (optional stat)
          </label>
        </div>
      </PreviewSection>

      <DocSection title="Anatomy">
        <DocTable
          headers={["Part", "Rule"]}
          rows={[
            ["Canvas", "Fixed 1080×1350 (4:5) — the tallest ratio Instagram and LinkedIn feeds show uncropped, and fine in Messages. Rendered at scale 1 because the size is already in pixels."],
            ["Kicker + brand", "Small uppercase kicker (“MY JOB SEARCH”) on the left, the app name on the right. The brand is a signature, not a logo lockup."],
            ["Headline", "First-person, past tense, one line: “I got the job.” The user is the hero, not the app."],
            ["Stats", "Three or four big numbers with plain-language labels. Optional stats (ghost jobs) appear only when non-zero — a 0 reads as a failure on a celebration card."],
            ["Footer", "One line on how it was tracked, which doubles as the privacy promise (“Tracked privately on my iPhone and Mac”)."],
            ["Palette", "Fixed dark palette independent of the device's appearance, so every shared card looks the same in every feed."],
          ]}
        />
      </DocSection>

      <DocSection title="Privacy rules">
        <ArrowList
          items={[
            "Only aggregates: counts and durations. Never company names, titles, people, places, dates or amounts — a user shouldn't need to check the card before posting it.",
            "Compute the recap from local data on device; the card is never uploaded by the app, only handed to the system share sheet.",
            "Don't embed a tracking link or referral code in the image. If you want attribution, use the brand name.",
            "Render to a temporary file and let the system share sheet handle destinations; don't ask for photo-library permission just to share.",
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Milestones people want to tell others about", body: "Got the job, finished a streak, paid off a debt, completed a course. Offer it inside the celebration, as a secondary action.", good: true },
            { heading: "One fixed layout", body: "The value is that it looks finished without editing. Don't add a customizer; at most, let optional stats drop out when they're zero.", good: true },
            { heading: "Sensitive outcomes", body: "Don't offer a share card for health, money lost, rejections or anything a user might regret posting — even with aggregates.", good: false },
            { heading: "As a paywall", body: "Sharing is free marketing for you. Never gate it, and never watermark it more heavily for free users.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "The in-app preview is an image: give it a label that reads the headline and every stat, since screen reader users can't read the rendered text.",
            "When sharing, include the same sentence as alt text or as the share's accompanying text so the post is accessible on the receiving platform.",
            "Stat numbers on the dark gradient are #5ccc8a (≈ 9:1) and labels are 85% white; keep secondary text at 55% white or higher.",
            "Hide the share button entirely if rendering fails, rather than showing a button that does nothing.",
          ]}
        />
      </DocSection>
    </div>
  );
}
