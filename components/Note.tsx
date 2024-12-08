import { ReactElement, Ref } from "react";

import Button from "./Button";
import { Divider } from "./Divider";
import styles from "./Note.module.css";

import { ScrollableContainer } from "./ScrollableContainer";

import { Clock, Tag } from "@/app/ui/icons";
import { formatDate } from "@/utils/formatDate";
import { NoteWithTags } from "@/utils/supabase/notes";

export function Note({
  note,
  ref,
}: Readonly<{
  note: NoteWithTags;
  ref?: Ref<HTMLDivElement>;
}>): ReactElement {
  return (
    <main
      className={`col-span-6 col-start-4 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8 ${styles.container}`}
    >
      <article key={note.id} ref={ref} className={styles.note}>
        <header className={styles.header}>
          <h2>{note.title}</h2>
          <div className={`${styles.subheader} text-preset-5`}>
            <div className={styles.subheaderContent}>
              <Tag /> Tags
            </div>
            <ScrollableContainer
              height="2em"
              className={`${styles.subheaderContent} ${styles.headerTags}`}
            >
              {note.tags?.map((tagRelation, index) => (
                <span key={tagRelation.tag.name}>
                  {tagRelation.tag.name}
                  {index < note.tags.length - 1 ? ", " : ""}
                </span>
              ))}
            </ScrollableContainer>
            <div className={styles.subheaderContent}>
              <Clock /> Last Edited
            </div>
            <time
              dateTime={note.updated_at}
              className={styles.subheaderContent}
            >
              {formatDate(note.updated_at, "en")}
            </time>
          </div>
        </header>
        <Divider />
        <ScrollableContainer
          height="calc(100vh - 20.11rem)"
          className={`text-preset-5 ${styles.noteContent}`}
        >
          {note.content}
        </ScrollableContainer>
      </article>
      <Divider />
      <footer style={{ display: "flex", gap: "1rem" }}>
        <Button
          type="button"
          variant="primary"
          style={{ width: "fit-content" }}
        >
          Save Note
        </Button>
        <Button
          type="button"
          variant="secondary"
          style={{ width: "fit-content" }}
        >
          Cancel
        </Button>
      </footer>
    </main>
  );
}
