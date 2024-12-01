"use client";

import { ReactElement, useActionState, useState } from "react";

import { useFormStatus } from "react-dom";

import { HidePassword, ShowPassword } from "./icons";
import styles from "./SignUpForm.module.css";
import TextInput from "./TextInput";

import { login } from "@/app/actions/auth";
import Button from "@/components/Button";

export function SigninForm(): ReactElement {
  const [state, action] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className={styles.form}>
      <div>
        <label htmlFor="email">Email address</label>
        <TextInput
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          hint={state?.errors?.email}
          error={!!state?.errors?.email}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <TextInput
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          rightIcon={showPassword ? <ShowPassword /> : <HidePassword />}
          onRightIconClick={() => setShowPassword(!showPassword)}
          placeholder="Enter password"
          hint={state?.errors?.password}
          error={!!state?.errors?.password}
        />
        <a href="./forgot">Forgot</a>
      </div>
      <SubmitButton />

      {state?.message && <p>{state.message}</p>}
    </form>
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
