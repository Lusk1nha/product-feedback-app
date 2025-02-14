"use client";

import { DeleteFeedbackAlertDialog } from "@/app/components/dialogs/delete-feedback-alert-dialog";
import { EditFeedbackAlertDialog } from "@/app/components/dialogs/edit-feedback-alert-dialog";
import {
  SystemDropdown,
  SystemDropdownOption,
} from "@/app/components/inputs/system-dropdown";
import { SystemInput } from "@/app/components/inputs/system-input";
import { SystemTextArea } from "@/app/components/inputs/system-textarea";
import { SystemDescription } from "@/app/components/inputs/utilities/system-description";
import { SystemLabel } from "@/app/components/inputs/utilities/system-label";
import { SystemButton } from "@/app/components/system-button";

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
        <DeleteFeedbackAlertDialog onDelete={onDelete}>
          Delete
        </DeleteFeedbackAlertDialog>

        <div className="flex flex-col sm:flex-row-reverse items-center justify-start gap-4">
          <EditFeedbackAlertDialog
            onSubmit={() => handleSubmit(onSubmit)()}
            disabled={!formState.isDirty || !formState.isValid}
          >
            Save Changes
          </EditFeedbackAlertDialog>

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
