"use client";
import { ReactElement } from "react";

import { useRouter } from "next/navigation";

import { ALink } from "./ALink";
import { Logo } from "./Logo";
import styles from "./PageHeader.module.css";

import { Search, Settings } from "@/app/ui/icons";
import TextInput from "@/app/ui/TextInput";

export function PageHeader(): ReactElement {
  const router = useRouter();

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
          onLeftIconClick={(value) => {
            if (value) {
              router.push(`/search?q=${value}`);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const value = e.currentTarget.value;
              router.push(`/search?q=${value}`);
            }
          }}
          placeholder="Search by title, content, or tags..."
        />
        <ALink href="./settings" className={styles.settingsLink}>
          <Settings />
        </ALink>
      </div>
    </div>
  );
}
