import { ThemeOptionConfig } from "./types";

import { Moon, Sun, Systemtheme } from "@/app/ui/icons";
import { Theme } from "@/constants/theme";

export const THEME_OPTIONS: ThemeOptionConfig[] = [
  {
    id: Theme.LIGHT,
    title: "Light Mode",
    description: "Pick a clean and classic light theme",
    Icon: Sun,
  },
  {
    id: Theme.DARK,
    title: "Dark Mode",
    description: "Select a sleek and modern dark theme",
    Icon: Moon,
  },
  {
    id: Theme.SYSTEM,
    title: "System",
    description: "Adapts to your device's theme",
    Icon: Systemtheme,
  },
] as const;
