"use server";

import { auth } from "@/lib/auth";
import { BuyButton } from "../ui";

export const Herobanner = async () => {
  const session = await auth();

  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center">
      <h2 className="uppercase font-bold text-4xl text-center drop-shadow-[0_0px_16px_#F5AF00]">
        Tous tes coachings au même endroit !
      </h2>
      <p className="text-center font-medium">
        L’app de coaching avec tous tes besoins pour tes sportifs, suivi des
        performances, gestion des séances. Fais de tes athlètes des champions !
      </p>
      <BuyButton session={session} text="coach comme un champion 🚀" />
    </div>
  );
};
