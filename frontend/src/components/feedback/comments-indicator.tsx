import { MessageCircle } from "lucide-react";
import { memo } from "react";

interface CommentsIndicatorProps {
  comments: number;
}

const CommentsIndicator = memo((props: Readonly<CommentsIndicatorProps>) => {
  const { comments } = props;

  return (
    <div className="flex items-center justify-between gap-x-4">
      <div className="flex items-center gap-x-1">
        <MessageCircle className="w-4 sm:w-5 text-[#CDD2EE] fill-[#CDD2EE]" />
        <span className="text-[13px] font-bold text-[#3A4374]">{comments}</span>
      </div>
    </div>
  );
});

CommentsIndicator.displayName = "CommentsIndicator";

export { CommentsIndicator };
