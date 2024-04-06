"use server";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export const Proof = () => {
  const IMAGES = [
    "https://res.cloudinary.com/dkgkzwvlf/image/upload/f_auto,q_auto/v1/propulze/uvwyu0dpl8fug7om6u0e",
    "https://res.cloudinary.com/dkgkzwvlf/image/upload/f_auto,q_auto/v1/propulze/ibjmt2ir46qc7wf2cypy",
    "https://res.cloudinary.com/dkgkzwvlf/image/upload/f_auto,q_auto/v1/propulze/mfmvbpx5dkw04gp1kao7",
    "https://res.cloudinary.com/dkgkzwvlf/image/upload/f_auto,q_auto/v1/propulze/ozggg5sfpheikkef57m5",
    "https://res.cloudinary.com/dkgkzwvlf/image/upload/f_auto,q_auto/v1/propulze/o5nsnujfpaxowqvmll90",
    "https://res.cloudinary.com/dkgkzwvlf/image/upload/f_auto,q_auto/v1/propulze/k3dreucgfb1wdcxdjdc3",
  ];

  return (
    <div className="flex items-center justify-center">
      <Carousel className="sm:w-[300px] w-[250px]">
        <CarouselContent>
          {IMAGES.map((img, i: number) => (
            <CarouselItem key={i}>
              <Image src={img} alt="product proof" width={300} height={500} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
