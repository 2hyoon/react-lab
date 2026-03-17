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
      className="fixed top-2.5 right-4 p-1 rounded-full bg-foreground-light dark:bg-foreground-dark hover:bg-gray-500 focus:outline-none transition-all duration-300 cursor-pointer"
    >
      {theme === Theme.LIGHT ? (
        <Sun width={20} height={20}/>
      ) : (
        <Moon width={20} height={20}/>
      )}
    </button>
  );
};

export default ThemeButton;

