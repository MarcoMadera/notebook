"use client";

import { ReactElement, useActionState } from "react";

import { useFormStatus } from "react-dom";

import TextInput from "./TextInput";

import { forgot } from "@/app/actions/auth";
import { AuthForm } from "@/components/AuthForm";
import Button from "@/components/Button";

export function ForgotPassWordForm(): ReactElement {
  const [state, action] = useActionState(forgot, undefined);

  return (
    <AuthForm action={action}>
      <TextInput
        label="Email address"
        id="email"
        name="email"
        type="email"
        placeholder="email@example.com"
        hint={state?.errors?.email}
        error={!!state?.errors?.email}
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
      Send Request Link
    </Button>
  );
}
