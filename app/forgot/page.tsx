import { ReactElement } from "react";

import { ForgotPassWordForm } from "../ui/forgot-password-form";

export default function LoginPage(): ReactElement {
  return (
    <div>
      <h1>Forgotten your password?</h1>
      <p>Enter your email below, and we’ll send you a link to reset it.</p>
      <ForgotPassWordForm />
    </div>
  );
}
