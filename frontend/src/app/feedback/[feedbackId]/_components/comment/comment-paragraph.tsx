import { memo } from "react";

interface CommentParagraphProps {
  paragraph: string;
}

const CommentParagraph = memo((props: Readonly<CommentParagraphProps>) => {
  const { paragraph } = props;

  return (
    <p
      title={paragraph}
      className="text-[13px] sm:text-[15px] text-[#647196] font-normal"
    >
      {paragraph}
    </p>
  );
});

export { CommentParagraph };
