"use client";

import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { memo, useMemo, useState } from "react";

interface LikeButtonProps {
  onUpvote: () => Promise<void>;
  upvotes: number;
}

const LikeButton = memo((props: Readonly<LikeButtonProps>) => {
  const { upvotes, onUpvote } = props;

  const [isUpvoted, setIsUpvoted] = useState(false);

  async function handleUpvote() {
    setIsUpvoted((isUpvoted) => !isUpvoted);
    await onUpvote();
  }

  function getFormattedUpvotes(votes: number): string {
    if (votes < 1000) return votes.toString();
    if (votes < 10000) return `${(votes / 1000).toFixed(1)}k`;
    if (votes < 100000) return `${Math.floor(votes / 1000)}k`;
    return "100k+";
  }

  const votesAsText = useMemo(() => getFormattedUpvotes(upvotes), [upvotes]);

  return (
    <button
      className={cn(
        "sm:w-12 bg-[#F2F4FE] hover:bg-[#CFD7FF] flex flex-row sm:flex-col items-center gap-2 py-1.5 sm:py-2 px-4 sm:px-2.5 rounded-[10px]",
        isUpvoted && "bg-[#4661E6] text-white"
      )}
      onClick={(event) => {
        event.preventDefault();
        handleUpvote();
      }}
    >
      <ChevronUp
        className={cn("text-[#4661E6]", isUpvoted && "text-white")}
        strokeWidth={4}
        size={14}
      />
      <span
        className={cn(
          "text-[13px] font-bold text-[#3A4374]",
          isUpvoted && "text-white"
        )}
        title={upvotes.toString() + " votes"}
      >
        {votesAsText}
      </span>
    </button>
  );
});

LikeButton.displayName = "LikeButton";

export { LikeButton };
