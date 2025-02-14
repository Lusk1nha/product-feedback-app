import { TabOption } from "@/app/components/system-tabs";
import { MobileRoadMapContent } from "./mobile-roadmap-content";
import { FeedbackMockup } from "@/shared/mockups/feedback-mockup";
import { DesktopRoadmapContent } from "./desktop-roadmap-content";
import { Suspense } from "react";

const TABS_STATUS: TabOption[] = [
  {
    label: "Planned",
    value: "planned",
    description: "Ideas prioritized for research",
  },
  {
    label: "In-Progress",
    value: "in-progress",
    description: "Currently being developed",
  },
  { label: "Live", value: "live", description: "Released features" },
];

export async function RoadmapContent() {
  const feedbacks = new FeedbackMockup()
    .generateMany(10)
    .map((feedback) => feedback.raw);

  return (
    <>
      <div className="hidden md:flex">
        <DesktopRoadmapContent
          feedbacksResponse={feedbacks}
          tabs={TABS_STATUS}
        />
      </div>

      <div className="flex md:hidden">
        <Suspense>
          <MobileRoadMapContent
            feedbacksResponse={feedbacks}
            tabs={TABS_STATUS}
          />
        </Suspense>
      </div>
    </>
  );
}
