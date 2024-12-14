import React, { ReactElement } from "react";

import styles from "./Button.module.css";
type ButtonVariant = "primary" | "secondary" | "border" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = ({
  children,
  variant = "primary",
  fullWidth = true,
  ...props
}: ButtonProps): ReactElement => {
  const classNames = [
    styles.button,
    styles[variant],
    variant === "primary" ? "text-preset-3" : "text-preset-4",
    fullWidth ? styles.fullWidth : "",
    props.className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...props} className={classNames}>
      {children}
    </button>
  );
};

export default Button;
