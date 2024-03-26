"use client";

import {
  exoType,
  useUpdateWorkoutContext,
} from "@/providers/UpdateWorkoutProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ComboBoxResponsive } from "@/components/ui/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Exercise, Serie } from "@/lib/db";
import { Button, InputTime } from "../ui";
import {
  Archive,
  ChevronDown,
  ChevronUp,
  Plus,
  Save,
  Trash,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";

export const ModifWorkout = () => {
  const {
    workout,
    setWorkout,
    handleAddSerie,
    handleDeleteWorkout,
    handleSaveWorkout,
  } = useUpdateWorkoutContext();

  return (
    <Card className="border-none mb-12">
      <CardHeader className="flex flex-row justify-between items-center">
        <Button className="w-fit h-fit p-1">
          <Link href={"/workout"}>
            <ArrowLeft />
          </Link>
        </Button>
        <CardTitle className="uppercase text-2xl">{workout.name}</CardTitle>
        <CardDescription className="text-black">
          <Button onClick={handleSaveWorkout}>
            <Save />
          </Button>
          <Popover>
            <PopoverTrigger>
              <MoreVertical />
            </PopoverTrigger>
            <PopoverContent className="w-fit flex flex-col gap-2">
              <Button className="flex items-center gap-2">
                <span>Archiver {workout.name}</span>
                <Archive size={15} />
              </Button>
              <Button
                onClick={handleDeleteWorkout}
                variant={"destructive"}
                className="flex items-center gap-2"
              >
                <span>Supprimer {workout.name}</span>
                <Trash size={15} />
              </Button>
            </PopoverContent>
          </Popover>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex justify-between items-center">
          <p>Nom de la séance:</p>
          <input
            type="text"
            className="max-w-fit w-[200px] px-2 py-1 flex items-center justify-center text-center border border-black/80 rounded-md"
            value={workout.name}
            onFocus={(e) => e.target.select()}
            onChange={(e) =>
              setWorkout((pr) => ({ ...pr, name: e.target.value }))
            }
          />
        </div>
        <Tabs
          defaultValue={workout.series[0].id}
          className="[&[data-state=inactive]]:m-0"
        >
          <TabsList className="max-w-full flex flex-wrap h-fit justify-start">
            {workout.series.map((s, i) => (
              <SerieTabs {...s} key={i} />
            ))}
            <Button onClick={handleAddSerie} className={`flex items-center`}>
              Série <Plus size={15} />
            </Button>
          </TabsList>
          {workout.series.map((s, i) => (
            <SerieContent {...s} key={i} />
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

const SerieTabs = (serie: Serie) => {
  return (
    <TabsTrigger value={serie.id} className="flex items-center gap-2">
      <span>Série {serie.rank}</span>
    </TabsTrigger>
  );
};
const SerieContent = (serie: Serie) => {
  const { handleAddExercise, handleDeleteSerie, handleChangeSerie, workout } =
    useUpdateWorkoutContext();

  return (
    <TabsContent value={serie.id}>
      <Card className="flex flex-col gap-2">
        <CardHeader className="pb-0">
          <CardTitle className="font-work">
            Paramètre série {serie.rank}
          </CardTitle>
        </CardHeader>
        <CardContent className="mx-4 py-3 flex flex-col items-start gap-3 border-b">
          <div className="flex justify-between items-center w-full">
            <p className="max-w-40">Nombre de répétitions de série:</p>
            <input
              onFocus={(e) => e.target.select()}
              onChange={(e) =>
                handleChangeSerie(
                  serie.id,
                  "repetition",
                  Number(e.target.value)
                )
              }
              value={serie.repetition ?? 1}
              type="tel"
              min={1}
              className="size-10 px-1 flex items-center justify-center text-center border border-black/80 rounded-md text-lg"
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="maw-w-40">Temps de repos de la série:</p>
            <InputTime
              onChange={handleChangeSerie}
              value={serie.break}
              id={serie.id}
              prop="break"
            />
          </div>
          <Button
            onClick={() => handleAddExercise(serie.id)}
            variant={"default"}
            className="w-fit flex gap-2"
          >
            <span>Exercice</span>
            <Plus size={15} />
          </Button>
          {workout.series.length > 1 && (
            <Button
              onClick={() => handleDeleteSerie(serie.id)}
              className="flex gap-2"
              variant={"destructive"}
            >
              Supprimer série {serie.rank}
              <Trash size={15} />
            </Button>
          )}
        </CardContent>
        {!!serie.exercises.length ? (
          <div className="mt-2">
            <CardContent className="pb-0 px-4">
              <Accordion type="single" collapsible>
                {serie.exercises.map((e, i) => (
                  <ExerciseContent {...e} key={i} />
                ))}
              </Accordion>
            </CardContent>
          </div>
        ) : (
          <CardContent className="p-6">
            <div className="mt-2">Oups pas d&apos;exercice en vue</div>
          </CardContent>
        )}
      </Card>
    </TabsContent>
  );
};

const ExerciseContent = (exercise: Exercise) => {
  const {
    workout,
    handleDeleteExercise,
    rankDownExercise,
    rankUpExercise,
    handleChangeExercise,
    handleChangeBonusExercise,
    exosType,
  } = useUpdateWorkoutContext();

  const [selectedStatus, setSelectedStatus] = useState<exoType | null>(null);

  useEffect(() => {
    if (selectedStatus?.value === "null" || selectedStatus === null) {
      handleChangeExercise(exercise.id, "distance", null);
      handleChangeExercise(exercise.id, "weight", null);
      handleChangeExercise(exercise.id, "workoutTime", null);
      handleChangeBonusExercise(exercise.id, "toAchieved", null);
      handleChangeBonusExercise(exercise.id, "exerciseProp", null);
    }
  }, [selectedStatus]);

  const renderExoInput = () => {
    let type;

    if (selectedStatus === null) return;
    if (selectedStatus.value === "null") return;
    if (selectedStatus.value === "distance") {
      type = (
        <input
          type="tel"
          className="h-10 w-fit px-1 flex items-center justify-center text-center border border-black/80 rounded-md text-lg"
          value={exercise.distance ?? 0}
          min={0}
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            handleChangeExercise(
              exercise.id,
              "distance",
              Number(e.target.value)
            );
            handleChangeExercise(exercise.id, "weight", null);
            handleChangeExercise(exercise.id, "workoutTime", null);
          }}
        />
      );
    }
    if (selectedStatus.value === "weight") {
      type = (
        <input
          className="h-10 w-12 px-1 flex items-center justify-center text-center border border-black/80 rounded-md text-lg"
          type="tel"
          value={exercise.weight ?? 0}
          onFocus={(e) => e.target.select()}
          min={0}
          onChange={(e) => {
            handleChangeExercise(exercise.id, "weight", Number(e.target.value));
            handleChangeExercise(exercise.id, "distance", null);
            handleChangeExercise(exercise.id, "workoutTime", null);
          }}
        />
      );
    }
    if (selectedStatus.value === "workoutTime") {
      type = (
        <InputTime
          id={exercise.id}
          value={exercise.workoutTime ?? 0}
          onChange={handleChangeExercise}
          prop="workoutTime"
        />
      );
    }

    return (
      <div className="flex justify-between items-center">
        {selectedStatus.label}: {type}
      </div>
    );
  };
  const renderBonusInput = () => {
    let type;

    if (selectedStatus === null) return;
    if (selectedStatus.value === "null") return;
    if (
      selectedStatus.value === "distance" ||
      selectedStatus.value === "weight"
    ) {
      type = (
        <input
          type="tel"
          value={exercise.bonus.toAchieved ?? 0}
          min={0}
          className="h-10 w-16 px-1 flex items-center justify-center text-center border border-black/80 rounded-md text-lg"
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            handleChangeBonusExercise(
              exercise.id,
              "toAchieved",
              Number(e.target.value)
            );
            handleChangeBonusExercise(
              exercise.id,
              "exerciseProp",
              selectedStatus.value as Exercise["bonus"]["exerciseProp"]
            );
          }}
        />
      );
    }
    if (selectedStatus.value === "workoutTime") {
      type = (
        <InputTime
          id={exercise.id}
          onChange={handleChangeBonusExercise}
          value={exercise.bonus.toAchieved ?? 0}
          prop="toAchieved"
        />
      );
    }

    return (
      <div className="flex justify-between items-center w-full">
        <p className="max-w-40">
          Ajoute un bonus de{" "}
          <span className="lowercase">{selectedStatus.label}</span>:
        </p>
        <div className="flex items-center text-2xl gap-2">+{type}</div>
      </div>
    );
  };

  return (
    <AccordionItem value={exercise.id}>
      <div className="flex w-full items-center gap-3 [&_h3]:flex-1">
        <div className="flex flex-col">
          {!!!exercise.rank ||
            (exercise.rank > 1 && (
              <Button
                onClick={() => rankUpExercise(exercise.id)}
                className="w-fit h-fit p-1"
              >
                <ArrowUp size={15} />
              </Button>
            ))}

          {workout.series.find((s) => s.id === exercise.serieId)?.exercises
            .length !== exercise.rank && (
            <Button
              onClick={() => rankDownExercise(exercise.id)}
              className="w-fit h-fit p-1"
            >
              <ArrowDown size={15} />
            </Button>
          )}
        </div>
        <AccordionTrigger>
          Paramètre exercice {exercise.rank}: {exercise.name}
        </AccordionTrigger>
      </div>
      <AccordionContent className="flex flex-col gap-3 px-6">
        <div className="flex justify-between items-center">
          <p className="max-w-40">Nom de l'exercice: </p>
          <input
            onFocus={(e) => e.target.select()}
            value={exercise.name}
            onChange={(e) =>
              handleChangeExercise(exercise.id, "name", e.target.value)
            }
            type="text"
            className="max-w-fit w-[200px] px-2 py-1 flex items-center justify-center text-center border border-black/80 rounded-md"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="max-w-40">Répétition de l&apos;exercice: </p>
          <input
            onFocus={(e) => e.target.select()}
            type="tel"
            value={exercise.repetition ?? 1}
            onChange={(e) =>
              handleChangeExercise(
                exercise.id,
                "repetition",
                Number(e.target.value)
              )
            }
            min={1}
            className="size-10 px-1 flex items-center justify-center text-center border border-black/80 rounded-md text-lg"
          />
        </div>
        {workout.series.find((s) => s.id === exercise.serieId)?.exercises
          .length !== exercise.rank && (
          <div className="flex justify-between items-center">
            <p className="max-w-40">Repos de l&apos;exercice:</p>
            <InputTime
              id={exercise.id}
              onChange={handleChangeExercise}
              value={exercise.break}
              prop="break"
            />
          </div>
        )}
        <>
          <ComboBoxResponsive
            buttonText="Type d'exo"
            selectedStatus={selectedStatus}
            setSelectedStatus={
              setSelectedStatus as Dispatch<
                SetStateAction<{
                  value: string;
                  label: string;
                } | null>
              >
            }
            statuses={exosType}
            label="Choisis le type d'exo"
          />
          {renderExoInput()}
        </>
        <>{renderBonusInput()}</>
        <Button
          onClick={() => handleDeleteExercise(exercise.id)}
          variant={"destructive"}
          className="mt-6 flex gap-2 items-center"
        >
          Supprimer {exercise.name} <Trash size={15} />
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
};
