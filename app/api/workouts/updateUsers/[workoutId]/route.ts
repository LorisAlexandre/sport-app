import { NextRequest, NextResponse } from "next/server";
import { isAbleToCUD, prisma, verifUserId } from "@/lib/db";

export const PATCH = async (
  req: NextRequest,
  { params: { workoutId } }: { params: { workoutId: string } }
) => {
  const userId = req.headers.get("userId");
  const body: { users: string[] } = await req.json();

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

  const { result } = await verifUserId(userId, workoutId, "workout");

  if (!result) {
    return NextResponse.json(
      { result, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const updatedWorkout = await prisma.workout.update({
    where: {
      id: workoutId,
    },
    data: {
      users: body.users,
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
