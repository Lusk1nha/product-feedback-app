"use client";

import { useState } from "react";
import { SystemButton } from "../system-button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

interface EditFeedbackAlertDialogProps {
  onSubmit: () => Promise<void>;
  children: string;
  disabled?: boolean;
}

export function EditFeedbackAlertDialog(
  props: Readonly<EditFeedbackAlertDialogProps>
) {
  const { onSubmit, children, disabled } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <SystemButton
        type="button"
        className="w-full bg-[#3A4374] hover:bg-[#656EA3] px-6"
        onClick={() => setIsOpen(true)}
        disabled={disabled}
      >
        {children}
      </SystemButton>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Feedback</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to edit this feedback?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
