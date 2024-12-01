"use client";

import { ReactElement, useActionState } from "react";

import { useFormStatus } from "react-dom";

import { signup } from "@/app/actions/auth";

export function SignupForm(): ReactElement {
  const [state, action] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" placeholder="email@example.com" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

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
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Sign Up
    </button>
  );
}
