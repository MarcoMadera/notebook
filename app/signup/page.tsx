import { ReactElement } from "react";

import AuthLayout from "../layouts/auth-layout";
import { AuthPrompt } from "../login/AuthPrompt";
import { SignInAlternatives } from "../login/SignInAlternatives";
import { SignupForm } from "../ui/signup-form";

import { AuthHeader } from "@/components/AuthHeader";
import Card from "@/components/Card";
import { Divider } from "@/components/Divider";

export default function LoginPage(): ReactElement {
  return (
    <AuthLayout>
      <Card>
        <AuthHeader
          headeLine="Create Your Account"
          secondaryHeadLine="Sign up to start organizing your notes and boost your productivity."
        />
        <SignupForm />
        <Divider />
        <SignInAlternatives />
        <Divider />
        <AuthPrompt
          message="Already have an account?"
          linkText="Login"
          linkHref="/login"
        />
      </Card>
    </AuthLayout>
  );
}
