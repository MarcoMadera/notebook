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
  });

  return (
    <div className="grid-container grid-container--no-sidebar">
      <SidebarAllNotes initialNotes={initialNotes} />
      {children}
    </div>
  );
}
