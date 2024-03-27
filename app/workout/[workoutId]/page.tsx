import { GG } from "@/components/GG";
import { GoWorkout } from "@/components/GoWorkout";
import { ToastError } from "@/components/ui";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { GoWorkoutProvider } from "@/providers/GoWorkoutProvider";
import { WorkoutAnalytic } from "@prisma/client";
import { Divide } from "lucide-react";

export default async function Page({
  params: { workoutId },
  searchParams: { finish },
}: {
  params: { workoutId: string };
  searchParams: { [key: string]: string };
}) {
  const session = await auth();

  const initWorkout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
    select: {
      id: true,
      archived: true,
      name: true,
      users: true,
      series: {
        select: {
          break: true,
          id: true,
          rank: true,
          repetition: true,
          exercises: {
            select: {
              bonus: true,
              break: true,
              distance: true,
              id: true,
              name: true,
              rank: true,
              repetition: true,
              weight: true,
              workoutTime: true,
            },
            orderBy: { rank: "asc" },
          },
        },
        orderBy: { rank: "asc" },
      },
    },
  });
  const streak = await prisma.streak.findFirst({
    where: { userId: session?.user.id },
  });
  const analytic = await prisma.analytic.findFirst({
    where: {
      userId: session?.user.id,
    },
  });

  if (!initWorkout) {
    return (
      <ToastError
        message="Aucune séance n'a été trouvé"
        statusCode={404}
        redirectTo="/workout"
      />
    );
  }
  if (!analytic) {
    return (
      <ToastError
        message="Aucune analytic n'a été trouvé"
        statusCode={404}
        redirectTo="/workout"
      />
    );
  }

  if (!initWorkout.users.includes(session?.user.id!)) {
    return (
      <ToastError
        message={"Tu n'as pas accès à cette séance"}
        statusCode={401}
        redirectTo="/workout"
      />
    );
  }

  const refactoWorkout: object[] = [];

  initWorkout.series.map((serie) => {
    serie.exercises.map((exercise, i) => {
      for (let j = 0; j < serie.repetition; j++) {
        refactoWorkout.push(exercise);
        if (serie.exercises.length - 1 <= i) {
          refactoWorkout.push({ isBreak: true, break: serie.break });
        } else {
          refactoWorkout.push({ isBreak: true, break: exercise.break });
        }
      }
    });
  });

  refactoWorkout.pop();

  return (
    <GoWorkoutProvider
      refactoWorkout={refactoWorkout}
      initWorkout={initWorkout as unknown as WorkoutAnalytic}
      analyticId={analytic.id}
      session={session}
      streakId={streak?.id ?? ""}
    >
      {finish && <GG />}
      <GoWorkout />
    </GoWorkoutProvider>
  );
}
