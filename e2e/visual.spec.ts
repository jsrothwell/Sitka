import { test, expect } from "@playwright/test";
import { exportedPages } from "./pages";

/**
 * Screenshot of the top of every component page (where the live preview sits), light and dark.
 * Baselines live in e2e/__screenshots__ and must be rendered on Linux; see e2e/README.md.
 */
const componentPages = exportedPages().filter((p) => p.startsWith("/components/") && p !== "/components/");

for (const scheme of ["light", "dark"] as const) {
  test.describe(`visual (${scheme})`, () => {
    for (const path of componentPages) {
      test(path, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        await page.evaluate(() => document.fonts.ready);
        const name = `${scheme}${path.replace(/\/$/, "").replace(/\//g, "-")}.png`;
        await expect(page).toHaveScreenshot(name, { fullPage: false });
      });
    }
  });
}
