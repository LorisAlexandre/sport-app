"use client";

import { useUpdateWorkoutContext } from "@/providers/UpdateWorkoutProvider";
import { Dispatch, SetStateAction, useEffect } from "react";
import { formatTime } from "@/lib/functions";
import { ComboBoxResponsive } from "../ui/combobox";
import { Button } from "../ui";

export const ExerciseModifCard = () => {
  const {
    exercise,
    exercises,
    exosType,
    selectedExoType,
    setSelectedExoType,
    handleChangeExercise,
    handleChangeExerciseTime,
    selectedBonusType,
    setSelectedBonusType,
    handleChangeBonusExercise,
    handleChangeBonusExerciseTime,
    handleDeleteExercise,
  } = useUpdateWorkoutContext();

  const renderBonusTypeInput = () => {
    let input;

    switch (selectedBonusType?.value) {
      case "workoutTime": {
        input = (
          <div>
            <span>
              <input
                onChange={(ev) => {
                  handleChangeBonusExercise(
                    "exerciseProp",
                    selectedBonusType?.value as any
                  );
                  handleChangeBonusExerciseTime(
                    Number(ev.target.value),
                    formatTime(exercise.bonus.toAchieved ?? 0).seconds
                  );
                }}
                min={0}
                className="w-10"
                type="number"
                value={formatTime(exercise.bonus.toAchieved ?? 0).minutes}
              />{" "}
              min
            </span>{" "}
            <span>
              <input
                onChange={(ev) => {
                  handleChangeBonusExercise(
                    "exerciseProp",
                    selectedBonusType?.value as any
                  );
                  handleChangeBonusExerciseTime(
                    formatTime(exercise.bonus.toAchieved ?? 0).minutes,
                    Number(ev.target.value)
                  );
                }}
                min={0}
                className="w-10"
                type="number"
                value={formatTime(exercise.bonus.toAchieved ?? 0).seconds}
              />{" "}
              s
            </span>
          </div>
        );
        break;
      }
      case "weight": {
        input = (
          <span>
            <input
              type="number"
              value={exercise.bonus.toAchieved ?? 0}
              className="outline-none w-12"
              onChange={(ev) => {
                handleChangeBonusExercise(
                  "toAchieved",
                  Number(ev.target.value)
                );
                handleChangeBonusExercise(
                  "exerciseProp",
                  selectedBonusType?.value as any
                );
              }}
            />
            kg
          </span>
        );
        break;
      }
      case "distance": {
        input = (
          <span>
            <input
              type="number"
              value={exercise.bonus.toAchieved ?? 0}
              className="outline-none w-16"
              onChange={(ev) => {
                handleChangeBonusExercise(
                  "toAchieved",
                  Number(ev.target.value)
                );
                handleChangeBonusExercise(
                  "exerciseProp",
                  selectedBonusType?.value as any
                );
              }}
            />
            m
          </span>
        );
        break;
      }
      default: {
        input = null;
        break;
      }
    }

    return input;
  };
  const renderExoTypeInput = () => {
    let input;

    switch (selectedExoType?.value) {
      case "workoutTime": {
        input = (
          <div>
            <span>
              <input
                onChange={(ev) =>
                  handleChangeExerciseTime(
                    "workoutTime",
                    Number(ev.target.value),
                    formatTime(exercise.workoutTime ?? 0).seconds
                  )
                }
                min={0}
                className="w-10"
                type="number"
                value={formatTime(exercise.workoutTime ?? 0).minutes}
              />{" "}
              min
            </span>{" "}
            <span>
              <input
                onChange={(ev) =>
                  handleChangeExerciseTime(
                    "workoutTime",
                    formatTime(exercise.workoutTime ?? 0).minutes,
                    Number(ev.target.value)
                  )
                }
                min={0}
                className="w-10"
                type="number"
                value={formatTime(exercise.workoutTime ?? 0).seconds}
              />{" "}
              s
            </span>
          </div>
        );
        break;
      }
      case "weight": {
        input = (
          <span>
            <input
              type="number"
              value={exercise.weight ?? 0}
              className="outline-none w-12"
              onChange={(ev) => handleChangeExercise("weight", ev.target.value)}
            />
            kg
          </span>
        );
        break;
      }
      case "distance": {
        input = (
          <span>
            <input
              type="number"
              value={exercise.distance ?? 0}
              className="outline-none w-16"
              onChange={(ev) =>
                handleChangeExercise("distance", ev.target.value)
              }
            />
            m
          </span>
        );
        break;
      }
      default: {
        input = null;
        break;
      }
    }

    return input;
  };

  return (
    <div className="flex flex-col flex-1 gap-4 border rounded-md border-black px-4 py-2 h-fit">
      <div className="flex w-full justify-between items-center">
        <input
          type="text"
          className="font-work font-bold outline-none"
          onChange={(ev) => handleChangeExercise("name", ev.target.value)}
          value={exercise.name}
        />
        <span>
          x
          <input
            type="number"
            className="w-10 outline-none"
            onChange={(ev) =>
              handleChangeExercise("repetition", ev.target.value)
            }
            value={exercise.repetition ?? 1}
            min={1}
          />
        </span>
      </div>
      <ComboBoxResponsive
        buttonText="Type d'exercice"
        selectedStatus={selectedExoType}
        setSelectedStatus={
          setSelectedExoType as Dispatch<
            SetStateAction<{ value: string; label: string } | null>
          >
        }
        statuses={exosType}
      />
      {selectedExoType && (
        <div className="flex justify-between px-2">
          <p>{selectedExoType.label}</p>
          {renderExoTypeInput()}
        </div>
      )}
      <ComboBoxResponsive
        buttonText="Bonus"
        selectedStatus={selectedBonusType}
        setSelectedStatus={
          setSelectedBonusType as Dispatch<
            SetStateAction<{ value: string; label: string } | null>
          >
        }
        statuses={exosType}
      />
      {selectedBonusType && (
        <div className="flex justify-between px-2">
          <p>{selectedBonusType.label}</p>
          {renderBonusTypeInput()}
        </div>
      )}
      {exercises.length > 1 && (
        <Button
          variant={"destructive"}
          size={"sm"}
          className="w-fit mx-auto"
          onClick={() => handleDeleteExercise(exercise.id)}
        >
          Supprimer {exercise.name}
        </Button>
      )}
    </div>
  );
};
