"use server";

import { auth } from "@/lib/auth";
import { BuyButton } from "../ui";

export const BottomPage = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col justify-center gap-10 items-center">
      <h3 className="text-2xl text-center font-bold uppercase">
        <span className="block mb-1 sm:mb-0 sm:inline">
          Boost les résultats de tes sportifs,
        </span>{" "}
        <span className="block mb-1 sm:mb-0 sm:inline">entraîne les,</span>{" "}
        <span className="block sm:inline">surpasse leurs objectifs.</span>
      </h3>
      <p className="text-sm text-center lg:-mt-10">
        Ne perds plus ton temps en te dispersant, propulse tes coachings au
        niveau supérieur
      </p>
      <BuyButton session={session} text="coach des champions 🥇" />
    </div>
  );
};
