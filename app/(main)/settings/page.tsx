"use client";

import { ReactElement, useActionState, useState } from "react";

import { useRouter } from "next/navigation";

import { FONT_OPTIONS, THEME_OPTIONS } from "./constants";
import OptionSettings from "./OptionSettings";

import { updatePassword } from "@/app/actions/auth";
import {
  Font,
  HidePassword,
  Lock,
  Logout,
  ShowPassword,
  Sun,
} from "@/app/ui/icons";
import TextInput from "@/app/ui/TextInput";
import Button from "@/components/Button";
import { Divider } from "@/components/Divider";
import styles from "@/components/SidebarAllNotes.module.css";
import { SideBarItem } from "@/components/SideBarItem";
import { useTheme } from "@/hooks";
import { useFont } from "@/hooks/useFont";
import { validateFont, validateTheme } from "@/utils";
import { createClient } from "@/utils/supabase/client";

export default function Settings(): ReactElement {
  const [selected, setSelected] = useState("theme");
  const { theme, setTheme } = useTheme();
  const { font, setFont } = useFont();
  const supabase = createClient();
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, action] = useActionState(updatePassword, undefined);

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
        {selected === "theme" ? (
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
        ) : selected === "font" ? (
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
        ) : selected === "password" ? (
          <form action={action} noValidate>
            <header>
              <h2>Change Password</h2>
            </header>
            <TextInput
              type={showOldPassword ? "text" : "password"}
              label="Old Password"
              id="old-password"
              name="old-password"
              autoComplete="current-password"
              aria-autocomplete="list"
              rightIcon={showOldPassword ? <HidePassword /> : <ShowPassword />}
              onRightIconClick={() => setShowOldPassword(!showOldPassword)}
              error={!!state?.errors?.password}
              hint={state?.errors?.password}
              defaultValue={
                typeof state?.data["password"] === "string"
                  ? state?.data["password"]
                  : ""
              }
            />
            <TextInput
              type={showPassword ? "text" : "password"}
              label="New Password"
              id="password"
              name="password"
              autoComplete="new-password"
              aria-autocomplete="list"
              rightIcon={showPassword ? <HidePassword /> : <ShowPassword />}
              onRightIconClick={() => setShowPassword(!showPassword)}
              hint={
                state?.errors?.password?.length
                  ? state?.errors?.password
                  : "At least 8 characters"
              }
              error={!!state?.errors?.password}
              defaultValue={
                typeof state?.data["password"] === "string"
                  ? state?.data["password"]
                  : ""
              }
            />
            <TextInput
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm New Password"
              id="confirm-password"
              name="confirm-password"
              autoComplete="new-password"
              rightIcon={
                showConfirmPassword ? <HidePassword /> : <ShowPassword />
              }
              onRightIconClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              defaultValue={
                typeof state?.data["confirm-password"] === "string"
                  ? state?.data["confirm-password"]
                  : ""
              }
              error={!!state?.errors?.password}
            />
            <Button variant="primary" type="submit" fullWidth={false}>
              Save Password
            </Button>
          </form>
        ) : null}
      </main>
    </div>
  );
}
