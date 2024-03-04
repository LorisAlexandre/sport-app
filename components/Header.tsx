import { auth } from "@/lib/auth";
import { BuyButton, LoginButton } from "./ui";

const Header = async () => {
  const session = await auth();

  return (
    <div>
      <h1>Header</h1>
      {session?.user && <p>{session.user.email}</p>}
      <BuyButton />
      <LoginButton />
    </div>
  );
};

export default Header;
