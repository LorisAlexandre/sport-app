import Pricing from "@/components/Pricing";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <Pricing session={session} />
    </div>
  );
}
