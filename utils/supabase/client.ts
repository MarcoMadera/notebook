"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "./database.types";

export type SupabaseClientType = ReturnType<
  typeof createBrowserClient<Database>
>;

export function createClient(): SupabaseClientType {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
