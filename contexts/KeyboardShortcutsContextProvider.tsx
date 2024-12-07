"use client";

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { ShortcutsModal } from "@/components/ShortcutsModal";
import { ShortcutConfig, ShortcutId } from "@/types/shortcuts";
import { hasVimium } from "@/utils/hasVimium";

export type KeyboardShortcutContextType = {
  searchRef: Ref<HTMLInputElement> | null;
  showHelp: boolean;
  setShowHelp: (show: boolean) => void;
  shortcuts: ShortcutConfig;
};

export const KeyboardShortcutContext = createContext<
  KeyboardShortcutContextType | undefined
>(undefined);

export function KeyboardShortcutsProvider({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [showHelp, setShowHelp] = useState(false);

  const shortcuts: ShortcutConfig = useMemo(
    () => ({
      [ShortcutId.Search]: {
        key: "/",
        description: "Focus search",
        action: () => searchRef.current?.focus(),
        "aria-keyshortcuts": "/",
        ref: searchRef,
      },
      [ShortcutId.NewNote]: {
        key: "n",
        description: "New note",
        action: () => router.push("/new"),
        "aria-keyshortcuts": "n",
        ref: null,
      },
      [ShortcutId.SaveNote]: {
        key: "s",
        description: "Save Note",
        modifier: "ctrl",
        action: () => router.push("/new"),
        "aria-keyshortcuts": "ctrl+s",
        ref: null,
      },
      [ShortcutId.ShowHelp]: {
        key: "?",
        description: "Show keyboard shortcuts",
        modifier: "shift",
        action: () => {
          setShowHelp(true);
        },
        "aria-keyshortcuts": "shift+?",
        ref: null,
      },
    }),
    [router]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      Object.values(shortcuts).forEach(({ action, key, modifier }) => {
        const modifierPressed = modifier ? event[`${modifier}Key`] : true;
        if (event.key.toLowerCase() === key.toLowerCase() && modifierPressed) {
          event.preventDefault();
          action();
        }
      });
    },
    [shortcuts]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    console.log("hasVimium", hasVimium());
  }, [shortcuts]);

  const value = useMemo(
    () => ({ searchRef, showHelp, setShowHelp, shortcuts }),
    [setShowHelp, showHelp, shortcuts]
  );

  return (
    <KeyboardShortcutContext.Provider value={value}>
      {children}
      <ShortcutsModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        shortcuts={shortcuts}
      />
    </KeyboardShortcutContext.Provider>
  );
}
