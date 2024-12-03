import { PropsWithChildren, ReactElement } from "react";

import styles from "./Card.module.css";

export default function Card({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return <div className={`${styles.Card} padding-600`}>{children}</div>;
}
