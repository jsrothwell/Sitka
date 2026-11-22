# Deprecation policy

Sitka follows semantic versioning. Apps pin a version, so a breaking change is only safe when they can see it coming and have a release cycle to move.

## What counts as breaking

- Removing or renaming a token, component, prop, variant or Swift API.
- Changing what a token means (for example, `accent` going from a fill to a text colour) even if the name stays.
- Changing a token's value so an approved pairing fails contrast.
- Changing a component's default behaviour, keyboard handling or accessible name.

Value tweaks that keep every contrast test passing, new tokens, new components and new optional props are not breaking.

## How to deprecate

1. **Add the replacement first** in a minor release. Don't deprecate something that has no replacement.
2. **Mark the old thing deprecated** in the same release:
   - Tokens: add `"$deprecated": "Use {color.themes.dark.accentText}. Removed in 2.0."` (DTCG). `npm run generate` turns it into a Swift `@available(*, deprecated)` warning.
   - React: `/** @deprecated Use <NewThing>. Removed in 2.0. */` on the component or prop.
   - Swift: `@available(*, deprecated, renamed: "newName", message: "Removed in 2.0.")`.
   - Docs: a "Deprecated" badge on the page, linking to the replacement.
3. **Write it in `CHANGELOG.md`** under `### Deprecated`, with the replacement and the removal version.
4. **Keep it working** for at least one minor release and at least 90 days, whichever is longer.
5. **Remove it in the next major**, listed under `### Removed` with a migration note.

## Never in place

Don't change a token's meaning and keep its name. Add a new token, deprecate the old one, and migrate. That's what 1.13.0 did with `accent` → `accentText` for text.

## Exceptions

Accessibility and security fixes can ship in a patch even if they change behaviour. Call them out under `### Fixed` with what apps need to check.
