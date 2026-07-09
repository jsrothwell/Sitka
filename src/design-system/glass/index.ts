import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type GlassIntensity = 'low' | 'medium' | 'high';

const intensityMap: Record<GlassIntensity, string> = {
  low: 'bg-white/[0.04] dark:bg-white/[0.02] border border-white/[0.08] dark:border-white/[0.04]',
  medium: 'bg-white/[0.07] dark:bg-white/[0.04] border border-white/[0.12] dark:border-white/[0.06]',
  high: 'bg-white/[0.12] dark:bg-white/[0.08] border border-white/[0.18] dark:border-white/[0.10]',
};

export function glassSurface(opts?: { intensity?: GlassIntensity }) {
  const intensity = opts?.intensity ?? 'medium';
  return intensityMap[intensity];
}

export const glassSpecularTopEdge = 'after:absolute after:inset-0 after:h-px after:bg-white/[0.28] after:top-0 after:pointer-events-none after:opacity-28 after:rounded-t-[inherit]';

export const glassBrandLitSurface = 'after:absolute after:inset-0 after:bg-linear-to-b after:from-white/[0.15] after:from-0% after:to-transparent after:pointer-events-none after:rounded-[inherit]';

export const glassPillSpecular = 'after:absolute after:w-10 after:h-10 after:bg-radial-[center_at_center] after:from-white/[0.22] after:to-transparent after:rounded-full after:pointer-events-none';

export const glassColorStripSheen = 'after:absolute after:inset-0 after:bg-linear-to-b after:from-white/[0.12] after:to-transparent after:pointer-events-none';

export const sheetEntryScale = 'scale-97 opacity-0 animate-sheet-entry';

export const sheetEntryAnimation = 'transition-transform transition-opacity duration-250 ease-[cubic-bezier(0,0,0.2,1)]';
