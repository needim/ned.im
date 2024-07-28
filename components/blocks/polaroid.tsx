"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export const polaroidVariants = {
	"1x1": "w-20 h-20",
	"4x5": "w-20 h-24",
	"4x3": "w-20 h-16",
};

const Polaroid = ({
	src,
	variant,
	onClick,
	fullscreen,
}: {
	src: string;
	variant: keyof typeof polaroidVariants;
	onClick?: () => void;
	fullscreen?: boolean;
}) => {
	const variantClasses = polaroidVariants[variant] || polaroidVariants["1x1"];
	const randomRotation = Math.random() * 30 - 15;

	return (
		<motion.div
			onClick={onClick}
			animate={{ rotate: fullscreen ? 0 : randomRotation }}
			whileHover={{ rotate: 0, scale: 1.2, zIndex: 20, cursor: "zoom-in" }}
			className={cn(
				"w-20 h-auto shadow-polaroid z-10 relative",
				fullscreen && "w-full h-full",
			)}
		>
			<motion.div
				className={cn(
					"w-auto h-auto relative",
					fullscreen ? "h-auto min-w-72" : variantClasses,
				)}
			>
				<Image
					fill
					className="object-contain bg-white p-1.5"
					src={src}
					alt=""
				/>
			</motion.div>
		</motion.div>
	);
};

export default Polaroid;
