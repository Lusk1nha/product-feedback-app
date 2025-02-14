import { GoBackLink } from "@/app/components/go-back";

import Link from "next/link";
import { SystemButton } from "../system-button";

interface HeaderFeedbackProps {
  feedbackId: string;
}

export function HeaderFeedback(props: Readonly<HeaderFeedbackProps>) {
  const { feedbackId } = props;

  return (
    <header className="w-full flex items-center justify-between gap-4">
      <GoBackLink href="/" />

      <Link href={`/feedback/${feedbackId}/edit`}>
        <SystemButton
          type="button"
          className="bg-[#4661E6] hover:bg-[#7C91F9] px-6"
        >
          Edit Feedback
        </SystemButton>
      </Link>
    </header>
  );
}
