import { ReactElement } from "react";

import { ForgotPassWordForm } from "../../ui/forgot-password-form";

import { AuthHeader } from "@/components/AuthHeader";

export default function LoginPage(): ReactElement {
  return (
    <>
      <AuthHeader
        headeLine="Forgotten your password?"
        secondaryHeadLine="Enter your email below, and we’ll send you a link to reset it."
      />
      <ForgotPassWordForm />
    </>
  );
}
