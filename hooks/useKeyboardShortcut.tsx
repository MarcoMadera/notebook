import { useCustomContext } from "./useCustomContext";

import { KeyboardShortcutContext } from "@/contexts/KeyboardShortcutsContextProvider";
import { ShortcutConfig, ShortcutId } from "@/types/shortcuts";

export function useKeyboardShortcut<T extends ShortcutId>(
  id: T
): ShortcutConfig[T] {
  const context = useCustomContext(KeyboardShortcutContext);

  const searchShortcut = context.shortcuts[id];
  return searchShortcut;
}
