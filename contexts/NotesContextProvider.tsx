"use client";
import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useMemo,
  useState,
} from "react";

import { NoteWithTags } from "@/utils/supabase/notes";

export type NotesContextType = {
  notes: NoteWithTags[];
  setNotes: (notes: NoteWithTags[]) => void;
};

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined
);

export function NotesContextProvider({
  children,
  notes: initialNotes,
}: Readonly<PropsWithChildren<{ notes?: NoteWithTags[] }>>): ReactElement {
  const [notes, setNotes] = useState(initialNotes ?? []);
  const value = useMemo(() => ({ notes, setNotes }), [notes]);

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
