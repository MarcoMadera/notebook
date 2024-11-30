import { handleSignInWithGoogle } from "../actions/auth";
import { SignupForm } from "../ui/signup-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1>Create Your Account</h1>
      <p>Sign up to start organizing your notes and boost your productivity.</p>
      <SignupForm />
      <form>
        <p>Or log in with:</p>
        <button formAction={handleSignInWithGoogle}>Google</button>
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
