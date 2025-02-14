"use client";

import { BulbIcon } from "@/app/components/icons/bulb-icon";
import { SystemChooser } from "@/app/components/inputs/system-chooser";
import { SystemButton } from "@/app/components/system-button";
import Link from "next/link";
import { useState } from "react";

type SortByTypes = "upvotes" | "downvotes" | "comments" | "least-comments";

export function HomeHeader() {
  const [sortBy, setSortBy] = useState<SortByTypes>("upvotes");

  function handleSortByChange(value: SortByTypes) {
    setSortBy(value);
  }

  return (
    <div className="w-full h-[56px] sm:h-[72px] bg-[#373F68] sm:rounded-[10px] flex items-center justify-between px-6 py-2 sm:py-6 shadow-sm gap-x-2">
      <div className="flex items-center gap-x-[38px]">
        <div className="hidden sm:flex items-center gap-x-4">
          <BulbIcon className="text-white" strokeWidth={1.5} />
          <h2 className="text-white text-base md:text-lg font-bold">6 Suggestions</h2>
        </div>

        <SystemChooser
          options={[
            { label: "Most Upvotes", value: "upvotes" },
            { label: "Least Upvotes", value: "downvotes" },
            { label: "Most Comments", value: "comments" },
            { label: "Least Comments", value: "least-comments" },
          ]}
          placeholder="Sort by"
          value={sortBy}
          onChange={(value) => handleSortByChange(value.value as SortByTypes)}
        />
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
