import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const archived = searchParams.get("archived");

  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  let workouts = await prisma.workout.findMany({
    where: {
      userId,
      archived: !!archived ? true : false,
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
