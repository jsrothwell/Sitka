import { TSESLint } from "@typescript-eslint/utils";

const ruleName = "sitka-token-usage";

interface Options {
  allowFallback?: boolean;
  tokenPath?: string;
}

export const meta = {
  type: "problem",
  docs: {
    description: "Enforce usage of Sitka design tokens instead of hardcoded values",
    category: "Best Practices",
    recommended: true,
    url: "https://github.com/username/Sitka/wiki/token-usage",
  },
  schema: [
    {
      type: "object",
      properties: {
        allowFallback: { type: "boolean", default: false },
        tokenPath: { type: "string", default: "@/tokens/tokens.json" },
      },
      additionalProperties: false,
    },
  ],
  messages: {
    hardcodedColor: "Use Sitka color token '{{token}}' instead of hardcoded hex '{{value}}'",
    hardcodedRadius: "Use Sitka radius token 'radius.{{value}}' instead of hardcoded '{{raw}}'",
    hardcodedSpacing: "Use Sitka spacing token 'space.{{value}}' instead of hardcoded '{{raw}}'",
    hardcodedShadow: "Use Sitka shadow token 'shadow.{{value}}' instead of hardcoded shadow",
    missingToken: "Token '{{token}}' not found in Sitka design system",
  },
};

export function create(context: any, options: Options = {}) {
  const { allowFallback = false, tokenPath = "@/tokens/tokens.json" } = options;

  // Load tokens from tokens.json at build time
  // In a real implementation, you'd read and parse the file
  // For now we'll use a static map of known tokens
  const knownTokens = {
    colors: [
      "brand.cyan",
      "brand.50", "brand.100", "brand.200", "brand.300", "brand.400", "brand.500", "brand.600", "brand.700", "brand.800", "brand.900", "brand.950",
      "neutral.0", "neutral.50", "neutral.100", "neutral.200", "neutral.300", "neutral.400", "neutral.500",
      "neutral.600", "neutral.700", "neutral.800", "neutral.900", "neutral.950", "neutral.1000",
      "semantic.success", "semantic.warning", "semantic.error", "semantic.info",
      "dark.accent", "dark.background", "dark.surface", "dark.surfaceRaised", "dark.surfaceHover",
      "dark.accentSubtle", "dark.accentMuted", "dark.textPrimary", "dark.textSecondary", "dark.textTertiary",
      "dark.border", "dark.borderSubtle", "dark.statusSuccess", "dark.statusWarning", "dark.statusDanger", "dark.statusCaution",
      "light.accent", "light.background", "light.surface", "light.surfaceRaised", "light.surfaceHover",
      "light.accentSubtle", "light.accentMuted", "light.textPrimary", "light.textSecondary", "light.textTertiary",
      "light.border", "light.borderSubtle", "light.statusSuccess", "light.statusWarning", "light.statusDanger", "light.statusCaution",
    ],
    radius: ["sm", "md", "lg", "xl", "2xl", "full"],
    spacing: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20", "24"],
    shadow: ["sm", "md", "lg", "xl", "glass", "glow", "card", "lifted", "sheet", "overlay", "chromium"],
    opacity: ["transparent", "translucent", "frosted", "opaque"],
    blur: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "visionOS"],
  };

  // Check if a hex color matches a Sitka token
  function findColorToken(hex: string): string | null {
    const colorMap: Record<string, string> = {
      "#00C0E8": "brand.cyan",
      "#f0faf4": "brand.50",
      "#dcf5e7": "brand.100",
      "#b9eace": "brand.200",
      "#84d4a8": "brand.300",
      "#4dba82": "brand.400",
      "#34a865": "brand.500",
      "#289452": "brand.600",
      "#1f7341": "brand.700",
      "#165733": "brand.800",
      "#0f3d24": "brand.900",
      "#071f12": "brand.950",
      "#fafafa": "neutral.50",
      "#f5f5f5": "neutral.100",
      "#e5e5e5": "neutral.200",
      "#d4d4d4": "neutral.300",
      "#a7a7ac": "neutral.400",
      "#747474": "neutral.500",
      "#525252": "neutral.600",
      "#404040": "neutral.700",
      "#282828": "neutral.800",
      "#171717": "neutral.900",
      "#0a0a0a": "neutral.950",
      "#000000": "neutral.1000",
      "#ffffff": "neutral.0",
      "#22c55e": "semantic.success",
      "#f59e0b": "semantic.warning",
      "#ef4444": "semantic.error",
      "#3b82f6": "semantic.info",
      "rgb(9, 9, 12)": "dark.background",
      "rgb(13, 13, 17)": "dark.surface",
      "rgb(22, 22, 28)": "dark.surfaceRaised",
      "rgb(32, 32, 40)": "dark.surfaceHover",
      "#00c0e8": "dark.accent",
      "rgb(0, 38, 46)": "dark.accentSubtle",
      "rgb(0, 72, 86)": "dark.accentMuted",
      "rgb(242, 242, 246)": "dark.textPrimary",
      "rgb(170, 170, 185)": "dark.textSecondary",
      "rgb(135, 135, 155)": "dark.textTertiary",
      "rgb(38, 38, 48)": "dark.border",
      "rgb(26, 26, 33)": "dark.borderSubtle",
      "rgb(16, 185, 129)": "dark.statusSuccess",
      "rgb(245, 158, 11)": "dark.statusWarning",
      "rgb(248, 113, 113)": "dark.statusDanger",
      "rgb(249, 115, 22)": "dark.statusCaution",
      "rgb(250, 250, 250)": "light.background",
      "rgb(255, 255, 255)": "light.surface",
       "rgb(246, 246, 248)": "light.surfaceRaised",
       "rgb(224, 247, 252)": "light.accentSubtle",
      "rgb(179, 237, 249)": "light.accentMuted",
      "rgb(30, 30, 30)": "light.textPrimary",
      "rgb(85, 85, 90)": "light.textSecondary",
      "rgb(115, 115, 120)": "light.textTertiary",
      "rgb(224, 224, 231)": "light.border",
      "rgb(240, 240, 244)": "light.borderSubtle",
      "rgba(255, 255, 255, 0.08)": "materials.borderSubtle",
    };

    return colorMap[hex.toLowerCase()] || null;
  }

  // Check if a shadow value matches a known Sitka shadow token
  function matchShadowToken(value: string): string | null {
    if (!value.includes("rgba") && !value.includes("rgb")) {
      const shadowMap: Record<string, string> = {
        "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)": "shadow.sm",
        "0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)": "shadow.md",
        "0 8px 32px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)": "shadow.lg",
        "0 16px 48px rgba(0,0,0,0.14), 0 8px 20px rgba(0,0,0,0.08)": "shadow.xl",
        "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)": "shadow.glass",
        "0 0 0 1px rgba(0,192,232,0.3), 0 0 20px rgba(0,192,232,0.15)": "shadow.glow",
        "0 2px 12px rgba(0,0,0,0.10)": "shadow.card",
        "0 4px 18px rgba(0,0,0,0.14)": "shadow.lifted",
        "0 8px 28px rgba(0,0,0,0.20)": "shadow.sheet",
        "0 16px 48px rgba(0,0,0,0.28), 0 8px 20px rgba(0,0,0,0.12)": "shadow.overlay",
        "0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.4), 0 2px 12px rgba(0,0,0,0.3)": "shadow.glassDark",
        "0 -2px 12px rgba(0,0,0,0.2)": "shadow.chromium",
      };
      return shadowMap[value] || null;
    }
    return null;
  }

  return {
    "style": function (node: any) {
      // Walk style objects looking for hardcoded values
      // This is a simplified implementation — a full version would parse AST deeply

      if (node.type === "Property" && node.key && node.value) {
        const key = node.key.name || node.key.value;

        // Check for hardcoded color values
        if (key === "color" || key === "backgroundColor" || key === "borderColor" || key === "shadowColor") {
          if (node.value.type === "Literal" && typeof node.value.value === "string") {
            const val = node.value.value;
            if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val) || val.startsWith("rgb")) {
              const token = findColorToken(val);
              if (!token && !allowFallback) {
                context.report({
                  node: node.value,
                  messageId: "hardcodedColor",
                  data: { value: val, token: token || "sitka.color.<appropriate>" },
                });
              }
            }
          }
        }

        // Check for hardcoded radius values
        if (key === "borderRadius" || key === "rounded" || key === "radius") {
          if (node.value.type === "Literal" && typeof node.value.value === "string") {
            const val = node.value.value;
            const pxMatch = val.match(/(\d+)px/);
            if (pxMatch) {
              const num = pxMatch[1];
              const radiusToken = ["sm", "md", "lg", "xl", "2xl", "full"].includes(num)
                ? `radius.${num}`
                : null;
              if (!radiusToken) {
                context.report({
                  node: node.value,
                  messageId: "hardcodedRadius",
                  data: { raw: val, value: num },
                });
              }
            }
          }
        }

        // Check for hardcoded spacing values
        if (key === "padding" || key === "margin" || key === "gap" || key === "width" || key === "height") {
          if (node.value.type === "Literal" && typeof node.value.value === "string") {
            const val = node.value.value;
            // Simple px check — full implementation would parse complex CSS values
            const pxMatch = val.match(/(\d+)px/);
            if (pxMatch) {
              const num = pxMatch[1];
              if (!knownTokens.spacing.includes(num)) {
                // Not a Sitka spacing token
                if (!allowFallback) {
                  context.report({
                    node: node.value,
                    messageId: "hardcodedSpacing",
                    data: { raw: val, value: num },
                  });
                }
              }
            }
          }
        }

        // Check for hardcoded shadow strings
        if (key === "boxShadow" || key === "shadow") {
          if (node.value.type === "Literal" && typeof node.value.value === "string") {
            const val = node.value.value;
            const shadowToken = matchShadowToken(val);
            if (!shadowToken && !allowFallback) {
              context.report({
                node: node.value,
                messageId: "hardcodedShadow",
                data: {},
              });
            }
          }
        }
      }
    },
  };
}

// Export for ESLint
export default {
  meta,
  create,
};

export { create as createRule };
