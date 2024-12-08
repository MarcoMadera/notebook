import { ReactElement } from "react";

import type { Metadata } from "next";

import { SidebarAllNotes } from "@/components/SidebarAllNotes";
import { getPaginatedNotes } from "@/utils/supabase/notes";
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
  const initialNotes = await getPaginatedNotes(supabase, {
    limit: 10,
    offset: 0,
    status: "archived",
  });

  return (
    <div className="grid-container grid-container--no-sidebar">
      <SidebarAllNotes
        initialNotes={initialNotes}
        baseUrl="/archived"
        height="calc(100vh - 14.349rem)"
      >
        <span className="text-preset-5" style={{ fontFamily: "Inter" }}>
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </span>
        {!initialNotes.data.length ? (
          <div>
            No notes have been archived yet. Move notes here for safekeeping, or
            create a new note.
          </div>
        ) : null}
      </SidebarAllNotes>
      {children}
    </div>
  );
}
