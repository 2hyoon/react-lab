"use client";

import { useTheme } from "@/src/hooks/ThemeContext";
import { Theme } from "@/src/types/type";
import { Moon, Sun } from "lucide-react";

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="fixed top-2.5 right-4 p-1 rounded-full bg-surface hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 cursor-pointer"
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

