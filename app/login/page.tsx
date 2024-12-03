import { ReactElement } from "react";

import { SignInAlternatives } from "./SignInAlternatives";
import { SignUpPrompt } from "./SignUpPrompt";
import AuthLayout from "../layouts/auth-layout";
import { SigninForm } from "../ui/signin-form";

import { AuthHeader } from "@/components/AuthHeader";
import Card from "@/components/Card";
import { Divider } from "@/components/Divider";

export default function LoginPage(): ReactElement {
  return (
    <AuthLayout>
      <Card>
        <AuthHeader
          headeLine="Welcome to notes"
          secondaryHeadLine="Please log in to continue"
        />
        <SigninForm />
        <Divider />
        <SignInAlternatives />
        <Divider />
        <SignUpPrompt />
      </Card>
    </AuthLayout>
  );
}
