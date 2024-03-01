import { getUserId } from "@/lib/auth";
import { Workout, prisma, verifUserId } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params: { workoutId } }: { params: { workoutId: string } }
) => {
  const userId = await getUserId();
  const body: Workout = await req.json();

  // const body = {
  //   seance: {
  //     archived: false,
  //     lastRealised: null,
  //     name: "First seance",
  //     userId: "clt8ot46u0000biowqqay32q3",
  //   },
  //   serie: {
  //     break: 60000,
  //     rank: 1,
  //     repetition: 1,
  //     id: "clt91jcyg0002r67esexq6lbe",
  //   },
  //   exercises: [
  //     {
  //       bonus: null,
  //       break: 30000,
  //       distance: null,
  //       lastAchieved: null,
  //       name: "Second exo",
  //       rank: 2,
  //       repetition: null,
  //       workoutTime: null,
  //     },
  //     {
  //       bonus: null,
  //       break: 30000,
  //       distance: null,
  //       lastAchieved: null,
  //       name: "Third exo",
  //       rank: 3,
  //       repetition: null,
  //       workoutTime: null,
  //     },
  //   ],
  // };

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

  const workout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
  });

  if (userId !== workout?.userId) {
    return NextResponse.json({ result: false }, { status: 401 });
  }

  const updatedWorkout = await prisma.workout.update({
    where: {
      id: workoutId,
    },
    data: {
      ...body,
    },
    include: {
      series: {
        include: { exercises: true },
        orderBy: { rank: "asc" },
      },
    },
  });

  return NextResponse.json({ result: true, data: updatedWorkout });
};
