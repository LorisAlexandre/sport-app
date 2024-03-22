"use client";

import { ChangeEvent, useState } from "react";
import { Button } from ".";

export const GetTestimonials = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [notes, setNotes] = useState("");

  const handleChangeCommentaire = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSend = async () => {};

  return (
    <div className="flex flex-col gap-2">
      <h2 className="uppercase text-xl">
        Laisse moi savoir ce que tu penses de l&apos;app !
      </h2>
      <div className="flex items-center justify-between">
        <label
          htmlFor="terms"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Être mis en avant sur la page d&apos;acceuil
        </label>
        <input
          id="terms"
          type="checkbox"
          checked={isCheck}
          onChange={(e) => setIsCheck(e.target.checked)}
        />
      </div>
      <textarea
        className="border border-black rounded-md resize-y w-full px-4 py-2"
        cols={30}
        rows={10}
        onChange={handleChangeCommentaire}
        onFocus={(e) => e.target.select()}
        value={notes}
      ></textarea>
      <Button variant={"default"} className="w-fit" onClick={handleSend}>
        Envoyer
      </Button>
    </div>
  );
};
