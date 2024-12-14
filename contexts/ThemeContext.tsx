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
  const [systemTheme, setSystemTheme] = useState<Theme.LIGHT | Theme.DARK>(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? Theme.DARK
      : Theme.LIGHT
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? Theme.DARK : Theme.LIGHT;
      setSystemTheme(newSystemTheme);

      if (theme === Theme.SYSTEM) {
        document.documentElement.setAttribute("data-theme", newSystemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    const effectiveTheme = theme === Theme.SYSTEM ? systemTheme : theme;
    document.documentElement.setAttribute("data-theme", effectiveTheme);
    document.cookie = `notes-theme=${theme};path=/`;
  }, [theme, systemTheme]);

  const toggleTheme = useCallback(() => {
    if (theme === Theme.SYSTEM) {
      const newTheme = systemTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      setTheme(newTheme);
    } else {
      const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      setTheme(newTheme);
    }
  }, [theme, systemTheme]);

  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme: changeTheme }),
    [theme, toggleTheme, changeTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
