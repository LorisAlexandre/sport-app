"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from ".";
import { useRouter } from "next/navigation";
import { CustomResponse } from "@/lib/types/apiRes";
import { Workout } from "@prisma/client";
import { useErrorProvider } from "@/providers/ErrorProvider";

export const TopNavbar = () => {
  const { setMessage, setStatusCode, handleRedirect } = useErrorProvider();

  const router = useRouter();
  const url = usePathname();
  const { data: session } = useSession();
  const urls = ["/dashboard", "/workout", "/account"];

  const handleCreateWorkout = async () => {
    const res = await fetch("/api/workouts/create", {
      method: "POST",
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      setMessage(res.statusText);
      setMessage(res.statusText);
    }

    const { result, data, redirectTo, message } =
      (await res.json()) as CustomResponse<Workout>;

    if (!result) {
      setStatusCode(res.status);
      setMessage(message ?? res.statusText);
      redirectTo && handleRedirect(redirectTo);
    }

    // console.log(data);
  };

  if (!urls.includes(url)) {
    return;
  }

  const baselineChoice = () => {
    let baseline;
    switch (url) {
      case "/workout": {
        baseline = "Ready to train ?";
        break;
      }
      case "/dashboard": {
        baseline = "Contemplate your progress !";
        break;
      }
      case "/account": {
        baseline = "Change your life and your settings";
        break;
      }
      default: {
        break;
      }
    }

    return baseline;
  };

  return (
    <div className="w-full flex justify-between">
      <div>
        <h1 className="font-oswald font-bold text-3xl uppercase">
          Hi {session?.user?.name}
        </h1>
        <p className="uppercase text-xs">{baselineChoice()}</p>
      </div>
      {url === "/workout" && (
        <Button className="bg-white" onClick={handleCreateWorkout}>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.29167 12H22.7083M12.5 1.79166V22.2083"
              stroke="#09090B"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      )}
    </div>
  );
};
