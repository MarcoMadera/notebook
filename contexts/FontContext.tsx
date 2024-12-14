"use client";

import React, { createContext, ReactElement, useEffect, useMemo } from "react";

import { FONT_FAMILY_MAP } from "@/app/(main)/settings/constants";
import { FontContextType, FontFamily } from "@/app/(main)/settings/types";

export const FontContext = createContext<FontContextType | undefined>(
  undefined
);

export function FontProvider({
  children,
  initialFont = FontFamily.SansSerif,
}: Readonly<{
  children: React.ReactNode;
  initialFont?: FontFamily;
}>): ReactElement {
  const [font, setFont] = React.useState<FontFamily>(initialFont);

  useEffect(() => {
    document.body.style.fontFamily = FONT_FAMILY_MAP[font];
    document.cookie = `notes-font=${font};path=/`;
  }, [font]);

  const value = useMemo(() => ({ font, setFont }), [font]);

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
}
