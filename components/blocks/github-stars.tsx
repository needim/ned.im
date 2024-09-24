"use client";

import NumberTicker from "@/components/blocks/number-ticker";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconStarFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";
import type React from "react";

export function GithubStars({
	play,
	totalStars,
	repoStats,
}: {
	play: boolean;
	totalStars: number;
	repoStats?: Externals.Github.ApiResponse["data"]["viewer"]["repositories"]["nodes"];
}): React.ReactElement {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<motion.div className="absolute top-1 right-0  transition-all duration-150 opacity-100 text-sm flex gap-1 items-center font-mono delay-300">
					<NumberTicker play={true} value={totalStars} />
					<IconStarFilled className="size-4" />
				</motion.div>
			</TooltipTrigger>
			<TooltipContent align="center" side="top">
				{repoStats?.slice(0, 5).map((repo, index) => (
					<div
						key={`repo-${index}`}
						className="flex items-center gap-2 text-xs"
					>
						<span className="truncate max-w-32">{repo.name}</span>
						<span className="grow" />
						<span className="text-muted-foreground font-mono tabular-nums">
							{repo.stargazerCount}
						</span>
					</div>
				))}
			</TooltipContent>
		</Tooltip>
	);
}
