import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = req.headers.get("userId");

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const workouts = await prisma.workout.findMany({
    where: {
      users: {
        has: userId,
      },
    },
    include: {
      series: {
        include: { exercises: true },
        orderBy: { rank: "asc" },
      },
    },
  });

  return NextResponse.json({
    result: true,
    data: workouts,
  });
};
