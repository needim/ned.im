"use client";

import { GithubStars } from "@/components/blocks/github-stars";
import { ProjectCard } from "@/components/blocks/project-card";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import type React from "react";

export function OpenSourceCard({
	link,
	totalStars,
	repoStats,
	debug = false,
}: {
	link: string;
	totalStars: number;
	debug?: boolean;
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
				<GithubStars
					play={hovering}
					totalStars={totalStars}
					repoStats={repoStats}
				/>
			)}
		/>
	);
}
