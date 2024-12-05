import type { PropsWithChildren, ReactElement, ReactNode } from "react";

import styles from "./SideBarItem.module.css";

import { ChevronRight } from "@/app/ui/icons";

export function SideBarItem({
  children,
  selected,
  icon,
}: PropsWithChildren<{
  selected?: boolean;
  icon?: ReactNode;
}>): ReactElement {
  return (
    <div className={`${styles.container} ${selected ? styles.selected : ""}`}>
      <div className={styles.icon}>{icon}</div>
      <div className={`${styles.content} text-preset-4`}>{children}</div>
      {selected ? (
        <div className={styles.rightIcon}>
          <ChevronRight viewBox="8 1 24 24" />
        </div>
      ) : (
        <div className={styles.rightIcon}></div>
      )}
    </div>
  );
}
