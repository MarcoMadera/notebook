import { ReactElement } from "react";

import { redirect } from "next/navigation";

import { TestButton } from "./testButton";

import { createClient } from "@/utils/supabase/server";

export default async function Home(): Promise<ReactElement> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <p>Settings</p>
      <TestButton />
    </div>
  );
}
