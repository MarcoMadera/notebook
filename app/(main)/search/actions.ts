"use server";

import { getNotes, NoteWithTags } from "@/utils/supabase/notes";
import { createClient } from "@/utils/supabase/server";

export async function searchNotes(query: string): Promise<NoteWithTags[]> {
  const supabase = await createClient();
  return getNotes(supabase, { searchQuery: query });
}
