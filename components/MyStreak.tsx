import { Streak } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatDate } from "@/lib/functions";

export const MyStreak = (streak: Streak) => {
  return (
    <Card className="w-full sm:w-fit">
      {!!streak.weekSchema.length ? (
        <>
          <CardHeader>
            <CardTitle>Ma série de jour</CardTitle>
            <CardDescription>
              Ma plus longue série: {streak.longuestStreak}{" "}
              {streak.longuestStreak < 0 && "🔥"}
            </CardDescription>
          </CardHeader>
          <div className="flex sm:flex-col items-center">
            <CardContent className="min-w-fit">
              <p className="text-2xl font-medium">
                {streak.currentStreak < 0
                  ? `🔥 ${streak.currentStreak}`
                  : `🧯 ${streak.currentStreak}`}
              </p>
            </CardContent>
            {streak.lastDateCount && (
              <CardContent>
                <p className="">
                  Dernière fois: {formatDate(streak.lastDateCount)}
                </p>
              </CardContent>
            )}
            {streak.nextDateCount && (
              <CardContent>
                <p className="">
                  Prochaine fois: {formatDate(streak.nextDateCount)}
                </p>
              </CardContent>
            )}
          </div>
        </>
      ) : (
        <CardContent className="py-6">
          <p>Pour voir tes progrès, ajoute des jours dans ton planning</p>
        </CardContent>
      )}
    </Card>
  );
};
