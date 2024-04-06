"use client";

import { usePathname } from "next/navigation";
import { Button } from ".";
import { useRouter } from "next/navigation";
import { CustomResponse } from "@/lib/types/apiRes";
import { Workout } from "@prisma/client";
import { useErrorProvider } from "@/providers/ErrorProvider";
import { Session } from "next-auth";
import { Plus } from "lucide-react";

export const TopNavbar = ({ session }: { session: Session | null }) => {
  const { setMessage, setStatusCode, handleRedirect } = useErrorProvider();

  const router = useRouter();
  const url = usePathname();
  const urls = ["/dashboard", "/workout", "/account"];

  const handleCreateWorkout = async () => {
    const res = await fetch("/api/workouts/create", {
      headers: {
        userId: session?.user.id,
      } as RequestInit["headers"],
      method: "POST",
      body: JSON.stringify({}),
    });

    try {
      const { result, data, redirectTo, message } =
        (await res.json()) as CustomResponse<Workout>;

      if (!result || !data) {
        setStatusCode(res.status);
        setMessage(message ?? res.statusText);
        redirectTo && handleRedirect(redirectTo);
        return;
      }
      router.push(`/workout/modify/${data.id}`);
    } catch (error) {
      setStatusCode(500);
      setMessage(`An error occured, try again later: ${String(error)}`);
    }
  };

  if (!urls.includes(url)) {
    return;
  }

  const baselineChoice = () => {
    let baseline;
    switch (url) {
      case "/workout": {
        baseline = "Prêt à passer à l'action ?";
        break;
      }
      case "/dashboard": {
        baseline = "Contemple ta progression !";
        break;
      }
      case "/account": {
        baseline = "Change tes paramètres ici.";
        break;
      }
      default: {
        break;
      }
    }

    return baseline;
  };

  const renderAddWorkout = () => {
    let addW = null;

    if (session?.user.plan === "Coach" || session?.user.plan === "Premium") {
      addW = (
        <Button className="flex gap-2" onClick={handleCreateWorkout}>
          Séance
          <Plus size={20} />
        </Button>
      );
    }

    return addW;
  };

  return (
    <div className="w-full flex justify-between">
      <div>
        <h1 className="font-oswald font-bold text-3xl uppercase">
          Salut {session?.user?.name}
        </h1>
        <p className="uppercase text-xs">{baselineChoice()}</p>
      </div>
      {url === "/workout" && <>{renderAddWorkout()}</>}
    </div>
  );
};
