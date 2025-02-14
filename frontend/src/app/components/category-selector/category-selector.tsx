"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ICategorySelectorProps {
  categories: string[];
}

export function CategorySelector(props: Readonly<ICategorySelectorProps>) {
  const { categories } = props;

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "All";

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-3 md:gap-y-5">
      {categories.map((category) => (
        <Selector
          key={category}
          name={category}
          selected={category === selectedCategory}
        />
      ))}
    </div>
  );
}

interface ISelectorProps {
  name: string;
  selected: boolean;
  onClick?: () => void;
}

function Selector(props: Readonly<ISelectorProps>) {
  const { name, selected, onClick } = props;
  return (
    <Link
      className={cn(
        "flex items-center justify-center rounded-[10px] font-semibold text-sm py-[2px] md:py-[5px] px-2 md:px-4 transition",
        selected
          ? "bg-[#4661E6] text-white"
          : "bg-[#F2F4FF] text-[#4661E6] hover:bg-[#CFD7FF]"
      )}
      href={{
        query: { category: name },
      }}
      onClick={onClick}
    >
      {name}
    </Link>
  );
}
