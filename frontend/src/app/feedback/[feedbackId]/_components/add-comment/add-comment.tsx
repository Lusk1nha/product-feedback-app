"use client";

import { AddCommentFormValues } from "@/shared/validations/add-comment-validation";
import { AddCommentForm } from "./add-comment-form";
import { FeedbackTitle } from "../../../../../components/feedback-title";

interface AddCommentProps {
  feedbackId: string;
}

export function AddComment(props: Readonly<AddCommentProps>) {
  const { feedbackId } = props;

  async function handleAddComment(payload: AddCommentFormValues) {
    console.log("Adding comment", {
      feedbackId,
      payload,
    });
  }

  return (
    <div className="bg-white w-full flex flex-col py-6 px-6 md:px-8 rounded-[10px] gap-y-6">
      <div className="w-full flex items-center">
        <FeedbackTitle>Add Comment</FeedbackTitle>
      </div>

      <AddCommentForm onSubmit={handleAddComment} />
    </div>
  );
}
