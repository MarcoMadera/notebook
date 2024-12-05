import { ReactElement } from "react";

import styles from "./AuthPrompt.module.css";

import { ALink } from "@/components/ALink";

interface AuthPromptProps {
  message: string;
  linkText: string;
  linkHref: string;
}

export function AuthPrompt({
  message,
  linkText,
  linkHref,
}: Readonly<AuthPromptProps>): ReactElement {
  return (
    <p className={`text-preset-5 alignCenter ${styles["AuthPrompt-text"]}`}>
      <span>{message}</span> <ALink href={linkHref}>{linkText}</ALink>
    </p>
  );
}
