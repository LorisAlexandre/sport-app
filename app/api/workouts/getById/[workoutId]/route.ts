import { getUserId } from "@/lib/auth";
import { prisma, verifUserId } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  { params: { workoutId } }: { params: { workoutId: string } }
) => {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
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

  let workout = await prisma.workout.findUnique({
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
