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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                onClick={() => {
                  setStartIndex(index);
                  setIsDialogOpen(true);
                }}
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
              {images.map((image, index) => (
                <CarouselItem key={image.src}>
                  <div className="flex items-center justify-center w-full h-full max-h-[80vh]">
                    <Image
                      alt={`${event} - ${title || ''} - 图片 ${index + 1}`}
                      src={image.src}
                      width={1200}
                      height={800}
                      className="object-contain w-auto h-auto max-h-[80vh]"
                      priority={index === startIndex}
                      loading={index === startIndex ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  </div>
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
