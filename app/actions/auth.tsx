"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
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
      data: ReturnType<typeof validateSignupForm>["formValues"];
    }
  | undefined;

async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  return baseUrl;
}

export async function login(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  const validated = validateSigninForm(formData);
  if ("errors" in validated) {
    return {
      data: validated.formValues,
      errors: validated.errors,
    };
  }

  const { error } = await supabase.auth.signInWithPassword(validated.data);

  if (error) {
    if (error.code === "invalid_credentials") {
      return {
        data: validated.formValues,
        message: "Invalid credentials",
      };
    }
    if (error.code === "email_not_confirmed") {
      return {
        data: validated.formValues,
        message: "Please confirm your email to be able to sign in",
      };
    }

    return {
      data: validated.formValues,
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
    return { data: validated.formValues, errors: validated.errors };
  }

  const { error } = await supabase.auth.signUp(validated.data);

  if (error) {
    return {
      data: validated.formValues,
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
  data: ReturnType<typeof validateForgotPasswordForm>["formValues"];
  message?: string;
}> {
  const supabase = await createClient();

  const validated = validateForgotPasswordForm(formData);

  if ("errors" in validated) {
    return {
      data: validated.formValues,
      errors: validated.errors,
    };
  }
  const baseUrl = await getBaseUrl();

  const { error } = await supabase.auth.resetPasswordForEmail(
    validated.data.email,
    {
      redirectTo: `${baseUrl}/auth/callback?next=/update-password`,
    }
  );

  if (error) {
    return {
      data: validated.formValues,
      message: "An error occurred.",
    };
  }

  return {
    data: validated.formValues,
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
  data: ReturnType<typeof validateUpdatePasswordForm>["formValues"];
  message?: string;
}> {
  const supabase = await createClient();

  const validated = validateUpdatePasswordForm(formData);

  if ("errors" in validated) {
    return { data: validated.formValues, errors: validated.errors };
  }

  const { error } = await supabase.auth.updateUser({
    password: validated.data.password,
  });

  if (error) {
    return { data: validated.formValues, message: "An error occurred." };
  }

  return { data: validated.formValues, message: "Password updated." };
}

export async function handleSignInWithGoogle(_: FormData): Promise<void> {
  const supabase = await createClient();

  const baseUrl = await getBaseUrl();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/auth/callback`,
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
