import { Theme } from "./type";

export interface AccordionItemData {
  id: string;
  title: string;
  content: string;
}

export interface GitHubUser {
  id: number;
  login: string;
  bio: string | null;
  avatar_url: string;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
