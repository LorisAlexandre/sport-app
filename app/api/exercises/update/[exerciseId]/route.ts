import { getUserId } from "@/lib/auth";
import { Exercise, prisma, verifUserId } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params: { exerciseId } }: { params: { exerciseId: string } }
) => {
  const userId = await getUserId();
  const body: Exercise = await req.json();

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const isVerified = await verifUserId(userId, exerciseId, "exercise");

  if (!isVerified) {
    return NextResponse.json(
      { result: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const serie = prisma.exercise.update({
    where: {
      id: exerciseId,
    },
    data: {
      ...body,
    },
    include: {
      Serie: {
        include: {
          Workout: true,
        },
      },
    },
  });

  return NextResponse.json({ result: true, data: serie });
};
