"use client";

import { NewFeedbackFormValues } from "@/shared/validations/new-feedback-validation";
import { NewFeedbackForm } from "./new-feedback-form";

export function NewFeedback() {
  async function onSubmit(data: NewFeedbackFormValues) {
    console.log(data);
  }

  return <NewFeedbackForm onSubmit={onSubmit} />;
}
