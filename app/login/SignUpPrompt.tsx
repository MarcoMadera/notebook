import { ReactElement } from "react";

import Link from "next/link";

import styles from "./SignUpPrompt.module.css";

export function SignUpPrompt(): ReactElement {
  return (
    <p className={`text-preset-5 alignCenter ${styles["SignUpPrompt-text"]}`}>
      <span>No account yet?</span> <Link href="/signup">Sign up</Link>
    </p>
  );
}
