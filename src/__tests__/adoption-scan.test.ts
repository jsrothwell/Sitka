import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { scan as scanUntyped } from "../../scripts/adoption/scan.mjs";

type Platform = { files: number; tokenRefs: number; rawColors: number; tokenCoverage: number | null };
const scan = scanUntyped as unknown as (root: string) => {
  files: number;
  components: Record<string, number>;
  platforms: Record<string, Platform>;
  tokenCoverage: number | null;
  hotspots: { file: string; rawColors: number }[];
};

describe("adoption scanner", () => {
  it("counts sitka-ui imports, token references and raw colours per platform", () => {
    const dir = mkdtempSync(join(tmpdir(), "sitka-adoption-"));
    writeFileSync(
      join(dir, "Page.tsx"),
      `import { Button, Card as Box } from "sitka-ui";
export const A = () => <div className="text-[rgb(var(--text-primary))] bg-red-500" style={{ color: "#ff0000" }} />;`
    );
    writeFileSync(join(dir, "View.swift"), `Text("x").foregroundStyle(Color.sitka(\\.accent)).background(Color(red: 1, green: 0, blue: 0))`);
    writeFileSync(join(dir, "Screen.kt"), `val c = SitkaTheme.colors.accent; val d = Color(0xFF00C0E8)`);
    mkdirSync(join(dir, "node_modules"));
    writeFileSync(join(dir, "node_modules", "skip.tsx"), `const x = "#123456";`);

    const r = scan(dir);
    expect(r.files).toBe(3);
    expect(r.components).toEqual({ Button: 1, Card: 1 });
    expect(r.platforms.web).toMatchObject({ tokenRefs: 1, rawColors: 2 });
    expect(r.platforms.swift).toMatchObject({ tokenRefs: 1, rawColors: 1 });
    expect(r.platforms.kotlin).toMatchObject({ tokenRefs: 1, rawColors: 1 });
    expect(r.tokenCoverage).toBe(42.9);
    expect(r.hotspots[0]).toEqual({ file: "Page.tsx", rawColors: 2 });
  });
});
