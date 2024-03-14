"use client";

import { Pause } from "lucide-react";
import { Button } from "../ui";
import { useGoWorkoutContext } from "@/providers/GoWorkoutProvider";

export const GWNavbar = () => {
  const { workoutProps, handleWorkoutPause } = useGoWorkoutContext();

  return (
    <div className="w-full text-end uppercase">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">{workoutProps.name}</h1>
        <Button
          onClick={handleWorkoutPause}
          variant={"default"}
          className="w-fit"
        >
          <Pause />
        </Button>
      </div>
      <span>Préfère une pause à l&apos;abandon</span>
    </div>
  );
};
