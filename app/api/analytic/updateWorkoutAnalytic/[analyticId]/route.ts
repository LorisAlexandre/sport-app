import { NextRequest, NextResponse } from "next/server";
import { prisma, verifUserId } from "@/lib/db";
import { WorkoutAnalytic } from "@prisma/client";

export const PATCH = async (
  req: NextRequest,
  { params: { analyticId } }: { params: { analyticId: string } }
) => {
  const userId = req.headers.get("userId");
  const body = (await req.json()) as WorkoutAnalytic;
  const workout: WorkoutAnalytic = {
    archived: body.archived,
    id: body.id,
    name: body.name,
    series: body.series.map((s) => ({
      ...s,
      exercises: s.exercises.map((e) => ({
        ...e,
        isBonusDone: e.isBonusDone ?? false,
        isDone: e.isDone ?? false,
      })),
    })),
    createdAt: new Date(),
    notes: null,
  };

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const { result } = await verifUserId(userId, analyticId, "analytic");

  if (!result) {
    return NextResponse.json(
      { result, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const updatedAnalytic = await prisma.analytic.update({
    where: {
      id: analyticId,
    },
    data: {
      workoutAnalytic: {
        push: workout,
      },
    },
  });

  return NextResponse.json({ result: true, data: updatedAnalytic });
};
