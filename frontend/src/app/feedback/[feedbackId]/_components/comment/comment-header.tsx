"use client";

import { memo } from "react";

interface CommentHeaderProps {
  feedbackId: string;

  name: string;
  username: string;

  onReplyClick: () => void;
}

const CommentHeader = memo((props: Readonly<CommentHeaderProps>) => {
  const { name, username, onReplyClick } = props;

  return (
    <div className="w-full flex items-center justify-between gap-x-4">
      <div className="flex items-center gap-x-4 sm:gap-x-8">
        <div className="flex flex-col">
          <h5 className="text-[13px] sm:text-sm text-[#3A4374] font-bold">
            {name}
          </h5>
          <p className="text-[13px] sm:text-sm text-[#647196] font-normal">
            @{username}
          </p>
        </div>
      </div>

      <button
        className="text-[13px] sm:text-sm text-[#4661E6] font-semibold hover:underline"
        type="button"
        onClick={onReplyClick}
      >
        Reply
      </button>
    </div>
  );
});

export { CommentHeader };
