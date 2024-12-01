"use client";

import { ReactElement, useActionState } from "react";

import { useFormStatus } from "react-dom";

import Input from "./input";

import { login } from "@/app/actions/auth";

export function SigninForm(): ReactElement {
  const [state, action] = useActionState(login, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email address</label>
        <Input id="email" name="email" type="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <a href="./forgot">Forgot</a>
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
      Sign In
    </button>
  );
}
