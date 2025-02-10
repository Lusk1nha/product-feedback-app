"use client";

import {
  SystemDropdown,
  SystemDropdownOption,
} from "@/components/inputs/system-dropdown";
import { SystemInput } from "@/components/inputs/system-input";
import { SystemTextArea } from "@/components/inputs/system-textarea";
import { SystemDescription } from "@/components/inputs/utilities/system-description";
import { SystemLabel } from "@/components/inputs/utilities/system-label";
import { SystemButton } from "@/components/system-button";

import {
  editFeedbackValidation,
  EditFeedbackValues,
} from "@/shared/validations/edit-feedback-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface EditFeedbackFormProps {
  onSubmit: (data: EditFeedbackValues) => Promise<void>;
  onDelete: () => Promise<void>;

  defaultValues: EditFeedbackValues;
}

export function EditFeedbackForm(props: Readonly<EditFeedbackFormProps>) {
  const { onSubmit, onDelete, defaultValues } = props;

  const { control, formState, handleSubmit } = useForm<EditFeedbackValues>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: zodResolver(editFeedbackValidation),
  });

  const STATUS_OPTIONS: SystemDropdownOption[] = [
    { label: "Suggestion", value: "suggestion" },
    { label: "Planned", value: "planned" },
    { label: "In Progress", value: "in-progress" },
    { label: "Live", value: "live" },
  ] as const;

  return (
    <form
      className="w-full flex flex-col gap-y-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y-6">
        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <SystemLabel required htmlFor="title">
              Feedback Title
            </SystemLabel>
            <SystemDescription>
              Add a short, descriptive headline
            </SystemDescription>
          </div>

          <SystemInput control={control} name="title" />
        </fieldset>

        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <SystemLabel required htmlFor="category">
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
          />
        </fieldset>

        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <SystemLabel required htmlFor="status">
              Update Status
            </SystemLabel>
            <SystemDescription>Change feedback state</SystemDescription>
          </div>

          <SystemDropdown
            control={control}
            name="status"
            options={STATUS_OPTIONS}
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

      <div className="w-full flex flex-col-reverse justify-between gap-y-4 sm:flex-row sm:gap-x-4">
        <SystemButton
          type="button"
          className="w-full bg-[#D73737] hover:bg-[#E98888] px-6"
          onClick={onDelete}
        >
          Delete
        </SystemButton>

        <div className="flex flex-col sm:flex-row-reverse items-center justify-start gap-4">
          <SystemButton
            className="w-full hover:bg-[#C75AF6] px-6"
            type="submit"
            disabled={formState.isSubmitting || !formState.isDirty}
          >
            Save Changes
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
      </div>
    </form>
  );
}
