import { z } from "zod";

const STATUS = ["suggestion", "planned", "in-progress", "live"] as const;

export const editFeedbackValidation = z.object({
  id: z.string().nonempty("Feedback ID is required"),
  title: z.string().nonempty("Can’t be empty"),
  content: z.string().nonempty("Can’t be empty"),
  category: z.number({ required_error: "Can’t be empty" }).int().positive(),
  status: z.enum(STATUS).nullable(),
  createdBy: z.string().nonempty("Created by is required"),
});

export type EditFeedbackValues = z.infer<typeof editFeedbackValidation>;
