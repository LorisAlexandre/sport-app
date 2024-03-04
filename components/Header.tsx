import { auth } from "@/lib/auth";
import { BuyButton, LoginButton } from "./ui";
import { findUserByAuthSession } from "@/lib/db";

const Header = async () => {
  const session = await auth();
  const user = await findUserByAuthSession();

  return (
    <div>
      <h1>Header</h1>
      <BuyButton customerId={user?.stripeCustomerId ?? ""} />
      <LoginButton />
      {session && <p>{session.user?.email}</p>}
    </div>
  );
};

export default Header;
