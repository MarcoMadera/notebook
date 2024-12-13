import type {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";

import { ALink } from "./ALink";
import anchorStyles from "./ALink.module.css";
import styles from "./SideBarItem.module.css";

import { ChevronRight } from "@/app/ui/icons";

type BaseProps = {
  selected?: boolean;
  icon?: ReactNode;
};

type LinkProps = BaseProps & {
  variant?: "link";
  href: string;
};

type ButtonProps = BaseProps & {
  variant: "button";
  href?: never;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps | "href">;

type SideBarItemProps = LinkProps | ButtonProps;

function isLinkProps(props: SideBarItemProps): props is LinkProps {
  return props.variant === "link";
}

export function SideBarItem(
  props: PropsWithChildren<SideBarItemProps>
): ReactElement {
  const { children, selected, icon } = props;
  const commonClassNames = `${styles.container} ${selected ? styles.selected : ""}`;

  const content = (
    <>
      <div className={styles.icon}>{icon}</div>
      <div className={`${styles.content} text-preset-4`}>{children}</div>
      {selected ? (
        <div className={styles.rightIcon}>
          <ChevronRight viewBox="8 1 24 24" />
        </div>
      ) : (
        <div className={styles.rightIcon}></div>
      )}
    </>
  );

  if (!props.variant || isLinkProps(props)) {
    return (
      <li className={styles.listItem}>
        <ALink href={props.href} className={commonClassNames}>
          {content}
        </ALink>
      </li>
    );
  }

  const {
    variant: _,
    href: __,
    selected: ___,
    icon: ____,
    ...buttonProps
  } = props;
  return (
    <li className={styles.listItem}>
      <button
        {...buttonProps}
        className={`${commonClassNames} ${styles.button} ${anchorStyles.anchor}`}
        type={buttonProps.type ?? "button"}
      >
        {content}
      </button>
    </li>
  );
}
