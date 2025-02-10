"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { SystemTextArea } from "../../../../../components/inputs/system-textarea";
import { toast } from "sonner";
import {
  ReplyFormValues,
  replyValidation,
} from "@/shared/validations/reply-validation";

interface ReplyFormProps {
  onSubmit: (data: ReplyFormValues) => Promise<void>;
}

export function ReplyForm(props: Readonly<ReplyFormProps>) {
  const { onSubmit } = props;

  const { control, handleSubmit, formState } = useForm<ReplyFormValues>({
    mode: "onBlur",
    resolver: zodResolver(replyValidation),
    defaultValues: {
      comment: "",
    },
  });

  const { isSubmitting, isLoading, isValid } = formState;

  async function handleReply(data: ReplyFormValues) {
    try {
      const payload = replyValidation.parse(data);
      await onSubmit(payload);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <form
      className="w-full flex flex-col sm:flex-row items-start justify-between gap-4"
      onSubmit={handleSubmit(handleReply)}
    >
      <SystemTextArea<ReplyFormValues>
        name="comment"
        control={control}
        placeholder="Reply to this comment..."
      />

      <button
        type="submit"
        className="min-w-[117px] w-full sm:w-auto h-10 sm:h-11 bg-[#AD1FEA] text-[13px] sm:text-sm md:text-[15px] font-medium text-white px-2 rounded-[10px] cursor-pointer disabled:bg-[#E0DBF7] disabled:cursor-not-allowed"
        disabled={isSubmitting || isLoading || !isValid}
      >
        Post Reply
      </button>
    </form>
  );
}
