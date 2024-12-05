import { ReactElement } from "react";

import { SignupForm } from "../../ui/signup-form";
import { AuthPrompt } from "../login/AuthPrompt";
import { SignInAlternatives } from "../login/SignInAlternatives";

import { AuthHeader } from "@/components/AuthHeader";
import { Divider } from "@/components/Divider";

export default function LoginPage(): ReactElement {
  return (
    <>
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
    </>
  );
}
