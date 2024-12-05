import { type ReactElement } from "react";

import { Divider } from "./Divider";
import { Logo } from "./Logo";

import { SideBarItem } from "./SideBarItem";

import styles from "./SideBarNavigation.module.css";

import { Archive, Home, Tag } from "@/app/ui/icons";

export function SideBarNavigation(): ReactElement {
  return (
    <div className={`col-span-1 col-start-1 sidebar ${styles.sidebar}`}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.content}>
        <div className={styles.itemsContainer}>
          <SideBarItem selected icon={<Home />}>
            All notes
          </SideBarItem>
          <SideBarItem icon={<Archive />}>Archived Notes</SideBarItem>
        </div>
        <Divider />
        <span className={`text-preset-4 ${styles.heading}`}>Tags</span>
        <div className={styles.itemsContainer}>
          <SideBarItem icon={<Tag />}>Cooking</SideBarItem>
          <SideBarItem icon={<Tag />}>Dev</SideBarItem>
          <SideBarItem icon={<Tag />}>Fitness</SideBarItem>
          <SideBarItem icon={<Tag />}>Health</SideBarItem>
          <SideBarItem icon={<Tag />}>Health</SideBarItem>
          <SideBarItem icon={<Tag />}>Personal</SideBarItem>
          <SideBarItem icon={<Tag />}>React</SideBarItem>
          <SideBarItem icon={<Tag />}>Recipes</SideBarItem>
          <SideBarItem icon={<Tag />}>Shopping</SideBarItem>
          <SideBarItem icon={<Tag />}>Travel</SideBarItem>
          <SideBarItem icon={<Tag />}>Typescript</SideBarItem>
        </div>
      </div>
    </div>
  );
}
