import Image from "next/image";
import Link from "next/link";
import img from "@/public/assets/product-hunt-logo.png";

export const ProductHunt = () => {
  return (
    <Link href={""}>
      <Image
        alt="product hunt logo horizontal orange"
        src={img}
        width={150}
        height={150}
      />
    </Link>
  );
};
