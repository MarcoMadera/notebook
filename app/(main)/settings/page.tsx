"use client";

import { ReactElement, useState } from "react";

import { useRouter } from "next/navigation";

import { FONT_OPTIONS, THEME_OPTIONS } from "./constants";
import OptionSettings from "./OptionSettings";

import { PasswordForm } from "./PasswordForm";

import { Font, Lock, Logout, Sun } from "@/app/ui/icons";
import { Divider } from "@/components/Divider";
import styles from "@/components/SidebarAllNotes.module.css";
import { SideBarItem } from "@/components/SideBarItem";
import { useTheme } from "@/hooks";
import { useFont } from "@/hooks/useFont";
import { validateFont, validateTheme } from "@/utils";
import { createClient } from "@/utils/supabase/client";

export default function Settings(): ReactElement {
  const [selected, setSelected] = useState("theme");

  const supabase = createClient();
  const router = useRouter();

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
            onClick={async () => {
              setSelected("logout");
              const { error } = await supabase.auth.signOut();
              if (error) {
                console.error("auth error signout");
                return;
              }
              router.push("/");
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
        <SelectedOption selected={selected} />
      </main>
    </div>
  );
}

function SelectedOption({ selected }: Readonly<{ selected: string }>) {
  const { theme, setTheme } = useTheme();
  const { font, setFont } = useFont();
  if (selected === "theme") {
    return (
      <OptionSettings
        key="theme-selection"
        name="theme-selection"
        ariaLabel="Apply theme changes"
        title="Color Theme"
        description="Choose your color theme:"
        legend="Theme Options"
        options={THEME_OPTIONS}
        validator={validateTheme}
        initialOption={theme}
        setOption={setTheme}
      />
    );
  }

  if (selected === "font") {
    return (
      <OptionSettings
        key="font-selection"
        name="font-selection"
        ariaLabel="Apply font changes"
        title="Font Theme"
        description="Choose your font theme:"
        legend="Font Options"
        options={FONT_OPTIONS}
        validator={validateFont}
        initialOption={font}
        setOption={setFont}
      />
    );
  }

  if (selected === "password") {
    return <PasswordForm />;
  }
  return null;
}
