import { ReactElement } from "react";

import AuthLayout from "../layouts/auth-layout";
import { ForgotPassWordForm } from "../ui/forgot-password-form";

import { AuthHeader } from "@/components/AuthHeader";
import Card from "@/components/Card";

export default function LoginPage(): ReactElement {
  return (
    <AuthLayout>
      <Card>
        <AuthHeader
          headeLine="Forgotten your password?"
          secondaryHeadLine="Enter your email below, and we’ll send you a link to reset it."
        />
        <ForgotPassWordForm />
      </Card>
    </AuthLayout>
  );
}
