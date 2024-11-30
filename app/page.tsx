import { redirect } from "next/navigation";
import styles from "./page.module.css";
import type { Viewport } from "next";
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

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className={styles.page}>
      <p>Hello {data.user.email}</p>
      <main className={styles.main}></main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
