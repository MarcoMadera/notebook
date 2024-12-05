import { type ReactElement } from "react";

import styles from "./SignInAlternatives.module.css";
import { handleSignInWithGoogle } from "../../actions/auth";

import { Google } from "../../ui/icons";

import Button from "@/components/Button";

export function SignInAlternatives(): ReactElement {
  return (
    <form>
      <p
        className={`text-preset-5 alignCenter ${styles["SignInAlternatives-text"]}`}
      >
        Or log in with:
      </p>
      <Button formAction={handleSignInWithGoogle} variant="border">
        <Google /> Google
      </Button>
    </form>
  );
}
