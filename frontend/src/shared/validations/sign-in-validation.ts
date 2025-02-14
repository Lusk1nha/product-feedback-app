import { z } from "zod";

export const signInValidation = z.object({
  email: z
    .string({
      required_error: "Can’t be empty",
    })
    .email("Invalid email address"),
  password: z.string().nonempty("Can’t be empty"),
});

export type SignInFormValues = z.infer<typeof signInValidation>;
