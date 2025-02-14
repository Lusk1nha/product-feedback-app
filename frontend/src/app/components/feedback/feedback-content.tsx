"use client";

import { Feedback, FeedbackResponse } from "@/shared/types/feedback-type";
import { CommentsIndicator } from "./comments-indicator";
import { FeedbackDetails } from "./feedback-details";
import { LikeButton } from "./like-button";

interface FeedbackContentProps {
  feedback: FeedbackResponse;

  upvotes: number;

  comments: number;
}

export function FeedbackContent(props: Readonly<FeedbackContentProps>) {
  const { feedback, upvotes, comments } = props;

  const { title, content, categoryId } = new Feedback(feedback);

  async function handleUpvote() {
    console.log(`Upvoting feedback with id: ${feedback.id}`);
  }

  return (
    <div className="bg-white w-full py-6 px-6 md:px-8 rounded-[10px]">
      <div className="w-full h-full grid grid-cols-2 grid-rows-2 sm:flex items-start justify-between  gap-4">
        <div className="row-start-3 flex items-center justify-start">
          <LikeButton onUpvote={handleUpvote} upvotes={upvotes} />
        </div>

        <div className="w-full col-span-2 row-span-2">
          <FeedbackDetails
            title={title}
            description={content}
            category={categoryId}
          />
        </div>

        <div className="h-full row-start-3 flex items-center justify-end">
          <CommentsIndicator comments={comments} />
        </div>
      </div>
    </div>
  );
}
