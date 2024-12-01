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
      className={`text-preset-4 ${style.button} ${style[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
