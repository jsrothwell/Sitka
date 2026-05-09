import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Sitka ESLint plugin — try/catch since it's optional during dev
let sitkaPlugin;
try {
  sitkaPlugin = require("./platforms/eslint-plugin-sitka-tokens/lib").default;
} catch {
  // Plugin not built yet — skip
  sitkaPlugin = null;
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...(sitkaPlugin ? [sitkaPlugin] : []),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
