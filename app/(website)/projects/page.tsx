import { Container } from "@/components/blocks/container";
import { SectionDivider } from "@/components/blocks/section-divider";
import { projects } from "@/lib/utils";
import { getGithubInfo } from "@/server/thirdparty";
import { IconCalendar } from "@tabler/icons-react";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Projects",
};

const getYear = (date: string) => new Date(date).getFullYear();

export default async function Home() {
	const githubResponse = await getGithubInfo();

	const enrichedProjects = projects.map((project) => {
		const repo = githubResponse.data.viewer.repositories.nodes.find(
			(repo) => repo.nameWithOwner === project.githubSlug,
		);

		if (!repo) {
			return project;
		}

		return {
			...project,
			released: repo.createdAt,
			metrics: [
				{
					label: "Stars",
					value: repo.stargazerCount,
				},
				{
					label: "Forks",
					value: repo.forkCount,
				},
			],
		};
	});
	const featuredProjects = enrichedProjects.filter(
		(project) => project.featured,
	);
	const otherProjects = enrichedProjects.filter((project) => !project.featured);

	return (
		<Container className="py-10 pb-12 sm:py-12">
			<div className=" px-8">
				<h1 className="text-5xl/[1.05]">Projects</h1>
				<div className="mt-3 text-balance text-base/7 text-muted-foreground">
					<p>
						Things I have shipped, maintained, or kept around because they are
						still useful.
					</p>
				</div>
			</div>

			<div className="mt-8 grid grid-cols-1 border-y border-border/50">
				{featuredProjects.map((project, index) => (
					<React.Fragment key={`project-${index}`}>
						<article className="group relative px-8 py-6 transition-colors duration-300 hover:bg-muted dark:hover:bg-muted/30">
							<div className="flex items-start justify-between gap-4">
								<div className="min-w-0">
									<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
										<a
											href={project.links[0].href}
											target="_blank"
											rel="noreferrer"
											className="text-xl/7 font-semibold transition-colors hover:text-sky-600 dark:hover:text-sky-400"
										>
											{project.name}
										</a>
										{project.bottomText && (
											<span className="border border-sky-200 bg-sky-50 px-2 py-0.5 text-xxs font-semibold uppercase tracking-wide text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-300">
												{project.bottomText}
											</span>
										)}
										{project.deprecated && (
											<span className="border border-border/70 px-2 py-0.5 text-xxs font-semibold uppercase tracking-wide text-muted-foreground">
												Archived
											</span>
										)}
									</div>
									<p className="mt-2 max-w-2xl text-base/7 text-muted-foreground">
										{project.description}
									</p>
								</div>
								<div className="hidden shrink-0 sm:block">{project.logo}</div>
							</div>

							<div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
									<span className="inline-flex items-center gap-1.5">
										<IconCalendar className="size-4" />
										{getYear(project.released)}
									</span>
									{project.metrics.map((metric, index) => (
										<span
											key={`metric-${index}`}
											className="inline-flex items-baseline gap-1.5"
										>
											<span className="font-mono text-base font-semibold text-foreground">
												{metric.value}
											</span>
											{metric.label}
										</span>
									))}
								</div>
								<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
									{project.links.map((link, index) => (
										<a
											key={`link-${index}`}
											href={link.href}
											target={
												link.href.startsWith("http") ? "_blank" : undefined
											}
											rel={
												link.href.startsWith("http") ? "noreferrer" : undefined
											}
											className="flex items-center gap-1 font-medium transition-colors hover:text-foreground"
										>
											{<link.icon className="size-4" />}
											{link.label}
										</a>
									))}
								</div>
							</div>
						</article>
						{index !== featuredProjects.length - 1 && <SectionDivider />}
					</React.Fragment>
				))}
			</div>

			<div className="px-8">
				<p className="mt-10 text-muted-foreground">
					Smaller experiments and older work live here. More code is on{" "}
					<a
						href="https://github.com/needim"
						className="font-semibold transition-colors"
						target="_blank"
						rel="noreferrer"
					>
						my GitHub.
					</a>
					.
				</p>

				<div className="flex flex-col gap-3 mt-4">
					{otherProjects.map((project, index) => (
						<a
							href={project.links[0].href}
							key={`project-${index}`}
							className="group relative w-full cursor-pointer overflow-hidden border border-border/70 bg-card/20 px-4 py-3 transition-colors hover:border-border hover:bg-muted/60 dark:hover:bg-muted/30"
						>
							<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
								<div className="min-w-0">
									<div className="whitespace-nowrap flex items-center font-medium">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="mr-1 inline-block"
										>
											<path d="M7 7h10v10" />
											<path d="M7 17 17 7" />
										</svg>
										{project.name}
									</div>
									<p className="text-muted-foreground">{project.description}</p>
								</div>
								<span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1em"
										height="1em"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="3"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="mr-1 inline-block"
									>
										<path d="M8 2v4" />
										<path d="M16 2v4" />
										<rect width="18" height="18" x="3" y="4" rx="2" />
										<path d="M3 10h18" />
									</svg>
									{getYear(project.released)}
								</span>
							</div>
						</a>
					))}
				</div>
			</div>
		</Container>
	);
}
