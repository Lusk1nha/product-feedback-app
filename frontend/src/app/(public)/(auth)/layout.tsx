import { AuthorWaterMark } from "@/app/components/author-water-mark";
import { LogoGradient } from "@/app/components/logo";
import { BaseNextLayoutProps } from "@/shared/types/next-type";

import { AnimatePresence } from "motion/react";

export default function AuthLayout(props: BaseNextLayoutProps) {
  const { children } = props;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-6 gap-y-6">
      <LogoGradient className="text-3xl font-bold" />

      <div className="w-full max-w-[372px] sm:max-w-[540px] p-6 bg-white rounded-lg shadow-sm">
        <AnimatePresence>{children}</AnimatePresence>
      </div>

      <AuthorWaterMark />
    </div>
  );
}
