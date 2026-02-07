import { useEffect, useState } from "react";

const STORAGE_KEY = "abacus.theme.v1";
export const themeOptions = ["neutral", "bright-a", "bright-b"];

const sanitizeTheme = (value) => (themeOptions.includes(value) ? value : "neutral");

const readStoredTheme = () => {
  if (typeof window === "undefined") {
    return "neutral";
  }

  return sanitizeTheme(window.localStorage.getItem(STORAGE_KEY));
};

export const useThemePreference = () => {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const updateTheme = (event) => {
    setTheme(sanitizeTheme(event.target.value));
  };

  return {
    theme,
    updateTheme
  };
};
