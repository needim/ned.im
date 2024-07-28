/* eslint-disable @next/next/no-img-element */
"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Polaroid, { type polaroidVariants } from "@/components/blocks/polaroid";
import { useMediaQuery } from "@uidotdev/usehooks";

type TImage = {
	src: string;
	variant: keyof typeof polaroidVariants;
};

const PolaroidGallery = ({
	images,
	event,
	title,
}: { images: Array<TImage>; event: string; title?: string }) => {
	const isMobile = useMediaQuery("(max-width: 640px)");
	return (
		<Dialog>
			<DialogTrigger disabled={!isMobile}>
				<div className="grid grid-cols-12 items-center -gap-10 mt-2">
					{images.map((image) => (
						<Polaroid key={image.src} variant={image.variant} src={image.src} />
					))}
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{event}</DialogTitle>
					<DialogDescription>{title}</DialogDescription>
				</DialogHeader>
				<div>
					<Carousel>
						<CarouselContent>
							{images.map((image) => (
								<CarouselItem
									key={image.src}
									className="md:basis-1/2 lg:basis-1/3"
								>
									<img src={image.src} alt="" />
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default PolaroidGallery;
