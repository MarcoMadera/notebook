"use client";

import { type ReactElement } from "react";

import { usePathname } from "next/navigation";

import { ALink } from "./ALink";
import { Divider } from "./Divider";
import { Logo } from "./Logo";

import { SideBarItem } from "./SideBarItem";

import styles from "./SideBarNavigation.module.css";

import { Archive, Home, Tag } from "@/app/ui/icons";
import { TagWithCount } from "@/utils/supabase/notes";

export function SideBarNavigation({
  initialTags,
}: {
  initialTags: TagWithCount[];
}): ReactElement {
  const pathname = usePathname();

  return (
    <div className={`col-span-1 col-start-1 sidebar ${styles.sidebar}`}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.content}>
        <div className={styles.itemsContainer}>
          <ALink href="/">
            <SideBarItem selected={pathname === "/"} icon={<Home />}>
              All notes
            </SideBarItem>
          </ALink>
          <ALink href="/archived">
            <SideBarItem selected={pathname === "/archived"} icon={<Archive />}>
              Archived Notes
            </SideBarItem>
          </ALink>
        </div>
        <Divider />
        <span className={`text-preset-4 ${styles.heading}`}>Tags</span>
        <div className={styles.itemsContainer}>
          {initialTags.map((tagWithCount) => {
            const path = `/tag/${encodeURIComponent(tagWithCount.name)}`;
            return (
              <ALink key={tagWithCount.name} href={path}>
                <SideBarItem selected={pathname === path} icon={<Tag />}>
                  {tagWithCount.name}
                </SideBarItem>
              </ALink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
