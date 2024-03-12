import { Serie, isAbleToCUD, prisma, verifUserId } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params: { serieId } }: { params: { serieId: string } }
) => {
  const userId = req.headers.get("userId");

  const body: Serie = await req.json();

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const { result: isPaying } = await isAbleToCUD(userId);

  if (!isPaying) {
    return NextResponse.json(
      {
        result: false,
        redirectTo: "http://localhost:3000#pricing",
        message: "Your plan doesn't allow you to do that",
      },
      { status: 401 }
    );
  }

  const { result } = await verifUserId(userId, serieId, "serie");

  if (!result) {
    return NextResponse.json(
      { result, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const serie = await prisma.serie.update({
    where: {
      id: serieId,
    },
    data: {
      break: Number(body.break),
      rank: Number(body.rank),
      repetition: Number(body.repetition),
    },
    include: {
      exercises: true,
      Workout: true,
    },
  });

  return NextResponse.json({ result: true, data: serie });
};
