/* eslint-disable @next/next/no-img-element */
"use client";
import Polaroid, { type polaroidVariants } from "@/components/blocks/polaroid";
import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [isImageLoading, setIsImageLoading] = useState(false);

	useEffect(() => {
		if (isInView && !isVisible) {
			setIsVisible(true);
		}
	}, [isInView, isVisible]);

	const openViewer = useCallback((index: number) => {
		setCurrentIndex(index);
		setIsViewerOpen(true);
	}, []);

	const closeViewer = useCallback(() => {
		setIsViewerOpen(false);
	}, []);

	const nextImage = useCallback(() => {
		setIsImageLoading(true);
		setCurrentIndex((prev) => (prev + 1) % images.length);
	}, [images.length]);

	const prevImage = useCallback(() => {
		setIsImageLoading(true);
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	}, [images.length]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!isViewerOpen) return;

			if (e.key === "Escape") closeViewer();
			if (e.key === "ArrowRight") nextImage();
			if (e.key === "ArrowLeft") prevImage();
		},
		[isViewerOpen, nextImage, prevImage, closeViewer],
	);

	// Global keyboard listener
	useEffect(() => {
		if (isViewerOpen) {
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}
	}, [isViewerOpen, handleKeyDown]);

	return (
		<>
			<div
				ref={ref}
				className="relative mb-4 mt-2 p-2"
				style={{ height: "160px" }}
			>
				{images.map((image, index) => (
					<Polaroid
						isVisible={isVisible}
						index={index}
						total={images.length}
						key={image.src}
						variant={image.variant}
						onClick={() => openViewer(index)}
						src={image.src}
					/>
				))}
			</div>

			{/* Amazing Full-Screen Image Viewer */}
			<AnimatePresence>
				{isViewerOpen && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
					>
						{/* Immersive Background */}
						<motion.div
							className="absolute inset-0 bg-black/90 backdrop-blur-md"
							initial={{ backdropFilter: "blur(0px)" }}
							animate={{ backdropFilter: "blur(12px)" }}
							exit={{ backdropFilter: "blur(0px)" }}
							onClick={closeViewer}
						/>

						{/* Main Content Container */}
						<div className="relative z-10 w-full h-full flex flex-col">
							{/* Header */}
							<motion.div
								className="flex items-center justify-between p-6 text-white"
								initial={{ y: -50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.1, duration: 0.4 }}
							>
								<div>
									<h2 className="text-2xl font-bold">{event}</h2>
									{title && <p className="text-gray-300 mt-1">{title}</p>}
								</div>
								<div className="flex items-center gap-4">
									<span className="text-sm text-gray-400">
										{currentIndex + 1} / {images.length}
									</span>
									<button
										onClick={closeViewer}
										className="p-2 hover:bg-white/10 rounded-full transition-colors"
									>
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</motion.div>

							{/* Image Container */}
							<div className="flex-1 flex items-center justify-center p-6">
								<motion.div
									key={currentIndex}
									className="relative w-full h-[80vh] max-w-4xl mx-auto"
									initial={{ scale: 0.8, opacity: 0, rotateY: 15 }}
									animate={{
										scale: 1,
										opacity: 1,
										rotateY: 0,
									}}
									exit={{ scale: 0.8, opacity: 0, rotateY: -15 }}
									transition={{
										duration: 0.4,
										ease: [0.25, 0.46, 0.45, 0.94],
										type: "spring",
										stiffness: 200,
										damping: 25,
									}}
								>
									<div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
										<Image
											src={images[currentIndex].src}
											alt=""
											width={800}
											height={600}
											className={`object-contain max-w-full max-h-full rounded-xl transition-all duration-300 ${
												isImageLoading
													? "blur-sm scale-105"
													: "blur-0 scale-100"
											}`}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
											priority
											onLoad={() => setIsImageLoading(false)}
										/>

										{/* Loading overlay */}
										{isImageLoading && (
											<div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
												<div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											</div>
										)}

										{/* Subtle gradient overlay */}
										<div className="absolute inset-0 pointer-events-none" />
									</div>
								</motion.div>
							</div>

							{/* Navigation Controls */}
							<motion.div
								className="flex items-center justify-center gap-8 p-6"
								initial={{ y: 50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.2, duration: 0.4 }}
							>
								<button
									onClick={prevImage}
									className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
									disabled={images.length <= 1}
								>
									<svg
										className="w-6 h-6 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 19l-7-7 7-7"
										/>
									</svg>
								</button>

								{/* Progress Dots */}
								<div className="flex gap-2">
									{images.map((_, index) => (
										<button
											key={index}
											onClick={() => {
												setIsImageLoading(true);
												setCurrentIndex(index);
											}}
											className={`w-2 h-2 rounded-full transition-all duration-200 ${
												index === currentIndex
													? "bg-white scale-125"
													: "bg-white/40 hover:bg-white/60"
											}`}
										/>
									))}
								</div>

								<button
									onClick={nextImage}
									className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
									disabled={images.length <= 1}
								>
									<svg
										className="w-6 h-6 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</button>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default PolaroidGallery;
