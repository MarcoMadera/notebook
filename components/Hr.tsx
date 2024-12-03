import { type ReactElement } from "react";

import styles from "./Hr.module.css";

export function Hr(): ReactElement {
  return <hr className={styles.hr} />;
}
