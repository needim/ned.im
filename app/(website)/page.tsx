import { CareerCard } from "@/components/blocks/career-card";
import { Container } from "@/components/blocks/container";
import { OpenSourceCard } from "@/components/blocks/opensource-card";
import { ProjectCard } from "@/components/blocks/project-card";
import { SectionDivider } from "@/components/blocks/section-divider";
import { GitHubIcon, XIcon } from "@/components/blocks/social-icons";
import { SocialLink } from "@/components/blocks/social-link";
import { WagesoLogo } from "@/components/wageso-logo";
import { careerItems } from "@/lib/utils";
import { getGithubInfo, getXInfo } from "@/server/thirdparty";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

const currentYear = new Date().getFullYear();
const lastPosition = currentYear - careerItems[careerItems.length - 1].from;

export const metadata: Metadata = {
	title: "Readme",
};

export default async function Readme() {
	const githubResponse = await getGithubInfo();
	const xResponse = await getXInfo();

	const githubFollowers = githubResponse.data.viewer.followers.totalCount;
	const githubStars = githubResponse.data.viewer.repositories.nodes.reduce(
		(acc, repo) => acc + repo.stargazerCount,
		0,
	);

	return (
		<>
			<Container className="px-8 py-12 sm:py-16">
				<div className="max-w-2xl">
					<p className="mb-4 font-mono text-xs/5 font-semibold uppercase tracking-wide text-muted-foreground">
						Software Engineer
					</p>
					<h1 className="text-balance text-4xl/[1.04] sm:text-5xl/[1.02]">
						Nedim Arabacı
					</h1>
					<div className="mt-8 max-w-xl border-l border-border/70 pl-5 text-balance text-base/7 text-muted-foreground sm:text-lg/8">
						<p>
							Hi <span className="text-xl">👋🏻</span>, I&apos;m currently
							working at{" "}
							<Link
								href="https://birdefter.com"
								target="_blank"
								rel="nofollow noreferrer"
								className="font-medium text-foreground underline underline-offset-4"
							>
								@Defter
							</Link>
							.
						</p>
						<p className="mt-4">
							I build and maintain internal tools that keep the company&apos;s
							daily operations, data flows, and business processes running
							smoothly.
						</p>
					</div>
					<div className="mt-7 flex flex-wrap gap-3">
						<SocialLink
							href="https://x.com/needim"
							aria-label="Follow on X"
							count={xResponse.data?.public_metrics?.followers_count}
							label="followers"
							icon={XIcon}
						/>
						<SocialLink
							href="https://github.com/needim"
							aria-label="Follow on GitHub"
							icon={GitHubIcon}
							count={githubFollowers}
							label="followers"
						/>
					</div>
				</div>
			</Container>
			<SectionDivider />
			<Container className="px-8 py-10 sm:py-12">
				<h2 className="text-3xl/[1.1]">Spotlight</h2>
				<p className="mb-8 mt-2 text-base/7 text-muted-foreground">
					Most recent projects and open source contributions.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<ProjectCard
						title="Wageso"
						icon={<WagesoLogo className="size-10" />}
						description="Privacy-first income, expense & assets tracking app."
						link="https://wageso.com"
					/>
					<OpenSourceCard
						link="https://github.com/needim"
						repoStats={githubResponse.data.viewer.repositories.nodes}
						totalStars={githubStars}
					/>
				</div>
			</Container>
			<SectionDivider />
			<Container className="pb-0 pt-10 sm:pt-12">
				<div className="px-8">
					<h2 className="text-3xl/[1.1]">Career</h2>
					<p className="mb-8 mt-2 text-base/7 text-muted-foreground">
						Overall I have{" "}
						<span className="font-semibold">
							{lastPosition}+ years of experience
						</span>{" "}
						in software development.
					</p>
				</div>
				<div className="flex flex-col mt-8">
					{careerItems.map((item, index) => (
						<React.Fragment key={`career-${index}`}>
							<CareerCard key={`career-${index}`} item={item} />
							{index !== careerItems.length - 1 && <SectionDivider />}
						</React.Fragment>
					))}
				</div>
			</Container>
		</>
	);
}
