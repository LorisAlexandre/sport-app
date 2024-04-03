import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex pt-20 pb-32 -mx-5 px-10 min-w-[100%] flex-col sm:flex-row gap-4 border-t">
      <div>
        <h3 className="uppercase text-lg text-black/90">Liens</h3>
        <ul className="text-sm flex flex-col gap-1">
          <li>
            <Link href={"/#pricing"}>Prix</Link>
          </li>
          <li>
            <a href="mailto:lorisalexandre.dev@gmail.com">Support</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="uppercase text-lg text-black/90">Légal</h3>
        <ul className="text-sm flex flex-col gap-1">
          <li>
            <Link href={"/legal-notice"}>Mentions légales</Link>
          </li>
          <li>
            <Link href={"/tos"}>Condition d&apos;utilisation</Link>
          </li>
          <li>
            <Link href={"/privacy-policy"}>Politique de confidentialité</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
