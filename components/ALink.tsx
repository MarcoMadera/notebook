import type {
  AnchorHTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from "react";

import Link, { LinkProps } from "next/link";

import styles from "./ALink.module.css";

type Props = {
  variant?: "action";
};

export function ALink(
  props: PropsWithChildren<
    LinkProps & Props & AnchorHTMLAttributes<HTMLAnchorElement>
  >
): ReactElement {
  const { variant, ...rest } = props;
  return (
    <Link
      {...rest}
      className={`${styles.anchor} ${variant ? styles.action : ""}`}
    >
      {props.children}
    </Link>
  );
}
