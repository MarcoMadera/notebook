"use client";

import { Fragment, ReactElement } from "react";

import { usePathname } from "next/navigation";

import { AllNotesMenuCard } from "./AllNotesMenuCard";
import Button from "./Button";

import { Divider } from "./Divider";
import { ScrollableContainer } from "./ScrollableContainer";
import styles from "./SidebarAllNotes.module.css";

import { Plus } from "@/app/ui/icons";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { ShortcutId } from "@/types/shortcuts";
import { NoteWithTags } from "@/utils/supabase/notes";

export function SidebarAllNotes({
  initialNotes,
}: Readonly<{
  initialNotes: {
    data: NoteWithTags[];
    count: number;
  };
}>): ReactElement {
  const shortcut = useKeyboardShortcut(ShortcutId.NewNote);
  const pathname = usePathname();

  return (
    <aside
      className={`col-span-3 col-start-1 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8 ${styles.container}`}
    >
      <Button
        type="button"
        variant="primary"
        onClick={shortcut.action}
        aria-keyshortcuts={shortcut["aria-keyshortcuts"]}
        className="text-preset-4"
      >
        <Plus /> Create New Note
      </Button>
      <ScrollableContainer
        className={styles.menuCards}
        height="calc(100vh - 12rem)"
      >
        {initialNotes.data.map((note, index) => {
          const isSelected = pathname === `/${note.id}`;
          const nextNoteIsSelected =
            initialNotes.data[index + 1] &&
            pathname === `/${initialNotes.data[index + 1].id}`;

          const hideDivider = isSelected || nextNoteIsSelected;

          return (
            <Fragment key={note.id}>
              <AllNotesMenuCard
                id={note.id}
                title={note.title}
                date={note.updated_at}
                tags={note.tags}
                selected={isSelected}
              />
              {index < initialNotes.data.length - 1 && (
                <Divider className={`${hideDivider ? styles.hidden : ""}`} />
              )}
            </Fragment>
          );
        })}
      </ScrollableContainer>
    </aside>
  );
}
