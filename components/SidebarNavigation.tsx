"use client";

import { type ReactElement, useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import { ALink } from "./ALink";
import { Divider } from "./Divider";
import { Logo } from "./Logo";

import { ScrollableContainer } from "./ScrollableContainer";
import { SideBarItem } from "./SideBarItem";

import styles from "./SideBarNavigation.module.css";

import { Archive, Home, Tag } from "@/app/ui/icons";
import { TagWithCount } from "@/utils/supabase/notes";

export function SideBarNavigation({
  initialTags,
}: Readonly<{
  initialTags: TagWithCount[];
}>): ReactElement {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentFocus = document.activeElement;
      if (!nav || !(currentFocus instanceof HTMLElement)) return;

      const items = Array.from(nav.querySelectorAll("a"));
      if (!items.length) return;

      const currentIndex = items.findIndex((item) => item === currentFocus);
      if (currentIndex === -1) return;

      let nextIndex: number;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          nextIndex =
            currentIndex < items.length - 1 ? currentIndex + 1 : currentIndex;
          items[nextIndex].focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
          items[nextIndex].focus();
          break;
      }
    };

    nav?.addEventListener("keydown", handleKeyDown);
    return () => nav?.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <aside className={`col-span-1 col-start-1 sidebar ${styles.sidebar}`}>
      <div className={styles.logoContainer}>
        <ALink href="/" aria-label="Home">
          <Logo />
        </ALink>
      </div>
      <div className={styles.content} ref={navRef}>
        <nav role="navigation" aria-label="Main navigation">
          <ul className={styles.itemsContainer}>
            <SideBarItem href="/" selected={pathname === "/"} icon={<Home />}>
              All notes
            </SideBarItem>
            <SideBarItem
              href="/archived"
              selected={pathname === "/archived"}
              icon={<Archive />}
            >
              Archived Notes
            </SideBarItem>
          </ul>
        </nav>
        <Divider />
        <h2
          className={`text-preset-4 ${styles.heading}`}
          id="sidebar-tags-heading"
        >
          Tags
        </h2>
        <nav
          role="navigation"
          aria-labelledby="sidebar-tags-heading"
          className={styles.navItems}
        >
          <ScrollableContainer as="ul" className={styles.itemsContainer}>
            {initialTags.map((tagWithCount) => {
              const path = `/tag/${encodeURIComponent(tagWithCount.name)}`;
              return (
                <SideBarItem
                  key={tagWithCount.name}
                  href={path}
                  selected={pathname === path}
                  icon={<Tag />}
                  aria-label={`notes with tag ${tagWithCount.name} (${tagWithCount.count} notes)`}
                >
                  {tagWithCount.name}
                </SideBarItem>
              );
            })}
          </ScrollableContainer>
        </nav>
      </div>
    </aside>
  );
}
