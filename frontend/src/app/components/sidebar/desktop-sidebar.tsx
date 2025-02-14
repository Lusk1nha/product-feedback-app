import { cn } from "@/lib/utils";
import { AppWaterMark } from "../app-water-mark";
import { CategorySelector } from "../category-selector/category-selector";
import { RoadmapVisualizer } from "../roadmap-visualizer";
import { Suspense } from "react";

export function DesktopSidebar() {
  return (
    <aside className="w-full md:min-w-[255px] lg:w-[255px] flex flex-row lg:flex-col items-center justify-between md:justify-start gap-y-6 gap-x-2.5">
      <AppearanceWrapper className="h-[178px] px-0 py-0 overflow-hidden">
        <AppWaterMark />
      </AppearanceWrapper>

      <AppearanceWrapper className="h-[178px] md:h-auto sm:pr-[18px] md:pr-12">
        <Suspense>
          <CategorySelector
            categories={["All", "UI", "UX", "Enhancement", "Bug", "Feature"]}
          />
        </Suspense>
      </AppearanceWrapper>

      <AppearanceWrapper className="h-[178px]">
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
