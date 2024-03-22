import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const PATCH = async (req: NextRequest) => {
  const userId = req.headers.get("userId");
  const body = (await req.json()) as User["AffiliateLink"];

  if (!userId) {
    return NextResponse.json(
      { result: false, redirectTo: "/auth/login" },
      { status: 401 }
    );
  }

  const isAffLinkValid = await prisma.user.findFirst({
    where: {
      AffiliateLink: body,
      plan: "Coach",
    },
  });

  if (!isAffLinkValid) {
    return NextResponse.json(
      { result: false, message: "Coach inconnu" },
      { status: 404 }
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      AffiliateLink: body,
      plan: "Guest",
    },
  });

  return NextResponse.json({ result: true, data: updatedUser });
};
