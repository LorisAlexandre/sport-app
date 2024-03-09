import { ToastError } from "@/components/ui";
import { auth } from "@/lib/auth";
import { CustomResponse } from "@/lib/types/apiRes";

export default async function Home() {
  // const session = await auth();

  // if (!session?.user) {
  //   return (
  //     <ToastError
  //       message="You are not logged in"
  //       statusCode={401}
  //       redirectTo="/auth/login"
  //     />
  //   );
  // }

  // if (session.user.plan === "None" || session.user.plan === "Guest") {
  //   return (
  //     <ToastError
  //       message="Your plan doesn't allow this, you can still upgrade !"
  //       statusCode={401}
  //       redirectTo="/pricing"
  //     />
  //   );
  // }

  const session = await auth();

  const res = await fetch(`${process.env.SERV_URL}/api/workouts/getByUser`, {
    headers: {
      userId: session?.user.id,
    } as RequestInit["headers"],
    cache: "no-cache",
  });

  try {
    const { result, data, message, redirectTo } =
      (await res.json()) as CustomResponse<any>;

    if (!result) {
      return (
        <ToastError
          message={message ?? res.statusText}
          statusCode={res.status}
          redirectTo={redirectTo}
        />
      );
    }
    // console.log(data);
  } catch (error) {
    return (
      <ToastError
        message={`Error with the server. ${String(error)}`}
        statusCode={res.status}
        redirectTo="/"
      />
    );
  }

  return (
    <div>
      <p>
        Salut bienvenue sur sport app lapp de gestion pour les coachs de sport
      </p>
    </div>
  );
}
