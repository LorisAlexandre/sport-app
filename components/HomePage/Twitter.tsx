import svg from "@/public/assets/twitter.svg";
import Image from "next/image";
import Link from "next/link";

export const Twitter = () => {
  return (
    <Link href={""}>
      <Image src={svg} alt="X (twitter) logo" width={50} height={50} />
    </Link>
  );
};
