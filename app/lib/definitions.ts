import { z } from "zod";

export enum ValidationType {
  Hint = "hint",
  Instruction = "instruction",
}
export interface FormError {
  id: string;
  message: string;
  type: ValidationType;
}
export interface FieldErrors {
  email?: FormError[];
  password?: FormError[];
}

const VALIDATIONS = {
  email: {
    message: "Please enter a valid email address.",
    id: "invalid-email",
    type: ValidationType.Hint,
  },
  passwordInstruction: {
    id: "password-instruction",
    message: "Your password must:",
    type: ValidationType.Instruction,
  },
  passwordLength: {
    messageMulti: "Be at least 8 characters long.",
    message: "Password must be at least 8 characters long.",
    id: "password-length",
    type: ValidationType.Hint,
  },
  passwordLetter: {
    messageMulti: "Contain at least one letter.",
    message: "Password must contain at least one letter.",
    id: "password-letter",
    type: ValidationType.Hint,
  },
  passwordNumber: {
    messageMulti: "Contain at least one number.",
    message: "Password must contain at least one number.",
    id: "password-number",
    type: ValidationType.Hint,
  },
  passwordSpecial: {
    messageMulti: "Contain at least one special character.",
    message: "Password must contain at least one special character",
    id: "password-special",
    type: ValidationType.Hint,
  },
};

const createErrorMessage = (
  errorId: keyof typeof VALIDATIONS,
  isMulti?: boolean
) => `error:${errorId}:${isMulti ? "Multi" : ""}`;

const emailSchema = z
  .string()
  .email({ message: createErrorMessage("email") })
  .trim();
const passwordSchema = z
  .string()
  .trim()
  .superRefine((val, ctx) => {
    const errors: (keyof typeof VALIDATIONS)[] = [];

    if (val.length < 8) errors.push("passwordLength");
    if (!/[a-zA-Z]/.test(val)) errors.push("passwordLetter");
    if (!/\d/.test(val)) errors.push("passwordNumber");
    if (!/[^a-zA-Z0-9]/.test(val)) errors.push("passwordSpecial");

    if (errors.length === 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: createErrorMessage(errors[0], false),
      });
    } else if (errors.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: createErrorMessage("passwordInstruction"),
      });
      errors.forEach((error) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: createErrorMessage(error, true),
        });
      });
    }
  });

function parseErrorString(errorString: string): FormError {
  const [_, errorId, type = ""] = errorString.split(":");
  const validation = VALIDATIONS[errorId as keyof typeof VALIDATIONS];
  const isMulti = type === "Multi";

  if (isMulti && "messageMulti" in validation) {
    return {
      ...validation,
      message: validation["messageMulti"],
    };
  }

  return (
    validation || {
      id: `unknown-${errorId || "error"}`,
      message: errorString,
      type: ValidationType.Hint,
    }
  );
}

function transformZodErrors<T extends Record<string, any>>(
  error: z.ZodError<T>
): Partial<Record<keyof T, FormError[]>> | undefined {
  const fieldErrors: Partial<Record<keyof T, FormError[]>> = {};

  error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof T;
    if (!field) return;
    fieldErrors[field] = fieldErrors[field] || [];
    fieldErrors[field]?.push(parseErrorString(issue.message));
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
        formValues: { [K in keyof z.infer<T>]?: FormDataEntryValue | null };
        errors: Partial<Record<keyof z.TypeOf<T>, FormError[]>> | undefined;
      }
    | {
        formValues: { [K in keyof z.infer<T>]?: FormDataEntryValue | null };
        data: z.TypeOf<T>;
      } => {
    type SchemaType = z.infer<T>;
    type Shape = T["shape"];

    type Keys = keyof Shape;
    const formValues: { [K in keyof SchemaType]?: FormDataEntryValue | null } =
      {};
    const keys = Object.keys(schema.shape) as Keys[];

    keys.forEach((key) => {
      formValues[key as keyof SchemaType] = formData.get(key as string);
    });

    const result = schema.safeParse(formValues);

    if (!result.success) {
      return {
        formValues: formValues,
        errors: transformZodErrors<SchemaType>(result.error),
      };
    }

    return { formValues: formValues, data: result.data as SchemaType };
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
    ["confirm-password"]: passwordSchema,
  })
);
