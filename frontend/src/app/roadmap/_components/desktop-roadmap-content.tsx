"use client";

import { TabOption } from "@/components/system-tabs";
import {
  Feedback,
  FeedbackResponse,
  FeedbackStatusType,
} from "@/shared/types/feedback-type";
import { useMemo } from "react";
import { Roadmap, RoadmapList } from "./roadmap-list";

interface DesktopRoadMapContentProps {
  tabs: TabOption[];
  feedbacksResponse: FeedbackResponse[];
}

export function DesktopRoadmapContent(
  props: Readonly<DesktopRoadMapContentProps>
) {
  const { tabs, feedbacksResponse } = props;

  const roadmaps = useMemo(() => {
    const feedbacks = feedbacksResponse.map(
      (feedback) => new Feedback(feedback)
    );

    const roadmaps = tabs.map((tab) => {
      const filteredFeedbacks = feedbacks.filter(
        (feedback) => feedback.status === tab.value
      );

      return mountRoadmap(
        tab.value as FeedbackStatusType,
        tab.label,
        tab.description,
        filteredFeedbacks
      );
    });

    return roadmaps;
  }, [feedbacksResponse]);

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

  return (
    <div className="w-full h-full flex py-8">
      <RoadmapList roadmaps={roadmaps} />
    </div>
  );
}
