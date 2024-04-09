import Image from "next/image";
import me from "@/public/assets/me.jpg";

export const WhoAMI = () => {
  return (
    <div className="flex flex-col gap-3 items-start px-5">
      <div className="flex items-center gap-5">
        <Image
          src={me}
          alt="me"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <p>Loris</p>
          <p className="text-xs">Fondateur de Propulze</p>
        </div>
      </div>
      <p className="text-sm">
        Il y a deux ans, en pleine période de doute et de remise en question,
        j&apos;ai <span className="font-bold">découvert</span> le développement
        web.
      </p>
      <p className="text-sm">
        Je me suis donc lancé dans cette{" "}
        <span className="font-bold">aventure</span> qu&apos;est l&apos;indie
        project : développer des applications à un{" "}
        <span className="font-bold">but précis</span> qui répondent à une
        problématique.
      </p>
      <p className="text-sm">
        Aujourd&apos;hui, je vous présente une{" "}
        <span className="font-bold">application</span> pour l&apos;un de mes
        sujets préférés : <span className="font-bold">le sport</span>.
      </p>
      <p className="text-sm">
        Que ce soit du streetworkout à la musculation en passant par le yoga,
        tous les sports apportent un{" "}
        <span className="font-bold">mental d&apos;acier</span> si on persiste.
      </p>
      <p className="text-sm">
        Donc pour les coachs qui nous aident à devenir{" "}
        <span className="font-bold">meilleur</span> chaque jour, voici de quoi{" "}
        <span className="font-bold">vous aider</span>.
      </p>
    </div>
  );
};

/*
 */
