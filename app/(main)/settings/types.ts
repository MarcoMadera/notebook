import { ReactElement, SVGProps } from "react";

import { SVGRProps } from "@/app/ui/icons/types";

export type ThemeOption = "light" | "dark" | "system";

export interface OptionConfig<T = string> {
  id: T;
  title: string;
  description: string;
  Icon: (props: SVGProps<SVGSVGElement> & SVGRProps) => ReactElement;
}

export interface ThemeOptionProps {
  config: OptionConfig;
  isSelected: boolean;
  handleChange: (id: string) => void;
  name: string;
  Icon: (props: SVGProps<SVGSVGElement> & SVGRProps) => ReactElement;
}

export interface OptionSettingsProps<T = string> {
  onChange?: (option: T) => void;
  options: OptionConfig[];
  initialOption: T;
  setOption: (option: T) => void;
  validator: (value: string) => T;
  ariaLabel: string;
  name: string;
  legend: string;
  title: string;
  description: string;
}

export enum FontFamily {
  SansSerif = "sans-serif",
  Serif = "serif",
  MonoSpace = "monospace",
}

export interface FontContextType {
  font: FontFamily;
  setFont: (font: FontFamily) => void;
}
