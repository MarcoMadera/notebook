import { ReactElement } from "react";

import type { Viewport } from "next";

import { redirect } from "next/navigation";

import styles from "./page.module.css";

import { PageHeader } from "@/components/PageHeader";
import { SideBarNavigation } from "@/components/SidebarNavigation";
import { createClient } from "@/utils/supabase/server";

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "cyan" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    colorScheme: "dark light",
  };
}

export default async function Home(): Promise<ReactElement> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className={`${styles.page} grid-container grid-container--sidebar`}>
      <SideBarNavigation />
      <PageHeader />
    </div>
  );
}
