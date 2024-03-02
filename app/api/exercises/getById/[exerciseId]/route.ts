import { getUserId } from "@/lib/auth";
import { Exercise, prisma, verifUserId } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
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

  const { result, doc } = await verifUserId<Exercise>(
    userId,
    exerciseId,
    "exercise"
  );

  if (!result) {
    return NextResponse.json(
      { result, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // No need to include relations

  return NextResponse.json({ result: true, data: doc });
};
