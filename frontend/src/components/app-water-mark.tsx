import { GradiantIcon } from "./icons/gradiant-icon";

export function AppWaterMark() {
  return (
    <div className="w-full h-full overflow-hidden relative">
      <GradiantIcon />

      <div className="absolute bottom-0 left-0 z-10 pl-6 pb-6">
        <h2 className="font-semibold text-white text-xl">Frontend Mentor</h2>
        <h5 className="font-normal text-white/75 text-[15px]">
          Feedback Board
        </h5>
      </div>
    </div>
  );
}
