import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: { index: "src/index.ts" },
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    external: ["react", "react-dom", "framer-motion", "lucide-react"],
    treeshake: true,
    sourcemap: true,
  },
  {
    entry: { tokens: "src/tokens.ts" },
    format: ["esm", "cjs"],
    dts: true,
    external: [],
    treeshake: true,
  },
]);
