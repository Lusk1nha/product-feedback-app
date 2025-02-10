import { z } from "zod";

export const newFeedbackValidation = z.object({
  title: z.string().nonempty("Can’t be empty"),
  content: z.string().nonempty("Can’t be empty"),
  category: z.number({ required_error: "Can’t be empty" }).int().positive(),
});

export type NewFeedbackFormValues = z.infer<typeof newFeedbackValidation>;
