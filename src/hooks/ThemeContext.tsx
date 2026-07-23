"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Theme } from "@/src/types/type";
import { ThemeContextType } from "@/src/types/interface";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Start LIGHT for a deterministic server render; the pre-hydration script
  // sets the real class on <body>, and the effect below adopts it after mount.
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  // Adopt the theme the pre-hydration script already applied to <body>,
  // so React state matches the DOM instead of re-deciding it.
  useEffect(() => {
    const isDark = document.body.classList.contains("dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(isDark ? Theme.DARK : Theme.LIGHT);
  }, []);

  const isMounted = useRef(false);

  useEffect(() => {
    // Skip the first run: the pre-hydration script already set the DOM class and
    // localStorage. Only react to actual theme changes (toggles) after mount,
    // otherwise this would overwrite the script's result with the initial LIGHT.
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const body = window.document.body;

    if (theme === Theme.DARK) {
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      body.classList.add("light");
      body.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // The functional update reads no outer value, so deps stay empty and the identity is stable.
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    );
  }, []);

  // Memoized so parent re-renders (RootLayout's nav state) don't wake every consumer.
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
