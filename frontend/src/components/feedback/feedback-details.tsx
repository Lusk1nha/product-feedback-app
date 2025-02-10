import { memo } from "react";

interface FeedbackDetailsProps {
  title: string;
  description: string;
  category: string;
}

const FeedbackDetails = memo((props: Readonly<FeedbackDetailsProps>) => {
  const { title, description, category } = props;

  return (
    <section className="flex flex-col gap-y-[9px]">
      <h4 className="text-[#3A4374] text-[13px] sm:text-lg font-bold">
        {title}
      </h4>

      <p className="text-[#647196] text-[13px] sm:text-base font-normal">
        {description}
      </p>

      <div className="bg-[#F2F4FF] w-fit sm:h-[30px] rounded-[10px] flex items-center justify-center px-4 py-1.5">
        <span className="text-[13px] font-semibold text-[#4661E6]">
          {category}
        </span>
      </div>
    </section>
  );
});

export { FeedbackDetails };
