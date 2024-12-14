"use client";

import React, { DetailedHTMLProps, ReactElement } from "react";

import styles from "./Option.module.css";
import { ThemeOptionProps } from "./types";

export const Option: React.FC<
  DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
    ThemeOptionProps
> = ({
  config,
  isSelected,
  handleChange,
  name,
  Icon,
  ...props
}): ReactElement => {
  return (
    <div
      className={`${styles.option} ${isSelected ? styles.selected : ""}`}
      {...props}
    >
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
          onChange={() => handleChange(config.id)}
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
