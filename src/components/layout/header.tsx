"use client";

import ThemeButton from "@/src/components/ui/themeButton";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  isOpen: boolean;
  onToggleNav: () => void;
}

const Header = ({ isOpen, onToggleNav }: HeaderProps) => {
  return (
    <header className="fixed w-dvw h-12 bg-surface border-b border-b-border z-50">
      <button onClick={onToggleNav} className="relative top-1 left-1 bg-surface w-10 h-10 flex justify-center items-center cursor-pointer">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ThemeButton />
    </header>
  );
};

export default Header;
