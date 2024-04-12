import { ExerciseAnalytics } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatTime } from "@/lib/functions";
import { Check } from "lucide-react";

export const AExerciseResume = (exercise: ExerciseAnalytics) => {
  const renderExerciseType = () => {
    let type;

    if (!!exercise.workoutTime) {
      type = (
        <span>
          {!!formatTime(exercise.workoutTime).minutes &&
            `${String(formatTime(exercise.workoutTime).minutes).padStart(
              2,
              "0"
            )}"`}
          {String(formatTime(exercise.workoutTime).seconds).padStart(2, "0")}
          &apos;
        </span>
      );
    } else if (!!exercise.distance) {
      type = `${exercise.distance} m`;
    } else if (!!exercise.weight) {
      type = `${exercise.weight} kg`;
    }

    if (!type) {
      return;
    }

    return (
      <CardContent className="flex flex-col gap-2 pt-0 pb-2">
        <div className="flex  w-32 justify-between items-center text-lg font-medium">
          <div
            className={`border p-0 flex items-center justify-center aspect-square w-7 h-7 rounded-md ${
              !!exercise.isDone && "bg-green-600"
            }`}
          >
            {!!exercise.isDone && <Check size={20} color="white" />}
          </div>
          <div>{type}</div>
        </div>
      </CardContent>
    );
  };
  const renderBonusType = () => {
    let type;

    switch (exercise.bonus.exerciseProp) {
      case "distance":
        type = <span>{exercise.bonus.toAchieved} m</span>;
        break;
      case "weight":
        type = <span>{exercise.bonus.toAchieved} kg</span>;
        break;
      case "workoutTime":
        type = (
          <span>
            {!!formatTime(exercise.bonus.toAchieved ?? 0).minutes &&
              `${String(
                formatTime(exercise.bonus.toAchieved ?? 0).minutes
              ).padStart(2, "0")}"`}{" "}
            {!!formatTime(exercise.bonus.toAchieved ?? 0).seconds &&
              `${String(
                formatTime(exercise.bonus.toAchieved ?? 0).seconds
              ).padStart(2, "0")}'`}
          </span>
        );
        break;
      default:
        break;
    }

    if (!type || !exercise.isBonusDone) {
      return;
    }

    return (
      <CardContent className="flex flex-col gap-2 pt-0 pb-2">
        <div className="flex w-fit gap-5 justify-between items-center text-lg font-medium">
          <div
            className={`border p-0 aspect-square flex items-center justify-center w-7 h-7 rounded-md ${
              !!exercise.isBonusDone && "bg-green-600"
            }`}
          >
            {!!exercise.isBonusDone && <Check size={20} color="white" />}
          </div>
          <div>Bonus + {type}</div>
        </div>
      </CardContent>
    );
  };

  return (
    <Card className="border-none pb-2">
      <CardHeader className="flex-row items-center p-0 pb-2">
        <CardTitle className="font-medium text-xl">
          {exercise.name} x{exercise.repetition}
        </CardTitle>
      </CardHeader>
      {renderExerciseType()}
      {renderBonusType()}
    </Card>
  );
};
