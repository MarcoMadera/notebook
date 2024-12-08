import { PropsWithChildren, ReactElement } from "react";

import styles from "./SidebarRight.module.css";

export function SidebarRight({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return (
    <aside
      className={`col-span-3 col-start-10 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8 ${styles.container}`}
    >
      <div className={styles.items}>{children}</div>
    </aside>
  );
}
