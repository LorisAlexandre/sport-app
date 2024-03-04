import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth();

  const user = await prisma?.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (!user) return NextResponse.json({ result: false, user: null });

  return NextResponse.json({ result: true, user });
};
