interface FeedbackPageProps {
  children: React.ReactNode;
}

export default function FeedbackLayout(props: Readonly<FeedbackPageProps>) {
  const { children } = props;
  return <div className="bg-[#F7F8FD] w-full min-h-screen h-full flex justify-center p-6">{children}</div>;
}
