"use client";

import { ChangeEvent, useState } from "react";
import { Button } from ".";
import { useErrorProvider } from "@/providers/ErrorProvider";
import { CustomResponse } from "@/lib/types/apiRes";
import { User } from "@prisma/client";

export const AddAffiliateLink = ({ userId }: { userId: string }) => {
  const [affLink, setAffLink] = useState("");
  const { setMessage, handleRedirect, setStatusCode } = useErrorProvider();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAffLink(e.target.value);
  };

  const handleSaveAffiliateLink = async () => {
    const res = await fetch("/api/user/update", {
      method: "PATCH",
      headers: {
        userId,
      },
      body: JSON.stringify(affLink),
    });

    try {
      const { result, data, message, redirectTo } =
        (await res.json()) as CustomResponse<User>;

      if (!result || !data) {
        setMessage(message);
        setStatusCode(res.status);
        redirectTo && handleRedirect(redirectTo);
        return;
      }
      window.location.reload();
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status);
    }
  };

  return (
    <div>
      <h2 className="uppercase text-xl">
        Tu es coaché ? Rentres le lien d&apos;affiliation ici !
      </h2>
      <div className="flex gap-4">
        <input
          type="text"
          onChange={handleChange}
          className="border border-black py-2 px-4 flex-1 rounded-lg"
        />
        <Button className="border" onClick={handleSaveAffiliateLink}>
          Save
        </Button>
      </div>
    </div>
  );
};
