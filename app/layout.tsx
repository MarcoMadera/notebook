import type { Metadata } from "next";
import localFont from "next/font/local";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoSerif.variable} ${sourceCodePro.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
