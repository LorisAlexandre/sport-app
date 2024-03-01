import { Session } from "next-auth";
import { NextResponse } from "next/server";

export const middleware = (session: Session) => {
  if (!session || !session.user?.id) {
    return NextResponse.json(
      {
        result: false,
        redirectTo: "/auth/login",
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
};
