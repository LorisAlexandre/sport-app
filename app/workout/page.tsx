import { WorkoutCard } from "@/components/cards";
import { Button, ToastError } from "@/components/ui";
import { auth } from "@/lib/auth";
import { CustomResponse } from "@/lib/types/apiRes";
import { Workout } from "@/lib/db";
import { Plus } from "lucide-react";

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
      <div className="flex flex-col gap-6 mb-28">
        {!!data.length ? (
          data.map((w) => <WorkoutCard session={session} {...w} key={w.id} />)
        ) : (
          <span className="text-center">
            Oups il n&apos;y a aucune séance ! Crées en une !
          </span>
        )}
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
