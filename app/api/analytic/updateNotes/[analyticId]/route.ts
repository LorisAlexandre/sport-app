import { verifUserId, prisma } from "@/lib/db";
import { formatDate } from "@/lib/functions";
import { Analytic, WorkoutAnalytic } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  {
    params: { analyticId },
    searchParams: { date, workoutName },
  }: {
    params: { analyticId: string };
    searchParams: { date: string; workoutName: string };
  }
) => {
  const userId = req.headers.get("userId");
  const body = (await req.json()) as WorkoutAnalytic;

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const { result, doc } = await verifUserId<Analytic>(
    userId,
    analyticId,
    "analytic"
  );

  if (!result) {
    return NextResponse.json(
      { result, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // à finir

  return NextResponse.json({ result: true, data: "updatedAnalytic" });
};
