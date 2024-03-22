import { Session } from "next-auth";
import { BuyButton } from "./ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Check } from "lucide-react";

const Pricing = ({ session }: { session: Session | null }) => {
  return (
    <div>
      <h2 className="text-xl uppercase pb-2">
        Tu es coach ? Gères tout tes coachings facilement !
      </h2>
      <Card>
        <CardHeader>
          <CardTitle className="uppercase text-2xl">Coach plan</CardTitle>
          <CardDescription className="text-black uppercase">
            Tout au même endroit !
          </CardDescription>
          <h3 className="flex gap-1 items-center">
            <span className="text-sm line-through text-black/60 font-bold">
              100€
            </span>
            <span className="text-2xl font-bold ">50€</span>
            <span>eur</span>
          </h3>
        </CardHeader>
        <CardContent>
          <ul>
            <li className="flex items-center gap-2">
              <Check />
              <span>Création & modification de séance simple</span>
            </li>
            <li className="flex items-center gap-2">
              <Check />
              <span>Partage de séance simple</span>
            </li>
            <li className="flex items-center gap-2">
              <Check />
              <span>Suivi du parcours des coachés</span>
            </li>
            <li className="flex items-center gap-2">
              <Check />
              <span>Simple d&apos;utilisation pour les coachés</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <BuyButton session={session} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Pricing;
