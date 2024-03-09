import { prisma, verifUserId } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { serieId } }: { params: { serieId: string } }
) => {
  const userId = req.headers.get("userId");

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const { result } = await verifUserId(userId, serieId, "serie");

  if (!result) {
    return NextResponse.json(
      { result, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const exercises = await prisma.exercise.findMany({
    where: {
      userId,
      serieId,
    },
    include: {
      Serie: {
        include: {
          Workout: true,
        },
      },
    },
  });

  return NextResponse.json({ result: true, data: exercises });
};
