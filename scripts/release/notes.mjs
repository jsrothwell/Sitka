#!/usr/bin/env node
// Prints the CHANGELOG.md section for a version (default: package.json), for GitHub release notes.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT, VERSION } from "../tokens/lib.mjs";

const version = process.argv[2] ?? VERSION;
const md = readFileSync(resolve(ROOT, "CHANGELOG.md"), "utf8");
const start = md.search(new RegExp(`^## \\[${version.replace(/\./g, "\\.")}\\]`, "m"));
if (start < 0) {
  console.error(`CHANGELOG.md has no entry for ${version}`);
  process.exit(1);
}
const rest = md.slice(start).split("\n").slice(1);
const end = rest.findIndex((l) => /^## \[/.test(l));
process.stdout.write(rest.slice(0, end < 0 ? undefined : end).join("\n").trim() + "\n");
