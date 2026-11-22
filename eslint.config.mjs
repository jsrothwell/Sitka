import { createRequire } from "node:module";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Sitka ESLint plugin — optional until it's built (platforms/eslint-plugin-sitka-tokens/lib).
// `require` isn't defined in an ES module, so the previous bare require() always threw
// and the plugin silently never loaded.
const require = createRequire(import.meta.url);
let sitkaPlugin;
try {
  sitkaPlugin = require("./platforms/eslint-plugin-sitka-tokens/lib").default;
} catch {
  sitkaPlugin = null;
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...(sitkaPlugin ? [sitkaPlugin] : []),
  {
    rules: {
      // Apostrophes and quotes in JSX text render correctly; the docs are prose-heavy.
      "react/no-unescaped-entities": "off",
      // Debt to burn down, tracked rather than blocking CI. Promote to "error" once at zero.
      "react-hooks/set-state-in-effect": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    // Storybook `render: () => { useState(…) }` is a supported pattern the hooks rule can't see.
    files: ["src/stories/**"],
    rules: { "react-hooks/rules-of-hooks": "off" },
  },
  {
    files: ["next.config.ts"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated output and one-off Figma scripts at the repo root
    "storybook-static/**",
    "packages/*/dist/**",
    "platforms/*/lib/**",
    "*.js",
  ]),
]);

export default eslintConfig;
