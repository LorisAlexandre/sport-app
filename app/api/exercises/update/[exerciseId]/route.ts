import { Exercise, isAbleToCUD, prisma, verifUserId } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params: { exerciseId } }: { params: { exerciseId: string } }
) => {
  const userId = req.headers.get("userId");

  const body: Exercise = await req.json();

  if (!userId || userId === undefined) {
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
        redirectTo: "/#pricing",
        message: "Your plan doesn't allow you to do that",
      },
      { status: 401 }
    );
  }

  const { result } = await verifUserId(userId, exerciseId, "exercise");

  if (!result) {
    return NextResponse.json(
      { result, message: "Unauthorized you're the owner" },
      { status: 401 }
    );
  }

  const exercise = await prisma.exercise.update({
    where: {
      id: exerciseId,
    },
    data: {
      bonus: {
        exerciseProp: body.bonus.exerciseProp ?? null,
        toAchieved: Number(body.bonus.toAchieved) ?? null,
      },
      break: Number(body.break),
      distance: Number(body.distance),
      name: body.name.trim() ?? "No name",
      rank: Number(body.rank),
      repetition: Number(body.repetition) ?? 1,
      weight: Number(body.weight),
      workoutTime: Number(body.workoutTime),
    },
  });

  return NextResponse.json({ result: true, data: exercise });
};
