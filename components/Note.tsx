"use client";
import React, { ReactElement, Ref, useEffect, useState } from "react";

import Link from "@tiptap/extension-link";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";

import Button from "./Button";
import { Divider } from "./Divider";
import styles from "./Note.module.css";
import { ScrollableContainer } from "./ScrollableContainer";

import { Clock, Status, Tag } from "@/app/ui/icons";
import { formatDate } from "@/utils/formatDate";
import { createClient } from "@/utils/supabase/client";
import { createNote, NoteWithTags, updateNote } from "@/utils/supabase/notes";

interface EditableNoteProps {
  note?: NoteWithTags;
  ref?: Ref<HTMLDivElement>;
  showStatus?: boolean;
}

const useEditableContent = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setValue(e.currentTarget.textContent ?? "");
  };
  return [value, handleInput] as const;
};
interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}
const ToolbarButton = ({ onClick, isActive, children }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`${styles.toolbarButton} ${isActive ? styles.active : ""}`}
  >
    {children}
  </button>
);

export function Note({
  note,
  ref,
  showStatus,
}: Readonly<EditableNoteProps>): ReactElement {
  const router = useRouter();
  const [title, handleTitleInput] = useEditableContent(note?.title ?? "");
  const [tags, handleTagsInput] = useEditableContent(
    note?.tags?.map((t) => t.tag.name).join(", ") ?? ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isEditFocus, setIsEditFocus] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditFocus) {
        e.stopPropagation();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true); // Use capture phase
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [isEditFocus]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        validate: (href) => /^https?:\/\//.test(href),
      }),
    ],
    content: note?.content ?? "",
    editorProps: {
      attributes: {
        class: styles.contentInput,
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
  });

  const handleSave = async () => {
    if (!title.trim() || !editor?.getHTML()) {
      return;
    }

    try {
      setIsSaving(true);
      const tagsList = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      if (note?.id) {
        await updateNote(supabase, {
          id: note.id,
          title,
          content: editor.getHTML(),
          tags: tagsList,
        });
      } else {
        await createNote(supabase, {
          title,
          content: editor.getHTML(),
          tags: tagsList,
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to save note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <main
      className={`col-span-6 col-start-4 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8 ${styles.container}`}
    >
      <article key={note?.id ?? "new note"} ref={ref} className={styles.note}>
        <header className={styles.header}>
          <div
            contentEditable
            onInput={handleTitleInput}
            className={styles.title}
            data-placeholder="Enter a title..."
            suppressContentEditableWarning
          >
            {note?.title ?? ""}
          </div>
          <div className={`${styles.subheader} text-preset-5`}>
            <div className={styles.subheaderContent}>
              <Tag /> Tags
            </div>
            <ScrollableContainer
              className={`${styles.subheaderContent} ${styles.headerTags}`}
            >
              <div
                contentEditable
                onInput={handleTagsInput}
                className={styles.tagInput}
                data-placeholder="Add tags separated by commas (e.g. Work, Planning)"
                suppressContentEditableWarning
              >
                {note?.tags?.map((t) => t.tag.name).join(", ") ?? ""}
              </div>
            </ScrollableContainer>
            {showStatus && (
              <>
                <div className={styles.subheaderContent}>
                  <Status /> Status
                </div>
                <span className={styles.subheaderContent}>
                  {note?.status ?? "Draft"}
                </span>
              </>
            )}
            <div className={styles.subheaderContent}>
              <Clock /> Last Edited
            </div>
            <time className={styles.subheaderContent}>
              {note?.updated_at
                ? formatDate(note.updated_at, "en")
                : "Not yet saved"}
            </time>
          </div>
        </header>
        <Divider />
        <div className={styles.toolbar}>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBold().run()}
            isActive={editor?.isActive("bold")}
          >
            B
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            isActive={editor?.isActive("italic")}
          >
            I
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleCode().run()}
            isActive={editor?.isActive("code")}
          >
            code
          </ToolbarButton>
          <div className={styles.toolbarDivider} />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            isActive={editor?.isActive("bulletList")}
          >
            listU
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            isActive={editor?.isActive("orderedList")}
          >
            listO
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            isActive={editor?.isActive("blockquote")}
          >
            quote
          </ToolbarButton>
          <div className={styles.toolbarDivider} />
          <ToolbarButton onClick={addLink} isActive={editor?.isActive("link")}>
            link
          </ToolbarButton>
          <div className={styles.toolbarDivider} />
          <ToolbarButton onClick={() => editor?.chain().focus().undo().run()}>
            undo
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().redo().run()}>
            Redo
          </ToolbarButton>
        </div>
        <ScrollableContainer className={styles.noteContent}>
          <EditorContent
            editor={editor}
            className={styles.editorContent}
            onFocus={() => {
              setIsEditFocus(true);
            }}
            onBlur={() => {
              setIsEditFocus(false);
            }}
          />
          {editor && (
            <BubbleMenu
              editor={editor}
              tippyOptions={{ duration: 100 }}
              className={styles.bubbleMenu}
            >
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive("bold")}
              >
                B
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive("italic")}
              >
                I
              </ToolbarButton>
              <ToolbarButton
                onClick={addLink}
                isActive={editor.isActive("link")}
              >
                link
              </ToolbarButton>
            </BubbleMenu>
          )}
        </ScrollableContainer>
      </article>
      <Divider />
      <footer className={styles.footer}>
        <Button
          type="button"
          variant="primary"
          style={{ width: "fit-content" }}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Note"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          style={{ width: "fit-content" }}
          onClick={handleCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
      </footer>
    </main>
  );
}
