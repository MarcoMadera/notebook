import { type InputHTMLAttributes, ReactElement, useRef } from "react";

import { Info } from "./icons";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string | string[];
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  onLeftIconClick?: () => void;
  leftIconAriaLabel?: string;
  rightIconAriaLabel?: string;
}

const TextInput = ({
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  className = "",
  onRightIconClick,
  onLeftIconClick,
  leftIconAriaLabel,
  rightIconAriaLabel,
  ...props
}: InputProps): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInteraction = (handler?: () => void) => {
    if (!handler) {
      inputRef.current?.focus();
    } else {
      handler();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, handler?: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleInteraction(handler);
    }
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={`text-preset-4 ${styles.label}`} htmlFor={props.id}>
          {label}
        </label>
      )}
      <div
        className={`
          ${styles.inputWrapper}
          ${error ? styles.error : ""}
          ${leftIcon ? styles.hasLeftIcon : ""}
          ${rightIcon ? styles.hasRightIcon : ""}
        `}
      >
        {leftIcon && (
          <button
            type="button"
            disabled={props.disabled}
            className={`${styles.iconButton} ${styles.leftIcon} ${!onLeftIconClick ? styles.searchIcon : styles.clickable}`}
            onClick={() => handleInteraction(onLeftIconClick)}
            onKeyDown={(e) => handleKeyDown(e, onLeftIconClick)}
            tabIndex={onLeftIconClick ? 0 : -1}
            aria-label={leftIconAriaLabel}
          >
            {leftIcon}
          </button>
        )}
        <input
          ref={inputRef}
          className={`${styles.input} ${className}`}
          {...props}
        />
        {rightIcon && (
          <button
            type="button"
            disabled={props.disabled}
            className={`${styles.iconButton} ${styles.rightIcon} ${onRightIconClick ? styles.clickable : ""}`}
            onClick={() => handleInteraction(onRightIconClick)}
            onKeyDown={(e) => handleKeyDown(e, onRightIconClick)}
            tabIndex={0}
            aria-label={rightIconAriaLabel}
          >
            {rightIcon}
          </button>
        )}
      </div>
      {hint && (
        <div className={styles.errorContainer}>
          {typeof hint === "string" ? (
            <span
              className={`text-preset-6 ${styles.hint} ${error ? styles.errorHint : ""}`}
            >
              <Info /> {hint}
            </span>
          ) : (
            <ul className={`${styles.errorList} `}>
              {hint.map((msg, index) => (
                <li
                  key={index}
                  className={`text-preset-6 ${styles.hint} ${error ? styles.errorHint : ""} ${props.disabled ? styles.disabled : ""}`}
                >
                  <Info /> {msg}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TextInput;
