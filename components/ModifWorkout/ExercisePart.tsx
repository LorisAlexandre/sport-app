import { useUpdateWorkoutContext } from "@/providers/UpdateWorkoutProvider";
import { ExerciseCard, ExerciseModifCard } from "../cards";
import { Button } from "../ui";

export const ExercisePart = () => {
  const { exercise, exercises, handleCreateExercise } =
    useUpdateWorkoutContext();

  return (
    <div className="flex flex-1 gap-4 flex-col lg:flex-row">
      <div className="flex flex-col flex-1 gap-2">
        {!!exercises.length
          ? exercises.map((e, i) => <ExerciseCard key={e.id} {...e} i={i} />)
          : "No exos yet"}
      </div>
      <Button variant={"default"} onClick={handleCreateExercise}>
        Ajouter un exo
      </Button>
      {!!exercise && <ExerciseModifCard />}
    </div>
  );
};
