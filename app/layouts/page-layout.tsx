import { PropsWithChildren, ReactElement } from "react";

import styles from "@/styles/Grid.module.css";

export default function PageLayout({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return (
    <div className={styles.authWrapper}>
      <div className="grid-container grid-container--no-sidebar">
        {/* Desktop: 6 columns centered */}
        {/* Tablet: 6 columns centered */}
        {/* Mobile: full width */}
        <div className="col-span-6 col-start-4 tablet:col-span-6 tablet:col-start-2 mobile:col-span-8">
          <div className={styles.authCard}>{children}</div>
        </div>
      </div>
    </div>
  );
}
