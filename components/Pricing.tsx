import { Session } from "next-auth";
import { BuyButton } from "./ui";

const Pricing = ({ session }: { session: Session | null }) => {
  return (
    <div>
      <h1>Bienvenue devient membre</h1>
      <BuyButton session={session} />
    </div>
  );
};

export default Pricing;
