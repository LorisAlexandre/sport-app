import WeekSchedule from "@/components/WeekSchedule";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function Page() {
  const session = await auth();

  if (session?.user.plan === "None") {
    // console.log("pricing");
  }

  const streak = await prisma.streak.findFirst({
    where: {
      userId: session?.user.id,
    },
  });

  return <div>{streak && <WeekSchedule {...streak} />}</div>;
}
