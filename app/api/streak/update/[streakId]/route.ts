import { prisma, verifUserId } from "@/lib/db";
import { Streak } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params: { streakId } }: { params: { streakId: string } }
) => {
  const userId = req.headers.get("userId");
  const body: Streak = await req.json();

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const isVerified = await verifUserId(userId, streakId, "streak");

  if (!isVerified) {
    return NextResponse.json(
      { result: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const updatedStreak = await prisma.streak.update({
    where: {
      id: streakId,
    },
    data: {
      weekSchema: body.weekSchema,
      currentStreak: body.currentStreak,
      lastDateCount: body.lastDateCount,
      longuestStreak: body.longuestStreak,
      nextDateCount: body.nextDateCount,
      todayCount: body.todayCount,
    },
  });

  return NextResponse.json({ result: true, data: updatedStreak });
};
