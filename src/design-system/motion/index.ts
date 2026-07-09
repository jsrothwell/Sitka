import { motion as raw, type Variants } from 'framer-motion';

export type SpringPreset = 'default' | 'press' | 'cardAppear' | 'panel' | 'page' | 'stream' | 'progressFill' | 'sheetEntry' | 'dropSpring';

export const presets: Record<SpringPreset, Variants> = {
  default: {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 30 } },
  },
  press: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 40 } },
  },
  cardAppear: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 30 } },
  },
  panel: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  },
  page: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  },
  stream: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } },
  },
  progressFill: {
    hidden: { opacity: 1, width: 0 },
    visible: { opacity: 1, width: '100%', transition: { type: 'spring', stiffness: 400, damping: 75 } },
  },
  sheetEntry: {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  },
  dropSpring: {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  },
};

export function spring(preset: SpringPreset = 'default') {
  const p = presets[preset];
  const transition = p.visible ? (p.visible as Record<string, unknown>).transition : { type: 'spring', stiffness: 500, damping: 30 };
  return transition as Parameters<typeof raw.div>[0]['transition'];
}

export function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.25, delay },
  };
}

export function scaleIn(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: 'spring', stiffness: 500, damping: 30, delay },
  };
}

export { raw as motion };
