import { z } from "zod";

export const signUpValidation = z
  .object({
    email: z
      .string({
        required_error: "Can’t be empty",
      })
      .email("Invalid email address"),
    username: z
      .string({
        required_error: "Can’t be empty",
      })
      .nonempty("Can’t be empty"),
    password: z.string().nonempty("Can’t be empty"),
    confirmPassword: z.string().nonempty("Can’t be empty"),
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.password;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type SignUpFormValues = z.infer<typeof signUpValidation>;
