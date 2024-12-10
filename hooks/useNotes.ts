import {
  NotesContext,
  NotesContextType,
} from "@/contexts/NotesContextProvider";
import { useCustomContext } from "@/hooks/useCustomContext";

export function useNotes(): NotesContextType {
  const context = useCustomContext(NotesContext);
  return context;
}
