import { getUserId } from "@/lib/auth";
import { isAbleToCUD, prisma, verifUserId } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  _req: NextRequest,
  { params: { exerciseId } }: { params: { exerciseId: string } }
) => {
  const userId = await getUserId();

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

  const { result } = await verifUserId(userId, exerciseId, "exercise");

  if (!result) {
    return NextResponse.json(
      { result, message: "Unauthorized" },
      { status: 401 }
    );
  }

  await prisma.exercise.delete({
    where: {
      id: exerciseId,
    },
  });

  return NextResponse.json({ result: true });
};
