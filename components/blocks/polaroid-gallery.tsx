/* eslint-disable @next/next/no-img-element */
"use client";
import Polaroid, { type polaroidVariants } from "@/components/blocks/polaroid";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TImage = {
  src: string;
  variant: keyof typeof polaroidVariants;
};

const PolaroidGallery = ({
  images,
  event,
  title,
}: {
  images: Array<TImage>;
  event: string;
  title?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [isVisible, setIsVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
    }
  }, [isInView, isVisible]);

  return (
    <Carousel
      opts={{
        startIndex,
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <div
            ref={ref}
            className="grid grid-cols-12 items-center -gap-10 mt-3"
          >
            {images.map((image, index) => (
              <Polaroid
                isVisible={isVisible}
                index={index}
                total={images.length}
                key={image.src}
                variant={image.variant}
                onClick={() => setStartIndex(index)}
                src={image.src}
              />
            ))}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{event}</DialogTitle>
            <DialogDescription>{title}</DialogDescription>
          </DialogHeader>
          <div>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.src}>
                  <Image
                    alt=""
                    src={image.src}
                    width={image.variant === "1x1" ? 640 : 480}
                    height={image.variant === "1x1" ? 640 : 960}
                    // className="object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </DialogContent>
      </Dialog>
    </Carousel>
  );
};

export default PolaroidGallery;
