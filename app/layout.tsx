import { ReactElement } from "react";

import type { Metadata, Viewport } from "next";

import localFont from "next/font/local";
import { cookies } from "next/headers";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { validateTheme } from "@/utils";
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
  src: "./fonts/source-code-pro/SourceCodePro-Italic-VariableFont_wght.ttf",
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
  const theme = validateTheme(cookieStore.get("theme")?.value);

  return (
    <html lang="en" data-theme={theme}>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${sourceCodePro.variable}`}
      >
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
