import { PropsWithChildren, ReactElement } from "react";

import styles from "@/styles/Grid.module.css";

export default function AuthLayout({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return (
    <div className={styles.authWrapper}>
      <div className="grid-container grid-container--no-sidebar">
        {/* Desktop: 4 columns centered */}
        {/* Tablet: 4 columns centered */}
        {/* Mobile: full width */}
        <div className="col-span-6 col-start-4 tablet:col-span-4 tablet:col-start-3 mobile:col-span-8">
          <div className={styles.authCard}>{children}</div>
        </div>
      </div>
    </div>
  );
}
