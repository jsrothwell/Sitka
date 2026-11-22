#!/usr/bin/env node
// Sitka adoption scanner. Point it at an app's source folder to measure how much of the UI uses
// Sitka: sitka-ui component imports, token references vs raw colours, per platform.
//
//   npm run adoption -- ../MyApp            # summary
//   npm run adoption -- ../MyApp --json     # machine-readable, for dashboards or CI
//   npm run adoption -- ../MyApp --min 80   # exit 1 if token coverage is below 80%
//
// Token coverage = token colour references / (token references + raw colour literals).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SKIP_DIRS = new Set(["node_modules", ".git", ".next", "out", "dist", "build", ".build", "DerivedData", "Pods", "storybook-static", "coverage"]);
const WEB = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".scss"]);
const PLATFORM = { ".swift": "swift", ".kt": "kotlin" };
const GENERATED = /(SitkaTokens\.swift|SitkaColors\.kt|tokens\.components\.css|globals\.css)$/;

const PATTERNS = {
  web: {
    token: [/\bvar\(--(?:color|accent|text|surface|background|border|status|on|danger|categorical|button|badge|input|card|link)[\w-]*\)/g],
    raw: [/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g, /\brgba?\(\s*\d/g, /\bhsla?\(\s*\d/g, /\b(?:text|bg|border|fill|stroke)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d{2,3}\b/g],
  },
  swift: {
    token: [/\bColor\.sitka\(/g, /SitkaTokens\.Component\./g],
    raw: [/\b(?:Color|UIColor|NSColor)\(\s*(?:\.sRGB\s*,\s*|\.displayP3\s*,\s*)?(?:red|white|hue|displayP3Red|srgbRed)\s*:/g, /\b(?:Color|UIColor|NSColor)\(\s*hex\s*:/g, /#colorLiteral\(/g, /\bColor\.(?:red|orange|yellow|green|mint|teal|cyan|blue|indigo|purple|pink|brown|gray)\b/g],
  },
  kotlin: {
    token: [/\bSitkaTheme\.colors\./g, /\bLocalSitkaColors\b/g],
    raw: [/\bColor\(0x[0-9a-fA-F]{6,8}\)/g, /\bColor\.(?:Red|Green|Blue|Yellow|Cyan|Magenta|Gray|DarkGray|LightGray)\b/g, /parseColor\(/g],
  },
};

const count = (text, regexes) => regexes.reduce((n, re) => n + (text.match(re)?.length ?? 0), 0);

export function scan(root) {
  const result = {
    root,
    files: 0,
    components: {},
    platforms: {},
    hotspots: [],
  };
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      const st = statSync(path);
      if (st.isDirectory()) {
        if (!SKIP_DIRS.has(name) && !name.startsWith(".")) walk(path);
        continue;
      }
      const ext = extname(name);
      const platform = WEB.has(ext) ? "web" : PLATFORM[ext];
      if (!platform || GENERATED.test(path) || st.size > 1_000_000) continue;
      const text = readFileSync(path, "utf8");
      result.files++;
      const p = (result.platforms[platform] ??= { files: 0, tokenRefs: 0, rawColors: 0 });
      p.files++;
      const tokenRefs = count(text, PATTERNS[platform].token);
      const rawColors = count(text, PATTERNS[platform].raw);
      p.tokenRefs += tokenRefs;
      p.rawColors += rawColors;
      if (rawColors) result.hotspots.push({ file: relative(root, path), rawColors });
      if (platform === "web") {
        for (const m of text.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']sitka-ui["']/g)) {
          for (const raw of m[1].split(",")) {
            const n = raw.trim().split(/\s+as\s+/)[0].replace(/^type\s+/, "");
            if (n) result.components[n] = (result.components[n] ?? 0) + 1;
          }
        }
      }
    }
  };
  walk(root);
  for (const p of Object.values(result.platforms)) {
    const total = p.tokenRefs + p.rawColors;
    p.tokenCoverage = total ? Math.round((p.tokenRefs / total) * 1000) / 10 : null;
  }
  const all = Object.values(result.platforms).reduce((a, p) => [a[0] + p.tokenRefs, a[1] + p.rawColors], [0, 0]);
  result.tokenCoverage = all[0] + all[1] ? Math.round((all[0] / (all[0] + all[1])) * 1000) / 10 : null;
  result.hotspots.sort((a, b) => b.rawColors - a.rawColors).splice(10);
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const target = args.find((a) => !a.startsWith("--") && !/^\d+$/.test(a));
  const minIdx = args.indexOf("--min");
  const min = minIdx >= 0 ? Number(args[minIdx + 1]) : null;
  if (!target) {
    console.error("Usage: npm run adoption -- <path> [--json] [--min <percent>]");
    process.exit(2);
  }
  const r = scan(resolve(target));
  if (args.includes("--json")) console.log(JSON.stringify(r, null, 2));
  else {
    console.log(`Sitka adoption: ${r.root} (${r.files} files)\n`);
    console.log(`Token coverage: ${r.tokenCoverage ?? "n/a"}%`);
    for (const [name, p] of Object.entries(r.platforms))
      console.log(`  ${name.padEnd(7)} ${String(p.tokenCoverage ?? "n/a").padStart(5)}%  ${p.tokenRefs} token refs, ${p.rawColors} raw colours, ${p.files} files`);
    const comps = Object.entries(r.components).sort((a, b) => b[1] - a[1]);
    console.log(`\nsitka-ui components imported: ${comps.length}`);
    if (comps.length) console.log("  " + comps.map(([n, c]) => `${n} ×${c}`).join(", "));
    if (r.hotspots.length) {
      console.log("\nMost raw colours:");
      for (const h of r.hotspots) console.log(`  ${String(h.rawColors).padStart(4)}  ${h.file}`);
    }
  }
  if (min != null && (r.tokenCoverage ?? 0) < min) {
    console.error(`\nToken coverage ${r.tokenCoverage}% is below --min ${min}%.`);
    process.exit(1);
  }
}
