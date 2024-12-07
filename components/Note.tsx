import { ReactElement, Ref } from "react";

import { Divider } from "./Divider";
import styles from "./Note.module.css";

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
    <article key={note.id} ref={ref} className={styles.container}>
      <header className={styles.header}>
        <h2>{note.title}</h2>
        <div className={styles.subheader}>
          <div className={styles.subheaderContent}>
            <Tag /> Tags
          </div>
          <div className={styles.subheaderContent}>
            {
              <div>
                {note.tags?.map((tagRelation) => {
                  return (
                    <span key={tagRelation.tag.name}>
                      {tagRelation.tag.name}
                    </span>
                  );
                })}
              </div>
            }
          </div>
          <div className={styles.subheaderContent}>
            <div>
              <Clock /> Last Edited
            </div>
          </div>
          <time dateTime={note.updated_at} className={styles.subheaderContent}>
            {formatDate(note.updated_at, "en")}
          </time>
        </div>
      </header>
      <Divider />
      <div>{note.content}</div>
    </article>
  );
}
