import type { ReactElement } from "react";

import { Archive, Delete } from "@/app/ui/icons";
import Button from "@/components/Button";
import { Note } from "@/components/Note";
import { SidebarRight } from "@/components/SidebarRight";
import { getNoteById } from "@/utils/supabase/notes";
import { createClient } from "@/utils/supabase/server";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ note: string }>;
}>): Promise<ReactElement> {
  const noteId = (await params).note;

  if (!noteId) {
    return <div>Please select a note</div>;
  }
  const supabase = await createClient();
  const data = await getNoteById(supabase, noteId);

  return (
    <>
      <Note note={data} />
      <SidebarRight />
    </>
  );
}
