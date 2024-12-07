import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

import styles from "./Divider.module.css";

export function Divider(
  props: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>
): ReactElement {
  const classNames = [styles.divider, props.className]
    .filter(Boolean)
    .join(" ");
  return <hr className={classNames} />;
}
