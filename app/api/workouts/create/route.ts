import { Workout, isAbleToCUD, prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const userId = req.headers.get("userId");
  const body: Workout = await req.json();

  if (!userId) {
    return NextResponse.json(
      {
        result: false,
        redirectTo: "/auth/login",
        message: "Your session has expired",
      },
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

  const workout = await prisma.workout.create({
    data: {
      ...body,
      userId,
      users: [userId],
      series: {
        create: {
          userId,
          exercises: {
            create: {
              rank: 1,
              repetition: 1,
              bonus: {
                exerciseProp: null,
                toAchieved: null,
              },
              userId,
            },
          },
          rank: 1,
        },
      },
    },
    include: {
      series: {
        include: { exercises: true },
      },
    },
  });

  return NextResponse.json({ result: true, data: workout });
};
