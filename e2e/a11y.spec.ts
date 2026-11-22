import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { exportedPages } from "./pages";

/**
 * Runs axe (WCAG 2.0–2.2 A/AA rules) on every exported page in light and dark mode.
 *
 * Ratchet: e2e/a11y-baseline.json records the serious/critical rules each page fails today.
 * A page failing a rule that isn't in its baseline fails the test, so nothing gets worse;
 * fix a violation, then shrink the baseline with UPDATE_A11Y_BASELINE=1 npx playwright test a11y.
 */
const BASELINE_FILE = "e2e/a11y-baseline.json";
const baseline: Record<string, string[]> = existsSync(BASELINE_FILE) ? JSON.parse(readFileSync(BASELINE_FILE, "utf8")) : {};
const UPDATE = process.env.UPDATE_A11Y_BASELINE === "1";
const found: Record<string, string[]> = {};

for (const scheme of ["light", "dark"] as const) {
  test.describe(`a11y (${scheme})`, () => {
    for (const path of exportedPages()) {
      test(path, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        const rules = results.violations
          .filter((v) => v.impact === "serious" || v.impact === "critical")
          .map((v) => v.id)
          .sort();
        const key = `${scheme} ${path}`;
        found[key] = rules;
        if (UPDATE) return;
        const allowed = new Set(baseline[key] ?? []);
        const fresh = results.violations.filter((v) => rules.includes(v.id) && !allowed.has(v.id));
        expect(
          fresh.map((v) => `${v.id}: ${v.help} (${v.nodes.length}× e.g. ${v.nodes[0]?.target.join(" ")})`),
          `New accessibility violations on ${key}`,
        ).toEqual([]);
      });
    }
  });
}

test.afterAll(() => {
  if (!UPDATE) return;
  // Each worker writes the pages it saw; merge with what's on disk.
  const current = existsSync(BASELINE_FILE) ? JSON.parse(readFileSync(BASELINE_FILE, "utf8")) : {};
  for (const [k, v] of Object.entries(found)) {
    if (v.length) current[k] = v;
    else delete current[k];
  }
  const sorted = Object.fromEntries(Object.entries(current).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(BASELINE_FILE, JSON.stringify(sorted, null, 2) + "\n");
});
