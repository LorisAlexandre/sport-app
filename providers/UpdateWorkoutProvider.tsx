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
  workout: Workout | undefined;
  setWorkout: Dispatch<SetStateAction<Workout>> | undefined;
  session: Session | undefined;
  isLoading: boolean | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>> | undefined;
}

export const UpdateWorkoutContext = createContext<UpdateWorkoutContextType>({
  workout: undefined,
  setWorkout: undefined,
  session: undefined,
  isLoading: undefined,
  setIsLoading: undefined,
});

export const useUpdateWorkoutContext = () => {
  const { workout, setWorkout, session, isLoading, setIsLoading } =
    useContext(UpdateWorkoutContext);

  const { setMessage, setStatusCode, handleRedirect } = useErrorProvider();
  const router = useRouter();

  if (workout === undefined) {
    throw new Error("workout is not defined");
  }
  if (setWorkout === undefined) {
    throw new Error("setWorkout is not defined");
  }
  if (isLoading === undefined) {
    throw new Error("isLoading is not defined");
  }
  if (setIsLoading === undefined) {
    throw new Error("setIsLoading is not defined");
  }
  if (session === undefined) {
    throw new Error("session is not defined");
  }

  const handleDeleteWorkout = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/workouts/delete/${workout.id}`, {
      method: "DELETE",
      headers: {
        userId: session.user.id,
      },
    });

    try {
      const { result, message, redirectTo } =
        (await res.json()) as CustomResponse<any>;

      setIsLoading(false);
      if (!result) {
        setMessage(message);
        setStatusCode(res.status);
        redirectTo && handleRedirect(redirectTo);
        return;
      }

      router.push("/workout");
    } catch (error) {
      setIsLoading(false);
      setMessage(String(error));
      setStatusCode(res.status);
    }
  };
  const handleSaveWorkout = async () => {
    const newWorkout = { ...workout };
    newWorkout.series = newWorkout.series.filter((s) => s.exercises.length > 0);

    setIsLoading(true);

    const res = await fetch(`/api/workouts/update/${workout.id}`, {
      method: "PATCH",
      headers: {
        userId: session.user.id,
      },
      body: JSON.stringify(newWorkout),
    });

    try {
      const { result, data, message, redirectTo } =
        (await res.json()) as CustomResponse<Workout>;

      setIsLoading(false);
      if (!result || !data) {
        setMessage(message);
        setStatusCode(res.status);
        redirectTo && handleRedirect(redirectTo);
        return;
      }

      setWorkout(data);
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status);
      setIsLoading(false);
    }
  };

  const handleAddSerie = () => {
    const newWorkout = { ...workout };
    newWorkout.series.push({
      id: crypto.randomUUID(),
      break: 60000,
      repetition: 1,
      rank: newWorkout.series.length + 1,
      workoutId: newWorkout.id,
      userId: newWorkout.userId,
      exercises: [],
    });

    setWorkout(newWorkout);
  };
  const handleDeleteSerie = (id: Serie["id"]) => {
    const newWorkout = { ...workout };
    newWorkout.series = newWorkout.series.filter((s) => s.id !== id);

    newWorkout.series = newWorkout.series.map((s, i) => ({
      ...s,
      rank: i + 1,
    }));

    setWorkout(newWorkout);
  };
  const handleChangeSerie = <T extends keyof Serie>(
    id: Serie["id"],
    key: T,
    value: Serie[T]
  ) => {
    const newWorkout = { ...workout };
    const currSerie = newWorkout.series.find((s) => s.id === id);

    if (!currSerie) return;

    currSerie[key] = value;

    setWorkout(newWorkout);
  };

  const handleAddExercise = (id: Serie["id"]) => {
    const newWorkout = { ...workout };
    const currSerie = newWorkout.series.find((s) => s.id === id);

    if (!currSerie) return;

    currSerie.exercises.push({
      id: crypto.randomUUID(),
      name: "No name",
      repetition: 1,
      workoutTime: null,
      break: 0,
      distance: null,
      weight: null,
      rank: currSerie.exercises.length + 1,
      serieId: id,
      userId: currSerie.userId,
      bonus: {
        toAchieved: null,
        exerciseProp: null,
      },
    });

    setWorkout(newWorkout);
  };
  const handleDeleteExercise = (id: Exercise["id"]) => {
    const newWorkout = { ...workout };
    newWorkout.series = newWorkout.series.map((s) => ({
      ...s,
      exercises: s.exercises.filter((e) => e.id !== id),
    }));

    newWorkout.series = newWorkout.series.map((s, i) => ({
      ...s,
      rank: i + 1,
      exercises: s.exercises.map((e, index) => ({
        ...e,
        rank: index + 1,
      })),
    }));

    setWorkout(newWorkout);
  };
  const rankUpExercise = (id: Exercise["id"]) => {
    const newWorkout = { ...workout };
    const currExo: Exercise | undefined = newWorkout.series
      .map((s) => {
        return s.exercises.find((e) => e.id === id);
      })
      .filter((exo) => !!exo)[0];

    const currExoIndex = newWorkout.series
      .map((s) => {
        return s.exercises.findIndex((e) => e.id === id);
      })
      .filter((i) => i > -1)[0];

    if (!currExo || !currExoIndex) return;

    const currSerie = newWorkout.series.find((s) => s.id === currExo.serieId);

    if (!currSerie) return;

    currSerie.exercises.splice(currExoIndex - 1, 0, currExo);
    currSerie.exercises.splice(currExoIndex + 1, 1);

    newWorkout.series = newWorkout.series.map((s, i) => ({
      ...s,
      rank: i + 1,
      exercises: s.exercises.map((e, index) => ({
        ...e,
        rank: index + 1,
      })),
    }));

    setWorkout(newWorkout);
  };
  const rankDownExercise = (id: Exercise["id"]) => {
    const newWorkout = { ...workout };
    const currExo: Exercise | undefined = newWorkout.series
      .map((s) => {
        return s.exercises.find((e) => e.id === id);
      })
      .filter((exo) => !!exo)[0];

    const currExoIndex = newWorkout.series
      .map((s) => {
        return s.exercises.findIndex((e) => e.id === id);
      })
      .filter((i) => i > -1)[0];

    if (!currExo || currExoIndex === undefined || currExoIndex < 0) return;

    const currSerie = newWorkout.series.find((s) => s.id === currExo.serieId);
    if (!currSerie) return;

    currSerie.exercises[currExoIndex] = currSerie.exercises[currExoIndex + 1];
    currSerie.exercises[currExoIndex + 1] = currExo;

    newWorkout.series = newWorkout.series.map((s, i) => ({
      ...s,
      rank: i + 1,
      exercises: s.exercises.map((e, index) => ({
        ...e,
        rank: index + 1,
      })),
    }));

    setWorkout(newWorkout);
  };
  const handleChangeExercise = <T extends keyof Exercise>(
    id: Exercise["id"],
    key: T,
    value: Exercise[T]
  ) => {
    const newWorkout = { ...workout };
    const currExo = newWorkout.series
      .map((s) => s.exercises.find((e) => e.id === id))
      .filter((e) => !!e)[0];

    if (!currExo) return;

    currExo[key] = value;

    setWorkout(newWorkout);
  };
  const handleChangeBonusExercise = <T extends keyof Exercise["bonus"]>(
    id: Exercise["id"],
    key: T,
    value: Exercise["bonus"][T]
  ) => {
    const newWorkout = { ...workout };
    const currExo = newWorkout.series
      .map((s) => s.exercises.find((e) => e.id === id))
      .filter((e) => !!e)[0];

    if (!currExo) return;

    currExo.bonus[key] = value;

    setWorkout(newWorkout);
  };

  useEffect(() => {
    if (!!!workout.series.length) {
      handleAddSerie();
    }
  }, [workout.series]);

  return {
    workout,
    setWorkout,
    handleDeleteWorkout,
    handleSaveWorkout,
    handleAddSerie,
    handleDeleteSerie,
    handleChangeSerie,
    handleAddExercise,
    handleDeleteExercise,
    rankUpExercise,
    rankDownExercise,
    handleChangeExercise,
    handleChangeBonusExercise,
    exosType,
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
  const [workout, setWorkout] = useState(initWorkout);
  const [isLoading, setIsLoading] = useState(false);

  const contextValue: UpdateWorkoutContextType = {
    workout,
    setWorkout,
    session,
    isLoading,
    setIsLoading,
  };

  return (
    <UpdateWorkoutContext.Provider value={contextValue}>
      <ToastNotif isLoading={isLoading} />
      {children}
    </UpdateWorkoutContext.Provider>
  );
};
