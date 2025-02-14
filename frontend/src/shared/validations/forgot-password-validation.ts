import { z } from "zod";

export const forgotPasswordValidation = z.object({
  email: z
    .string({
      required_error: "Can’t be empty",
    })
    .email("Invalid email address"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordValidation>;
