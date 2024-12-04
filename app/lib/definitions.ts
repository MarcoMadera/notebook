import { z } from "zod";

export interface FormError {
  id: string;
  message: string;
  type: "inline-hint" | "instruction";
}
export interface FieldErrors {
  email?: FormError[];
  password?: FormError[];
}

const VALIDATIONS = {
  email: {
    message: "Please enter a valid email address.",
    id: "invalid-email",
    type: "inline-hint",
  },
  passwordLength: {
    message: "Be at least 8 characters long",
    id: "password-length",
    type: "inline-hint",
  },
  passwordLetter: {
    message: "Contain at least one letter.",
    id: "password-letter",
    type: "inline-hint",
  },
  passwordNumber: {
    message: "Contain at least one number.",
    id: "password-number",
    type: "inline-hint",
  },
  passwordSpecial: {
    message: "Contain at least one special character.",
    id: "password-special",
    type: "inline-hint",
  },
};

const emailSchema = z
  .string()
  .email({ message: VALIDATIONS.email.message })
  .trim();
const passwordSchema = z
  .string()
  .min(8, { message: VALIDATIONS.passwordLength.message })
  .regex(/[a-zA-Z]/, { message: VALIDATIONS.passwordLetter.message })
  .regex(/\d/, { message: VALIDATIONS.passwordNumber.message })
  .regex(/[^a-zA-Z0-9]/, { message: VALIDATIONS.passwordSpecial.message })
  .trim();

function getErrorConfig(message: string): FormError {
  const validation = Object.values(VALIDATIONS).find(
    (v) => v.message === message
  ) as FormError | undefined;

  return (
    validation || {
      id: "unknown-error",
      message,
      type: "inline-hint",
    }
  );
}

function transformZodErrors<T extends Record<string, any>>(
  error: z.ZodError<T>
): Partial<Record<keyof T, FormError[]>> | undefined {
  const fieldErrors: Partial<Record<keyof T, FormError[]>> = {};

  error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof T;
    if (field) {
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field]?.push(getErrorConfig(issue.message));
    }
  });

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined;
}

export function createFormValidator<T extends z.ZodObject<z.ZodRawShape, any>>(
  schema: T
) {
  return (
    formData: FormData
  ):
    | {
        errors: Partial<Record<keyof z.TypeOf<T>, FormError[]>> | undefined;
      }
    | {
        data: z.TypeOf<T>;
      } => {
    type SchemaType = z.infer<T>;
    type Shape = T["shape"];

    const formValues: { [K in keyof SchemaType]?: unknown } = {};

    type Keys = keyof Shape;
    const keys = Object.keys(schema.shape) as Keys[];

    keys.forEach((key) => {
      formValues[key as keyof SchemaType] = formData.get(key as string);
    });

    const result = schema.safeParse(formValues);

    if (!result.success) {
      return {
        errors: transformZodErrors<SchemaType>(result.error),
      };
    }

    return { data: result.data as SchemaType };
  };
}

export const validateSigninForm = createFormValidator(
  z.object({
    email: emailSchema,
    password: passwordSchema,
  })
);

export const validateSignupForm = createFormValidator(
  z.object({
    email: emailSchema,
    password: passwordSchema,
  })
);

export const validateForgotPasswordForm = createFormValidator(
  z.object({
    email: emailSchema,
  })
);

export const validateUpdatePasswordForm = createFormValidator(
  z.object({
    password: passwordSchema,
  })
);
