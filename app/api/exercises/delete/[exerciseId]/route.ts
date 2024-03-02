import { getUserId } from "@/lib/auth";
import { prisma, verifUserId } from "@/lib/db";
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

  const isVerified = await verifUserId(userId, exerciseId, "exercise");

  if (!isVerified) {
    return NextResponse.json(
      { result: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const serie = prisma.exercise.delete({
    where: {
      id: exerciseId,
    },
  });

  return NextResponse.json({ result: true, data: serie });
};
