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
