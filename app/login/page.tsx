import { handleSignInWithGoogle } from "../actions/auth";
import { SigninForm } from "../ui/signin-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1>Welcome to notes</h1>
      <p>Please log in to continue</p>
      <SigninForm />
      <form>
        <p>Or log in with:</p>
        <button formAction={handleSignInWithGoogle}>Google</button>
        <p>
          No account yet? <Link href="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
