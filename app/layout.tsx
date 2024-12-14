import { ReactElement } from "react";

import type { Metadata, Viewport } from "next";

import localFont from "next/font/local";
import { cookies } from "next/headers";

import { FONT_FAMILY_MAP } from "./(main)/settings/constants";

import { Theme } from "@/constants/theme";
import { FontProvider } from "@/contexts/FontContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { validateFont, validateTheme } from "@/utils";

import "./globals.css";

const inter = localFont({
  src: "./fonts/inter/Inter-VariableFont_opsz,wght.ttf",
  variable: "--inter",
  weight: "100 900",
});
const notoSerif = localFont({
  src: "./fonts/noto-serif/NotoSerif-VariableFont_wdth,wght.ttf",
  variable: "--noto-serif",
  weight: "100 900",
});
const sourceCodePro = localFont({
  src: "./fonts/source-code-pro/SourceCodePro-VariableFont_wght.ttf",
  variable: "--source-code-pro",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Notes",
  description: "Taking notes",
};

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "cyan" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    colorScheme: "dark light",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<ReactElement> {
  const cookieStore = await cookies();
  const theme = validateTheme(cookieStore.get("notes-theme")?.value);
  const font = validateFont(cookieStore.get("notes-font")?.value);
  const systemTheme = validateTheme(cookieStore.get("system-theme")?.value);

  return (
    <html lang="en" data-theme={theme === Theme.SYSTEM ? systemTheme : theme}>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${sourceCodePro.variable}`}
        style={{ fontFamily: FONT_FAMILY_MAP[font] }}
      >
        <FontProvider initialFont={font}>
          <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
        </FontProvider>
      </body>
    </html>
  );
}
