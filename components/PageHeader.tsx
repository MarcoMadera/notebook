"use client";
import { ReactElement } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ALink } from "./ALink";
import { Logo } from "./Logo";
import styles from "./PageHeader.module.css";

import { Search, Settings } from "@/app/ui/icons";
import TextInput from "@/app/ui/TextInput";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { ShortcutId } from "@/types/shortcuts";

export function PageHeader(): ReactElement {
  const router = useRouter();
  const searchShortcut = useKeyboardShortcut(ShortcutId.Search);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getHeading = () => {
    const searchQuery = searchParams.get("q");

    if (pathname === "/" || /^\/[a-f0-9-]{36}$/.test(pathname)) {
      return "All Notes";
    }

    if (pathname === "/archived" || pathname.startsWith("/archived/")) {
      return "Archived Notes";
    }

    if (pathname === "/tag" || pathname.startsWith("/tag/")) {
      const tagName = pathname.split("/")[2];
      return tagName
        ? `Notes Tagged: ${decodeURIComponent(tagName)}`
        : "Tagged Notes";
    }

    if (pathname === "/search") {
      return searchQuery ? `Showing results for: ${searchQuery}` : "Search";
    }

    if (pathname === "/settings") {
      return "Settings";
    }

    return "Notes";
  };

  return (
    <header className={styles.pageHeader}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <h1 className={`text-preset-1 ${styles.heading}`}>{getHeading()}</h1>
      <div className={styles.controls}>
        <TextInput
          ref={searchShortcut?.ref}
          aria-keyshortcuts={searchShortcut?.["aria-keyshortcuts"]}
          name="search"
          id="search"
          leftIcon={<Search />}
          leftIconAriaLabel="Search"
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
        <ALink
          href="/settings"
          className={styles.settingsLink}
          aria-label="Settings"
        >
          <Settings />
        </ALink>
      </div>
    </header>
  );
}
