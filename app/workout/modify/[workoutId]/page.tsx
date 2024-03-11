import { ModifWorkout } from "@/components/ModifWorkout";
import { ToastError } from "@/components/ui";
import { auth } from "@/lib/auth";
import { Workout } from "@/lib/db";
import { CustomResponse } from "@/lib/types/apiRes";
import { UpdateWorkoutProvider } from "@/providers/UpdateWorkoutProvider";

export default async function Page({
  params: { workoutId },
}: {
  params: { workoutId: string };
}) {
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

  const res = await fetch(
    `${process.env.SERV_URL}/api/workouts/getById/${workoutId}`,
    {
      headers: {
        userId: session?.user.id,
      } as RequestInit["headers"],
      cache: "no-cache",
    }
  );

  try {
    const { result, data, message, redirectTo } =
      (await res.json()) as CustomResponse<Workout>;

    if (!result) {
      return (
        <ToastError
          message={message ?? res.statusText}
          statusCode={res.status}
          redirectTo={redirectTo}
        />
      );
    }

    return (
      <div className="flex flex-1 flex-col gap-6">
        {data ? (
          <UpdateWorkoutProvider initWorkout={data} session={session}>
            <ModifWorkout />
          </UpdateWorkoutProvider>
        ) : (
          <ToastError
            message="No data"
            statusCode={404}
            redirectTo="/workout"
          />
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
