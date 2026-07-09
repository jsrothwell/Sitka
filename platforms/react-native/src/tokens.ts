import { StyleSheet, Dimensions, Platform } from "react-native";

// Sitka Design Tokens — React Native Bridge
// Derived from src/tokens/tokens.json
// This file provides type-safe token access for React Native components.

export type SitkaColor = string;
export type SitkaRadius = number;
export type SitkaSpacing = number;
export type SitkaFontSize = number;
export type SitkaFontWeight = "regular" | "medium" | "semibold" | "bold";
export type SitkaShadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation?: number;
};

// Color palette — Dark theme defaults, mapped from tokens
export const Colors = {
  // Brand
  brandCyan: "#00C0E8" as SitkaColor,
  brand50: "#f0faf4",
  brand100: "#dcf5e7",
  brand200: "#b9eace",
  brand300: "#84d4a8",
  brand400: "#4dba82",
  brand500: "#34a865",
  brand600: "#289452",
  brand700: "#1f7341",
  brand800: "#165733",
  brand900: "#0f3d24",
  brand950: "#071f12",

  // Neutral scale
  neutral0: "#ffffff",
  neutral50: "#fafafa",
  neutral100: "#f5f5f5",
  neutral200: "#e5e5e5",
  neutral300: "#d4d4d4",
  neutral400: "#a7a7ac",
  neutral500: "#747474",
  neutral600: "#525252",
  neutral700: "#404040",
  neutral800: "#282828",
  neutral900: "#171717",
  neutral950: "#0a0a0a",
  neutral1000: "#000000",

  // Semantic
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",

  // Dark theme
  dark: {
    background: "rgb(9, 9, 12)" as SitkaColor,
    surface: "rgb(13, 13, 17)" as SitkaColor,
    surfaceRaised: "rgb(22, 22, 28)" as SitkaColor,
    surfaceHover: "rgb(32, 32, 40)" as SitkaColor,
    accent: "#00c0e8" as SitkaColor,
    accentSubtle: "rgb(0, 38, 46)" as SitkaColor,
    accentMuted: "rgb(0, 72, 86)" as SitkaColor,
    textPrimary: "rgb(242, 242, 246)" as SitkaColor,
    textSecondary: "rgb(170, 170, 185)" as SitkaColor,
    textTertiary: "rgb(135, 135, 155)" as SitkaColor,
    border: "rgb(38, 38, 48)" as SitkaColor,
    borderSubtle: "rgb(26, 26, 33)" as SitkaColor,
    progressTrack: "rgb(40, 42, 48)" as SitkaColor,
    progressSuccess: "#22c55e" as SitkaColor,
    progressWarning: "#f59e0b" as SitkaColor,
    progressDanger: "#ef4444" as SitkaColor,
    statusSuccess: "rgb(16, 185, 129)" as SitkaColor,
    statusWarning: "rgb(245, 158, 11)" as SitkaColor,
    statusDanger: "rgb(248, 113, 113)" as SitkaColor,
    statusCaution: "rgb(249, 115, 22)" as SitkaColor,
    brandUser: "#00C0E8" as SitkaColor,
  },

  // Light theme
  light: {
    background: "rgb(250, 250, 250)" as SitkaColor,
    surface: "rgb(255, 255, 255)" as SitkaColor,
    surfaceRaised: "rgb(246, 246, 248)" as SitkaColor,
    surfaceHover: "rgb(240, 240, 244)" as SitkaColor,
    accent: "#00c0e8" as SitkaColor,
    accentSubtle: "rgb(224, 247, 252)" as SitkaColor,
    accentMuted: "rgb(179, 237, 249)" as SitkaColor,
    textPrimary: "rgb(30, 30, 30)" as SitkaColor,
    textSecondary: "rgb(85, 85, 90)" as SitkaColor,
    textTertiary: "rgb(115, 115, 120)" as SitkaColor,
    border: "rgb(224, 224, 231)" as SitkaColor,
    borderSubtle: "rgb(240, 240, 244)" as SitkaColor,
    statusSuccess: "rgb(16, 185, 129)" as SitkaColor,
    statusWarning: "rgb(245, 158, 11)" as SitkaColor,
    statusDanger: "rgb(239, 68, 68)" as SitkaColor,
    statusCaution: "rgb(234, 88, 12)" as SitkaColor,
    progressTrack: "rgb(209, 213, 219)" as SitkaColor,
    progressSuccess: "#22c55e" as SitkaColor,
    progressWarning: "#f59e0b" as SitkaColor,
    progressDanger: "#ef4444" as SitkaColor,
    brandUser: "#00C0E8" as SitkaColor,
  },
} as const;

// Border radii mapping
export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  "2xl": 28,
  full: 9999,
} as const;

// Spacing scale mapped to dp points
export const Space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

// Typography scale
export const Typography = {
  fontFamily: {
    sans: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }) as string,
    mono: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }) as string,
  },
  fontSize: {
    micro: 10,
    nano: 9,
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 34,
    display: 48,
  } as const,
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  } as const,
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
  } as const,
};

// Glass/materials tokens for React Native
export const Materials = {
  blur: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    "2xl": 32,
    "3xl": 40,
    visionOS: 64,
  },
  opacity: {
    transparent: 0,
    translucent: 0.3,
    frosted: 0.5,
    opaque: 0.8,
  },
} as const;

// Shadows — mapped from web tokens to RN style
export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  glass: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: "#00C0E8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 0,
  },
} as const;

// Helper: create style from tokens
export function createStyle(overrides?: Partial<Record<string, any>>): any {
  return StyleSheet.create({
    ...overrides,
  });
}

// Theme object
export const Theme = {
  colors: Colors,
  radius: Radius,
  space: Space,
  typography: Typography,
  materials: Materials,
  shadows: Shadows,
} as const;

export type SitkaTheme = typeof Theme;
