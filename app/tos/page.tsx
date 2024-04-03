import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TOS() {
  return (
    <div className="flex flex-col gap-5 mb-40">
      <Button className="w-fit">
        <Link href={"/"} className="flex justify-center items-center gap-1">
          <ArrowLeft size={20} />
          Retour
        </Link>
      </Button>
      <div className="flex flex-col gap-5">
        <h2 className="px-2">Conditions d&apos;utilisation</h2>
        <div className="flex flex-col gap-3">
          <p className="px-10">
            Les présentes conditions générales régissent l&apos;utilisation de
            ce site propulze.com.Ce site appartient et est géré par Loris
            AlexandreEn utilisant ce site, vous indiquez que vous avez lu et
            compris les conditions d&apos;utilisation et que vous acceptez de
            les respecter en tout temps.
          </p>
          <p className="px-10">Type de site : Produit digital</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Propriété intellectuelle</h3>
          <p className="px-10">
            Tout contenu publié et mis à disposition sur ce site est la
            propriété de Loris Alexandre. Cela comprend, mais n&apos;est pas
            limité aux images, textes, logos, documents, fichiers
            téléchargeables et tout ce qui contribue à la composition de ce
            site.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Comptes</h3>
          <p className="px-10">
            Lorsque vous créez un compte sur notre site, vous acceptez ce qui
            suit :
          </p>
          <ul className="px-10 flex flex-col gap-3">
            <li className="list-disc ml-5">
              que vous êtes seul responsable de votre compte et de la sécurité
              et la confidentialité de votre compte, y compris les mots de passe
              ou les renseignements de nature délicate joints à ce compte, et
            </li>
            <li className="list-disc ml-5">
              que tous les renseignements personnels que vous nous fournissez
              par l&apos;entremise de votre compte sont à jour, exacts et
              véridiques et que vous mettrez à jour vos renseignements
              personnels s&apos;ils changent.
            </li>
          </ul>
          <p className="px-10">
            Nous nous réservons le droit de suspendre ou de résilier votre
            compte si vous utilisez notre site illégalement ou si vous violez
            les conditions d&apos;utilisation acceptable.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Ventes des biens et services</h3>
          <p className="px-10">
            Ce document régit la vente des biens mis à disposition sur notre
            site.
          </p>
          <p className="px-10">Les biens que nous offrons comprennent :</p>
          <ul className="px-10 flex flex-col gap-3">
            <li className="list-disc ml-5">propulze</li>
          </ul>
          <p className="px-10">
            Les biens liés à ce document sont les biens qui sont affichés sur
            notre site au moment où vous y accédez. Cela comprend tous les
            produits énumérés comme étant en rupture de stock. Toutes les
            informations, descriptions ou images que nous fournissons sur nos
            biens sont décrites et présentées avec la plus grande précision
            possible. Cependant, nous ne sommes pas légalement tenus par ces
            informations, descriptions ou images car nous ne pouvons pas
            garantir l&apos;exactitude de chaque produit ou service que nous
            fournissons. Vous acceptez d&apos;acheter ces biens à vos propres
            risques.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Vendus par des tiers</h3>
          <p className="px-10">
            Notre site peut offrir des biens de sociétés tierces. Nous ne
            pouvons pas garantir la qualité ou l&apos;exactitude des biens mis à
            disposition par des tiers sur notre site.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Paiements</h3>
          <p className="px-10">
            Nous acceptons les modes de paiement suivants sur ce site :
          </p>
          <ul className="px-10 flex flex-col gap-3">
            <li className="list-disc ml-5">Carte bancaire</li>
          </ul>
          <p className="px-10">
            Lorsque vous nous fournissez vos renseignements de paiement, vous
            nous confirmez que vous avez autorisé l&apos;utilisation et
            l&apos;accès à l&apos;instrument de paiement que vous avez choisi
            d&apos;utiliser. En nous fournissant vos détails de paiement, vous
            confirmez que vous nous autorisez à facturer le montant dû à cet
            instrument de paiement.
          </p>
          <p className="px-10">
            Si nous estimons que votre paiement a violé une loi ou l&apos;une de
            nos conditions d&apos;utilisation, nous nous réservons le droit
            d&apos;annuler votre transaction.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Limitation de responsabilité</h3>
          <p className="px-10">
            Loris Alexandre ou l&apos;un de ses employés sera tenu responsable
            de tout problème découlant de ce site. Néanmoins, Loris Alexandre et
            ses employés ne seront pas tenus responsables de tout problème
            découlant de toute utilisation irrégulière de ce site.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Indemnité</h3>
          <p className="px-10">
            En tant qu&apos;utilisateur, vous indemnisez par les présentes Loris
            Alexandre de toute responsabilité, de tout coût, de toute cause
            d&apos;action, de tout dommage ou de toute dépense découlant de
            votre utilisation de ce site ou de votre violation de l&apos;une des
            dispositions énoncées dans le présent document.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Lois applicables</h3>
          <p className="px-10">
            Ce document est soumis aux lois applicables en France et vise à se
            conformer à ses règles et règlements nécessaires. Cela inclut la
            réglementation à l&apos;échelle de l&apos;UE énoncée dans le RGPD.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Divisibilité</h3>
          <p className="px-10">
            Si, à tout moment, l&apos;une des dispositions énoncées dans le
            présent document est jugée incompatible ou invalide en vertu des
            lois applicables, ces dispositions seront considérées comme nulles
            et seront retirées du présent document. Toutes les autres
            dispositions ne seront pas touchées par les lois et le reste du
            document sera toujours considéré comme valide.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Modifications</h3>
          <p className="px-10">
            Ces conditions générales peuvent être modifiées de temps à autre
            afin de maintenir le respect de la loi et de refléter tout
            changement à la façon dont nous gérons notre site et la façon dont
            nous nous attendons à ce que les utilisateurs se comportent sur
            notre site. Nous recommandons à nos utilisateurs de vérifier ces
            conditions générales de temps à autre pour s&apos;assurer
            qu&apos;ils sont informés de toute mise à jour. Au besoin, nous
            informerons les utilisateurs par courriel des changements apportés à
            ces conditions ou nous afficherons un avis sur notre site.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="px-5">Contact</h3>
          <p className="px-10">
            Veuillez communiquer avec nous si vous avez des questions ou des
            préoccupations. Nos coordonnées sont les suivantes :
            <ul className="flex flex-col gap-3 px-5">
              <li className="list-disc ml-5">07 69 39 52 49</li>
              <li className="list-disc ml-5">lorisalexandre.dev@gmail.com</li>
              <li className="list-disc ml-5">
                36 avenue du Canigou, Canet-en-Roussillon
              </li>
            </ul>
          </p>
        </div>
        <p className="px-10">
          Date d&apos;entrée en vigueur : le 3 avril 2024.
        </p>
      </div>
    </div>
  );
}
