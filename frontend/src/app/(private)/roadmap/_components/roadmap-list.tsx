import Link from "next/link";

import { Feedback, FeedbackStatusType } from "@/shared/types/feedback-type";
import { RoadmapFeedback } from "./roadmap-feedback";

export type Roadmap = {
  title: string;
  status: FeedbackStatusType;
  description: string;

  feedbacks: Feedback[];
};

interface RoadmapListProps {
  roadmaps: Roadmap[];
}

export function RoadmapList(props: Readonly<RoadmapListProps>) {
  const { roadmaps } = props;

  return (
    <div className="flex gap-x-2.5">
      {roadmaps.map((roadmap) => (
        <RoadmapItem key={roadmap.status} roadmap={roadmap} />
      ))}
    </div>
  );
}

interface RoadmapItemProps {
  roadmap: Roadmap;
}

function RoadmapItem(props: Readonly<RoadmapItemProps>) {
  const { roadmap } = props;

  return (
    <div className="w-full h-full flex flex-col gap-y-6">
      <div className="w-full flex flex-col gap-y-1">
        <h4 className="text-[#3A4374] text-lg font-semibold">
          {roadmap.title}
        </h4>
        <p className="text-[#647196] text-[13px] font-normal">
          {roadmap.description}
        </p>
      </div>

      <ul className="flex flex-col gap-y-4">
        {roadmap.feedbacks.map((feedback) => (
          <li key={feedback.id}>
            <Link href={`/feedback/${feedback.id}`} key={feedback.id}>
              <RoadmapFeedback feedback={feedback} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
