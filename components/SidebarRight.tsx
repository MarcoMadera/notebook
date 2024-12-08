import { ReactElement } from "react";

import Button from "./Button";

import styles from "./SidebarRight.module.css";

import { Archive, Delete } from "@/app/ui/icons";

export function SidebarRight(): ReactElement {
  return (
    <aside
      className={`col-span-3 col-start-10 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8 ${styles.container}`}
    >
      <div className={styles.items}>
        <Button type="button" variant="border" className="text-preset-4">
          <Archive width={"18.8px"} height={"18.8px"} /> Archive Note
        </Button>
        <Button type="button" variant="border" className="text-preset-4">
          <Delete width={"18.8px"} height={"18.8px"} /> Delete Note
        </Button>
      </div>
    </aside>
  );
}
