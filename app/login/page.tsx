import { ReactElement } from "react";

import Link from "next/link";

import { handleSignInWithGoogle } from "../actions/auth";
import AuthLayout from "../layouts/auth-layout";
import { Google } from "../ui/icons";
import { SigninForm } from "../ui/signin-form";

import Button from "@/components/Button";

export default function LoginPage(): ReactElement {
  return (
    <AuthLayout>
      <h1 className="text-preset-1">Welcome to notes</h1>
      <p className="text-preset-5">Please log in to continue</p>
      <SigninForm />
      <form>
        <p className="text-preset-5">Or log in with:</p>
        <Button formAction={handleSignInWithGoogle} variant="secondary">
          <Google /> Google
        </Button>
        <p>
          No account yet? <Link href="/signup">Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
