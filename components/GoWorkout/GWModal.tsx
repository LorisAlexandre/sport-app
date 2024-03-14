import { useGoWorkoutContext } from "@/providers/GoWorkoutProvider";
import { Button } from "../ui";

export const GWModal = () => {
  const { handleWorkoutEnd, handleWorkoutPause } = useGoWorkoutContext();

  return (
    <div className="flex flex-1 gap-10 justify-center items-center rounded-xl shadow-[0_0px_30px_0px_rgba(0,0,0,0.15)] px-5">
      <Button onClick={handleWorkoutPause} variant={"default"} className="">
        Reprendre
      </Button>
      <Button onClick={handleWorkoutEnd} variant={"destructive"} className="">
        Arrêter
      </Button>
    </div>
  );
};
