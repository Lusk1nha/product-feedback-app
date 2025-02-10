import { z } from "zod";

export const replyValidation = z.object({
  comment: z.string().nonempty("Can’t be empty"),
});

export type ReplyFormValues = z.infer<typeof replyValidation>;
