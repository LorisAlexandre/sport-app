import { Session } from "next-auth";
import { BuyButton } from "../ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Check } from "lucide-react";

export const Pricing = ({ session }: { session: Session | null }) => {
  return (
    <div id="pricing" className="flex flex-col items-center justify-center">
      <h2 className="text-xl uppercase pb-4">
        Ça va révolutionner tes coachings !
      </h2>
      <Card className="max-w-[400px] bg-[#F0F0F0] border-none shadow-[0_0px_100px_0px_rgba(245,175,0,0.225)]">
        <CardHeader>
          <CardTitle className="uppercase text-2xl">Coach plan</CardTitle>
          <CardDescription className="uppercase">
            Boost ton organisation, entraîne, surpasse tes objectifs
          </CardDescription>
          <h3 className="flex gap-1 items-center">
            <span className="text-sm line-through text-black/60 font-bold">
              100€
            </span>
            <span className="text-2xl font-bold ">50€</span>
          </h3>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2 text-sm">
              <Check size={20} className="min-w-5" />
              <span>Toutes tes séances centralisées au même endroit</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check size={20} className="min-w-5" />
              <span>Crées et partages tes entraînements facilement</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check size={20} className="min-w-5" />
              <span>Suivi du parcours de tes sportifs</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check size={20} className="min-w-5" />
              <span>
                Donne accès à tes séances a autant de personnes que tu le
                souhaites
              </span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check size={20} className="min-w-5" />
              <span>Gagnes en crédibilité auprès de tes adeptes</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check size={20} className="min-w-5" />
              <span>Gagnes en sérénité et organisation</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check size={20} className="min-w-5" />
              <span>Connectes-toi facilement via Google</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="flex-col items-center">
          <BuyButton session={session} text="Passe au niveau supérieur 🚀" />
          <p className="underline text-sm text-black/80">
            paiement en une fois, disponible à vie
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
