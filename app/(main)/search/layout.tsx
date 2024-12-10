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
  const [headersList, supabase] = await Promise.all([
    headers(),
    createClient(),
  ]);

  const searchParams = headersList.get("x-search-params") ?? "";
  const searchQuery = new URLSearchParams(searchParams).get("q") ?? "";

  const initialNotes = searchQuery
    ? await getNotes(supabase, { searchQuery })
    : [];

  return (
    <div className="grid-container grid-container--no-sidebar">
      <SidebarAllNotes
        initialNotes={{ data: initialNotes, count: 0 }}
        baseUrl="/search"
      ></SidebarAllNotes>
      {children}
    </div>
  );
}
