"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  FieldErrors,
  FormError,
  validateForgotPasswordForm,
  validateSigninForm,
  validateSignupForm,
  validateUpdatePasswordForm,
} from "@/app/lib/definitions";

import { createClient } from "@/utils/supabase/server";

export type FormState =
  | {
      errors?: FieldErrors;
      message?: string;
    }
  | undefined;

export async function login(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  const validated = validateSigninForm(formData);
  if ("errors" in validated) {
    return {
      errors: validated.errors,
    };
  }

  const { error } = await supabase.auth.signInWithPassword(validated.data);

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

export async function signup(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  const validated = validateSignupForm(formData);

  if ("errors" in validated) {
    return {
      errors: validated.errors,
    };
  }

  const { error } = await supabase.auth.signUp(validated.data);

  if (error) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function forgot(
  _: FormState,
  formData: FormData
): Promise<{
  errors?: {
    email?: FormError[];
  };
  message?: string;
}> {
  const supabase = await createClient();

  const validated = validateForgotPasswordForm(formData);

  if ("errors" in validated) {
    return {
      errors: validated.errors,
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(
    validated.data.email,
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
export async function updatePassword(
  _: FormState,
  formData: FormData
): Promise<{
  errors?: {
    password?: FormError[];
  };
  message?: string;
}> {
  const supabase = await createClient();

  const validated = validateUpdatePasswordForm(formData);

  if ("errors" in validated) {
    return {
      errors: validated.errors,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: validated.data.password,
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

export async function handleSignInWithGoogle(_: FormData): Promise<void> {
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
