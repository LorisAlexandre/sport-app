"use client";

import { ChevronsRight } from "lucide-react";
import { GWExerciseCard, GWModal, GWNavbar } from ".";
import { Button } from "../ui";
import { useGoWorkoutContext } from "@/providers/GoWorkoutProvider";
import { formatTime } from "@/lib/functions";
import { useEffect } from "react";

export const GoWorkout = () => {
  const {
    next,
    workoutPause,
    currAction,
    handleStartTimer,
    handleGoNext,
    handleWorkoutEnd,
  } = useGoWorkoutContext();

  useEffect(() => {
    if (currAction.isBreak) {
      handleStartTimer();
    }
  }, [currAction]);

  return (
    <div className="flex flex-1 flex-col gap-4 pb-5">
      <GWNavbar />
      {workoutPause ? <GWModal /> : <GWExerciseCard />}
      <Button
        variant={"default"}
        className="h-fit uppercase font-oswald text-2xl"
      >
        Tu peux le faire ajoute
      </Button>
      {next.isFinish ? (
        <Button
          className="font-oswald h-fit uppercase text-2xl"
          variant={"default"}
          onClick={handleWorkoutEnd}
        >
          <ChevronsRight size={40} />
          Fini
        </Button>
      ) : (
        <Button
          className="font-oswald h-fit uppercase text-2xl"
          variant={"default"}
          onClick={handleGoNext}
        >
          <ChevronsRight size={40} />
          {next.isBreak ? (
            <span>
              Repos{" "}
              {formatTime(next.break).minutes
                ? `${formatTime(next.break).minutes}" ${
                    formatTime(next.break).seconds
                  }'`
                : `${formatTime(next.break).seconds}'`}
            </span>
          ) : (
            <span>{next.name}</span>
          )}
        </Button>
      )}
    </div>
  );
};
