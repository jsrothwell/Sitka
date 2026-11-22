import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** One version for everything that ships with the design system. Fix with `npm run version:sync`. */
const root = resolve(__dirname, '../..');
const json = (p: string) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));
const version = json('package.json').version;

describe('versions', () => {
  it.each(['packages/sitka-ui/package.json', 'platforms/react-native/package.json'])('%s matches package.json', (p) => {
    expect(json(p).version).toBe(version);
  });

  it('tokens.json meta.version matches', () => {
    expect(json('src/tokens/tokens.json').meta.version).toBe(version);
  });

  it('package-lock.json root matches', () => {
    expect(json('package-lock.json').version).toBe(version);
  });

  it('generated Swift tokens carry the version', () => {
    expect(readFileSync(resolve(root, 'platforms/swift/Sources/SitkaTokens/SitkaTokens.swift'), 'utf8')).toContain(`version = "${version}"`);
  });
});
