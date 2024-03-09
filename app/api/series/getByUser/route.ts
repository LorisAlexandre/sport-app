import { getUserId } from "@/lib/auth";
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

  const series = await prisma.serie.findMany({
    where: {
      userId,
    },
    include: {
      exercises: true,
      Workout: true,
    },
  });

  return NextResponse.json({ result: true, data: series });
};
