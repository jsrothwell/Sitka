import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/** Checks the SwiftLint raw-colour rules match what they should and nothing else. */
const yml = readFileSync(resolve(__dirname, "../../platforms/swift/lint/sitka.swiftlint.yml"), "utf8");
// The file is flat enough to read without a YAML parser: "  rule_name:" then "    regex: '…'".
const rules: Record<string, RegExp> = {};
let excluded = "";
let current = "";
for (const line of yml.split("\n")) {
  const name = line.match(/^  (\w+):\s*$/);
  if (name) current = name[1];
  const regex = line.match(/^    regex: '(.+)'$/);
  if (regex) rules[current] = new RegExp(regex[1].replace(/''/g, "'"));
  const ex = line.match(/^    excluded: "(.+)"$/);
  if (ex && current === "sitka_raw_color") excluded = ex[1].replace(/\\\\/g, "\\");
}
const flagged = (line: string) => Object.keys(rules).filter((k) => rules[k].test(line));

describe("SwiftLint raw-colour rules", () => {
  it.each([
    ["Color(red: 0.2, green: 0.4, blue: 0.6)", "sitka_raw_color"],
    ["Color(.sRGB, red: 1, green: 1, blue: 1, opacity: 1)", "sitka_raw_color"],
    ["Color(white: 0.9)", "sitka_raw_color"],
    ["UIColor(red: 1, green: 0, blue: 0, alpha: 1)", "sitka_raw_color"],
    ["NSColor(calibratedRed: 1, green: 0, blue: 0, alpha: 1)", "sitka_raw_color"],
    ['Color(hex: "#00C0E8")', "sitka_hex_color"],
    ["let c = #colorLiteral(red: 1, green: 0, blue: 0, alpha: 1)", "sitka_color_literal"],
    [".foregroundStyle(Color.red)", "sitka_system_color"],
  ])("flags %s", (line, rule) => {
    expect(flagged(line)).toContain(rule);
  });

  it.each([
    "Color.sitka(\\.accent)",
    ".foregroundStyle(Color.sitka(\\.statusDangerText))",
    "Color.primary",
    "Color.clear",
    "let redCount = 3",
    "Color.redesignedHeader",
  ])("allows %s", (line) => {
    expect(flagged(line)).toEqual([]);
  });

  it("checks the generated Swift tokens are excluded and the Code Connect templates are clean", () => {
    expect(Object.keys(rules)).toHaveLength(4);
    expect(new RegExp(excluded).test("Sources/SitkaTokens/SitkaTokens.swift")).toBe(true);
    const dir = resolve(__dirname, "../../.figma/swiftui");
    const templates = readdirSync(dir)
      .filter((f) => f.endsWith(".template.ts"))
      .map((f) => readFileSync(resolve(dir, f), "utf8"));
    for (const t of templates) for (const line of t.split("\n")) expect(flagged(line)).toEqual([]);
  });
});
