"use client";

import { ReactElement, useActionState, useState } from "react";

import { useFormStatus } from "react-dom";

import { updatePassword } from "@/app/actions/auth";
import { HidePassword, ShowPassword } from "@/app/ui/icons";
import TextInput from "@/app/ui/TextInput";
import Button from "@/components/Button";

export function PasswordForm(): ReactElement {
  const [state, action] = useActionState(updatePassword, undefined);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
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
        rightIcon={showConfirmPassword ? <HidePassword /> : <ShowPassword />}
        onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        defaultValue={
          typeof state?.data["confirm-password"] === "string"
            ? state?.data["confirm-password"]
            : ""
        }
        error={!!state?.errors?.password}
      />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="primary"
      type="submit"
      fullWidth={false}
      disabled={pending}
    >
      Save Password
    </Button>
  );
}
