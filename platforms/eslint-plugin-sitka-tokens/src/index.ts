import { createRule } from "./rules/token-usage";

const plugin = {
  rules: {
    "sitka-token-usage": createRule,
  },
  configs: {
    recommended: {
      extends: ["plugin:sitka-tokens/recommended"],
      rules: {
        "sitka-tokens/token-usage": "error",
      },
    },
  },
};

export default plugin;
export { createRule } from "./rules/token-usage";
