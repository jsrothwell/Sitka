"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
});

const lightTokens: Record<string, string> = {
  "--background":      "252 252 253",
  "--surface":         "255 255 255",
  "--surface-raised":  "246 246 248",
  "--surface-hover":   "240 240 244",
  "--accent":          "52 168 101",
  "--accent-hover":    "40 148  84",
  "--accent-subtle":   "232 248 239",
  "--accent-muted":    "166 220 190",
  "--text-primary":    "15 15 18",
  "--text-secondary":  "85 85 99",
  "--text-tertiary":   "130 130 147",
  "--border":          "224 224 231",
  "--border-subtle":   "240 240 244",
  "--nav-active-color": "rgb(33, 150, 83)",
  "--card-tint-bg":    "rgba(11, 55, 30, 0.06)",
};

const darkOverrides: Record<string, string> = {
  "--background":      "9 9 12",
  "--surface":         "13 13 17",
  "--surface-raised":  "22 22 28",
  "--surface-hover":   "32 32 40",
  "--border":          "38 38 48",
  "--border-subtle":   "26 26 33",
  "--text-primary":    "242 242 246",
  "--text-secondary":  "155 155 170",
  "--text-tertiary":   "100 100 115",
  "--accent-subtle":   "10 38 21",
  "--accent-muted":    "20 72 39",
  "--nav-active-color": "rgb(52, 168, 101)",
  "--card-tint-bg":    "rgb(12, 28, 18)",
};

function applyTokens(root: HTMLElement, resolved: "light" | "dark") {
  const tokens = resolved === "dark"
    ? { ...lightTokens, ...darkOverrides }
    : lightTokens;

  Object.entries(tokens).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });

  root.style.colorScheme = resolved;
  root.classList.toggle("dark", resolved === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("sitka-theme") as Theme | null;
    if (stored) setThemeState(stored);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const resolved =
        theme === "system" ? (mq.matches ? "dark" : "light") : theme;
      setResolvedTheme(resolved);
      applyTokens(document.documentElement, resolved);
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem("sitka-theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
