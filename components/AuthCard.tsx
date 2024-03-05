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
import { signIn, useSession } from "next-auth/react";

const AuthCard = () => {
  return (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle>Hi ready to start 💪 ?</CardTitle>
        <CardDescription>Only one click left, just do it !</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button
          className="flex gap-4"
          onClick={() => signIn("google", { callbackUrl: "/workout" })}
        >
          <Image
            className="h-fit"
            src={"/assets/google.svg"}
            alt={"Logo google"}
            width={20}
            height={20}
          />
          <span>Connect with Google</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthCard;
