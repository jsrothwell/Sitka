import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Parses CHANGELOG.md (Keep a Changelog format) at build time. CHANGELOG.md is the only place
 * release notes are written; the /changelog page renders from it.
 */

export interface ChangelogGroup {
  /** "####" subheading inside a section, or null for items directly under the section. */
  title: string | null;
  items: string[];
}

export interface ChangelogSection {
  /** "###" heading: Added, Changed, Fixed, Removed… */
  label: string;
  groups: ChangelogGroup[];
}

export interface Release {
  version: string;
  date: string | null;
  summary: string;
  sections: ChangelogSection[];
  breaking: boolean;
}

export function parseChangelog(markdown: string): Release[] {
  const releases: Release[] = [];
  let release: Release | null = null;
  let section: ChangelogSection | null = null;
  let group: ChangelogGroup | null = null;
  const summary: string[] = [];

  const flushSummary = () => {
    if (release && summary.length) release.summary = summary.join(" ").trim();
    summary.length = 0;
  };

  for (const raw of markdown.split("\n")) {
    const line = raw.trimEnd();
    const h2 = line.match(/^## \[([^\]]+)\](?:\s+-\s+(\S+))?/);
    if (h2) {
      flushSummary();
      release = { version: h2[1], date: h2[2] ?? null, summary: "", sections: [], breaking: false };
      releases.push(release);
      section = null;
      group = null;
      continue;
    }
    if (!release) continue;
    const h3 = line.match(/^### (.+)/);
    if (h3) {
      flushSummary();
      section = { label: h3[1].trim(), groups: [] };
      release.sections.push(section);
      group = null;
      continue;
    }
    const h4 = line.match(/^#### (.+)/);
    if (h4 && section) {
      group = { title: h4[1].trim(), items: [] };
      section.groups.push(group);
      continue;
    }
    const item = line.match(/^[-*] (.+)/);
    if (item && section) {
      if (!group) {
        group = { title: null, items: [] };
        section.groups.push(group);
      }
      group.items.push(item[1].trim());
      continue;
    }
    // Indented continuation of the previous bullet.
    if (/^\s{2,}\S/.test(line) && group?.items.length) {
      group.items[group.items.length - 1] += " " + line.trim();
      continue;
    }
    if (!section && line.trim() && !line.startsWith("#")) summary.push(line.trim());
  }
  flushSummary();

  for (const r of releases) {
    r.breaking = /breaking/i.test(r.summary) || r.sections.some((s) => /breaking/i.test(s.label));
  }
  // Drop an empty [Unreleased] block.
  return releases.filter((r) => r.version.toLowerCase() !== "unreleased" || r.sections.length > 0 || r.summary);
}

export function loadChangelog(): Release[] {
  return parseChangelog(readFileSync(join(process.cwd(), "CHANGELOG.md"), "utf8"));
}

/** Splits inline markdown (`code`, **bold**, [text](url)) into typed tokens for safe rendering. */
export type InlineToken = { type: "text" | "code" | "bold"; value: string } | { type: "link"; value: string; href: string };

export function tokenizeInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  const re = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index! > last) tokens.push({ type: "text", value: text.slice(last, m.index) });
    if (m[1] !== undefined) tokens.push({ type: "code", value: m[1] });
    else if (m[2] !== undefined) tokens.push({ type: "bold", value: m[2] });
    else tokens.push({ type: "link", value: m[3], href: m[4] });
    last = m.index! + m[0].length;
  }
  if (last < text.length) tokens.push({ type: "text", value: text.slice(last) });
  return tokens;
}
