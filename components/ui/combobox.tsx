"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import {
  exoType,
  useUpdateWorkoutContext,
} from "@/providers/UpdateWorkoutProvider";
import { Exercise } from "@/lib/db";
import { InputTime } from ".";

export function ComboBoxResponsive({
  buttonText,
  label = buttonText,
  exo,
}: {
  buttonText: string;
  label?: string;
  exo: Exercise;
}) {
  const { exosType, handleChangeExercise, handleChangeBonusExercise } =
    useUpdateWorkoutContext();
  const [selectedStatus, setSelectedStatus] = React.useState<exoType | null>(
    !!exo.distance
      ? { label: "Distance", value: "distance" }
      : !!exo.weight
      ? { label: "Poids", value: "weight" }
      : !!exo.workoutTime
      ? { label: "Temps de travail", value: "workoutTime" }
      : null
  );
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  React.useEffect(() => {
    if (selectedStatus?.value === "distance") {
      handleChangeBonusExercise(exo.id, "exerciseProp", "distance");
      handleChangeBonusExercise(exo.id, "toAchieved", 0);
    }
    if (selectedStatus?.value === "weight") {
      handleChangeBonusExercise(exo.id, "exerciseProp", "weight");
      handleChangeBonusExercise(exo.id, "toAchieved", 0);
    }
    if (selectedStatus?.value === "workoutTime") {
      handleChangeBonusExercise(exo.id, "exerciseProp", "workoutTime");
      handleChangeBonusExercise(exo.id, "toAchieved", 0);
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
          className="h-10 max-w-fit w-[80%] min-w-[150px] px-1 flex items-center justify-center text-center border border-black/80 rounded-md text-lg"
          value={exo.distance ?? 0}
          min={0}
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            handleChangeExercise(exo.id, "distance", Number(e.target.value));
            handleChangeExercise(exo.id, "weight", null);
            handleChangeExercise(exo.id, "workoutTime", null);
          }}
        />
      );
    }
    if (selectedStatus.value === "weight") {
      type = (
        <input
          className="h-10 w-12 px-1 flex items-center justify-center text-center border border-black/80 rounded-md text-lg"
          type="tel"
          value={exo.weight ?? 0}
          onFocus={(e) => e.target.select()}
          min={0}
          onChange={(e) => {
            handleChangeExercise(exo.id, "weight", Number(e.target.value));
            handleChangeExercise(exo.id, "distance", null);
            handleChangeExercise(exo.id, "workoutTime", null);
          }}
        />
      );
    }
    if (selectedStatus.value === "workoutTime") {
      type = (
        <InputTime
          id={exo.id}
          value={exo.workoutTime ?? 0}
          onChange={handleChangeExercise}
          prop="workoutTime"
        />
      );
    }

    return (
      <div className="flex justify-between gap-2 items-center">
        {selectedStatus.label}: {type}
      </div>
    );
  };
  const renderBonusInput = () => {
    let type;

    if (selectedStatus === null) return;
    if (selectedStatus.value === "null") return;
    if (selectedStatus.value === "distance") {
      type = (
        <input
          type="tel"
          value={exo.bonus.toAchieved ?? 0}
          min={0}
          className="h-10 w-16 px-1 flex items-center justify-center text-center border border-black/80 rounded-md text-lg"
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            handleChangeBonusExercise(
              exo.id,
              "toAchieved",
              Number(e.target.value)
            );
            handleChangeBonusExercise(
              exo.id,
              "exerciseProp",
              selectedStatus.value as Exercise["bonus"]["exerciseProp"]
            );
          }}
        />
      );
    }
    if (selectedStatus.value === "weight") {
      type = (
        <input
          type="tel"
          value={exo.bonus.toAchieved ?? 0}
          min={0}
          className="h-10 w-16 px-1 flex items-center justify-center text-center border border-black/80 rounded-md text-lg"
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            handleChangeBonusExercise(
              exo.id,
              "toAchieved",
              Number(e.target.value)
            );
            handleChangeBonusExercise(
              exo.id,
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
          id={exo.id}
          onChange={handleChangeBonusExercise}
          value={exo.bonus.toAchieved ?? 0}
          prop="toAchieved"
        />
      );
    }

    return (
      <div className="flex flex-col sm:flex-row gap-2 justify-between sm:items-center w-full">
        <p className="max-w-40">
          Ajoute un bonus de{" "}
          <span className="lowercase">{selectedStatus.label}</span>:
        </p>
        <div className="flex items-center text-2xl gap-2">+{type}</div>
      </div>
    );
  };

  if (isDesktop) {
    return (
      <div className="flex flex-col gap-1">
        <>
          <p className="text-sm text-muted-foreground">{label}</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedStatus ? (
                  <>{selectedStatus.label}</>
                ) : (
                  <>{buttonText}</>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <StatusList
                statuses={exosType}
                setOpen={setOpen}
                setSelectedStatus={setSelectedStatus}
              />
            </PopoverContent>
          </Popover>
        </>
        <>{renderExoInput()}</>
        <>{renderBonusInput()}</>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <>
        <p className="text-sm text-muted-foreground">{label}</p>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedStatus ? <>{selectedStatus.label}</> : <>{buttonText}</>}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">
              <StatusList
                statuses={exosType}
                setOpen={setOpen}
                setSelectedStatus={setSelectedStatus}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </>
      <>{renderExoInput()}</>
      <>{renderBonusInput()}</>
    </div>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  statuses,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: exoType | null) => void;
  statuses: exoType[];
}) {
  return (
    <Command>
      <CommandInput placeholder="Change le type d'exo..." />
      <CommandList>
        <CommandEmpty>Aucun résultat.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                if (value === "null") {
                  setSelectedStatus(null);
                } else {
                  setSelectedStatus(
                    statuses.find((priority) => priority.value === value) ||
                      null
                  );
                }
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
