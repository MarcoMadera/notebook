import { useEffect, useState } from "react";

import {
  NotesContext,
  NotesContextType,
} from "@/contexts/NotesContextProvider";
import { useCustomContext } from "@/hooks/useCustomContext";
import { NoteWithTags } from "@/utils/supabase/notes";

export function useNotes(initialNotes?: NoteWithTags[]): NotesContextType {
  const context = useCustomContext(NotesContext);
  const [mounted, setMounted] = useState(false);
  const initNotes = initialNotes ?? context.notes;
  const notes = mounted ? context.notes : initNotes;

  useEffect(() => {
    if (initialNotes) {
      context.setNotes(initialNotes);
    }
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...context,
    notes,
  };
}
