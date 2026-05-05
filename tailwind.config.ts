import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        // Sitka design tokens mapped to Tailwind
        sitka: {
          50: "#f8f7ff",
          100: "#f0eeff",
          200: "#e2ddff",
          300: "#c9c0ff",
          400: "#aa98ff",
          500: "#8b6dff",
          600: "#7345ff",
          700: "#6030f0",
          800: "#4f27c8",
          900: "#4223a3",
          950: "#27136e",
          cyan: "#00C0E8",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a7a7ac",
          500: "#747474",
          600: "#525252",
          700: "#404040",
          800: "#282828",
          850: "#1a1a1a",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url('/noise.svg')",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glass": "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        "glass-dark": "0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.4), 0 2px 12px rgba(0,0,0,0.3)",
        "glow": "0 0 0 1px rgba(0,192,232,0.3), 0 0 20px rgba(0,192,232,0.15)",
        "soft": "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-left": "slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
