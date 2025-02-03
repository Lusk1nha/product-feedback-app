import { cn } from "@/lib/utils";
import { AppWaterMark } from "../app-water-mark";
import { CategorySelector } from "../category-selector";
import { RoadmapVisualizer } from "../roadmap-visualizer";

export function DesktopSidebar() {
  return (
    <aside className="min-w-[255px] w-[255px] flex flex-col items-center justify-start gap-y-6">
      <AppearanceWrapper className="h-[165px] px-0 py-0 overflow-hidden">
        <AppWaterMark />
      </AppearanceWrapper>

      <AppearanceWrapper className="pr-12">
        <CategorySelector
          categories={["All", "UI", "UX", "Enhancement", "Bug", "Feature"]}
        />
      </AppearanceWrapper>

      <AppearanceWrapper>
        <RoadmapVisualizer
          data={[
            { title: "Planned", color: "#F49F85", total: 0 },
            { title: "In Progress", color: "#AD1FEA", total: 0 },
            { title: "Live", color: "#62BCFA", total: 0 },
          ]}
        />
      </AppearanceWrapper>
    </aside>
  );
}

interface IAppearanceWrapperProps {
  children: React.ReactNode;
  className?: string;
}

function AppearanceWrapper(props: Readonly<IAppearanceWrapperProps>) {
  const { children, className } = props;

  return (
    <div
      className={cn(
        "bg-white w-full h-auto shadow-sm rounded-[10px] px-6 py-6",
        className
      )}
    >
      {children}
    </div>
  );
}
