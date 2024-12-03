import { Theme } from "@/constants/theme";

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};
