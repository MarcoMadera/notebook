import { isInEnum } from "./isInEnum";

import { FontFamily } from "@/app/(main)/settings/types";

export function validateFont(value?: string | null): FontFamily {
  if (value && isInEnum(value, FontFamily)) {
    return value;
  }

  return FontFamily.SansSerif;
}
