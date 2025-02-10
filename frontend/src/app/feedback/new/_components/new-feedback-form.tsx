"use client";

import { SystemDropdown } from "@/components/inputs/system-dropdown";
import { SystemInput } from "@/components/inputs/system-input";
import { SystemTextArea } from "@/components/inputs/system-textarea";
import { SystemDescription } from "@/components/inputs/utilities/system-description";
import { SystemLabel } from "@/components/inputs/utilities/system-label";
import { SystemButton } from "@/components/system-button";
import {
  NewFeedbackFormValues,
  newFeedbackValidation,
} from "@/shared/validations/new-feedback-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface NewFeedbackFormProps {
  onSubmit: (data: NewFeedbackFormValues) => Promise<void>;
}

export function NewFeedbackForm(props: Readonly<NewFeedbackFormProps>) {
  const { onSubmit } = props;

  const { control, formState, handleSubmit } = useForm<NewFeedbackFormValues>({
    mode: "all",
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: zodResolver(newFeedbackValidation),
  });

  return (
    <form
      className="w-full flex flex-col gap-y-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y-6">
        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <SystemLabel required htmlFor="title">
              Title
            </SystemLabel>
            <SystemDescription>
              Add a short, descriptive headline
            </SystemDescription>
          </div>

          <SystemInput control={control} name="title" />
        </fieldset>

        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <SystemLabel required htmlFor="title">
              Category
            </SystemLabel>
            <SystemDescription>
              Choose a category for your feedback
            </SystemDescription>
          </div>

          <SystemDropdown
            control={control}
            name="category"
            options={[
              { label: "Feature", value: 1 },
              { label: "Bug Report", value: 2 },
              { label: "Enhancement", value: 3 },
            ]}
            placeholder="Select a category"
          />
        </fieldset>

        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <SystemLabel required htmlFor="content">
              Feedback Detail
            </SystemLabel>
            <SystemDescription>
              Include any specific comments on what should be improved, added,
              etc.
            </SystemDescription>
          </div>

          <SystemTextArea control={control} name="content" />
        </fieldset>
      </div>

      <div className="flex flex-col sm:flex-row-reverse items-center justify-start gap-4">
        <SystemButton
          className="w-full hover:bg-[#C75AF6] px-6"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Add Feedback
        </SystemButton>

        <Link className="w-full sm:w-auto" href="/">
          <SystemButton
            className="w-full bg-[#3A4374] hover:bg-[#656EA3] px-6"
            type="button"
          >
            Cancel
          </SystemButton>
        </Link>
      </div>
    </form>
  );
}
