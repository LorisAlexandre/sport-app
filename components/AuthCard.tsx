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
    <Card className="lg:max-w-[400px] mx-auto">
      <CardHeader className="flex items-center">
        <CardTitle>Salut prêt à commencer 💪 ?</CardTitle>
        <CardDescription>Plus qu'un clique et c'est bon !</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button
          variant={"default"}
          className="flex gap-4"
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
