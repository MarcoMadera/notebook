"use client";
import { ReactElement, useTransition } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ALink } from "./ALink";
import { Logo } from "./Logo";
import styles from "./PageHeader.module.css";

import { Search, Settings } from "@/app/ui/icons";
import TextInput from "@/app/ui/TextInput";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { useNotes } from "@/hooks/useNotes";
import { ShortcutId } from "@/types/shortcuts";

export function PageHeader(): ReactElement {
  const router = useRouter();
  const searchShortcut = useKeyboardShortcut(ShortcutId.Search);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setNotes } = useNotes();
  const [isPending, startTransition] = useTransition();

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

    if (
      searchQuery &&
      (pathname === "/search" || pathname.startsWith("/search/"))
    ) {
      return searchQuery ? `Showing results for: ${searchQuery}` : "Search";
    }

    if (pathname === "/settings") {
      return "Settings";
    }

    return "Notes";
  };

  const handleSearch = (value: string) => {
    if (!value.trim()) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("q", value);

    let noteId = "";

    const uuidPattern = /[a-f0-9-]{36}/;
    const pathParts = pathname.split("/");

    for (const part of pathParts) {
      if (uuidPattern.test(part)) {
        noteId = part;
        break;
      }
    }

    let newPath = "/search";
    if (noteId) {
      newPath = `/search/${noteId}`;
    }

    startTransition(() => {
      setNotes([]);
      router.push(`${newPath}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <header className={styles.pageHeader}>
      <div className={styles.logo}>
        <Logo aria-hidden="true" />
      </div>
      <h1 className={`text-preset-1 ${styles.heading}`}>{getHeading()}</h1>
      <div className={styles.controls}>
        <search role="search" aria-label="Notes">
          <TextInput
            ref={searchShortcut?.ref}
            aria-keyshortcuts={searchShortcut?.["aria-keyshortcuts"]}
            name="search"
            type="search"
            defaultValue={
              pathname === "/search"
                ? (searchParams.get("q") ?? undefined)
                : undefined
            }
            id="search"
            autoComplete="off"
            leftIcon={<Search />}
            leftIconAriaLabel="Search"
            onLeftIconClick={(value) => {
              if (value) {
                handleSearch(value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const value = e.currentTarget.value;
                handleSearch(value);
              }
            }}
            placeholder="Search by title, content, or tags..."
            className="text-preset-5"
            disabled={isPending}
          />
        </search>
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
