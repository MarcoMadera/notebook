import React, { ReactElement } from "react";

import style from "./Button.module.css";
type ButtonVariant = "primary" | "secondary" | "border" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const Button = ({
  children,
  variant = "primary",
  ...props
}: ButtonProps): ReactElement => {
  return (
    <button
      {...props}
      className={`${style.button} ${style[variant]} ${variant === "primary" ? "text-preset-3" : "text-preset-4"}`}
    >
      {children}
    </button>
  );
};

export default Button;
