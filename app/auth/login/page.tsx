import AuthCard from "@/components/AuthCard";
import { Logo } from "@/components/ui";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen p-10">
      <Logo />
      <div className="flex flex-col justify-center flex-1 -mt-20">
        <AuthCard />
      </div>
    </div>
  );
}
