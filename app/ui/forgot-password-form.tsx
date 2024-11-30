"use client";

import { useFormStatus } from "react-dom";
import { forgot } from "@/app/actions/auth";
import { useActionState } from "react";

export function ForgotPassWordForm() {
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
