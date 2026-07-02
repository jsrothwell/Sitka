"use client";

import { useState, useEffect, useRef } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

// ── Animated waveform bars ─────────────────────────────────────────────────────
function WaveformBars({ active }: { active: boolean }) {
  const BARS = 7;
  const [heights, setHeights] = useState(() => Array(BARS).fill(4));

  useEffect(() => {
    if (!active) { setHeights(Array(BARS).fill(4)); return; }
    const id = setInterval(() => {
      setHeights(Array.from({ length: BARS }, () => 4 + Math.random() * 20));
    }, 120);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="flex items-center gap-[3px] h-7">
      {heights.map((h, i) => (
        <div
          key={i}
          style={{ height: h, transition: "height 0.1s ease", width: 3, borderRadius: 2 }}
          className={active ? "bg-white" : "bg-white/30"}
        />
      ))}
    </div>
  );
}

// ── Pulsing record ring ────────────────────────────────────────────────────────
function RecordRing({ recording }: { recording: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      {recording && (
        <div className="absolute inset-0 rounded-full border-2 border-red-500/50 animate-ping" />
      )}
      <div
        className={[
          "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
          recording
            ? "bg-red-500 scale-110"
            : "bg-[rgb(var(--accent))] hover:scale-105",
        ].join(" ")}
      >
        {recording ? (
          <div className="w-4 h-4 rounded-sm bg-white" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M9 22h6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

// ── Fake memo list ─────────────────────────────────────────────────────────────
const DEMO_MEMOS = [
  { id: 1, time: "Today, 2:41 PM", duration: "0:47", transcript: "Need to follow up on the system design question — I fumbled the sharding answer. Review consistent hashing before next round." },
  { id: 2, time: "Today, 11:08 AM", duration: "1:23", transcript: "Recruiter mentioned the team is 8 engineers, 2 PMs. Growth stage but pre-IPO. Stock options vest over 4 years with a 1-year cliff." },
  { id: 3, time: "Yesterday, 4:55 PM", duration: "0:31", transcript: "Liked the eng culture. No on-call rotation yet. Remote-first but expects quarterly travel to NYC office." },
];

// ── Live demo ──────────────────────────────────────────────────────────────────
function VoiceMemoDemo() {
  const [mode, setMode] = useState<"idle" | "dictating" | "recording">("idle");
  const [noteText, setNoteText] = useState("Strong culture fit — fast-moving team.");
  const [memos, setMemos] = useState(DEMO_MEMOS);
  const [recDuration, setRecDuration] = useState(0);
  const [tab, setTab] = useState<"notes" | "memos">("notes");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const dictateWords = ["Follow up on compensation. Ask about equity refresh schedule. Confirm remote policy before accepting."];
  const appendWords = (words: string) => {
    setNoteText(prev => prev ? prev + " " + words : words);
  };

  const startDictation = () => {
    if (mode !== "idle") { stopAll(); return; }
    setMode("dictating");
    let w = 0;
    const words = dictateWords[0].split(" ");
    const id = setInterval(() => {
      if (w < words.length) {
        appendWords(words[w]);
        w++;
      } else {
        clearInterval(id);
        setMode("idle");
      }
    }, 220);
  };

  const startRecording = () => {
    setMode("recording");
    setRecDuration(0);
    timerRef.current = setInterval(() => setRecDuration(d => d + 1), 1000);
    setTab("memos");
  };

  const stopAll = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (mode === "recording" && recDuration > 0) {
      const dur = recDuration;
      setMemos(prev => [
        { id: Date.now(), time: "Just now", duration: `0:${String(dur).padStart(2, "0")}`, transcript: "New recording…" },
        ...prev,
      ]);
    }
    setMode("idle");
    setRecDuration(0);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--surface))]" style={{ maxWidth: 380 }}>
      {/* Phone chrome */}
      <div className="bg-[rgb(var(--surface-raised))] px-4 py-3 border-b border-[rgb(var(--border))]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">Meridian · Backend Eng</span>
          <span className="text-[11px] text-[rgb(var(--text-tertiary))]">interviewing</span>
        </div>
        <div className="flex gap-1">
          {(["notes", "memos"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                "px-3 py-1 rounded-full text-[12px] font-medium transition-all",
                tab === t
                  ? "bg-[rgb(var(--accent))] text-white"
                  : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]",
              ].join(" ")}
            >
              {t === "notes" ? "Notes" : "Voice Memos"}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="relative" style={{ minHeight: 240 }}>
        {tab === "notes" ? (
          <div className="p-4">
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              className="w-full bg-transparent text-[13px] text-[rgb(var(--text-primary))] resize-none outline-none leading-relaxed"
              rows={6}
              placeholder="Notes…"
            />
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {memos.map(m => (
              <div key={m.id} className="p-3 rounded-xl bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border-subtle))]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[rgb(var(--text-tertiary))]">{m.time}</span>
                  <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">{m.duration}</span>
                </div>
                <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-snug">{m.transcript}</p>
              </div>
            ))}
          </div>
        )}

        {/* Floating mic button */}
        <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
          {mode === "recording" && (
            <div className="bg-red-500/90 text-white text-[11px] font-mono px-2 py-1 rounded-full">
              {fmt(recDuration)} REC
            </div>
          )}
          {mode === "dictating" && (
            <div className="bg-[rgb(var(--accent))] text-white text-[11px] px-2 py-1 rounded-full flex items-center gap-1.5">
              <WaveformBars active={true} />
            </div>
          )}
          <div className="flex gap-2 items-center">
            {/* Tap = dictate, hold-hint = record */}
            <button
              onClick={mode === "recording" ? stopAll : mode === "dictating" ? stopAll : startDictation}
              onMouseDown={e => { if (e.button === 2) startRecording(); }}
              className="relative"
              title="Tap: dictate | Right-click to demo recording"
            >
              <RecordRing recording={mode === "recording"} />
            </button>
          </div>
          <p className="text-[10px] text-[rgb(var(--text-tertiary))] text-right pr-1">
            {mode === "idle" ? "Tap: dictate" : mode === "dictating" ? "Tap to stop" : "Tap to stop recording"}
          </p>
        </div>
      </div>

      {/* Demo controls */}
      <div className="px-4 pb-3 pt-1 border-t border-[rgb(var(--border))]">
        <button
          onClick={mode === "idle" ? startRecording : stopAll}
          className="text-[11px] px-3 py-1.5 rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          {mode === "recording" ? "Stop recording" : "Demo: hold to record"}
        </button>
      </div>
    </div>
  );
}

// ── Code examples ──────────────────────────────────────────────────────────────
const CODE = {
  swift: {
    filename: "VoiceMicButton.swift",
    code: `import SwiftUI
import Speech
import AVFoundation

struct VoiceMicButton: View {
    @ObservedObject var dictation: VoiceDictationService
    @ObservedObject var recorder:  AudioRecorderService
    var onTranscript: (String) -> Void
    var onMemoSaved:  (SavedAudioMemo) -> Void

    @State private var showPulse = false

    var body: some View {
        ZStack {
            // Pulsing ring — shown while recording
            if recorder.isRecording {
                Circle()
                    .stroke(Color.red.opacity(0.5), lineWidth: 2)
                    .scaleEffect(showPulse ? 1.5 : 1)
                    .opacity(showPulse ? 0 : 0.8)
                    .animation(
                        .easeOut(duration: 0.9).repeatForever(autoreverses: false),
                        value: showPulse
                    )
                    .frame(width: 56, height: 56)
            }

            Button {
                // Tap: toggle live dictation
                Task {
                    if dictation.isListening {
                        dictation.stopListening()
                    } else {
                        try dictation.startListening()
                    }
                }
            } label: {
                ZStack {
                    Circle()
                        .fill(recorder.isRecording ? Color.red : Color.accentColor)
                        .frame(width: 48, height: 48)
                        .shadow(radius: 4)

                    if recorder.isRecording {
                        RoundedRectangle(cornerRadius: 4)
                            .fill(.white)
                            .frame(width: 18, height: 18)
                    } else if dictation.isListening {
                        WaveformView(active: true)
                            .frame(width: 28, height: 16)
                    } else {
                        Image(systemName: "mic.fill")
                            .font(.system(size: 20))
                            .foregroundStyle(.white)
                    }
                }
            }
            .simultaneousGesture(
                LongPressGesture(minimumDuration: 0.5)
                    .onEnded { _ in
                        // Long-press: start audio memo recording
                        Task {
                            try await recorder.startRecording()
                            showPulse = true
                        }
                    }
            )
        }
        .onChange(of: dictation.transcript) { _, newValue in
            onTranscript(newValue)
        }
        .onChange(of: recorder.isRecording) { _, isRec in
            if !isRec {
                showPulse = false
                Task {
                    if let memo = await recorder.stopRecording() {
                        onMemoSaved(memo)
                    }
                }
            }
        }
        .onAppear {
            Task { await dictation.requestAuthorization() }
        }
    }
}`,
  },
  macos: {
    filename: "AudioMemoListView+macOS.swift",
    code: `import SwiftUI
import AVFoundation

// macOS — Record Memo toolbar button + memo list in job detail
struct MacAudioMemoSection: View {
    let job: Job
    @Environment(\\.modelContext) private var modelContext
    @StateObject private var recorder = AudioRecorderService()
    @State private var player: AVAudioPlayer?
    @State private var playingID: UUID?

    private var memos: [AudioMemo] {
        (job.audioMemos ?? []).sorted { $0.createdAt > $1.createdAt }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Voice Memos")
                    .font(.system(size: 14, weight: .semibold))
                Spacer()
                Button {
                    Task {
                        if recorder.isRecording {
                            if let saved = await recorder.stopRecording() {
                                let memo = AudioMemo(
                                    fileName: saved.fileName,
                                    duration: saved.duration
                                )
                                memo.transcription = saved.tempTranscript
                                memo.job = job
                                modelContext.insert(memo)
                                job.addAudioMemo(memo)
                            }
                        } else {
                            try await recorder.startRecording()
                        }
                    }
                } label: {
                    Label(
                        recorder.isRecording ? "Stop" : "Record Memo",
                        systemImage: recorder.isRecording ? "stop.circle.fill" : "mic.badge.plus"
                    )
                    .foregroundStyle(recorder.isRecording ? .red : Color.accentColor)
                }
                .buttonStyle(.plain)
            }

            if memos.isEmpty {
                Text("No memos yet. Click Record Memo to start.")
                    .font(.system(size: 12))
                    .foregroundStyle(.secondary)
            } else {
                ForEach(memos) { memo in
                    AudioMemoRow(
                        memo: memo,
                        isPlaying: playingID == memo.id,
                        onPlay: { play(memo) },
                        onStop: stopPlayback,
                        onDelete: { delete(memo) }
                    )
                }
            }
        }
        .padding(16)
        .glassCard()
    }

    private func play(_ memo: AudioMemo) {
        stopPlayback()
        let url = FileManager.default
            .urls(for: .documentDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("AudioMemos/\\(memo.fileName)")
        player = try? AVAudioPlayer(contentsOf: url)
        player?.play()
        playingID = memo.id
    }

    private func stopPlayback() { player?.stop(); playingID = nil }

    private func delete(_ memo: AudioMemo) {
        let url = FileManager.default
            .urls(for: .documentDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("AudioMemos/\\(memo.fileName)")
        try? FileManager.default.removeItem(at: url)
        job.audioMemos?.removeAll { $0.id == memo.id }
        modelContext.delete(memo)
    }
}`,
  },
  react: {
    filename: "VoiceMemoList.tsx",
    code: `// Web reference implementation using MediaRecorder API
"use client";

import { useState, useRef, useEffect } from "react";

interface AudioMemo {
  id: string;
  blob: Blob;
  duration: number;   // seconds
  transcript?: string;
  createdAt: Date;
}

export function VoiceMemoList() {
  const [memos, setMemos]       = useState<AudioMemo[]>([]);
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed]   = useState(0);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    chunksRef.current = [];
    mr.ondataavailable = e => chunksRef.current.push(e.data);
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setMemos(prev => [
        { id: crypto.randomUUID(), blob, duration: elapsed, createdAt: new Date() },
        ...prev,
      ]);
      stream.getTracks().forEach(t => t.stop());
    };
    mr.start();
    mediaRef.current = mr;
    setElapsed(0);
    setRecording(true);
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
  };

  const stop = () => {
    mediaRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    setRecording(false);
  };

  const fmt = (s: number) =>
    \`\${Math.floor(s / 60)}:\${String(s % 60).padStart(2, "0")}\`;

  return (
    <div className="space-y-3">
      <button
        onClick={recording ? stop : start}
        className={\`px-4 py-2 rounded-full text-sm font-medium transition-all
          \${recording
            ? "bg-red-500 text-white"
            : "bg-[rgb(var(--accent))] text-white"}\`}
      >
        {recording ? \`Stop · \${fmt(elapsed)}\` : "Record Memo"}
      </button>

      {memos.map(m => (
        <div key={m.id} className="p-3 rounded-xl bg-[rgb(var(--surface-raised))] border
                                   border-[rgb(var(--border))] space-y-1">
          <div className="flex justify-between text-[11px] text-[rgb(var(--text-tertiary))]">
            <span>{m.createdAt.toLocaleTimeString()}</span>
            <span className="font-mono">{fmt(m.duration)}</span>
          </div>
          <audio controls src={URL.createObjectURL(m.blob)} className="w-full h-7" />
        </div>
      ))}
    </div>
  );
}`,
  },
  html: {
    filename: "voice-memo.html",
    code: `<!-- Minimal voice memo UI — styling with Sitka tokens -->
<div class="voice-memo-panel">
  <div class="vm-header">
    <span class="vm-title">Voice Memos</span>
    <button id="vm-record-btn" class="vm-record-btn" aria-label="Start recording">
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" fill="currentColor"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M9 22h6"
              stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
  <div id="vm-list" class="vm-list" aria-live="polite"></div>
</div>

<style>
.voice-memo-panel { background: rgb(var(--surface-raised)); border-radius: 16px; padding: 16px; }
.vm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.vm-title  { font-size: 14px; font-weight: 600; color: rgb(var(--text-primary)); }
.vm-record-btn {
  width: 40px; height: 40px; border-radius: 50%; border: none; cursor: pointer;
  background: rgb(var(--accent)); color: white; display: flex;
  align-items: center; justify-content: center;
  transition: background 0.2s, transform 0.15s;
}
.vm-record-btn.recording { background: #ef4444; transform: scale(1.1); }
.vm-list { display: flex; flex-direction: column; gap: 8px; }
.vm-row {
  padding: 10px 12px; border-radius: 10px;
  background: rgb(var(--surface)); border: 1px solid rgb(var(--border));
}
.vm-row audio { width: 100%; height: 28px; margin-top: 4px; }
</style>`,
  },
};

// ── Main page ──────────────────────────────────────────────────────────────────
export default function VoiceMemoPage() {
  return (
    <div>
      <PageHeader
        title="Voice Memo & Dictation"
        description="A dual-gesture microphone button that taps for live speech-to-text dictation and holds for audio memo recording. All processing is on-device — SFSpeechRecognizer with requiresOnDeviceRecognition, AVAudioRecorder saving to a local Documents folder."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <VoiceMemoDemo />
        <p className="mt-3 text-[12px] text-[rgb(var(--text-tertiary))]">
          Tap the mic to demo live dictation · click "Demo: hold to record" to add a memo entry
        </p>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The pattern has three distinct layers that work in parallel.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Layer</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Gesture</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Service</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Output</th>
              </tr>
            </thead>
            <tbody>
              {[
                { layer: "Live Dictation", gesture: "Tap mic button", service: "VoiceDictationService (SFSpeechRecognizer)", output: "Streaming transcript → appended to notes draft" },
                { layer: "Audio Memo", gesture: "Long press (0.5s)", service: "AudioRecorderService (AVAudioRecorder)", output: "UUID.m4a saved to Documents/AudioMemos/" },
                { layer: "Playback", gesture: "Tap memo row", service: "AVAudioPlayer", output: "In-app audio playback with scrubber" },
              ].map(row => (
                <tr key={row.layer} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.layer}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.gesture}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.service}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Design notes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Design notes</h2>
        <div className="space-y-3">
          {[
            { heading: "Single button, two modes", body: "Avoid separate buttons for 'dictate' and 'record'. A single floating mic with dual gesture keeps the UI uncluttered. The tap/hold distinction is learnable after one use." },
            { heading: "Visual state is essential", body: "Dictation mode: animated waveform bars (5–9 bars, heights randomised every ~100ms). Recording mode: red fill + pulsing ring at 0.9s ease-out repeat. Idle: accent fill, static mic icon. Never leave the user uncertain about which mode is active." },
            { heading: "On-device only — declare it", body: "Set requiresOnDeviceRecognition = true on SFSpeechAudioBufferRecognitionRequest. This prevents the request from being routed to Apple's servers. Declare NSSpeechRecognitionUsageDescription in Info.plist stating that recognition happens on-device." },
            { heading: "File naming is idempotent", body: "Save audio files as UUID.m4a relative to Documents/AudioMemos/. Reconstruct the full path at playback time so the file survives app reinstall of the database while the Documents folder persists (for TestFlight / device backup)." },
            { heading: "Transcription is async", body: "Apply SFSpeechRecognizer to the finished .m4a after AVAudioRecorder stops, not during recording. This avoids contention between the audio engine input node and the speech recogniser. Store the transcript in the AudioMemo SwiftData model once available." },
          ].map(({ heading, body }) => (
            <div key={heading} className="flex gap-3 text-[14px]">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              <div>
                <span className="font-medium text-[rgb(var(--text-primary))]">{heading} — </span>
                <span className="text-[rgb(var(--text-secondary))]">{body}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Privacy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Privacy & entitlements</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Key / Entitlement</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Platform</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: "NSMicrophoneUsageDescription", platform: "iOS + macOS", notes: "Required for AVAudioSession. State on-device only." },
                { key: "NSSpeechRecognitionUsageDescription", platform: "iOS + macOS", notes: "Required for SFSpeechRecognizer. State on-device only." },
                { key: "com.apple.security.device.audio-input", platform: "macOS entitlement", notes: "Hardened runtime entitlement for mic access on macOS." },
              ].map(row => (
                <tr key={row.key} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-primary))]">{row.key}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.platform}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "The mic button must declare accessibilityLabel that changes with mode: 'Start dictation', 'Stop dictation', 'Recording in progress — tap to stop'.",
            "The pulsing animation ring should carry accessibilityHidden(true) — it is decorative.",
            "Audio memos should expose accessibilityLabel with creation time and transcription preview: 'Voice memo from 2:41 PM, 47 seconds. Need to follow up on system design question.'",
            "Ensure AVAudioSession category .playAndRecord does not interrupt VoiceOver. Set .mixWithOthers option or pause session when VoiceOver is active.",
          ].map(item => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
