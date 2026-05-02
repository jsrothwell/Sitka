import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { AudioPlayerDemo, VideoPlayerDemo } from "@/components/docs/MediaPlayerDemo";

export const metadata: Metadata = { title: "Media Player" };

const CODE = {
  react: {
    filename: "AudioPlayer.tsx",
    code: `"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

interface Track {
  title: string;
  artist: string;
  duration: number; // seconds
  src: string;
}

export function AudioPlayer({ tracks }: { tracks: Track[] }) {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying]   = useState(false);
  const [progress, setProgress] = useState(0); // 0–1
  const [volume, setVolume]     = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = tracks[trackIdx];

  // Sync progress from real <audio> element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onEnded = () => { setPlaying(false); setProgress(0); };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended",      onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended",      onEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  function seek(ratio: number) {
    const audio = audioRef.current;
    if (audio?.duration) audio.currentTime = ratio * audio.duration;
    setProgress(ratio);
  }

  function changeTrack(dir: 1 | -1) {
    setTrackIdx((i) => (i + dir + tracks.length) % tracks.length);
    setProgress(0);
    setPlaying(false);
  }

  const elapsed = Math.round(progress * track.duration);

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-lg">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={track.src} />

      {/* Controls */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-text-primary">{track.title}</p>
            <p className="text-sm text-text-secondary">{track.artist}</p>
          </div>
        </div>

        {/* Scrubber */}
        <input
          type="range" min={0} max={1} step={0.001}
          value={progress}
          onChange={(e) => seek(parseFloat(e.target.value))}
          className="w-full accent-accent cursor-pointer"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-text-tertiary font-mono">{formatTime(elapsed)}</span>
          <span className="text-xs text-text-tertiary font-mono">{formatTime(track.duration)}</span>
        </div>

        {/* Playback */}
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => changeTrack(-1)}>⏮</button>
          <button
            onClick={() => setPlaying(!playing)}
            className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center"
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button onClick={() => changeTrack(1)}>⏭</button>
        </div>

        {/* Volume */}
        <input
          type="range" min={0} max={1} step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full accent-accent"
        />
      </div>
    </div>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return \`\${m}:\${String(Math.floor(s % 60)).padStart(2, "0")}\`;
}`,
  },
  html: {
    filename: "audio-player.html",
    code: `<!-- Semantic audio player with custom controls -->
<div class="player" role="region" aria-label="Audio player">

  <!-- Hidden native audio element -->
  <audio id="audio" src="track.mp3" preload="metadata"></audio>

  <!-- Album art + track info -->
  <div class="player-header">
    <div class="player-art" aria-hidden="true"></div>
    <div class="player-meta">
      <p class="player-title" id="trackTitle">Late Night Drive</p>
      <p class="player-artist">Neon Pulse</p>
    </div>
  </div>

  <!-- Scrubber -->
  <div class="player-progress">
    <input
      type="range"
      id="scrubber"
      class="player-range"
      min="0" max="100" value="0" step="0.1"
      aria-label="Seek"
      aria-valuetext="0:00 of 3:34"
    />
    <div class="player-times">
      <span id="elapsed">0:00</span>
      <span id="total">3:34</span>
    </div>
  </div>

  <!-- Playback controls -->
  <div class="player-controls" role="group" aria-label="Playback controls">
    <button class="player-btn player-btn--icon"
            id="shuffleBtn" aria-label="Shuffle" aria-pressed="false">
      <svg class="icon" viewBox="0 0 24 24"><!-- shuffle --></svg>
    </button>
    <button class="player-btn player-btn--icon"
            id="prevBtn" aria-label="Previous track">
      <svg class="icon" viewBox="0 0 24 24"><!-- skip back --></svg>
    </button>
    <button class="player-btn player-btn--play"
            id="playBtn" aria-label="Play" aria-pressed="false">
      <svg class="icon-lg play-icon"  viewBox="0 0 24 24"><!-- play --></svg>
      <svg class="icon-lg pause-icon" viewBox="0 0 24 24" hidden><!-- pause --></svg>
    </button>
    <button class="player-btn player-btn--icon"
            id="nextBtn" aria-label="Next track">
      <svg class="icon" viewBox="0 0 24 24"><!-- skip forward --></svg>
    </button>
    <button class="player-btn player-btn--icon"
            id="repeatBtn" aria-label="Repeat" aria-pressed="false">
      <svg class="icon" viewBox="0 0 24 24"><!-- repeat --></svg>
    </button>
  </div>

  <!-- Volume -->
  <div class="player-volume">
    <button class="player-btn player-btn--icon" id="muteBtn" aria-label="Mute">
      <svg class="icon" viewBox="0 0 24 24"><!-- volume --></svg>
    </button>
    <input type="range" id="volumeRange" class="player-range"
           min="0" max="1" step="0.01" value="0.8" aria-label="Volume" />
  </div>

</div>

<style>
  .player {
    width: 100%; max-width: 360px;
    border-radius: 16px;
    border: 1px solid rgb(var(--border));
    background: rgb(var(--surface));
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,.2);
  }

  .player-header {
    display: flex; align-items: center; gap: 12px;
    padding: 16px;
    border-bottom: 1px solid rgb(var(--border-subtle));
  }
  .player-art {
    width: 48px; height: 48px; border-radius: 8px; flex-shrink: 0;
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
  }
  .player-title { font-size: 14px; font-weight: 600; color: rgb(var(--text-primary)); }
  .player-artist { font-size: 12px; color: rgb(var(--text-secondary)); margin-top: 2px; }

  .player-progress, .player-volume {
    padding: 12px 16px 0;
  }
  .player-times {
    display: flex; justify-content: space-between;
    font-size: 11px; color: rgb(var(--text-tertiary));
    font-family: monospace;
    margin-top: 4px;
  }

  .player-range {
    width: 100%;
    appearance: none; height: 4px;
    border-radius: 2px;
    background: rgb(var(--border));
    outline: none; cursor: pointer;
    accent-color: rgb(var(--accent));
  }

  .player-controls {
    display: flex; align-items: center; justify-content: center;
    gap: 8px;
    padding: 16px;
  }

  .player-btn {
    display: flex; align-items: center; justify-content: center;
    border: none; background: none; cursor: pointer;
    border-radius: 8px; transition: all 100ms;
  }
  .player-btn--icon {
    width: 36px; height: 36px;
    color: rgb(var(--text-secondary));
  }
  .player-btn--icon:hover { color: rgb(var(--text-primary)); }
  .player-btn--icon[aria-pressed="true"] { color: rgb(var(--accent)); }

  .player-btn--play {
    width: 52px; height: 52px; border-radius: 50%;
    background: rgb(var(--accent));
    color: white;
    box-shadow: 0 4px 16px rgba(52,168,101,.4);
  }
  .player-btn--play:hover { opacity: 0.9; }

  .icon    { width: 18px; height: 18px; fill: currentColor; }
  .icon-lg { width: 22px; height: 22px; fill: currentColor; }

  .player-volume { padding-bottom: 16px; display: flex; align-items: center; gap: 8px; }
</style>

<script>
  const audio    = document.getElementById("audio");
  const playBtn  = document.getElementById("playBtn");
  const scrubber = document.getElementById("scrubber");
  const elapsed  = document.getElementById("elapsed");
  const total    = document.getElementById("total");
  const volRange = document.getElementById("volumeRange");

  function fmt(s) {
    return Math.floor(s/60) + ":" + String(Math.floor(s%60)).padStart(2,"0");
  }

  audio.addEventListener("loadedmetadata", () => {
    total.textContent = fmt(audio.duration);
    scrubber.max = audio.duration;
  });

  audio.addEventListener("timeupdate", () => {
    elapsed.textContent = fmt(audio.currentTime);
    scrubber.value = audio.currentTime;
  });

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.setAttribute("aria-label", "Pause");
      playBtn.setAttribute("aria-pressed", "true");
      playBtn.querySelector(".play-icon").hidden  = true;
      playBtn.querySelector(".pause-icon").hidden = false;
    } else {
      audio.pause();
      playBtn.setAttribute("aria-label", "Play");
      playBtn.setAttribute("aria-pressed", "false");
      playBtn.querySelector(".play-icon").hidden  = false;
      playBtn.querySelector(".pause-icon").hidden = true;
    }
  });

  scrubber.addEventListener("input", () => {
    audio.currentTime = scrubber.value;
  });

  volRange.addEventListener("input", () => {
    audio.volume = volRange.value;
  });
</script>`,
  },
  swift: {
    filename: "AudioPlayerView.swift",
    code: `import SwiftUI
import AVFoundation

// ── Model ────────────────────────────────────────────────
struct Track: Identifiable {
    let id = UUID()
    let title: String
    let artist: String
    let url: URL
    var duration: Double = 0
}

// ── Player ───────────────────────────────────────────────
@Observable
class AudioPlayerModel {
    var tracks: [Track]
    var currentIndex = 0
    var isPlaying    = false
    var progress: Double = 0   // 0–1
    var volume: Float   = 0.8

    private var player: AVPlayer?
    private var observer: Any?

    var currentTrack: Track { tracks[currentIndex] }

    init(tracks: [Track]) { self.tracks = tracks }

    func play() {
        if player == nil { loadTrack() }
        player?.play()
        isPlaying = true
        observeProgress()
    }

    func pause() {
        player?.pause()
        isPlaying = false
    }

    func toggle() { isPlaying ? pause() : play() }

    func seek(to ratio: Double) {
        guard let item = player?.currentItem else { return }
        let time = CMTimeMultiplyByFloat64(item.duration, multiplier: ratio)
        player?.seek(to: time)
    }

    func next() { advance(by: 1) }
    func prev() { advance(by: -1) }

    private func advance(by n: Int) {
        player?.pause()
        player = nil
        observer = nil
        currentIndex = (currentIndex + n + tracks.count) % tracks.count
        progress = 0
        isPlaying = false
    }

    private func loadTrack() {
        player = AVPlayer(url: currentTrack.url)
        player?.volume = volume
    }

    private func observeProgress() {
        let interval = CMTime(seconds: 0.5, preferredTimescale: 600)
        observer = player?.addPeriodicTimeObserver(forInterval: interval, queue: .main) { [weak self] time in
            guard let self, let duration = self.player?.currentItem?.duration.seconds,
                  duration.isFinite else { return }
            self.progress = time.seconds / duration
        }
    }
}

// ── View ─────────────────────────────────────────────────
struct AudioPlayerView: View {
    @State var model: AudioPlayerModel

    var body: some View {
        VStack(spacing: 0) {
            // Album art
            RoundedRectangle(cornerRadius: 12)
                .fill(LinearGradient(
                    colors: [.purple, .indigo],
                    startPoint: .topLeading, endPoint: .bottomTrailing
                ))
                .aspectRatio(1, contentMode: .fit)
                .padding()

            VStack(spacing: 16) {
                // Track info
                VStack(spacing: 4) {
                    Text(model.currentTrack.title)
                        .font(.headline)
                    Text(model.currentTrack.artist)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }

                // Scrubber
                Slider(value: Binding(
                    get: { model.progress },
                    set: { model.seek(to: $0) }
                ))
                .accentColor(.accentColor)

                // Controls
                HStack(spacing: 32) {
                    Button { model.prev() } label: {
                        Image(systemName: "backward.fill")
                            .font(.title2)
                    }
                    Button { model.toggle() } label: {
                        Image(systemName: model.isPlaying ? "pause.circle.fill" : "play.circle.fill")
                            .font(.system(size: 56))
                            .foregroundStyle(Color.accentColor)
                    }
                    Button { model.next() } label: {
                        Image(systemName: "forward.fill")
                            .font(.title2)
                    }
                }
                .buttonStyle(.plain)
                .foregroundStyle(.primary)

                // Volume
                HStack(spacing: 8) {
                    Image(systemName: "speaker.fill").font(.caption)
                    Slider(value: Binding(
                        get: { Double(model.volume) },
                        set: { model.volume = Float($0) }
                    ))
                    Image(systemName: "speaker.wave.3.fill").font(.caption)
                }
                .foregroundStyle(.secondary)
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 24)
        }
        .background(.regularMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 20))
    }
}

#Preview {
    AudioPlayerView(model: AudioPlayerModel(tracks: [
        Track(title: "Late Night Drive", artist: "Neon Pulse",
              url: URL(string: "https://example.com/track1.mp3")!),
        Track(title: "Golden Hour",      artist: "The Wavelines",
              url: URL(string: "https://example.com/track2.mp3")!),
    ]))
    .padding()
}`,
  },
};

export default function MediaPlayerPage() {
  return (
    <div>
      <PageHeader
        title="Media Player"
        description="Audio and video player UI patterns — play/pause, scrubber, volume, track list, and full-screen controls. These patterns cover the visual layer; wire them to a real audio/video element or AVPlayer in production."
      />

      {/* Audio player */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Audio player
        </h2>
        <ComponentPreview>
          <AudioPlayerDemo />
        </ComponentPreview>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3">
          Play/pause, skip, scrub, adjust volume, and switch tracks. Shuffle and Repeat toggle their accent state.
        </p>
      </section>

      {/* Video player */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Video player</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Controls auto-hide 2.5 s after the last mouse move while playing. They reappear on any interaction.
          The fullscreen button expands the player to fill the viewport (within this demo context).
        </p>
        <ComponentPreview>
          <VideoPlayerDemo />
        </ComponentPreview>
      </section>

      {/* Controls anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Controls anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Control", "Audio", "Video", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Play / Pause",   "✓", "✓", "Primary action. Centered and large. Keyboard: Space."],
                ["Scrubber",       "✓", "✓", "Range input. Show elapsed / total time beside it."],
                ["Volume",         "✓", "✓", "Slider + mute toggle. Remember last non-zero volume."],
                ["Skip / Seek",    "✓", "✓", "Audio: skip track. Video: ±10 s seek."],
                ["Shuffle / Repeat","✓", "—", "Audio playlist controls. Toggle accent when active."],
                ["Track list",     "✓", "—", "Visible queue. Tap to switch track instantly."],
                ["Fullscreen",     "—", "✓", "Expand to viewport. Use Fullscreen API in production."],
                ["Quality badge",  "—", "✓", "HD / 4K / SD label. Positioned top-right."],
                ["Auto-hide",      "—", "✓", "Controls fade out 2–3 s after last interaction while playing."],
              ].map(([control, audio, video, notes], i) => (
                <tr key={control} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{control}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))] text-center">{audio}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))] text-center">{video}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          In this demo, progress advances via a{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">setInterval</code>{" "}
          ticker so it works without a real media file. In production, drive state from the native{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">{"<audio>"}</code>{" "}
          or{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">{"<video>"}</code>{" "}
          element&apos;s{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">timeupdate</code> event.
          Seek by setting{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">element.currentTime</code> directly.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Design decisions */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Design decisions</h2>
        <ul className="space-y-4 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            {
              title: "Native range input for scrubbing",
              body: "Use a styled <input type=\"range\"> rather than a custom drag handler. It gives you keyboard seek (arrow keys), screen reader value announcements, and touch support for free. Use accent-color to match the design token.",
            },
            {
              title: "Play button is the visual anchor",
              body: "Make the play/pause button the largest element — 48–56px on audio, prominent in the center of the video frame. It is the primary action and should be reachable without reading the interface.",
            },
            {
              title: "Auto-hide controls on video",
              body: "Fade controls out after 2–3 s of inactivity while playing. Reset the timer on any mousemove, click, or keypress. Always show controls when paused.",
            },
            {
              title: "Remember volume across sessions",
              body: "Persist volume to localStorage. Nothing is more jarring than a page blasting at 100% when the user had left it at 30%. Mute toggle should restore the previous volume, not set to zero permanently.",
            },
            {
              title: "Never autoplay with sound",
              body: "Browsers block autoplay with audio. If you must autoplay (e.g., a preview), start muted. Provide a clear unmute button. Respect prefers-reduced-motion for any animated transitions.",
            },
          ].map(({ title, body }) => (
            <li key={title} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 flex-shrink-0">→</span>
              <span><strong className="text-[rgb(var(--text-primary))]">{title}.</strong> {body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Wrap the player in role=\"region\" with aria-label=\"Audio player\" or \"Video player\" so screen reader users can jump to it.",
            "The scrubber needs aria-label=\"Seek\" and aria-valuetext=\"1:23 of 3:34\" (not just the raw 0–1 ratio).",
            "Play/pause button must toggle its aria-label between \"Play\" and \"Pause\" — never just use an icon without a label.",
            "Mute button: aria-pressed=\"true\" when muted. Screen readers announce state changes on toggle.",
            "Keyboard: Space = play/pause, Arrow keys = seek ±5 s (on the scrubber), M = mute, F = fullscreen. These are well-known conventions.",
            "Provide captions/subtitles for video with spoken content. Use the <track> element with kind=\"captions\".",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
