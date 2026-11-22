import { statSync } from "node:fs";
import { join } from "node:path";
import { Download, History, Layers } from "lucide-react";
import drift from "./figma-drift.json";

/**
 * Hero download block for the Figma library.
 *
 * Download-link practices followed here:
 *  - Plain <a href download>, no JS — works with keyboard, middle-click, "Save link as…" and no-JS.
 *  - Link text names the action and the format; size and format are stated next to it and
 *    read by screen readers via aria-describedby, so nobody downloads blind.
 *  - Says which app opens each file and what's inside, so people pick the right one.
 *  - Dated save-as filename (download="…-2026-11-21.fig") while the URL stays stable.
 *  - File sizes are read from disk at build time, so they can't drift from the real files.
 */

/**
 * Everything about the file (save date, counts, cover image, drift from tokens.json) is read from
 * the .figcraft by scripts/figma/drift.mjs on every build. To ship a new export, replace the two
 * files in public/downloads/ and run `npm run generate`.
 */
const SNAPSHOT = drift.stats.savedAt;
const SNAPSHOT_LABEL = new Date(`${SNAPSHOT}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

function sizeOf(file: string) {
  try {
    const bytes = statSync(
      join(process.cwd(), "public", "downloads", file)
    ).size;
    return bytes >= 1_000_000
      ? `${(bytes / 1_000_000).toFixed(1)} MB`
      : `${Math.round(bytes / 1000)} KB`;
  } catch {
    return null;
  }
}

const FILES = [
  {
    id: "fig",
    file: "sitka-design-system.fig",
    ext: ".fig",
    title: "Figma library",
    opensIn: "Figma — drag onto the file browser, or Import",
    detail:
      "Components, styles and variables, ready to publish as a team library.",
    icon: Layers,
    primary: true,
  },
  {
    id: "figcraft",
    file: "sitka-design-system.figcraft",
    ext: ".figcraft",
    title: "Figcraft source",
    opensIn: "Figcraft",
    detail:
      `Editable source with its ${drift.stats.versions} saved versions, for forking or diffing changes.`,
    icon: History,
    primary: false,
  },
] as const;

/** Counts read from the file's document.json by scripts/figma/drift.mjs. */
const STATS = [
  { value: drift.stats.pages, label: "pages" },
  { value: drift.stats.componentSets, label: "component sets" },
  { value: drift.stats.variables, label: "variables" },
  { value: drift.stats.colourModes, label: "colour modes" },
];

const primaryBtn =
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[rgb(var(--accent))] px-4 text-[13px] font-semibold text-[rgb(var(--on-accent))] transition-standard hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent))]";
const secondaryBtn =
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[rgb(var(--border))] px-4 text-[13px] font-semibold text-[rgb(var(--text-primary))] transition-standard hover:border-[rgb(var(--accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent))]";

export function FigmaDownloads() {
  return (
    <div
      className="mt-2 overflow-hidden rounded-2xl border border-[rgb(var(--border))]"
      style={{ backgroundColor: "var(--card-tint-bg)" }}
    >
      <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* ── Graphic ───────────────────────────────── */}
        <div
          className="relative flex items-center justify-center overflow-hidden px-6 pb-4 pt-8 md:py-8"
          aria-hidden
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 70% at 35% 40%, rgb(var(--accent) / 0.16), transparent 70%)",
            }}
          />
          <div className="relative w-full max-w-[340px]">
            {/* Back sheet — the .figcraft, with version history */}
            <div className="absolute -right-2 -top-3 h-full w-[88%] rotate-[4deg] rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] shadow-lg">
              <div className="flex gap-1 p-2.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 flex-1 rounded-full bg-[rgb(var(--accent))]"
                    style={{ opacity: 0.25 + i * 0.15 }}
                  />
                ))}
              </div>
            </div>
            {/* Front sheet — the .fig cover, in a window frame */}
            <div className="relative -rotate-[1.5deg] overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-2xl">
              <div className="flex items-center gap-1.5 border-b border-[rgb(var(--border))] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[rgb(var(--text-tertiary))] opacity-40" />
                <span className="h-2 w-2 rounded-full bg-[rgb(var(--text-tertiary))] opacity-40" />
                <span className="h-2 w-2 rounded-full bg-[rgb(var(--text-tertiary))] opacity-40" />
                <span className="ml-2 font-mono text-[10px] text-[rgb(var(--text-tertiary))]">
                  SitkaDesignSystem.fig
                </span>
              </div>
              <img
                src={`${BASE}/downloads/sitka-figma-cover.png`}
                width={400}
                height={250}
                alt=""
                className="block h-auto w-full"
              />
            </div>
            <span className="absolute -bottom-3 left-4 rounded-full bg-[rgb(var(--accent))] px-2.5 py-1 font-mono text-[10px] font-semibold text-[rgb(var(--on-accent))] shadow-md">
              {SNAPSHOT_LABEL}
            </span>
          </div>
        </div>

        {/* ── Copy + downloads ──────────────────────── */}
        <div className="flex flex-col justify-center gap-5 p-6 md:p-8">
          <div>
            <p className="label-mono mb-2">For designers</p>
            <h2 className="text-[1.375rem] font-bold leading-tight text-[rgb(var(--text-primary))]">
              Design with the same tokens
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[rgb(var(--text-secondary))]">
              The Figma library mirrors this site: colours, spacing, type and
              radii are variables named after{" "}
              <code className="font-mono text-[0.85em]">tokens.json</code>.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="text-[11px] text-[rgb(var(--text-tertiary))]">
                  {s.label}
                </dt>
                <dd className="text-[1rem] font-bold tabular-nums text-[rgb(var(--text-primary))]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t border-[rgb(var(--border))] p-4 md:p-6">
        <ul className="grid gap-3 sm:grid-cols-2">
          {FILES.map(
            ({
              id,
              file,
              ext,
              title,
              opensIn,
              detail,
              icon: Icon,
              primary,
            }) => {
              const size = sizeOf(file);
              const metaId = `dl-${id}-meta`;
              return (
                <li
                  key={id}
                  className="flex flex-col gap-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent-text))]">
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.9375rem] font-semibold text-[rgb(var(--text-primary))]">
                        {title}
                      </p>
                      <p
                        id={metaId}
                        className="text-[12px] leading-snug text-[rgb(var(--text-secondary))]"
                      >
                        <span className="font-mono">{ext}</span>
                        {size && <> · {size}</>} · Opens in {opensIn}. {detail}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`${BASE}/downloads/${file}`}
                    download={`SitkaDesignSystem-${SNAPSHOT}${ext}`}
                    aria-describedby={metaId}
                    className={
                      primary
                        ? `mt-auto ${primaryBtn}`
                        : `mt-auto ${secondaryBtn}`
                    }
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    Download {ext}
                  </a>
                </li>
              );
            }
          )}
        </ul>
        <DriftNote />
      </div>
    </div>
  );
}

/** Plain-language summary of what the exported file is missing, from figma-drift.json. */
function DriftNote() {
  const changed = [...new Set((drift.mismatched as { name: string }[]).map((m) => m.name))];
  if (drift.inSync) {
    return (
      <p className="text-[12px] leading-relaxed text-[rgb(var(--text-tertiary))]">
        Exported {SNAPSHOT_LABEL}. Every variable matches the tokens on this site.
      </p>
    );
  }
  const parts = [
    drift.missing.length > 0 && `${drift.missing.length} token${drift.missing.length === 1 ? "" : "s"} added since the export`,
    changed.length > 0 && `${changed.length} value${changed.length === 1 ? "" : "s"} changed`,
  ].filter(Boolean);
  return (
    <details className="text-[12px] leading-relaxed text-[rgb(var(--text-tertiary))]">
      <summary className="cursor-pointer hover:text-[rgb(var(--text-primary))]">
        Exported {SNAPSHOT_LABEL}. Behind the code by {parts.join(" and ")}.
      </summary>
      <p className="mt-2">
        Use the{" "}
        <a href={`${BASE}/foundations/color/`} className="underline underline-offset-2 hover:text-[rgb(var(--text-primary))]">
          Color page
        </a>{" "}
        values for these until the next export:
      </p>
      <ul className="mt-2 grid gap-x-4 gap-y-0.5 font-mono text-[11px] sm:grid-cols-2">
        {(drift.missing as string[]).map((name) => (
          <li key={name}>+ {name}</li>
        ))}
        {changed.map((name) => (
          <li key={name}>~ {name}</li>
        ))}
      </ul>
    </details>
  );
}
