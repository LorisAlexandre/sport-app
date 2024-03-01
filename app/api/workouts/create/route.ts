import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async () => {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const workout = await prisma.workout.create({
    data: {
      userId,
      series: {
        create: {
          userId,
          exercises: {
            create: {
              rank: 1,
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
