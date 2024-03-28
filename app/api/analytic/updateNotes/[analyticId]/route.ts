import { verifUserId, prisma } from "@/lib/db";
import { formatDate } from "@/lib/functions";
import { Analytic, WorkoutAnalytic } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  {
    params: { analyticId },
  }: {
    params: { analyticId: string };
  }
) => {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { result: false, message: "Bad request, date is not defined" },
      { status: 400 }
    );
  }

  const userId = req.headers.get("userId");
  const body = (await req.json()) as WorkoutAnalytic;

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const { result, doc } = await verifUserId<Analytic>(
    userId,
    analyticId,
    "analytic"
  );

  if (!result || !doc) {
    return NextResponse.json(
      { result, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const currWorkout = doc.workoutAnalytic.find(
    (w) => formatDate(w.createdAt, "-") === date
  );

  if (!currWorkout) {
    return NextResponse.json(
      {
        result: false,
        message: "Workout not found",
      },
      { status: 404 }
    );
  }

  doc.workoutAnalytic = doc.workoutAnalytic.filter(
    (w) => formatDate(w.createdAt, "-") !== date
  );
  currWorkout.notes = body.notes;

  const updatedAnalytic = await prisma.analytic.update({
    where: {
      id: analyticId,
    },
    data: {
      workoutAnalytic: {
        set: [...doc.workoutAnalytic, currWorkout],
      },
    },
  });

  return NextResponse.json({ result: true, data: updatedAnalytic });
};
