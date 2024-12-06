import { Ref } from "react";

interface BaseShortcut {
  key: string;
  description: string;
  action: () => void;
  "aria-keyshortcuts": string;
  modifier?: "ctrl" | "alt" | "shift";
}

interface ShortcutWithRef extends BaseShortcut {
  ref: Ref<HTMLInputElement>;
}

interface ShortcutWithoutRef extends BaseShortcut {
  ref: null;
}

export type ShortcutConfig = {
  [ShortcutId.Search]: ShortcutWithRef;
  [ShortcutId.NewNote]: ShortcutWithoutRef;
  [ShortcutId.SaveNote]: ShortcutWithoutRef;
  [ShortcutId.ShowHelp]: ShortcutWithoutRef;
};
export enum ShortcutId {
  Search = "SEARCH",
  NewNote = "NEW_NOTE",
  SaveNote = "SAVE_NOTE",
  ShowHelp = "SHOW_HELP",
}
