import { ReactElement } from "react";

import type { Metadata } from "next";

import styles from "./page.module.css";

import { PageHeader } from "@/components/PageHeader";
import { SideBarNavigation } from "@/components/SidebarNavigation";
export const metadata: Metadata = {
  title: "Notes",
  description: "Taking notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <div className={`${styles.page} grid-container grid-container--sidebar`}>
      <SideBarNavigation />
      <div className="col-span-11 col-start-2 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8">
        <PageHeader />
        {children}
      </div>
    </div>
  );
}
