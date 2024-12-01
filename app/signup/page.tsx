import { ReactElement } from "react";

import Link from "next/link";

import { handleSignInWithGoogle } from "../actions/auth";
import { SignupForm } from "../ui/signup-form";

export default function LoginPage(): ReactElement {
  return (
    <div>
      <h1>Create Your Account</h1>
      <p>Sign up to start organizing your notes and boost your productivity.</p>
      <SignupForm />
      <form>
        <p>Or log in with:</p>
        <button formAction={handleSignInWithGoogle}>Google</button>
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
