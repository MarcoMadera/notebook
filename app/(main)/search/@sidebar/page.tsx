import { ReactElement, use } from "react";

import { SidebarAllNotes } from "@/components/SidebarAllNotes";
import { getNotes } from "@/utils/supabase/notes";
import { createClient } from "@/utils/supabase/server";

export default function Search({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}): ReactElement {
  const supabase = use(createClient());

  const params = use(searchParams);
  const searchQuery = params.q ?? "";
  const initialNotes = searchQuery
    ? use(getNotes(supabase, { searchQuery }))
    : [];

  console.log("sidebar page", searchQuery);

  return (
    <SidebarAllNotes
      key={`search-${searchQuery}`}
      initialNotes={{ data: initialNotes, count: 0 }}
      baseUrl="/search"
    ></SidebarAllNotes>
  );
}
