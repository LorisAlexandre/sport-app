import { getUserId } from "@/lib/auth";
import { Serie, Workout, prisma, verifUserId } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params: { workoutId } }: { params: { workoutId: string } }
) => {
  const userId = await getUserId();
  const body: Serie = await req.json();

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
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

  const serie = await prisma.serie.create({
    data: {
      ...body,
      userId,
      workoutId,
      exercises: {
        create: {
          userId,
          rank: 1,
        },
      },
    },
    include: {
      exercises: true,
    },
  });

  return NextResponse.json({ result: true, data: serie });
};
