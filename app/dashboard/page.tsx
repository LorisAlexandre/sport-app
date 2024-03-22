import { MyGuestAnalytics } from "@/components/Analytics";
import { MyStreak } from "@/components/MyStreak";
import WeekSchedule from "@/components/WeekSchedule";
import { Button, ToastError } from "@/components/ui";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Page({
  searchParams: { finish },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();

  if (session?.user.plan === "None") {
    // console.log("pricing");
  }

  const streak = await prisma.streak.findFirst({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div className="flex flex-col gap-8">
      {finish === "true" && (
        <ToastError message="Félicitation" statusCode={0} />
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        {streak && <WeekSchedule {...streak} />}
        {streak && <MyStreak {...streak} />}
      </div>
      <Button className="w-full">
        <Link
          className="font-oswald uppercase font-normal text-2xl w-full flex items-center justify-between"
          href={`/dashboard/${session?.user.email}`}
        >
          Mes analyses <ChevronRight size={32} />
        </Link>
      </Button>
      {session?.user.plan === "Coach" && <MyGuestAnalytics />}
    </div>
  );
}
