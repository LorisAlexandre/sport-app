import { Serie, isAbleToCUD, prisma, verifUserId } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params: { workoutId } }: { params: { workoutId: string } }
) => {
  const userId = req.headers.get("userId");

  const body: Serie = await req.json();

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
          bonus: {
            exerciseProp: null,
            toAchieved: null,
          },
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
