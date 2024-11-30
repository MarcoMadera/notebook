"use server";

import {
  SignupFormSchema,
  FormState,
  ForgotPasswordSchema,
  UpdatePasswordSchema,
} from "@/app/lib/definitions";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(_: FormState, formData: FormData) {
  const supabase = await createClient();
  const {
    data: credentials,
    error: credentialError,
    success,
  } = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!success) {
    return {
      errors: credentialError.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    if (error.code === "invalid_credentials") {
      return {
        message: "Invalid credentials",
      };
    }
    if (error.code === "email_not_confirmed") {
      return {
        message: "Please confirm your email to be able to sign in",
      };
    }

    return {
      message: "An error occurred while sign in.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(_: FormState, formData: FormData) {
  const supabase = await createClient();

  const {
    data: credentials,
    error: credentialError,
    success,
  } = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!success) {
    return {
      errors: credentialError.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.auth.signUp(credentials);

  if (error) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function forgot(_: FormState, formData: FormData) {
  const supabase = await createClient();

  const {
    data: credentials,
    error: credentialError,
    success,
  } = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!success) {
    return {
      errors: credentialError.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(
    credentials.email,
    {
      redirectTo: "http://localhost:3000/auth/callback?next=/update-password",
    }
  );

  if (error) {
    return {
      message: "An error occurred.",
    };
  }

  return {
    message: "An email was sent to your email.",
  };
}
export async function updatePassword(_: FormState, formData: FormData) {
  const supabase = await createClient();

  const {
    data: credentials,
    error: credentialError,
    success,
  } = UpdatePasswordSchema.safeParse({
    password: formData.get("password"),
  });

  if (!success) {
    return {
      errors: credentialError.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: credentials.password,
  });

  if (error) {
    return {
      message: "An error occurred.",
    };
  }

  return {
    message: "Password updated.",
  };
}

export async function handleSignInWithGoogle(_: FormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
