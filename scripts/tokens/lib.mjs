// Shared helpers for the token generators. Reads src/tokens/tokens.json (DTCG) and
// resolves {references}. No dependencies, so it runs anywhere Node does.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const tokens = JSON.parse(readFileSync(resolve(ROOT, "src/tokens/tokens.json"), "utf8"));
export const VERSION = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8")).version;

const at = (path) => path.split(".").reduce((n, k) => (n == null ? undefined : n[k]), tokens);

/** Resolves a token's $value, following {a.b.c} references (with or without a leading "color."). */
export function resolveValue(value, seen = new Set()) {
  if (typeof value !== "string") return value;
  const m = value.match(/^\{(.+)\}$/);
  if (!m) return value;
  const ref = m[1];
  if (seen.has(ref)) throw new Error(`Circular token reference: ${ref}`);
  seen.add(ref);
  const node = at(ref) ?? at(`color.${ref}`);
  if (!node || node.$value === undefined) throw new Error(`Unresolved token reference: {${ref}}`);
  return resolveValue(node.$value, seen);
}

/** Yields [pathArray, token] for every leaf token under `node`. */
export function* leaves(node, path = []) {
  if (!node || typeof node !== "object") return;
  if ("$value" in node) {
    yield [path, node];
    return;
  }
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("$") || k === "comment") continue;
    yield* leaves(v, [...path, k]);
  }
}

/** Parses "#rrggbb", "#rgb", "rgb(r, g, b)" or "rgba(r, g, b, a)" into 0–255 channels + alpha 0–1. */
export function parseColor(input) {
  const v = resolveValue(input).trim();
  if (v.startsWith("#")) {
    const h = v.length === 4 ? [...v.slice(1)].map((c) => c + c).join("") : v.slice(1);
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 };
  }
  const m = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/);
  if (!m) throw new Error(`Unparseable colour: ${v}`);
  return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
}

export const toHex = ({ r, g, b }) => "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");

/** "16px" → 16, "1.5" → 1.5, "250ms" → 0.25 (seconds), "0.04em" → 0.04. */
export function toNumber(input) {
  const v = String(resolveValue(input)).trim();
  const n = parseFloat(v);
  if (Number.isNaN(n)) return null;
  return v.endsWith("ms") ? n / 1000 : n;
}

/** Writes a file only if its content changed, creating directories as needed. Returns true if written. */
export function writeIfChanged(relPath, content) {
  const abs = resolve(ROOT, relPath);
  let prev = null;
  try {
    prev = readFileSync(abs, "utf8");
  } catch {}
  if (prev === content) return false;
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
  return true;
}
