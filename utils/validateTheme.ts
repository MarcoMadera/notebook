import { isInEnum } from "./isInEnum";

import { DEFAULT_THEME, Theme } from "@/constants/theme";

export function validateTheme(value?: string): Theme {
  if (isInEnum(value, Theme)) {
    return value;
  }

  return DEFAULT_THEME;
}
