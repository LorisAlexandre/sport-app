"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const url = usePathname();
  const urls = ["/dashboard", "/workout", "/account"];

  if (!urls.includes(url)) {
    return;
  }

  return (
    <div className="fixed bottom-0 right-0 flex w-full justify-between items-center pt-2 bg-white border border-t-4 border-t-black border-x-0 border-b-0 uppercase text-md lg:text-2xl">
      <Link
        href={"/workout"}
        className={`font-oswald font-bold flex-1 h-fit text-center ${
          url === "/workout" ? "" : "text-[#505050]"
        }`}
      >
        <div className="flex flex-col items-center">
          <span>💪</span>
          <span>Séances</span>
        </div>
      </Link>
      <Link
        href={"/dashboard"}
        className={`font-oswald font-bold flex-1 h-fit text-center ${
          url === "/dashboard" ? "" : "text-[#505050]"
        }`}
      >
        <div className="flex flex-col items-center">
          <span>📈</span>
          <span>Tableau de bord</span>
        </div>
      </Link>
      <Link
        href={"/account"}
        className={`font-oswald font-bold flex-1 h-fit text-center ${
          url === "/account" ? "" : "text-[#505050]"
        }`}
      >
        <div className="flex flex-col items-center">
          <span>⚙</span>
          <span>Mon compte</span>
        </div>
      </Link>
    </div>
  );
};
