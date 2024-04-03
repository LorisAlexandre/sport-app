import svg from "@/public/assets/reddit.svg";
import Image from "next/image";
import Link from "next/link";

export const Reddit = () => {
  return (
    <Link href={""}>
      <Image src={svg} alt="Reddit logo" width={150} height={150} />
    </Link>
  );
};
