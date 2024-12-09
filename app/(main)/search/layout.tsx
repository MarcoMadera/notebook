import { ReactElement } from "react";

import type { Metadata } from "next";

import { headers } from "next/headers";

import { SidebarAllNotes } from "@/components/SidebarAllNotes";
import { getNotes, NoteWithTags } from "@/utils/supabase/notes";
import { createClient } from "@/utils/supabase/server";
export const metadata: Metadata = {
  title: "Notes",
  description: "Taking notes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<ReactElement> {
  const supabase = await createClient();
  const headersList = await headers();
  const referer = headersList.get("referer");
  const url = new URL(referer ?? "");
  const searchQuery = url.searchParams.get("q") ?? "";
  let initialNotes: NoteWithTags[] = [];

  if (searchQuery) {
    initialNotes = await getNotes(supabase, {
      searchQuery,
    });
  }

  return (
    <div className="grid-container grid-container--no-sidebar">
      <Content initialNotes={initialNotes}>{children}</Content>
    </div>
  );
}

function Content({ children, initialNotes }) {
  return (
    <>
      <SidebarAllNotes
        initialNotes={{ data: initialNotes, count: 0 }}
        baseUrl="/search"
      >
        {!initialNotes.length ? (
          <div>
            No notes have been archived yet. Move notes here for safekeeping, or
            create a new note.
          </div>
        ) : null}
      </SidebarAllNotes>
      {children}
    </>
  );
}
