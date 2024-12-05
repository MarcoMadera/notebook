import { ReactElement } from "react";

import { UpdatePassWordForm } from "../../ui/update-password-form";

import { AuthHeader } from "@/components/AuthHeader";

export default function UpdatePassword(): ReactElement {
  return (
    <>
      <AuthHeader
        headeLine="Reset Your Password"
        secondaryHeadLine="Choose a new password to secure your account."
      />
      <UpdatePassWordForm />
    </>
  );
}
