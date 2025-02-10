import { FeedbackStatusType } from "./shared/types/feedback-type";

type FEEDBACK_STATUS_SCHEMA_ITEM = {
  title: string;
  description: string;
  color: string;
};

export const FEEDBACK_STATUS_SCHEMA: Record<
  FeedbackStatusType,
  FEEDBACK_STATUS_SCHEMA_ITEM
> = {
  suggestion: {
    title: "Suggestion",
    description: "Ideas prioritized for research",
    color: "#F87070",
  },
  planned: {
    title: "Planned",
    description: "Ideas prioritized for research",
    color: "#F49F85",
  },
  "in-progress": {
    title: "In-Progress",
    description: "Currently being developed",
    color: "#AD1FEA",
  },
  live: {
    title: "Live",
    description: "Released features",
    color: "#62BCFA",
  },
};
