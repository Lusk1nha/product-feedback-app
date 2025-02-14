import { EmptyFeedbacks } from "./_components/empty-feedbacks";
import { HomeHeader } from "./_components/home-header";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col gap-y-6 pb-12 md:pb-[120px]">
      <HomeHeader />

      <div className="w-full h-full flex px-6 sm:px-0">
        {[].length > 0 ? <div>teste</div> : <EmptyFeedbacks />}
      </div>
    </main>
  );
}
