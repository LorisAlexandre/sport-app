import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const exercises = await prisma.exercise.findMany({
    where: {
      userId,
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
