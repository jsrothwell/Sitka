# End-to-end checks

Both run against the static export, so build first: `npm run build`.

| Spec | What it checks | Fails when |
|---|---|---|
| `a11y.spec.ts` | axe (WCAG 2.0–2.2 A/AA) on every page, light and dark | A page has a serious or critical violation that isn't in `a11y-baseline.json` |
| `visual.spec.ts` | Top of every component page, light and dark | More than 1% of pixels differ from `__screenshots__/` |

## Accessibility baseline (ratchet)

`a11y-baseline.json` lists the rules each page fails today. New violations fail CI; existing ones
are tracked debt. After fixing something, shrink the baseline:

```bash
UPDATE_A11Y_BASELINE=1 npx playwright test e2e/a11y.spec.ts --workers=1
```

## Visual baselines

Screenshots differ between macOS and Linux, so baselines are rendered in the same Docker image CI uses:

```bash
docker run --rm --ipc=host -e CI=1 -e PW_BUNDLED=1 -v "$PWD":/work -w /work \
  mcr.microsoft.com/playwright:v1.65.1-noble npx playwright test e2e/visual.spec.ts --update-snapshots
```

Locally (outside Docker) the tests use your installed Google Chrome, so expect visual diffs there;
use the Docker command to check visuals.
