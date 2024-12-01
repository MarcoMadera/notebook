"use client";

import { ReactElement, useActionState } from "react";

import { useFormStatus } from "react-dom";

import { forgot } from "@/app/actions/auth";

export function ForgotPassWordForm(): ReactElement {
  const [state, action] = useActionState(forgot, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" placeholder="email@example.com" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <SubmitButton />

      {state?.message && <p>{state.message}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Send Request Link
    </button>
  );
}
