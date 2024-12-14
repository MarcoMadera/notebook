import { FontFamily, OptionConfig } from "./types";

import {
  FontMonoSpace,
  FontSansSerif,
  FontSerif,
  Moon,
  Sun,
  Systemtheme,
} from "@/app/ui/icons";
import { Theme } from "@/constants/theme";

export const THEME_OPTIONS: OptionConfig<Theme>[] = [
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

export const FONT_OPTIONS: OptionConfig<FontFamily>[] = [
  {
    id: FontFamily.SansSerif,
    title: "Sans-serif",
    description: "Clean and modern, easy to read.",
    Icon: FontSansSerif,
  },
  {
    id: FontFamily.Serif,
    title: "Serif",
    description: "Classic and elegant for a timeless feel.",
    Icon: FontSerif,
  },
  {
    id: FontFamily.MonoSpace,
    title: "Monospace",
    description: "Code-like, great for a technical vibe.",
    Icon: FontMonoSpace,
  },
] as const;

export const FONT_FAMILY_MAP = {
  [FontFamily.SansSerif]:
    "var(--inter), sans-serif, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
  [FontFamily.Serif]:
    "var(--noto-serif), ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  [FontFamily.MonoSpace]:
    "var(--source-code-pro), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};
