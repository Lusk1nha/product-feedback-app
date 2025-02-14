import { FeedbackTitle } from "@/app/components/feedback-title";
import { GoBackLink } from "@/app/components/go-back";
import { PencilIcon } from "@/app/components/icons/pencil-icon";

import { EditFeedback } from "./_components/edit-feedback";

type FeedbackPageParams = {
  feedbackId: string;
};

interface EditFeedbackPageProps {
  params: Promise<FeedbackPageParams>;
}

export default async function EditFeedbackPage({
  params,
}: EditFeedbackPageProps) {
  const { feedbackId } = await params;

  return (
    <div className="w-full max-w-[372px] sm:max-w-[540px] h-full flex flex-col items-start gap-y-9 sm:gap-y-14">
      <GoBackLink href={"/feedback/" + feedbackId} />

      <div className="bg-white w-full h-full rounded-[10px] flex flex-col relative px-6 py-11 sm:px-[42px] gap-y-6 shadow-sm">
        <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center absolute -top-5 sm:-top-7">
          <PencilIcon className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>

        <FeedbackTitle className="sm:text-2xl">
          Editing ‘Add a dark theme option’
        </FeedbackTitle>

        <EditFeedback feedbackId={feedbackId} />
      </div>
    </div>
  );
}
