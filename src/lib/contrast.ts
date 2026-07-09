/**
 * WCAG 2.1 contrast utilities. TypeScript port of Warren's Swift
 * `sfAccessibleForeground()` — documented on /foundations/contrast.
 */

function toLinear(channel: number): number {
  return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
}

/** Relative luminance of a `#rrggbb` hex colour, per WCAG 2.1 §1.4.3. */
export function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** WCAG contrast ratio between two `#rrggbb` hex colours (1:1 to 21:1). */
export function contrastRatio(hexA: string, hexB: string): number {
  const lumA = relativeLuminance(hexA);
  const lumB = relativeLuminance(hexB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Returns `#000000` or `#ffffff`, whichever yields legible text on `background`.
 * The 0.179 luminance threshold is the crossover point for ~4.5:1 contrast
 * against both black and white.
 */
export function accessibleForeground(background: string): "#000000" | "#ffffff" {
  return relativeLuminance(background) > 0.179 ? "#000000" : "#ffffff";
}

/** Whether `fg` on `bg` meets the given WCAG level (default: AA normal text, 4.5:1). */
export function meetsContrast(fg: string, bg: string, minRatio = 4.5): boolean {
  return contrastRatio(fg, bg) >= minRatio;
}
