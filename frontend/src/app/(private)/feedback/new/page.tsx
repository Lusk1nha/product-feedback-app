import { GoBackLink } from "@/app/components/go-back";
import { Plus } from "lucide-react";
import { FeedbackTitle } from "../../../components/feedback-title";

import { NewFeedback } from "./_components/new-feedback";

export default function NewFeedbackPage() {
  return (
    <div className="w-full max-w-[372px] sm:max-w-[540px] h-full flex flex-col items-start gap-y-9 sm:gap-y-14">
      <GoBackLink href="/" />

      <div className="bg-white w-full h-full rounded-[10px] flex flex-col relative px-6 sm:px-[42px] py-11 gap-y-6 shadow-sm">
        <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center absolute -top-5 sm:-top-7">
          <Plus className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
        </div>

        <FeedbackTitle className="sm:text-2xl">
          Create New Feedback
        </FeedbackTitle>

        <NewFeedback />
      </div>
    </div>
  );
}
