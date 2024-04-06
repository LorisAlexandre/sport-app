"use server";

import cloudinary from "cloudinary";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ToastError } from "../ui";

export const Proof = async () => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME ?? "",
      api_key: process.env.API_KEY_CLOUD ?? "",
      api_secret: process.env.API_SECRET_CLOUD ?? "",
    });

    const IMAGES = await cloudinary.v2.api.resources({
      type: "upload",
      prefix: "propulze/",
      tags: "proof",
    });

    return (
      <div className="flex items-center justify-center">
        <Carousel className="sm:w-[300px] w-[250px]">
          <CarouselContent>
            {IMAGES.resources
              .reverse()
              .map((img: { url: string }, i: number) => (
                <CarouselItem key={i}>
                  <Image
                    src={img.url}
                    alt="product proof"
                    width={300}
                    height={500}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <ToastError message={String(error)} statusCode={500} />;
  }
};
