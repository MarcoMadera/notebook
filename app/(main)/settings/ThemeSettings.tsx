"use client";

import React, { ReactElement, useState } from "react";

import { THEME_OPTIONS } from "./constants";
import { Option } from "./Option";
import styles from "./ThemeSettings.module.css";
import { ThemeSettingsProps } from "./types";

import Button from "@/components/Button";
import { Theme } from "@/constants/theme";
import { useTheme } from "@/hooks";
import { validateTheme } from "@/utils";

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  onThemeChange,
}): ReactElement => {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(theme);

  const handleThemeChange = (theme: string): void => {
    const validatedTheme = validateTheme(theme);
    onThemeChange?.(validatedTheme);
    setSelectedTheme(validatedTheme);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setTheme(selectedTheme);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Color Theme</h2>
        <p className={styles.subtitle} id="theme-description">
          Choose your color theme:
        </p>
      </header>

      <fieldset
        className={styles.optionsContainer}
        aria-describedby="theme-description"
      >
        <legend className={styles["sr-only"]}>Theme Options</legend>
        {THEME_OPTIONS.map((option) => (
          <Option
            key={option.id}
            config={option}
            isSelected={selectedTheme === option.id}
            onSelect={handleThemeChange}
            name="theme-selection"
            Icon={option.Icon}
          />
        ))}
      </fieldset>

      <Button
        type="submit"
        aria-label="Apply theme changes"
        variant="primary"
        fullWidth={false}
      >
        Apply Changes
      </Button>
    </form>
  );
};

export default ThemeSettings;
