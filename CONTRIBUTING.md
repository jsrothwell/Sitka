# Contributing to Sitka

Sitka is the shared design system for the app portfolio: tokens, React components, a SwiftUI token package, Figma library and docs. A change here reaches every app, so changes go through a pull request with CI green.

## Setup

```sh
npm ci
npm run dev        # docs site at http://localhost:3000
npm run storybook  # components in isolation
```

Node 26, Swift 6 (for `swift test`), Docker (only to update visual baselines).

## Where things live

| Change | Edit | Then |
|---|---|---|
| A token value or new token | `src/tokens/tokens.json` (W3C DTCG) | `npm run generate`, commit the generated files |
| Which token a component part uses | `src/tokens/components.json` | `npm run generate` |
| A React component | `src/components/ui/` | Add or update its story and docs page |
| A docs page | `src/app/**/page.tsx` | |
| Figma ↔ code mapping | `.figma/react/`, `.figma/swiftui/` | `npm run figma:parse` |
| Release notes | `CHANGELOG.md`, under `[Unreleased]` | |

Never edit generated files by hand: `platforms/swift/Sources/SitkaTokens/SitkaTokens.swift`, `platforms/figma/variables.json`, `public/downloads/*`, `public/llms.txt`, `public/components.json`, `src/app/tokens.components.css`. CI fails if they're out of date.

## Rules CI enforces

- **Colour decisions** (`src/__tests__/color-decisions.test.ts`): every text token clears 4.5:1 on every surface; status colours as text use `--status-*-text`; text on the accent uses `--on-accent`; destructive fills use `--danger-solid`; `prefers-contrast: more` values clear 7:1.
- **DTCG validity** (`src/__tests__/tokens-dtcg.test.ts`).
- **No raw colours** in components: ESLint token plugin (web), SwiftLint and detekt rules in `platforms/*/lint/` (native apps).
- **Accessibility**: axe on every page in light and dark, ratcheted against `e2e/a11y-baseline.json`. New violations fail. When you fix one, remove it from the baseline.
- **Visual regression** on every component page. If a change is intended, regenerate baselines in Docker (see `e2e/README.md`) and commit them.
- **One version**: `npm version` keeps every package and the Swift tokens in step. Don't bump versions by hand.

Run the same checks locally:

```sh
npm run typecheck && npm run lint && npm test && npm run build
npm run test:e2e   # needs a build; see e2e/README.md
swift test
```

## Proposing a new component or pattern

1. Check it isn't covered by an existing component or a variant of one.
2. Show it's needed in at least two apps. One-app components stay in that app.
3. Open an issue with the use cases, the states it needs and accessibility notes.
4. Build it with tokens only, add a story, a docs page with an accessibility section, and Code Connect mappings if it has a Figma component.

## Changing or removing things

Follow [`docs/DEPRECATION.md`](docs/DEPRECATION.md). In short: deprecate in a minor release, remove in the next major, and never change a token's meaning in place.

## Releases

Maintainers run `npm version <patch|minor|major>`, move `[Unreleased]` notes under the new version in `CHANGELOG.md`, and merge to `main`. The release workflow tags `v<version>` and publishes the GitHub release, which Swift Package Manager resolves.

## Measuring adoption

`npm run adoption -- ../YourApp` reports token coverage, raw colour hotspots and which `sitka-ui` components an app imports. Add `--min 80` to fail CI below a threshold.
