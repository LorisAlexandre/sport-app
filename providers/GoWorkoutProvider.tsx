"use client";

import { Workout } from "@/lib/db";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface GoWorkoutContextType {
  workoutProps: Workout | undefined;
  setWorkoutProps: Dispatch<SetStateAction<Workout>> | undefined;
  workout: any[] | undefined;
  setWorkout: Dispatch<SetStateAction<any[]>> | undefined;
  currAction: any | undefined;
  setCurrAction: Dispatch<SetStateAction<any>> | undefined;
  timer: number | undefined;
  setTimer: Dispatch<SetStateAction<number>> | undefined;
  next: any | undefined;
  setNext: Dispatch<SetStateAction<any>> | undefined;
  goTimer: boolean | undefined;
  setGoTimer: Dispatch<SetStateAction<boolean>> | undefined;
  workoutPause: boolean | undefined;
  setWorkoutPause: Dispatch<SetStateAction<boolean>> | undefined;
}

export const GoWorkoutContext = createContext<GoWorkoutContextType>({
  workout: undefined,
  setWorkout: undefined,
  workoutProps: undefined,
  setWorkoutProps: undefined,
  timer: undefined,
  setTimer: undefined,
  next: undefined,
  setNext: undefined,
  currAction: undefined,
  setCurrAction: undefined,
  goTimer: undefined,
  setGoTimer: undefined,
  workoutPause: undefined,
  setWorkoutPause: undefined,
});

export const useGoWorkoutContext = () => {
  const {
    workout,
    setWorkout,
    workoutProps,
    setWorkoutProps,
    currAction,
    setCurrAction,
    timer,
    setTimer,
    next,
    setNext,
    goTimer,
    setGoTimer,
    workoutPause,
    setWorkoutPause,
  } = useContext(GoWorkoutContext);
  const router = useRouter();

  if (workout === undefined) {
    throw new Error("workout is not defined");
  }
  if (setWorkout === undefined) {
    throw new Error("setWorkout is not defined");
  }
  if (workoutProps === undefined) {
    throw new Error("workoutProps is not defined");
  }
  if (setWorkoutProps === undefined) {
    throw new Error("setWorkoutProps is not defined");
  }
  if (currAction === undefined) {
    throw new Error("currAction is not defined");
  }
  if (setCurrAction === undefined) {
    throw new Error("setCurrAction is not defined");
  }
  if (timer === undefined) {
    throw new Error("timer is not defined");
  }
  if (setTimer === undefined) {
    throw new Error("setTimer is not defined");
  }
  if (next === undefined) {
    throw new Error("next is not defined");
  }
  if (setNext === undefined) {
    throw new Error("setNext is not defined");
  }
  if (goTimer === undefined) {
    throw new Error("goTimer is not defined");
  }
  if (setGoTimer === undefined) {
    throw new Error("setGoTimer is not defined");
  }
  if (workoutPause === undefined) {
    throw new Error("workoutPause is not defined");
  }
  if (setWorkoutPause === undefined) {
    throw new Error("setWorkoutPause is not defined");
  }

  const handleGoNext = () => {
    setGoTimer(false);
    const restWorkout = [...workout];

    restWorkout.shift();
    setWorkout(restWorkout);
    setCurrAction(restWorkout[0]);

    if (!!restWorkout[0].workoutTime) {
      setTimer(restWorkout[0].workoutTime);
    }

    if (restWorkout.length > 1) {
      setNext(restWorkout[1]);
    } else {
      setNext({ isFinish: true });
    }
  };

  const handleStartTimer = () => {
    setGoTimer(true);
    if (currAction.isBreak) {
      setTimer(currAction.break);
    } else {
      setTimer(currAction.workoutTime);
    }
  };

  const handlePauseTimer = () => {
    setGoTimer(!goTimer);
    setTimer(timer + 1);
  };

  const handleWorkoutEnd = async () => {
    console.log("fini");
    router.push("/dashboard");
    // const res = await fetch(``);
    // const {} = (await res.json()) as CustomResponse<any>;
  };

  const handleWorkoutPause = () => {
    setWorkoutPause(!workoutPause);
    handlePauseTimer();
  };

  useEffect(() => {
    if (goTimer) {
      const time = setTimeout(() => {
        if (timer <= 0) {
          handleGoNext();
        } else {
          setTimer(timer - 1000);
        }
      }, 1000);

      return () => clearTimeout(time);
    }
  }, [timer]);

  return {
    workout,
    workoutProps,
    currAction,
    timer,
    next,
    goTimer,
    workoutPause,
    handleGoNext,
    handleWorkoutEnd,
    handleStartTimer,
    handlePauseTimer,
    handleWorkoutPause,
  };
};

export const GoWorkoutProvider = ({
  children,
  cleanWorkout,
  initWorkout,
}: {
  children: ReactNode;
  cleanWorkout: any[];
  initWorkout: Workout;
}) => {
  const [workoutProps, setWorkoutProps] = useState<Workout>(initWorkout);
  const [workout, setWorkout] = useState<any[]>(cleanWorkout);
  const [currAction, setCurrAction] = useState<any>(cleanWorkout[0]);
  const [next, setNext] = useState<object>(cleanWorkout[1] ?? null);
  const [goTimer, setGoTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [workoutPause, setWorkoutPause] = useState(false);

  const contextValue: GoWorkoutContextType = {
    workout,
    setWorkout,
    workoutProps,
    setWorkoutProps,
    timer,
    setTimer,
    next,
    setNext,
    currAction,
    setCurrAction,
    goTimer,
    setGoTimer,
    workoutPause,
    setWorkoutPause,
  };

  return (
    <GoWorkoutContext.Provider value={contextValue}>
      {children}
    </GoWorkoutContext.Provider>
  );
};
