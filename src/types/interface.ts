import { Theme } from "./type";

export interface AccordionItemData {
  id: string;
  title: string;
  content: string;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}