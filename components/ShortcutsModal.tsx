import { ReactElement } from "react";

import { ShortcutConfig } from "@/types/shortcuts";

export function ShortcutsModal({
  isOpen,
  onClose,
  shortcuts,
}: Readonly<{
  isOpen: boolean;
  onClose: () => void;
  shortcuts: ShortcutConfig;
}>): ReactElement | null {
  if (!isOpen) return null;

  return (
    <div>
      Modal <button onClick={onClose}>close</button>
      {Object.values(shortcuts).map((shortcut) => {
        return (
          <div key={shortcut.key}>
            {shortcut.key} {shortcut.description}
          </div>
        );
      })}
    </div>
  );
}
