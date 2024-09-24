import { Container } from "@/components/blocks/container";
import GiderimLogo from "@/components/blocks/giderim-logo";
import { OpenSourceCard } from "@/components/blocks/opensource-card";
import { ProjectCard } from "@/components/blocks/project-card";
import { GitHubIcon, XIcon } from "@/components/blocks/social-icons";
import { SocialLink } from "@/components/blocks/social-link";
import { careerItems } from "@/lib/utils";
import { getGithubInfo, getXInfo } from "@/server/thirdparty";
import Link from "next/link";

const currentYear = new Date().getFullYear();
const lastPosition = currentYear - careerItems[careerItems.length - 1].from;

export default async function Readme() {
	const githubResponse = await getGithubInfo();
	const xResponse = await getXInfo();

	const last3weeks =
		githubResponse.data.viewer.contributionsCollection.contributionCalendar.weeks.slice(
			-3,
		);
	const last14days = last3weeks
		.flatMap((week) => week.contributionDays)
		.slice(-14);

	const githubFollowers = githubResponse.data.viewer.followers.totalCount;
	const githubStars = githubResponse.data.viewer.repositories.nodes.reduce(
		(acc, repo) => acc + repo.stargazerCount,
		0,
	);

	return (
		<>
			<Container className="mt-9">
				<h1 className="tracking-tight text-4xl sm:text-5xl">
					Nedim Arabacı
					<span className="text-muted-foreground font-title font-extralight text-3xl sm:text-4xl block text-balance">
						Developer & Software manager
					</span>
				</h1>
				<div className="pro text-muted-foreground text-balance">
					<p className="mt-6">
						Hi <span className="text-xl">👋🏻</span>, I&apos;m currently working
						at{" "}
						<Link
							href="https://birdefter.com"
							target="_blank"
							rel="nofollow noreferrer"
						>
							@Defter
						</Link>
						, a company that specializes in building SaaS CRM products.
					</p>
					<p>
						At Defter, my responsibility is to oversee the development and
						deployment of software solutions that are not only efficient and
						effective but also customized to meet our clients&apos; specific
						business requirements.
					</p>
				</div>
				<div className="mt-6 flex gap-6">
					<SocialLink
						href="https://x.com/needim"
						aria-label="Follow on X"
						count={xResponse.data?.public_metrics?.followers_count}
						label="followers"
						icon={XIcon}
					/>
					{/* <SocialLink
            href="https://linkedin.com/nedimarabaci"
            aria-label="Follow on LinkedIn"
            icon={LinkedInIcon}
          /> */}
					<SocialLink
						href="https://github.com/needim"
						aria-label="Follow on GitHub"
						icon={GitHubIcon}
						count={githubFollowers}
						label="followers"
					/>
				</div>
			</Container>
			<Container className="mt-24 md:mt-20">
				<h2 className="text-3xl">Spotlight</h2>
				<p className="text-muted-foreground mb-8 mt-3">
					Most recent projects and contributions.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<ProjectCard
						title="gider.im"
						icon={<GiderimLogo className="size-10" />}
						description="Privacy focused income & expense tracking app."
						link="https://gider.im"
					/>
					<OpenSourceCard
						link="https://github.com/needim"
						contributions={last14days}
						repoStats={githubResponse.data.viewer.repositories.nodes}
						totalStars={githubStars}
					/>
				</div>
			</Container>
			<Container className="mt-24 md:mt-20">
				<div className="mx-auto max-w-2xl gap-y-20">
					<div className="flex flex-col gap-3">
						<h2 className="text-3xl sm:text-4xl mb-1">Career</h2>
						<div className="flex flex-col gap-8">
							<p className="text-muted-foreground">
								Overall I have{" "}
								<span className="font-semibold">
									{lastPosition}+ years of experience
								</span>{" "}
								in software development.
							</p>
							{careerItems.map((item, index) => (
								<div
									key={`career-${index}`}
									className="overflow-hidden rounded-3xl shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px] bg-card/20 p-6 ring-2 hover:ring-3 ring-zinc-900/5 dark:ring-zinc-800 transition-all duration-500 hover:ring-zinc-600/20 dark:hover:ring-zinc-700"
								>
									<div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
										<span>{item.location}</span>{" "}
										<span>
											{item.from} — {item.to || "Present"}
										</span>
									</div>
									<div className="mb-3 flex flex-col items-start justify-between gap-2 text-balance text-lg sm:flex-row sm:items-center">
										<div className="font-medium">
											{item.title}{" "}
											<span className="text-muted-foreground">at</span>{" "}
											{item.company.name}
										</div>
									</div>
									<div className="flex flex-col gap-2 text-sm leading-normal sm:gap-3 sm:text-base text-muted-foreground">
										{item.description}
									</div>

									{item.subRoles?.length && (
										<blockquote className="mt-5 text-sm text-muted-foreground border-l-[3px] border-border/70 rounded-l-lg pl-4">
											{item.subRoles.map((role, index) => (
												<div key={`role-${index}`}>
													<div className="mb-2 flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
														<span>{role.location}</span>{" "}
														<span>
															{role.from} — {role.to || "Present"}
														</span>
													</div>
													<div className="mb-3 flex flex-col items-start text-foreground justify-between gap-2 text-balance text-lg sm:flex-row sm:items-center">
														<div className="font-medium">{role.title} </div>
													</div>
													<div className="flex flex-col gap-2 text-sm leading-normal sm:gap-3 sm:text-base text-muted-foreground">
														{role.description}
													</div>
												</div>
											))}
										</blockquote>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
