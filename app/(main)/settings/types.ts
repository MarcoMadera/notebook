import { ReactElement, SVGProps } from "react";

import { SVGRProps } from "@/app/ui/icons/types";
import { Theme } from "@/constants/theme";

export type ThemeOption = "light" | "dark" | "system";

export interface ThemeOptionConfig {
  id: Theme;
  title: string;
  description: string;
  Icon: (props: SVGProps<SVGSVGElement> & SVGRProps) => ReactElement;
}

export interface ThemeOptionProps {
  config: ThemeOptionConfig;
  isSelected: boolean;
  onSelect: (theme: ThemeOption) => void;
  name: string;
  Icon: (props: SVGProps<SVGSVGElement> & SVGRProps) => ReactElement;
}

export interface ThemeSettingsProps {
  onThemeChange?: (theme: ThemeOption) => void;
}
