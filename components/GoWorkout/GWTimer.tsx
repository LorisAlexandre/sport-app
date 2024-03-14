"use client";

import { formatTime } from "@/lib/functions";
import { useGoWorkoutContext } from "@/providers/GoWorkoutProvider";

export const GWTimer = () => {
  const { timer } = useGoWorkoutContext();

  return (
    <>
      <div className="font-oswald">
        {String(formatTime(timer).minutes).padStart(2, "0")}"
        {String(formatTime(timer).seconds).padStart(2, "0")}'
      </div>
    </>
  );
};
