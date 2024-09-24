"use client";

import PolaroidGallery from "@/components/blocks/polaroid-gallery";
import { changelog, cn, formattedDateTimeline } from "@/lib/utils";
import { type Variants, motion } from "framer-motion";
import type React from "react";

export function ChangelogList(): React.ReactElement {
	const container: Variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	const item: Variants = {
		hidden: { opacity: 0, top: -10 },
		show: { opacity: 1, top: 0 },
	};

	return (
		<motion.div
			className="mt-12"
			variants={container}
			initial="hidden"
			animate="show"
		>
			{changelog.map((log, index) => (
				<motion.div variants={item} key={index} className="relative group/item">
					<div className="flex gap-x-3">
						<div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-zinc-200/50 dark:after:bg-zinc-700/50">
							<div className="relative z-10 size-7 flex justify-center items-center">
								<div
									className={cn(
										"size-2 text-base rounded-full",
										!log.icon && "bg-zinc-400 dark:bg-zinc-600",
									)}
								>
									<div className="relative z-0 whitespace-nowrap w-11 text-center text-xl -top-2.5 -left-[18px]">
										{log.icon && log.icon}
									</div>
								</div>
							</div>
						</div>

						<div
							className={cn(
								"grow pt-0.5 pb-8 relative",
								index === changelog.length - 1 && "pb-0",
							)}
						>
							<p className="text-xs block mt-1 sm:absolute sm:mt-0 sm:top-1.5 right-0 text-muted-foreground">
								{formattedDateTimeline(log.date, log?.dateFormatOptions)}
							</p>
							<h2 className="mt-0.5 sm:mt-0 font-sans text-md !font-normal">
								<span className="font-semibold">{log.event}</span> — {log.title}
							</h2>
							{log.description && (
								<p className="mt-0.5 sm:mt-1 text-sm text-muted-foreground">
									{log.description.split("\n").map((line, index) => (
										<span key={index}>
											{line}
											<br />
										</span>
									))}
								</p>
							)}
							{/* biome-ignore lint/complexity/useOptionalChain: <explanation> */}
							{log.photos && log.photos.length && (
								<PolaroidGallery
									images={log.photos}
									event={log.event}
									title={log.title}
								/>
							)}
						</div>
					</div>
				</motion.div>
			))}
		</motion.div>
	);
}
