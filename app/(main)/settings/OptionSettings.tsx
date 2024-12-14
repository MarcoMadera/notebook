"use client";

import React, { ReactElement, useId, useState } from "react";

import { Option } from "./Option";
import styles from "./OptionSettings.module.css";
import { OptionSettingsProps } from "./types";

import Button from "@/components/Button";

export function OptionSettings<T>({
  onChange,
  options,
  initialOption,
  setOption,
  validator,
  ariaLabel,
  name,
  legend,
  title,
  description,
}: Readonly<OptionSettingsProps<T>>): ReactElement {
  const [selectedOption, setSelectedOption] = useState<T>(initialOption);
  const id = useId();

  const handleChange = (option: string): void => {
    const validatedOption = validator(option);
    onChange?.(validatedOption);
    setSelectedOption(validatedOption);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setOption(selectedOption);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle} id={id}>
          {description}
        </p>
      </header>

      <fieldset className={styles.optionsContainer} aria-describedby={id}>
        <legend className={styles["sr-only"]}>{legend}</legend>
        {options.map((option) => (
          <Option
            key={option.id}
            config={option}
            isSelected={selectedOption === option.id}
            handleChange={handleChange}
            name={name}
            Icon={option.Icon}
            data-option={option.id}
          />
        ))}
      </fieldset>

      <Button
        type="submit"
        aria-label={ariaLabel}
        variant="primary"
        fullWidth={false}
      >
        Apply Changes
      </Button>
    </form>
  );
}

export default OptionSettings;
