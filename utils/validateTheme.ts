import { isInEnum } from "./isInEnum";

import { DEFAULT_THEME, Theme } from "@/constants/theme";

export function validateTheme(value?: string | null): Theme {
  if (value && isInEnum(value, Theme)) {
    return value;
  }

  return DEFAULT_THEME;
}
