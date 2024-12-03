import { type ReactElement } from "react";

import styles from "./Divider.module.css";

export function Divider(): ReactElement {
  return <hr className={styles.divider} />;
}
