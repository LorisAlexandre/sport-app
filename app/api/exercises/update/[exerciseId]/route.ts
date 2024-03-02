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

  // const { result } = await verifUserId(userId, exerciseId, "exercise");

  // if (!result) {
  //   return NextResponse.json(
  //     { result, message: "Unauthorized" },
  //     { status: 401 }
  //   );
  // }

  const exercise = await prisma.exercise.update({
    where: {
      id: exerciseId,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json({ result: true, data: exercise });
};
