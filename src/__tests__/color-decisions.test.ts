import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import { contrastRatio } from '@/lib';
import tokens from '@/tokens/tokens.json';
import { oklchToSrgb, toRgba } from '@/tokens/oklch.mjs';

/**
 * Locks in the two token decisions from docs/audits/CROSS_APP_PATTERN_AUDIT_2026-11-21.md §3:
 * status text tones, and the categorical palette exposed as CSS variables.
 * Also locks text-on-fill tokens (onAccent, onDanger) added after the 2027 readiness review.
 */

type Rgb = [number, number, number];

/** Any tokens.json colour (DTCG OKLCH object, hex or rgb()) or CSS triplet → sRGB channels. */
function parse(value: unknown): Rgb {
  // Follow {a.b.c} references (with or without a leading "color.").
  for (let depth = 0; typeof value === 'string' && /^\{.+\}$/.test(value) && depth < 10; depth++) {
    const path = value.slice(1, -1).split('.');
    const at = (p: string[]) => p.reduce<unknown>((n, k) => (n as Record<string, unknown> | undefined)?.[k], tokens);
    const node = (at(path) ?? at(['color', ...path])) as { $value?: unknown } | undefined;
    if (!node?.$value) throw new Error(`Unresolved reference ${value}`);
    value = node.$value;
  }
  const { r, g, b } = toRgba(value);
  return [r, g, b];
}

const hex = ([r, g, b]: Rgb) => `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
const mix = (fg: Rgb, bg: Rgb, alpha: number): Rgb =>
  fg.map((c, i) => Math.round(c * alpha + bg[i] * (1 - alpha))) as Rgb;

const themes = tokens.color.themes as unknown as Record<'dark' | 'light', Record<string, { $value: unknown }>>;
const STATUSES = ['Success', 'Warning', 'Danger', 'Caution'] as const;
const SURFACES = ['surface', 'surfaceRaised', 'background', 'surfaceHover'] as const;

describe.each(['light', 'dark'] as const)('status text tokens — %s theme', (theme) => {
  const t = themes[theme];

  it.each(STATUSES)('status%sText clears 4.5:1 on every surface', (status) => {
    const text = parse(t[`status${status}Text`].$value);
    for (const s of SURFACES) {
      expect(contrastRatio(hex(text), hex(parse(t[s].$value)))).toBeGreaterThanOrEqual(4.5);
    }
  });

  it.each(STATUSES)('status%sText clears 4.5:1 on its own 12%% tint (status pills)', (status) => {
    const text = parse(t[`status${status}Text`].$value);
    const fill = parse(t[`status${status}`].$value);
    for (const s of SURFACES) {
      const pill = mix(fill, parse(t[s].$value), 0.12);
      expect(contrastRatio(hex(text), hex(pill))).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe.each(['light', 'dark'] as const)('text on solid fills — %s theme', (theme) => {
  const t = themes[theme];
  const ratio = (fg: string, bg: string) => contrastRatio(hex(parse(t[fg].$value)), hex(parse(t[bg].$value)));

  it.each(['textPrimary', 'textSecondary', 'textTertiary', 'accentText'])('%s clears 4.5:1 on every surface', (fg) => {
    for (const s of SURFACES) expect(ratio(fg, s)).toBeGreaterThanOrEqual(4.5);
  });

  it('accentText clears 4.5:1 on accentSubtle (badges, selected rows)', () => {
    expect(ratio('accentText', 'accentSubtle')).toBeGreaterThanOrEqual(4.5);
  });

  it('onAccent clears 4.5:1 on the accent (primary buttons)', () => {
    expect(ratio('onAccent', 'accent')).toBeGreaterThanOrEqual(4.5);
  });

  it('onDanger clears 4.5:1 on dangerSolid (destructive buttons)', () => {
    expect(ratio('onDanger', 'dangerSolid')).toBeGreaterThanOrEqual(4.5);
  });

  it('dangerSolid clears 3:1 against every surface (WCAG 1.4.11 non-text)', () => {
    for (const s of SURFACES) expect(ratio('dangerSolid', s)).toBeGreaterThanOrEqual(3);
  });
});

describe.each(['light', 'dark'] as const)('prefers-contrast: more — %s theme', (theme) => {
  const more = (tokens.color as unknown as { contrastMore: Record<string, Record<string, { $value: unknown }>> }).contrastMore[theme];
  const t = themes[theme];

  it.each(['textSecondary', 'textTertiary'])('%s reaches 7:1 (AAA) on every surface', (key) => {
    for (const s of SURFACES) expect(contrastRatio(hex(parse(more[key].$value)), hex(parse(t[s].$value)))).toBeGreaterThanOrEqual(7);
  });

  it('border reaches 3:1 on every surface', () => {
    for (const s of SURFACES) expect(contrastRatio(hex(parse(more.border.$value)), hex(parse(t[s].$value)))).toBeGreaterThanOrEqual(3);
  });

  it('globals.css matches tokens.json', () => {
    const css = readFileSync(resolve(__dirname, '../app/globals.css'), 'utf8');
    const block = css.slice(css.indexOf('@media (prefers-contrast: more)'));
    const part = theme === 'dark' ? block.split('[data-theme="light"]')[0] : block.split('[data-theme="light"]')[1];
    for (const [key, name] of [['textSecondary', 'text-secondary'], ['textTertiary', 'text-tertiary'], ['border', 'border']]) {
      const m = part.match(new RegExp(`--${name}:\\s*(\\d+)\\s+(\\d+)\\s+(\\d+)`));
      expect(m && [Number(m[1]), Number(m[2]), Number(m[3])]).toEqual(parse(more[key].$value));
    }
  });
});

describe('categorical palette', () => {
  const entries = Object.entries(tokens.color.categorical).filter(([k]) => k !== 'comment') as unknown as [string, { $value: unknown }][];

  it('has eight colours', () => {
    expect(entries.map(([k]) => k)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8']);
  });

  it.each(entries)('categorical.%s clears 4.5:1 under white text', (_, { $value }) => {
    expect(contrastRatio(hex(parse($value)), '#ffffff')).toBeGreaterThanOrEqual(4.5);
  });
});

describe('globals.css mirrors tokens.json', () => {
  const css = readFileSync(resolve(__dirname, '../app/globals.css'), 'utf8');
  const [darkBlock, lightBlock] = css.split('\n[data-theme="light"] {');
  const cssVar = (block: string, name: string) => {
    const m = block.match(new RegExp(`--${name}:\\s*(\\d+)\\s+(\\d+)\\s+(\\d+)`));
    return m ? ([Number(m[1]), Number(m[2]), Number(m[3])] as Rgb) : null;
  };

  it.each(Object.entries(tokens.color.categorical).filter(([k]) => k !== 'comment') as unknown as [string, { $value: unknown }][])(
    '--categorical-%s matches',
    (k, { $value }) => {
      expect(cssVar(darkBlock, `categorical-${k}`)).toEqual(parse($value));
    },
  );

  it.each([
    ['on-accent', 'onAccent'],
    ['danger-solid', 'dangerSolid'],
    ['on-danger', 'onDanger'],
  ] as const)('--%s matches in both themes', (css, token) => {
    expect(cssVar(darkBlock, css)).toEqual(parse(themes.dark[token].$value));
    expect(cssVar(lightBlock, css)).toEqual(parse(themes.light[token].$value));
  });

  it.each(STATUSES)('--status-%s-text matches in both themes', (status) => {
    const name = `status-${status.toLowerCase()}-text`;
    expect(cssVar(darkBlock, name)).toEqual(parse(themes.dark[`status${status}Text`].$value));
    expect(cssVar(lightBlock, name)).toEqual(parse(themes.light[`status${status}Text`].$value));
  });
});

describe('OKLCH colour source', () => {
  type ColorToken = { colorSpace: string; components: [number, number, number]; alpha?: number; hex: string };
  const colours: [string, ColorToken][] = [];
  (function walk(node: unknown, path: string, type?: string) {
    if (!node || typeof node !== 'object') return;
    const n = node as Record<string, unknown>;
    const t = (n.$type as string | undefined) ?? type;
    if ('$value' in n) {
      if (t === 'color' && typeof n.$value === 'object') colours.push([path, n.$value as ColorToken]);
      return;
    }
    for (const [k, v] of Object.entries(n)) if (!k.startsWith('$')) walk(v, path ? `${path}.${k}` : k, t);
  })(tokens, '');

  it('stores every literal colour in OKLCH with an sRGB hex fallback', () => {
    expect(colours.length).toBeGreaterThan(100);
    for (const [path, v] of colours) {
      expect(v.colorSpace, path).toBe('oklch');
      expect(v.hex, path).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('OKLCH components convert to exactly the hex fallback (what Swift, Figma and contrast tests use)', () => {
    for (const [path, v] of colours) expect(hex(oklchToSrgb(v.components) as Rgb), path).toBe(v.hex);
  });

  it('tokens.oklch.css defines every theme colour with light-dark() and the computed tints', () => {
    const css = readFileSync(resolve(__dirname, '../app/tokens.oklch.css'), 'utf8');
    for (const key of Object.keys(themes.dark)) {
      const name = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      expect(css, key).toMatch(new RegExp(`--color-${name}: light-dark\\(oklch\\(`));
    }
    for (const s of ['success', 'warning', 'danger', 'caution']) {
      expect(css).toContain(`--status-${s}-tint: color-mix(in oklch, var(--color-status-${s}) 12%, transparent);`);
    }
  });
});
