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

  const series = prisma.serie.findMany({
    where: {
      workoutId,
      userId,
    },
    include: {
      exercises: true,
      Workout: true,
    },
  });

  return NextResponse.json({ result: true, data: series });
};
