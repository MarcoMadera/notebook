import {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from "react";

import styles from "./ScrollableContainer.module.css";

type Props = {
  height: string;
};

export function ScrollableContainer(
  props: Readonly<
    PropsWithChildren<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & Props
    >
  >
): ReactElement {
  const classNames = [styles.scrollContent, props.className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.scrollViewport}>
        <div className={styles.scrollArea} style={{ height: props.height }}>
          <div className={classNames}>{props.children}</div>
        </div>
      </div>
    </div>
  );
}
