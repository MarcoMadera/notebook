import {
  createElement,
  DetailedHTMLProps,
  HTMLAttributes,
  HTMLElementType,
  PropsWithChildren,
  ReactElement,
} from "react";

import styles from "./ScrollableContainer.module.css";

type Props = {
  height: string;
  as?: HTMLElementType;
};

export function ScrollableContainer<T = HTMLDivElement>(
  props: Readonly<
    PropsWithChildren<DetailedHTMLProps<HTMLAttributes<T>, T> & Props>
  >
): ReactElement {
  const className = [styles.scrollContent, props.className]
    .filter(Boolean)
    .join(" ");

  const element = createElement(
    props.as ?? "div",
    { className },
    props.children
  );

  return (
    <div className={styles.scrollArea} style={{ height: props.height }}>
      {element}
    </div>
  );
}
