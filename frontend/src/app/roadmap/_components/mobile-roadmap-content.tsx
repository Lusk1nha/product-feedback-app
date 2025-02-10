"use client";

import { SystemTabs, TabOption } from "@/components/system-tabs";
import { useCallback, useMemo, useState } from "react";
import { Roadmap, RoadmapList } from "./roadmap-list";
import {
  Feedback,
  FeedbackResponse,
  FeedbackStatusType,
} from "@/shared/types/feedback-type";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MobileRoadMapContentProps {
  tabs: TabOption[];
  feedbacksResponse: FeedbackResponse[];
}

export function MobileRoadMapContent(
  props: Readonly<MobileRoadMapContentProps>
) {
  const { tabs, feedbacksResponse } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryCurrentTab = searchParams.get("tab") as FeedbackStatusType;

  const [currentTab, setCurrentTab] = useState<FeedbackStatusType>(
    queryCurrentTab ?? "in-progress"
  );

  const handleTabChange = useCallback(
    (value: string) => {
      setCurrentTab(value as FeedbackStatusType);
      router.push(pathname + `?tab=${value}`);
    },
    [setCurrentTab, router, pathname]
  );

  function mountRoadmap(
    status: FeedbackStatusType,
    title: string,
    description: string = "",
    feedbacks: Feedback[]
  ): Roadmap {
    return {
      status,
      title,
      description,
      feedbacks,
    };
  }

  const filteredFeedbacks = useMemo(() => {
    const filteredFeedbacks = feedbacksResponse.filter(
      (feedback) => feedback.status === currentTab
    );

    const feedbacks = filteredFeedbacks.map(
      (feedback) => new Feedback(feedback)
    );

    if (!filteredFeedbacks) {
      throw new Error("Feedbacks not found");
    }

    const tab = tabs.find((tab) => tab.value === currentTab);

    if (!tab) {
      throw new Error("Tab not found");
    }

    return mountRoadmap(
      tab.value as FeedbackStatusType,
      tab.label,
      tab.description,
      feedbacks
    );
  }, [feedbacksResponse, currentTab, tabs]);

  return (
    <div className="w-full h-full flex flex-col">
      <SystemTabs
        tabs={tabs}
        currentTab={currentTab}
        onChange={handleTabChange}
      />

      <div className="w-full h-full px-6 py-6">
        <RoadmapList roadmaps={[filteredFeedbacks]} />
      </div>
    </div>
  );
}
