import { Workout, isAbleToCUD, prisma, verifUserId } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { workoutId } }: { params: { workoutId: string } }
) => {
  const userId = req.headers.get("userId");

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
        redirectTo: "/#pricing",
        message: "Your plan doesn't allow you to do that",
      },
      { status: 401 }
    );
  }

  const { result } = await verifUserId<Workout>(userId, workoutId, "workout");

  if (!result) {
    return NextResponse.json(
      { result, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const workout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
    include: {
      series: {
        include: { exercises: true },
        orderBy: { rank: "asc" },
      },
    },
  });

  return NextResponse.json({
    result: true,
    data: workout,
  });
};
