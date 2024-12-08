"use client";

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Theme } from "@/constants/theme";
import { ThemeContextType } from "@/types/theme";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  initialTheme,
}: Readonly<PropsWithChildren<{ initialTheme: Theme }>>): ReactElement {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? Theme.DARK : Theme.LIGHT;
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      document.cookie = `notes-theme=${newTheme};path=/`;
    };
    document.cookie = `notes-theme=${mediaQuery.matches ? Theme.DARK : Theme.LIGHT};path=/`;

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.cookie = `notes-theme=${newTheme};path=/`;
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
