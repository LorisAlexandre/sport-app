import Link from "next/link";
import { Button } from "../ui";

export const Footer = () => {
  return (
    <div className="flex pt-20 pb-32 -mx-5 px-10 min-w-[100%] flex-col sm:flex-row gap-4 md:gap-10 border-t justify-center items-start">
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
      <div>
        <h3 className="uppercase text-lg text-black/90">Réseaux sociaux</h3>
        <ul className="text-sm flex flex-col gap-1">
          <li>
            <Link href={"https://twitter.com/loulouritos66"}>Twitter</Link>
          </li>
          <li>
            <Link href={"https://www.producthunt.com/@loris_alexandre"}>
              Product Hunt
            </Link>
          </li>
          <li>
            <Link
              href={"https://www.linkedin.com/in/loris-alexandre-79236426a/"}
            >
              LinkedIn
            </Link>
          </li>
          <li>
            <Link href={"https://www.reddit.com/user/loulouritos/"}>
              Reddit
            </Link>
          </li>
          <li>
            <Link
              href={
                "https://www.facebook.com/people/Loris-Alexandre/pfbid0rppS6u4YqFmrWE46j1UNKNYPGurM4k5rZX6Ybn6HubyW1hvUS8r8cpRPsVfwbhshl/"
              }
            >
              Facebook
            </Link>
          </li>
          <li>
            <Link href={"https://www.instagram.com/loris.alexandre/"}>
              Instagram
            </Link>
          </li>
        </ul>
      </div>
      {/* <div>
        <h3 className="uppercase text-lg text-black/90">
          Tu veux que je te tiennes au jus ?
        </h3>
        <form className="flex gap-1">
          <input
            className="flex-1 border border-black py-2 px-4 rounded-lg"
            type="text"
            placeholder="johndoe@gmail.com"
          />
          <Button type="submit" className="bg-[#F5AF00] hover:bg-[#F5AF00]/80">
            Go
          </Button>
        </form>
      </div> */}
    </div>
  );
};
