"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

// ── Inline typing indicator ───────────────────────────────

export function TypingDotsDemo() {
  const [active, setActive] = useState(true);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full max-w-sm rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 space-y-2">
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-tr-sm bg-[rgb(var(--accent))] text-white px-3 py-2 text-[13px] max-w-[200px]">
            What are the key design principles?
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="w-6 h-6 rounded-full bg-[rgb(var(--accent-subtle))] flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-[rgb(var(--accent))]">A</span>
          </div>
          {active ? (
            <div className="rounded-2xl rounded-tl-sm bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] px-3 py-2.5 flex items-center gap-1">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--text-tertiary))] animate-bounce"
                  style={{ animationDelay: `${delay}ms`, animationDuration: "900ms" }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl rounded-tl-sm bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] px-3 py-2 text-[13px] text-[rgb(var(--text-primary))] max-w-[220px]">
              Good design is invisible — it removes friction rather than adding personality.
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setActive((v) => !v)}
        className="text-[12px] font-medium text-[rgb(var(--accent))] hover:underline"
      >
        {active ? "Show response" : "Show typing"}
      </button>
    </div>
  );
}

// ── Skeleton loader ───────────────────────────────────────

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md bg-[rgb(var(--surface-raised))] overflow-hidden relative",
        className
      )}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(var(--text-primary),0.06) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

export function SkeletonDemo() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full max-w-sm rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
        {loaded ? (
          <div className="space-y-3">
            {[
              { name: "Jamieson Rothwell", role: "Founder", time: "2m ago" },
              { name: "Sam Park", role: "Engineer", time: "14m ago" },
              { name: "Lena Müller", role: "Designer", time: "1h ago" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[rgb(var(--accent-subtle))] flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-semibold text-[rgb(var(--accent))]">
                    {item.name[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[rgb(var(--text-primary))] truncate">{item.name}</p>
                  <p className="text-[11px] text-[rgb(var(--text-tertiary))]">{item.role}</p>
                </div>
                <span className="text-[11px] text-[rgb(var(--text-tertiary))] flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Shimmer className="w-9 h-9 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Shimmer className="h-3 w-32" />
                  <Shimmer className="h-2.5 w-20" />
                </div>
                <Shimmer className="h-2.5 w-10" />
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => setLoaded((v) => !v)}
        className="text-[12px] font-medium text-[rgb(var(--accent))] hover:underline"
      >
        {loaded ? "Show skeleton" : "Load content"}
      </button>
    </div>
  );
}

// ── Spinner overlay ───────────────────────────────────────

function Spinner({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("animate-spin", className)}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SpinnerDemo() {
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (processing || done) return;
    setProcessing(true);
    timerRef.current = setTimeout(() => {
      setProcessing(false);
      setDone(true);
      timerRef.current = setTimeout(() => setDone(false), 1500);
    }, 2500);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-sm h-36 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden flex items-center justify-center">
        {processing && (
          <div className="absolute inset-0 bg-[rgb(var(--background))]/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-10">
            <Spinner size={28} className="text-[rgb(var(--accent))]" />
            <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">Saving changes…</p>
          </div>
        )}
        {done ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">Saved</p>
          </div>
        ) : (
          <div className="text-center space-y-1 px-6">
            <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">Document ready</p>
            <p className="text-[11px] text-[rgb(var(--text-tertiary))]">Click save to process</p>
          </div>
        )}
      </div>
      <button
        onClick={handleClick}
        disabled={processing}
        className="text-[12px] font-medium text-[rgb(var(--accent))] hover:underline disabled:opacity-40 disabled:no-underline"
      >
        {processing ? "Processing…" : done ? "Done!" : "Save changes"}
      </button>
    </div>
  );
}

// ── Progressive text streaming ────────────────────────────

const STREAM_TEXT =
  "Sitka uses a layered glass surface system where each elevation level adds subtle blur and opacity. The background is pure dark, surfaces float above it, and raised surfaces float above surfaces. This creates depth without harsh shadows.";

export function ProgressiveTextDemo() {
  const [displayed, setDisplayed] = useState("");
  const [running, setRunning] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    if (running) return;
    setDisplayed("");
    indexRef.current = 0;
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const words = STREAM_TEXT.split(" ");
      if (indexRef.current >= words.length) {
        setRunning(false);
        return;
      }
      setDisplayed(words.slice(0, indexRef.current + 1).join(" "));
      indexRef.current += 1;
      timerRef.current = setTimeout(tick, 60);
    };
    timerRef.current = setTimeout(tick, 60);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [running]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full max-w-sm rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[rgb(var(--accent-subtle))] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[10px] font-bold text-[rgb(var(--accent))]">A</span>
          </div>
          <p className="text-[13px] text-[rgb(var(--text-primary))] leading-relaxed min-h-[4.5rem]">
            {displayed || <span className="text-[rgb(var(--text-tertiary))]">Press stream to begin…</span>}
            {running && (
              <span className="inline-block w-[2px] h-[14px] bg-[rgb(var(--accent))] ml-0.5 animate-pulse align-text-bottom" />
            )}
          </p>
        </div>
      </div>
      <button
        onClick={start}
        disabled={running}
        className="text-[12px] font-medium text-[rgb(var(--accent))] hover:underline disabled:opacity-40"
      >
        {running ? "Streaming…" : displayed ? "Replay" : "Stream response"}
      </button>
    </div>
  );
}
