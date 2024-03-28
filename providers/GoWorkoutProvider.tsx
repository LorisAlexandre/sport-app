"use client";

import { CustomResponse } from "@/lib/types/apiRes";
import { Analytic, Streak, WorkoutAnalytic } from "@prisma/client";
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
import { useErrorProvider } from "./ErrorProvider";
import { Session } from "next-auth";

export interface GoWorkoutContextType {
  cleanWorkout: WorkoutAnalytic | undefined;
  setCleanWorkout: Dispatch<SetStateAction<WorkoutAnalytic>> | undefined;
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
  session: Session | null | undefined;
  streakId: Streak["id"] | undefined;
  analyticId: Analytic["id"] | undefined;
  suggestBonus: boolean | undefined;
  setSuggestBonus: Dispatch<SetStateAction<boolean>> | undefined;
  acknowlegde: boolean | undefined;
  setAcknowledge: Dispatch<SetStateAction<boolean>> | undefined;
}

export const GoWorkoutContext = createContext<GoWorkoutContextType>({
  workout: undefined,
  setWorkout: undefined,
  cleanWorkout: undefined,
  setCleanWorkout: undefined,
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
  session: undefined,
  streakId: undefined,
  analyticId: undefined,
  suggestBonus: undefined,
  setSuggestBonus: undefined,
  acknowlegde: undefined,
  setAcknowledge: undefined,
});

export const useGoWorkoutContext = () => {
  const {
    workout,
    setWorkout,
    cleanWorkout,
    setCleanWorkout,
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
    session,
    streakId,
    analyticId,
    suggestBonus,
    setSuggestBonus,
    acknowlegde,
    setAcknowledge,
  } = useContext(GoWorkoutContext);
  const { handleRedirect, setMessage, setStatusCode } = useErrorProvider();
  const router = useRouter();

  if (workout === undefined) {
    throw new Error("workout is not defined");
  }
  if (setWorkout === undefined) {
    throw new Error("setWorkout is not defined");
  }
  if (cleanWorkout === undefined) {
    throw new Error("cleanWorkout is not defined");
  }
  if (setCleanWorkout === undefined) {
    throw new Error("setCleanWorkout is not defined");
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
  if (session === undefined) {
    throw new Error("session is not defined");
  }
  if (streakId === undefined) {
    throw new Error("streakId is not defined");
  }
  if (analyticId === undefined) {
    throw new Error("analyticId is not defined");
  }
  if (suggestBonus === undefined) {
    throw new Error("suggestBonus is not defined");
  }
  if (setSuggestBonus === undefined) {
    throw new Error("setSuggestBonus is not defined");
  }
  if (acknowlegde === undefined) {
    throw new Error("acknowlegde is not defined");
  }
  if (setAcknowledge === undefined) {
    throw new Error("setAcknowledge is not defined");
  }

  const handleGoNext = () => {
    const exoDone = cleanWorkout.series
      .map((s) => {
        return s.exercises.find((e) => e.id === currAction.id);
      })
      .filter((e) => !!e)[0];

    if (!!exoDone) {
      exoDone.isDone = true;
    }

    setGoTimer(false);
    setSuggestBonus(false);
    const restWorkout = [...workout];

    restWorkout.shift();
    setWorkout(restWorkout);
    setCurrAction(restWorkout[0]);

    if (!!restWorkout[0].workoutTime) {
      setTimer(restWorkout[0].workoutTime);
    }
    if (restWorkout[0].isBreak) {
      setGoTimer(true);
    }

    if (restWorkout.length > 1) {
      setNext(restWorkout[1]);
    } else {
      setNext({ isFinish: true });
    }

    if (restWorkout[0].isBreak) {
      if (!!navigator.vibrate) {
        navigator.vibrate(1000);
      } else {
        if (!acknowlegde) {
          alert(
            "Désolé votre navigateur ne prend pas en compte les vibrations"
          );
          setAcknowledge(true);
        }
      }
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
    const exoDone = cleanWorkout.series
      .map((s) => {
        return s.exercises.find((e) => e.id === currAction.id);
      })
      .filter((e) => !!e)[0];

    if (!!exoDone) {
      exoDone.isDone = true;
    }

    const res = await fetch(`/api/streak/update/${streakId}`, {
      method: "PATCH",
      headers: {
        userId: session?.user.id,
      } as RequestInit["headers"],
      body: JSON.stringify({ todayCount: true }),
    });
    const res2 = await fetch(
      `/api/analytic/updateWorkoutAnalytic/${analyticId}`,
      {
        method: "PATCH",
        headers: {
          userId: session?.user.id,
        } as RequestInit["headers"],
        body: JSON.stringify(cleanWorkout),
      }
    );

    try {
      const {
        result: analyticResult,
        data: analyticData,
        message: analyticMessage,
        redirectTo: analyticRedirectTo,
      } = (await res2.json()) as CustomResponse<Analytic>;
      const { result, data, message, redirectTo } =
        (await res.json()) as CustomResponse<Streak>;

      if (!result || !data) {
        setMessage(message);
        setStatusCode(res.status);
        redirectTo && handleRedirect(redirectTo);
        return;
      }

      if (!analyticResult || !analyticData) {
        setMessage(analyticMessage);
        setStatusCode(res2.status);
        analyticRedirectTo && handleRedirect(analyticRedirectTo);
        return;
      }

      router.push(`/workout/${cleanWorkout.id}?finish=true`);
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status === 200 ? res2.status : res.status);
    }
  };

  const handleWorkoutPause = () => {
    setWorkoutPause(!workoutPause);
    handlePauseTimer();
  };

  const handleAddBonus = () => {
    const exoDoneWithBonus = cleanWorkout.series
      .map((s) => {
        return s.exercises.find((e) => e.id === currAction.id);
      })
      .filter((e) => !!e)[0];

    if (!!exoDoneWithBonus) {
      exoDoneWithBonus.isDone = true;
      exoDoneWithBonus.isBonusDone = true;
    }

    if (currAction.bonus.exerciseProp === "workoutTime") {
      setTimer(timer + currAction.bonus.toAchieved);
    }
    if (currAction.bonus.exerciseProp === "weight") {
      setCurrAction({
        ...currAction,
        weight: currAction.weight + currAction.bonus.toAchieved,
      });
    }
    if (currAction.bonus.exerciseProp === "distance") {
      setCurrAction({
        ...currAction,
        distance: currAction.distance + currAction.bonus.toAchieved,
      });
    }
  };

  useEffect(() => {
    if (goTimer) {
      const time = setTimeout(() => {
        setTimer(0);
        if (timer <= 0 || timer === 0) {
          if (currAction.isBreak) {
            handleGoNext();
          } else {
            setSuggestBonus(true);
          }
        } else {
          setTimer(timer - 1000);
        }
      }, 1000);

      return () => clearTimeout(time);
    }
  }, [timer, goTimer]);

  return {
    workout,
    cleanWorkout,
    currAction,
    timer,
    next,
    goTimer,
    workoutPause,
    suggestBonus,
    userEmail: session?.user.email,
    handleGoNext,
    handleWorkoutEnd,
    handleStartTimer,
    handlePauseTimer,
    handleWorkoutPause,
    handleAddBonus,
  };
};

export const GoWorkoutProvider = ({
  children,
  refactoWorkout,
  initWorkout,
  session,
  streakId,
  analyticId,
}: {
  children: ReactNode;
  refactoWorkout: any[];
  initWorkout: WorkoutAnalytic;
  session: Session | null;
  streakId: Streak["id"];
  analyticId: Analytic["id"];
}) => {
  const [cleanWorkout, setCleanWorkout] =
    useState<WorkoutAnalytic>(initWorkout);
  const [workout, setWorkout] = useState<any[]>(refactoWorkout);
  const [currAction, setCurrAction] = useState<any>(refactoWorkout[0]);
  const [next, setNext] = useState<object>(refactoWorkout[1] ?? null);
  const [goTimer, setGoTimer] = useState(false);
  const [timer, setTimer] = useState(currAction.workoutTime ?? 0);
  const [workoutPause, setWorkoutPause] = useState(false);
  const [suggestBonus, setSuggestBonus] = useState(false);
  const [acknowlegde, setAcknowledge] = useState(false);

  const contextValue: GoWorkoutContextType = {
    workout,
    setWorkout,
    cleanWorkout,
    setCleanWorkout,
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
    session,
    streakId,
    analyticId,
    suggestBonus,
    setSuggestBonus,
    acknowlegde,
    setAcknowledge,
  };

  return (
    <GoWorkoutContext.Provider value={contextValue}>
      {children}
    </GoWorkoutContext.Provider>
  );
};
