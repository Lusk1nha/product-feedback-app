"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";
import { CommentHeader } from "./comment-header";
import { ReplyForm } from "./reply-form";
import { useCallback, useMemo, useState } from "react";
import { Comment } from "@/shared/types/comment-type";
import { CommentParagraph } from "./comment-paragraph";
import { RenderReplies } from "./replies-render";
import { ReplyFormValues } from "@/shared/validations/reply-validation";

interface CommentUnitProps {
  feedbackId: string;
  comment: Comment;

  isReply?: boolean;

  maxLength?: number;
}

export function CommentUnit(props: Readonly<CommentUnitProps>) {
  const { feedbackId, comment, isReply } = props;

  const [isReplying, setIsReplying] = useState(false);

  async function handleReply(data: ReplyFormValues) {
    console.log("Replying to comment", { data });
  }

  const handleOpenReply = useCallback(() => {
    setIsReplying(true);
  }, [setIsReplying]);

  const initials = comment.getInitials();

  const hasReplies = comment?.replies.length > 0;

  return (
    <section className="flex flex-col gap-y-4 sm:gap-y-5">
      <div className="grid grid-cols-[40px_1fr] sm:grid-cols-[40px_1fr] sm:grid-rows-[40px_1fr] gap-x-4 gap-y-4 sm:gap-x-8 sm:gap-y-4">
        <div className="sm:row-span-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={"avatar"} />
            <AvatarFallback className="uppercase">{initials}</AvatarFallback>
          </Avatar>
        </div>

        <div className="sm:col-span-1">
          <CommentHeader
            name={"name"}
            username={"username"}
            feedbackId={feedbackId}
            onReplyClick={handleOpenReply}
          />
        </div>

        {!isReply && hasReplies && (
          <div className="h-full hidden sm:flex justify-center col-start-1 row-span-2">
            <Separator orientation="vertical" />
          </div>
        )}

        <div className="col-span-2 sm:col-span-1 sm:col-start-2">
          <CommentParagraph paragraph={comment.content} />
        </div>

        <RenderReplies feedbackId={feedbackId} replies={comment.replies} />

        {isReplying && (
          <div className="col-span-2 sm:col-span-1 sm:col-start-2">
            <ReplyForm onSubmit={handleReply} />
          </div>
        )}
      </div>
    </section>
  );
}
