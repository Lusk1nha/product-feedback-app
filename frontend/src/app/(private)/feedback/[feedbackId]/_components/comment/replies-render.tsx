import { Comment } from "@/shared/types/comment-type";
import { memo } from "react";
import { CommentUnit } from "./comment-unit";

interface RenderRepliesProps {
  feedbackId: string;
  replies: Comment[];
}

const RenderReplies = memo((props: Readonly<RenderRepliesProps>) => {
  const { feedbackId, replies } = props;

  if (replies.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col col-span-2 sm:col-span-1 sm:col-start-2 pl-6 sm:pl-0 gap-y-4">
      {replies?.map((reply) => (
        <CommentUnit
          key={reply.id}
          feedbackId={feedbackId}
          comment={reply}
          isReply
        />
      ))}
    </div>
  );
});

RenderReplies.displayName = "RenderReplies";

export { RenderReplies };
