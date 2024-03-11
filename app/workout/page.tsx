import { WorkoutCard } from "@/components/cards";
import { ToastError } from "@/components/ui";
import { auth } from "@/lib/auth";
import { CustomResponse } from "@/lib/types/apiRes";
import { Workout } from "@/lib/db";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return (
      <ToastError
        message="You are not logged in"
        statusCode={401}
        redirectTo="/auth/login"
      />
    );
  }

  const res = await fetch(`${process.env.SERV_URL}/api/workouts/getByUser`, {
    headers: {
      userId: session?.user.id,
    } as RequestInit["headers"],
    cache: "no-cache",
  });

  try {
    const { result, data, message, redirectTo } =
      (await res.json()) as CustomResponse<Workout[]>;

    if (!result || !data) {
      return (
        <ToastError
          message={message ?? res.statusText}
          statusCode={res.status}
          redirectTo={redirectTo}
        />
      );
    }

    return (
      <div className="flex flex-col gap-6">
        {!!data.length
          ? data.map((w) => <WorkoutCard {...w} key={w.id} />)
          : "No workouts yet"}
      </div>
    );
  } catch (error) {
    return (
      <ToastError
        message={`Error with the server. ${String(error)}`}
        statusCode={res.status}
        redirectTo="/"
      />
    );
  }
}
