import Pricing from "@/components/Pricing";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="pb-32 lg:pb-10">
      <Pricing session={session} />
    </div>
  );
}
