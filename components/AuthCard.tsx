"use client";

import Image from "next/image";
import { Button } from "./ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { signIn } from "next-auth/react";

const AuthCard = () => {
  return (
    <Card className="lg:max-w-[400px] mx-auto border-none drop-shadow-[0_0px_16px_#F5AF00] bg-transparent shadow-none">
      <CardHeader className="flex items-center">
        <CardTitle className="uppercase text-3xl">
          Salut prêt à commencer 💪 ?
        </CardTitle>
        <CardDescription>
          Plus qu&apos;un clique et on passe à la vitesse supérieure !
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button
          variant={"default"}
          className="flex gap-4 uppercase text-base"
          onClick={() => signIn("google", { callbackUrl: "/account" })}
        >
          <Image
            className="h-fit"
            src={"/assets/google.svg"}
            alt={"Logo google"}
            width={20}
            height={20}
          />
          <span>Connecte toi avec Google</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthCard;
