import { ReactElement } from "react";

import AuthLayout from "../layouts/auth-layout";
import { UpdatePassWordForm } from "../ui/update-password-form";

import { AuthHeader } from "@/components/AuthHeader";
import Card from "@/components/Card";

export default function UpdatePassword(): ReactElement {
  return (
    <AuthLayout>
      <Card>
        <AuthHeader
          headeLine="Reset Your Password"
          secondaryHeadLine="Choose a new password to secure your account."
        />
        <UpdatePassWordForm />
      </Card>
    </AuthLayout>
  );
}
