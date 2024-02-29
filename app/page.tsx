import { Loginbutton, Logoutbutton } from "@/components";
import { BuyButton } from "@/components/BuyButton";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col w-fit p-10 gap-6">
      <p>{session?.user?.email} welcome to my boilerplate</p>
      {session ? <Logoutbutton /> : <Loginbutton />}

      <br />
      <br />
      <BuyButton />
    </div>
  );
}
