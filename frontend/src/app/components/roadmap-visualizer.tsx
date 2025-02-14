import { cn } from "@/lib/utils";
import Link from "next/link";

type RoadmapItem = {
  title: string;
  color: string;
  total: number;
};

interface IRoadmapVisualizerProps {
  data: RoadmapItem[];
}

export function RoadmapVisualizer(props: Readonly<IRoadmapVisualizerProps>) {
  const { data } = props;

  return (
    <section className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[#3A4374] text-lg font-bold">Roadmap</h1>
        <Link
          className="text-[#4661E6] hover:text-[#8397F8] text-[13px] underline font-semibold"
          href={"/roadmap"}
        >
          View
        </Link>
      </div>

      <div className="flex flex-col gap-y-2">
        {data?.map((item) => (
          <RoadmapItemComp key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

function RoadmapItemComp(props: Readonly<RoadmapItem>) {
  const { title, color, total } = props;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: total ? color : "grey" }}
        />

        <p
          className={cn(
            "text-[#647196] text-base font-normal",
            total === 0 && "line-through"
          )}
        >
          {title}
        </p>
      </div>

      <h5 className="text-[#647196] text-base font-bold">{total}</h5>
    </div>
  );
}
