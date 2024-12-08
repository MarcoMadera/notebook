"use client";

import { ReactElement, Ref, useCallback, useRef, useState } from "react";

import { createClient } from "@/utils/supabase/client";
import {
  archiveNote,
  createNote,
  deleteNote,
  getNotes,
  getNotesByTags,
  getPaginatedNotes,
  type Note,
  NoteWithTags,
  updateNote,
} from "@/utils/supabase/notes";

export function TestButton(): ReactElement {
  const supabase = createClient();
  const [notes, setNotes] = useState<NoteWithTags[]>([]);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const LIMIT = 10;

  const handleSearch = async () => {
    const response = await getNotes(supabase, {
      searchQuery: "others",
    });
    setNotes(response);
  };
  const handleCreateNote = async () => {
    const response = await createNote(supabase, {
      content:
        "Key performance optimization techniques:\n\n1. Code Splitting\n- Use React.lazy() for route-based splitting\n- Implement dynamic imports for heavy components\n\n2. Memoization\n- useMemo for expensive calculations\n- useCallback for function props\n- React.memo for component optimization\n\n3. Virtual List Implementation\n- Use react-window for long lists\n- Implement infinite scrolling\n\nTODO: Benchmark current application and identify bottlenecks",
      title: "React Performance Optimization",
      tags: [
        "Dev",
        "React",
        "new tag 2",
        "test1",
        "test2",
        "test3",
        "test4",
        "test5",
        "test11",
        "test12",
        "test13",
        "test14",
        "test15",
        "test21",
        "test22",
        "test23",
        "test24",
        "test25",
        "test31",
        "test32",
        "test33",
        "test34",
        "test35",
        "test41",
        "test42",
        "test43",
        "test44",
        "test45",
        "test51",
        "test52",
        "test53",
        "test54",
        "test55",
      ],
    });
    setNotes([response]);
  };
  const handleArchiveNote = async () => {
    const response = await archiveNote(supabase, notes[0].id);
    setNotes([response]);
  };
  const handleDeleteNote = async () => {
    const deleted = await deleteNote(supabase, notes[0].id);
    if (deleted) {
      setNotes([]);
    }
  };
  const handleUpdateNote = async () => {
    const note = await updateNote(supabase, {
      id: notes[0].id,
      content: "updated content",
      status: "published",
      tags: ["updated"],
      title: "my updated title",
    });
    setNotes([note]);
  };
  const handleGetByTag = async () => {
    const notes = await getNotesByTags(supabase, ["new tag 3"], "all");
    setNotes(notes);
  };

  const loadMoreNotes = async () => {
    try {
      setLoading(true);
      const { data, count } = await getPaginatedNotes(supabase, {
        limit: LIMIT,
        offset,
      });

      setNotes((prev) => [...prev, ...data]);
      setHasMore(offset + data.length < count);
      setOffset((prev) => prev + LIMIT);
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const observer = useRef<IntersectionObserver>(null);
  const lastNoteRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreNotes();
        }
      });

      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore]
  );

  return (
    <div>
      <button onClick={handleSearch}>Search by quey</button>
      <button onClick={handleCreateNote}>Create note</button>
      <button onClick={handleUpdateNote}>Update note</button>
      <button onClick={handleArchiveNote}>Archive Note</button>
      <button onClick={handleDeleteNote}>Delete Note</button>
      <button onClick={handleGetByTag}>Get by Tag</button>
      {notes.length
        ? notes.map((note) => {
            return <Note key={note.id} note={note} />;
          })
        : null}

      <div>
        <h2>All notes</h2>
        <div>
          {notes.map((note, index) => (
            <Note
              key={note.id}
              note={note}
              ref={index === notes.length - 1 ? lastNoteRef : undefined}
            />
          ))}
          {loading && <div>Loading more notes...</div>}
        </div>
      </div>
    </div>
  );
}

function Note({
  note,
  ref,
}: {
  note: Note;
  ref?: Ref<HTMLDivElement>;
}): ReactElement {
  return (
    <div key={note.id} ref={ref}>
      <div>id: {note.id}</div>
      <div>created_at: {note.created_at}</div>
      {note.tags ? (
        <div>
          tags:
          {note.tags.map((tagRelation) => {
            return (
              <span key={tagRelation.tag.name}>{tagRelation.tag.name}</span>
            );
          })}
        </div>
      ) : null}

      <div>status: {note.status}</div>
      <div>title: {note.title}</div>
      <div>content: {note.content}</div>
      <div>user_id: {note.user_id}</div>
      <div>updated_at: {note.updated_at}</div>
    </div>
  );
}
