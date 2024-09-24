"use client";

import { cn } from "@/lib/utils";
import { IconArrowUpRight } from "@tabler/icons-react";
import { useHover } from "@uidotdev/usehooks";
import Link from "next/link";
import type React from "react";

export function ProjectCard({
	title,
	description,
	link,
	icon: Icon,
	label = "Visit",
	extra,
	debug = false,
}: {
	title: string;
	description: string;
	label?: string;
	link: string;
	icon: React.ReactNode;
	extra?: (params: { hovering: boolean }) => React.ReactNode;
	debug?: boolean;
}): React.ReactElement {
	const [ref, hovering] = useHover();

	return (
		<Link
			href={link}
			target={link.startsWith("http") ? "_blank" : undefined}
			ref={ref}
			className={cn(
				"group relative h-48 w-full rounded-3xl cursor-pointer overflow-hidden shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px] bg-card/20 p-6 ring-2 hover:ring-3 ring-zinc-900/5 dark:ring-zinc-800 transition-all duration-500 hover:ring-zinc-600/20 dark:hover:ring-zinc-700",
				debug && "debug overflow-visible",
			)}
		>
			<div
				className={cn(
					"relative flex h-full w-full flex-col justify-between",
					debug && "debug",
				)}
			>
				<div className="size-10 origin-top-left pt-3 duration-500 group-hover:scale-75 group-hover:pt-0">
					{Icon}
				</div>
				<div className="flex flex-col text-base transition-transform duration-500 group-hover:-translate-y-6">
					<span className="text-lg font-semibold">{title}</span>
					<span className="text-base text-balance text-muted-foreground">
						{description}
					</span>
				</div>
				{/* cta text  */}
				<div className="pointer-events-none absolute -bottom-20 h-10 w-full text-base font-semibold transition-all duration-500 group-hover:-bottom-5">
					{label}
				</div>

				{/* cta icon  */}
				<span className="pointer-events-none absolute h-10 bottom-10 -right-20 scale-50 transition-all duration-300 group-hover:-bottom-5 group-hover:-right-1 group-hover:scale-100">
					<IconArrowUpRight />
				</span>

				{/* background shapes */}
				<span
					className={cn(
						"pointer-events-none absolute -left-[32rem] -top-[32rem] block size-[30rem] origin-bottom-right translate-x-0 translate-y-0 transform rounded-full opacity-10 transition-all duration-300 group-hover:-left-[7rem] group-hover:-top-[10rem]",
						"bg-zinc-300 dark:bg-zinc-800",
					)}
				/>
				<span
					className={cn(
						"pointer-events-none absolute bottom-0 right-0 mb-32 block size-[30rem] origin-top-left translate-x-[56rem] translate-y-[23rem] rotate-45 transform rounded-[15rem] opacity-10 transition duration-300 group-hover:rotate-90",
						"bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-200 via-zinc-700 to-zinc-800",
					)}
				/>
				<span
					className={cn(
						"pointer-events-none absolute -bottom-0 -right-5 mb-32 block size-[30rem] origin-top-left translate-x-[56rem] translate-y-[23rem] rotate-45 transform rounded-[15rem] opacity-10 transition duration-300 group-hover:rotate-90 delay-75",
						"bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-200 via-zinc-700 to-zinc-800",
					)}
				/>

				{/* <GithubStars
					play={hovering}
					totalStars={11}
					// repoStats={repoStats}
				/> */}

				{extra?.({ hovering })}
			</div>
		</Link>
	);
}
