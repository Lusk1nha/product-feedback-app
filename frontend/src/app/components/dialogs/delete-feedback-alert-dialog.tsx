"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { SystemButton } from "../system-button";

interface DeleteFeedbackAlertDialogProps {
  children: string;
  onDelete: () => Promise<void>;
  disabled?: boolean;
}

export function DeleteFeedbackAlertDialog(
  props: Readonly<DeleteFeedbackAlertDialogProps>
) {
  const { children, onDelete, disabled } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <SystemButton
        type="button"
        className="w-full bg-[#D73737] hover:bg-[#E98888] px-6 text-white"
        onClick={() => setIsOpen(true)}
        disabled={disabled}
      >
        {children}
      </SystemButton>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Feedback</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this feedback? <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
