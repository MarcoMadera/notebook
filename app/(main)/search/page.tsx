import { ReactElement } from "react";

import { redirect } from "next/navigation";

import { SearchQuery } from "./SearchQuery";

import { createClient } from "@/utils/supabase/server";

export default async function Search(): Promise<ReactElement> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <p>Search</p>
      <SearchQuery />
    </div>
  );
}
