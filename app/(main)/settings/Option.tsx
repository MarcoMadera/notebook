"use client";

import React, { ReactElement } from "react";

import styles from "./ThemeSettings.module.css";
import { ThemeOptionProps } from "./types";

export const Option: React.FC<ThemeOptionProps> = ({
  config,
  isSelected,
  onSelect,
  name,
  Icon,
}): ReactElement => {
  return (
    <div className={`${styles.option} ${isSelected ? styles.selected : ""}`}>
      <label className={styles.optionLabel} htmlFor={`theme-${config.id}`}>
        <div className={styles.iconWrapper}>
          <Icon className={styles.icon} aria-hidden="true" />
        </div>

        <div className={styles.textContent}>
          <h3 className={styles.optionTitle}>{config.title}</h3>
          <p className={styles.optionDescription}>{config.description}</p>
        </div>

        <input
          type="radio"
          id={`theme-${config.id}`}
          name={name}
          value={config.id}
          checked={isSelected}
          onChange={() => onSelect(config.id)}
          className={styles.radioInput}
          aria-label={`Select ${config.title}`}
        />
        <div
          className={`${styles.radioCustom} ${isSelected ? styles.radioSelected : ""}`}
          aria-hidden="true"
        />
      </label>
    </div>
  );
};
