"use client";

import { Fragment, PropsWithChildren, ReactElement } from "react";

import { usePathname } from "next/navigation";

import { AllNotesMenuCard } from "./AllNotesMenuCard";
import Button from "./Button";

import { Divider } from "./Divider";
import { ScrollableContainer } from "./ScrollableContainer";
import styles from "./SidebarAllNotes.module.css";

import { Plus } from "@/app/ui/icons";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { useNotes } from "@/hooks/useNotes";
import { ShortcutId } from "@/types/shortcuts";
import { NoteWithTags } from "@/utils/supabase/notes";

export function SidebarAllNotes({
  initialNotes,
  baseUrl = "",
  children,
}: Readonly<
  PropsWithChildren<{
    initialNotes: {
      data: NoteWithTags[];
      count: number;
    };
    baseUrl?: string;
  }>
>): ReactElement {
  const shortcut = useKeyboardShortcut(ShortcutId.NewNote);
  const pathname = usePathname();
  const notes = initialNotes.data;
  // const { notes } = useNotes(initialNotes.data);

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
      <div>{children}</div>
      <ScrollableContainer className={styles.menuCards}>
        {notes.slice(0, 10).map((note, index) => {
          const isSelected = pathname === `${baseUrl}/${note.id}`;
          const nextNoteIsSelected =
            notes[index + 1] &&
            pathname === `${baseUrl}/${notes[index + 1].id}`;

          const hideDivider = isSelected || nextNoteIsSelected;

          return (
            <Fragment key={note.id}>
              <AllNotesMenuCard
                id={note.id}
                title={note.title}
                date={note.updated_at}
                tags={note.tags}
                selected={isSelected}
                baseUrl={baseUrl}
              />
              {index < notes.length - 1 && (
                <Divider className={`${hideDivider ? styles.hidden : ""}`} />
              )}
            </Fragment>
          );
        })}
      </ScrollableContainer>
    </aside>
  );
}
