"use client";

import { ExercisePart, SeriePart } from "./";
import { Button } from "../ui";
import { useUpdateWorkoutContext } from "@/providers/UpdateWorkoutProvider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const ModifWorkout = () => {
  const { workout, setWorkout, handleSaveWorkout, handleDeleteWorkout } =
    useUpdateWorkoutContext();

  return (
    <div>
      <div className="flex justify-between items-center gap-4 pb-10">
        <div className="flex gap-4 items-center">
          <Link href={"/workout"}>
            <ArrowLeft size={30} onClick={handleSaveWorkout} />
          </Link>
          <input
            type="text"
            value={workout.name}
            onChange={(e) =>
              setWorkout((w) => ({ ...w, name: e.target.value }))
            }
            className="flex flex-1 text-3xl uppercase font-oswald max-w-[220px] sm:max-w-none font-bold flex-wrap cursor-text min-h-9 outline-none "
          />
        </div>
        <Button
          onClick={handleSaveWorkout}
          variant={"default"}
          className="uppercase"
        >
          Save
        </Button>
      </div>
      <div className="flex gap-6 flex-col lg:flex-row">
        <SeriePart />
        <ExercisePart />
      </div>
      <Button
        className="mt-10 w-full"
        variant={"destructive"}
        onClick={handleDeleteWorkout}
      >
        Supprimer {workout.name}
      </Button>
    </div>
  );
};
