import { ReactElement } from "react";

import styles from "./SignUpPrompt.module.css";

import { ALink } from "@/components/ALink";

export function SignUpPrompt(): ReactElement {
  return (
    <p className={`text-preset-5 alignCenter ${styles["SignUpPrompt-text"]}`}>
      <span>No account yet?</span> <ALink href="/signup">Sign up</ALink>
    </p>
  );
}
