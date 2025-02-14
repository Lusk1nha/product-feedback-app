import { GuyWithMagnifyingGlass } from "@/app/components/icons/guy-with-magnifying-glass";
import { SystemButton } from "@/app/components/system-button";
import Link from "next/link";

export function EmptyFeedbacks() {
  return (
    <div className="bg-white w-full h-full flex items-center justify-center rounded-[10px] shadow-sm">
      <div className="max-w-[410px] w-full h-full flex flex-col items-center justify-center gap-y-[54px] px-6 py-20">
        <GuyWithMagnifyingGlass />

        <section className="flex flex-col items-center justify-center gap-y-6 sm:gap-y-12">
          <div className="flex flex-col items-center justify-center gap-y-[14px] sm:gap-y-4">
            <h2 className="text-[#3A4374] text-center text-lg sm:text-2xl font-semibold">
              There is no feedback yet.
            </h2>

            <p className="text-base text-center text-[#647196] font-normal">
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </p>
          </div>

          <Link href="/feedback/new">
            <SystemButton
              className="bg-[#AD1FEA] hover:bg-[#C75AF6] h-10 sm:h-11 px-4 md:px-6 text-white"
              type="button"
            >
              + Add Feedback
            </SystemButton>
          </Link>
        </section>
      </div>
    </div>
  );
}
