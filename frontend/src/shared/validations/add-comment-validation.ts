import { z } from "zod";

export const addCommentValidation = z.object({
  comment: z.string().nonempty("Can’t be empty").max(250, "Max 250 characters"),
});

export type AddCommentFormValues = z.infer<typeof addCommentValidation>;
