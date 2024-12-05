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
  const classNames = [styles.anchor, variant && styles.action, props.className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link {...rest} className={classNames}>
      {props.children}
    </Link>
  );
}
