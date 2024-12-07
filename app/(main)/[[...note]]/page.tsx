import type { ReactElement } from "react";

import { Archive, Delete } from "@/app/ui/icons";
import Button from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Note } from "@/components/Note";
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
      <main className="col-span-6 col-start-4 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8">
        <Note note={data} />
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
      <aside className="col-span-3 col-start-10 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8">
        <Button type="button" variant="border">
          <Archive /> Archive Note
        </Button>
        <Button type="button" variant="border">
          <Delete /> Delete Note
        </Button>
      </aside>
    </>
  );
}
