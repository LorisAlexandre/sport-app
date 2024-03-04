import { BuyButton, LoginButton } from "./ui";
import { findUserByAuthSession } from "@/lib/db";

const Header = async () => {
  const user = await findUserByAuthSession();

  return (
    <div>
      <h1>Header</h1>
      <BuyButton customerId={user?.stripeCustomerId ?? ""} />
      <LoginButton />
      {user && <p>{user?.email}</p>}
    </div>
  );
};

export default Header;
