"use client";

import { EditFeedbackValues } from "@/shared/validations/edit-feedback-validation";
import { EditFeedbackForm } from "./edit-feedback-form";

interface EditFeedbackProps {
  feedbackId: string;
}

export function EditFeedback(props: Readonly<EditFeedbackProps>) {
  const { feedbackId } = props;

  async function onSubmit(data: EditFeedbackValues) {
    console.log(data);
  }

  async function onDelete() {
    console.log("Delete");
  }

  return (
    <EditFeedbackForm
      onSubmit={onSubmit}
      onDelete={onDelete}
      defaultValues={{
        id: feedbackId,
        title: "Test",
        content: "Test",
        category: 1,
        status: "suggestion",
        createdBy: "Test",
      }}
    />
  );
}
