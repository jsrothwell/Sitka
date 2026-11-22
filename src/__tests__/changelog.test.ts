import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseChangelog, tokenizeInline } from '@/site/changelog';

const root = resolve(__dirname, '../..');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const releases = parseChangelog(readFileSync(resolve(root, 'CHANGELOG.md'), 'utf8'));
const released = releases.filter((r) => r.version !== 'Unreleased');

describe('CHANGELOG.md', () => {
  it('has an entry for the current package version, and it is the newest', () => {
    expect(released[0].version).toBe(pkg.version);
  });

  it('lists versions newest first with no duplicates', () => {
    const versions = released.map((r) => r.version);
    expect(new Set(versions).size).toBe(versions.length);
    const sorted = [...versions].sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
    expect(versions).toEqual(sorted);
  });

  it('gives every release a date, a summary and at least one section', () => {
    for (const r of released) {
      expect(r.date, r.version).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(r.summary, r.version).not.toBe('');
      expect(r.sections.length, r.version).toBeGreaterThan(0);
    }
  });
});

describe('parseChangelog', () => {
  it('groups #### subheadings and joins continuation lines', () => {
    const [r] = parseChangelog('## [2.0.0] - 2027-01-01\n\nSummary text.\n\n### Added\n\n#### Tokens\n- one\n  continued\n- two\n');
    expect(r.summary).toBe('Summary text.');
    expect(r.sections[0].groups[0]).toEqual({ title: 'Tokens', items: ['one continued', 'two'] });
  });

  it('tokenizes inline code, bold and links', () => {
    expect(tokenizeInline('Use `--x` and **bold** [docs](https://a.b)')).toEqual([
      { type: 'text', value: 'Use ' },
      { type: 'code', value: '--x' },
      { type: 'text', value: ' and ' },
      { type: 'bold', value: 'bold' },
      { type: 'text', value: ' ' },
      { type: 'link', value: 'docs', href: 'https://a.b' },
    ]);
  });
});
