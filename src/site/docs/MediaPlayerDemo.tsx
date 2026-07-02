"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib";

/* ── Icons (inline SVG to avoid lucide inconsistencies with media controls) ── */

function IconPlay({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

function IconPause({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function IconSkipBack({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
    </svg>
  );
}

function IconSkipForward({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l8.5-6L6 6v12zm2.5-6 8.5 6V6l-8.5 6zM16 6h2v12h-2z" />
    </svg>
  );
}

function IconVolume({ className, muted }: { className?: string; muted?: boolean }) {
  return muted ? (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function IconFullscreen({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
  );
}

function IconRepeat({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
    </svg>
  );
}

function IconShuffle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
    </svg>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/* ── Audio Player ─────────────────────────────────────────────────────────── */

const TRACKS = [
  { title: "Late Night Drive",  artist: "Neon Pulse",    duration: 214, color: "from-violet-600 to-indigo-500" },
  { title: "Golden Hour",       artist: "The Wavelines",  duration: 187, color: "from-amber-500 to-orange-600" },
  { title: "Coastal Drift",     artist: "Sea & Static",  duration: 253, color: "from-teal-500 to-cyan-600" },
];

export function AudioPlayerDemo() {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying]   = useState(false);
  const [progress, setProgress] = useState(0);   // 0–1
  const [volume, setVolume]     = useState(0.8);
  const [muted, setMuted]       = useState(false);
  const [shuffle, setShuffle]   = useState(false);
  const [repeat, setRepeat]     = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = TRACKS[trackIdx];

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 1) {
            clearInterval(timerRef.current!);
            setPlaying(false);
            return 0;
          }
          return p + 1 / track.duration;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, track.duration]);

  function changeTrack(dir: 1 | -1) {
    setProgress(0);
    setPlaying(false);
    setTrackIdx((i) => (i + dir + TRACKS.length) % TRACKS.length);
  }

  const elapsed = Math.round(progress * track.duration);

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
      {/* Album art */}
      <div className={cn("w-full aspect-square bg-gradient-to-br flex items-end p-5", track.color)}>
        <div>
          <p className="text-white font-semibold text-[18px] leading-tight drop-shadow">{track.title}</p>
          <p className="text-white/70 text-[13px] mt-0.5">{track.artist}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Progress bar */}
        <div className="space-y-1.5">
          <input
            type="range" min={0} max={1} step={0.001}
            value={progress}
            onChange={(e) => setProgress(parseFloat(e.target.value))}
            className="w-full h-1 accent-[rgb(var(--accent))] cursor-pointer"
            style={{ accentColor: "rgb(var(--accent))" }}
          />
          <div className="flex justify-between text-[11px] text-[rgb(var(--text-tertiary))] font-mono">
            <span>{formatTime(elapsed)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShuffle(!shuffle)}
            className={cn("w-8 h-8 flex items-center justify-center rounded-lg transition-colors",
              shuffle ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]"
            )}
          >
            <IconShuffle className="w-4 h-4" />
          </button>

          <button onClick={() => changeTrack(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
            <IconSkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={() => setPlaying(!playing)}
            className="w-12 h-12 rounded-full bg-[rgb(var(--accent))] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-[0_4px_16px_rgba(52,168,101,0.4)]"
          >
            {playing ? <IconPause className="w-5 h-5" /> : <IconPlay className="w-5 h-5 ml-0.5" />}
          </button>

          <button onClick={() => changeTrack(1)} className="w-9 h-9 flex items-center justify-center rounded-xl text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
            <IconSkipForward className="w-5 h-5" />
          </button>

          <button
            onClick={() => setRepeat(!repeat)}
            className={cn("w-8 h-8 flex items-center justify-center rounded-lg transition-colors",
              repeat ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]"
            )}
          >
            <IconRepeat className="w-4 h-4" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <button onClick={() => setMuted(!muted)} className="text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] transition-colors flex-shrink-0">
            <IconVolume className="w-4 h-4" muted={muted} />
          </button>
          <input
            type="range" min={0} max={1} step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => { setVolume(parseFloat(e.target.value)); setMuted(false); }}
            className="flex-1 h-1 cursor-pointer"
            style={{ accentColor: "rgb(var(--accent))" }}
          />
          <span className="text-[11px] text-[rgb(var(--text-tertiary))] w-7 text-right font-mono">
            {Math.round((muted ? 0 : volume) * 100)}
          </span>
        </div>

        {/* Track list */}
        <div className="border-t border-[rgb(var(--border-subtle))] pt-3 space-y-0.5">
          {TRACKS.map((t, i) => (
            <button
              key={t.title}
              onClick={() => { setTrackIdx(i); setProgress(0); setPlaying(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left transition-colors",
                i === trackIdx
                  ? "bg-[rgb(var(--accent-subtle))]"
                  : "hover:bg-[rgb(var(--surface-raised))]"
              )}
            >
              <div className={cn("w-7 h-7 rounded-md bg-gradient-to-br flex-shrink-0", t.color)} />
              <div className="flex-1 min-w-0">
                <p className={cn("text-[12px] font-medium truncate", i === trackIdx ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-primary))]")}>{t.title}</p>
                <p className="text-[11px] text-[rgb(var(--text-tertiary))] truncate">{t.artist}</p>
              </div>
              <span className="text-[11px] text-[rgb(var(--text-tertiary))] font-mono flex-shrink-0">{formatTime(t.duration)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Video Player ─────────────────────────────────────────────────────────── */

export function VideoPlayerDemo() {
  const [playing, setPlaying]           = useState(false);
  const [progress, setProgress]         = useState(0.18);
  const [volume, setVolume]             = useState(0.7);
  const [muted, setMuted]               = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen]     = useState(false);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const duration  = 312; // seconds

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 1) { clearInterval(timerRef.current!); setPlaying(false); return 1; }
          return p + 1 / duration;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing]);

  function showControlsTemporarily() {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (playing) {
      hideTimer.current = setTimeout(() => setShowControls(false), 2500);
    }
  }

  const elapsed = Math.round(progress * duration);

  return (
    <div className={cn(
      "w-full mx-auto rounded-xl overflow-hidden border border-[rgb(var(--border))] bg-black group relative",
      fullscreen ? "fixed inset-4 z-50 rounded-xl" : "max-w-lg"
    )}>
      {/* Video screen */}
      <div
        className="relative w-full bg-gradient-to-br from-[#0a0a14] to-[#12121e] cursor-pointer"
        style={{ aspectRatio: "16/9" }}
        onClick={() => { setPlaying(!playing); showControlsTemporarily(); }}
        onMouseMove={showControlsTemporarily}
      >
        {/* Simulated scene */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full" style={{
            background: `radial-gradient(ellipse at ${30 + progress * 40}% 50%, rgba(52,168,101,0.12) 0%, transparent 60%),
                         linear-gradient(135deg, #0a0a14 0%, #1a1a2e 50%, #0f0f1a 100%)`
          }}>
            {/* Simulated grid/scene */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "linear-gradient(rgb(var(--border)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border)) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
            <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-32 h-20 rounded-lg border border-[rgb(var(--accent))]/30 bg-[rgb(var(--accent))]/5 flex items-center justify-center">
              <span className="text-[rgb(var(--accent))]/50 text-[10px] font-mono">PREVIEW</span>
            </div>
          </div>
        </div>

        {/* Quality badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded px-1.5 py-0.5 text-[10px] font-bold text-white/80 border border-white/10">
          HD
        </div>

        {/* Big play overlay */}
        {(!playing || showControls) && (
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity",
            playing ? "opacity-0 hover:opacity-100" : "opacity-100"
          )}>
            <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/60 transition-colors">
              {playing
                ? <IconPause className="w-7 h-7 text-white" />
                : <IconPlay  className="w-7 h-7 text-white ml-1" />
              }
            </div>
          </div>
        )}

        {/* Bottom controls */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-3 transition-opacity",
          "bg-gradient-to-t from-black/80 via-black/40 to-transparent",
          showControls || !playing ? "opacity-100" : "opacity-0"
        )}>
          {/* Scrubber */}
          <div className="flex items-center gap-2 mb-2">
            <input
              type="range" min={0} max={1} step={0.001}
              value={progress}
              onChange={(e) => { setProgress(parseFloat(e.target.value)); showControlsTemporarily(); }}
              className="flex-1 h-1 cursor-pointer appearance-none"
              style={{ accentColor: "rgb(var(--accent))" }}
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Play/pause */}
            <button
              onClick={(e) => { e.stopPropagation(); setPlaying(!playing); showControlsTemporarily(); }}
              className="text-white hover:text-white/80 transition-colors"
            >
              {playing ? <IconPause className="w-5 h-5" /> : <IconPlay className="w-5 h-5" />}
            </button>

            {/* Skip */}
            <button onClick={(e) => { e.stopPropagation(); setProgress(Math.min(1, progress + 10 / duration)); }} className="text-white/70 hover:text-white transition-colors">
              <IconSkipForward className="w-4 h-4" />
            </button>

            {/* Volume */}
            <button
              onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
              className="text-white/70 hover:text-white transition-colors"
            >
              <IconVolume className="w-4 h-4" muted={muted} />
            </button>
            <input
              type="range" min={0} max={1} step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => { e.stopPropagation(); setVolume(parseFloat(e.target.value)); setMuted(false); }}
              onClick={(e) => e.stopPropagation()}
              className="w-16 h-1 cursor-pointer hidden sm:block"
              style={{ accentColor: "rgb(var(--accent))" }}
            />

            {/* Time */}
            <span className="text-[11px] text-white/70 font-mono ml-1">
              {formatTime(elapsed)} / {formatTime(duration)}
            </span>

            <div className="flex-1" />

            {/* Fullscreen */}
            <button
              onClick={(e) => { e.stopPropagation(); setFullscreen(!fullscreen); }}
              className="text-white/70 hover:text-white transition-colors"
            >
              <IconFullscreen className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Video metadata bar */}
      <div className="px-4 py-3 bg-[rgb(var(--surface))] border-t border-[rgb(var(--border))]">
        <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">Sitka Design System — Component Walkthrough</p>
        <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-0.5">5:12 · 42K views · 3 days ago</p>
      </div>
    </div>
  );
}
