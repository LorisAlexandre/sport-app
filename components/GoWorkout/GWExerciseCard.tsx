"use client";

import { useGoWorkoutContext } from "@/providers/GoWorkoutProvider";
import { GWTimer } from ".";
import { Button } from "../ui";
import { Pause, Play } from "lucide-react";

export const GWExerciseCard = () => {
  const { currAction, goTimer, handlePauseTimer } = useGoWorkoutContext();

  const renderActionType = () => {
    let type;

    if (!!currAction.workoutTime) {
      type = <GWTimer />;
    } else if (!!currAction.distance) {
      type = `${currAction.distance} m`;
    } else if (!!currAction.weight) {
      type = `${currAction.weight} kg`;
    }

    return (
      <div className="font-oswald font-bold flex items-center text-3xl uppercase w-full gap-3 mb-6">
        {!!type && (
          <>
            <div className="w-full h-1 rounded-full bg-black" />
            <div className="min-w-max px-5">{type}</div>
            <div className="w-full h-1 rounded-full bg-black" />
          </>
        )}
      </div>
    );
  };

  const renderCurrAction = () => {
    let action;

    if (currAction.isBreak) {
      action = (
        <>
          <h2 className="font-bold text-4xl uppercase mb-2">Repos</h2>
          <div className="font-oswald font-semibold flex items-center text-3xl uppercase w-full gap-3">
            <div className="w-full h-1 rounded-full bg-black" />
            <div className="flex w-full items-center justify-center">
              <GWTimer />
            </div>
            <div className="w-full h-1 rounded-full bg-black" />
          </div>
        </>
      );
    } else {
      action = (
        <>
          <h2 className="font-bold text-4xl uppercase">
            {currAction.name} <span className="lowercase">x</span>
            {currAction.repetition}
          </h2>
          {renderActionType()}
          {!!currAction.workoutTime && (
            <Button onClick={handlePauseTimer} variant={"default"}>
              {goTimer ? <Pause /> : <Play />}
            </Button>
          )}
        </>
      );
    }

    return action;
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl shadow-[0_0px_30px_0px_rgba(0,0,0,0.15)] px-5">
      {renderCurrAction()}
    </div>
  );
};
