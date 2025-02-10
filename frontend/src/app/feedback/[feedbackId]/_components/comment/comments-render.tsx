"use client";

import { CommentHelper } from "@/shared/helper/comment-helper";
import { CommentUnit } from "./comment-unit";
import { CommentResponse } from "@/shared/types/comment-type";
import { useMemo } from "react";
import { Separator } from "@/components/ui/separator";

interface CommentsRenderProps {
  feedbackId: string;
  result: CommentResponse[];
}

export function CommentsRender(props: Readonly<CommentsRenderProps>) {
  const { feedbackId, result } = props;

  const { factory, getCommentsWithReplies } = new CommentHelper();

  const commentsList = useMemo(() => {
    const comments = factory(result);
    const flatComments = getCommentsWithReplies(comments);

    return flatComments.map((comment, index) => (
      <div key={comment.id} className="flex flex-col gap-y-6 list-none">
        <CommentUnit
          feedbackId={feedbackId}
          comment={comment}
          maxLength={flatComments.length}
        />

        {index !== flatComments.length - 1 && <Separator />}
      </div>
    ));
  }, [feedbackId, result]);

  return <ul className="flex flex-col gap-y-6">{commentsList}</ul>;
}
