"use client";

import { Exercise, Serie, Workout } from "@/lib/db";

import { CustomResponse } from "@/lib/types/apiRes";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useErrorProvider } from "./ErrorProvider";
import { areObjectsEqual, sleep, turnIntoMS } from "@/lib/functions";
import { ToastNotif } from "@/components/ui";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export type exoType = {
  value: "distance" | "weight" | "workoutTime" | "null";
  label: "Distance" | "Poids" | "Temps de travail" | "Aucun";
};

const exosType: exoType[] = [
  {
    value: "distance",
    label: "Distance",
  },
  {
    value: "weight",
    label: "Poids",
  },
  {
    value: "workoutTime",
    label: "Temps de travail",
  },
  {
    value: "null",
    label: "Aucun",
  },
];

export interface UpdateWorkoutContextType {
  setWorkout: Dispatch<SetStateAction<Workout>> | undefined;
  workout: Workout | undefined;
  setSeries: Dispatch<SetStateAction<Serie[]>> | undefined;
  series: Serie[];
  setSerie: Dispatch<SetStateAction<Serie>> | undefined;
  serie: Serie | undefined;
  setExercises: Dispatch<SetStateAction<Exercise[]>> | undefined;
  exercises: Exercise[];
  setExercise: Dispatch<SetStateAction<Exercise>> | undefined;
  exercise: Exercise | undefined;
  isLoading: boolean | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>> | undefined;
  session: Session | undefined;
  selectedExoType: exoType | null | undefined;
  selectedBonusType: exoType | null | undefined;
  setSelectedExoType: Dispatch<SetStateAction<exoType | null>> | undefined;
  setSelectedBonusType: Dispatch<SetStateAction<exoType | null>> | undefined;
}

export const UpdateWorkoutContext = createContext<UpdateWorkoutContextType>({
  setWorkout: undefined,
  workout: undefined,
  setSeries: undefined,
  series: [],
  setSerie: undefined,
  serie: undefined,
  setExercises: undefined,
  exercises: [],
  setExercise: undefined,
  exercise: undefined,
  isLoading: undefined,
  setIsLoading: undefined,
  session: undefined,
  selectedExoType: undefined,
  selectedBonusType: undefined,
  setSelectedExoType: undefined,
  setSelectedBonusType: undefined,
});

export const useUpdateWorkoutContext = () => {
  const {
    exercise,
    exercises,
    serie,
    series,
    setExercise,
    setExercises,
    setSerie,
    setSeries,
    setWorkout,
    workout,
    isLoading,
    setIsLoading,
    session,
    selectedBonusType,
    selectedExoType,
    setSelectedBonusType,
    setSelectedExoType,
  } = useContext(UpdateWorkoutContext);

  const { setMessage, setStatusCode, handleRedirect } = useErrorProvider();

  const router = useRouter();

  if (setSelectedExoType === undefined) {
    throw new Error("setSelectedExoType is not defined");
  }
  if (setSelectedBonusType === undefined) {
    throw new Error("setSelectedBonusType is not defined");
  }
  if (selectedExoType === undefined) {
    throw new Error("selectedExoType is not defined");
  }
  if (selectedBonusType === undefined) {
    throw new Error("selectedBonusType is not defined");
  }
  if (!session) {
    throw new Error("session is not defined");
  }
  if (!setWorkout) {
    throw new Error("setWorkout is not defined");
  }
  if (!setSeries) {
    throw new Error("setSeries is not defined");
  }
  if (!setSerie) {
    throw new Error("setSerie is not defined");
  }
  if (!setExercises) {
    throw new Error("setExercises is not defined");
  }
  if (!setExercise) {
    throw new Error("setExercise is not defined");
  }
  if (!workout) {
    throw new Error("workout is not defined");
  }
  if (!series) {
    throw new Error("series is not defined");
  }
  if (!serie) {
    throw new Error("serie is not defined");
  }
  if (!exercises) {
    throw new Error("exercises is not defined");
  }
  if (exercise === undefined) {
    throw new Error("exercise is not defined");
  }
  if (isLoading === undefined) {
    throw new Error("isLoading is not defined");
  }
  if (!setIsLoading) {
    throw new Error("setIsLoading is not defined");
  }

  const handleSaveWorkout = async () => {
    setIsLoading(true);
    await handleSerieSelection(workout.series[0].id);

    const res = await fetch(`/api/workouts/update/${workout.id}`, {
      method: "PATCH",
      headers: {
        userId: session.user.id,
      } as RequestInit["headers"],
      cache: "no-cache",
      body: JSON.stringify(workout),
    });

    try {
      const { result, data, message, redirectTo } =
        (await res.json()) as CustomResponse<Workout>;
      if (redirectTo) {
        handleRedirect(redirectTo);
      }
      if (!result || !data) {
        setMessage(message);
        setStatusCode(res.status);
        setIsLoading(false);
        return false;
      }
      setWorkout(data);
      setSeries(data.series);
      setSerie(data.series[0]);
      setExercises(data.series[0].exercises);
      setExercise(data.series[0].exercises[0]);
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status);
      setIsLoading(false);
    }
  };
  const handleDeleteWorkout = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/workouts/delete/${workout.id}`, {
      method: "DELETE",
      headers: {
        userId: session.user.id,
      },
      body: JSON.stringify({}),
    });

    try {
      const { result, message, redirectTo } =
        (await res.json()) as CustomResponse<Workout>;

      if (redirectTo) {
        handleRedirect(redirectTo);
      }

      if (!result) {
        setMessage(message);
        setStatusCode(res.status);
        setIsLoading(false);
        return false;
      }

      setIsLoading(false);
      router.push("/workout");
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status);
    }
  };

  const handleSaveSerie = async (): Promise<Serie | null> => {
    setIsLoading(true);
    const currSerie = serie;

    const res = await fetch(`/api/series/update/${currSerie.id}`, {
      method: "PATCH",
      headers: {
        userId: session.user.id,
      },
      body: JSON.stringify(currSerie),
    });

    try {
      const { result, data, message, redirectTo } =
        (await res.json()) as CustomResponse<Serie>;

      if (!result || !data) {
        setMessage(message);
        setStatusCode(res.status);
        setIsLoading(false);
        redirectTo && handleRedirect(redirectTo);
        return null;
      }

      const savedSerie = data;

      const newSeries = [...series];
      const currSerieIndex = newSeries.findIndex((s) => s.id === currSerie.id);
      newSeries.splice(currSerieIndex, 1, savedSerie);

      const newWorkout = {
        ...workout,
        series: newSeries,
      };

      setWorkout(newWorkout);
      setSeries(newSeries);
      setSerie(savedSerie);
      setExercises(newSeries[0].exercises);
      setExercise(newSeries[0].exercises[0]);

      setIsLoading(false);
      return savedSerie;
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status);
      setIsLoading(false);
      handleRedirect("/");
      return null;
    }
  };
  const handleSerieSelection = async (id: Serie["id"]) => {
    const serieFind = series.find((s) => s.id === id);
    if (!serieFind) return;

    await handleSaveSerie();
    await handleExerciseSelection(
      serieFind.exercises[0].id,
      serieFind.exercises
    );

    setExercises(serieFind.exercises);
    setExercise(serieFind.exercises[0]);
    setSerie(serieFind);
  };
  const handleChangeSerie = <T extends keyof Serie>(
    key: T,
    value: Serie[T]
  ) => {
    setSerie((s) => ({ ...s, [key]: value }));
  };
  const handleChangeSerieTime = (
    key: "break",
    minutes: number,
    secondes: number
  ) => {
    const value = turnIntoMS(0, 0, minutes, secondes);
    setExercise((e) => ({ ...e, [key]: value }));
  };
  const handleDeleteSerie = async (id: Serie["id"]) => {
    setIsLoading(true);
    const res = await fetch(`/api/series/delete/${id}`, {
      method: "DELETE",
      headers: {
        userId: session.user.id,
      },
      body: JSON.stringify({}),
    });

    try {
      const { result, message, redirectTo } =
        (await res.json()) as CustomResponse<Exercise>;

      if (redirectTo) {
        handleRedirect(redirectTo);
      }

      if (!result) {
        setMessage(message);
        setStatusCode(res.status);
        setIsLoading(false);
        return false;
      }

      const newSeries = [...series];
      const indexSeriesToDel = newSeries.findIndex((s) => s.id === id);
      newSeries.splice(indexSeriesToDel, 1);

      const newWorkout: Workout = {
        ...workout,
        series: newSeries,
      };

      setExercises(newSeries[0].exercises);
      setExercise(newSeries[0].exercises[0]);
      setSeries(newSeries);
      setSerie(newSeries[newSeries.length - 1]);
      setWorkout(newWorkout);

      setIsLoading(false);
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status);
    }
  };
  const handleCreateSerie = async () => {
    await handleExerciseSelection(serie.exercises[0].id, serie.exercises);
    const currSavedSerie = await handleSaveSerie();

    setIsLoading(true);
    const res = await fetch(`/api/series/create/${workout.id}`, {
      method: "POST",
      headers: {
        userId: session.user.id,
      },
      body: JSON.stringify({ rank: series.length + 1 }),
    });

    try {
      const { result, data, message, redirectTo } =
        (await res.json()) as CustomResponse<Serie>;

      if (redirectTo) {
        handleRedirect(redirectTo);
      }

      if (!result || !data) {
        setMessage(message);
        setStatusCode(res.status);
        setIsLoading(false);
        return false;
      }

      const savedSerie = data;
      const newSeries = [...series, savedSerie];

      currSavedSerie &&
        newSeries.splice(
          newSeries.findIndex((s) => s.id === currSavedSerie.id),
          1,
          currSavedSerie
        );

      const newWorkout: Workout = {
        ...workout,
        series: newSeries,
      };

      setWorkout(newWorkout);
      setSeries(newSeries);
      setSerie(savedSerie);
      setExercises(savedSerie.exercises);
      setExercise(savedSerie.exercises[0]);
      setIsLoading(false);
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status);
    }
  };

  const handleExerciseSelection = async (
    id: Exercise["id"],
    exercises: Exercise[]
  ) => {
    const currExercise = exercise;

    await handleSaveExercise(currExercise);

    const exerciseFind = exercises.find((e) => e.id === id);
    if (!exerciseFind) return;
    setExercise(exerciseFind);
    setSelectedExoType(null);
    setSelectedBonusType(null);

    switch (exerciseFind.bonus.exerciseProp) {
      case "distance":
        setSelectedBonusType({ value: "distance", label: "Distance" });
        break;
      case "weight":
        setSelectedBonusType({ value: "weight", label: "Poids" });
        break;
      case "workoutTime":
        setSelectedBonusType({
          value: "workoutTime",
          label: "Temps de travail",
        });
        break;
      default:
        break;
    }
    if (!!exerciseFind.weight) {
      setSelectedExoType({ value: "weight", label: "Poids" });
    }
    if (!!exerciseFind.distance) {
      setSelectedExoType({ value: "distance", label: "Distance" });
    }
    if (!!exerciseFind.workoutTime) {
      setSelectedExoType({ value: "workoutTime", label: "Temps de travail" });
    }
  };
  const handleChangeExercise = (
    key: keyof Exercise,
    value: Exercise[typeof key]
  ) => {
    setExercise((e) => ({ ...e, [key]: value }));
  };
  const handleChangeBonusExercise = (
    key: keyof Exercise["bonus"],
    value: Exercise["bonus"][typeof key]
  ) => {
    setExercise((e) => ({
      ...e,
      bonus: {
        ...e.bonus,
        [key]: value,
      },
    }));
  };
  const handleChangeBonusExerciseTime = (minutes: number, secondes: number) => {
    const value = turnIntoMS(0, 0, minutes, secondes);
    setExercise((e) => ({
      ...e,
      bonus: {
        ...e.bonus,
        toAchieved: value,
      },
    }));
  };
  const handleChangeExerciseTime = (
    key: "workoutTime" | "break",
    minutes: number,
    secondes: number
  ) => {
    const value = turnIntoMS(0, 0, minutes, secondes);
    setExercise((e) => ({ ...e, [key]: value }));
  };
  const handleSaveExercise = async (
    exoToSave: Exercise
  ): Promise<Exercise | null> => {
    const exerciseNotChanged = exercises.find((e) => e.id === exoToSave.id);
    const exerciseIndex = exercises.findIndex((e) => e.id === exoToSave.id);
    if (!exerciseNotChanged || exerciseIndex === -1) return null;

    if (!selectedBonusType) {
      exoToSave = {
        ...exoToSave,
        bonus: {
          exerciseProp: null,
          toAchieved: null,
        },
      };
    }
    const areEquals = areObjectsEqual<Exercise>(exoToSave, exerciseNotChanged);

    if (!areEquals) {
      setIsLoading(true);

      switch (selectedExoType?.value) {
        case "distance":
          exoToSave.weight = null;
          exoToSave.workoutTime = null;
          break;
        case "weight":
          exoToSave.distance = null;
          exoToSave.workoutTime = null;
          break;
        case "workoutTime":
          exoToSave.distance = null;
          exoToSave.weight = null;
          break;
        case "null":
          exoToSave.weight = null;
          exoToSave.workoutTime = null;
          exoToSave.distance = null;
          break;
      }

      const res = await fetch(`/api/exercises/update/${exoToSave.id}`, {
        method: "PATCH",
        headers: {
          userId: session.user.id,
        } as RequestInit["headers"],
        body: JSON.stringify({ ...exoToSave, rank: exerciseIndex + 1 }),
        cache: "no-cache",
      });

      try {
        const { result, data, message, redirectTo } =
          (await res.json()) as CustomResponse<Exercise>;

        if (redirectTo) {
          handleRedirect(redirectTo);
        }

        if (!result || !data) {
          setMessage(message);
          setStatusCode(res.status);
          setIsLoading(false);
          return null;
        }

        const savedExercise = data;
        const newExercises = [...exercises];
        newExercises.splice(exerciseIndex, 1, savedExercise);

        const newSeries = [...series];
        const serieIndex = series.findIndex((s) => s.id === serie.id);
        newSeries.splice(serieIndex, 1, { ...serie, exercises: newExercises });

        const newWorkout: Workout = {
          ...workout,
          series: newSeries,
        };

        setWorkout(newWorkout);
        setSeries(newSeries);
        setIsLoading(false);
        setExercises(newExercises);

        return savedExercise;
      } catch (error) {
        setMessage(String(error));
        setStatusCode(res.status);
        setIsLoading(false);

        return null;
      }
    }
    return null;
  };
  const handleCreateExercise = async () => {
    const prevSavedExercise = await handleSaveExercise(exercise);

    setIsLoading(true);
    const res = await fetch(`/api/exercises/create/${serie.id}`, {
      method: "POST",
      headers: {
        userId: session.user.id,
      },
      body: JSON.stringify({}),
    });

    try {
      const { result, data, message, redirectTo } =
        (await res.json()) as CustomResponse<Exercise>;

      if (redirectTo) {
        handleRedirect(redirectTo);
      }

      if (!result || !data) {
        setMessage(message);
        setStatusCode(res.status);
        setIsLoading(false);
        return false;
      }

      const savedExercise = data;
      const newExercises = [...exercises, savedExercise];
      prevSavedExercise &&
        newExercises.splice(
          exercises.findIndex((e) => e.id === prevSavedExercise.id),
          1,
          prevSavedExercise
        );
      const newSeries = [...series];
      const serieIndex = series.findIndex((s) => s.id === serie.id);
      newSeries.splice(serieIndex, 1, { ...serie, exercises: newExercises });

      const newWorkout: Workout = {
        ...workout,
        series: newSeries,
      };

      setWorkout(newWorkout);
      setSeries(newSeries);
      setExercises(newExercises);
      setExercise(savedExercise);
      setIsLoading(false);
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status);
    }
  };
  const handleDeleteExercise = async (id: Exercise["id"]) => {
    setIsLoading(true);
    const res = await fetch(`/api/exercises/delete/${id}`, {
      method: "DELETE",
      headers: {
        userId: session.user.id,
      },
      body: JSON.stringify({}),
    });

    try {
      const { result, message, redirectTo } =
        (await res.json()) as CustomResponse<Exercise>;

      if (redirectTo) {
        handleRedirect(redirectTo);
      }

      if (!result) {
        setMessage(message);
        setStatusCode(res.status);
        setIsLoading(false);
        return false;
      }

      const newExercises = [...exercises];
      const indexExerciseToDel = newExercises.findIndex((e) => e.id === id);
      newExercises.splice(indexExerciseToDel, 1);

      const newSeries = [...series];
      const serieIndex = series.findIndex((s) => s.id === serie.id);
      newSeries.splice(serieIndex, 1, { ...serie, exercises: newExercises });

      const newWorkout: Workout = {
        ...workout,
        series: newSeries,
      };

      setExercises(newExercises);
      setExercise(newExercises[newExercises.length - 1]);
      setSeries(newSeries);
      setWorkout(newWorkout);

      setIsLoading(false);
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status);
    }
  };

  return {
    workout,
    setWorkout,
    handleSaveWorkout,
    handleDeleteWorkout,
    series,
    serie,
    handleSerieSelection,
    handleChangeSerie,
    handleChangeSerieTime,
    handleDeleteSerie,
    handleCreateSerie,
    exercises,
    exercise,
    exosType,
    handleExerciseSelection,
    handleChangeExercise,
    handleChangeExerciseTime,
    handleChangeBonusExercise,
    handleChangeBonusExerciseTime,
    handleCreateExercise,
    handleDeleteExercise,
    selectedBonusType,
    selectedExoType,
    setSelectedBonusType,
    setSelectedExoType,
  };
};

export const UpdateWorkoutProvider = ({
  children,
  initWorkout,
  session,
}: {
  children: ReactNode;
  initWorkout: Workout;
  session: Session;
}) => {
  const [workout, setWorkout] = useState<Workout>(initWorkout);
  const [series, setSeries] = useState<Serie[]>(initWorkout.series);
  const [serie, setSerie] = useState<Serie>(initWorkout.series[0]);
  const [exercises, setExercises] = useState<Exercise[]>(serie.exercises);
  const [exercise, setExercise] = useState<Exercise>(serie.exercises[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedExoType, setSelectedExoType] = useState<exoType | null>(null);
  const [selectedBonusType, setSelectedBonusType] = useState<exoType | null>(
    null
  );

  useEffect(() => {
    if (!!exercise.weight) {
      setSelectedExoType({ value: "weight", label: "Poids" });
    }
    if (!!exercise.distance) {
      setSelectedExoType({ value: "distance", label: "Distance" });
    }
    if (!!exercise.workoutTime) {
      setSelectedExoType({ value: "workoutTime", label: "Temps de travail" });
    }
    switch (exercise.bonus.exerciseProp) {
      case "distance": {
        setSelectedBonusType({
          value: exercise.bonus.exerciseProp as any,
          label: "Distance",
        });
        break;
      }
      case "weight": {
        setSelectedBonusType({
          value: exercise.bonus.exerciseProp as any,
          label: "Poids",
        });
        break;
      }
      case "workoutTime": {
        setSelectedBonusType({
          value: exercise.bonus.exerciseProp as any,
          label: "Temps de travail",
        });
        break;
      }
      default:
        break;
    }
  }, [workout]);

  const contextValue: UpdateWorkoutContextType = {
    setWorkout,
    workout,
    setSeries,
    series,
    setSerie,
    serie,
    setExercises,
    exercises,
    setExercise,
    exercise,
    isLoading,
    setIsLoading,
    session,
    selectedBonusType,
    selectedExoType,
    setSelectedBonusType,
    setSelectedExoType,
  };

  return (
    <UpdateWorkoutContext.Provider value={contextValue}>
      <ToastNotif isLoading={isLoading} />
      {children}
    </UpdateWorkoutContext.Provider>
  );
};
