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

/** Variables older versions wrote inline; cleared so globals.css (tokens.json) is the only source. */
const LEGACY_INLINE = [
  "--background", "--surface", "--surface-raised", "--surface-hover", "--accent", "--accent-hover",
  "--accent-subtle", "--accent-muted", "--text-primary", "--text-secondary", "--text-tertiary",
  "--border", "--border-subtle", "--nav-active-color", "--card-tint-bg",
];

function applyTheme(root: HTMLElement, resolved: "light" | "dark") {
  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
  root.classList.toggle("dark", resolved === "dark");
  for (const prop of LEGACY_INLINE) root.style.removeProperty(prop);
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
      applyTheme(document.documentElement, resolved);
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
