"use client";
import { ReactElement } from "react";

import { ALink } from "./ALink";
import { Logo } from "./Logo";
import styles from "./PageHeader.module.css";

import { Search, Settings } from "@/app/ui/icons";
import TextInput from "@/app/ui/TextInput";

export function PageHeader(): ReactElement {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <h1 className={`text-preset-1 ${styles.heading}`}>All Notes</h1>
      <div className={styles.controls}>
        <TextInput
          name="search"
          id="search"
          leftIcon={<Search />}
          onLeftIconClick={() => {}}
          placeholder="Search by title, content, or tags..."
        />
        <ALink href="./settings" className={styles.settingsLink}>
          <Settings />
        </ALink>
      </div>
    </div>
  );
}
