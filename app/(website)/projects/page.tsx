import { Container } from "@/components/blocks/container";
import { projects } from "@/lib/utils";

export default function Home() {
	const featuredProjects = projects.filter((project) => project.featured);
	const otherProjects = projects.filter((project) => !project.featured);
	return (
		<Container className="mt-16">
			<div className="max-w-2xl">
				<h1 className="tracking-tight text-5xl">Projects</h1>
				<div className="pro text-muted-foreground text-balance">
					<p className="mt-2">
						I've worked on a range of projects over the years—some as hobbies,
						others as proof of concept, and a few to solve my own challenges.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-4">
					{featuredProjects.map((project, index) => (
						<div
							key={`project-${index}`}
							className="overflow-hidden rounded-3xl shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px] dark:bg-zinc-950 p-6 ring-2 hover:ring-3 ring-zinc-900/5 dark:ring-zinc-800 transition-all duration-500 hover:ring-zinc-600/20 dark:hover:ring-zinc-700 relative"
						>
							<div className="absolute right-5 top-5 hidden sm:block">
								{project.logo}
							</div>
							<h2 className="flex items-center justify-between text-lg">
								{project.name}
							</h2>
							<p className="my-3 pr-0 sm:pr-14 text-muted-foreground">
								{project.description}
							</p>
							<div className="mt-2 -mx-3 grid grid-cols-2 justify-between gap-2 sm:grid-cols-4">
								{project.metrics.map((metric, index) => (
									<div
										key={`metric-${index}`}
										className="rouded-md rounded-b-none flex flex-grow flex-col rounded-lg bg-gradient-to-b from-zinc-200/40 dark:from-zinc-900 dark:to-zinc-950 px-3 py-3 shadow-inner"
									>
										<span className="mb-1 text-xs uppercase tracking-wide font-semibold">
											{metric.label}
										</span>
										<span>{metric.value}</span>
									</div>
								))}
							</div>
							<div className="-mx-3 -mb-3 -mt-1 flex items-center justify-between p-3">
								<div className="text-sm text-muted-foreground">
									Released at {project.released}
								</div>
								<div className="flex items-center gap-5 text-zinc-500 text-sm">
									{project.links.map((link, index) => (
										<a
											key={`link-${index}`}
											href={link.href}
											target={
												link.href.startsWith("http") ? "_blank" : undefined
											}
											className="hover:text-zinc-600 flex items-center gap-1"
										>
											{/* {link.icon && link.icon} */}
											{<link.icon className="size-4" />}
											{link.label}
										</a>
									))}
								</div>
							</div>
						</div>
					))}
				</div>

				<p className="mt-10">
					Here are some more projects that I have worked on. You can find the
					complete list of projects on my{" "}
					<a
						href="https://github.com/needim"
						className="font-medium underline decoration-2 underline-offset-2 transition-colors hover:text-zinc-200"
						target="_blank"
						rel="noreferrer"
					>
						GitHub profile
					</a>
					.
				</p>

				<div className="flex flex-col gap-3 mt-4">
					{otherProjects.map((project, index) => (
						<a
							href={project.links[0].href}
							key={`project-${index}`}
							className="group relative w-full rounded-3xl cursor-pointer overflow-hidden shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px] bg-card/20 p-6 ring-2 hover:ring-3 ring-zinc-900/5 dark:ring-zinc-800 transition-all duration-500 hover:ring-zinc-600/20 dark:hover:ring-zinc-700"
						>
							<div className="">
								<div className="whitespace-nowrap flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1em"
										height="1em"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="3"
										stroke-linecap="round"
										stroke-linejoin="round"
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
