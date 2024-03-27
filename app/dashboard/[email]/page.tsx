import { ACompleteWorkout, AWorkoutCard } from "@/components/Analytics";
import { Button, ToastError } from "@/components/ui";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/functions";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params: { email },
  searchParams: { date, workoutName },
}: {
  params: { email: string };
  searchParams: { date: string; workoutName: string };
}) {
  const session = await auth();

  if (!session?.user) {
    return (
      <ToastError
        message="Unauthorized"
        statusCode={401}
        redirectTo="/auth/login"
      />
    );
  }

  if (session.user.email !== email.replace("%40", "@")) {
    if (session.user.plan !== "Coach") {
      return (
        <ToastError
          message="Unauthorized"
          statusCode={401}
          redirectTo="/dashboard"
        />
      );
    }
  }

  const me = await prisma.user.findFirst({
    where: {
      email: email.replace("%40", "@"),
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!me) {
    return (
      <ToastError
        message="User not found"
        statusCode={404}
        redirectTo="/dashboard"
      />
    );
  }

  const analytics = await prisma.analytic.findFirst({
    where: {
      userId: me.id,
    },
    select: {
      workoutAnalytic: true,
      id: true,
    },
  });

  analytics?.workoutAnalytic.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  if (!date || !workoutName) {
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-6">
          <Button>
            <Link href={"/dashboard"}>
              <ChevronLeft />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold">{me.name}</h1>
        </div>
        <div className="flex flex-col gap-4 px-6">
          {analytics?.workoutAnalytic
            .filter((_, i) => i <= 3)
            .map((w, i) => (
              <AWorkoutCard {...w} key={i} />
            ))}
        </div>
      </div>
    );
  } else {
    const workout = analytics?.workoutAnalytic.find(
      (w) => formatDate(w.createdAt, "-") === date && w.name === workoutName
    );

    if (!workout) {
      return <ToastError message="Aucune séance trouvée" statusCode={404} />;
    }

    return (
      <ACompleteWorkout
        workout={workout}
        session={session}
        analyticId={analytics?.id ?? ""}
      />
    );
  }
}
