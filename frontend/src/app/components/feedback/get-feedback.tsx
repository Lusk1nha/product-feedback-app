import { Suspense } from "react";
import { FeedbackContent } from "./feedback-content";
import { FeedbackMockup } from "@/shared/mockups/feedback-mockup";

interface GetFeedbackProps {
  feedbackId: string;
}

export async function GetFeedback(props: Readonly<GetFeedbackProps>) {
  const { feedbackId } = props;

  const feedback = await new FeedbackMockup().generateOne({
    id: feedbackId,
  }).raw;

  return (
    <Suspense fallback={"Loading feedback..."}>
      <FeedbackContent feedback={feedback} upvotes={99} comments={4} />
    </Suspense>
  );
}
