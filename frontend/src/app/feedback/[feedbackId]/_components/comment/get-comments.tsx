import { Comment, CommentResponse } from "@/shared/types/comment-type";
import { CommentsRender } from "./comments-render";

interface GetCommentsProps {
  feedbackId: string;
}

export async function GetComments(props: Readonly<GetCommentsProps>) {
  const { feedbackId } = props;

  const comments = [
    {
      id: "1e8d7c6b5a49382716f5e4d3c2b1a0f9",
      feedbackId: "d5019a5e780a4c3f8d5d2c5a4e3b8f9c",
      createdBy: "a3f8d5e780a4c3f8d5d2c5a4e3b8f9c1",
      parentCommentId: null,
      content:
        "Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.",
      createdAt: "2023-01-01T10:00:00Z",
      updatedAt: "2023-01-01T10:00:00Z",
    },
    {
      id: "2e9d8c7b6a5949382716f5e4d3c2b1a0",
      feedbackId: "d5019a5e780a4c3f8d5d2c5a4e3b8f9c",
      createdBy: "b4e6f5e780a4c3f8d5d2c5a4e3b8f9c2",
      parentCommentId: null,
      content:
        "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
      createdAt: "2023-01-02T11:30:00Z",
      updatedAt: "2023-01-02T11:30:00Z",
    },
    {
      id: "3f0e9d8c7b6a5949382716f5e4d3c2b1",
      feedbackId: "e612f5e780a4c3f8d5d2c5a4e3b8f9c2",
      createdBy: "c5f7e6d780a4c3f8d5d2c5a4e3b8f9c3",
      parentCommentId: "2e9d8c7b6a5949382716f5e4d3c2b1a0",
      content: `@hummingbird1  While waiting for dark mode, there are browser extensions that will also do the job. Search for "dark theme” followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.`,
      createdAt: "2023-01-03T14:15:00Z",
      updatedAt: "2023-01-03T14:15:00Z",
    },
    {
      id: "4g1f0e9d8c7b6a5949382716f5e4d3c2",
      feedbackId: "e612f5e780a4c3f8d5d2c5a4e3b8f9c2",
      createdBy: "d6g8f7e6d780a4c3f8d5d2c5a4e3b8f9c4",
      parentCommentId: "2e9d8c7b6a5949382716f5e4d3c2b1a0",
      content: `@annev1990  Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.`,
      createdAt: "2023-01-04T15:45:00Z",
      updatedAt: "2023-01-04T15:45:00Z",
    },
  ] as CommentResponse[];

  return (
    <div className="bg-white w-full flex flex-col py-6 px-6 md:px-8 rounded-[10px] gap-y-6">
      <div className="w-full flex items-center">
        <h2 className="text-lg text-[#3A4374] font-bold">4 Comments</h2>
      </div>

      <CommentsRender feedbackId={feedbackId} result={comments} />
    </div>
  );
}
