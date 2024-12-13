import { ReactElement } from "react";

import { Font, Lock, Logout, Sun } from "@/app/ui/icons";
import { Divider } from "@/components/Divider";
import styles from "@/components/SidebarAllNotes.module.css";
import { SideBarItem } from "@/components/SideBarItem";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home(): ReactElement {
  return (
    <div className="grid-container grid-container--no-sidebar">
      <aside
        className={
          "col-span-3 col-start-1 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8 "
        }
      >
        <ul className={`${styles.container} ${styles.group}`}>
          <SideBarItem href="/settings/theme" icon={<Sun />}>
            Color Theme
          </SideBarItem>
          <SideBarItem href="/settings/theme" icon={<Font />}>
            Font Theme
          </SideBarItem>
          <SideBarItem href="/settings/theme" icon={<Lock />}>
            Change Password
          </SideBarItem>
          <Divider />
          <SideBarItem icon={<Logout />} variant="button" type="button">
            Logout
          </SideBarItem>
        </ul>
      </aside>
      <main
        className={
          "col-span-6 col-start-4 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8"
        }
      >
        <ThemeToggle />
      </main>
    </div>
  );
}
