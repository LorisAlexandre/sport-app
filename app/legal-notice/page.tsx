import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LegalNotice() {
  return (
    <div className="flex flex-col gap-5">
      <Button className="w-fit">
        <Link href={"/"} className="flex justify-center items-center gap-1">
          <ArrowLeft size={20} />
          Retour
        </Link>
      </Button>
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="px-5">Mentions légales</h3>
          <p className="px-10">
            Propulze appartient à l&apos;auto entreprise de Loris Alexandre dont
            l&apos;adresse se situe au 36 avenue du canigou 66140 Canet en
            Roussillon.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Hébergement</h3>
          <p className="px-10">
            [adresse]. Le site est hébergé par la société [nom de la société],
            dont le siège social est situé [adresse siège social].
          </p>
          <p className="px-10">
            Les informations concernant la collecte et le traitement des données
            personnelles sont disponibles dans{" "}
            <Link href={"privacy-policy"} className="underline">
              la politique de confidentialité
            </Link>{" "}
            du site.
          </p>
          <p className="px-5 mt-5">Tous droits réservés</p>
        </div>
      </div>
    </div>
  );
}
