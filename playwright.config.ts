import { defineConfig, devices } from "@playwright/test";

/**
 * Runs against the static export in ./out, so `npm run build` first.
 * Visual baselines are rendered on Linux (CI, or the Playwright Docker image) because font
 * rendering differs by OS; see e2e/README.md for updating them.
 */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:4173",
    ...devices["Desktop Chrome"],
    // Locally, reuse the installed Google Chrome; CI and Docker use Playwright's bundled Chromium.
    channel: process.env.CI || process.env.PW_BUNDLED ? undefined : "chrome",
  },
  snapshotPathTemplate: "e2e/__screenshots__/{testFilePath}/{arg}{ext}",
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled" } },
  webServer: { command: "node scripts/serve-out.mjs", url: "http://localhost:4173", reuseExistingServer: !process.env.CI },
});
