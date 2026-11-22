import { describe, it, expect } from 'vitest';
import tokens from '@/tokens/tokens.json';

/**
 * Structural check of tokens.json against the W3C Design Tokens (DTCG) format:
 * only spec types, values shaped as the spec requires, and every {reference} resolvable.
 * Colours and dimensions use the string syntax (hex/rgb, "16px") that DTCG tooling such as
 * Style Dictionary 4 and Figma's variable import read.
 */
type Node = Record<string, unknown>;
const TYPES = new Set(['color', 'dimension', 'fontFamily', 'fontWeight', 'duration', 'cubicBezier', 'number', 'strokeStyle', 'border', 'transition', 'shadow', 'gradient', 'typography']);
const REF = /^\{[^{}]+\}$/;
const isRef = (v: unknown) => typeof v === 'string' && REF.test(v);

const leaves: { path: string; type: string | undefined; value: unknown }[] = [];
function walk(node: Node, path: string[], inherited?: string) {
  const groupType = (node.$type as string | undefined) ?? inherited;
  if ('$value' in node) {
    leaves.push({ path: path.join('.'), type: groupType, value: node.$value });
    return;
  }
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$') || k === 'comment' || typeof v !== 'object' || v === null) continue;
    walk(v as Node, [...path, k], groupType);
  }
}
walk(tokens as unknown as Node, []);

const lookup = (ref: string) => {
  const parts = ref.slice(1, -1).split('.');
  const find = (p: string[]) => p.reduce<unknown>((n, k) => (n as Node | undefined)?.[k], tokens);
  return (find(parts) ?? find(['color', ...parts])) as Node | undefined;
};

const dim = (v: unknown) => isRef(v) || (typeof v === 'string' && /^-?\d+(\.\d+)?(px|rem|em)$/.test(v));
const dur = (v: unknown) => isRef(v) || (typeof v === 'string' && /^\d+(\.\d+)?m?s$/.test(v));
// DTCG 2025.10 colour: an object with a colour space, components and optional alpha/hex. Sitka stores OKLCH.
const col = (v: unknown) => {
  if (isRef(v)) return true;
  if (!v || typeof v !== 'object') return false;
  const c = v as { colorSpace?: unknown; components?: unknown; alpha?: unknown; hex?: unknown };
  return (
    c.colorSpace === 'oklch' &&
    Array.isArray(c.components) &&
    c.components.length === 3 &&
    c.components.every((x) => typeof x === 'number') &&
    (c.alpha === undefined || (typeof c.alpha === 'number' && c.alpha >= 0 && c.alpha <= 1)) &&
    (c.hex === undefined || (typeof c.hex === 'string' && /^#[0-9a-f]{6}$/.test(c.hex)))
  );
};
const shadowLayer = (s: Node) => col(s.color) && ['offsetX', 'offsetY', 'blur', 'spread'].every((k) => dim(s[k]));

const CHECK: Record<string, (v: unknown) => boolean> = {
  color: col,
  dimension: dim,
  duration: dur,
  number: (v) => isRef(v) || typeof v === 'number',
  fontWeight: (v) => isRef(v) || (typeof v === 'number' && v >= 1 && v <= 1000),
  fontFamily: (v) => typeof v === 'string' || (Array.isArray(v) && v.every((x) => typeof x === 'string')),
  cubicBezier: (v) => isRef(v) || (Array.isArray(v) && v.length === 4 && v.every((x) => typeof x === 'number')),
  shadow: (v) => isRef(v) || (Array.isArray(v) ? v.every((x) => shadowLayer(x as Node)) : shadowLayer(v as Node)),
  transition: (v) => isRef(v) || (dur((v as Node).duration) && dur((v as Node).delay) && CHECK.cubicBezier((v as Node).timingFunction)),
};

describe('tokens.json follows the DTCG format', () => {
  it('has tokens', () => expect(leaves.length).toBeGreaterThan(200));

  it('uses only DTCG types', () => {
    expect(leaves.filter((l) => !l.type || !TYPES.has(l.type)).map((l) => `${l.path}: ${l.type}`)).toEqual([]);
  });

  it('shapes every value as its type requires', () => {
    expect(leaves.filter((l) => CHECK[l.type!] && !CHECK[l.type!](l.value)).map((l) => `${l.path} (${l.type}): ${JSON.stringify(l.value)}`)).toEqual([]);
  });

  it('resolves every reference to a token of a compatible type', () => {
    const refs: { from: string; ref: string }[] = [];
    const collect = (from: string, v: unknown) => {
      if (isRef(v)) refs.push({ from, ref: v as string });
      else if (v && typeof v === 'object') Object.values(v).forEach((x) => collect(from, x));
    };
    leaves.forEach((l) => collect(l.path, l.value));
    expect(refs.filter(({ ref }) => !lookup(ref) || !('$value' in lookup(ref)!)).map((r) => `${r.from} → ${r.ref}`)).toEqual([]);
  });
});
