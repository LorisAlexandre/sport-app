import { WorkoutCard } from "@/components/cards";
import { ToastError } from "@/components/ui";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sleep } from "@/lib/functions";

export const revalidate = 5;

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return (
      <ToastError
        message="You are not logged in"
        statusCode={401}
        redirectTo="/auth/login"
      />
    );
  }

  sleep(3000);

  const workouts = await prisma.workout.findMany({
    where: {
      users: {
        has: session.user.id,
      },
    },
    include: {
      series: {
        include: { exercises: { orderBy: { rank: "asc" } } },
        orderBy: { rank: "asc" },
      },
    },
  });

  return (
    <div className="flex flex-col gap-6 mb-28 md:flex-row">
      {!!workouts.length ? (
        workouts.map((w) => <WorkoutCard session={session} {...w} key={w.id} />)
      ) : (
        <span className="text-center">
          Oups il n&apos;y a aucune séance ! Crées en une !
        </span>
      )}
    </div>
  );
}
