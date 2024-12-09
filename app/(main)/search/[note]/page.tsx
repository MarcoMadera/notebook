import type { ReactElement } from "react";

import { Delete, Restore } from "@/app/ui/icons";
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
      <Note note={data} showStatus />
      <SidebarRight>
        <Button type="button" variant="border" className="text-preset-4">
          <Restore width={"18.8px"} height={"18.8px"} /> Restore Note
        </Button>
        <Button type="button" variant="border" className="text-preset-4">
          <Delete width={"18.8px"} height={"18.8px"} /> Delete Note
        </Button>
      </SidebarRight>
    </>
  );
}
