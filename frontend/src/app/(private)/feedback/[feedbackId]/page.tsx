import { AddComment } from "./_components/add-comment/add-comment";
import { GetComments } from "./_components/comment/get-comments";

import { GetFeedback } from "../../../components/feedback/get-feedback";
import { HeaderFeedback } from "../../../components/feedback/header-feedback";

type FeedbackPageParams = {
  feedbackId: string;
};

interface FeedbackPageProps {
  params: Promise<FeedbackPageParams>;
}

export default async function FeedbackPage({ params }: FeedbackPageProps) {
  const { feedbackId } = await params;

  return (
    <div className="w-full max-w-[372px] sm:max-w-[689px] md:max-w-[730px] h-full flex flex-col items-center gap-y-6">
      <HeaderFeedback feedbackId={feedbackId} />

      <GetFeedback feedbackId={feedbackId} />
      <GetComments feedbackId={feedbackId} />

      <AddComment feedbackId={feedbackId} />
    </div>
  );
}
