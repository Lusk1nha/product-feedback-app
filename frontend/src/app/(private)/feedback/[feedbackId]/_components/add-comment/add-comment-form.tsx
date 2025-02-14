"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { SystemTextArea } from "../../../../../components/inputs/system-textarea";
import {
  AddCommentFormValues,
  addCommentValidation,
} from "@/shared/validations/add-comment-validation";
import { SystemButton } from "@/app/components/system-button";

interface AddCommentFormProps {
  onSubmit: (data: AddCommentFormValues) => Promise<void>;
}

const MAX_COMMENT_LENGTH = 250;

export function AddCommentForm(props: Readonly<AddCommentFormProps>) {
  const { onSubmit } = props;

  const { control, handleSubmit, formState, watch } =
    useForm<AddCommentFormValues>({
      mode: "onBlur",
      resolver: zodResolver(addCommentValidation),
      defaultValues: {
        comment: "",
      },
    });

  const comment = watch("comment");

  const charactersLeft =
    MAX_COMMENT_LENGTH - comment.length < 0
      ? 0
      : MAX_COMMENT_LENGTH - comment.length;

  const { isSubmitting, isLoading, isValid } = formState;

  async function handleAddComment(data: AddCommentFormValues) {
    try {
      const payload = addCommentValidation.parse(data);
      await onSubmit(payload);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <form
      className="w-full flex flex-col items-start justify-between gap-4"
      onSubmit={handleSubmit(handleAddComment)}
    >
      <SystemTextArea<AddCommentFormValues>
        name="comment"
        control={control}
        placeholder="Type your comment here..."
      />

      <div className="w-full flex flex-wrap justify-between items-center gap-4">
        <p className="text-[13px] text-[#647196] font-normal">
          {charactersLeft} Characters left
        </p>

        <SystemButton
          type="submit"
          className="min-w-[117px] w-full sm:w-auto h-10 sm:h-11 bg-[#AD1FEA] hover:bg-[#C75AF6] text-white px-6"
          disabled={isSubmitting || isLoading || !isValid}
        >
          Post Comment
        </SystemButton>
      </div>
    </form>
  );
}
