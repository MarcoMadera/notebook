"use client";

import { useFormStatus } from "react-dom";
import { updatePassword } from "@/app/actions/auth";
import { useActionState } from "react";

export function UpdatePassWordForm() {
  const [state, action] = useActionState(updatePassword, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton />

      {state?.message && <p>{state.message}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Reset Password
    </button>
  );
}
