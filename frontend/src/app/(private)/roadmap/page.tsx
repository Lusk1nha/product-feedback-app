import { RoadmapContent } from "./_components/roadmap-content";
import { RoadmapHeader } from "./_components/roadmap-header";

export default function RoadmapPage() {
  return (
    <main className="max-w-[1110px] w-full h-full flex flex-col sm:px-10 sm:py-14 pb-12 md:pb-[120px]">
      <RoadmapHeader />
      <RoadmapContent />
    </main>
  );
}
