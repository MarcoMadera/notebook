import { ReactElement } from "react";

import { UpdatePassWordForm } from "../ui/update-password-form";

export default function UpdatePassword(): ReactElement {
  return (
    <div>
      <h1>Reset Your Password</h1>
      <p>Choose a new password to secure your account.</p>
      <UpdatePassWordForm />
    </div>
  );
}
