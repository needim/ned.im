"use client";

import { ContributionGraph } from "@/components/blocks/contribution-graph";
import { GithubStars } from "@/components/blocks/github-stars";
import { ProjectCard } from "@/components/blocks/project-card";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import type React from "react";

export function OpenSourceCard({
	link,
	totalStars,
	contributions,
	repoStats,
	debug = false,
}: {
	link: string;
	totalStars: number;
	debug?: boolean;
	contributions: Externals.Github.ContributionDay[];
	repoStats: Externals.Github.ApiResponse["data"]["viewer"]["repositories"]["nodes"];
}): React.ReactElement {
	return (
		<ProjectCard
			debug={debug}
			title="Open Source"
			description="Check out my open source projects on GitHub."
			link={link}
			icon={<IconBrandGithubFilled className="size-10" />}
			extra={({ hovering }) => (
				<>
					<div className="absolute -top-1 left-10">
						<ContributionGraph play={hovering} contributions={contributions} />
					</div>

					<GithubStars
						play={hovering}
						totalStars={totalStars}
						repoStats={repoStats}
					/>
				</>
			)}
		/>
	);
}
