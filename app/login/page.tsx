import { ReactElement } from "react";

import Link from "next/link";

import { handleSignInWithGoogle } from "../actions/auth";
import AuthLayout from "../layouts/auth-layout";
import { SigninForm } from "../ui/signin-form";

export default function LoginPage(): ReactElement {
  return (
    <AuthLayout>
      <h1>Welcome to notes</h1>
      <p>Please log in to continue</p>
      <SigninForm />
      <form>
        <p>Or log in with:</p>
        <button formAction={handleSignInWithGoogle}>Google</button>
        <p>
          No account yet? <Link href="/signup">Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
