import { Container } from "@/components/blocks/container";
import { SectionDivider } from "@/components/blocks/section-divider";
import { projects } from "@/lib/utils";
import { getGithubInfo } from "@/server/thirdparty";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Projects",
};

export default async function Home() {
	const githubResponse = await getGithubInfo();
	const featuredProjects = projects.filter((project) => project.featured);
	const otherProjects = projects.filter((project) => !project.featured);
	projects.forEach((project) => {
		const repo = githubResponse.data.viewer.repositories.nodes.find(
			(repo) => repo.nameWithOwner === project.githubSlug,
		);
		if (repo) {
			project.released = repo.createdAt;
			project.metrics = [
				{
					label: "Stars",
					value: repo.stargazerCount,
				},
				{
					label: "Forks",
					value: repo.forkCount,
				},
			];
		}
	});

	return (
		<Container className="py-8 pb-10">
			<div className=" px-8">
				<h1 className="tracking-tight text-5xl">Projects</h1>
				<div className="pro text-muted-foreground text-balance">
					<p className="mt-1">
						I've worked on a range of projects over the years—some as hobbies,
						others as proof of concept, and a few to solve my own challenges.
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1">
				{featuredProjects.map((project, index) => (
					<React.Fragment key={`project-${index}`}>
						<div
							key={`project-${index}`}
							className="group relative hover:bg-muted dark:hover:bg-muted/30 transition-colors duration-300 px-8 py-4"
						>
							<div className="absolute right-5 top-5 hidden sm:block">
								{project.logo}
							</div>
							<a
								href={project.links[0].href}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center justify-between text-lg/relaxed font-semibold"
							>
								{project.name}
							</a>
							<p className="mb-3 pr-0 sm:pr-14 text-muted-foreground">
								{project.description}
							</p>
							<div className=" flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-center justify-between sm:h-14">
								<div className="flex gap-4">
									{project.metrics.map((metric, index) => (
										<div
											key={`metric-${index}`}
											className="flex items-center py-1.5 gap-3"
										>
											<span className="text-xs uppercase tracking-wide font-medium text-muted-foreground">
												{metric.label}
											</span>
											<span className="font-mono font-semibold text-lg">
												{metric.value}
											</span>
										</div>
									))}
								</div>
								<div className="flex items-center gap-5 text-zinc-500 text-sm z-10">
									{project.links.map((link, index) => (
										<a
											key={`link-${index}`}
											href={link.href}
											target={
												link.href.startsWith("http") ? "_blank" : undefined
											}
											className="hover:text-zinc-600 dark:hover:text-zinc-100 flex items-center gap-1"
										>
											{<link.icon className="size-4" />}
											{link.label}
										</a>
									))}
								</div>
							</div>
						</div>
						<SectionDivider />
					</React.Fragment>
				))}
			</div>

			<div className="px-8">
				<p className="mt-10 text-muted-foreground">
					Here are some projects I'm not too embarrassed to show. The rest are
					hiding on{" "}
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
							className="group relative w-full cursor-pointer overflow-hidden shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px] bg-card/20 py-3 px-4 ring-2 hover:ring-3 ring-zinc-900/5 dark:ring-zinc-800 transition-all duration-500 hover:ring-zinc-600/20 dark:hover:ring-zinc-700"
						>
							<div className="">
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
						</a>
					))}
				</div>
			</div>
		</Container>
	);
}
