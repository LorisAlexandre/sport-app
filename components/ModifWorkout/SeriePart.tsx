import { useUpdateWorkoutContext } from "@/providers/UpdateWorkoutProvider";
import { SerieCard, SerieModifCard } from "../cards";
import { Button } from "../ui";

export const SeriePart = () => {
  const { series, serie, handleCreateSerie } = useUpdateWorkoutContext();

  return (
    <div className="flex flex-1 gap-4 flex-col lg:flex-row">
      <div className="flex flex-col flex-1 gap-2">
        {!!series.length
          ? series.map((s, i) => <SerieCard key={s.id} {...s} i={i} />)
          : "No series yet"}
      </div>
      <Button variant={"default"} onClick={handleCreateSerie}>
        Ajouter une série
      </Button>
      {!!serie && <SerieModifCard />}
    </div>
  );
};
