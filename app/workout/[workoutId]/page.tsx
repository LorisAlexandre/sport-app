import { GoWorkout } from "@/components/GoWorkout";
import { ToastError } from "@/components/ui";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { GoWorkoutProvider } from "@/providers/GoWorkoutProvider";

export default async function Page({
  params: { workoutId },
}: {
  params: { workoutId: string };
}) {
  const session = await auth();

  const workout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
    include: {
      series: {
        include: { exercises: { orderBy: { rank: "asc" } } },
        orderBy: { rank: "asc" },
      },
    },
  });

  if (!workout) {
    return (
      <ToastError
        message="Aucune séance n'a été trouvé"
        statusCode={404}
        redirectTo="/workout"
      />
    );
  }

  if (!workout.users.includes(session?.user.id!)) {
    return (
      <ToastError
        message={"Tu n'as pas accès à cette séance"}
        statusCode={401}
        redirectTo="/workout"
      />
    );
  }

  const cleanWorkout: object[] = [];

  workout.series.forEach((serie) => {
    serie.exercises.forEach((exercise, i) => {
      for (let j = 0; j < serie.repetition; j++) {
        cleanWorkout.push(exercise);
        if (serie.exercises.length - 1 <= i) {
          if (j >= serie.repetition - 1) {
            continue;
          }
          cleanWorkout.push({ isBreak: true, break: serie.break });
        } else {
          cleanWorkout.push({ isBreak: true, break: exercise.break });
        }
      }
    });
  });

  return (
    <GoWorkoutProvider cleanWorkout={cleanWorkout} initWorkout={workout}>
      <GoWorkout />
    </GoWorkoutProvider>
  );
}
