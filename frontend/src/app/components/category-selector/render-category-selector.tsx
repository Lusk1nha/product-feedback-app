import { Suspense } from "react";
import { CategorySelector } from "./category-selector";

export function RenderCategorySelector() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategorySelector
        categories={["All", "UI", "UX", "Enhancement", "Bug", "Feature"]}
      />
    </Suspense>
  );
}
