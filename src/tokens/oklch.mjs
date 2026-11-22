// OKLCH ↔ sRGB conversion for Sitka colour tokens (Björn Ottosson's OKLab, CSS Color 4).
// tokens.json stores colours as DTCG colour objects in OKLCH with an sRGB hex fallback:
//   { "colorSpace": "oklch", "components": [0.7397, 0.1305, 220.06], "hex": "#00c0e8" }
// Shared by the generators (scripts/tokens), the site, tests and the MCP server. No dependencies.

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const fromLinear = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

/** sRGB 0–255 channels → [L 0–1, C, H degrees]. */
export function srgbToOklch(r, g, b) {
  const [lr, lg, lb] = [r, g, b].map((c) => toLinear(c / 255));
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return [L, C, C < 1e-4 ? 0 : H];
}

/** [L, C, H] → sRGB 0–255 channels (rounded and clamped to the sRGB gamut). */
export function oklchToSrgb([L, C, H]) {
  const h = (H * Math.PI) / 180;
  const A = C * Math.cos(h);
  const B = C * Math.sin(h);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return lin.map((c) => Math.round(Math.min(1, Math.max(0, fromLinear(c))) * 255));
}

/** Rounds OKLCH components (L and C to `d` decimals, H to `d - 2`). */
export const roundOklch = ([L, C, H], d = 4) => [+L.toFixed(d), +C.toFixed(d), +H.toFixed(d - 2)];

/** True for a DTCG colour object ({ colorSpace, components, alpha?, hex? }). */
export const isColorObject = (v) => v != null && typeof v === "object" && typeof v.colorSpace === "string" && Array.isArray(v.components);

/**
 * Any Sitka colour value → { r, g, b, a } (0–255, alpha 0–1). Accepts DTCG OKLCH/sRGB objects,
 * "#rgb", "#rrggbb", "#rrggbbaa", "rgb(…)" and "rgba(…)". References must be resolved first.
 */
export function toRgba(value) {
  if (isColorObject(value)) {
    const a = value.alpha ?? 1;
    if (value.colorSpace === "oklch") {
      const [r, g, b] = oklchToSrgb(value.components);
      return { r, g, b, a };
    }
    if (value.colorSpace === "srgb") {
      const [r, g, b] = value.components.map((c) => Math.round(c * 255));
      return { r, g, b, a };
    }
    if (value.hex) return toRgba(value.hex);
    throw new Error(`Unsupported colour space: ${value.colorSpace}`);
  }
  const v = String(value).trim();
  if (v.startsWith("#")) {
    const h = v.length === 4 ? [...v.slice(1)].map((c) => c + c).join("") : v.slice(1);
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 };
  }
  const m = v.match(/rgba?\(\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)\s*(?:[,/]\s*([\d.]+)\s*)?\)/);
  if (!m) throw new Error(`Unparseable colour: ${v}`);
  return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
}

/** Any Sitka colour value → "#rrggbb" (alpha dropped). */
export const toHex6 = (value) => {
  const { r, g, b } = toRgba(value);
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
};

/** Any Sitka colour value → CSS "oklch(L% C H)" or "oklch(L% C H / a)". */
export function toCssOklch(value) {
  let comps;
  let a;
  if (isColorObject(value) && value.colorSpace === "oklch") {
    comps = value.components;
    a = value.alpha ?? 1;
  } else {
    const c = toRgba(value);
    comps = roundOklch(srgbToOklch(c.r, c.g, c.b));
    a = c.a;
  }
  const [L, C, H] = comps;
  const body = `${+(L * 100).toFixed(2)}% ${C} ${H}`;
  return a < 1 ? `oklch(${body} / ${+a.toFixed(3)})` : `oklch(${body})`;
}

/** Converts a legacy string colour to the stored DTCG OKLCH object. */
export function toOklchToken(value) {
  const { r, g, b, a } = toRgba(value);
  // Shortest precision that still round-trips to the same 8-bit sRGB colour.
  const exact = srgbToOklch(r, g, b);
  let components;
  for (const d of [4, 5, 6, 7]) {
    components = roundOklch(exact, d);
    const back = oklchToSrgb(components);
    if (back[0] === r && back[1] === g && back[2] === b) break;
    if (d === 7) throw new Error(`OKLCH round-trip drift for ${value}: got ${back}`);
  }
  const hex = "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
  return a < 1 ? { colorSpace: "oklch", components, alpha: +a.toFixed(3), hex } : { colorSpace: "oklch", components, hex };
}
