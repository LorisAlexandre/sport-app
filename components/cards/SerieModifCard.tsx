"use client";

import { formatTime } from "@/lib/functions";
import { useUpdateWorkoutContext } from "@/providers/UpdateWorkoutProvider";
import { Button } from "../ui";

export const SerieModifCard = () => {
  const { serie, series, handleChangeSerie, handleDeleteSerie } =
    useUpdateWorkoutContext();

  return (
    <div className="flex flex-col flex-1 gap-4 border rounded-md border-black px-4 py-2 h-fit">
      <div className="flex justify-between">
        <span>Répétitions</span>
        <span>
          x{" "}
          <input
            onChange={(e) => handleChangeSerie("repetition", e.target.value)}
            min={0}
            className="w-9"
            type="number"
            defaultValue={serie.repetition}
          />
        </span>
      </div>
      <div className="flex justify-between">
        <span>Temps de repos</span>
        <div>
          <span>
            <input
              onChange={(e) => handleChangeSerie("break", e.target.value)}
              min={0}
              className="w-9"
              type="number"
              defaultValue={formatTime(serie.break ?? 0).minutes}
            />{" "}
            min
          </span>{" "}
          <span>
            <input
              onChange={(e) => handleChangeSerie("break", e.target.value)}
              min={0}
              className="w-9"
              type="number"
              defaultValue={formatTime(serie.break ?? 0).seconds}
            />{" "}
            s
          </span>
        </div>
      </div>
      {series.length > 1 && (
        <Button
          variant={"destructive"}
          size={"sm"}
          className="w-fit mx-auto"
          onClick={() => handleDeleteSerie(serie.id)}
        >
          Supprimer la série
        </Button>
      )}
    </div>
  );
};
