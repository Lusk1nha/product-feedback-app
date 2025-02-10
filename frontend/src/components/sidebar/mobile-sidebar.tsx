"use client";

import { memo, useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";

import { RenderCategorySelector } from "../category-selector/render-category-selector";
import { RoadmapVisualizer } from "./../roadmap-visualizer";

import { cn } from "@/lib/utils";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 w-full h-[72px] flex items-center justify-between px-6 z-50">
        <div className="flex flex-col z-10">
          <h2 className="font-bold text-white text-[15px]">Frontend Mentor</h2>
          <h5 className="font-medium text-white/75 text-[13px]">
            Feedback Board
          </h5>
        </div>

        <Button
          className="text-white"
          size="icon"
          variant="ghost"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </Button>
      </div>

      <SheetContent
        side="right"
        className="bg-[#F7F8FD] flex flex-col gap-y-4 p-6"
      >
        <SheetTitle />

        <AppearanceWrapper className="mt-10">
          <RenderCategorySelector />
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
      </SheetContent>
    </Sheet>
  );
}

interface IAppearanceWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const AppearanceWrapper = memo(function AppearanceWrapper(
  props: Readonly<IAppearanceWrapperProps>
) {
  const { children, className } = props;

  return (
    <div
      className={cn(
        "bg-white rounded-[10px] pl-6 pr-4 pt-6 pb-[36px] shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
});
