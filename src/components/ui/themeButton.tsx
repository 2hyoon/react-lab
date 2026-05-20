"use client";

import { useTheme } from "@/src/hooks/themeContext";
import { Theme } from "@/src/types/type";
import { Moon, Sun } from "lucide-react";

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="fixed top-2.5 right-4 p-1 rounded-full bg-foreground-light dark:bg-foreground-dark hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer"
    >
      {theme === Theme.LIGHT ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
};

export default ThemeButton;

