import { getUserId } from "@/lib/auth";
import { Serie, Workout, isAbleToCUD, prisma, verifUserId } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params: { workoutId } }: { params: { workoutId: string } }
) => {
  const userId = await getUserId();
  const body: Workout = await req.json();

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const { result: isPaying } = await isAbleToCUD(userId);

  if (!isPaying) {
    return NextResponse.json(
      {
        result: false,
        redirectTo: "http://localhost:3000#pricing",
        message: "Your plan doesn't allow you to do that",
      },
      { status: 401 }
    );
  }

  const isVerified = await verifUserId(userId, workoutId, "workout");

  if (!isVerified) {
    return NextResponse.json(
      { result: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { result } = await verifUserId(userId, workoutId, "workout");

  if (!result) {
    return NextResponse.json(
      { result, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const updateWorkout = await prisma.workout.update({
    where: {
      id: workoutId,
    },
    data: {
      name: body.name,
      archived: body.archived,
    },
  });

  await Promise.all([
    body.series.map(async (s, i) => {
      await prisma.serie.deleteMany({ where: { id: s.id } });
      await prisma.exercise.deleteMany({ where: { serieId: s.id } });
      await prisma.serie.create({
        data: {
          ...s,
          break: Number(s.break),
          repetition: Number(s.repetition),
          rank: i + 1,
          userId,
          workoutId,
          exercises: {},
        },
      });
      await prisma.exercise.createMany({
        data: s.exercises.map((e, i) => ({
          ...e,
          bonus: {
            ...e.bonus,
            toAchieved: Number(e.bonus.toAchieved),
          },
          break: Number(e.break),
          repetition: Number(e.repetition),
          distance: Number(e.distance),
          workoutTime: Number(e.workoutTime),
          weight: Number(e.weight),
          rank: i + 1,
          userId,
        })),
      });
    }),
  ]);

  const updatedWorkout = await prisma.workout.findUnique({
    where: {
      id: body.id,
    },
    include: {
      series: {
        include: { exercises: { orderBy: { rank: "asc" } } },
        orderBy: { rank: "asc" },
      },
    },
  });

  return NextResponse.json({ result: true, data: updatedWorkout });
};
