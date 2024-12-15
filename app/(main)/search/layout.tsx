import { PropsWithChildren, ReactElement } from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Notes",
  description: "Taking notes",
};

export default function RootLayout({
  children,
  sidebar,
}: Readonly<PropsWithChildren<{ sidebar: ReactElement }>>): ReactElement {
  return (
    <div className="grid-container grid-container--no-sidebar">
      {sidebar}
      {children}
    </div>
  );
}
