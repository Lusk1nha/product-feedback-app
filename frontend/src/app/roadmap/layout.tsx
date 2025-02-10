interface RoadmapPageProps {
  children: React.ReactNode;
}

export default function RoadmapLayout(props: Readonly<RoadmapPageProps>) {
  const { children } = props;
  return (
    <div className="bg-[#F7F8FD] w-full min-h-screen h-full flex justify-center">
      {children}
    </div>
  );
}
