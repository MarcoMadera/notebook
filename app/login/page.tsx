import { ReactElement } from "react";

import Link from "next/link";

import { handleSignInWithGoogle } from "../actions/auth";
import AuthLayout from "../layouts/auth-layout";
import { Google } from "../ui/icons";
import { SigninForm } from "../ui/signin-form";

import { AuthHeader } from "@/components/AuthHeader";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { Hr } from "@/components/Hr";

export default function LoginPage(): ReactElement {
  return (
    <AuthLayout>
      <Card>
        <AuthHeader
          headeLine="Welcome to notes"
          secondaryHeadLine="Please log in to continue"
        />
        <SigninForm />
        <Hr />
        {/* TODO: Move this to single components */}
        <form>
          <p
            className="text-preset-5 alignCenter"
            style={{
              color: "var(--neutral-600)",
              marginBottom: "var(--spacing-200)",
              marginTop: "var(--spacing-100)",
            }}
          >
            Or log in with:
          </p>
          <Button formAction={handleSignInWithGoogle} variant="secondary">
            <Google /> Google
          </Button>
        </form>
        <Hr />
        <p className="text-preset-5 alignCenter">
          <span
            style={{
              color: "var(--neutral-600)",
            }}
          >
            No account yet?
          </span>{" "}
          <Link href="/signup">Sign up</Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
