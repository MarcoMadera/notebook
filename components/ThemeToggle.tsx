"use client";

import type { ReactElement } from "react";

import { useTheme } from "@/hooks";

export function ThemeToggle(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:opacity-80"
      style={{
        backgroundColor: "var(--secondary)",
        color: "var(--secondary-foreground)",
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
