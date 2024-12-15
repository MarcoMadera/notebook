"use server";

import { revalidatePath } from "next/cache";

export async function revalidateSearch() {
  revalidatePath("/search", "page");
  return null;
}
