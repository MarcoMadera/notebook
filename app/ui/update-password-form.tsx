"use client";

import { ReactElement, useActionState, useState } from "react";

import { useFormStatus } from "react-dom";

import { HidePassword, ShowPassword } from "./icons";
import TextInput from "./TextInput";

import { updatePassword } from "@/app/actions/auth";
import { AuthForm } from "@/components/AuthForm";
import Button from "@/components/Button";

export function UpdatePassWordForm(): ReactElement {
  const [state, action] = useActionState(updatePassword, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <AuthForm action={action}>
      <TextInput
        type={showPassword ? "text" : "password"}
        label="New Password"
        id="password"
        name="password"
        rightIcon={showPassword ? <HidePassword /> : <ShowPassword />}
        onRightIconClick={() => setShowPassword(!showPassword)}
        hint={
          state?.errors?.password?.length
            ? state?.errors?.password
            : "At least 8 characters"
        }
        error={!!state?.errors?.password}
      />
      <TextInput
        type={showConfirmPassword ? "text" : "password"}
        label="Confirm New Password"
        id="confirm-password"
        name="confirm-password"
        rightIcon={showConfirmPassword ? <HidePassword /> : <ShowPassword />}
        onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        hint={state?.errors?.password}
        error={!!state?.errors?.password}
      />
      <SubmitButton />

      {state?.message && <p>{state.message}</p>}
    </AuthForm>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant="primary">
      Reset Password
    </Button>
  );
}
