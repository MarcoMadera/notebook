"use client";

import { ReactElement, useActionState, useState } from "react";

import { useFormStatus } from "react-dom";

import { HidePassword, ShowPassword } from "./icons";

import TextInput from "./TextInput";

import { signup } from "@/app/actions/auth";
import { AuthForm } from "@/components/AuthForm";
import Button from "@/components/Button";

export function SignupForm(): ReactElement {
  const [state, action] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthForm action={action} noValidate>
      <TextInput
        label="Email address"
        id="email"
        name="email"
        autoComplete="email"
        defaultValue={
          typeof state?.data.email === "string" ? state?.data.email : ""
        }
        type="email"
        placeholder="email@example.com"
        hint={state?.errors?.email}
        error={!!state?.errors?.email}
      />
      <TextInput
        type={showPassword ? "text" : "password"}
        label="Password"
        id="password"
        name="password"
        autoComplete="new-password"
        aria-autocomplete="list"
        defaultValue={
          typeof state?.data.password === "string" ? state?.data.password : ""
        }
        rightIcon={showPassword ? <HidePassword /> : <ShowPassword />}
        onRightIconClick={() => setShowPassword(!showPassword)}
        hint={state?.errors?.password}
        error={!!state?.errors?.password}
      />
      <SubmitButton />
    </AuthForm>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant="primary">
      Sign Up
    </Button>
  );
}
