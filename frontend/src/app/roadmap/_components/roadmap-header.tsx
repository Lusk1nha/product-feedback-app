import { GoBackLink } from "@/components/go-back";
import { SystemButton } from "@/components/system-button";
import Link from "next/link";

export function RoadmapHeader() {
  return (
    <div className="w-full h-[100px] sm:h-[113px] bg-[#373F68] sm:rounded-[10px] flex items-center justify-between px-6 py-[26px] shadow-sm gap-x-2">
      <div className="flex flex-col">
        <GoBackLink variant="white" href="/" />
        <h4 className="text-white text-lg sm:text-2xl font-semibold">Roadmap</h4>
      </div>

      <Link href="/feedback/new">
        <SystemButton
          type="button"
          className="bg-[#AD1FEA] hover:bg-[#C75AF6] h-10 sm:h-11 text-white px-4 md:px-6"
        >
          + Add Feedback
        </SystemButton>
      </Link>
    </div>
  );
}
