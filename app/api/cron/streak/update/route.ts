import { NextRequest, NextResponse } from "next/server";
import { getStreaksForToday, prisma } from "@/lib/db";

export const PATCH = async (req: NextRequest) => {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const PAGE_SIZE = 20; // Taille de la page pour la pagination

  let page = 1;
  let streaks = await getStreaksForToday(page, PAGE_SIZE);

  while (streaks.length > 0) {
    streaks.forEach(async (streak) => {
      const today = new Date();
      const nextDate = streak.nextDateCount
        ? new Date(streak.nextDateCount)
        : null;

      if (!nextDate || nextDate.toDateString() === today.toDateString()) {
        if (streak.todayCount) {
          const weekDay = today.getDay();
          const lastDate = streak.lastDateCount
            ? new Date(streak.lastDateCount)
            : null;
          const weekSchema = streak.weekSchema;

          if (lastDate !== null && weekSchema.includes(lastDate.getDay())) {
            streak.currentStreak++;
            streak.lastDateCount = today;

            // Déterminer le prochain jour de la semaine dans weekSchema
            const nextIndex =
              (weekSchema.indexOf(weekDay) + 1) % weekSchema.length;
            const nextDay = weekSchema[nextIndex];
            const nextDateCount = new Date(today);
            nextDateCount.setDate(
              today.getDate() + ((nextDay + 7 - today.getDay()) % 7)
            );
            streak.nextDateCount = nextDateCount;
          } else {
            streak.currentStreak = 1;

            // Initialiser nextDateCount sur le premier jour de weekSchema
            const firstDayOfWeek = weekSchema[0];
            const nextDateCount = new Date(today);
            nextDateCount.setDate(
              today.getDate() + ((firstDayOfWeek + 7 - today.getDay()) % 7)
            );
            streak.nextDateCount = nextDateCount;
          }
          // Initialiser lastDateCount sur aujourd'hui
          streak.lastDateCount = new Date(today);

          // Vérifie si currentStreak sup à longuestStreak
          if (streak.currentStreak > streak.longuestStreak) {
            streak.longuestStreak = streak.currentStreak;
          }
        } else {
          streak.currentStreak = 0;
        }
      }

      streak.todayCount = false;

      await prisma.streak.update({
        where: { id: streak.id },
        data: {
          currentStreak: streak.currentStreak,
          lastDateCount: streak.lastDateCount,
          longuestStreak: streak.longuestStreak,
          nextDateCount: streak.nextDateCount,
          todayCount: streak.todayCount,
        },
      });

      return streak;
    });

    page++;
    streaks = await getStreaksForToday(page, PAGE_SIZE);
  }

  return NextResponse.json({ ok: true });
};
