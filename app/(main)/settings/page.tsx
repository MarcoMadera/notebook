"use client";

import { ReactElement, useState } from "react";

import ThemeSettings from "./ThemeSettings";

import { Font, Lock, Logout, Sun } from "@/app/ui/icons";
import { Divider } from "@/components/Divider";
import styles from "@/components/SidebarAllNotes.module.css";
import { SideBarItem } from "@/components/SideBarItem";

export default function Settings(): ReactElement {
  const [selected, setSelected] = useState("theme");
  return (
    <div className="grid-container grid-container--no-sidebar">
      <aside
        className={
          "col-span-3 col-start-1 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8 "
        }
      >
        <ul className={`${styles.container} ${styles.group}`}>
          <SideBarItem
            icon={<Sun />}
            variant="button"
            type="button"
            onClick={() => {
              setSelected("theme");
            }}
            selected={selected === "theme"}
          >
            Color Theme
          </SideBarItem>
          <SideBarItem
            icon={<Font />}
            variant="button"
            type="button"
            onClick={() => {
              setSelected("font");
            }}
            selected={selected === "font"}
          >
            Font Theme
          </SideBarItem>
          <SideBarItem
            icon={<Lock />}
            variant="button"
            type="button"
            onClick={() => {
              setSelected("password");
            }}
            selected={selected === "password"}
          >
            Change Password
          </SideBarItem>
          <Divider />
          <SideBarItem
            icon={<Logout />}
            variant="button"
            type="button"
            onClick={() => {
              setSelected("logout");
            }}
            selected={selected === "logout"}
          >
            Logout
          </SideBarItem>
        </ul>
      </aside>
      <main
        className={
          "col-span-6 col-start-4 tablet:col-span-8 tablet:col-start-1 mobile:col-span-8"
        }
      >
        <ThemeSettings />
      </main>
    </div>
  );
}
