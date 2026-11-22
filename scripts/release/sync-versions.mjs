#!/usr/bin/env node
// Copies the root package.json version to every artifact that ships with the design system,
// so one bump (`npm version minor`) versions them all. Runs automatically from the npm
// "version" lifecycle; tests fail if anything is out of step.
//
// Independently versioned tools (packages/cli, the ESLint plugin) are deliberately not synced.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT, VERSION } from "../tokens/lib.mjs";

const today = new Date().toISOString().slice(0, 10);

function setJsonVersion(rel) {
  const path = resolve(ROOT, rel);
  const pkg = JSON.parse(readFileSync(path, "utf8"));
  if (pkg.version === VERSION) return console.log(`unchanged ${rel}`);
  // Keep key order: insert "version" after "name" when missing.
  const out = {};
  for (const [k, v] of Object.entries(pkg)) {
    if (k === "version") continue;
    out[k] = v;
    if (k === "name") out.version = VERSION;
  }
  writeFileSync(path, JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote     ${rel} → ${VERSION}`);
}

setJsonVersion("packages/sitka-ui/package.json");
setJsonVersion("platforms/react-native/package.json");

// tokens.json is hand-aligned, so edit the two meta fields textually instead of re-serialising.
const tokensPath = resolve(ROOT, "src/tokens/tokens.json");
const tokens = readFileSync(tokensPath, "utf8");
const next = tokens
  .replace(/("version":\s*")[^"]+(")/, `$1${VERSION}$2`)
  .replace(/("generatedAt":\s*")[^"]+(")/, (m, a, b) => (tokens.match(/"version":\s*"([^"]+)"/)?.[1] === VERSION ? m : `${a}${today}${b}`));
if (next !== tokens) {
  writeFileSync(tokensPath, next);
  console.log(`wrote     src/tokens/tokens.json meta → ${VERSION}`);
} else console.log("unchanged src/tokens/tokens.json");
