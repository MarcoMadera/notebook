import { SupabaseClientType } from "./client";
import { NotesTable, TagsTable } from "./database.types";

interface Tag {
  name: string;
}

interface TagRelation {
  tag: Tag;
}

export type NoteWithTags = NotesTable & {
  tags: {
    tag: {
      name: string;
    };
  }[];
};

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
  tags?: TagRelation[];
}

interface CreateNoteParams {
  title: string;
  content: string;
  tags?: string[];
}

interface UpdateNoteParams {
  id: string;
  title?: string;
  content?: string;
  status?: Note["status"];
  tags?: string[];
}

interface GetNotesParams {
  status?: Note["status"];
  searchQuery?: string;
}

export async function createNote(
  supabase: SupabaseClientType,
  params: CreateNoteParams
): Promise<NoteWithTags> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const response = await supabase
    .from("notes")
    .insert({
      title: params.title,
      content: params.content,
      status: "draft" as const,
      user_id: userId,
    })
    .select()
    .single<NotesTable>();

  if (response.error) throw response.error;

  const note = response.data;

  if (params.tags && params.tags.length > 0) {
    for (const tagName of params.tags) {
      const { data: tag, error: tagError } = await supabase
        .from("tags")
        .upsert({ name: tagName }, { onConflict: "name" })
        .select()
        .single<TagsTable>();

      if (tagError) throw tagError;

      const { error: linkError } = await supabase
        .from("note_tags")
        .insert({ note_id: note.id, tag_id: tag.id });

      if (linkError) throw linkError;
    }
  }

  const { data: noteWithTags, error: fetchError } = await supabase
    .from("notes")
    .select(
      `
      *,
      tags:note_tags(
        tag:tags(name)
      )
    `
    )
    .eq("id", note.id)
    .single<NoteWithTags>();

  if (fetchError) throw fetchError;
  return noteWithTags;
}

export async function getNotes(
  supabase: SupabaseClientType,
  params: GetNotesParams
): Promise<NoteWithTags[]> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const response = await supabase
    .from("notes")
    .select(
      `
      *,
      tags:note_tags(
        tag:tags(name)
      )
    `
    )
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .returns<NoteWithTags[]>();

  if (response.error) throw response.error;

  const data = response.data;

  if (params.searchQuery && data) {
    const searchLower = params.searchQuery.toLowerCase();
    return data.filter((note) => {
      const hasMatchingTitleOrContent =
        note.title.toLowerCase().includes(searchLower) ||
        note.content.toLowerCase().includes(searchLower);

      const hasMatchingTag = note.tags?.some((tagRelation) =>
        tagRelation.tag.name.toLowerCase().includes(searchLower)
      );

      return hasMatchingTitleOrContent || hasMatchingTag;
    });
  }

  return data;
}

export async function updateNote(
  supabase: SupabaseClientType,
  params: UpdateNoteParams
): Promise<NoteWithTags> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { error: noteError } = await supabase
    .from("notes")
    .update({
      ...(params.title && { title: params.title }),
      ...(params.content && { content: params.content }),
      ...(params.status && { status: params.status }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .eq("user_id", userId)
    .select()
    .single<NotesTable>();

  if (noteError) throw noteError;

  if (params.tags !== undefined) {
    await supabase.from("note_tags").delete().eq("note_id", params.id);

    for (const tagName of params.tags) {
      const { data: tag, error: tagError } = await supabase
        .from("tags")
        .upsert({ name: tagName }, { onConflict: "name" })
        .select()
        .single<TagsTable>();

      if (tagError) throw tagError;

      const { error: linkError } = await supabase
        .from("note_tags")
        .insert({ note_id: params.id, tag_id: tag.id });

      if (linkError) throw linkError;
    }
  }

  const { data: noteWithTags, error: fetchError } = await supabase
    .from("notes")
    .select(
      `
      *,
      tags:note_tags(
        tag:tags(name)
      )
    `
    )
    .eq("id", params.id)
    .single<NoteWithTags>();

  if (fetchError) throw fetchError;
  if (!noteWithTags) throw new Error("Failed to fetch updated note");

  return noteWithTags;
}

export async function archiveNote(
  supabase: SupabaseClientType,
  noteId: string
): Promise<NoteWithTags> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { error: updateError } = await supabase
    .from("notes")
    .update({
      status: "archived",
      updated_at: new Date().toISOString(),
    })
    .eq("id", noteId)
    .eq("user_id", userId);

  if (updateError) throw updateError;

  const { data: noteWithTags, error: fetchError } = await supabase
    .from("notes")
    .select(
      `
      *,
      tags:note_tags(
        tag:tags(name)
      )
    `
    )
    .eq("id", noteId)
    .single<NoteWithTags>();

  if (fetchError) throw fetchError;
  if (!noteWithTags) throw new Error("Failed to fetch archived note");

  return noteWithTags;
}

export async function deleteNote(
  supabase: SupabaseClientType,
  noteId: string
): Promise<boolean> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", noteId)
    .eq("user_id", userId);

  if (error) throw error;
  return true;
}

type TagFilterType = "all" | "any";

export async function getNotesByTags(
  supabase: SupabaseClientType,
  tags: string[],
  filterType: TagFilterType = "any"
): Promise<NoteWithTags[]> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("notes")
    .select(
      `
      *,
      tags:note_tags(
        tag:tags(name)
      )
    `
    )
    .eq("user_id", userId)
    .returns<NoteWithTags[]>();

  if (error) throw error;
  if (!data) return [];

  return data.filter((note) => {
    const noteTags = note.tags.map((t) => t.tag.name);
    if (filterType === "all") {
      return tags.every((tag) => noteTags.includes(tag));
    } else {
      return tags.some((tag) => noteTags.includes(tag));
    }
  });
}

interface GetPaginatedNotesParams {
  limit: number;
  offset: number;
  status?: Note["status"];
  searchQuery?: string;
}

export async function getPaginatedNotes(
  supabase: SupabaseClientType,
  params: GetPaginatedNotesParams
): Promise<{ data: NoteWithTags[]; count: number }> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const countQuery = supabase
    .from("notes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (params.status) {
    countQuery.eq("status", params.status);
  }

  if (params.searchQuery) {
    countQuery.or(
      `title.ilike.%${params.searchQuery}%,content.ilike.%${params.searchQuery}%`
    );
  }

  const { count, error: countError } = await countQuery;

  if (countError) throw countError;

  const query = supabase
    .from("notes")
    .select(
      `
      *,
      tags:note_tags(
        tag:tags(name)
      )
    `
    )
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .range(params.offset, params.offset + params.limit - 1);

  if (params.status) {
    query.eq("status", params.status);
  }

  if (params.searchQuery) {
    query.or(
      `title.ilike.%${params.searchQuery}%,content.ilike.%${params.searchQuery}%`
    );
  }

  const { data, error } = await query.returns<NoteWithTags[]>();

  if (error) throw error;

  return {
    data: data || [],
    count: count || 0,
  };
}
