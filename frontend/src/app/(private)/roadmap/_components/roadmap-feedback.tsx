import { cn } from "@/lib/utils";
import { Feedback } from "@/shared/types/feedback-type";

import { FeedbackDetails } from "@/app/components/feedback/feedback-details";
import { LikeButton } from "@/app/components/feedback/like-button";
import { CommentsIndicator } from "@/app/components/feedback/comments-indicator";
import { FEEDBACK_STATUS_SCHEMA } from "@/constants";

interface RoadmapFeedbackProps {
  feedback: Feedback;
}

export function RoadmapFeedback(props: Readonly<RoadmapFeedbackProps>) {
  const { feedback } = props;

  const schema = FEEDBACK_STATUS_SCHEMA[feedback.status];

  async function handleUpvote() {
    console.log(`Upvoting feedback with id: ${feedback.id}`);
  }

  return (
    <div
      className="bg-white w-full min-h-[233px] sm:min-h-[251px] md:min-h-[272px] flex flex-col gap-y-4 md:gap-y-2 px-[25px] pt-4 pb-6 rounded-t-[5px] rounded-b-[10px] border-t-[6px] border-solid shadow-sm"
      style={{
        borderTopColor: schema.color,
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: schema.color }}
        />

        <p className={cn("text-[#647196] text-base font-normal")}>
          {schema.title}
        </p>
      </div>

      <section className="flex flex-col gap-y-4">
        <FeedbackDetails
          title={feedback.title}
          description={feedback.content}
          category={feedback.categoryId}
        />

        <div className="flex items-center justify-between gap-4">
          <LikeButton onUpvote={handleUpvote} upvotes={feedback.upvotes} />
          <CommentsIndicator comments={feedback.comments} />
        </div>
      </section>
    </div>
  );
}
