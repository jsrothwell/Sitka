# Legacy Figma scripts

One-off scripts and `use_figma` payloads from the 2026 Figma token comparisons. They're kept for reference; their reports are in `docs/audits/`.

For current work use:
- `npm run figma:drift` (`scripts/figma/drift.mjs`): compares the downloadable `.figcraft` with the variables generated from `tokens.json`.
- `npm run tokens:build`: regenerates `platforms/figma/variables.json`.
