"use client";

import { ReactElement } from "react";

import Button from "./Button";

import styles from "./SidebarAllNotes.module.css";

import { Plus } from "@/app/ui/icons";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { ShortcutId } from "@/types/shortcuts";
import { TagWithCount } from "@/utils/supabase/notes";

export function SidebarAllNotes(): ReactElement {
  const shortcut = useKeyboardShortcut(ShortcutId.NewNote);

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
      <AllNotesMenuCard
        title="React Performance Optimization"
        date="2023-03-11T00:00:00.000Z"
        tags={[
          { name: "Dev", count: 5 },
          { name: "React", count: 2 },
        ]}
      />
    </aside>
  );
}

function AllNotesMenuCard({
  title,
  tags,
  date,
}: Readonly<{
  title: string;
  tags: TagWithCount[];
  date: string;
}>): ReactElement {
  return (
    <article>
      <h2>{title}</h2>
      <div>
        {tags.map((tag) => {
          return <div key={tag.name}>{tag.name}</div>;
        })}
      </div>
      <time dateTime={date}>{date}</time>
    </article>
  );
}
