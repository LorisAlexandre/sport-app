import { getUserId } from "@/lib/auth";
import { Exercise, prisma, verifUserId } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params: { serieId } }: { params: { serieId: string } }
) => {
  const userId = await getUserId();
  const body: Exercise = await req.json();

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const isVerified = await verifUserId(userId, serieId, "serie");

  if (!isVerified) {
    return NextResponse.json(
      { result: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const serie = prisma.exercise.create({
    data: {
      ...body,
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

  return NextResponse.json({ result: true, data: serie });
};
