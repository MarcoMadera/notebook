import { ReactElement } from "react";

import type { Metadata } from "next";

import { redirect } from "next/navigation";

import styles from "./page.module.css";

import { PageHeader } from "@/components/PageHeader";
import { SideBarNavigation } from "@/components/SidebarNavigation";
import { KeyboardShortcutsProvider } from "@/contexts/KeyboardShortcutsContextProvider";
import { NotesContextProvider } from "@/contexts/NotesContextProvider";
import { getUserTags } from "@/utils/supabase/notes";
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
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const initialTags = await getUserTags(supabase);

  return (
    <div className={`${styles.page} grid-container grid-container--sidebar`}>
      <SideBarNavigation initialTags={initialTags} />
      <div
        className={`${styles.container} col-span-12 col-start-2 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8`}
      >
        <NotesContextProvider>
          <KeyboardShortcutsProvider>
            <PageHeader />
            {children}
          </KeyboardShortcutsProvider>
        </NotesContextProvider>
      </div>
    </div>
  );
}
