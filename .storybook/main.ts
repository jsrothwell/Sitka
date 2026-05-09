import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import tailwindVite from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  async viteFinal(cfg) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(cfg, {
      plugins: [tailwindVite()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
        },
      },
    });
  },
};

export default config;
