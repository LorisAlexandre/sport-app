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
    suggestBonus,
    handleStartTimer,
    handleGoNext,
    handleWorkoutEnd,
    handleAddBonus,
  } = useGoWorkoutContext();

  useEffect(() => {
    if (currAction.isBreak) {
      handleStartTimer();
    }
  }, [currAction]);

  const renderBonus = () => {
    let bonus;

    if (!currAction.bonus) {
      return;
    }

    switch (currAction.bonus.exerciseProp) {
      case "workoutTime": {
        bonus = (
          <span>
            +
            {!!formatTime(currAction.bonus.toAchieved).minutes &&
              `${String(
                formatTime(currAction.bonus.toAchieved).minutes
              ).padStart(2, "0")}"`}
            {!!formatTime(currAction.bonus.toAchieved).seconds &&
              `${String(
                formatTime(currAction.bonus.toAchieved).seconds
              ).padStart(2, "0")}'`}
          </span>
        );
        break;
      }
      case "distance": {
        bonus = `+${currAction.bonus.toAchieved} m`;
        break;
      }
      case "weight": {
        bonus = `+${currAction.bonus.toAchieved} kg`;
        break;
      }
    }

    return (
      <>
        {currAction.bonus.exerciseProp && (
          <Button
            onClick={handleAddBonus}
            variant={"default"}
            className={`h-fit uppercase font-oswald text-2xl ${
              suggestBonus && "animate-bounce"
            }`}
          >
            {bonus}
          </Button>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 pb-5">
      <GWNavbar />
      {workoutPause ? <GWModal /> : <GWExerciseCard />}
      <div className="flex gap-4 items-end">
        {renderBonus()}
        {next.isFinish ? (
          <Button
            className="font-oswald h-fit uppercase text-2xl w-full"
            variant={"default"}
            onClick={handleWorkoutEnd}
          >
            <ChevronsRight size={40} />
            Fini
          </Button>
        ) : (
          <Button
            className="font-oswald h-fit uppercase text-2xl w-full"
            variant={"default"}
            onClick={handleGoNext}
          >
            <ChevronsRight size={40} />
            {next.isBreak ? (
              <span>
                Repos{" "}
                {formatTime(next.break).minutes
                  ? `${String(formatTime(next.break).minutes).padStart(
                      2,
                      "0"
                    )}"${String(formatTime(next.break).seconds).padStart(
                      2,
                      "0"
                    )}'`
                  : `${String(formatTime(next.break).seconds).padStart(
                      2,
                      "0"
                    )}'`}
              </span>
            ) : (
              <span>{next.name}</span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
