"use client";

import { createContext, useState, useEffect, useContext } from "react";
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
  // Always start with LIGHT so server and client first paint match (avoids hydration error).
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  // After mount, sync theme from localStorage or system preference.
  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    if (storedTheme === Theme.DARK || storedTheme === Theme.LIGHT) {
      // SSR theme sync must run after mount, so setState here is intentional.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(storedTheme);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? Theme.DARK : Theme.LIGHT);
  }, []);

  useEffect(() => {
    const root = window.document.body;

    if (theme === Theme.DARK) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
