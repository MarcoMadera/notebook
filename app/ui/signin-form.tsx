"use client";

import { ReactElement, useActionState, useState } from "react";

import { useFormStatus } from "react-dom";

import { HidePassword, ShowPassword } from "./icons";
import TextInput from "./TextInput";

import { login } from "@/app/actions/auth";
import { ALink } from "@/components/ALink";
import { AuthForm } from "@/components/AuthForm";
import Button from "@/components/Button";

export function SigninForm(): ReactElement {
  const [state, action] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthForm action={action} noValidate>
      <TextInput
        label="Email address"
        id="email"
        name="email"
        autoComplete="email"
        type="email"
        defaultValue={
          typeof state?.data.email === "string" ? state?.data.email : ""
        }
        placeholder="Email"
        hint={state?.errors?.email}
        error={!!state?.errors?.email}
      />
      <TextInput
        type={showPassword ? "text" : "password"}
        label="Password"
        id="password"
        name="password"
        defaultValue={
          typeof state?.data.password === "string" ? state?.data.password : ""
        }
        rightIcon={showPassword ? <HidePassword /> : <ShowPassword />}
        onRightIconClick={() => setShowPassword(!showPassword)}
        placeholder="Enter password"
        autoComplete="current-password"
        hint={state?.errors?.password}
        error={!!state?.errors?.password}
        labelAction={
          <ALink href="./forgot" variant="action">
            Forgot
          </ALink>
        }
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
      Login
    </Button>
  );
}
