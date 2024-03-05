import ModifWorkout from "@/components/ModifWorkout";
import { Button } from "@/components/ui";
import { getUserId } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page({
  params: { workoutId },
}: {
  params: { workoutId: string };
}) {
  const userId = await getUserId();

  if (!userId) {
    redirect("/auth/login");
  }

  const res = await fetch(
    `${process.env.SERV_URL}/api/workouts/getById/${workoutId}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        userId,
      },
    }
  );

  if (!res.ok) {
    return <pre>{JSON.stringify(res)}</pre>;
  }

  return (
    <div>
      <ModifWorkout res={res} />
    </div>
  );
}
